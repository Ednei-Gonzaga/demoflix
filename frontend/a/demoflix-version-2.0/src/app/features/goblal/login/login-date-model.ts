import { AbstractControl, FormControl } from "@angular/forms"

export interface InputLoginData{
    title: string,
    type: string,
    placeholderText: string
    inconUrl: string
    formControl: FormControl;
}