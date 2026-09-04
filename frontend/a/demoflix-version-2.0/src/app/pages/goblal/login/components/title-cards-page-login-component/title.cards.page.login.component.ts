import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-cards-page-login-component',
  imports: [],
  templateUrl: './title.cards.page.login.component.html',
  styleUrl: './title.cards.page.login.component.css',
})
export class TitleCardsPageLoginComponent {
  @Input() titleCard: String = "";
  @Input() descriptionCard: String = "";

}
