import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchSharedServiceService } from 'src/app/services/search-shared-service.service';

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
    private router: Router
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
}
