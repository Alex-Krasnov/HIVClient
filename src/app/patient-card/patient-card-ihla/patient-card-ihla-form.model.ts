import { FormControl} from '@angular/forms'
import { PatientCardIhlaModel } from 'src/app/_interfaces/patient-card-ihla.model'

export class PatientCardIhlaForm {
    patientId = new FormControl()
    patientFio = new FormControl()

    constructor(data: PatientCardIhlaModel) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()
      this.patientFio.setValue(data.patientFio)
      this.patientFio.disable()
    }
}