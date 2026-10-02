
interface BaseAuthLogin {
    email: string;
    password: string;
}

export interface DataFormCreatedAccount extends BaseAuthLogin {
    name: string
}

export interface DataFormLogin extends BaseAuthLogin{}

export interface DataNewPassword {
    password: string;
}

export interface DataFormRecoverEmail {
    email: string;
}

export interface DataFormVerificationCode{
    code: string;
}