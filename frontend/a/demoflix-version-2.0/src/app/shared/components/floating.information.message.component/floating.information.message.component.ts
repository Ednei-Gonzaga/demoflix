import { Component, inject, Input } from '@angular/core';
import { iconError, iconSucess } from '../../../../environments/environments-icons';
import { NgClass } from "../../../../../node_modules/@angular/common";
import { FloatingInformationService } from './floating.information.service';

@Component({
  selector: 'app-floating-information-message-component',
  imports: [NgClass],
  templateUrl: './floating.information.message.component.html',
  styleUrl: './floating.information.message.component.css',
})
export class FloatingInformationMessageComponent {
  protected floatingMessageService = inject(FloatingInformationService);
 protected errorIcon: string = iconError;
  protected sucessIcon: string = iconSucess;


}
