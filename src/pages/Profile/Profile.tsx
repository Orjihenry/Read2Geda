import BookCarousel from "../../components/BookCarousel";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavButton from "../../components/NavButton";
import { useAuthContext } from "../../context/AuthContext";
import { useClub } from "../../context/ClubContext";
import "./Profile.css";

export default function Profile() {

  const { currentUser } = useAuthContext();
  const { clubs } = useClub();
  
  const currentClub = clubs.find(club => club.isActive && club.members.length > 0);

  const stats = [
    { count: 5, label: "Books Read" },
    { count: 150, label: "Contributions" },
    { count: 650, label: "Likes / Votes" },
    { count: 12, label: "Club Calls Attended" },
  ];

  return (
    <>
      <Header />
        <section className=" py-5 about-section gray-bg" id="about">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="d-flex justify-content-center">
                  <img
                    className="rounded-circle shadow"
                    src={currentUser?.avatar ||"https://bootdey.com/img/Content/avatar/avatar7.png"}
                    title=""
                    alt="User Avatar"
                  />
                </div>
              </div>
              <div className="col-lg-6 py-4 py-md-0">
                <div className="about-text">
                  <h3 className="display-6 dark-color">{currentUser?.name}</h3>
                  <p className="lead">
                    {currentUser?.bio || "You can edit your profile to add a bio."}
                  </p>

                  <div className="pb-3">
                    <NavButton
                      href="#"
                      className="btn-dark text-light"
                      label="My Clubs"
                    />
                    <NavButton href="edit_profile" className="mx-2" label="Edit Profile" />
                  </div>
                </div>
              </div>
            </div>
            <div className="counter">
              <div className="row">
                {stats.map(({ count, label }, index) => (
                  <div key={index} className="col-6 col-lg-3">
                    <div className="count-data text-center">
                      <h6 className="count h2">{count}</h6>
                      <p className="m-0px font-w-600">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-5">
          <div className="container">
            <h2 className="display-6 text-center mb-5">On My Bookshelf Today</h2>
            
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card shadow-sm border-0">
                  <div className="card-body p-4">
                    <div className="text-center mb-4">
                      <img
                        src="https://m.media-amazon.com/images/I/81O7u0dGaWL._AC_UL640_FMwebp_QL65_.jpg"
                        alt="Currently Reading"
                        className="img-fluid rounded shadow-sm mb-3"
                        style={{ maxHeight: "200px" }}
                      />
                      <h4 className="mb-1">To Kill A Mockingbird</h4>
                      <p className="text-muted mb-3">by Harper Lee</p>
                    </div>
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="small text-muted">Reading Progress</span>
                        <span className="small text-muted">80%</span>
                      </div>
                      <div className="progress" style={{ height: "8px" }}>
                        <div 
                          className="progress-bar bg-success" 
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>
                    
                    {currentClub && (
                      <div className="mb-3 p-3 bg-light rounded">
                        <div className="d-flex align-items-center">
                          <div className="me-3">
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" 
                                 style={{ width: "40px", height: "40px" }}>
                              <span className="text-white fw-bold">{currentClub.name.charAt(0)}</span>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-1">{currentClub.name}</h6>
                            <small className="text-muted">
                              {currentClub.meetingFrequency} • {currentClub.members.length} members
                            </small>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center">
                      <button className="btn btn-outline-success btn-sm">
                        Continue Reading
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      <div className="container">
        <div className="section text-center py-5 my-5">
          <h2 className="display-6 mb-4">Read Books</h2>
          <p className="lead mb-5 font-italic">
            “If you want a picture of the future, imagine a boot stamping
            forever.”
            <br />
            <small className="font-italic">George Orwell - 1984</small>
          </p>

          <BookCarousel />
        </div>

        <div className="section text-center py-5 my-5 bg-light">
          <h2 className="display-6 mb-4">Whishlist</h2>

          <BookCarousel />
        </div>
      </div>

      <Footer />
    </>
  );
}
