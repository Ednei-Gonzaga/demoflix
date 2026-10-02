import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-loading-component',
  imports: [],
  templateUrl: './card.loading.component.html',
  styleUrl: './card.loading.component.css',
})
export class CardLoadingComponent {
  @Input() title: string = "Defaunt value";
  @Input() description: string = "Defaunt value";

}
