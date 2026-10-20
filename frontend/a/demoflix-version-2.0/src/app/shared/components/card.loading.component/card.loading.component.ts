import { Component, inject, Input } from '@angular/core';
import { PageLoadingService } from './service/page.loading.service';

@Component({
  selector: 'app-card-loading-component',
  imports: [],
  templateUrl: './card.loading.component.html',
  styleUrl: './card.loading.component.css',
})
export class CardLoadingComponent {
  protected pageLoadingService = inject(PageLoadingService);

}
