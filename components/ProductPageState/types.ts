import { ReactNode } from "react";

export type PageShellProps = {
  children: ReactNode;
  busy?: boolean;
};

export type ProductErrorProps = {
  message: string;
  onReload?: () => void;
};
