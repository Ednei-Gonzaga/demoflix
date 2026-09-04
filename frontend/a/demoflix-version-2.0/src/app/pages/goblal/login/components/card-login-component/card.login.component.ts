import { Component } from '@angular/core';
import { InputLoginComponentTs } from '../input-login-component/input.login.component.ts.js';
import { ButtonLoginSubmitComponent } from '../button-login-submit-component/button.login.submit.component.js';
import { LoginAuthLinkComponent } from '../login.auth.link.component/login.auth.link.component.js';
import { TitleCardsPageLoginComponent } from '../title-cards-page-login-component/title.cards.page.login.component.js';

@Component({
  selector: 'app-card-login-component',
  imports: [ButtonLoginSubmitComponent, InputLoginComponentTs, LoginAuthLinkComponent, TitleCardsPageLoginComponent],
  templateUrl: './card.login.component.html',
  styleUrl: './card.login.component.css',
})
export class CardLoginComponent {

}
