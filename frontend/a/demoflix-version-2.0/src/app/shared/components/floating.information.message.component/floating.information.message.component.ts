import { Component, Input } from '@angular/core';
import { iconError, iconSucess } from '../../../../environments/environments-icons';
import { NgClass } from "../../../../../node_modules/@angular/common";

@Component({
  selector: 'app-floating-information-message-component',
  imports: [NgClass],
  templateUrl: './floating.information.message.component.html',
  styleUrl: './floating.information.message.component.css',
})
export class FloatingInformationMessageComponent {
  @Input() messageDescription: string = "Title message";
  @Input() titleSituation: string = "Description message"
  @Input() isMessageError: boolean = true;
  protected errorIcon: string = iconError;
  protected sucessIcon: string = iconSucess;


}
