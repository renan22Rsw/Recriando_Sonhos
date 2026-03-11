import React from "react";

export const AppointmentPageContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <main className="flex justify-center px-4 py-24">{children}</main>;
};
