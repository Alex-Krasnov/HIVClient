import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardDiagnosticManualModel } from 'src/app/_interfaces/patient-card-diagnostic-manual.model';
import { ListService } from 'src/app/services/list.service';
import { PatientCardDiagnosticManualService } from 'src/app/services/patient-card/patient-card-diagnostic-manual.service';
import { InList } from 'src/app/validators/in-lst';
import { PatientCardDiagnosticManualForm } from './patient-card-diagnostic-manual-form.model';
import { ModalService } from 'src/app/services/modal.service';
import { ModalPatientCardService } from 'src/app/services/patient-card/modal-patient-card.service';

@Component({
  selector: 'app-patient-card-diagnostic-manual',
  templateUrl: './patient-card-diagnostic-manual.component.html',
  styleUrls: ['./patient-card-diagnostic-manual.component.css']
})
export class PatientCardDiagnosticManualComponent implements OnInit {
  private PatineCardEpidForm: BehaviorSubject<FormGroup | undefined>
  PatineCardEpidForm$: Observable<FormGroup>

  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu: boolean = false;
  isVisibleAddit: boolean = false;
  vlIsValid: boolean = true;
  hcIsValid: boolean = true;
  hbIsValid: boolean = true;
  IsErr: boolean = false;
  needUpd: boolean = false;

  Id: number;
  type1 = 'vl';
  type2 = 'hc';
  type3 = 'hb';
  patient: PatientCardDiagnosticManualModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;

  patientVls = new FormArray([]);
  patientHcs = new FormArray([]);
  patientHbs = new FormArray([]);

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardDiagnosticManualService,
    private fb: FormBuilder,
    private router: Router,
    public modal: ModalService,
    private listService: ListService,
    private pcModal: ModalPatientCardService
  ) { }

  ngOnInit() {

    this.pcModal.patientId.subscribe(id => { this.Id = id })
    this.pcModal.goNext.subscribe(name => { this.leaveComponent(name) })
    this.getData()
  }

  getData(): void {
    this.patientService.getData(this.Id)
      .subscribe((data: PatientCardDiagnosticManualModel) => {
        this.patient = data;
        this.initForm();
      });
  }

  initForm() {
    this.PatineCardEpidForm = new BehaviorSubject(this.fb.group(new PatientCardDiagnosticManualForm(this.patient)));
    this.PatineCardEpidForm$ = this.PatineCardEpidForm.asObservable();

    this.patientFormSub = this.PatineCardEpidForm$
      .subscribe(data => {
        this.patientForm = data;
      });

    this.patient.virusLoads.map(
      (item: any) => {
        const sForm = new FormGroup({
          date: new FormControl(item.date, Validators.required),
          result: new FormControl(item.result),
          resultDescr: new FormControl(item.resultDescr, {
            asyncValidators: [InList.validateVl(this.listService)],
            updateOn: 'blur'
          })
        });
        this.patientVls.push(sForm);
      }
    );

    this.patient.hepCs.map(
      (item: any) => {
        const sForm = new FormGroup({
          date: new FormControl(item.date, Validators.required),
          result: new FormControl(item.result),
          resultDescr: new FormControl(item.resultDescr, {
            asyncValidators: [InList.validateHc(this.listService)],
            updateOn: 'blur'
          })
        });
        this.patientHcs.push(sForm);
      }
    );

    this.patient.hepBs.map(
      (item: any) => {
        const sForm = new FormGroup({
          date: new FormControl(item.date, Validators.required),
          result: new FormControl(item.result),
          resultDescr: new FormControl(item.resultDescr, {
            asyncValidators: [InList.validateHb(this.listService)],
            updateOn: 'blur'
          })
        });
        this.patientHbs.push(sForm);
      }
    );
    console.log(this.vlIsValid, this.hcIsValid, this.hbIsValid);

    this.patientForm.statusChanges.subscribe((status) => {
      if (status == 'VALID')
        this.needUpd = true;
    })
  }

  giveVLForUpd(isValid: boolean) {
    this.vlIsValid = isValid;
  }

  giveHCForUpd(isValid: boolean) {
    this.hcIsValid = isValid;
  }

  giveHBForUpd(isValid: boolean) {
    this.hbIsValid = isValid;
  }

  leaveComponent(name: string) {
    if (this.vlIsValid && this.hcIsValid && this.hbIsValid) {

      // if (this.needUpd)
      //   this.updatePatient()

      if (name == 'close') {
        this.pcModal.close()
      } else {
        this.pcModal.currentPage.next(name)
      }

    } else {
      Object.keys(this.patientForm.controls).forEach(
        (data: any) => {
          if (this.patientForm.controls[data].invalid)
            console.log("err", data);
        }
      )
      confirm(`Ошибка в заполнении данных!`)
    }
  }

  openReferalAnalysis() {
    this.modal.referalAnalysisOpen()
  }
}
