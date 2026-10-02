import { Injectable, signal, effect } from '@angular/core';
import { FloatingMessageData } from './floating.information.model';

@Injectable({
  providedIn: 'root',
})
export class FloatingInformationService {

  isHidden = signal(true);

  dataMessage = signal<FloatingMessageData>({
    message: "Default message",
    title: "Default title",
    isTypeError: true
  })

  updateDataMessage(title: string, message: string, isTypeError: boolean) {
    this.dataMessage.set({ title, message, isTypeError});
    this.isHidden.set(false);
  }


  constructor() {
    effect((onCleanup) => {

      if (!this.isHidden()) {
        const timer = setTimeout(() => {
          this.isHidden.set(true);
        }, 10000);

        onCleanup(() => clearTimeout(timer));
      }
    })
  }




}
