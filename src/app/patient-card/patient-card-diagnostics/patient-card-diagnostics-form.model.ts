import { FormControl} from '@angular/forms'
import { PatientCardDiagnosticsModel } from 'src/app/_interfaces/patient-card-diagnostics.model';

export class PatientCardDiagnosticsForm {
    patientId = new FormControl()
    patientFio = new FormControl()

    constructor(data: PatientCardDiagnosticsModel) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()
      this.patientFio.setValue(data.patientFio)
      this.patientFio.disable()
    }
}