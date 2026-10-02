import { AbstractControl } from "@angular/forms";


export function validateFildIsNumber(control: AbstractControl) {
    const codeVerification = control.value;

    const isNumber = /^[0-9]+$/.test(codeVerification);

    if (isNumber) {
        return null;
    }

    return { isNotNumber: true };
}