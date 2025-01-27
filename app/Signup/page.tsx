import Link from "next/link";
import AuthLayout from "./Layout";

export default function Signup() {

    const sign = [
        {
            name: 'Business Name',
            placeholder: 'Newday Corp'
        },
        {
            name: 'Business Address',
            placeholder: '18, Newday Corp, Lekki, Lagos, Nigeria'
        },
        {
            name: 'Business Email',
            placeholder: 'business@newday.com'
        },
        {
            name: 'Phone Number',
            placeholder: '080-000-0000'
        },
        {
            name: 'Password',
            placeholder: 'Password'
        },
        {
            name: 'Confirm Password',
            placeholder: 'Confirm Password'
        },
    ]

    return (
        <AuthLayout>
            <div className="bg-white w-[500px] h-auto px-8 py-10 rounded-3xl shadow-lg">
                <div className="mb-8">
                    <h3 className="font-bold text-xl"> Create Business Account</h3>
                    <p className="font-normal text-sm text-[var(--gray-600)]">Already have an account? <Link href={'/Login'} className="text-[var(--primary-400)]">Sign in</Link></p>
                </div>
                
                <div className="flex flex-col">
                    {
                        sign.map((item, index) => (
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
                    <button className="bg-[var(--primary-400)] text-white w-[400px] py-2.5 px-4 mt-4 rounded-xl">Sign Up</button>
                </div>
            </div>
        </AuthLayout>
    );
}