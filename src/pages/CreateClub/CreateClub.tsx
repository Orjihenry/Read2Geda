import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { NavLink } from "react-router-dom";

export default function CreateClub() {
  return (
    <>
      <Header />
      <div className="container my-5">
        <h1 className="display-6 mb-4">Create a New Book Club</h1>
        <div className="card p-5">
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label fw-bold">
                Club Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter club name"
                required
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
              />
            </div>

            <div className="col-md-6 d-flex align-items-center">
              <div className="form-check mt-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isPublic"
                  name="isPublic"
                />
                <label className="form-check-label" htmlFor="isPublic">
                  Public Club
                </label>
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="imageUrl" className="form-label fw-bold">
                Club Image URL
              </label>
              <input
                type="text"
                className="form-control"
                id="imageUrl"
                name="imageUrl"
                placeholder="Paste image link or leave blank for default"
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
