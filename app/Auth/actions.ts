'use server'
import { SignupSchema, FormState, loginSchema, changePasswordSchema } from '@/app/Auth/_lib/definitions';
import { createSession, deleteSession, setBearerToken } from '@/app/Auth/_lib/session';
import { redirect } from 'next/navigation';
import { IChangePassword, ILoginDetails, IUserRegistration } from '../Types/Interfaces/IUser';

 
export async function signup(state: FormState, formData: IUserRegistration) {
  
	const validatedFields = SignupSchema.safeParse(formData);

	if (!validatedFields.success) {
		return { errors: validatedFields.error.flatten().fieldErrors };
	}

	const { name, email, password, address, phone_number } = validatedFields.data;

	const res = await fetch('https://olojaa-backendb2b.onrender.com/api/v1/auth/register', {
	method: 'POST',
	headers: { 
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	},
	body: JSON.stringify({
		name,
		email,
		password,
		password_confirmation: password,
		address,
		phone_number
	}),
	});


	if (!res.ok) {
	const errorResponse = await res.json();
	return { message: errorResponse.message || "An error occurred while creating your account." };
	}

	const user = await res.json();

	await createSession(user.slug);
	redirect('/dashboard');
  
}

export async function login(state: FormState, formData: ILoginDetails) {
		const validatedFields = loginSchema.safeParse(formData);
	
		if (!validatedFields.success) {
			return { errors: validatedFields.error.flatten().fieldErrors };
		}
	
		const { email, password } = validatedFields.data;
	
		const res = await fetch('https://olojaa-backendb2b.onrender.com/api/v1/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
	
		const user = await res.json();
	
		if (!res.ok) {
			return { message: user.message || 'Invalid credentials. Please try again.' };
		}
	
		if (user.data.token) {
			await setBearerToken(user.data.token);
		}
	
		await createSession(user.slug);
	
		// ✅ No need to catch redirect!
		redirect('/dashboard');
  }
 
export async function changePassword(state: FormState, formData: IChangePassword) {
	const validatedFields = changePasswordSchema.safeParse(formData);

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { email, password, token } = validatedFields.data;

	const res = await fetch('https://olojaa-backendb2b.onrender.com/api/v1/change-password', {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({ email, password, password_confirmation:password, token: token }),
	});

	const data = await res.json();

	if (!res.ok) {
		return {
			message: data.message || 'Unexpected error occurred. Please try again.',
		};
	}
  
}
export async function logout() {
  deleteSession()
  redirect('/login')
}