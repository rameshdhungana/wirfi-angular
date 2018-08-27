import {Directive, ElementRef, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {Subscription} from 'rxjs';

@Directive({
    selector: '[validatePassword]',
})
export class ValidatePasswordDirective {

    @Input('validatePassword') password: string;

    constructor() {

        console.log(this.password,111111111)
    }


}

