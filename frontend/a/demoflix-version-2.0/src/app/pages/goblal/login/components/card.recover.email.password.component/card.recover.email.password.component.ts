import { Component } from '@angular/core';
import { TitleCardsPageLoginComponent } from '../title-cards-page-login-component/title.cards.page.login.component';
import { LoginAuthLinkComponent } from '../login.auth.link.component/login.auth.link.component';
import { InputLoginComponentTs } from '../input-login-component/input.login.component.ts';
import { ButtonLoginSubmitComponent } from '../button-login-submit-component/button.login.submit.component';
import { InputLoginData } from '../../login-date-model';

@Component({
  selector: 'app-card-recover-email-password-component',
  imports: [TitleCardsPageLoginComponent, ButtonLoginSubmitComponent, InputLoginComponentTs, LoginAuthLinkComponent],
  templateUrl: './card.recover.email.password.component.html',
  styleUrl: './card.recover.email.password.component.css',
})
export class CardRecoverEmailPasswordComponent {
  protected dataInputLogin: InputLoginData = 
    {
      title: "Endereço E-mail",
      placeholderText: "example@gmail.com",
      type: "email",
      inconUrl: "https://api.iconify.design/material-symbols:mail.svg?color=%23e0e0e0"
    }
}
