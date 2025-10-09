import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { NavLink, useParams } from "react-router-dom";
import { useClubForm } from "../../hooks/useClubForm";

type FormMode = "create" | "update";

export default function ClubForm() {
  const { mode, clubId } = useParams<{ mode?: string; clubId?: string}>();

  const {
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
    setImageUrl,
    errMsg,
    success,
    loading,
    clubNameRef,
    handleCreateClub,
  } = useClubForm();

  const componentMode: FormMode = mode === "update" || clubId ? "update" : "create";


  return (
    <>
      <Header />
      <div className="container my-5">
          <h1 className="display-6 mb-4">{componentMode === "create" ? "Create a New Book Club" : "Update Book Club"}</h1>
          <div className="card p-5">
          <form className="row g-3" onSubmit={handleCreateClub}>
            { errMsg && <p className="text-danger">{errMsg}</p> }
            { success && <p className="text-success">Club created successfully! 🎉</p> }
            { loading && <p className="text-warning">Creating club... 🎉</p> }
            <div className="col-md-6">
              <label htmlFor="name" className="form-label fw-bold">
                Club Name
              </label>
              <input
                ref={clubNameRef}
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter club name"
                required
                onChange={(e) => setClubName(e.target.value)}
                value={clubName}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="location" className="form-label fw-bold">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                placeholder="City or 'Online'"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
            </div>

            <div className="col-12">
              <label htmlFor="description" className="form-label fw-bold">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows={3}
                placeholder="Brief description about your club"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="tags" className="form-label fw-bold">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                className="form-control"
                id="tags"
                name="tags"
                placeholder="e.g. fiction, romance, fantasy"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="meetingFrequency" className="form-label fw-bold">
                Meeting Frequency
              </label>
              <select
                className="form-select"
                id="meetingFrequency"
                name="meetingFrequency"
                onChange={(e) => setMeetingFrequency(e.target.value)}
                value={meetingFrequency}
              >
                <option value="">Select frequency</option>
                <option value="Weekly">Weekly</option>
                <option value="Bi-Weekly">Bi-Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="meetingPlatform" className="form-label fw-bold">
                Meeting Platform
              </label>
              <input
                type="text"
                className="form-control"
                id="meetingPlatform"
                name="meetingPlatform"
                placeholder="e.g. Zoom, Google Meet, Discord"
                onChange={(e) => setMeetingPlatform(e.target.value)}
                value={meetingPlatform}
              />
            </div>

            <div className="col-md-6 d-flex align-items-center">
              <div className="form-check mt-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isPublic"
                  name="isPublic"
                  onChange={(e) => setIsPublic(e.target.checked)}
                  checked={isPublic}
                />
                <label className="form-check-label" htmlFor="isPublic">
                  Public Club
                </label>
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="imageUrl" className="form-label fw-bold">
                Club Image
              </label>
              <input
                type="file"
                className="form-control"
                id="imageUrl"
                name="imageUrl"
                placeholder="Select image"
                onChange={(e) => setImageUrl(e.target.files?.[0] || null)}
              />
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-dark px-4">
                Create Club
              </button>
              <NavLink to="/discover" className="btn btn-outline-success ms-2">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
