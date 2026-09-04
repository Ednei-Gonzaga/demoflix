import { Component } from '@angular/core';
import { ButtonLoginSubmitComponent } from '../button-login-submit-component/button.login.submit.component';
import { InputLoginComponentTs } from '../input-login-component/input.login.component.ts';
import { LoginAuthLinkComponent } from '../login.auth.link.component/login.auth.link.component';
import { TitleCardsPageLoginComponent } from '../title-cards-page-login-component/title.cards.page.login.component';

@Component({
  selector: 'app-card-created-account-component',
  imports: [ButtonLoginSubmitComponent, InputLoginComponentTs, LoginAuthLinkComponent, TitleCardsPageLoginComponent],
  templateUrl: './card.created.account.component.html',
  styleUrl: './card.created.account.component.css',
})
export class CardCreatedAccountComponent {

}

