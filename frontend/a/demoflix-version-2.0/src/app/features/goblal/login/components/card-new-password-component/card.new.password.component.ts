import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ButtonLoginSubmitComponent } from '../button-login-submit-component/button.login.submit.component';
import { InputLoginComponentTs } from '../input-login-component/input.login.component.ts';
import { LoginAuthLinkComponent } from '../login.auth.link.component/login.auth.link.component';
import { TitleCardsPageLoginComponent } from '../title-cards-page-login-component/title.cards.page.login.component';
import { InputLoginData } from '../../login-date-model';
import { iconPassword } from '../../../../../../environments/environments-icons';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { validatePassword } from '../../validators/password.validator.form';
import { DataNewPassword } from '../../models/forms.page.login.model';
import { FloatingInformationService } from '../../../../../shared/components/floating.information.message.component/floating.information.service';
import { NgClass } from "../../../../../../../node_modules/@angular/common";
import { validateFildIsNumber } from '../../validators/codeVerification.validator.form';

@Component({
  selector: 'app-card-new-password-component',
  imports: [TitleCardsPageLoginComponent, ButtonLoginSubmitComponent, InputLoginComponentTs, LoginAuthLinkComponent, ɵInternalFormsSharedModule, ReactiveFormsModule, NgClass],
  templateUrl: './card.new.password.component.html',
  styleUrl: './card.new.password.component.css',
})
export class CardNewPasswordComponent {

  protected formNewPassword: FormGroup = new FormGroup({
    codigo: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), validateFildIsNumber]),
    senha: new FormControl('', [Validators.required, validatePassword, Validators.maxLength(16), Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  protected dataInputLogin: InputLoginData[] =
    [
    {
    title: "Código de Verificação",
    placeholderText: "098079",
    type: "text",
    inconUrl: "https://api.iconify.design/material-symbols:password.svg?color=%23e0e0e0",
    formControl: this.formNewPassword.get('codigo') == null ? new FormControl('') : this.formNewPassword.get('codigo') as FormControl
  },
      {
      title: "nova senha",
      placeholderText: "********",
      type: "password",
      inconUrl: iconPassword,
      formControl: this.formNewPassword.get('senha') == null ? new FormControl('') : this.formNewPassword.get('senha') as FormControl
    },
    {
      title: "Confirme nova senha",
      placeholderText: "*******",
      type: "password",
      inconUrl: iconPassword,
      formControl: this.formNewPassword.get('confirmPassword') == null ? new FormControl('') : this.formNewPassword.get('confirmPassword') as FormControl
    }
    ]

  @Output() clickLoginEvent = new EventEmitter<void>();
  @Output() dataFormNewPassword = new EventEmitter<DataNewPassword>();
  @Output() clickOpenCardEmail = new EventEmitter<void>();
  private floatingMessageService = inject(FloatingInformationService);

  //Metodos
  protected onClickLoginEvent(): void {
    this.clickLoginEvent.emit();
  }

  protected onSubmit() {
    if(this.formNewPassword.invalid){
      this.floatingMessageService.updateDataMessage("Campo Incorreto!", "SENHA não está no formato válido.", true)
    }
    else if(this.formNewPassword.get('senha')?.value != this.formNewPassword.get('confirmPassword')?.value ){
      this.floatingMessageService.updateDataMessage("Senhas não correspondem!", "Os campos SENHA e CONFIRME SENHA devem ser iguais.", true)
    }
    else{
      this.dataFormNewPassword.emit(this.formNewPassword.value as DataNewPassword);
      console.log(this.formNewPassword.value as DataNewPassword)
    }

  }

  protected onClickOpenCardEmail(): void{
      this.clickOpenCardEmail.emit();
  }


}
