import { FormControl} from '@angular/forms'
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';

export class SearchCovidForm {
  dateInpStart = new FormControl()
  dateInpEnd = new FormControl()
  patientId = new FormControl()
  familyName = new FormControl()
  firstName = new FormControl()
  thirdName = new FormControl()
  fioChange = new FormControl()
  sex = new FormControl()
  birthDateStart = new FormControl()
  birthDateEnd = new FormControl()
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
  dateDieStart = new FormControl()
  dateDieEnd = new FormControl()
  dateDieAidsStart = new FormControl()
  dateDieAidsEnd = new FormControl()
  checkCourse = new FormControl()
  dieCourse = new FormControl()
  diePreset = new FormControl()
  infectCourse = new FormControl()
  showIllnes = new FormControl()
  dateShowIllnesStart = new FormControl()
  dateShowIllnesEnd = new FormControl()
  ibRes = new FormControl()
  dateIbResStart = new FormControl()
  dateIbResEnd = new FormControl()
  ibNum = new FormControl()
  dateInpIbStart = new FormControl()
  dateInpIbEnd = new FormControl()
  ibSelect = new FormControl()
  hospCourse = new FormControl()
  art = new FormControl()
  mkb10 = new FormControl()

  mkb10Covid = new FormControl()
  mkb10Tuber = new FormControl()
  mkb10Pneumonia = new FormControl()
  hospCovid = new FormControl()
  clinVarCovid = new FormControl()
  courseCovid = new FormControl()
  arterHyperYn = new FormControl()
  diabetesYn = new FormControl()
  coronarySyndYn = new FormControl()
  hoblYn = new FormControl()
  bronhAstmaYn = new FormControl()
  cancerYn = new FormControl()
  kidneyDesYn = new FormControl()
  outpatTreatYn = new FormControl()
  deathCovidYn = new FormControl()
  oritYn = new FormControl()
  oxygenYn = new FormControl()
  typeAlvYn = new FormControl()
  periodDesStart = new FormControl()
  periodDesEnd = new FormControl()
  positivResCovidStart = new FormControl()
  positivResCovidEnd = new FormControl()
  negativeResCovidStart = new FormControl()
  negativeResCovidEnd = new FormControl()
  hospitalizationStart = new FormControl()
  hospitalizationEnd = new FormControl()
  dischargeStart = new FormControl()
  dischargeEnd = new FormControl()
  

  selectInpDate = new FormControl()
  selectPatientId = new FormControl()
  selectFio = new FormControl()
  selectSex = new FormControl()
  selectBirthDate = new FormControl()
  selectRegion = new FormControl()
  selectRegionFact = new FormControl()
  selectCountry = new FormControl()
  selectRegOnDate = new FormControl()
  selectStage = new FormControl()
  selectDieDate = new FormControl()
  selectCheckCourse = new FormControl()
  selectDieCourse = new FormControl()
  selectInfectCourse = new FormControl()
  selectShowIllnes = new FormControl()
  selectIb = new FormControl()
  selectHospCourse = new FormControl()
  selectArt = new FormControl()
  selectMkb10 = new FormControl()

  selectMkb10Covid = new FormControl()
  selectMkb10Tuber = new FormControl()
  selectMkb10Pneumonia = new FormControl()
  selectHospCovid = new FormControl()
  selectClinVarCovid = new FormControl()
  selectCourseCovid = new FormControl()
  selectArterHyper = new FormControl()
  selectDiabetes = new FormControl()
  selectCoronarySynd = new FormControl()
  selectHobl = new FormControl()
  selectBronhAstma = new FormControl()
  selectCancer = new FormControl()
  selectKidneyDes = new FormControl()
  selectOutpatTreat = new FormControl()
  selectDeathCovid = new FormControl()
  selectOrit = new FormControl()
  selectOxygen = new FormControl()
  selectTypeAlv = new FormControl()
  selectPeriodDes = new FormControl()
  selectPositivResCovid = new FormControl()
  selectNegativeResCovid = new FormControl()
  selectHospitalization = new FormControl()
  selectDischarge = new FormControl()

  constructor(private listService: ListService) 
  {
    this.dateInpStart.setValue('')
    this.dateInpEnd.setValue('')
    this.patientId.setValue('')
    this.familyName.setValue('')
    this.firstName.setValue('')
    this.thirdName.setValue('')
    this.fioChange.setValue('')
    this.sex.setValue('')
    this.birthDateStart.setValue('')
    this.birthDateEnd.setValue('')
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
    this.dateDieStart.setValue('')
    this.dateDieEnd.setValue('')
    this.dateDieAidsStart.setValue('')
    this.dateDieAidsEnd.setValue('')
    this.checkCourse.setValue(['Все'])
    this.checkCourse.disable()
    this.dieCourse.setValue(['Все'])
    this.dieCourse.disable()
    this.diePreset.setValue('Все')
    this.infectCourse.setValue(['Все'])
    this.infectCourse.disable()
    this.showIllnes.setValue(['Все'])
    this.showIllnes.disable()
    this.dateShowIllnesStart.setValue('')
    this.dateShowIllnesEnd.setValue('')
    this.ibRes.setValue('')
    this.dateIbResStart.setValue('')
    this.dateIbResEnd.setValue('')
    this.ibNum.setValue('')
    this.dateInpIbStart.setValue('')
    this.dateInpIbEnd.setValue('')
    this.ibSelect.setValue('Все')
    this.hospCourse.setValue(['Все'])
    this.hospCourse.disable()
    this.art.setValue(['Все'])
    this.art.disable()
    this.mkb10.setValue(['Все'])
    this.mkb10.disable()
    
    this.mkb10Covid.setValue(['Все'])
    this.mkb10Covid.disable()
    this.mkb10Tuber.setValue(['Все'])
    this.mkb10Tuber.disable()
    this.mkb10Pneumonia.setValue(['Все'])
    this.mkb10Pneumonia.disable()
    this.hospCovid.setValue(['Все'])
    this.hospCovid.disable()
    this.clinVarCovid.setValue(['Все'])
    this.clinVarCovid.disable()
    this.courseCovid.setValue(['Все'])
    this.courseCovid.disable()
    this.arterHyperYn.setValue('Все')
    this.diabetesYn.setValue('Все')
    this.coronarySyndYn.setValue('Все')
    this.hoblYn.setValue('Все')
    this.bronhAstmaYn.setValue('Все')
    this.cancerYn.setValue('Все')
    this.kidneyDesYn.setValue('Все')
    this.outpatTreatYn.setValue('Все')
    this.deathCovidYn.setValue('Все')
    this.oritYn.setValue('Все')
    this.oxygenYn.setValue('Все')
    this.typeAlvYn.setValue('Все')
    this.periodDesStart.setValue('')
    this.periodDesEnd.setValue('')
    this.positivResCovidStart.setValue('')
    this.positivResCovidEnd.setValue('')
    this.negativeResCovidStart.setValue('')
    this.negativeResCovidEnd.setValue('')
    this.hospitalizationStart.setValue('')
    this.hospitalizationEnd.setValue('')
    this.dischargeStart.setValue('')
    this.dischargeEnd.setValue('')

    this.selectInpDate.setValue(true)
    this.selectPatientId.setValue(true)
    this.selectFio.setValue(true)
    this.selectSex.setValue(true)
    this.selectBirthDate.setValue(true)
    this.selectRegion.setValue(true)
    this.selectRegionFact.setValue(true)
    this.selectCountry.setValue(true)
    this.selectRegOnDate.setValue(true)
    this.selectStage.setValue(true)
    this.selectDieDate.setValue(true)
    this.selectCheckCourse.setValue(true)
    this.selectDieCourse.setValue(true)
    this.selectInfectCourse.setValue(true)
    this.selectShowIllnes.setValue(true)
    this.selectIb.setValue(true)
    this.selectHospCourse.setValue(true)
    this.selectArt.setValue(true)
    this.selectMkb10.setValue(true)

    this.selectMkb10Covid.setValue(true)
    this.selectMkb10Tuber.setValue(true)
    this.selectMkb10Pneumonia.setValue(true)
    this.selectHospCovid.setValue(true)
    this.selectClinVarCovid.setValue(true)
    this.selectCourseCovid.setValue(true)
    this.selectArterHyper.setValue(true)
    this.selectDiabetes.setValue(true)
    this.selectCoronarySynd.setValue(true)
    this.selectHobl.setValue(true)
    this.selectBronhAstma.setValue(true)
    this.selectCancer.setValue(true)
    this.selectKidneyDes.setValue(true)
    this.selectOutpatTreat.setValue(true)
    this.selectDeathCovid.setValue(true)
    this.selectOrit.setValue(true)
    this.selectOxygen.setValue(true)
    this.selectTypeAlv.setValue(true)
    this.selectPeriodDes.setValue(true)
    this.selectPositivResCovid.setValue(true)
    this.selectNegativeResCovid.setValue(true)
    this.selectHospitalization.setValue(true)
    this.selectDischarge.setValue(true)

    this.sex.addAsyncValidators(InList.validateSex(this.listService))
    this.unRegCourse.addAsyncValidators(InList.validateInfectCourseLong(this.listService))
    this.ibRes.addAsyncValidators(InList.validateIbResult(this.listService))
    this.arterHyperYn.addAsyncValidators(InList.validateYNA(this.listService))
    this.diabetesYn.addAsyncValidators(InList.validateYNA(this.listService))
    this.coronarySyndYn.addAsyncValidators(InList.validateYNA(this.listService))
    this.hoblYn.addAsyncValidators(InList.validateYNA(this.listService))
    this.bronhAstmaYn.addAsyncValidators(InList.validateYNA(this.listService))
    this.cancerYn.addAsyncValidators(InList.validateYNA(this.listService))
    this.kidneyDesYn.addAsyncValidators(InList.validateYNA(this.listService))
    this.outpatTreatYn.addAsyncValidators(InList.validateYNA(this.listService))
    this.deathCovidYn.addAsyncValidators(InList.validateYNA(this.listService))
    this.oritYn.addAsyncValidators(InList.validateYNA(this.listService))
    this.oxygenYn.addAsyncValidators(InList.validateYNA(this.listService))
    this.typeAlvYn.addAsyncValidators(InList.validateYNA(this.listService))
  }
}