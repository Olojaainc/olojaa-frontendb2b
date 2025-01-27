import Link from "next/link";
import AuthLayout from "../Signup/Layout";

export default function Login() {


    const Login = [
        {
            name: 'Email',
            placeholder: 'business@newday.com'
        },
        {
            name: 'Password',
            placeholder: 'Password'
        },
    ]
    return (
        <AuthLayout>
            <div className="bg-white w-[464px] h-auto px-8 py-10 rounded-3xl shadow-lg">
                <div className="mb-8">
                    <h3 className="font-bold text-xl mb-1"> Sign In</h3>
                    <p className="font-normal text-sm text-[var(--gray-600)]">New to Olooja? <Link href={'/Signup'} className="text-[var(--primary-400)]">Sign Up</Link></p>
                </div>
                
                <div className="flex flex-col">
                    {
                        Login.map((item, index) => (
                            <div key={index} className="mb-4">
                                <label htmlFor="price" className="block text-sm/6 font-medium text-[var(--gray-900)]">
                                    {item.name}
                                </label>
                                <div className="mt-2">
                                    <div className=" w-[400px] rounded-xl shadow-sm  items-center border border-[var(--gray-200)] bg-white pl-3 ">
                                        <input
                                            id={item.name}
                                            name={item.name}
                                            type="text"
                                            placeholder={item.placeholder}
                                            className=" grow py-1.5 pl-1 text-base text-[var(--gray-300)] placeholder:text-[var(--gray-300)] focus:outline-none sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                    <Link href={'/ForgotPassword'} className="text-sm font-medium text-[var(--primary-400)]">Forgot Password</Link>
                    <button className="bg-[var(--primary-400)] text-white w-[400px] py-2.5 px-4 mt-4 rounded-xl">Sign In</button>
                </div>
            </div>
        </AuthLayout>
    )
}