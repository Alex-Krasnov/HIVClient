import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export function endDateValidator(): ValidatorFn {
  return (control: FormGroup): { [key: string]: any } | null => {
    
    const formGroup = control;
    const endDateControl = formGroup.get('endDate');
    const lastControl = formGroup.get('last');

    const endDate = endDateControl.value;
    const last = lastControl.value;
    const start = formGroup.get('startDate').value;

    if (!endDateControl || !lastControl) {
      return null;
    }

    console.log(!(last !== true && (endDate === null || endDate === '')));
    
    if (last !== true && (endDate === null || endDate === '')) {
      
      // endDateControl.setErrors({ endDateRequired: true });
      return { endDateRequired: true };
    } 
    // else {
    //   if (endDateControl.hasError('endDateRequired')) {
    //     endDateControl.setErrors(null);
    //     return null;
    //   }
    // }

    return null;
  };
}