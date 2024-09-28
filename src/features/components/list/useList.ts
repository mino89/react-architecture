import { useContext, useEffect } from "react";
import { ToastContext } from "../../../components/Toaster/ToastContext";
import { useService } from "../../../core/hooks/useService";
import { UserMessagesService } from "../../../core/services/user-messages-service";

export function useList() {
  const toastService = useService<UserMessagesService>("UserMessagesService");
  const { addToast } = useContext(ToastContext);
  useEffect(() => {
    if (toastService.message) {
      addToast(toastService.message?.type, toastService.message?.message);
    }
  }, [addToast, toastService.message]);
}
