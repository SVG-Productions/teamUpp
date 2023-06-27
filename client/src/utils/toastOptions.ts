import { ToastPosition } from "react-hot-toast";

type Toast = {
  className: string;
  position: ToastPosition;
};

export const basicToast: Toast = {
  className: "border border-borderprimary bg-primary text-primary",
  position: "bottom-left",
};
