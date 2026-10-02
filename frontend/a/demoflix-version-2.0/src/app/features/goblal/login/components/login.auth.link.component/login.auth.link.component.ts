import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login-auth-link-component',
  imports: [],
  templateUrl: './login.auth.link.component.html',
  styleUrl: './login.auth.link.component.css',
})
export class LoginAuthLinkComponent {
  @Input() questionText: string = "";
  @Input() textButton: string = "";
  @Output() clickEvent = new EventEmitter<void>();
  
  protected onClick(){
    this.clickEvent.emit();
  }

}
