import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ListUser } from 'src/app/_interfaces/list-user.model';
import { ListSharedServiceService } from 'src/app/services/lists-services/list-shared-service.service';
import { UserService } from 'src/app/services/lists-services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  IsErr: boolean = false;
  needUpd: boolean = false;
  listData: ListUser[] | undefined;
  listForm: FormGroup;
  listArray = new FormArray([]);
  pervValue: any;


  constructor(
    private listService: UserService,
    private fb: FormBuilder,
    public shared: ListSharedServiceService
  ){}

  ngOnInit() {
    this.getData()
  }

  getData(): void {
    this.listService.getData()
      .subscribe((data:ListUser[]) => {
        this.listData = data;
        this.pervValue = data;
        this.initForm();
      });
  }

  initForm(){
    this.shared.setNameList('Пользователи')
    this.listData.map(
      (item: ListUser) => {
        const itemForm = new FormGroup ({
          uid: new FormControl(item.uid, {updateOn: 'blur'}),
          pwd: new FormControl(item.pwd, {updateOn: 'blur'}),
          userName: new FormControl(item.userName, {updateOn: 'blur'}),
          excel: new FormControl(item.excel, {updateOn: 'blur'}),
          write: new FormControl(item.write, {updateOn: 'blur'}),
          admin: new FormControl(item.admin, {updateOn: 'blur'}),
          deleter: new FormControl(item.deleter, {updateOn: 'blur'}),
          klassif: new FormControl(item.klassif, {updateOn: 'blur'}),
          lab: new FormControl(item.lab, {updateOn: 'blur'})
        });
        this.listArray.push(itemForm);
      })

    this.listForm = this.fb.group({
      subs: this.listArray as FormArray,
      newUid: new FormControl(null, {updateOn: 'blur'}),
      newPwd: new FormControl(null, {updateOn: 'blur'}),
      newUserName: new FormControl(null, {updateOn: 'blur'}),
      newExcel: new FormControl(false, {updateOn: 'blur'}),
      newWrite: new FormControl(false, {updateOn: 'blur'}),
      newAdmin: new FormControl(false, {updateOn: 'blur'}),
      newDeleter: new FormControl(false, {updateOn: 'blur'}),
      newKlassif: new FormControl(false, {updateOn: 'blur'}),
      newLab: new FormControl(false, {updateOn: 'blur'})
    });

    this.listForm.controls['subs'].statusChanges.subscribe(() => {
      if (this.listForm.controls['subs'].valid){
        this.updateRow();
      }
    })
  }

  get subs() {
    return this.listForm.get('subs') as FormArray;
  }

  async delRow(index: number) {
    if(confirm(`Вы уверены, что хотите удалить: ${this.subs.at(index).get('uid').value}`)==false)
      return null

    if(await firstValueFrom(this.listService.del(this.subs.at(index).get('uid').value)) == 'e')
      return null
    
    this.pervValue.splice(index, 1)
    this.subs.removeAt(index)
  }

  createRow(){
    let user ={
      uid: this.listForm.get('newUid').value,
      pwd: this.listForm.get('newPwd').value,
      userName: this.listForm.get('newUserName').value,
      excel: this.listForm.get('newExcel').value,
      write: this.listForm.get('newWrite').value,
      admin: this.listForm.get('newAdmin').value,
      deleter: this.listForm.get('newDeleter').value,
      klassif: this.listForm.get('newKlassif').value,
      lab: this.listForm.get('newLab').value
    }

    if(JSON.stringify(this.pervValue).indexOf(user.uid) != -1){
      confirm(`Запись ${user.uid} уже существует`)

      this.listForm.get('newUid').setValue(null)
      this.listForm.get('newPwd').setValue(null)
      this.listForm.get('newUserName').setValue(null)
      this.listForm.get('newExcel').setValue(false)
      this.listForm.get('newWrite').setValue(false)
      this.listForm.get('newAdmin').setValue(false)
      this.listForm.get('newDeleter').setValue(false)
      this.listForm.get('newKlassif').setValue(false)
      this.listForm.get('newLab').setValue(false)

      this.listForm.get('newUid').markAsPristine()
      this.listForm.get('newPwd').markAsPristine()
      this.listForm.get('newUserName').markAsPristine()
      this.listForm.get('newExcel').markAsPristine()
      this.listForm.get('newWrite').markAsPristine()
      this.listForm.get('newAdmin').markAsPristine()
      this.listForm.get('newDeleter').markAsPristine()
      this.listForm.get('newKlassif').markAsPristine()
      this.listForm.get('newLab').markAsPristine()
      return null
    }

    const rowForm = new FormGroup ({
      uid: new FormControl(user.uid, {updateOn: 'blur'}),
      pwd: new FormControl(user.pwd, {updateOn: 'blur'}),
      userName: new FormControl(user.userName, {updateOn: 'blur'}),
      excel: new FormControl(user.excel, {updateOn: 'blur'}),
      write: new FormControl(user.write, {updateOn: 'blur'}),
      admin: new FormControl(user.admin, {updateOn: 'blur'}),
      deleter: new FormControl(user.deleter, {updateOn: 'blur'}),
      klassif: new FormControl(user.klassif, {updateOn: 'blur'}),
      lab: new FormControl(user.lab, {updateOn: 'blur'})
    });

    const rowData = {
      uid: user.uid,
      pwd: user.pwd,
      userName: user.userName,
      excel: user.excel,
      write: user.write,
      admin: user.admin,
      deleter: user.deleter,
      klassif: user.klassif,
      lab: user.lab
    }

    this.listService.create(user).subscribe()

    this.subs.push(rowForm)
    this.pervValue.push(rowData);
    
    this.listForm.get('newUid').setValue(null)
    this.listForm.get('newPwd').setValue(null)
    this.listForm.get('newUserName').setValue(null)
    this.listForm.get('newExcel').setValue(false)
    this.listForm.get('newWrite').setValue(false)
    this.listForm.get('newAdmin').setValue(false)
    this.listForm.get('newDeleter').setValue(false)
    this.listForm.get('newKlassif').setValue(false)
    this.listForm.get('newLab').setValue(false)

    this.listForm.get('newUid').markAsPristine()
    this.listForm.get('newPwd').markAsPristine()
    this.listForm.get('newUserName').markAsPristine()
    this.listForm.get('newExcel').markAsPristine()
    this.listForm.get('newWrite').markAsPristine()
    this.listForm.get('newAdmin').markAsPristine()
    this.listForm.get('newDeleter').markAsPristine()
    this.listForm.get('newKlassif').markAsPristine()
    this.listForm.get('newLab').markAsPristine()
  }

  updateRow(){
    let oldValue = this.pervValue;
    let curValue = this.listForm.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue))){
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          this.listService.update(curValue[index]).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
    }
  }
}
