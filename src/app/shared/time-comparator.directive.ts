import { Directive,Input } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[validateTime]',
  providers: [{provide: NG_VALIDATORS, useExisting: TimeComparatorDirective, multi: true}]
})
export class TimeComparatorDirective {

  @Input('validateTime') validateTime: string;
  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const validateTimeElement = control.root.get(this.validateTime);
    if (validateTimeElement) {
      const subscription: Subscription = validateTimeElement.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
        subscription.unsubscribe();
        }
      );
    }
    return validateTimeElement && validateTimeElement.value > control.value ? {'validateTime': true} : null;
  }

}
