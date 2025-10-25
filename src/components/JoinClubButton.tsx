import { useClub } from "../context/ClubContext";
import { useAuthContext } from "../context/AuthContext";

export default function JoinClubButton({ clubId }: { clubId?: string }) {
  const { currentUser } = useAuthContext();
  const { clubs, joinClub, leaveClub, isClubMember } = useClub();

  const club = clubs.find((c) => c.id === clubId);
  const userId = currentUser?.id;

  if (!club) return null;

  const handleJoinClub = () => {
    if (!club || !userId) return;
    joinClub(club, userId);
  };

  const handleLeaveClub = () => {
    if (!club || !userId) return;
    leaveClub(club.id, userId);
  };

  return (
    <>
      {isClubMember(club.id, userId || "") ? (
        <button onClick={handleLeaveClub} className="btn btn-dark btn-sm">
          Leave Club
        </button>
      ) : (
        <button onClick={handleJoinClub} className="btn btn-dark btn-sm">
          Join Club
        </button>
      )}
    </>
  );
}
