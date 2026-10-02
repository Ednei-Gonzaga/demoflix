import { AbstractControl } from "@angular/forms";

export function validatePassword(control: AbstractControl){
    const password = control.value;

    const uppercase = /[A-Z]/.test(password);

    if(uppercase){
        return null;
    }

    return {invalidPassword: true};
}