import { Component, OnInit } from '@angular/core';
import { ListSharedServiceService } from 'src/app/services/lists-services/list-shared-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './list-main.component.html',
  styleUrls: ['./list-main.component.css']
})
export class ListMainComponent implements OnInit{
  name: string

  constructor(
    public shared: ListSharedServiceService
  ){}

  ngOnInit(): void {
    this.shared.nameList$.subscribe(item => this.name = item)
  }


}
