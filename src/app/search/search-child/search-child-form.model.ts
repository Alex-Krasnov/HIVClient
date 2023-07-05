import { FormControl} from '@angular/forms'
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';

export class SearchChildForm {
    dateInpStart = new FormControl()
    dateInpEnd = new FormControl()
    patientId = new FormControl()
    familyName = new FormControl()
    firstName = new FormControl()
    thirdName = new FormControl()
    birthDateStart = new FormControl()
    birthDateEnd = new FormControl()
    ageDayStart = new FormControl()
    ageDayEnd = new FormControl()
    regionReg = new FormControl()
    regionPreset = new FormControl()
    regionFact = new FormControl()
    factRegionPreset = new FormControl()
    country = new FormControl()
    dateRegOnStart = new FormControl()
    dateRegOnEnd = new FormControl()
    dateUnRegStart = new FormControl()
    dateUnRegEnd = new FormControl()
    unRegCourse = new FormControl()
    stage = new FormControl()
    checkCourse = new FormControl()
    infectCourse = new FormControl()
    showIllnes = new FormControl()
    dateShowIllnesStart = new FormControl()
    dateShowIllnesEnd = new FormControl()
    transfAreaYNA = new FormControl()
    dateTransfAreaStart = new FormControl()
    dateTransfAreaEnd = new FormControl()
    frYNA = new FormControl()
    zavApoYNA = new FormControl()

    familyType = new FormControl()
    firstCheckDateStart = new FormControl()
    firstCheckDateEnd = new FormControl()
    childPlace = new FormControl()
    breastMonthNoStart = new FormControl()
    breastMonthNoEnd = new FormControl()
    childPhp = new FormControl()
    sex = new FormControl()
    cardNo = new FormControl()
    motherPatientId = new FormControl()
    fatherPatientId = new FormControl()
    arvt = new FormControl()
    dieDateStart = new FormControl()
    dieDateEnd = new FormControl()
    dieAidsDateStart = new FormControl()
    dieAidsDateEnd = new FormControl()
    materHome = new FormControl()
    form309 = new FormControl()


    selectInpDate = new FormControl()
    selectPatientId = new FormControl()
    selectFio = new FormControl()
    selectBirthDate = new FormControl()
    selectRegion = new FormControl()
    selectRegionFact = new FormControl()
    selectCountry = new FormControl()
    selectRegOnDate = new FormControl()
    selectStage = new FormControl()
    selectCheckCourse = new FormControl()
    selectInfectCourse = new FormControl()
    selectShowIllnes = new FormControl()
    selectTransfArea = new FormControl()
    selectFr = new FormControl()

    selectFamilyType = new FormControl()
    selectFirstCheckDate = new FormControl()
    selectChildPlace = new FormControl()
    selectBreastMonthNo = new FormControl()
    selectChildPhp = new FormControl()
    selectSex = new FormControl()
    selectCardNo = new FormControl()
    selectParentId = new FormControl()
    selectAddr = new FormControl()
    selectArvt = new FormControl()
    selectDieDate = new FormControl()
    selectMaterHome = new FormControl()
    selectForm309 = new FormControl()

    constructor(private listService: ListService) 
    {
      this.dateInpStart.setValue('')
      this.dateInpEnd.setValue('')
      this.patientId.setValue('')
      this.familyName.setValue('')
      this.firstName.setValue('')
      this.thirdName.setValue('')
      this.birthDateStart.setValue('')
      this.birthDateEnd.setValue('')
      this.ageDayStart.setValue('')
      this.ageDayEnd.setValue('')
      this.regionReg.setValue(['Все'])
      this.regionReg.disable()
      this.regionPreset.setValue('Все')
      this.regionFact.setValue(['Все'])
      this.regionFact.disable()
      this.factRegionPreset.setValue('Все')
      this.country.setValue(['Все'])
      this.country.disable()
      this.dateRegOnStart.setValue('')
      this.dateRegOnEnd.setValue('')
      this.dateUnRegStart.setValue('')
      this.dateUnRegEnd.setValue('')
      this.unRegCourse.setValue('')
      this.stage.setValue(['Все'])
      this.stage.disable()
      this.checkCourse.setValue(['Все'])
      this.checkCourse.disable()
      this.infectCourse.setValue(['Все'])
      this.infectCourse.disable()
      this.showIllnes.setValue(['Все'])
      this.showIllnes.disable()
      this.dateShowIllnesStart.setValue('')
      this.dateShowIllnesEnd.setValue('')
      this.transfAreaYNA.setValue('Все')
      this.dateTransfAreaStart.setValue('')
      this.dateTransfAreaEnd.setValue('')
      this.frYNA.setValue('Все')
      this.zavApoYNA.setValue('Все')

      this.familyType.setValue(['Все'])
      this.familyType.disable()
      this.firstCheckDateStart.setValue('')
      this.firstCheckDateEnd.setValue('')
      this.childPlace.setValue(['Все'])
      this.childPlace.disable()
      this.breastMonthNoStart.setValue('')
      this.breastMonthNoEnd.setValue('')
      this.childPhp.setValue(['Все'])
      this.childPhp.disable()
      this.sex.setValue('')
      this.cardNo.setValue('')
      this.motherPatientId.setValue('')
      this.fatherPatientId.setValue('')
      this.arvt.setValue(['Все'])
      this.arvt.disable()
      this.dieDateStart.setValue('')
      this.dieDateEnd.setValue('')
      this.dieAidsDateStart.setValue('')
      this.dieAidsDateEnd.setValue('')
      this.materHome.setValue(['Все'])
      this.materHome.disable()
      this.form309.setValue('Все')
      

      this.selectInpDate.setValue(true)
      this.selectPatientId.setValue(true)
      this.selectFio.setValue(true)
      this.selectBirthDate.setValue(true)
      this.selectRegion.setValue(true)
      this.selectRegionFact.setValue(true)
      this.selectCountry.setValue(true)
      this.selectRegOnDate.setValue(true)
      this.selectStage.setValue(true)
      this.selectCheckCourse.setValue(true)
      this.selectInfectCourse.setValue(true)
      this.selectShowIllnes.setValue(true)
      this.selectTransfArea.setValue(true)
      this.selectFr.setValue(true)

      this.selectFamilyType.setValue(true)
      this.selectFirstCheckDate.setValue(true)
      this.selectChildPlace.setValue(true)
      this.selectBreastMonthNo.setValue(true)
      this.selectChildPhp.setValue(true)
      this.selectSex.setValue(true)
      this.selectCardNo.setValue(true)
      this.selectParentId.setValue(true)
      this.selectAddr.setValue(true)
      this.selectArvt.setValue(true)
      this.selectDieDate.setValue(true)
      this.selectMaterHome.setValue(true)
      this.selectForm309.setValue(true)
    
      this.transfAreaYNA.addAsyncValidators(InList.validateYNA(this.listService))
      this.frYNA.addAsyncValidators(InList.validateYNA(this.listService))
      this.zavApoYNA.addAsyncValidators(InList.validateYNA(this.listService))
      this.form309.addAsyncValidators(InList.validateYNA(this.listService))
    }
}