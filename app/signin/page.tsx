"use client";
import Link from "next/link";
import Image from "next/image";
import { startTransition, useActionState, useState } from "react";
import { login } from "../Auth/actions";
import { Alert } from "antd";
import AuthLayout from "../Layouts/AuthLayout";
import { Eye, EyeOff } from "lucide-react";

export default function Signin() {
  const [state, action, pending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

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
    event.preventDefault();

    startTransition(() => {
      action(formValues);
    });
  };

  const Login = [
    {
      label: "Email",
      name: "email",
      placeholder: "business@newday.com",
      error: state?.errors?.email,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Password",
      error: state?.errors?.password,
    },
  ];
  return (
    <AuthLayout>
      {state?.message && (
        <Alert
          className="fixed top-6 text-center w-72"
          message={state?.message}
          type="error"
          showIcon
          closable
          closeIcon
        />
      )}
      <div className="bg-white w-[464px] h-auto px-8 py-10 rounded-3xl shadow-lg">
        <div className="mb-8">
          <h3 className="font-bold text-xl mb-1"> Sign In</h3>
          <p className="font-normal text-sm text-[var(--gray-600)]">
            New to Olooja?{" "}
            <Link href={"/signup"} className="text-[var(--primary-400)]">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="flex flex-col">
          <form onSubmit={handleSubmit}>
            {Login.map((item, index) => (
              <div key={index} className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm/6 font-medium text-[var(--gray-900)]"
                >
                  {item.label}
                </label>
                <div className="mb-2">
                  <div className="shadow-sm items-center bg-white relative">
                    <input
                      id={item.name}
                      name={item.name}
                      type={item.name === "password" ? (showPassword ? "text" : "password") : "text"}
                      value={formValues[item.name as keyof typeof formValues]}
                      onChange={handleChange}
                      placeholder={item.placeholder}
                      className="grow py-1.5 pl-1 pr-10 text-base rounded-xl w-[400px] border border-[var(--gray-200)] text-[var(--gray-700)] placeholder:text-[var(--gray-300)] focus:outline-none sm:text-sm/6"
                    />
                    {item.name === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--gray-400)] hover:text-[var(--gray-600)]"
                      >
                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                      </button>
                    )}
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
            <Link
              href={"/forgotpassword"}
              className="text-sm font-medium text-[var(--primary-400)]"
            >
              Forgot Password
            </Link>
            <button className="bg-[var(--primary-400)] text-white w-[400px] py-2.5 px-4 mt-4 rounded-xl">
              {pending ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
