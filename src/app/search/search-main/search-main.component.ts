import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ModalPatientCardService } from 'src/app/services/patient-card/modal-patient-card.service';
import { SearchSharedServiceService } from 'src/app/services/search/search-shared-service.service';

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.css']
})
export class SearchMainComponent implements OnInit{
  name: string
  currentRouter = this.router.url;

  constructor(
    public shared: SearchSharedServiceService,
    private router: Router,
    public modal: ModalPatientCardService
  ){}

  ngOnInit() {
    this.shared.nameSearch$.subscribe(item => this.name = item)
    this.shared.search$.next('')
    this.shared.excel$.next('')
  }

  reload(){
    window.location.reload();
  }

  searchGive(){
    this.shared.searchGive(this.name)
  }

  excelGive(){
    this.shared.excelGive(this.name)
  }

  newPatient(){
    this.modal.open()
    this.modal.currentPage.next('main')
    this.modal.patientId.next(null)
  }
}
