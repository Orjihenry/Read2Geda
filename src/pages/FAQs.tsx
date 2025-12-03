import Header from "../components/Header";
import Footer from "../components/Footer";

export default function FAQs() {
  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="py-3">
          <h1 className="display-6">❓ Frequently Asked Questions</h1>
          <p className="lead text-muted">
            Quick answers to common questions about using Read2Geda.
          </p>
        </div>

        <div className="accordion pb-5" id="faqsAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="faqOne">
              <button
                className="fs-5 accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqOneCollapse"
                aria-expanded="true"
                aria-controls="faqOneCollapse"
              >
                What is Read2Geda?
              </button>
            </h2>
            <div
              id="faqOneCollapse"
              className="accordion-collapse collapse show"
              aria-labelledby="faqOne"
              data-bs-parent="#faqsAccordion"
            >
              <div className="lead accordion-body">
                Read2Geda is a platform that helps you discover book clubs,
                track your reading, and connect with other readers through
                shared discussions and curated reads.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faqTwo">
              <button
                className="fs-5 accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqTwoCollapse"
                aria-expanded="false"
                aria-controls="faqTwoCollapse"
              >
                Do I need an account to use Read2Geda?
              </button>
            </h2>
            <div
              id="faqTwoCollapse"
              className="accordion-collapse collapse"
              aria-labelledby="faqTwo"
              data-bs-parent="#faqsAccordion"
            >
              <div className="lead accordion-body">
                You can browse clubs and explore content without an account, but
                you need to register or log in to join clubs, track progress,
                and manage your personal shelf.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faqThree">
              <button
                className="fs-5 accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqThreeCollapse"
                aria-expanded="false"
                aria-controls="faqThreeCollapse"
              >
                How do I join or create a book club?
              </button>
            </h2>
            <div
              id="faqThreeCollapse"
              className="accordion-collapse collapse"
              aria-labelledby="faqThree"
              data-bs-parent="#faqsAccordion"
            >
              <div className="lead accordion-body">
                Visit the <a href="/clubs" className="text-decoration-none text-light bg-dark p-1 rounded">Clubs</a> page to browse available
                clubs and join one that interests you. If you&apos;re logged in,
                you can also create a new club and invite others to join.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faqFour">
              <button
                className="fs-5 accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqFourCollapse"
                aria-expanded="false"
                aria-controls="faqFourCollapse"
              >
                How is my reading progress tracked?
              </button>
            </h2>
            <div
              id="faqFourCollapse"
              className="accordion-collapse collapse"
              aria-labelledby="faqFour"
              data-bs-parent="#faqsAccordion"
            >
              <div className="lead accordion-body">
                When you add books to your shelf, you can update your progress
                from your profile or shelf. Read2Geda saves this information so
                you can pick up right where you left off.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faqFive">
              <button
                className="fs-5 accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqFiveCollapse"
                aria-expanded="false"
                aria-controls="faqFiveCollapse"
              >
                Is Read2Geda free to use?
              </button>
            </h2>
            <div
              id="faqFiveCollapse"
              className="accordion-collapse collapse"
              aria-labelledby="faqFive"
              data-bs-parent="#faqsAccordion"
            >
              <div className="lead accordion-body">
                Yes. Read2Geda is free to use. If we introduce premium features
                in the future, core reading and club features will remain
                accessible.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faqSix">
              <button
                className="fs-5 accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqSixCollapse"
                aria-expanded="false"
                aria-controls="faqSixCollapse"
              >
                How can I contact support or share feedback?
              </button>
            </h2>
            <div
              id="faqSixCollapse"
              className="accordion-collapse collapse"
              aria-labelledby="faqSix"
              data-bs-parent="#faqsAccordion"
            >
              <div className="lead accordion-body">
                You can reach us anytime via the <a href="/contact" className="text-decoration-none text-light bg-dark p-1 rounded">Contact</a>
                ️ page. We&apos;d love to hear your ideas, bug reports, or feature
                requests.
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
