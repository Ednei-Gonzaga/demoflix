import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ButtonLoginSubmitComponent } from '../button-login-submit-component/button.login.submit.component';
import { InputLoginComponentTs } from '../input-login-component/input.login.component.ts';
import { LoginAuthLinkComponent } from '../login.auth.link.component/login.auth.link.component';
import { TitleCardsPageLoginComponent } from '../title-cards-page-login-component/title.cards.page.login.component';
import { InputLoginData } from '../../login-date-model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validateFildIsNumber } from '../../validators/codeVerification.validator.form';
import { DataFormRecoverEmail } from '../../models/forms.page.login.model';
import { FloatingInformationService } from '../../../../../shared/components/floating.information.message.component/floating.information.service';

@Component({
  selector: 'app-card-verification-code-component',
  imports: [TitleCardsPageLoginComponent, ButtonLoginSubmitComponent, InputLoginComponentTs, LoginAuthLinkComponent, ReactiveFormsModule],
  templateUrl: './card.verification.code.component.html',
  styleUrl: './card.verification.code.component.css',
})
export class CardVerificationCodeComponent {
  protected verificationForm = new FormGroup({
    codeVerification: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), validateFildIsNumber])
  })

  protected dataInputLogin: InputLoginData = {
    title: "Código de Verificação",
    placeholderText: "098079",
    type: "text",
    inconUrl: "https://api.iconify.design/material-symbols:password.svg?color=%23e0e0e0",
    formControl: this.verificationForm.get('codeVerification') == null ? new FormControl('') : this.verificationForm.get('codeVerification') as FormControl
  }

  private floatingMessageService = inject(FloatingInformationService);

  @Output() clickLoginEvent = new EventEmitter<void>();
  @Output() dataFormVerificationCode = new EventEmitter<DataFormRecoverEmail>();

  //Metodos
  protected onClickLoginEvent() {
    this.clickLoginEvent.emit();
  }



  protected onSubmit(){
      if(this.verificationForm.invalid){
        this.floatingMessageService.updateDataMessage("Campo Incorreto!", "O CÓDIGO deve conter 6 DÍGITOS e ser APENAS NÚMEROS.", true);
      }
      else{
        this.dataFormVerificationCode.emit(this.verificationForm.value as DataFormRecoverEmail);
      }
  }
}
