import { FormControl} from '@angular/forms'
import { PatientCardVisitModel } from 'src/app/_interfaces/patient-card-visit.model';

export class PatientCardVisitForm {
    patientId = new FormControl()
    patientFio = new FormControl()

    constructor(data: PatientCardVisitModel) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()
      this.patientFio.setValue(data.patientFio)
      this.patientFio.disable()
    }
}