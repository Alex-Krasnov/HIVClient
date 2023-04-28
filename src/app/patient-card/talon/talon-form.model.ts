import { FormControl} from '@angular/forms'
import { TalonModel } from 'src/app/_interfaces/talon.model';
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';

export class TalonForm {
    regDate = new FormControl()
    regCab = new FormControl()
    patientId = new FormControl()

    talonNum = new FormControl()
    field01 = new FormControl()
    field12 = new FormControl()
    field13 = new FormControl()
    field14 = new FormControl()
    field21 = new FormControl()
    field22 = new FormControl()
    field24 = new FormControl()
    field25 = new FormControl()
    field35 = new FormControl()
    field36 = new FormControl()



    constructor(private listService: ListService, data: TalonModel, id: string, date: Date, cab: string) 
    {
      let dateNow = new Date()
      this.patientId.setValue(id)
      this.patientId.disable()
      this.regDate.setValue(date)
      this.regDate.disable()
      this.regCab.setValue(cab)
      this.regCab.disable()
      this.talonNum.setValue(data.talonNum)
      this.talonNum.disable()

      this.field01.setValue(dateNow.getFullYear()+'-'+0+(dateNow.getMonth()+1)+'-'+dateNow.getDate())
      this.field12.setValue(data.field12)
      this.field13.setValue(data.field13)
      this.field13.setAsyncValidators(InList.validate13(this.listService))
      this.field14.setValue(data.field14)
      this.field14.setAsyncValidators(InList.validate14(this.listService))
      this.field21.setValue(data.field21)
      this.field21.setAsyncValidators(InList.validate21(this.listService))
      this.field22.setValue(data.field22)
      this.field22.setAsyncValidators(InList.validate22(this.listService))
      this.field24.setValue(data.field24)
      this.field24.setAsyncValidators(InList.validate24(this.listService))
      this.field25.setValue(data.field25)
      this.field25.setAsyncValidators(InList.validate25(this.listService))
      this.field35.setValue(data.field35)
      this.field35.setAsyncValidators(InList.validate35(this.listService))
      this.field36.setValue(data.field36)
      this.field36.setAsyncValidators(InList.validate36(this.listService))
    }
}