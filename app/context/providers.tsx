"use client";
import { store } from "@/app/store/store";
import { Provider as ProviderWrapper } from "react-redux";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ProviderWrapper store={store}>{children}</ProviderWrapper>
    </div>
  );
}
