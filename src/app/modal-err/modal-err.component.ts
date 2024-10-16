import { publishFacade } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ErrService } from '../services/err.service';

@Component({
  selector: 'app-modal-err',
  templateUrl: './modal-err.component.html',
  styleUrls: ['./modal-err.component.css']
})
export class ModalErrComponent implements OnInit{
  constructor(
    public errService: ErrService
  ){}

  msg: string
  ngOnInit(): void {
    console.log(this.errService.errData);
    let endInd = this.errService.errData.error.indexOf("at")
    this.msg = this.errService.errData.error.substring("System.Exception: ".length, endInd)
    
  }
}
