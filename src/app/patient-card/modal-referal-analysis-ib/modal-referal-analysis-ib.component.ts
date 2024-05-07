import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ReferalAnalysis } from 'src/app/_interfaces/referal-analysis';
import { ListService } from 'src/app/services/list.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ModalService } from 'src/app/services/modal.service';
import { ReferalAnalysisIbService } from 'src/app/services/referal-analysis-ib.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-modal-referal-analysis-ib',
  templateUrl: './modal-referal-analysis-ib.component.html',
  styleUrls: ['./modal-referal-analysis-ib.component.css']
})
export class ModalReferalAnalysisIbComponent  implements OnInit{
  @Input() patientId: number;
  formR: FormGroup;
  IsActive: Boolean = false;
  answer: string[]

  constructor(
    private fb: FormBuilder,
    private listService: ListService,
    private service: ReferalAnalysisIbService,
    public modal: ModalService,
    private loading: LoadingService
  ){}

  ngOnInit() {
    this.initForm()
  }
  
  async initForm(){
    this.answer = await firstValueFrom(this.service.getData())
    
    this.formR = this.fb.group({
      docName: new FormControl(null, {
        asyncValidators: [InList.validateDoctor(this.listService)],
        updateOn: 'blur'
      })
    });
  }
  
  get researchList(){
    return this.formR.get('researchList') as FormArray;
  }

  async getFile(){
    this.loading.open()
    var referalAnalysis: ReferalAnalysis = {
      patientId: this.patientId,
      docName: this.formR.get('docName').value
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
    this.modal.close()
  }
}