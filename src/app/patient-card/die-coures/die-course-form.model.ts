import { FormControl} from '@angular/forms'
import { DieCourseAdvancedModel } from 'src/app/_interfaces/die-course-advanced.model';
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';

export class DieCourseForm {
    patientId = new FormControl()
    dieCourseShort1 = new FormControl()
    dieCourseShort2 = new FormControl()
    dieCourseShort3 = new FormControl()
    dieCourseShort4 = new FormControl()
    dieCourseShort5 = new FormControl()
    dieCourseLong1 = new FormControl()
    dieCourseLong2 = new FormControl()
    dieCourseLong3 = new FormControl()
    dieCourseLong4 = new FormControl()
    dieCourseLong5 = new FormControl()



    constructor(private listService: ListService, data: DieCourseAdvancedModel) 
    {
      this.patientId.setValue(data.patientId)
      this.patientId.disable()

      
      this.dieCourseShort1.setValue(data.dieCourseShort1)
      this.dieCourseShort2.setValue(data.dieCourseShort2)
      this.dieCourseShort3.setValue(data.dieCourseShort3)
      this.dieCourseShort4.setValue(data.dieCourseShort4)
      this.dieCourseShort5.setValue(data.dieCourseShort5)
      this.dieCourseLong1.setValue(data.dieCourseLong1)
      this.dieCourseLong2.setValue(data.dieCourseLong2)
      this.dieCourseLong3.setValue(data.dieCourseLong3)
      this.dieCourseLong4.setValue(data.dieCourseLong4)
      this.dieCourseLong5.setValue(data.dieCourseLong5)

      this.dieCourseShort1.setAsyncValidators(InList.validateDieCourseShort(this.listService))
      this.dieCourseShort2.setAsyncValidators(InList.validateDieCourseShort(this.listService))
      this.dieCourseShort3.setAsyncValidators(InList.validateDieCourseShort(this.listService))
      this.dieCourseShort4.setAsyncValidators(InList.validateDieCourseShort(this.listService))
      this.dieCourseShort5.setAsyncValidators(InList.validateDieCourseShort(this.listService))
      this.dieCourseLong1.setAsyncValidators(InList.validateDieCourseLong(this.listService))
      this.dieCourseLong2.setAsyncValidators(InList.validateDieCourseLong(this.listService))
      this.dieCourseLong3.setAsyncValidators(InList.validateDieCourseLong(this.listService))
      this.dieCourseLong4.setAsyncValidators(InList.validateDieCourseLong(this.listService))
      this.dieCourseLong5.setAsyncValidators(InList.validateDieCourseLong(this.listService))
    }
}