import type { NotifyAlertOptions, ConfirmAlertOptions } from "./sweetAlert";
import { getRoleChangeConfirmMessage, getRoleLabel, getRoleUpdateErrorMessage, type MemberRole } from "../utils/clubRoleMessages";

export const clubAlerts = {
  rulesUpdated(): NotifyAlertOptions {
    return {
      title: "Rules Updated!",
      text: "Club rules have been successfully updated.",
      icon: "success",
    };
  },
  rulesUpdateError(): NotifyAlertOptions {
    return {
      title: "Error",
      text: "Failed to update club rules. Please try again.",
      icon: "error",
      confirmVariant: "danger",
    };
  },
  confirmRemoveClubBook(bookTitle: string, clubName: string): ConfirmAlertOptions {
    return {
      title: "Remove from Club?",
      html: `Are you sure you want to remove <span class="font-italic fw-bold">'${bookTitle}'</span> from <strong>${clubName}</strong>?`,
      icon: "warning",
      confirmText: "Yes, Remove",
      cancelText: "Cancel",
    };
  },
  clubBookRemoved(bookTitle: string, clubName: string): NotifyAlertOptions {
    return {
      title: "Removed",
      html: `<p><span class="font-italic fw-bold">'${bookTitle}'</span> removed from <strong>${clubName}</strong> shelf.</p>`,
      icon: "success",
    };
  },
  shelfBookAdded(bookTitle: string): NotifyAlertOptions {
    return {
      title: "Added!",
      html: `<p><span class="font-italic fw-bold">'${bookTitle}'</span> added to your shelf.</p>`,
      icon: "success",
    };
  },
  roleChangeConfirm( memberName: string, newRole: MemberRole, currentRole?: string ): ConfirmAlertOptions {
    const { title, html } = getRoleChangeConfirmMessage( memberName, newRole, currentRole );
    return { title, html, icon: "question", confirmText: "Yes", cancelText: "Cancel", };
  },
  roleUpdated(memberName: string, newRole: MemberRole): NotifyAlertOptions {
    return {
      title: "Role Updated!",
      html: `<p><strong>${memberName}</strong> is now a ${getRoleLabel(newRole)}.</p>`,
      icon: "success",
    };
  },
  roleUpdateError({ newRole, currentRole, canAddOwner, canRemoveOwner, }: { newRole: MemberRole; currentRole?: string; canAddOwner: boolean; canRemoveOwner: boolean; }): NotifyAlertOptions {
    return {
      title: "Error",
      html: `<p>${getRoleUpdateErrorMessage({
        newRole,
        currentRole,
        canAddOwner,
        canRemoveOwner,
      })}</p>`,
      icon: "error",
      confirmVariant: "danger",
    };
  },
};
