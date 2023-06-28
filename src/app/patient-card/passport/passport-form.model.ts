import { FormControl} from '@angular/forms'
import { PassportModel } from 'src/app/_interfaces/passport.model';
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';

export class PassportForm {
    patientId = new FormControl()
    region = new FormControl()
    locationName = new FormControl()
    cityName = new FormControl()
    index = new FormControl()
    addrStreat = new FormControl()
    addrHouse = new FormControl()
    addrExt = new FormControl()
    addrFlat = new FormControl()
    regionFact = new FormControl()
    cityNameFact = new FormControl()
    locationNameFact = new FormControl()
    indexFact = new FormControl()
    addrStreatFact = new FormControl()
    addrExtFact = new FormControl()
    addrHouseFact = new FormControl()
    addrFlatFact = new FormControl()
    dtRegBeg = new FormControl()
    dtRegEnd = new FormControl()
    pasSer = new FormControl()
    pasNum = new FormControl()
    pasWhen = new FormControl()
    pasWhom = new FormControl()
    omsSer = new FormControl()
    omsNum = new FormControl()
    omsWhen = new FormControl()



    constructor(private listService: ListService, data: PassportModel) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()

      this.region.setValue(data.region)
      this.locationName.setValue(data.locationName)
      this.cityName.setValue(data.cityName)
      this.index.setValue(data.index)
      this.addrStreat.setValue(data.addrStreat)
      this.addrHouse.setValue(data.addrHouse)
      this.addrExt.setValue(data.addrExt)
      this.addrFlat.setValue(data.addrFlat)
      this.regionFact.setValue(data.regionFact)
      this.cityNameFact.setValue(data.cityNameFact)
      this.locationNameFact.setValue(data.locationNameFact)
      this.indexFact.setValue(data.indexFact)
      this.addrStreatFact.setValue(data.addrStreatFact)
      this.addrExtFact.setValue(data.addrExtFact)
      this.addrHouseFact.setValue(data.addrHouseFact)
      this.addrFlatFact.setValue(data.addrFlatFact)
      this.dtRegBeg.setValue(data.dtRegBeg)
      this.dtRegEnd.setValue(data.dtRegEnd)
      this.pasSer.setValue(data.pasSer)
      this.pasNum.setValue(data.pasNum)
      this.pasWhen.setValue(data.pasWhen)
      this.pasWhom.setValue(data.pasWhom)
      this.omsSer.setValue(data.omsSer)
      this.omsNum.setValue(data.omsNum)
      this.omsWhen.setValue(data.omsWhen)

      this.region.setAsyncValidators(InList.validateRegion(this.listService))
      this.regionFact.setAsyncValidators(InList.validateRegion(this.listService))
    }
}