import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageLoginComponents } from './pages/goblal/login/page-login-components/page.login.components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageLoginComponents],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('demoflix-version-2.0');
}
