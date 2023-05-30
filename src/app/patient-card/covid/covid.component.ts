import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Covid } from 'src/app/_interfaces/covid.model';
import { ListService } from 'src/app/services/list.service';
import { PatientCardCovidService } from 'src/app/services/patient-card-covid.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent  implements OnInit{
  formS: FormGroup;
  pervValue: any;
  @Input() subArr: FormArray; 
  @Input() patientId: number;
  @Output() isValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardCovidService,
    private fb: FormBuilder,
    private listService: ListService
  ){}

  ngOnInit() {
    this.isValid.emit(true);
    this.formS = this.fb.group({
      subs: this.subArr as FormArray,
      periodDesDate: new FormControl(),
      positiveResCovidDate: new FormControl(),
      negativeResCovidDate: new FormControl(),
      hospDate: new FormControl(),
      dischargeDate: new FormControl(),
      outPatTreat: new FormControl('', {
        asyncValidators: [InList.validateYn(this.listService)],
        updateOn: 'blur'
      }),
      deathCovid: new FormControl('', {
        asyncValidators: [InList.validateYn(this.listService)],
        updateOn: 'blur'
      }),
      orit: new FormControl('', {
        asyncValidators: [InList.validateYn(this.listService)],
        updateOn: 'blur'
      }),
      oxygen: new FormControl('', {
        asyncValidators: [InList.validateYn(this.listService)],
        updateOn: 'blur'
      }),
      avl: new FormControl('', {
        asyncValidators: [InList.validateYn(this.listService)],
        updateOn: 'blur'
      }),
      arterHyper: new FormControl('', {
        asyncValidators: [InList.validateYn(this.listService)],
        updateOn: 'blur'
      }),
      deabetes: new FormControl('', {
        asyncValidators: [InList.validateYn(this.listService)],
        updateOn: 'blur'
      }),
      coronarySynd: new FormControl('', {
        asyncValidators: [InList.validateYn(this.listService)],
        updateOn: 'blur'
      }),
      hobl: new FormControl('', {
        asyncValidators: [InList.validateYn(this.listService)],
        updateOn: 'blur'
      }),
      bronhAstma: new FormControl('', {
        asyncValidators: [InList.validateYn(this.listService)],
        updateOn: 'blur'
      }),
      cancer: new FormControl('', {
        asyncValidators: [InList.validateYn(this.listService)],
        updateOn: 'blur'
      }),
      kidneyDes: new FormControl('', {
        asyncValidators: [InList.validateYn(this.listService)],
        updateOn: 'blur'
      }),
      outcomeHosp: new FormControl('', {
        asyncValidators: [InList.validateOutHosp(this.listService)],
        updateOn: 'blur'
      }),
      clinVarCovid: new FormControl('', {
        asyncValidators: [InList.validateClinVarCovid(this.listService)],
        updateOn: 'blur'
      }),
      severityCovid: new FormControl('', {
        asyncValidators: [InList.validateCourseCovid(this.listService)],
        updateOn: 'blur'
      }),
      covidMKB10Short: new FormControl('', {
        asyncValidators: [InList.validateMkb10CovidShort(this.listService)],
        updateOn: 'blur'
      }),
      covidMKB10Long: new FormControl('', {
        asyncValidators: [InList.validateMkb10CovidLong(this.listService)],
        updateOn: 'blur'
      }),
      tubercuosisShort: new FormControl('', {
        asyncValidators: [InList.validateMkbTuderShort(this.listService)],
        updateOn: 'blur'
      }),
      tubercuosisLong: new FormControl('', {
        asyncValidators: [InList.validateMkbTuderLong(this.listService)],
        updateOn: 'blur'
      }),
      pneumoniaShort: new FormControl('', {
        asyncValidators: [InList.validateMkbPneumoniaShort(this.listService)],
        updateOn: 'blur'
      }),
      pneumoniaLong: new FormControl('', {
        asyncValidators: [InList.validateMkbPneumoniaLong(this.listService)],
        updateOn: 'blur'
      }),
      typeAvl: new FormControl('', {
        asyncValidators: [InList.validateAvlType(this.listService)],
        updateOn: 'blur'
      }),
      commitment: new FormControl('', {
        asyncValidators: [InList.validateCommitment(this.listService)],
        updateOn: 'blur'
      }),
      comm: new FormControl()
    }, {updateOn: 'blur'});
    this.pervValue = this.subArr.value as FormArray;

    this.formS.controls['subs'].statusChanges.subscribe(() => {
      if (this.formS.controls['subs'].valid){
        this.update();
        this.isValid.emit(true);
      } else 
        this.isValid.emit(false);
    })
  }

  get subs() {
    return this.formS.get('subs') as FormArray;
  }

  del(index: number) {
    let e = this.subs.at(index);
    this.patientService.delCovid(e.get('idCovid').value).subscribe();
    this.pervValue.splice(index, 1);
    this.subs.removeAt(index);
  }

  async create() {
    let isValid = this.formS.controls['outPatTreat'].valid && 
                this.formS.controls['deathCovid'].valid && 
                this.formS.controls['orit'].valid && 
                this.formS.controls['oxygen'].valid && 
                this.formS.controls['avl'].valid && 
                this.formS.controls['arterHyper'].valid && 
                this.formS.controls['deabetes'].valid && 
                this.formS.controls['coronarySynd'].valid && 
                this.formS.controls['hobl'].valid && 
                this.formS.controls['bronhAstma'].valid && 
                this.formS.controls['cancer'].valid && 
                this.formS.controls['kidneyDes'].valid && 
                this.formS.controls['outcomeHosp'].valid && 
                this.formS.controls['clinVarCovid'].valid && 
                this.formS.controls['severityCovid'].valid && 
                this.formS.controls['covidMKB10Short'].valid && 
                this.formS.controls['covidMKB10Long'].valid && 
                this.formS.controls['tubercuosisShort'].valid && 
                this.formS.controls['tubercuosisLong'].valid && 
                this.formS.controls['pneumoniaShort'].valid && 
                this.formS.controls['pneumoniaLong'].valid && 
                this.formS.controls['typeAvl'].valid && 
                this.formS.controls['commitment'].valid && 
                this.formS.controls['comm'].valid

    if( isValid ){
      let item: Covid = {
        patientId: this.patientId,
        periodDesDate: this.formS.controls['periodDesDate'].value,
        positiveResCovidDate: this.formS.controls['positiveResCovidDate'].value,
        negativeResCovidDate: this.formS.controls['negativeResCovidDate'].value,
        hospDate: this.formS.controls['hospDate'].value,
        dischargeDate: this.formS.controls['dischargeDate'].value,
        outPatTreat: this.formS.controls['outPatTreat'].value,
        deathCovid: this.formS.controls['deathCovid'].value,
        orit: this.formS.controls['orit'].value,
        oxygen: this.formS.controls['oxygen'].value,
        avl: this.formS.controls['avl'].value,
        arterHyper: this.formS.controls['arterHyper'].value,
        deabetes: this.formS.controls['deabetes'].value,
        coronarySynd: this.formS.controls['coronarySynd'].value,
        hobl: this.formS.controls['hobl'].value,
        bronhAstma: this.formS.controls['bronhAstma'].value,
        cancer: this.formS.controls['cancer'].value,
        kidneyDes: this.formS.controls['kidneyDes'].value,
        outcomeHosp: this.formS.controls['outcomeHosp'].value,
        clinVarCovid: this.formS.controls['clinVarCovid'].value,
        severityCovid: this.formS.controls['severityCovid'].value,
        covidMKB10Short: this.formS.controls['covidMKB10Short'].value,
        covidMKB10Long: this.formS.controls['covidMKB10Long'].value,
        tubercuosisShort: this.formS.controls['tubercuosisShort'].value,
        tubercuosisLong: this.formS.controls['tubercuosisLong'].value,
        pneumoniaShort: this.formS.controls['pneumoniaShort'].value,
        pneumoniaLong: this.formS.controls['pneumoniaLong'].value,
        typeAvl: this.formS.controls['typeAvl'].value,
        commitment: this.formS.controls['commitment'].value,
        comm: this.formS.controls['comm'].value
      };
      let id = await firstValueFrom(this.patientService.createCovid(item)) as number
      console.log(id);
      
      item.idCovid = id
      const sForm = new FormGroup ({
        idCovid: new FormControl(item.idCovid),
        periodDesDate: new FormControl(item.periodDesDate),
        positiveResCovidDate: new FormControl(item.positiveResCovidDate),
        negativeResCovidDate: new FormControl(item.negativeResCovidDate),
        hospDate: new FormControl(item.hospDate),
        dischargeDate: new FormControl(item.dischargeDate),
        outPatTreat: new FormControl(item.outPatTreat, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        deathCovid: new FormControl(item.deathCovid, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        orit: new FormControl(item.orit, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        oxygen: new FormControl(item.oxygen, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        avl: new FormControl(item.avl, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        arterHyper: new FormControl(item.arterHyper, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        deabetes: new FormControl(item.deabetes, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        coronarySynd: new FormControl(item.coronarySynd, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        hobl: new FormControl(item.hobl, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        bronhAstma: new FormControl(item.bronhAstma, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        cancer: new FormControl(item.cancer, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        kidneyDes: new FormControl(item.kidneyDes, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        outcomeHosp: new FormControl(item.outcomeHosp, {
          asyncValidators: [InList.validateOutHosp(this.listService)],
          updateOn: 'blur'
        }),
        clinVarCovid: new FormControl(item.clinVarCovid, {
          asyncValidators: [InList.validateClinVarCovid(this.listService)],
          updateOn: 'blur'
        }),
        severityCovid: new FormControl(item.severityCovid, {
          asyncValidators: [InList.validateCourseCovid(this.listService)],
          updateOn: 'blur'
        }),
        covidMKB10Short: new FormControl(item.covidMKB10Short, {
          asyncValidators: [InList.validateMkb10CovidShort(this.listService)],
          updateOn: 'blur'
        }),
        covidMKB10Long: new FormControl(item.covidMKB10Long, {
          asyncValidators: [InList.validateMkb10CovidLong(this.listService)],
          updateOn: 'blur'
        }),
        tubercuosisShort: new FormControl(item.tubercuosisShort, {
          asyncValidators: [InList.validateMkbTuderShort(this.listService)],
          updateOn: 'blur'
        }),
        tubercuosisLong: new FormControl(item.tubercuosisLong, {
          asyncValidators: [InList.validateMkbTuderLong(this.listService)],
          updateOn: 'blur'
        }),
        pneumoniaShort: new FormControl(item.pneumoniaShort, {
          asyncValidators: [InList.validateMkbPneumoniaShort(this.listService)],
          updateOn: 'blur'
        }),
        pneumoniaLong: new FormControl(item.pneumoniaLong, {
          asyncValidators: [InList.validateMkbPneumoniaLong(this.listService)],
          updateOn: 'blur'
        }),
        typeAvl: new FormControl(item.typeAvl, {
          asyncValidators: [InList.validateAvlType(this.listService)],
          updateOn: 'blur'
        }),
        commitment: new FormControl(item.commitment, {
          asyncValidators: [InList.validateCommitment(this.listService)],
          updateOn: 'blur'
        }),
        comm: new FormControl(item.comm)
      });
      const sData ={
        idCovid: item.idCovid,
        periodDesDate: item.periodDesDate,
        positiveResCovidDate: item.positiveResCovidDate,
        negativeResCovidDate: item.negativeResCovidDate,
        hospDate: item.hospDate,
        dischargeDate: item.dischargeDate,
        outPatTreat: item.outPatTreat,
        deathCovid: item.deathCovid,
        orit: item.orit,
        oxygen: item.oxygen,
        avl: item.avl,
        arterHyper: item.arterHyper,
        deabetes: item.deabetes,
        coronarySynd: item.coronarySynd,
        hobl: item.hobl,
        bronhAstma: item.bronhAstma,
        cancer: item.cancer,
        kidneyDes: item.kidneyDes,
        outcomeHosp: item.outcomeHosp,
        clinVarCovid: item.clinVarCovid,
        severityCovid: item.severityCovid,
        covidMKB10Short: item.covidMKB10Short,
        covidMKB10Long: item.covidMKB10Long,
        tubercuosisShort: item.tubercuosisShort,
        tubercuosisLong: item.tubercuosisLong,
        pneumoniaShort: item.pneumoniaShort,
        pneumoniaLong: item.pneumoniaLong,
        typeAvl: item.typeAvl,
        commitment: item.commitment,
        comm: item.comm
      }
      
      this.subs.push(sForm)
      this.isValid.emit(true);
      this.pervValue.push(sData)
    }
    this.formS.get('periodDesDate').setValue('')
    this.formS.get('periodDesDate').markAsPristine()
    this.formS.get('positiveResCovidDate').setValue('')
    this.formS.get('positiveResCovidDate').markAsPristine()
    this.formS.get('negativeResCovidDate').setValue('')
    this.formS.get('negativeResCovidDate').markAsPristine()
    this.formS.get('hospDate').setValue('')
    this.formS.get('hospDate').markAsPristine()
    this.formS.get('dischargeDate').setValue('')
    this.formS.get('dischargeDate').markAsPristine()
    this.formS.get('outPatTreat').setValue('')
    this.formS.get('outPatTreat').markAsPristine()
    this.formS.get('deathCovid').setValue('')
    this.formS.get('deathCovid').markAsPristine()
    this.formS.get('orit').setValue('')
    this.formS.get('orit').markAsPristine()
    this.formS.get('oxygen').setValue('')
    this.formS.get('oxygen').markAsPristine()
    this.formS.get('avl').setValue('')
    this.formS.get('avl').markAsPristine()
    this.formS.get('arterHyper').setValue('')
    this.formS.get('arterHyper').markAsPristine()
    this.formS.get('deabetes').setValue('')
    this.formS.get('deabetes').markAsPristine()
    this.formS.get('coronarySynd').setValue('')
    this.formS.get('coronarySynd').markAsPristine()
    this.formS.get('hobl').setValue('')
    this.formS.get('hobl').markAsPristine()
    this.formS.get('bronhAstma').setValue('')
    this.formS.get('bronhAstma').markAsPristine()
    this.formS.get('cancer').setValue('')
    this.formS.get('cancer').markAsPristine()
    this.formS.get('kidneyDes').setValue('')
    this.formS.get('kidneyDes').markAsPristine()
    this.formS.get('outcomeHosp').setValue('')
    this.formS.get('outcomeHosp').markAsPristine()
    this.formS.get('clinVarCovid').setValue('')
    this.formS.get('clinVarCovid').markAsPristine()
    this.formS.get('severityCovid').setValue('')
    this.formS.get('severityCovid').markAsPristine()
    this.formS.get('covidMKB10Short').setValue('')
    this.formS.get('covidMKB10Short').markAsPristine()
    this.formS.get('covidMKB10Long').setValue('')
    this.formS.get('covidMKB10Long').markAsPristine()
    this.formS.get('tubercuosisShort').setValue('')
    this.formS.get('tubercuosisShort').markAsPristine()
    this.formS.get('tubercuosisLong').setValue('')
    this.formS.get('tubercuosisLong').markAsPristine()
    this.formS.get('pneumoniaShort').setValue('')
    this.formS.get('pneumoniaShort').markAsPristine()
    this.formS.get('pneumoniaLong').setValue('')
    this.formS.get('pneumoniaLong').markAsPristine()
    this.formS.get('typeAvl').setValue('')
    this.formS.get('typeAvl').markAsPristine()
    this.formS.get('commitment').setValue('')
    this.formS.get('commitment').markAsPristine()
    this.formS.get('comm').setValue('')
    this.formS.get('comm').markAsPristine()
  }

  update(){
    let oldValue = this.pervValue;
    let curValue = this.formS.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          let item: Covid ={
            idCovid: curValue[index].idCovid,
            periodDesDate: curValue[index].periodDesDate,
            positiveResCovidDate: curValue[index].positiveResCovidDate,
            negativeResCovidDate: curValue[index].negativeResCovidDate,
            hospDate: curValue[index].hospDate,
            dischargeDate: curValue[index].dischargeDate,
            outPatTreat: curValue[index].outPatTreat,
            deathCovid: curValue[index].deathCovid,
            orit: curValue[index].orit,
            oxygen: curValue[index].oxygen,
            avl: curValue[index].avl,
            arterHyper: curValue[index].arterHyper,
            deabetes: curValue[index].deabetes,
            coronarySynd: curValue[index].coronarySynd,
            hobl: curValue[index].hobl,
            bronhAstma: curValue[index].bronhAstma,
            cancer: curValue[index].cancer,
            kidneyDes: curValue[index].kidneyDes,
            outcomeHosp: curValue[index].outcomeHosp,
            clinVarCovid: curValue[index].clinVarCovid,
            severityCovid: curValue[index].severityCovid,
            covidMKB10Short: curValue[index].covidMKB10Short,
            covidMKB10Long: curValue[index].covidMKB10Long,
            tubercuosisShort: curValue[index].tubercuosisShort,
            tubercuosisLong: curValue[index].tubercuosisLong,
            pneumoniaShort: curValue[index].pneumoniaShort,
            pneumoniaLong: curValue[index].pneumoniaLong,
            typeAvl: curValue[index].typeAvl,
            commitment: curValue[index].commitment,
            comm: curValue[index].comm
          }
          this.patientService.updateCovid(item).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }
}