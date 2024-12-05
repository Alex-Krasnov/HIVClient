import { FormControl} from '@angular/forms'
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';

export class SearchTreatmentForm {
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
    country = new FormControl()
    city = new FormControl()
    location = new FormControl()
    indx = new FormControl()
    street = new FormControl()
    home = new FormControl()
    dateRegOnStart = new FormControl()
    dateRegOnEnd = new FormControl()
    dateUnRegStart = new FormControl()
    dateUnRegEnd = new FormControl()
    unRegCourse = new FormControl()
    dateDieStart = new FormControl()
    dateDieEnd = new FormControl()
    dateDieAidsStart = new FormControl()
    dateDieAidsEnd = new FormControl()
    dieCourse = new FormControl()
    diePreset = new FormControl()
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
    ibRes = new FormControl()
    dateIbResStart = new FormControl()
    dateIbResEnd = new FormControl()
    ibNum = new FormControl()
    dateInpIbStart = new FormControl()
    dateInpIbEnd = new FormControl()
    ibSelect = new FormControl()
    ufsinYNA = new FormControl()
    dateUfsinStart = new FormControl()
    dateUfsinEnd = new FormControl()

    invalid = new FormControl()
    correspIllnesses = new FormControl()
    dateCorrespIllnessesStart = new FormControl()
    dateCorrespIllnessesEnd = new FormControl()
    schema = new FormControl()
    schemaLast = new FormControl()
    schemaMedecine = new FormControl()
    medecine = new FormControl()
    medecineGive = new FormControl()
    doctor = new FormControl()
    dateGiveStart = new FormControl()
    dateGiveEnd = new FormControl()
    schemaChange = new FormControl()
    cardNo = new FormControl()
    dateSchemaStart = new FormControl()
    dateSchemaEnd = new FormControl()
    finSource = new FormControl()
    art = new FormControl()
    rangeTherapy = new FormControl()
    dateVlStart = new FormControl()
    dateVlEnd = new FormControl()
    resVlStart = new FormControl()
    resVlEnd = new FormControl()
    dateIMStart = new FormControl()
    dateImEnd = new FormControl()
    resImStart = new FormControl()
    resImEnd = new FormControl()
    unrzYNA = new FormControl()
    unrz = new FormControl()
    snilsYNA = new FormControl()
    snils = new FormControl()


    selectInpDate = new FormControl()
    selectPatientId = new FormControl()
    selectFio = new FormControl()
    selectSex = new FormControl()
    selectBirthDate = new FormControl()
    selectRegion = new FormControl()
    selectRegionFact = new FormControl()
    selectCountry = new FormControl()
    selectAddr = new FormControl()
    selectRegOnDate = new FormControl()
    selectStage = new FormControl()
    selectDieDate = new FormControl()
    selectDieCourse = new FormControl()
    selectCheckCourse = new FormControl()
    selectInfectCourse = new FormControl()
    selectShowIllnes = new FormControl()
    selectTransfArea = new FormControl()
    selectFr = new FormControl()
    selectIb = new FormControl()
    selectUfsin = new FormControl()

    selectInvalid = new FormControl()
    selectCorrespIllnesses = new FormControl()
    selectSchema = new FormControl()
    selectSchemaMedecine = new FormControl()
    selectMedecine = new FormControl()
    selectMedecineGive = new FormControl()
    selectDoctor = new FormControl()
    selectGiveDate = new FormControl()
    selectSchemaChange = new FormControl()
    selectCardNo = new FormControl()
    selectSchemaDate = new FormControl()
    selectFinSource = new FormControl()
    selectArt = new FormControl()
    selectRangeTherapy = new FormControl()
    selectVlDate = new FormControl()
    selectVlRes = new FormControl()
    selectImDate = new FormControl()
    selectImRes = new FormControl()
    selectSnils = new FormControl()
    selectUnrz = new FormControl()

    constructor(private listService: ListService) 
    {
      this.unrz.setValue('')
      this.unrzYNA.setValue('Все')
      this.snils.setValue('')
      this.snilsYNA.setValue('Все')
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
      this.country.setValue(['Все'])
      this.country.disable()
      this.city.setValue('')
      this.location.setValue('')
      this.indx.setValue('')
      this.street.setValue('')
      this.home.setValue('')
      this.dateRegOnStart.setValue('')
      this.dateRegOnEnd.setValue('')
      this.dateUnRegStart.setValue('')
      this.dateUnRegEnd.setValue('')
      this.unRegCourse.setValue('')
      this.dateDieStart.setValue('')
      this.dateDieEnd.setValue('')
      this.dateDieAidsStart.setValue('')
      this.dateDieAidsEnd.setValue('')
      this.dieCourse.setValue(['Все'])
      this.dieCourse.disable()
      this.diePreset.setValue('Все')
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
      this.ibRes.setValue('')
      this.dateIbResStart.setValue('')
      this.dateIbResEnd.setValue('')
      this.ibNum.setValue('')
      this.dateInpIbStart.setValue('')
      this.dateInpIbEnd.setValue('')
      this.ibSelect.setValue('Все')
      this.ufsinYNA.setValue('Все')
      this.dateUfsinStart.setValue('')
      this.dateUfsinEnd.setValue('')

      this.invalid.setValue(['Все'])
      this.invalid.disable()
      this.correspIllnesses.setValue(['Все'])
      this.correspIllnesses.disable()
      this.dateCorrespIllnessesStart.setValue('')
      this.dateCorrespIllnessesEnd.setValue('')
      this.schema.setValue(['Все'])
      this.schema.disable()
      this.schemaLast.setValue(false)
      this.schemaMedecine.setValue(['Все'])
      this.schemaMedecine.disable()
      this.medecine.setValue(['Все'])
      this.medecine.disable()
      this.medecineGive.setValue(['Все'])
      this.medecineGive.disable()
      this.doctor.setValue(['Все'])
      this.doctor.disable()
      this.dateGiveStart.setValue('')
      this.dateGiveEnd.setValue('')
      this.schemaChange.setValue(['Все'])
      this.schemaChange.disable()
      this.cardNo.setValue('')
      this.dateSchemaStart.setValue('')
      this.dateSchemaEnd.setValue('')
      this.finSource.setValue(['Все'])
      this.finSource.disable()
      this.art.setValue(['Все'])
      this.art.disable()
      this.rangeTherapy.setValue(['Все'])
      this.rangeTherapy.disable()
      this.dateVlStart.setValue('')
      this.dateVlEnd.setValue('')
      this.resVlStart.setValue('')
      this.resVlEnd.setValue('')
      this.dateIMStart.setValue('')
      this.dateImEnd.setValue('')
      this.resImStart.setValue('')
      this.resImEnd.setValue('')

      this.selectInpDate.setValue(false)
      this.selectPatientId.setValue(true)
      this.selectFio.setValue(false)
      this.selectSex.setValue(false)
      this.selectBirthDate.setValue(false)
      this.selectRegion.setValue(false)
      this.selectRegionFact.setValue(false)
      this.selectCountry.setValue(false)
      this.selectAddr.setValue(false)
      this.selectRegOnDate.setValue(false)
      this.selectStage.setValue(false)
      this.selectDieDate.setValue(false)
      this.selectDieCourse.setValue(false)
      this.selectCheckCourse.setValue(false)
      this.selectInfectCourse.setValue(false)
      this.selectShowIllnes.setValue(false)
      this.selectTransfArea.setValue(false)
      this.selectFr.setValue(false)
      this.selectIb.setValue(false)
      this.selectUfsin.setValue(false)

      this.selectInvalid.setValue(false)
      this.selectCorrespIllnesses.setValue(false)
      this.selectSchema.setValue(false)
      this.selectSchemaMedecine.setValue(false)
      this.selectMedecine.setValue(false)
      this.selectMedecineGive.setValue(false)
      this.selectDoctor.setValue(false)
      this.selectGiveDate.setValue(false)
      this.selectSchemaChange.setValue(false)
      this.selectCardNo.setValue(false)
      this.selectSchemaDate.setValue(false)
      this.selectFinSource.setValue(false)
      this.selectArt.setValue(false)
      this.selectRangeTherapy.setValue(false)
      this.selectVlDate.setValue(false)
      this.selectVlRes.setValue(false)
      this.selectImDate.setValue(false)
      this.selectImRes.setValue(false)
      this.selectUnrz.setValue(false)
      this.selectSnils.setValue(false)

      this.transfAreaYNA.addAsyncValidators(InList.validateYNA(this.listService))
      this.frYNA.addAsyncValidators(InList.validateYNA(this.listService))
      this.zavApoYNA.addAsyncValidators(InList.validateYNA(this.listService))
      this.ufsinYNA.addAsyncValidators(InList.validateYNA(this.listService))
      this.unrzYNA.addAsyncValidators(InList.validateYNA(this.listService))
      this.snilsYNA.addAsyncValidators(InList.validateYNA(this.listService))
    }
}