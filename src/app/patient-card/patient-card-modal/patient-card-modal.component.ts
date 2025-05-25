import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { ModalPatientCardService } from 'src/app/services/patient-card/modal-patient-card.service';
import { PatientCardSubService } from 'src/app/services/patient-card/patient-card-sub.service';

@Component({
  selector: 'app-patient-card-modal',
  templateUrl: './patient-card-modal.component.html',
  styleUrls: ['./patient-card-modal.component.css']
})
export class PatientCardModalComponent implements OnInit, OnDestroy{
  isVisibleMenu: boolean = false;
  patientId: number | null
  patientFio: string
  currentPage: string
  isNonResident: boolean
  private destroy$ = new Subject<void>();

  constructor(
    public modal: ModalPatientCardService,
    private service: PatientCardSubService,
    public sharedModal: ModalService
  ) { }

  ngOnInit(): void {
    this.modal.patientId
    .pipe(takeUntil(this.destroy$))
    .subscribe(id => {

      this.patientId = id

      if(id == null){
        this.patientFio = "Создание нового пациента"
      }
      else{
        this.service.GetFio(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(obj => {
          this.patientFio =  obj.patientFio
          this.isNonResident = obj.isNonResident
        })
      }

    })

    this.modal.currentPage
    .pipe(takeUntil(this.destroy$))
    .subscribe(name => {this.currentPage = name})

    
  }

  ngOnDestroy() {
    this.destroy$.next(); // Триггерим завершение
    this.destroy$.complete(); // Очищаем память
  }

  openDropdown(): void {
    this.isVisibleMenu = !this.isVisibleMenu;
  }
}
