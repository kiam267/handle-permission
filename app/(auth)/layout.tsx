export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto h-screen">
      <div className="flex items-center w-full justify-center flex-row h-screen">
        {children}
      </div>
    </div>
  );
}
