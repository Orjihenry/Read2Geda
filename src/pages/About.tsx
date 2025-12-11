import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/About.css";

export default function About() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row text-center ">
          <div className="col text-start mt-5 py-10">
            <h1 className="display-6 text-capitalize">Get To Know Us</h1>
            <p className="lead">
              A vibrant community built for book lovers, by book lovers. Our
              mission is to bring readers together through meaningful
              discussions, curated book clubs, and shared literary journeys.
            </p>
          </div>
          <div className="col bg-image-about d-none d-md-block my-5">
            <div className="p-5"></div>
          </div>
        </div>

        <div className="section mb-5">
          <div className="text-start">
            <h2 className="display-6">What We Stand To Offer</h2>
            <p className="lead">
              Read2Geda is more than just a reading app, it's a space where
              stories spark connection. We make it easy for users to discover
              books, join or create book clubs, track their reading, and engage
              in thoughtful conversations. Whether you are a casual reader or a
              passionate bibliophile, Read2Geda supports your reading journey
              every step of the way.
            </p>

            <p className="lead">
              It doesn't matter if you are exploring a new genre, starting your
              own club, or simply looking for your next favorite read, Read2Geda
              helps you connect with like-minded readers across the world. We
              believe books are better when shared, and with Read2Geda, every
              story becomes a conversation.
            </p>

            <p className="lead">
              By combining community with curiosity, we are helping people read
              more, think deeper, and connect better, one page at a time.
            </p>
          </div>
        </div>

        <div className="section bg-light my-5">
          <div className="container">
            <div className="row">
              <div className="col bg-image-section2 d-none d-md-block my-5">
                <div className="p-5"></div>
              </div>
              <div className="col text-start my-5">
                <h1 className="display-6 text-capitalize">
                  Our Mission: Helping Millions of Readers Connect
                </h1>
                <p className="lead">
                  We strive to help users build and grow strong reading habits,
                  foster meaningful discussions, and create a culture of
                  opinion-sharing through books and stories.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col text-start my-5">
                <h1 className="display-6 text-capitalize">
                  Our Vision: Building Bonds Through Books, One Thought at a
                  Time
                </h1>
                <p className="lead">
                  We aim to become the leading platform for reader connection,
                  where communities grow through books, ideas thrive through
                  conversation, and every voice finds space in the story.
                </p>
              </div>
              <div className="col bg-image-section3 d-none d-md-block my-5">
                <div className="p-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
