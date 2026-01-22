import Swal from "sweetalert2";
import type { SweetAlertIcon, SweetAlertOptions } from "sweetalert2";

export type NotifyAlertOptions = {
  title: string;
  text?: string;
  html?: string;
  icon?: SweetAlertIcon;
  confirmText?: string;
  confirmVariant?: "success" | "danger";
  options?: Partial<SweetAlertOptions>;
};

export type ConfirmAlertOptions = {
  title: string;
  text?: string;
  html?: string;
  icon?: SweetAlertIcon;
  confirmText?: string;
  cancelText?: string;
  options?: Partial<SweetAlertOptions>;
};

export const sweetAlert = Swal.mixin({ showCloseButton: true, allowEscapeKey: true,
  customClass: {
    confirmButton: "btn btn-outline-success",
    cancelButton: "btn btn-outline-success",
    denyButton: "btn btn-outline-secondary",
  },
});

export const notifyAlert = ({
  title,
  text,
  html,
  icon = "success",
  confirmText = "OK",
  confirmVariant = "success",
  options,
}: NotifyAlertOptions) =>
  sweetAlert.fire({
    ...(options || {}),
    title,
    text,
    html,
    icon,
    confirmButtonText: confirmText,
    customClass: {
      confirmButton:
        confirmVariant === "danger"
          ? "btn btn-danger"
          : "btn btn-outline-success",
      ...(options?.customClass || {}),
    },
  } as SweetAlertOptions);

  export const confirmAlert = ({
    title,
    text,
    html,
    icon = "question",
    confirmText = "Yes",
    cancelText = "Cancel",
    options,
  }: ConfirmAlertOptions) =>
    sweetAlert.fire({
      ...(options || {}),
      title,
      text,
      html,
      icon,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      customClass: {
        confirmButton: "btn btn-outline-success",
        ...(options?.customClass || {}),
      },
    } as SweetAlertOptions);
