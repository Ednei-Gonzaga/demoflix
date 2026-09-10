import { Component } from '@angular/core';
import { ButtonLoginSubmitComponent } from '../button-login-submit-component/button.login.submit.component';
import { InputLoginComponentTs } from '../input-login-component/input.login.component.ts';
import { LoginAuthLinkComponent } from '../login.auth.link.component/login.auth.link.component';
import { TitleCardsPageLoginComponent } from '../title-cards-page-login-component/title.cards.page.login.component';
import { iconEmail, iconPassword, iconUser } from '../../../../../../environments/environments-icons';
import { InputLoginData } from '../../login-date-model';

@Component({
  selector: 'app-card-created-account-component',
  imports: [ButtonLoginSubmitComponent, InputLoginComponentTs, LoginAuthLinkComponent, TitleCardsPageLoginComponent],
  templateUrl: './card.created.account.component.html',
  styleUrl: './card.created.account.component.css',
})
export class CardCreatedAccountComponent {

  protected dataInputLogin: InputLoginData[] = [
    {
      title: "Nome",
      type: "text",
      placeholderText: "Crie seu nome ou apelido",
      inconUrl: iconUser
    },
    {
      title: "Endereço E-mail",
      type: "email",
      placeholderText: "Crie seu email para login",
      inconUrl: iconEmail
    },

    {
      title: "Senha",
      type: "password",
      placeholderText: "Crie sua senha",
      inconUrl: iconPassword
    },
    {
      title: "Confirme Senha",
      type: "password",
      placeholderText: "Digite a mesma senha criada acima",
      inconUrl: iconPassword
    }
  ];
}

