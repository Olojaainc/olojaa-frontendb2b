'use client'
import Link from "next/link";
import AuthLayout from "./Layout";
import Image from "next/image";
import { startTransition, useActionState, useState } from "react";
import { signup } from "../Auth/actions";
import { Alert } from 'antd';


export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    // const formData = new FormData();
    // Object.entries(formValues).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });

    startTransition(() => {
      action(formValues);
    }); 
  };

  const sign = [
    {
      label: "Business Name",
      name: "name",
      placeholder: "Newday Corp",
      error: state?.errors?.name,
    },
    {
      label: "Business Address",
      name: "address",
      placeholder: "18, Newday Corp, Lekki, Lagos, Nigeria",
      error: state?.errors?.address,
    },
    {
      label: "Business Email",
      name: "email",
      placeholder: "business@newday.com",
      error: state?.errors?.email,
    },
    {
      label: "Phone Number",
      name: "phone_number",
      placeholder: "080-000-0000",
      error: state?.errors?.phone_number,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Password",
      error: state?.errors?.password,
    },
    {
      label: "Confirm Password",
      name: "password_confirmation",
      placeholder: "Confirm Password",
      error: state?.errors?.password_confirmation,
    },
  ];


  return (
    <AuthLayout>
      {
        state?.message && (
          <Alert className="fixed top-6 w-72" message={state?.message} type="error" showIcon closable />
        )
      }
      <div className="bg-white w-[500px] h-auto px-8 py-10 rounded-3xl shadow-lg">
        <div className="mb-8">
          <h3 className="font-bold text-xl"> Create Business Account</h3>
          <p className="font-normal text-sm text-[var(--gray-600)]">
            Already have an account?{" "}
            <Link href={"/login"} className="text-[var(--primary-400)]">
              Sign in
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            {sign.map((item, index) => (
              <div key={item.name + index} className="mb-4">
                <label
                  htmlFor={item.name}
                  className="block text-sm/6 font-medium text-[var(--gray-900)]"
                >
                  {item.label}
                </label>
                <div className="mb-2">
                  <div className="  rounded-xl shadow-sm  items-center border border-[var(--gray-200)] bg-white pl-3 ">
                    <input
                      id={item.name}
                      name={item.name}
                      onChange={handleChange}
                      value={formValues[item.name as keyof typeof formValues]}
                      type="text"
                      placeholder={item.placeholder}
                      className=" grow py-1.5 pl-1 text-base text-[var(--gray-700)]  placeholder:text-[var(--gray-300)] focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>
                {item.error && (
                  <div className="flex flex-col text-xs text-[var(--error-400)]">
                    {item.error.map((errMsg, i) => (
                      <div key={i} className="flex items-start">
                        <Image
                          className="mr-1 w-4 h-4"
                          alt="Error"
                          src={"/error.svg"}
                          width={16}
                          height={16}
                        />
                        <p>{errMsg}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="bg-[var(--primary-400)] text-white w-[400px] py-2.5 px-4 mt-4 rounded-xl"
            >
              {pending ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
