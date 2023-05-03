import { FormControl} from '@angular/forms'
import { PatientCardDiagnosticConcomitantModel } from 'src/app/_interfaces/patient-card-diagnostic-concomitant.model';

export class PatientCardDiagnosticConcomitantForm {
    patientId = new FormControl()
    patientFio = new FormControl()

    constructor(data: PatientCardDiagnosticConcomitantModel) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()
      this.patientFio.setValue(data.patientFio)
      this.patientFio.disable()
    }
}