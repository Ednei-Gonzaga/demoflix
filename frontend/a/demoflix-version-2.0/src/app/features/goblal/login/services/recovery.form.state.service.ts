import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class RecoveryFormStateService{
    lastEmailRecovery = signal<string>("");
    

     storeDataFormRecovery(email: string): void {
        this.lastEmailRecovery.set(email);
    }

    deleteDataFormRecovery(): void {
        this.lastEmailRecovery.set("");
    }
        
    
}