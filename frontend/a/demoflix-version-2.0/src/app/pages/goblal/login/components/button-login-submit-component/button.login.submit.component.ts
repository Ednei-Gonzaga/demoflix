import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-login-submit-component',
  imports: [],
  templateUrl: './button.login.submit.component.html',
  styleUrl: './button.login.submit.component.css',
})
export class ButtonLoginSubmitComponent {
  @Input() titleButton: string = "Created Account";

}
