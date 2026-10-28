import { Component, inject, signal } from '@angular/core';
import { CardLoginComponent } from './components/card-login-component/card.login.component.js';
import { CardCreatedAccountComponent } from './components/card-created-account-component/card.created.account.component.js';
import { CardRecoverEmailPasswordComponent } from "./components/card.recover.email.password.component/card.recover.email.password.component.js";
import { CardNewPasswordComponent } from "./components/card-new-password-component/card.new.password.component.js";
import { CardVerificationCodeComponent } from "./components/card.verification.code.component/card.verification.code.component.js";
import { FloatingInformationMessageComponent } from "../../../shared/components/floating.information.message.component/floating.information.message.component.js";
import { NgClass } from "@angular/common";
import { CardLoadingComponent } from "../../../shared/components/card.loading.component/card.loading.component.js";
import { DataFormCreatedAccount, DataFormLogin, DataFormRecoverEmail, DataNewPassword } from './models/forms.page.login.model.js';
import { LoginService } from '../../../../core/auth/login/service/login.service.js';
import { PageLoadingService } from '../../../shared/components/card.loading.component/service/page.loading.service.js';
import { FloatingInformationService } from '../../../shared/components/floating.information.message.component/floating.information.service.js';
import { UserPasswordUpdateRequest } from '../../../../core/models/user.model.js';
import { LoginStateService  } from './services/login.state.service.js';
import { CreateAccountStateService } from './services/create.account.state.service.js';
import { RecoveryFormStateService } from './services/recovery.form.state.service.js';
import { NewPasswordStateService } from './services/new.password.state.service.js';

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
  private floatingInformationService = inject(FloatingInformationService);
  protected loginStateService  = inject(LoginStateService );
  protected createAccountStateService = inject(CreateAccountStateService);
  private recoveryFormStateService = inject(RecoveryFormStateService);
  private newPasswordStateService = inject(NewPasswordStateService);

  protected cardsVisibilit =signal<"login" | "createLogin" | "newPassword" | "recoverEmail"  | "loadingCard">("login");

  protected changeActiveCard(nameCard: "login" | "createLogin" | "newPassword" | "recoverEmail"   | "loadingCard"): void{
    this.cardsVisibilit.set(nameCard)
  }
 

  // Metodos privados

  private requestCodeVerification(dataFormRecover: DataFormRecoverEmail):void {
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
        console.log(error.error)
            this.floatingInformationService.updateDataMessage(
            "Código não enviado!",
            "Não foi possível concluir sua solicitação. Tente novamente mais tarde.",
            true
          );
          this.changeActiveCard("recoverEmail");
      }
    })
  }


  // Metodos consumo backend para login
  protected sendLogin(dataFormLogin: DataFormLogin){
    // ColLoginStorageocando card de carreamento
    this.pageLoadingService.updateMessage("Entrando na Conta...", "Aguarde enquanto estamos verificando seus dados...");
    this.changeActiveCard("loadingCard");

    //Armazenando email caso dar errado o login 
    this.loginStateService.storeDataFormLogin(dataFormLogin.email);

    // Realizando login
    this.loginService.sendLogin(dataFormLogin).subscribe({
      next: response => {
        localStorage.setItem("token", response.token);

        // Limpando email armazenado para caso de erros
        this.loginStateService.deletetStoreDataFormLogin();
        
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
          this.changeActiveCard("login");

          this.floatingInformationService.updateDataMessage(
            "Erro ao realizar login!",
            "Não foi possível entrar com o ligin. Tente novamente mais tarde.",
            true
          );
        }
        
      }
    })
  }


  protected createdAccount(dataFormCratedAccount: DataFormCreatedAccount){

    this.pageLoadingService.updateMessage("Criando Conta...", "Aguarde enquanto estamos registando seus dados...");
    this.changeActiveCard("loadingCard");

    //Armazenando dados para caso de erros
    this.createAccountStateService.storeDataFormCreateAccount({nome: dataFormCratedAccount.nome, email: dataFormCratedAccount.email});

    this.loginService.createAccount(dataFormCratedAccount).subscribe({
      next: response => {
        this.floatingInformationService.updateDataMessage('Conta Criada!', 'Você já pode fazer login e aproveitar o Demoflix.', false);
        
        this.createAccountStateService.deleteDataFormCreateAccount();

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
    this.recoveryFormStateService.storeDataFormRecovery(dataFormRecover.email);
    this.requestCodeVerification(dataFormRecover);
  }

  protected requestVerificationCode(): void {

    if(this.recoveryFormStateService.lastEmailRecovery() == ""){
      this.floatingInformationService.updateDataMessage("Não foi possível continuar!", "Informe seu e-mail novamente para continuar a recuperação da senha.", true);
      this.changeActiveCard("recoverEmail");
    }else{
      this.requestCodeVerification({email: this.recoveryFormStateService.lastEmailRecovery()} as DataFormLogin);
    }
  }


  protected changePasswordRequest(formNewPassword: DataNewPassword){
    const fullDataForNewPassword = {
      codigo: formNewPassword.codigo,
      novaSenha: formNewPassword.senha,
      email: this.recoveryFormStateService.lastEmailRecovery()
      }

    this.pageLoadingService.updateMessage("Verificando Dados...", "Validando seu código de verificação e conferindo se sua nova senha atende aos requisitos...");
    this.changeActiveCard("loadingCard");

     //Armazenar ultimo codigo verificação caso dê algum erro
    this.newPasswordStateService.storeDataFormRecovery(formNewPassword.codigo);

    this.loginService.changePasswordRequest(fullDataForNewPassword as UserPasswordUpdateRequest).subscribe({
      next: response => {
        //Deletar dados salvos quando dava erro
        this.newPasswordStateService.deleteDataFormRecovery();
        this.recoveryFormStateService.deleteDataFormRecovery();

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

