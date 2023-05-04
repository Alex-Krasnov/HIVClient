import { FormControl} from '@angular/forms'
import { PatientCardDiagnosticManualModel } from 'src/app/_interfaces/patient-card-diagnostic-manual.model';

export class PatientCardDiagnosticManualForm {
    patientId = new FormControl()
    patientFio = new FormControl()

    constructor(data: PatientCardDiagnosticManualModel) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()
      this.patientFio.setValue(data.patientFio)
      this.patientFio.disable()
    }
}