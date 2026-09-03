import { Component } from '@angular/core';
import { ButtonLoginSubmitComponent } from '../button-login-submit-component/button.login.submit.component';
import { InputLoginComponentTs } from '../input-login-component/input.login.component.ts';
import { LoginAuthLinkComponent } from '../login.auth.link.component/login.auth.link.component';

@Component({
  selector: 'app-card-created-account-component',
  imports: [ButtonLoginSubmitComponent, InputLoginComponentTs, LoginAuthLinkComponent],
  templateUrl: './card.created.account.component.html',
  styleUrl: './card.created.account.component.css',
})
export class CardCreatedAccountComponent {

}

