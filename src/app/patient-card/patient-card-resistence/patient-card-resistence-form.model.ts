import { FormControl} from '@angular/forms'
import { PatientCardResistenceModel } from 'src/app/_interfaces/patient-card-resistence.model';

export class PatientCardResistenceForm {
    patientId = new FormControl()
    patientFio = new FormControl()

    constructor(data: PatientCardResistenceModel) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()
      this.patientFio.setValue(data.patientFio)
      this.patientFio.disable()
    }
}