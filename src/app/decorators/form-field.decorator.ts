import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

// Декоратор для поля
export function FormField(config: FieldConfig) {
  return function (target: any, propertyKey: string) {
    // Сохраняем метаданные в прототипе класса
    const metadata = Reflect.getMetadata('formFields', target) || {};
    metadata[propertyKey] = config;
    Reflect.defineMetadata('formFields', metadata, target);
  };
}

// да простят меня боги
class FieldConfig {
  value?: any = '';
  disabled?: boolean = false;
  validators?: ValidatorFn[];
  asyncValidators?: AsyncValidatorFn[];
}