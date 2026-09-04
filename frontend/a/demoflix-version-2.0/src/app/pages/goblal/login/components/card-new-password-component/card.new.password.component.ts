import { Component } from '@angular/core';
import { ButtonLoginSubmitComponent } from '../button-login-submit-component/button.login.submit.component';
import { InputLoginComponentTs } from '../input-login-component/input.login.component.ts';
import { LoginAuthLinkComponent } from '../login.auth.link.component/login.auth.link.component';
import { TitleCardsPageLoginComponent } from '../title-cards-page-login-component/title.cards.page.login.component';
import { InputLoginData } from '../../login-date-model';

@Component({
  selector: 'app-card-new-password-component',
  imports: [TitleCardsPageLoginComponent, ButtonLoginSubmitComponent, InputLoginComponentTs, LoginAuthLinkComponent],
  templateUrl: './card.new.password.component.html',
  styleUrl: './card.new.password.component.css',
})
export class CardNewPasswordComponent {
  protected dataInputLogin: InputLoginData[] =
    [{
      title: "nova senha",
      placeholderText: "********",
      type: "password",
      inconUrl: "https://api.iconify.design/material-symbols:lock.svg?color=%23e0e0e0"
    },
    {
      title: "Confirme nova senha",
      placeholderText: "*******",
      type: "password",
      inconUrl: "https://api.iconify.design/material-symbols:lock.svg?color=%23e0e0e0"
    }
    ]

}
