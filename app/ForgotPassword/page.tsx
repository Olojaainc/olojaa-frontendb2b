"use client";
import Link from "next/link";
import AuthLayout from "../signup/Layout";
import { useState } from "react";
import { Alert } from "antd";
import { IErrorResponse } from "../Types/Interfaces/IUser";

export default function ForgotPassword() {
  const [formValues, setFormValues] = useState({ email: "" });
  const [apiResponse, setApiResponse] = useState<IErrorResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const redirectUrl =
    process.env.NEXT_PUBLIC_REDIRECT_URL ||
    "http://localhost:3000/ChangePassword";

  const resetPassword = async (formValues: string) => {
    setLoading(true);
    setApiResponse(null);
    try {
      const res = await fetch(
        "https://olojaa-backendb2b.onrender.com/api/v1/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: formValues,
            url: redirectUrl,
          }),
        }
      );

      const data: IErrorResponse = await res.json();

      if (!res.ok) {
        setApiResponse(data);
        return;
      }

      setApiResponse({ message: data.message });
    } catch (error) {
      console.error("Network error:", error);
      setApiResponse({
        message: "Network error. Please check your internet connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {apiResponse?.message && (
        <Alert
          className="fixed top-6 w-auto"
          message={apiResponse?.message}
          type={apiResponse.errors && !apiResponse.status ? "error" : "success"}
          showIcon
          closable
        />
      )}
      {apiResponse?.errors && (
        <div className="fixed top-6 w-auto">
          {apiResponse.errors.email && (
            <Alert
              message={apiResponse.errors.email}
              type="error"
              showIcon
              closable
              closeIcon
            />
          )}
          {apiResponse.errors.url && (
            <Alert
              message={apiResponse.errors.url}
              type="error"
              showIcon
              closable
              closeIcon
            />
          )}
        </div>
      )}
      <div className="bg-white w-[464px] h-auto px-8 py-10 rounded-3xl shadow-lg">
        <div className="mb-8">
          <h3 className="font-bold text-xl mb-1"> Reset your Password</h3>
          <p className="font-normal text-sm text-[var(--gray-600)]">
            Enter the email address linked to your Olooja account and we will
            send you a reset link.
          </p>
        </div>

        <div className="flex flex-col">
          <Alert
            message="If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes."
            type="info"
            showIcon
          />
          <div className="my-4">
            <label
              htmlFor="price"
              className="block text-sm/6 font-medium text-[var(--gray-900)]"
            >
              Email
            </label>
            <div className="mt-2">
              <div className=" shadow-sm  items-center bg-white  ">
                <input
                  id="email"
                  name={"email"}
                  value={formValues.email}
                  onChange={handleChange}
                  type="text"
                  placeholder={"example@mail.com"}
                  className=" grow py-1.5 pl-2 text-base  w-full text-[var(--gray-700)]  border border-[var(--gray-200)] rounded-xl placeholder:text-[var(--gray-300)] focus:outline-none sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => resetPassword(formValues.email)}
            className="bg-[var(--primary-400)] mb-4 text-white w-[400px] py-2.5 px-4 mt-4 rounded-xl"
          >
            {" "}
            {loading ? "Processing..." : "Send Reset Link"}
          </button>
          <Link
            href={"/login"}
            className="text-sm font-medium text-[var(--primary-400)]"
          >
            Back to Sign in?
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
