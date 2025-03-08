
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
        className={'bg-custom-radial bg-no-repeat bg-cover overflow-auto  w-full h-[100vh] flex justify-center items-center'}
      >
        {children}
      </div>
  );
}
