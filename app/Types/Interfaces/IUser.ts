import { JWTPayload } from 'jose'
export interface IUserRegistration{
    name: string;
    email: string;
    address: string;
    password: string;
    password_confirmation: string;
    phone_number: string;
}

export interface ILoginDetails {
    email: string;
    password: string
}

export interface IChangePassword {
    email:string;
    password: string
    password_confirmation: string;
    token: string | null
}
export interface SessionPayload extends JWTPayload {
    userId: string
}

export interface IResetPassword {
    email: string;
}

export interface IErrorResponse {
    errors?: IErrors;
    message?: string; 
    status?: boolean
}

export interface IErrors {
    email?: string[];
    url?: string[];  
}