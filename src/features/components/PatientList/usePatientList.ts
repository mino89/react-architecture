import { useContext, useEffect } from "react";
import { ToastContext } from "../../../components/Toaster/ToastContext";
import { useService } from "../../../core/hooks/useService";
import { UserMessagesService } from "../../../core/services/user-messages-service";
import { ColumnConfig } from "../../../components/Table/_types";

export function useList() {
  const toastService = useService(UserMessagesService);
  const { addToast } = useContext(ToastContext);
  
  useEffect(() => {
    if (toastService.message) {
      addToast(toastService.message?.type, toastService.message?.message, toastService.message?.duration);
    }
  }, [addToast, toastService.message]);


  const columnsConfig: ColumnConfig[] = [
    {
      key: "familyName",
      label: "Family Name",
      filterType: "text",
      type: "string",
    },
    {
      key: "givenName",
      label: "Given Name",
      filterType: "text",
      type: "string",
    },
    {
      key: "birthDate",
      label: "Birth Date",
      filterType: "date",
      type: "date",
    },
    {
      key: "sex",
      label: "Sex",
      filterType: "select",
      type: "string",
    },
    {
      key: "numberOfParameters",
      label: "Number of Parameters",
      filterType: "number",
      type: "number",
    },
    {
      key: "hasAlarm",
      label: "Has Alarm",
      filterType: "select",
      type: "boolean",
    },
  ];

  return {
    columnsConfig,
  };
}
