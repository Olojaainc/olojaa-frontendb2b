import Link from "next/link";
import AuthLayout from "../Signup/Layout";

export default function ForgotPassword() {
    return (
        <AuthLayout>
            <div className="bg-white w-[464px] h-auto px-8 py-10 rounded-3xl shadow-lg">
                <div className="mb-8">
                    <h3 className="font-bold text-xl mb-1"> Reset your Password</h3>
                    <p className="font-normal text-sm text-[var(--gray-600)]">Enter the email address linked to your Olooja account and we will send you a reset link.</p>
                </div>
                
                <div className="flex flex-col">
                    
                    <div  className="mb-4">
                        <label htmlFor="price" className="block text-sm/6 font-medium text-[var(--gray-900)]">
                            Email
                        </label>
                        <div className="mt-2">
                            <div className=" w-[400px] rounded-xl shadow-sm  items-center border border-[var(--gray-200)] bg-white pl-3 ">
                                <input
                                    id='Email'
                                    name={'Email'}
                                    type="text"
                                    placeholder={'example@mail.com'}
                                    className=" grow py-1.5 pl-1 text-base text-[var(--gray-300)] placeholder:text-[var(--gray-300)] focus:outline-none sm:text-sm/6"
                                />
                            </div>
                        </div>
                    </div>
                    <button className="bg-[var(--primary-400)] mb-4 text-white w-[400px] py-2.5 px-4 mt-4 rounded-xl">Sign In</button>
                    <Link href={'/Login'} className="text-sm font-medium text-[var(--primary-400)]">Back to Sign in?</Link>
                </div>
            </div>
        </AuthLayout>
    )
}