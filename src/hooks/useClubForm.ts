import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useClub } from "../context/ClubContext";
import type { bookClub } from "../utils/bookClub";
import { useAuthContext } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

export const useClubForm = () => {
    const { clubs, createClub, updateClub, clubNameExists } = useClub();
    const { clubId } = useParams();
    const navigate = useNavigate();
    const clubNameRef = useRef<HTMLInputElement>(null);
    
    const { currentUser } = useAuthContext();

    const [clubName, setClubName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [meetingFrequency, setMeetingFrequency] = useState("");
    const [meetingPlatform, setMeetingPlatform] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [imageUrl, setImageUrl] = useState<File | null>(null);
    
    const [errMsg, setErrMsg] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const currentClub = clubs.find(c => c.id === clubId);

    useEffect(() => {
        clubNameRef?.current?.focus();
    }, []);

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

    const handleCreateClub = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!clubName.trim() || !description.trim()) {
            setErrMsg("Club name and description are required");
            return;
        }

        if (clubNameExists(clubName.trim())) {
            setErrMsg("A club with this name already exists");
            return;
        }

        if (!currentUser) {
            setErrMsg("You must be logged in to create a club");
            return;
        }

        const processedTags = tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);

        setLoading(true);
        setErrMsg(null);
        setSuccess(false);

        if (currentClub) {
            try {
              if (clubName !== currentClub.name && clubNameExists(clubName)) {
                setErrMsg("Club name already exists");
                setLoading(false);
                return;
              }
        
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
            
              updateClub(updatedClub);
                
              setSuccess(true);
              setLoading(false);
                
              setTimeout(() => {
                navigate(`/club/${clubId}`);
              }, 1500);
            
            } catch (error) {
                setErrMsg("Failed to update club");
                setLoading(false);
            }
        } else {
          try {
            const newClub: bookClub = {
              id: uuidv4(),
              name: clubName.trim(),
              description: description.trim(),
              members: [
                {
                  id: currentUser.id,
                  name: currentUser.name,
                  role: "owner",
                },
            ],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              imageUrl: imageUrl?.toString() || undefined, 
              ownerId: currentUser.id,
              ownerName: currentUser.name,
              ownerImageUrl: undefined,
              isPublic: isPublic,
              isActive: true,
              rating: 0,
              tags: processedTags,
              location: location || undefined,
              meetingFrequency: meetingFrequency || undefined,
              nextMeeting: undefined,
              lastMeeting: undefined,
              meetingPlatform: meetingPlatform || undefined,
            };
    
            createClub(newClub);
            setSuccess(true);
            
            resetForm();

            setTimeout(() => {
              navigate('/discover');
            }, 1500);
    
            } catch (error) {
                console.error('Error creating club:', error);
                setErrMsg("Failed to create club. Please try again.");
            } finally {
                setLoading(false);
            }
        };
    }

    const resetForm = () => {
        setClubName("");
        setLocation("");
        setDescription("");
        setTags("");
        setMeetingFrequency("");
        setMeetingPlatform("");
        setIsPublic(true);
        setImageUrl(null);
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
        imageUrl,
        setImageUrl,
        errMsg,
        success,
        loading,
        clubNameRef,
        currentClub,
        handleCreateClub,
    };
};