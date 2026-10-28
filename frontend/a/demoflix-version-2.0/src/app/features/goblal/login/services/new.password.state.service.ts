import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class NewPasswordStateService{
    lastCodeVerification = signal<string>("");

     storeDataFormRecovery(code: string): void {
        this.lastCodeVerification.set(code);
    }

    deleteDataFormRecovery(): void {
        this.lastCodeVerification.set("");
    }
        
    
}