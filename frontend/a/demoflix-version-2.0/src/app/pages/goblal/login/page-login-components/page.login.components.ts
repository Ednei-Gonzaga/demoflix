import { Component } from '@angular/core';
import { InputLoginComponentTs } from '../components/input-login-component/input.login.component.ts';
import { CardLoginComponent } from '../components/card-login-component/card.login.component.js';
import { CardCreatedAccountComponent } from '../components/card-created-account-component/card.created.account.component.js';

@Component({
  selector: 'app-page-login-components',
  imports: [CardLoginComponent, CardCreatedAccountComponent],
  standalone: true,
  templateUrl: './page.login.components.html',
  styleUrl: './page.login.components.css',
})
export class PageLoginComponents {

}
