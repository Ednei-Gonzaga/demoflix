import { Component } from '@angular/core';
import { ButtonLoginSubmitComponent } from '../button-login-submit-component/button.login.submit.component';
import { InputLoginComponentTs } from '../input-login-component/input.login.component.ts';
import { LoginAuthLinkComponent } from '../login.auth.link.component/login.auth.link.component';
import { TitleCardsPageLoginComponent } from '../title-cards-page-login-component/title.cards.page.login.component';
import { InputLoginData } from '../../login-date-model';

@Component({
  selector: 'app-card-verification-code-component',
    imports: [TitleCardsPageLoginComponent, ButtonLoginSubmitComponent, InputLoginComponentTs, LoginAuthLinkComponent],
  templateUrl: './card.verification.code.component.html',
  styleUrl: './card.verification.code.component.css',
})
export class CardVerificationCodeComponent {
    protected dataInputLogin: InputLoginData =  {
      title: "Código de Verificação",
      placeholderText: "098079",
      type: "text",
      inconUrl: "https://api.iconify.design/material-symbols:password.svg?color=%23e0e0e0"
    }

}
