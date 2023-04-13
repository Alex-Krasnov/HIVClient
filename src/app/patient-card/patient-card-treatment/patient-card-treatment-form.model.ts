import { FormControl} from '@angular/forms'
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';
import { PatientCardTreatmentModel } from 'src/app/_interfaces/patient-card-treatment.model';

export class PatientCardTreatmentForm {
    patientId = new FormControl()
    patientFio = new FormControl()
    stageName = new FormControl()
    stageCom = new FormControl()
    patientCom = new FormControl()
    invalidName = new FormControl('', {updateOn: 'blur'})

    constructor(data: PatientCardTreatmentModel, private listService: ListService) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()
      this.patientFio.setValue(data.patientFio)
      this.patientFio.disable()
      this.stageName.setValue(data.stageName)
      this.stageName.disable()
      this.stageCom.setValue(data.stageCom)
      this.patientCom.setValue(data.patientCom)
      this.invalidName.setValue(data.invalidName)
      this.invalidName.setAsyncValidators(InList.validateInvalid(this.listService))
    }
}