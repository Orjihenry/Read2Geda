import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Discussions() {
  return (
    <>
      <Header />
      <div className="container my-5">
        {/* Page Heading */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-6">💬 Community Discussions</h1>
          <button className="btn btn-success">
            Start New Discussion
          </button>
        </div>

        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action">
                All Topics
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Book Reviews
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Club Announcements
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Author Spotlights
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                General Chat
              </a>
            </div>
          </div>

          <div className="col-md-9">
            {/* Discussion Card */}
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">📖 Thoughts on "1984" by George Orwell</h5>
                <p className="card-text text-muted">
                  How do you interpret the ending of the book? Let's discuss different perspectives...
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">Posted by Alice • 2h ago</small>
                  <button className="btn btn-sm btn-outline-success">
                    12 Replies
                  </button>
                </div>
              </div>
            </div>

            {/* Another Discussion Card */}
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">🌟 Favorite Book of 2025?</h5>
                <p className="card-text text-muted">
                  Share your favorite reads so far this year — I'm building a list for our club!
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">Posted by Henry • 1d ago</small>
                  <button className="btn btn-sm btn-outline-success">
                    8 Replies
                  </button>
                </div>
              </div>
            </div>

            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">📚 Club Meeting Schedule</h5>
                <p className="card-text text-muted">
                  Reminder: Our next meeting will focus on "To Kill a Mockingbird". 
                  Please confirm attendance.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">Posted by Moderator • 3d ago</small>
                  <button className="btn btn-sm btn-outline-success">
                    25 Replies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}