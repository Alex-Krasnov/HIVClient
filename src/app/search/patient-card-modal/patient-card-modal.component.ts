import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ModalPatientCardService } from 'src/app/services/patient-card/modal-patient-card.service';
import { PatientCardSubService } from 'src/app/services/patient-card/patient-card-sub.service';

@Component({
  selector: 'app-patient-card-modal',
  templateUrl: './patient-card-modal.component.html',
  styleUrls: ['./patient-card-modal.component.css']
})
export class PatientCardModalComponent implements OnInit{
  isVisibleMenu: boolean = false;
  patientId: number
  patientFio: string
  currentPage: string

  constructor(
    public modal: ModalPatientCardService,
    private service: PatientCardSubService,
    public sharedModal: ModalService
  ) { }

  ngOnInit(): void {
    this.modal.patientId.subscribe(id => {this.patientId = id})
    this.modal.currentPage.subscribe(name => {this.currentPage = name})
    this.service.GetFio(this.patientId).subscribe(obj => {this.patientFio =  obj.patientFio})
  }

  openDropdown(): void {
    this.isVisibleMenu = !this.isVisibleMenu;
  }
}
