export default function Layout({
  children,
  store,
}: {
  children: React.ReactNode;
  store: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center items-start gap-8 w-full mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col justify-center items-center w-full">
        {store}
        <div className="flex justify-center items-center gap-2 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
