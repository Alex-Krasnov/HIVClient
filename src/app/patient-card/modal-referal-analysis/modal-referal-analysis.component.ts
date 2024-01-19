import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ReferalAnalysis } from 'src/app/_interfaces/referal-analysis';
import { ListService } from 'src/app/services/list.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ReferalAnalysisService } from 'src/app/services/referal-analysis.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-modal-referal-analysis',
  templateUrl: './modal-referal-analysis.component.html',
  styleUrls: ['./modal-referal-analysis.component.css']
})
export class ModalReferalAnalysisComponent  implements OnInit{
  @Input() patientId: number;
  formR: FormGroup;
  IsActive: Boolean = false;
  researchForm = new FormArray([]);
  answer: any

  constructor(
    private fb: FormBuilder,
    private listService: ListService,
    private service: ReferalAnalysisService,
    private loading: LoadingService
  ){}

  ngOnInit() {
    this.initForm()
  }
  

  async initForm(){
    this.answer = await firstValueFrom(this.service.getData())
    
    this.answer.listResearch.map(
      (e: any) => {
        const itemForm = new FormGroup ({
          researchName: new FormControl(e),
          select: new FormControl(false)
        });
        this.researchForm.push(itemForm);
      }
    )

    this.formR = this.fb.group({
      docName: new FormControl(null, {
        asyncValidators: [InList.validateDoctor(this.listService)],
        updateOn: 'blur'
      }),
      researchList: this.researchForm as FormArray 
    });
  }
  
  get researchList(){
    return this.formR.get('researchList') as FormArray;
  }

  async getFile(){
    this.loading.open()
    var research: string[] = []
    this.researchList.value.forEach(e => {
      if(e.select == true)
        research.push(e.researchName)
    });
    var referalAnalysis: ReferalAnalysis = {
      patientId: this.patientId,
      docName: this.formR.get('docName').value,
      listResearch: research
    }
    const data = firstValueFrom(this.service.getFile(referalAnalysis))
    const blob = new Blob([await data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'referal_analysis.docx';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
    document.body.removeChild(downloadLink);

    this.loading.close()
  }
}
