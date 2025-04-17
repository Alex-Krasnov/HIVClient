import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';
import { PatientCardMainModel } from 'src/app/_interfaces/patient-card-main.model';

export class PatientCardMainForm {
    patientId = new FormControl()
    inputDate = new FormControl()
    familyName = new FormControl()
    firstName = new FormControl()
    thirdName = new FormControl()
    birthDate = new FormControl()
    sex = new FormControl('', {updateOn: 'blur'})
    regOnDate = new FormControl()
    regOffDate = new FormControl()
    regOffReason = new FormControl('', {updateOn: 'blur'})
    unrzFr = new FormControl()
    region = new FormControl('', {updateOn: 'blur'})
    cityName = new FormControl()
    locationName = new FormControl()
    phone = new FormControl()
    addrStreat = new FormControl()
    addrHouse = new FormControl()
    addrExt = new FormControl()
    addrFlat = new FormControl()
    regionFact = new FormControl('', {updateOn: 'blur'})
    cityNameFact = new FormControl()
    locationNameFact = new FormControl()
    dtRegBeg = new FormControl()
    dtRefEnd = new FormControl()
    indexFact = new FormControl()
    addrStreatFact = new FormControl()
    addrHouseFact = new FormControl()
    addrExtFact = new FormControl()
    addrFlatFact = new FormControl()
    comm = new FormControl()
    country = new FormControl('', {updateOn: 'blur'})
    placeCheck = new FormControl('', {updateOn: 'blur'})
    codeMKB10 = new FormControl('', {updateOn: 'blur'})
    cardNo = new FormControl()
    vulnerableGroup = new FormControl('', {updateOn: 'blur'})
    heightOld = new FormControl()
    weightOld = new FormControl()
    checkCourseShort = new FormControl('', {updateOn: 'blur'})
    infectCourseShort = new FormControl('', {updateOn: 'blur'})
    dieCourseShort = new FormControl('', {updateOn: 'change'})
    checkCourseLong = new FormControl('', {updateOn: 'blur'})
    infectCourseLong = new FormControl('', {updateOn: 'blur'})
    dieCourseLong = new FormControl('', {updateOn: 'change'})
    transfAreaDate = new FormControl()
    transfFederDate = new FormControl()
    ufsinDate = new FormControl()
    dieInputDate = new FormControl()
    dieDate = new FormControl()
    dieAidsDate = new FormControl()
    arvt = new FormControl('', {updateOn: 'blur'})
    invalid = new FormControl('', {updateOn: 'blur'})
    archive = new FormControl()
    codeWord = new FormControl()
    snils = new FormControl()
    fioChange = new FormControl()
    headPhysician = new FormControl()
    zamMedPart = new FormControl()
    flgDiagnosisAfterDeath = new FormControl()

    constructor(data: PatientCardMainModel, private listService: ListService) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()
      this.inputDate.setValue(data.inputDate)
      this.inputDate.disable()
      this.familyName.setValue(data.familyName)
      this.firstName.setValue(data.firstName)
      this.thirdName.setValue(data.thirdName)
      this.birthDate.setValue(data.birthDate)
      this.regOnDate.setValue(data.regOnDate)
      this.regOffDate.setValue(data.regOffDate)
      this.unrzFr.setValue(data.unrzFr)
      this.cityName.setValue(data.cityName)
      this.locationName.setValue(data.locationName)
      this.phone.setValue(data.phone)
      this.addrStreat.setValue(data.addrStreat)
      this.addrHouse.setValue(data.addrHouse)
      this.addrExt.setValue(data.addrExt)
      this.addrFlat.setValue(data.addrFlat)
      this.cityNameFact.setValue(data.cityNameFact)
      this.locationNameFact.setValue(data.locationNameFact)
      this.dtRegBeg.setValue(data.dtRegBeg)
      this.dtRefEnd.setValue(data.dtRefEnd)
      this.indexFact.setValue(data.indexFact)
      this.addrStreatFact.setValue(data.addrStreatFact)
      this.addrHouseFact.setValue(data.addrHouseFact)
      this.addrExtFact.setValue(data.addrExtFact)
      this.addrFlatFact.setValue(data.addrFlatFact)
      this.comm.setValue(data.comm)
      this.cardNo.setValue(data.cardNo)
      this.heightOld.setValue(data.heightOld)
      this.weightOld.setValue(data.weightOld)
      this.transfAreaDate.setValue(data.transfAreaDate)
      this.transfFederDate.setValue(data.transfFederDate)
      this.ufsinDate.setValue(data.ufsinDate)
      this.dieInputDate.setValue(data.dieInputDate)
      this.dieInputDate.disable()
      this.dieDate.setValue(data.dieDate)
      this.dieAidsDate.setValue(data.dieAidsDate)
      this.archive.setValue(data.archive)
      this.codeWord.setValue(data.codeWord)
      this.snils.setValue(data.snils)
      this.fioChange.setValue(data.fioChange)
      this.headPhysician.setValue(data.headPhysician)
      this.zamMedPart.setValue(data.zamMedPart)
      
      this.flgDiagnosisAfterDeath.setValue(data.flgDiagnosisAfterDeath)

      this.sex.setValue(data.sex)
      this.sex.setAsyncValidators(InList.validateSex(this.listService))
      this.regOffReason.setValue(data.regOffReason)
      this.regOffReason.setAsyncValidators(InList.validateInfectCourses(this.listService))
      this.region.setValue(data.region)
      this.region.setAsyncValidators(InList.validateRegion(this.listService))
      this.regionFact.setValue(data.regionFact)
      this.regionFact.setAsyncValidators(InList.validateRegion(this.listService))
      this.country.setValue(data.country)
      this.country.setAsyncValidators(InList.validateCountries(this.listService))
      this.placeCheck.setValue(data.placeCheck)
      this.placeCheck.setAsyncValidators(InList.validatePlaceChecks(this.listService))
      this.codeMKB10.setValue(data.codeMKB10)
      this.codeMKB10.setAsyncValidators(InList.validateCodeMkb10s(this.listService))
      this.vulnerableGroup.setValue(data.vulnerableGroup)
      this.vulnerableGroup.setAsyncValidators(InList.validateVulnerableGroup(this.listService))
      this.checkCourseShort.setValue(data.checkCourseShort)
      this.checkCourseShort.setAsyncValidators(InList.validateCheckCourseShort(this.listService))
      this.infectCourseShort.setValue(data.infectCourseShort)
      this.infectCourseShort.setAsyncValidators(InList.validateInfectCourseShort(this.listService))
      this.dieCourseShort.setValue(data.dieCourseShort)
      this.dieCourseShort.setAsyncValidators(InList.validateDieCourseShort(this.listService))
      this.checkCourseLong.setValue(data.checkCourseLong)
      this.checkCourseLong.setAsyncValidators(InList.validateCheckCourseLong(this.listService))
      this.infectCourseLong.setValue(data.infectCourseLong)
      this.infectCourseLong.setAsyncValidators(InList.validateInfectCourseLong(this.listService))
      this.dieCourseLong.setValue(data.dieCourseLong)
      this.dieCourseLong.setAsyncValidators(InList.validateDieCourseLong(this.listService))
      this.arvt.setValue(data.arvt)
      this.arvt.setAsyncValidators(InList.validateArvt(this.listService))
      this.invalid.setValue(data.invalid)
      this.invalid.setAsyncValidators(InList.validateInvalid(this.listService))
      this.firstName.setValidators(Validators.required)
      this.familyName.setValidators(Validators.required)
    }
}