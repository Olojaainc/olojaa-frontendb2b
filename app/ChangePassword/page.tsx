"use client";
import { Alert } from "antd";
import AuthLayout from "@/app/Layouts/AuthLayout";
import Link from "next/link";
import Image from "next/image";
import { startTransition, Suspense, useActionState, useState } from "react";
import { changePassword } from "../Auth/actions";
import { useSearchParams } from "next/navigation";

function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const decodedEmail = email ? decodeURIComponent(email) : "";
  const token = searchParams.get("token");

  const [formValues, setFormValues] = useState({
    email: decodedEmail,
    password: "",
    password_confirmation: "",
    token: token,
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
      {state?.message && (
        <Alert
          className="fixed top-6 w-72"
          message={state?.message}
          type="error"
          showIcon
          closable
          closeIcon
        />
      )}
      <div className="bg-white w-[464px] h-auto px-8 py-10 rounded-3xl shadow-lg">
        <div className="mb-8">
          <h3 className="font-bold text-xl mb-1"> Change your Password</h3>
          <p className="font-normal text-sm text-[var(--gray-600)]">
            Enter your new password for your Olooja account.
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
                  <div className=" shadow-sm items-center bg-white ">
                    <input
                      id={item.name}
                      name={item.name}
                      type="text"
                      value={
                        formValues[item.name as keyof typeof formValues] || ""
                      }
                      onChange={handleChange}
                      placeholder={item.placeholder}
                      className=" grow py-1.5 pl-1 text-base  text-[var(--gray-700)] border border-[var(--gray-200)] w-[400px] rounded-xl placeholder:text-[var(--gray-300)] focus:outline-none sm:text-sm/6"
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
            <button className="bg-[var(--primary-400)] text-white w-[400px] py-2.5 mb-8 px-4 mt-4 rounded-xl">
              {pending ? "Resetting password..." : "Reset Password"}
            </button>
            <Link
              href={"/signin"}
              className="text-sm  font-medium text-[var(--primary-400)]"
            >
              Back to Sign in?
            </Link>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function ChangePassword() {
  return (
    <Suspense>
      <ChangePasswordForm />
    </Suspense>
  );
}
