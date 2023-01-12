import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';
import { uuidValidator } from './uuidValidator';

@Directive({
  selector: '[uuid]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UuidValidatorDirective),
      multi: true
    }
  ]
})
export class UuidValidatorDirective {
  validate(control: FormControl) {
   return uuidValidator(control);
  }
}