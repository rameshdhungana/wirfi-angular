import { Directive , Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[validateEqual]',
  providers: [{provide: NG_VALIDATORS, useExisting: TextComparatorDirective, multi: true}]
})
export class TextComparatorDirective implements Validator {

  @Input('validateEqual') validateEqual: string;
  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const validateEqualElement = control.root.get(this.validateEqual);
    if (validateEqualElement) {
      const subscription: Subscription = validateEqualElement.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
        subscription.unsubscribe();
        }
      );
    }
    return validateEqualElement && validateEqualElement.value !== control.value ? {'validateEqual': true} : null;
  }
}
