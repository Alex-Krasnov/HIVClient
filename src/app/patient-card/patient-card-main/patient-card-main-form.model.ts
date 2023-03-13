import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { PatientCardMainModel } from 'src/app/_interfaces/patient-card-main.model';

export class PatientCardMainForm {
    patientId = new FormControl()
    inputDate = new FormControl()
    familyName = new FormControl()
    firstName = new FormControl()
    thirdName = new FormControl()
    birthDate = new FormControl()
    sex = new FormControl()
    regOnDate = new FormControl()
    regOffDate = new FormControl()
    regOffReason = new FormControl()
    unrzFr = new FormControl()
    region = new FormControl()
    cityName = new FormControl()
    locationName = new FormControl()
    phone = new FormControl()
    addrStreat = new FormControl()
    addrHouse = new FormControl()
    addrExt = new FormControl()
    addrFlat = new FormControl()
    regionFact = new FormControl()
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
    country = new FormControl()
    placeCheck = new FormControl()
    codeMKB10 = new FormControl()
    cardNo = new FormControl()
    vulnerableGroup = new FormControl()
    heightOld = new FormControl()
    weightOld = new FormControl()
    checkCourseShort = new FormControl()
    infectCourseShort = new FormControl()
    dieCourseShort = new FormControl()
    checkCourseLong = new FormControl()
    infectCourseLong = new FormControl()
    dieCourseLong = new FormControl()
    transfAreaDate = new FormControl()
    transfFederDate = new FormControl()
    ufsinDate = new FormControl()
    dieInputDate = new FormControl()
    dieDate = new FormControl()
    dieAidsDate = new FormControl()
    arvt = new FormControl()
    invalid = new FormControl()
    archive = new FormControl()
    codeWord = new FormControl()
    snils = new FormControl('', Validators.required)
    fioChange = new FormControl()
    headPhysician = new FormControl()
    zamMedPart = new FormControl()
    secondDeseases = new FormArray([])
    stages = new FormArray([])
    blots = new FormArray([])

    constructor(data: PatientCardMainModel) {
        this.patientId.setValue(data.patientId)
        this.patientId.disable()
        this.inputDate.setValue(data.inputDate)
        this.inputDate.disable()
        this.familyName.setValue(data.familyName)
        this.firstName.setValue(data.firstName)
        this.thirdName.setValue(data.thirdName)
        this.birthDate.setValue(data.birthDate)
        this.sex.setValue(data.sex)
        this.regOnDate.setValue(data.regOnDate)
        this.regOffDate.setValue(data.regOffDate)
        this.regOffReason.setValue(data.regOffReason)
        this.unrzFr.setValue(data.unrzFr)
        this.region.setValue(data.region)
        this.cityName.setValue(data.cityName)
        this.locationName.setValue(data.locationName)
        this.phone.setValue(data.phone)
        this.addrStreat.setValue(data.addrStreat)
        this.addrHouse.setValue(data.addrHouse)
        this.addrExt.setValue(data.addrExt)
        this.addrFlat.setValue(data.addrFlat)
        this.regionFact.setValue(data.regionFact)
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
        this.country.setValue(data.country)
        this.placeCheck.setValue(data.placeCheck)
        this.codeMKB10.setValue(data.codeMKB10)
        this.cardNo.setValue(data.cardNo)
        this.vulnerableGroup.setValue(data.vulnerableGroup)
        this.heightOld.setValue(data.heightOld)
        this.weightOld.setValue(data.weightOld)
        this.checkCourseShort.setValue(data.checkCourseShort)
        this.infectCourseShort.setValue(data.infectCourseShort)
        this.dieCourseShort.setValue(data.dieCourseShort)
        this.checkCourseLong.setValue(data.checkCourseLong)
        this.infectCourseLong.setValue(data.infectCourseLong)
        this.dieCourseLong.setValue(data.dieCourseLong)
        this.transfAreaDate.setValue(data.transfAreaDate)
        this.transfFederDate.setValue(data.transfFederDate)
        this.ufsinDate.setValue(data.ufsinDate)
        this.dieInputDate.setValue(data.dieInputDate)
        this.dieInputDate.disable()
        this.dieDate.setValue(data.dieDate)
        this.dieAidsDate.setValue(data.dieAidsDate)
        this.arvt.setValue(data.arvt)
        this.invalid.setValue(data.invalid)
        this.archive.setValue(data.archive)
        this.codeWord.setValue(data.codeWord)
        this.snils.setValue(data.snils)
        this.fioChange.setValue(data.fioChange)
        this.headPhysician.setValue(data.headPhysician)
        this.zamMedPart.setValue(data.zamMedPart)
        
        data.secondDeseases.map(
            (des: any) => {
              const desForm = new FormGroup ({
                startDate: new FormControl(des.startDate, Validators.required),
                endDate: new FormControl(des.endDate),
                deseas: new FormControl(des.deseas, Validators.required)
              });
              this.secondDeseases.push(desForm);
            }
        );
        data.stages.map(
          (e: any) => {
            const stageForm = new FormGroup ({
              stageDate: new FormControl(e.stageDate, Validators.required),
              stage: new FormControl(e.stage)
            });
            this.stages.push(stageForm);
          }
        );
        data.blots.map(
          (e: any) => {
            const blotForm = new FormGroup ({
              blotId: new FormControl(e.blotId, Validators.required),
              blotNo: new FormControl(e.blotNo),
              blotDate: new FormControl(e.blotDate),
              blotRes: new FormControl(e.blotRes),
              checkPlace: new FormControl(e.checkPlace),
              first: new FormControl(e.first),
              last: new FormControl(e.last),
              ifa: new FormControl(e.ifa),
              inputDate: new FormControl({value: e.inputDate, disabled: true})
            });
            this.blots.push(blotForm);
          }
        )
    }
}