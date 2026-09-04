import { Component } from '@angular/core';
import { InputLoginComponentTs } from '../components/input-login-component/input.login.component.ts';
import { CardLoginComponent } from '../components/card-login-component/card.login.component.js';
import { CardCreatedAccountComponent } from '../components/card-created-account-component/card.created.account.component.js';
import { CardRecoverEmailPasswordComponent } from "../components/card.recover.email.password.component/card.recover.email.password.component.js";
import { CardNewPasswordComponent } from "../components/card-new-password-component/card.new.password.component.js";
import { CardVerificationCodeComponent } from "../components/card.verification.code.component/card.verification.code.component";

@Component({
  selector: 'app-page-login-components',
  imports: [CardLoginComponent, CardCreatedAccountComponent, CardRecoverEmailPasswordComponent, CardNewPasswordComponent, CardVerificationCodeComponent],
  standalone: true,
  templateUrl: './page.login.components.html',
  styleUrl: './page.login.components.css',
})
export class PageLoginComponents {

}
