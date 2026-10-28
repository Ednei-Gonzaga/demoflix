import { Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginStateService {

  lastLoginEmail= signal<string>("");

 storeDataFormLogin(email: string): void{
    this.lastLoginEmail.set(email);
 }
 
 deletetStoreDataFormLogin(): void{
  this.lastLoginEmail.set("");
 }
  
}
