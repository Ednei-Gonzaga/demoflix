import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ButtonLoginSubmitComponent } from '../button-login-submit-component/button.login.submit.component';
import { InputLoginComponentTs } from '../input-login-component/input.login.component.ts';
import { LoginAuthLinkComponent } from '../login.auth.link.component/login.auth.link.component';
import { TitleCardsPageLoginComponent } from '../title-cards-page-login-component/title.cards.page.login.component';
import { iconEmail, iconPassword, iconUser } from '../../../../../../environments/environments-icons';
import { InputLoginData } from '../../login-date-model';
import { AbstractControl, ReactiveFormsModule, FormControl, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { FloatingInformationService } from '../../../../../shared/components/floating.information.message.component/floating.information.service';
import { DataFormCreatedAccount } from '../../models/forms.page.login.model';
import { NgClass } from "../../../../../../../node_modules/@angular/common";
import { validatePassword } from '../../validators/password.validator.form';

@Component({
  selector: 'app-card-created-account-component',
  imports: [ReactiveFormsModule, ButtonLoginSubmitComponent, InputLoginComponentTs, LoginAuthLinkComponent, TitleCardsPageLoginComponent, ɵInternalFormsSharedModule, NgClass],
  templateUrl: './card.created.account.component.html',
  styleUrl: './card.created.account.component.css',
})
export class CardCreatedAccountComponent {
  @Output() clickLoginEvent = new EventEmitter<void>();
  @Output() dataFormCreatedLogin = new EventEmitter<DataFormCreatedAccount>();
  private floatingMessageService = inject(FloatingInformationService);



  protected formCreatedLogin: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16), validatePassword]),
    confirmPassword: new FormControl('', [Validators.required])
  })

  protected dataInputLogin: InputLoginData[] = [
    {
      title: "Nome",
      type: "text",
      placeholderText: "Crie seu nome ou apelido",
      inconUrl: iconUser,
      formControl: this.formCreatedLogin.get('name') == null ? new FormControl('') : this.formCreatedLogin.get('name') as FormControl
    },
    {
      title: "Endereço E-mail",
      type: "email",
      placeholderText: "Crie seu email para login",
      inconUrl: iconEmail,
      formControl: this.formCreatedLogin.get('email') == null ? new FormControl('') : this.formCreatedLogin.get('email') as FormControl
    },


    {
      title: "Senha",
      type: "password",
      placeholderText: "Crie sua senha",
      inconUrl: iconPassword,
      formControl: this.formCreatedLogin.get('password') == null ? new FormControl('') : this.formCreatedLogin.get('password') as FormControl
    },
    {
      title: "Confirme Senha",
      type: "password",
      placeholderText: "Digite a mesma senha criada acima",
      inconUrl: iconPassword,
      formControl: this.formCreatedLogin.get('confirmPassword') == null ? new FormControl('') : this.formCreatedLogin.get('confirmPassword') as FormControl
    }
  ];

  // Metodos
  protected onClickLoginEvent() {
    this.clickLoginEvent.emit();
  }

  protected onSubmit(){
    
    if (this.formCreatedLogin.invalid) {
      this.floatingMessageService.updateDataMessage("Dados Incorretos!", "Um ou mais capos estão invalidos", true);
    }
    else if (this.formCreatedLogin.get('password')?.value != this.formCreatedLogin.get('confirmPassword')?.value) {
      this.floatingMessageService.updateDataMessage("Senhas não correspondem!", "O campo SENHA e CONFIRME SENHA deve ser iguais.", true);
    }
    else{
      this.dataFormCreatedLogin.emit(this.formCreatedLogin.value as DataFormCreatedAccount);
    }
  }
}

