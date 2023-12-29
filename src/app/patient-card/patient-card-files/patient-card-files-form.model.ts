import { FormControl} from '@angular/forms'
import { PatientCardFilesModel } from 'src/app/_interfaces/patient-card-files.model';

export class PatientCardFilesForm {
    patientId = new FormControl()
    patientFio = new FormControl()

    constructor(data: PatientCardFilesModel) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()
      this.patientFio.setValue(data.patientFio)
      this.patientFio.disable()
    }
}