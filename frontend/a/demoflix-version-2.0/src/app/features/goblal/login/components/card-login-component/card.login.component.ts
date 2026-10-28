import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { InputLoginComponentTs } from '../input-login-component/input.login.component.ts.js';
import { ButtonLoginSubmitComponent } from '../button-login-submit-component/button.login.submit.component.js';
import { LoginAuthLinkComponent } from '../login.auth.link.component/login.auth.link.component.js';
import { TitleCardsPageLoginComponent } from '../title-cards-page-login-component/title.cards.page.login.component.js';
import { InputLoginData } from '../../models/login-date-model.js';
import { iconEmail, iconPassword } from '../../../../../../environments/environments-icons.js';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { DataFormLogin } from '../../models/forms.page.login.model.js';
import { FloatingInformationService } from '../../../../../shared/components/floating.information.message.component/floating.information.service.js';
import { LoginStateService } from '../../services/login.state.service.js';

@Component({
  selector: 'app-card-login-component',
  imports: [ReactiveFormsModule, ButtonLoginSubmitComponent, InputLoginComponentTs, LoginAuthLinkComponent, TitleCardsPageLoginComponent, ɵInternalFormsSharedModule],
  templateUrl: './card.login.component.html',
  styleUrl: './card.login.component.css',
})
export class CardLoginComponent {
  @Input() dataFieldEmail: string = "";
    protected loginStateService = inject(LoginStateService);
  

  protected formLogin: FormGroup = new FormGroup({
    email: new FormControl(this.loginStateService.lastLoginEmail() , [Validators.email, Validators.required]),
    senha: new FormControl("", [Validators.required])
  });

  protected dataInputLogin: InputLoginData[] = [
    {
      title: "Endereço E-mail",
      type: "email",
      placeholderText: "Digite seu email cadastrado",
      inconUrl: iconEmail,
      formControl: this.formLogin.get('email') == null ? new FormControl('') : this.formLogin.get('email') as FormControl
    },

    {
      title: "Senha",
      type: "password",
      placeholderText: "Digite sua senha",
      inconUrl: iconPassword,
      formControl: this.formLogin.get("senha") == null ? new FormControl('') : this.formLogin.get("senha") as FormControl
    }
  ];

  @Output() clickForgotPasswordEvent = new EventEmitter<void>();

  @Output() clickCreateLoginEvent = new EventEmitter<void>();

  @Output() dataFormLogin = new EventEmitter<DataFormLogin>();

  private floatingMessageService = inject(FloatingInformationService);


  //Metodos

  protected onSubmit(){
    if(this.formLogin.invalid){
      this.floatingMessageService.updateDataMessage("Campos Incorretos!", "EMAIL ou SENHA estão incorretos.", true)
    }else{
      this.dataFormLogin.emit(this.formLogin.value as DataFormLogin);
    }
  }

  protected onClickForgotPassword() {
    this.clickForgotPasswordEvent.emit();
  }

  protected onClickCreateLoginEvent() {
    this.clickCreateLoginEvent.emit();
  }


}
