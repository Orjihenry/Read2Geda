import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { NavLink } from "react-router-dom";
import useUpdateClub from "../../hooks/useUpdateClub";

export default function UpdateClub() {
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
    errMsg,
    success,
    loading,
    clubNameRef,
    handleUpdateClub,
    currentClub,
  } = useUpdateClub();

  if (!currentClub) {
    return (
      <>
        <Header />
        <div className="container my-5">
          <div className="text-center py-5">
            <h1 className="display-6">Club Not Found</h1>
            <p className="lead">The club you're trying to update doesn't exist.</p>
            <NavLink to="/discover" className="btn btn-outline-success">
              Back to Discover
            </NavLink>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container my-5">
        <h1 className="display-6 mb-4">Update Book Club</h1>
        <div className="card p-5">
          <form className="row g-3" onSubmit={handleUpdateClub}>
            {errMsg && <p className="text-danger">{errMsg}</p>}
            {success && <p className="text-success">Club updated successfully! 🎉</p>}
            {loading && <p className="text-warning">Updating club...</p>}
            
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


            <div className="col-12 text-center">
              <button type="submit" className="btn btn-outline-success px-4" disabled={loading}>
                {loading ? "Updating..." : "Update Club"}
              </button>
              <NavLink to={`/club/${currentClub.id}`} className="btn btn-dark ms-2">
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
