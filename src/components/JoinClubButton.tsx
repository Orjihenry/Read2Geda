import { useClub } from "../context/ClubContext";
import { useAuthContext } from "../context/AuthContext";
import { confirmAlert } from "../alerts/sweetAlert";
import { clubAlerts } from "../alerts/clubAlerts";

export default function JoinClubButton({ clubId, className }: { clubId?: string, className?: string }) {
  const { currentUser } = useAuthContext();
  const { clubs, joinClub, leaveClub, isClubMember } = useClub();

  const club = clubs.find((c) => c.id === clubId);
  const userId = currentUser?.id;

  if (!club) return null;

  const handleJoinClub = () => {
    if (!club || !userId) return;
    joinClub(club, userId);
  };

  const handleLeaveClub = async () => {
    if (!club || !userId) return;

    const { isConfirmed, isDismissed } = await confirmAlert({
      ...clubAlerts.confirmLeaveClub(club.name),
    });

    if (isDismissed) return;
    if (isConfirmed) {
      leaveClub(club.id, userId);
    }
  };

  return (
    <>
      {isClubMember(club.id, userId || "") ? (
        <button onClick={handleLeaveClub} className={`btn btn-secondary btn-sm ${className}`}>
          Leave Club
        </button>
      ) : (
        <button onClick={handleJoinClub} className={`btn btn-secondary btn-sm ${className}`}>
          Join Club
        </button>
      )}
    </>
  );
}
