import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavButton from "../../components/NavButton";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row text-center ">
          <div className="col text-start my-5">
            <h1 className="display-6 text-capitalize">
              Your next great read awaits
            </h1>
            <p className="lead">
              Your Hub for seamless book club experiences. <br />
              Connect with fellow book lovers, explore diverse genres, and dive
              deep into captivating stories together.
            </p>
            <div className="row px-1">
              <NavButton className="col col-md-4 btn-dark text-light mx-2" href="/discover" label="Discover Now"/>
              <NavButton className="col col-md-4 btn-light mx-2" href="/about" label="Learn More"/>
            </div>
          </div>
          <div className="col bg-image d-none d-md-block my-5">
            <div className="p-5"></div>
          </div>
        </div>

        <div className="p-md-5 mb-3 w-custom">
            <div className="container mx-0 row" id="key-features">
                <div className="col-md-4">
                    <h5>Stay Connected</h5>
                    <p>Join our community to connect with fellow readers and share your thoughts.</p>
                </div>
                <div className="col-md-4">
                    <h5>Track Your Progress</h5>
                    <p>Keep tabs on your reading journey and celebrate your achievements.</p>
                </div>
                <div className="col-md-4">
                    <h5>Discover New Reads</h5>
                    <p>Explore a curated selection of books tailored to your interests.</p>
                </div>

            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
