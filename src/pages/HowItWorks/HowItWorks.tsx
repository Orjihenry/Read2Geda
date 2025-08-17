import Footer from "../../components/Footer";
import Header from "../../components/Header";


export default function HowItWoks() {
    return (
        <>
          <Header />

          <div className="container py-5">
            <div className="accordion py-5" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="fs-3 accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Discover Book Clubs
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="lead accordion-body">
                    Browse through a variety of clubs. Fiction, non-fiction, fantasy, memoirs, and more. Each club has its own community and vibe, so you'll always find a perfect match.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button className="fs-3 accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Join or Create a Club
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div className="lead accordion-body">
                    Found a group that speaks your language? Join instantly and meet like-minded readers. Or, start your own club and bring people together around your favorite genres or themes.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button className="fs-3 accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Track Your Reads
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div className="lead accordion-body">
                    Keep tabs on the books you're currently reading. See progress, upcoming reads, and stay motivated with the group.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button className="fs-3 accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    Share and Discuss
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                  <div className="lead accordion-body">
                    Participate in meaningful conversations, share your opinions, and hear different perspectives. Every page is better when shared.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button className="fs-3 accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    Stay Connected
                  </button>
                </h2>
                <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                  <div className="lead accordion-body">
                    With schedules, reminders, and club activity feeds, you’ll never miss the next meeting or book discussion.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </>
    )
}