import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { NewPatientService } from 'src/app/services/new-patient.service';
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
    private service: NewPatientService
  ){}

  ngOnInit() {
    this.shared.nameSearch$.subscribe(item => this.name = item)
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

  async newPatient(){
    let id = await firstValueFrom(this.service.getData()).then()
    this.router.navigate(["/patient_card/main/"+id])
  }
}
