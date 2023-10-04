import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ImportKorvetService } from '../services/import-korvet.service';
import { InList } from 'src/app/validators/in-lst';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-import-korvet',
  templateUrl: './import-korvet.component.html',
  styleUrls: ['./import-korvet.component.css']
})
export class ImportKorvetComponent implements OnInit{

  finSource: string[]
  formR: FormGroup;
  selectedFile: File;
  
  constructor(
    private service: ImportKorvetService,
    private fb: FormBuilder,
    private router: Router,
    private listService: ListService
  ){}

  ngOnInit() {
    this.service.getFinSource().subscribe(data => {
      this.finSource = data
    })
    this.initForm();
  }

  initForm(){
    this.formR = this.fb.group({
      finSource: new FormControl('Областной бюджет', {
        asyncValidators: [InList.validateFinSource(this.listService)],
        updateOn: 'blur'
      })
    });
  }

  goHome(){
    this.router.navigate(['main'])
  }

  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      this.selectedFile =  event.target.files[0]
    }
  }

  async sendForm(){
    if (this.formR.valid){
      const a = new FormData()
      a.append('file', this.selectedFile)
      a.append('finSource', this.formR.get('finSource').value)

      this.service.sendFile(a).subscribe((data: Blob) => {
        const blob = new Blob([data], { type: 'text/plain' });
    
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'errList.txt';
        document.body.appendChild(downloadLink);
        downloadLink.click();
    
        URL.revokeObjectURL(downloadLink.href);
        document.body.removeChild(downloadLink);
      })
    }
  }
}
