import { NavLink, useParams } from "react-router-dom"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import { FaArrowLeftLong } from "react-icons/fa6"
import { defaultBookClubs } from "../../utils/bookClub";
import BookCarousel from "../../components/BookCarousel";


export default function ClubDetails() {
  const { clubId } = useParams();
  const club = defaultBookClubs.find(c => c.id === clubId);
  
  if (!club) {
    return <p>No club matches that ID.</p>;
  }

  return (
    <>
      <Header />
      <div className="container py-5">
          <NavLink
            to="/discover"
            className="btn btn-outline-success">
              <FaArrowLeftLong className="me-2" />
              Back to book clubs
          </NavLink>

          <div className="py-4">
            <h1 className="display-6">
              {club.name}
            </h1>

            <p className="lead">
              {club.description}
            </p>

            <div className="d-flex gap-2 pt-2 justify-content-start">
              <NavLink
                to={`/book_club/${club.id}`}
                className="btn btn-dark btn-sm">
                Join Club
              </NavLink>
              <NavLink
                to="/discussions"
                className="btn btn-outline-success btn-sm">
                Discussion Board
              </NavLink>
            </div>
          </div>
      </div>

      <div className="py-5 bg-light">
        <div className="container">
          <div className="d-md-flex justify-content-between">
            <div>
              <h2 className="display-6">Current Book</h2>
              <div className="d-flex justify-content-start text-center mb-3">
                <img
                  src="https://m.media-amazon.com/images/I/81O7u0dGaWL._AC_UL640_FMwebp_QL65_.jpg"
                  alt="Title"
                  className="shadow img-fluid me-4"
                  style={{ maxHeight: "220px", objectFit: "cover" }}
                />

                <div className="text-start">
                    <h3 className="display-8 dark-color my-0">To Kill A Mockingbird</h3>
                    <p className="text-mute small my-0">Harper Lee</p>
                    <p className="text-mute small my-0">Published: 1960</p>
                    <p className="text-mute small my-0">Tags: classic, literature</p>
                </div>
              </div>
            
              <div>
                <h6>Reading Progress</h6>
                <div className="progress mb-3">
                  <div className="progress-bar bg-dark" style={{ width: "80%" }}>80% Complete</div>
                </div>
              </div>
            </div>

            <div className="discussions">
              <h2 className="display-6">Discussions Board</h2>

              <div className="card p-5">
                <p className="lead p-5">
                  Discussion Box
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="display-6 py-2">Club Reviews</h2>
        <NavLink to="" className="btn btn-dark btn-md">Discussion Questions</NavLink>

        <div className="py-4">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem nisi id exercitationem dignissimos expedita veritatis error fugiat assumenda sunt et quis earum, temporibus architecto? At delectus sit dolor rem facilis?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem nisi id exercitationem dignissimos expedita veritatis error fugiat assumenda sunt et quis earum, temporibus architecto? At delectus sit dolor rem facilis?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem nisi id exercitationem dignissimos expedita veritatis error fugiat assumenda sunt et quis earum, temporibus architecto? At delectus sit dolor rem facilis?</p>
        </div>

      </div>

      <div className="bg-light py-5">
        <div className="container py-4">
          <h3 className="display-6 pb-2">Other Books On Our List</h3>

          <BookCarousel />
        </div>
      </div>
      <Footer />
    </>
  )
}