export type Toast = {
  id: number;
  type: "success" | "error" | "info" | "warning";
  message: string;
};

export type ToastContextProps = {
  toasts: Toast[];
  addToast: (type: Toast["type"], message: string, duration?:number) => void;
  removeToast: (id: number) => void;
};
