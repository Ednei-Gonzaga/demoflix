import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login-auth-link-component',
  imports: [],
  templateUrl: './login.auth.link.component.html',
  styleUrl: './login.auth.link.component.css',
})
export class LoginAuthLinkComponent {
  @Input() isCardCreatedAccount: boolean = false;


}
