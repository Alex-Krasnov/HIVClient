import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TalonModel } from 'src/app/_interfaces/talon.model';
import { ModalService } from 'src/app/services/modal.service';
import { TalonService } from 'src/app/services/talon.service';
import { TalonForm } from './talon-form.model';
import { ListService } from 'src/app/services/list.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-talon',
  templateUrl: './talon.component.html',
  styleUrls: ['./talon.component.css']
})
export class TalonComponent implements OnInit {
  private TalonForm: BehaviorSubject<FormGroup | undefined>
  TalonForm$: Observable<FormGroup>
  TalonFormSub: Subscription;

  talonForm: FormGroup;
  talon: TalonModel;

  @Input() id: string; 
  @Input() date: Date; 
  @Input() cab: string;

 constructor (
  public modalService: ModalService,
  private services: TalonService,
  private fb: FormBuilder,
  private listService: ListService
 ){ }


  ngOnInit() {
    this.getData()
  }

  getData(): void {
    this.services.getData(this.id, this.date.toString(), this.cab)
    .subscribe((data:TalonModel) => {
      this.talon = data;      
      this.initForm();
    });
  }

  initForm(){
    this.TalonForm = new BehaviorSubject(this.fb.group(new TalonForm(this.listService ,this.talon, this.id, this.date, this.cab)));
    this.TalonForm$ = this.TalonForm.asObservable();

    this.TalonFormSub = this.TalonForm$
      .subscribe(data => {
        this.talonForm = data;
    });
  }

  async createTalon(){
    console.log(this.talonForm);
    
    if(this.talonForm.valid){
      let regCab = this.talonForm.get('regCab').value
      let regDate = this.talonForm.get('regDate').value
      let talonNum = this.talonForm.get('talonNum').value
      let field01 = this.talonForm.get('field01').value
      let field12 = this.talonForm.get('field12').value
      let field13 = this.talonForm.get('field13').value
      let field14 = this.talonForm.get('field14').value
      let field21 = this.talonForm.get('field21').value
      let field22 = this.talonForm.get('field22').value
      let field24 = this.talonForm.get('field24').value
      let field25 = this.talonForm.get('field25').value
      let field35 = this.talonForm.get('field35').value
      let field36 = this.talonForm.get('field36').value
      this.services.createTalon
      (
        this.id,
        regCab,
        regDate,
        talonNum,
        field01,
        field12,
        field13,
        field14,
        field21,
        field22,
        field24,
        field25,
        field35,
        field36
        ).subscribe()
        return 0
    }
    confirm(`Ошибка в заполнении данных!`)
    return 0
  }

  givePdf(){

  }
}
