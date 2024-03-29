import { FormControl} from '@angular/forms'
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';

export class SearchAclForm {
    dateInpStart = new FormControl()
    dateInpEnd = new FormControl()
    patientId = new FormControl()
    familyName = new FormControl()
    firstName = new FormControl()
    thirdName = new FormControl()
    sex = new FormControl()
    birthDateStart = new FormControl()
    birthDateEnd = new FormControl()
    regionReg = new FormControl()
    regionPreset = new FormControl()
    regionFact = new FormControl()
    factRegionPreset = new FormControl()
    dateRegOnStart = new FormControl()
    dateRegOnEnd = new FormControl()
    dateUnRegStart = new FormControl()
    dateUnRegEnd = new FormControl()
    stage = new FormControl()
    checkCourse = new FormControl()
    ibRes = new FormControl()
    dateIbResStart = new FormControl()
    dateIbResEnd = new FormControl()
    ibNum = new FormControl()
    dateInpIbStart = new FormControl()
    dateInpIbEnd = new FormControl()
    ibSelect = new FormControl()

    aclTestCode1 = new FormControl()
    aclTestCode2 = new FormControl()
    aclTestCode3 = new FormControl()
    aclTestCode4 = new FormControl()
    aclTestCode5 = new FormControl()
    aclTestCode6 = new FormControl()
    aclTestCode7 = new FormControl()
    biochemistry = new FormControl()
    hematology = new FormControl()
    aclSampleDateStart = new FormControl()
    aclSampleDateEnd = new FormControl()


    selectInpDate = new FormControl()
    selectPatientId = new FormControl()
    selectFio = new FormControl()
    selectSex = new FormControl()
    selectBirthDate = new FormControl()
    selectRegion = new FormControl()
    selectRegionFact = new FormControl()
    selectRegOnDate = new FormControl()
    selectStage = new FormControl()
    selectCheckCourse = new FormControl()
    selectIb = new FormControl()
    selectTestCode = new FormControl()
    selectSampleDate = new FormControl()

    constructor(private listService: ListService) 
    {
      this.dateInpStart.setValue('')
      this.dateInpEnd.setValue('')
      this.patientId.setValue('')
      this.familyName.setValue('')
      this.firstName.setValue('')
      this.thirdName.setValue('')
      this.sex.setValue('')
      this.birthDateStart.setValue('')
      this.birthDateEnd.setValue('')
      this.regionReg.setValue(['Все'])
      this.regionReg.disable()
      this.regionPreset.setValue('Все')
      this.regionFact.setValue(['Все'])
      this.regionFact.disable()
      this.factRegionPreset.setValue('Все')
      this.dateRegOnStart.setValue('')
      this.dateRegOnEnd.setValue('')
      this.dateUnRegStart.setValue('')
      this.dateUnRegEnd.setValue('')
      this.stage.setValue(['Все'])
      this.stage.disable()
      this.checkCourse.setValue(['Все'])
      this.checkCourse.disable()
      this.ibRes.setValue('')
      this.dateIbResStart.setValue('')
      this.dateIbResEnd.setValue('')
      this.ibNum.setValue('')
      this.dateInpIbStart.setValue('')
      this.dateInpIbEnd.setValue('')
      this.ibSelect.setValue('Все')

      this.aclTestCode1.setValue('')
      this.aclTestCode2.setValue('')
      this.aclTestCode3.setValue('')
      this.aclTestCode4.setValue('')
      this.aclTestCode5.setValue('')
      this.aclTestCode6.setValue('')
      this.aclTestCode7.setValue('')
      this.biochemistry.setValue(false)
      this.hematology.setValue(false)
      this.aclSampleDateStart.setValue('')
      this.aclSampleDateEnd.setValue('')
      

      this.selectInpDate.setValue(true)
      this.selectPatientId.setValue(true)
      this.selectFio.setValue(true)
      this.selectSex.setValue(true)
      this.selectBirthDate.setValue(true)
      this.selectRegion.setValue(true)
      this.selectRegionFact.setValue(true)
      this.selectRegOnDate.setValue(true)
      this.selectStage.setValue(true)
      this.selectCheckCourse.setValue(true)
      this.selectIb.setValue(true)

      this.selectTestCode.setValue(true)
      this.selectSampleDate.setValue(true)
    }
}