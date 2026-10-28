import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageLoginComponents } from './features/goblal/login/page.login.components';
import { FloatingInformationMessageComponent } from "./shared/components/floating.information.message.component/floating.information.message.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageLoginComponents, FloatingInformationMessageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('demoflix-version-2.0');
}
