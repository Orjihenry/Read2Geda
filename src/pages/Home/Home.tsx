import Header from "../../components/Header";
import NavButton from "../../components/NavButton";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row text-center py-5">
          <div className="col text-start pt-5">
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
          <div className="col bg-image d-none d-md-block">
            <div className="p-5"></div>
          </div>
        </div>
      </div>
    </>
  );
}
