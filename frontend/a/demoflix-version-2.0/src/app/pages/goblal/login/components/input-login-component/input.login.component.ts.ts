import { Component, Input } from '@angular/core';
import { InputLoginData } from '../../login-date-model';

@Component({
  selector: 'app-input-login-component-ts',
  imports: [],
  templateUrl: './input.login.component.ts.html',
  styleUrl: './input.login.component.ts.css',
})
export class InputLoginComponentTs {
  @Input() receiveDataInput: InputLoginData =
    {
      title: "Full name",
      type: "text",
      placeholderText: "Digite seu nome",
      inconUrl: "https://cdn-icons-png.flaticon.com/512/847/847969.png"
    }



}
