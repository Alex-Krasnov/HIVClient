import { FormControl} from '@angular/forms'
import { PatientCardJailModel } from 'src/app/_interfaces/patient-card-jail.model';
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';

export class PatientCardJailForm {
    patientId = new FormControl()
    patientFio = new FormControl()
    jailName = new FormControl()
    jailOffRegion = new FormControl()
    jailOffDate = new FormControl()

    constructor(data: PatientCardJailModel, private listService: ListService) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()
      this.patientFio.setValue(data.patientFio)
      this.patientFio.disable()

      this.jailName.setValue(data.jailName)
      this.jailName.setAsyncValidators(InList.validateJail(this.listService))
      this.jailOffRegion.setValue(data.jailOffRegion)
      this.jailOffRegion.setAsyncValidators(InList.validateRegion(this.listService))
      this.jailOffDate.setValue(data.jailOffDate)
    }
}