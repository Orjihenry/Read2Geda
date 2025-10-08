import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useClub } from "../context/ClubContext";

export default function useUpdateClub() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const { clubs, updateClub, clubNameExists } = useClub();
  
  const [clubName, setClubName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [meetingFrequency, setMeetingFrequency] = useState("");
  const [meetingPlatform, setMeetingPlatform] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const clubNameRef = useRef<HTMLInputElement>(null);

  const currentClub = clubs.find(c => c.id === clubId);

  useEffect(() => {
    if (currentClub) {
      setClubName(currentClub.name || "");
      setLocation(currentClub.location || "");
      setDescription(currentClub.description || "");
      setTags(currentClub.tags?.join(", ") || "");
      setMeetingFrequency(currentClub.meetingFrequency || "");
      setMeetingPlatform(currentClub.meetingPlatform || "");
      setIsPublic(currentClub.isPublic || true);
    }
  }, [currentClub, clubs]);

  const handleUpdateClub = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentClub) {
      setErrMsg("Club not found");
      return;
    }

    setErrMsg("");
    setSuccess(false);
    setLoading(true);

    try {
      // Validate club name (check if it exists and is different from current)
      if (clubName !== currentClub.name && clubNameExists(clubName)) {
        setErrMsg("Club name already exists");
        setLoading(false);
        return;
      }

      // Process tags
      const processedTags = tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);

      // Create updated club object
      const updatedClub = {
        ...currentClub,
        name: clubName,
        location: location,
        description: description,
        tags: processedTags,
        meetingFrequency: meetingFrequency,
        meetingPlatform: meetingPlatform,
        isPublic: isPublic,
        updatedAt: new Date().toISOString(),
      };

      // Update the club
      updateClub(updatedClub);
      
      setSuccess(true);
      setLoading(false);
      
      // Navigate back to club details after a short delay
      setTimeout(() => {
        navigate(`/club/${clubId}`);
      }, 1500);

    } catch (error) {
      setErrMsg("Failed to update club");
      setLoading(false);
    }
  };

  return {
    clubName,
    setClubName,
    location,
    setLocation,
    description,
    setDescription,
    tags,
    setTags,
    meetingFrequency,
    setMeetingFrequency,
    meetingPlatform,
    setMeetingPlatform,
    isPublic,
    setIsPublic,
    errMsg,
    success,
    loading,
    clubNameRef,
    handleUpdateClub,
    currentClub,
  };
}
