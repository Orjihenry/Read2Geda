import Card from "../../components/Card";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavButton from "../../components/NavButton";
import Carousel from "../../components/Carousel/Carousel";
import keepingInTouch from "../../assets/keeping_in_touch.png";
import trackYourProgress from "../../assets/track_your_progress.png";
import discoverNewReads from "../../assets/discover_new_reads.png";
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

        <div className="p-md-5 px-md-0 mb-3">
            <div className="mx-0 row" id="key-features">
                <h2 className="display-6 text-center mb-2">Key Features</h2>
                <p className="lead text-center mb-5">
                    Explore the features that make Read2Geda your go-to platform for book clubs.
                </p>

                <div className="col-md-4">
                    <Card
                        imgSrc={keepingInTouch}
                        imgAlt="Keeping In Touch Image"
                        title="Stay Connected"
                        text="Join our community to connect with fellow readers and share your thoughts."
                    />
                </div>
                    
                <div className="col-md-4">
                    <Card
                        imgSrc={trackYourProgress}
                        imgAlt="Track Your Progress Image"
                        title="Track Your Progress"
                        text="Keep tabs on your reading journey and celebrate your achievements."
                    />
                </div>

                <div className="col-md-4">
                    <Card
                        imgSrc={discoverNewReads}
                        imgAlt="Discover New Reads Image"
                        title="Discover New Reads"
                        text="Explore a curated selection of books tailored to your interests."
                    />
                </div>

            </div>
        </div>
        
        <div className="section mb-5 text-center">
            <div className="display-6 mb-2">Join A Book Club</div>
            <p className="lead mb-5">
              Connect with like-minded readers and dive into engaging discussions.
            </p>

            <Carousel />

            <NavButton className="btn-outline-success mt-5" href="/book-club" label="Discover More" />
        </div>
      </div>
      <Footer />
    </>
  );
}
