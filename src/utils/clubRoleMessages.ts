export type MemberRole = "member" | "moderator" | "owner";

const roleLabels: Record<MemberRole, string> = {
  member: "Member",
  moderator: "Moderator",
  owner: "Owner",
};

export const getRoleLabel = (role: MemberRole) => roleLabels[role];

export const getRoleChangeConfirmMessage = (
  memberName: string,
  newRole: MemberRole,
  currentRole?: string
) => {
  if (newRole === "owner") {
    return {
      title: "Promote to Owner?",
      html: `Are you sure you want to promote <strong>${memberName}</strong> to Owner?`,
    };
  }

  if (currentRole === "owner") {
    return {
      title: "Demote from Owner?",
      html: `Are you sure you want to demote <strong>${memberName}</strong> from Owner to ${roleLabels[newRole]}?`,
    };
  }

  if (newRole === "moderator") {
    return {
      title: "Make Moderator?",
      html: `Are you sure you want to make <strong>${memberName}</strong> a Moderator?`,
    };
  }

  return {
    title: "Remove Moderator?",
    html: `Are you sure you want to remove <strong>${memberName}</strong> as Moderator?`,
  };
};

export const getRoleUpdateErrorMessage = ({
  newRole,
  currentRole,
  canAddOwner,
  canRemoveOwner,
}: {
  newRole: MemberRole;
  currentRole?: string;
  canAddOwner: boolean;
  canRemoveOwner: boolean;
}) => {
  if (newRole === "owner" && !canAddOwner) {
    return "Cannot have more than 3 owners. Please demote an existing owner first.";
  }

  if (currentRole === "owner" && !canRemoveOwner) {
    return "Cannot have less than 1 owner. Please promote another member to owner first.";
  }

  return "Failed to update member role. Please try again.";
};
