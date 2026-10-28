import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TitleCardsPageLoginComponent } from '../title-cards-page-login-component/title.cards.page.login.component';
import { LoginAuthLinkComponent } from '../login.auth.link.component/login.auth.link.component';
import { InputLoginComponentTs } from '../input-login-component/input.login.component.ts';
import { ButtonLoginSubmitComponent } from '../button-login-submit-component/button.login.submit.component';
import { InputLoginData } from '../../models/login-date-model';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { DataFormRecoverEmail } from '../../models/forms.page.login.model';
import { FloatingInformationService } from '../../../../../shared/components/floating.information.message.component/floating.information.service';
import { iconEmail } from '../../../../../../environments/environments-icons';
import { RecoveryFormStateService } from '../../services/recovery.form.state.service';

@Component({
  selector: 'app-card-recover-email-password-component',
  imports: [TitleCardsPageLoginComponent, ButtonLoginSubmitComponent, InputLoginComponentTs, LoginAuthLinkComponent, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './card.recover.email.password.component.html',
  styleUrl: './card.recover.email.password.component.css',
})
export class CardRecoverEmailPasswordComponent {
  private recoveryFormStateService = inject(RecoveryFormStateService);

  protected formRecoverEmail: FormGroup = new FormGroup({
    email: new FormControl(this.recoveryFormStateService.lastEmailRecovery(), [Validators.email, Validators.required])
  });

  protected dataInputLogin: InputLoginData =
    {
      title: "Endereço E-mail",
      placeholderText: "example@gmail.com",
      type: "email",
      inconUrl: iconEmail,
      formControl: this.formRecoverEmail.get('email') == null ? new FormControl(''): this.formRecoverEmail.get('email') as FormControl
  }

  private floatingMessageService = inject(FloatingInformationService);

  @Output() clickEvent = new EventEmitter<void>();
  @Output() dataFormRecoverEmail = new EventEmitter<DataFormRecoverEmail>();

  
  //Metodos
  
  protected onClick() {
    this.clickEvent.emit();
  }

  protected onSubmit(){
    if(this.formRecoverEmail.invalid){
      this.floatingMessageService.updateDataMessage("Campo Incorreto!", "EMAIL está no formato incorreto.", true)
    }
    else{
      this.dataFormRecoverEmail.emit(this.formRecoverEmail.value as DataFormRecoverEmail);
    }
  }
}
