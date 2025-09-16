import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClub } from "../context/ClubContext";
import type { bookClub } from "../utils/bookClub";

export const useCreateClub = () => {
    const { createClub, clubNameExists } = useClub();
    const navigate = useNavigate();
    const clubNameRef = useRef<HTMLInputElement>(null);

    const [clubName, setClubName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [meetingFrequency, setMeetingFrequency] = useState("");
    const [meetingPlatform, setMeetingPlatform] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [imageUrl, setImageUrl] = useState("");
    
    const [errMsg, setErrMsg] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const getCurrentUser = () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return null;
        return JSON.parse(storedUser);
    };

    useEffect(() => {
        clubNameRef?.current?.focus();
    }, []);

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

        const currentUser = getCurrentUser();
        if (!currentUser) {
            setErrMsg("You must be logged in to create a club");
            return;
        }

        setLoading(true);
        setErrMsg(null);

        try {
            const newClub: bookClub = {
                id: "",
                name: clubName.trim(),
                description: description.trim(),
                members: [currentUser.name],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                imageUrl: imageUrl || undefined,
                ownerId: currentUser.id,
                ownerName: currentUser.user,
                ownerImageUrl: undefined,
                isPublic: isPublic,
                isActive: true,
                rating: 0,
                tags: tags ? tags.split(',').map(tag => tag.trim()) : undefined,
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
                navigate('/clubs');
            }, 1500);

        } catch (error) {
            console.error('Error creating club:', error);
            setErrMsg("Failed to create club. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setClubName("");
        setLocation("");
        setDescription("");
        setTags("");
        setMeetingFrequency("");
        setMeetingPlatform("");
        setIsPublic(true);
        setImageUrl("");
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
        
        handleCreateClub,
    };
};