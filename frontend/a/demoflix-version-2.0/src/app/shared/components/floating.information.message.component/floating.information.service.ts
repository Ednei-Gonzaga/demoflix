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

  private timeoutResetAnimation:any;

  updateDataMessage(title: string, message: string, isTypeError: boolean) {
    clearTimeout(this.timeoutResetAnimation);

    this.isHidden.set(true)

    this.dataMessage.set({ title, message, isTypeError});

    this.timeoutResetAnimation = setTimeout(() => {this.isHidden.set(false)}, 50);
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
