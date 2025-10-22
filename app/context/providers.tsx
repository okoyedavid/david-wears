"use client";
import { store } from "@/app/store/store";
import { fetchUsers } from "@/components/users/usersSlice";
import { Provider as ProviderWrapper } from "react-redux";

store.dispatch(fetchUsers());

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
