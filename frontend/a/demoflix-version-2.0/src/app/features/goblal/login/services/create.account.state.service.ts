import { Injectable, signal } from "@angular/core";
import { CreateAccountRecoveryData } from "../models/loginPageStorage.model";

 @Injectable({
    providedIn: 'root'
 })

 export class CreateAccountStateService{
    lastDataCreateAccount = signal<CreateAccountRecoveryData>({
        nome: "",
        email: ""
    });


    storeDataFormCreateAccount(data: CreateAccountRecoveryData): void {
        this.lastDataCreateAccount.set(data);
    }
    

    deleteDataFormCreateAccount(): void {
        this.lastDataCreateAccount.set( {
                nome: "",
                email: ""
        });
    }
}