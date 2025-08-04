import BookCarousel from "../../components/BookCarousel";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavButton from "../../components/NavButton";
import "./Profile.css";

export default function Profile() {
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
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    title=""
                    alt="User Avatar"
                  />
                </div>
              </div>
              <div className="col-lg-6 py-4 py-md-0">
                <div className="about-text">
                  <h3 className="display-6 dark-color">Henry Orjiude</h3>
                  <p className="lead">
                    Hi, I'm <strong>Henry</strong>. I love leading book clubs,
                    exploring diverse narratives, and contributing to positive
                    youth development.
                  </p>
                  <p className="lead">
                    I also enjoy connecting with readers, leading discussions,
                    and exploring new perspectives through books.
                  </p>

                  <div className="pb-3">
                    <NavButton
                      href="#"
                      className="btn-dark text-light"
                      label="My Clubs"
                    />
                    <NavButton href="#" className="mx-2" label="Edit Profile" />
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
