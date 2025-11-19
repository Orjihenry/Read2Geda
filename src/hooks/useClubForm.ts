import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useClub } from "../context/ClubContext";
import type { bookClub } from "../utils/bookClub";
import { useAuthContext } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useImageStorage } from "./useImageStorage";
import { getCurrentDateTime } from "../utils/dateUtils";

export const useClubForm = () => {
  const { clubs, createClub, updateClub, clubNameExists } = useClub();
  const { uploadImage, getImage } = useImageStorage();
  const { clubId } = useParams();
  const navigate = useNavigate();
  const clubNameRef = useRef<HTMLInputElement>(null);

  const currentDate = getCurrentDateTime();
  
  const { currentUser } = useAuthContext();

  const [clubName, setClubName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [meetingFrequency, setMeetingFrequency] = useState("");
  const [meetingPlatform, setMeetingPlatform] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [clubImage, setClubImage] = useState<string | null>(null);
  
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentClub = clubs.find(c => c.id === clubId);

  useEffect(() => {
    let revokeUrl: string | null = null;

    const loadImage = async () => {
      if (!currentClub?.imageUrl) return;
      const blob = await getImage(currentClub.imageUrl);
      if (blob) {
        const url = URL.createObjectURL(blob);
        revokeUrl = url;
        setClubImage(url);
      }
    }

    loadImage();

    return () => {
      if (revokeUrl) URL.revokeObjectURL(revokeUrl);
    }
  }, [currentClub?.imageUrl, getImage]);

  useEffect(() => {
    if (!selectedFile) return;
    const url = URL.createObjectURL(selectedFile);
    setClubImage(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const handleClubImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      setErrMsg("Please select a valid image file.");
      return;
    }
    setSelectedFile(file);
  }

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
          if (currentClub.imageUrl) {
            setImageUrl(currentClub.imageUrl);
          }
        }
    }, [currentClub]);

    const handleSubmitEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!clubName.trim() || !description.trim()) {
            setErrMsg("Club name and description are required");
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

        const newClubId = clubId || uuidv4();
        let imageId: string | undefined = imageUrl || undefined;

        if (selectedFile) {
            const uploadedId = await uploadImage(selectedFile);
            imageId = uploadedId || undefined;
            if (!imageId) return;
        }

        // Update existing club
        if (currentClub) {
          try {
            const updatedClub = {
              ...currentClub,
              name: clubName,
              location: location,
              description: description,
              tags: processedTags,
              meetingFrequency: meetingFrequency,
              meetingPlatform: meetingPlatform,
              isPublic: isPublic,
              updatedAt: currentDate,
              imageUrl: imageId,
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
              return error;
          }
          console.log("Image ID:", imageId);
          console.log("Updated Club:", currentClub)
          console.log("clubImage:", clubImage);
        } else {
          // Create new club
          try {
            if (clubNameExists(clubName.trim())) {
              setErrMsg("A club with this name already exists!");
              setLoading(false);
              return;
            }

            const newClub: bookClub = {
              id: newClubId,
              name: clubName.trim(),
              description: description.trim(),
              members: [
                {
                  id: currentUser.id,
                  role: "owner",
                  joinedAt: currentDate,
                  isSuspended: false,
                },
            ],
              createdAt: currentDate,
              updatedAt: currentDate,
              imageUrl: imageId, 
              ownerId: currentUser.id,
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
              navigate('/clubs');
            }, 1500);
    
            } catch (error) {
                console.error('Error creating club:', error);
                setErrMsg("Failed to create club. Please try again.");
            } finally {
                setLoading(false);
            }
        };
    }

    const handleCancelEvent = (e: React.MouseEvent) => {
        e.preventDefault();
        setImageUrl(imageUrl);
        navigate(-1);
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
        setSelectedFile(null);
        setClubImage(null);
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
        handleSubmitEvent,
        handleCancelEvent,

        clubImage,
        handleClubImageChange,
    };
};