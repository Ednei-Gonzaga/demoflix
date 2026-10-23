interface BaseAuthLogin {
    email: string;
    senha: string;
}

export interface DataFormCreatedAccount extends BaseAuthLogin {
    nome: string
}

export interface DataFormLogin extends BaseAuthLogin{}

export interface DataNewPassword {
    codigo: string,
    senha: string
}

export interface DataFormRecoverEmail {
    email: string;
}

export interface DataFormVerificationCode{
    code: string;
}