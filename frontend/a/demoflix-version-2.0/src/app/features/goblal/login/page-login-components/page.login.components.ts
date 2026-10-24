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
import { DataFormCreatedAccount, DataFormLogin, DataFormRecoverEmail, DataNewPassword } from '../models/forms.page.login.model.js';
import { LoginService } from '../../../../../core/auth/login/service/login.service.js';
import { PageLoadingService } from '../../../../shared/components/card.loading.component/service/page.loading.service.js';
import { FloatingInformationService } from '../../../../shared/components/floating.information.message.component/floating.information.service.js';
import { StandardResponse } from '../../../../../core/infra/model/errors.model.js';
import { UserPasswordUpdateRequest } from '../../../../../core/models/user.model.js';

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

  protected cardsVisibilit =signal<"login" | "createLogin" | "newPassword" | "recoverEmail"  | "loadingCard">("newPassword");

  protected changeActiveCard(nameCard: "login" | "createLogin" | "newPassword" | "recoverEmail"   | "loadingCard"): void{
    this.cardsVisibilit.set(nameCard)
  }
 

  // Metodos privados

  protected sendLogin(dataFormLogin: DataFormLogin){
    // Colocando card de carreamento
    this.pageLoadingService.updateMessage("Entrando na Conta...", "Aguarde enquanto estamos verificando seus dados...");
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

        }else if(error.status === 0){
          setTimeout(() => {
            this.changeActiveCard('login');
            this.floatingInformationService.updateDataMessage("Falha na conexão!", "Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.", true);
        },2000);
        }else {
          this.changeActiveCard("createLogin");

          this.floatingInformationService.updateDataMessage(
            "Erro ao criar conta!",
            "Não foi possível concluir seu cadastro. Tente novamente mais tarde.",
            true
          );
        }
        
      }
    })
  }


  protected createdAccount(dataFormCratedAccount: DataFormCreatedAccount){

    this.pageLoadingService.updateMessage("Criando Conta...", "Aguarde enquanto estamos registando seus dados...");
    this.changeActiveCard("loadingCard");

    this.loginService.createAccount(dataFormCratedAccount).subscribe({
      next: response => {
        this.floatingInformationService.updateDataMessage('Conta Criada!', 'Você já pode fazer login e aproveitar o Demoflix.', false);

        setTimeout(() => {
          this.changeActiveCard("login");
        }, 2000)

      },

      error: error => {

        if(error.status == 422){
          this.changeActiveCard("createLogin")
          this.floatingInformationService.updateDataMessage('Conta já cadastrada!', 'Já existe uma conta vinculada a este e-mail. Tente fazer login ou utilize outro endereço de e-mail.', true);
        }else if(error.status === 0){
          setTimeout(() => {
            this.changeActiveCard('login');
            this.floatingInformationService.updateDataMessage("Falha na conexão!", "Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.", true);
        },2000);
        }else {
          this.changeActiveCard("createLogin");

          this.floatingInformationService.updateDataMessage(
            "Erro ao criar conta!",
            "Não foi possível concluir seu cadastro. Tente novamente mais tarde.",
            true
          );
        }

      }
    })
  }

  protected sendPasswordRecoveryCode (dataFormRecover: DataFormRecoverEmail){
    this.pageLoadingService.updateMessage("Enviando Codigo..", "Estamos enviando código para seu e-mail...");
    this.changeActiveCard("loadingCard");

    this.loginService.sendPasswordRecoveryCode(dataFormRecover).subscribe({
      next: response => {  
        setTimeout(() => {
          this.changeActiveCard("newPassword");
          this.floatingInformationService.updateDataMessage(
            "Código enviado!",
            "Verifique seu e-mail e informe o código de 6 dígitos.",
            false
          );
          
        }, 2000);
        
      },
      error: error => {
            this.floatingInformationService.updateDataMessage(
            "Código não enviado!",
            "Não foi possível concluir sua solicitação. Tente novamente mais tarde.",
            true
          );
          this.changeActiveCard("recoverEmail");
      }
    })
  }

  protected changePasswordRequest(formNewPassword: DataNewPassword){
    const fullDataForNewPassword = {
      codigo: formNewPassword.codigo,
      novaSenha: formNewPassword.senha,
      email: localStorage.getItem('recoveryEmail')
      }
    
      alert(fullDataForNewPassword.codigo)
      alert(fullDataForNewPassword.novaSenha)
      alert(fullDataForNewPassword.email)


      this.pageLoadingService.updateMessage("Verificando Dados...", "Estamos validando seu código de verificação e conferindo se sua nova senha atende aos requisitos. Aguarde um instante...");
    this.changeActiveCard("loadingCard");

    this.loginService.changePasswordRequest(fullDataForNewPassword as UserPasswordUpdateRequest).subscribe({
      next: response => {
        this.floatingInformationService.updateDataMessage("Senha Alterada!", "Sua senha foi redefinida com sucesso. Agora você já pode entrar na sua conta com sua nova senha.", false);
        this.changeActiveCard("login");
      },
      error: error => {
        this.changeActiveCard("newPassword");
          if(error.status == 422){
            this.floatingInformationService.updateDataMessage("Não foi possível alterar a senha!", "O e-mail ou o código de verificação é inválido. Confira os dados informados e tente novamente.", true);
          }else{
            this.floatingInformationService.updateDataMessage(
            "Não foi possível alterar a senha!",
            "Não foi possível concluir sua solicitação. Tente novamente mais tarde.",
            true
          );
          }
      }
      
    })
  }
}

