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