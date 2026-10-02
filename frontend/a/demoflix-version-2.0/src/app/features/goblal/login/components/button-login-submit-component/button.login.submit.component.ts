import { Component, Input } from '@angular/core';
import { NgClass } from "../../../../../../../node_modules/@angular/common";

@Component({
  selector: 'app-button-login-submit-component',
  imports: [NgClass],
  templateUrl: './button.login.submit.component.html',
  styleUrl: './button.login.submit.component.css',
})
export class ButtonLoginSubmitComponent {
  @Input() titleButton: string = "Created Account";
   @Input() isEnable: boolean = false;

}
