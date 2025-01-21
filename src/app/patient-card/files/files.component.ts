import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { PatientFileUploadResponse } from 'src/app/_interfaces/patient-file-upload-response.model';
import { LoadingService } from 'src/app/services/loading.service';
import { PatientCardFilesService } from 'src/app/services/patient-card/patient-card-files.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  formF: FormGroup;
  pervValue: any;
  @Input() fileArr: FormArray; 
  @Input() patientId: number;
  @Output() fIsValid = new EventEmitter<boolean>();
  selectedFile: File;

  constructor(
    private service: PatientCardFilesService,
    private fb: FormBuilder,
    private loading: LoadingService
  ){}

  ngOnInit() {
    this.fIsValid.emit(true);
    this.formF = this.fb.group({
      files: this.fileArr as FormArray,
      newFilePath: new FormControl(''),
    }, {updateOn: 'blur'});
    this.pervValue = this.fileArr.value as FormArray;

    this.formF.controls['files'].statusChanges.subscribe(() => {
      if (this.formF.controls['files'].valid){
        this.fIsValid.emit(true);
      } else 
        this.fIsValid.emit(false);
    })
 }

 get files(){
    return this.formF.get('files') as FormArray;
 }

 onFileSelect(event): void {
   if (event.target.files.length > 0) {
     this.selectedFile =  event.target.files[0]
   }
 }
 
  async uploadFile(){
    if(this.selectedFile == undefined || this.selectedFile == null)
      return null

    const formData = new FormData()
    formData.append('file', this.selectedFile)
    formData.append('patientId', this.patientId.toString())
    
    this.service.uploadFile(formData).subscribe(
      res => {
        this.loading.open()
        confirm(res.message)
        const file = new FormGroup({
          filePath: new FormControl({value: res.fileName, disabled: true})
        })
        this.files.push(file)
        this.formF.get('newFilePath').setValue('')
        this.selectedFile = null
        this.loading.close()
      },
      err => {
        this.loading.open()
        confirm('Ошибка:'+err.error.message)
        this.formF.get('newFilePath').setValue('')
        this.selectedFile = null
        this.loading.close()
      },
      () => console.log('end upload')        
    )
  }
  
  delFile(index: number) {
    let item = this.files.at(index)

    const formData = new FormData()
    formData.append('filePath', item.get('filePath').getRawValue())
    formData.append('patientId', this.patientId.toString())

    this.service.deleteFile(formData).subscribe(
      res => {
        this.loading.open()
        confirm(res.message)
        this.files.removeAt(index)
        this.loading.close()
      },
      err => {
        this.loading.open()
        confirm('Ошибка:'+err)
        this.loading.close()
      },
      () => console.log('end delete')   
      )
  }

  async downloadFile(index: number){
    this.loading.open()
    let item = this.files.at(index)

    const formData = new FormData()
    formData.append('filePath', item.get('filePath').getRawValue())

    const fileNameWithExtension = item.get('filePath').getRawValue().split('/').pop();
    console.log(fileNameWithExtension);
    

    const data = firstValueFrom(this.service.downloadFile(formData))
    const blob = new Blob([await data], { type: 'application/octet-stream' });
  
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileNameWithExtension;
    document.body.appendChild(downloadLink);
    downloadLink.click();

    URL.revokeObjectURL(downloadLink.href);
    document.body.removeChild(downloadLink);
    
    this.loading.close()
  }
}