import { FormControl} from '@angular/forms'
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';
import { PatientCardEpidModel } from 'src/app/_interfaces/patient-card-epid.model';

export class PatientCardEpidForm {
    patientId = new FormControl()
    patientFio = new FormControl()
    dtMailReg = new FormControl()
    eduName = new FormControl('', {updateOn: 'blur'})
    employmentName = new FormControl('', {updateOn: 'blur'})
    epidDocName = new FormControl('', {updateOn: 'blur'})
    epidTimeInfectEnd = new FormControl()
    epidTimeInfectStart = new FormControl()
    epidemCom = new FormControl()
    familyStatusName = new FormControl('', {updateOn: 'blur'})
    numMail = new FormControl()
    situationDetectName = new FormControl('', {updateOn: 'blur'})
    transName = new FormControl('', {updateOn: 'blur'})
    transmitionMechName  = new FormControl('', {updateOn: 'blur'})

    constructor(data: PatientCardEpidModel, private listService: ListService) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()
      this.patientFio.setValue(data.patientFio)
      this.patientFio.disable()
      this.dtMailReg.setValue(data.dtMailReg)
      this.eduName.setValue(data.eduName)
      this.eduName.setAsyncValidators(InList.validateEducation(this.listService))
      this.employmentName.setValue(data.employmentName)
      this.employmentName.setAsyncValidators(InList.validateEmployment(this.listService))
      this.epidDocName.setValue(data.epidDocName)
      this.epidDocName.setAsyncValidators(InList.validateEpidDoctor(this.listService))
      this.epidTimeInfectEnd.setValue(data.epidTimeInfectEnd)
      this.epidTimeInfectStart.setValue(data.epidTimeInfectStart)
      this.epidemCom.setValue(data.epidemCom)
      this.familyStatusName.setValue(data.familyStatusName)
      this.familyStatusName.setAsyncValidators(InList.validateFammilyStatus(this.listService))
      this.numMail.setValue(data.numMail)
      this.situationDetectName.setValue(data.situationDetectName)
      this.situationDetectName.setAsyncValidators(InList.validateSituationDetect(this.listService))
      this.transName.setValue(data.transName)
      this.transName.setAsyncValidators(InList.validateTrans(this.listService))
      this.transmitionMechName.setValue(data.transmitionMechName)
      this.transmitionMechName.setAsyncValidators(InList.validateTransmisionMech(this.listService))

    }
}