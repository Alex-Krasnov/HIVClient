import { FormControl} from '@angular/forms'
import { PatientCardPregnantModel } from 'src/app/_interfaces/patient-card-pregnant.model';
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';

export class PatientCardPregnantForm {
    patientId = new FormControl()
    patientFio = new FormControl()
    pregCheck = new FormControl()
    pregMonth = new FormControl()

    constructor(data: PatientCardPregnantModel, private listService: ListService) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()
      this.patientFio.setValue(data.patientFio)
      this.patientFio.disable()
      this.pregCheck.setValue(data.pregCheck)
      this.pregCheck.setAsyncValidators(InList.validatePregCheck(this.listService))
      this.pregMonth.setValue(data.pregMonth)
    }
}