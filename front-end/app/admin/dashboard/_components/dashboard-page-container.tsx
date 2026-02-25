export const DashboardPageContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="mx-auto max-w-300 px-4 py-14 2xl:max-w-380">
      {children}
    </main>
  );
};
