
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
        className={'bg-custom-radial bg-no-repeat bg-cover  w-full h-screen flex justify-center items-center'}
      >
        {children}
      </div>
  );
}
