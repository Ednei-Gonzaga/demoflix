import { Component, inject, signal } from '@angular/core';
import { InputLoginComponentTs } from '../components/input-login-component/input.login.component.ts';
import { CardLoginComponent } from '../components/card-login-component/card.login.component.js';
import { CardCreatedAccountComponent } from '../components/card-created-account-component/card.created.account.component.js';
import { CardRecoverEmailPasswordComponent } from "../components/card.recover.email.password.component/card.recover.email.password.component.js";
import { CardNewPasswordComponent } from "../components/card-new-password-component/card.new.password.component.js";
import { CardVerificationCodeComponent } from "../components/card.verification.code.component/card.verification.code.component";
import { FloatingInformationMessageComponent } from "../../../../shared/components/floating.information.message.component/floating.information.message.component";
import { NgClass } from "../../../../../../node_modules/@angular/common";
import { CardLoadingComponent } from "../../../../shared/components/card.loading.component/card.loading.component";
import { DataFormLogin } from '../models/forms.page.login.model.js';
import { LoginService } from '../../../../../core/auth/login/service/login.service.js';
import { PageLoadingService } from '../../../../shared/components/card.loading.component/service/page.loading.service.js';
import { FloatingInformationService } from '../../../../shared/components/floating.information.message.component/floating.information.service.js';
import { ErrorPatternReturn } from '../../../../../core/infra/model/errors.model.js';

@Component({
  selector: 'app-page-login-components',
  imports: [CardLoginComponent, CardCreatedAccountComponent, CardRecoverEmailPasswordComponent, CardNewPasswordComponent, CardVerificationCodeComponent, FloatingInformationMessageComponent, NgClass, CardLoadingComponent],
  standalone: true,
  templateUrl: './page.login.components.html',
  styleUrl: './page.login.components.css',
})
export class PageLoginComponents {
  private loginService = inject(LoginService);
  private pageLoadingService = inject(PageLoadingService);
  private floatingInformationService = inject(FloatingInformationService)

  protected cardsVisibilit =signal<"login" | "createLogin" | "newPassword" | "recoverEmail" | "verificationCode" | "loadingCard">("login");

  protected changeActiveCard(nameCard: "login" | "createLogin" | "newPassword" | "recoverEmail" | "verificationCode"  | "loadingCard"): void{
    this.cardsVisibilit.set(nameCard)
  }
 

  // Metodos privados

  protected sendLogin(dataFormLogin: DataFormLogin){
    // Colocando card de carreamento
    this.pageLoadingService.updateMessage("Entrando na Conta", "Aguarde enquanto estamos verificando seus dados...");
    this.changeActiveCard("loadingCard");

    // Realizando login
    this.loginService.sendLogin(dataFormLogin).subscribe({
      next: response => {
        localStorage.setItem("token", response.token);
        
        setTimeout(() => {
          this.floatingInformationService.updateDataMessage('Login Realizado!', 'Você já pode aproveitar o Demoflix.', false);
          this.pageLoadingService.updateMessage("Tudo pronto!", "Você será redirecionado para o Demoflix em instantes...");
          // COLOCAR AQUI DIRECIONAMENTO PARA PAGINA HOME
        }, 3000)
        
      },
      error: error => {
        if(error.status == 401){
        setTimeout(() => {
          this.changeActiveCard('login');
          this.floatingInformationService.updateDataMessage("Dados Incorretos!", "Login ou Senha estão incorretos.", true);
        },2000);
        }
        
      }
    })
  }

}

