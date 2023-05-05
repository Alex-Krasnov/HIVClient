import { FormControl} from '@angular/forms'
import { PatientCardRecipeModel } from 'src/app/_interfaces/patient-card-recipe.model';

export class PatientCardRecipeForm {
    patientId = new FormControl()
    patientFio = new FormControl()

    constructor(data: PatientCardRecipeModel) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()
      this.patientFio.setValue(data.patientFio)
      this.patientFio.disable()
    }
}