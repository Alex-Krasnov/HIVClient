import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';
import { ModalService } from 'src/app/services/modal.service';
import { SeachRegistryService } from '../services/seach-registry.service';

@Component({
  selector: 'app-serch-registry',
  templateUrl: './serch-registry.component.html',
  styleUrls: ['./serch-registry.component.css']
})
export class SerchRegistryComponent  implements OnInit {
  
  dataList: String[];
  formR: FormGroup;
  IsActive: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private listService: ListService,
    public modal: ModalService,
    private service: SeachRegistryService
  ){}

  ngOnInit() {
    this.service.getLists().subscribe((data:string[]) => {
      this.dataList = data
      this.IsActive = true
      this.initForm()
    });
  }

  initForm(){
    this.formR = this.fb.group({
      docName: new FormControl('', {
        asyncValidators: [InList.validateDoctor(this.listService)],
        updateOn: 'blur'
      }),
      date: new FormControl('')
    });
  }

  goHome(){
    this.router.navigate(['main'])
  }

  sendForm(){
    if (this.formR.valid){
      this.service.downloadFile(this.formR.get('docName').value, this.formR.get('date').value).subscribe((data: Blob) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `registry_${this.formR.get('docName').value}.xlsx`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
    
        URL.revokeObjectURL(downloadLink.href);
        document.body.removeChild(downloadLink);
      })
    }
  }
}
