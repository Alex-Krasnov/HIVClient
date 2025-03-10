import { FormControl, FormGroup } from '@angular/forms';

export function FormModel(constructor: Function) {
  const metadata = Reflect.getMetadata('formFields', constructor.prototype) || {};

  // Создаем FormControl для каждого поля на основе метаданных
  const formControls = Object.keys(metadata).reduce((acc, key) => {
    const { value, disabled, validators = [], asyncValidators = [] } = metadata[key];
    acc[key] = new FormControl(
      { value: value !== undefined ? value : '', disabled: disabled || false },
      validators,
      asyncValidators
    );
    return acc;
  }, {} as { [key: string]: FormControl });

  // Добавляем FormGroup к прототипу класса
  constructor.prototype.form = new FormGroup(formControls);
}