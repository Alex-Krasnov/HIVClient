import { Component, OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  homeString: string = "2";
  


  constructor(private http: HttpClient){  }

  ngOnInit() { 
    
  }  
}
