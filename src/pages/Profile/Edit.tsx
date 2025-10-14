import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { type User } from "../../types/user";
import { useImageStorage } from "../../hooks/useImageStorage";

import Footer from "../../components/Footer";
import Header from "../../components/Header";

type UpdatedUser = User & {
    avatar?: string;
    bio?: string;
}

export default function EditProfile() {
    const { currentUser, isLoading, updateProfile } = useAuthContext();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [bio, setBio] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { uploadImage, getImage } = useImageStorage();

    useEffect(() => {
        setName(currentUser?.name || "");
        setEmail(currentUser?.email || "");
        setAvatar(currentUser?.avatar || "");
        setBio(currentUser?.bio || "");
    }, [currentUser]);

    useEffect(() => {
        let revokeUrl: string | null = null;

        const loadAvatar = async () => {
            if (!currentUser?.id) return;
            const blob = await getImage(currentUser.id);
            if (blob) {
                const url = URL.createObjectURL(blob);
                revokeUrl = url;
                setAvatarUrl(url);
            }
        };

        loadAvatar();

        return () => {
            if (revokeUrl) URL.revokeObjectURL(revokeUrl);
        };
    }, [currentUser?.id]);

    useEffect(() => {
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setAvatarUrl(url);
            
            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [selectedFile]);

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;
        
        let imageId: string | undefined = avatar;

        if (selectedFile) {
            const uploadedId = await uploadImage(selectedFile, "avatar");
            imageId = uploadedId || undefined;
            if (!imageId) {
                return;
            }
        }

        const updatedUser: UpdatedUser = {
            ...currentUser,
            name,
            email,
            avatar: imageId,
            bio,
        };

        const success = updateProfile(updatedUser);
        if (success) {
            console.log("Profile updated:", updatedUser);
            navigate("/highlights");
        }
    };

    if (isLoading) {
      return (
        <>
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-2" role="status" />
              <p>📚 Fetching data...</p>
          </div>
        </>
        )
    }

    return (
        <>
            <Header />
            <div className="container my-5">
                <h1 className="display-6 mb-4">Edit Profile</h1>
                <div className="card p-5">
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-12 text-center mb-4">
                            {(avatarUrl || avatar) && (
                                <img
                                    className="rounded-circle shadow mb-3"
                                    src={avatarUrl || avatar}
                                    alt="Profile Avatar"
                                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                />
                            )}
                            <div>
                                <label htmlFor="avatar" className="btn btn-outline-secondary btn-sm">Change Avatar</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={handleAvatarChange}
                                    id="avatar"
                                    name="avatar"
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="username" className="form-label fw-bold">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label fw-bold">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="bio" className="form-label fw-bold">Bio</label>
                            <textarea
                                id="bio"
                                name="bio"
                                className="form-control"
                                rows={4}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-dark px-4">
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-success ms-2"
                                onClick={() => navigate("/highlights")}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}