import { FormControl} from '@angular/forms'
import { PatientCardCovidModel } from 'src/app/_interfaces/patient-card-covid.model';

export class PatientCardCovidForm {
    patientId = new FormControl()
    patientFio = new FormControl()

    constructor(data: PatientCardCovidModel) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()
      this.patientFio.setValue(data.patientFio)
      this.patientFio.disable()
    }
}