import { FormControl} from '@angular/forms'
import { PatientCardAclModel } from 'src/app/_interfaces/patient-card-acl.model';

export class PatientCardAclForm {
    patientId = new FormControl()
    patientFio = new FormControl()

    constructor(data: PatientCardAclModel) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()
      this.patientFio.setValue(data.patientFio)
      this.patientFio.disable()
    }
}