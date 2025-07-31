import Button from "../Button";
import "./../../index.css"

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <h5>Read2Geda</h5>
            <p>Your hub for seamless book club experiences.</p>

            <div className="subscribe">
              <input type="email" placeholder="Subscribe for updates" />
              <Button className="btn-light btn-sm">Subscribe</Button>
            </div>

            <div className="socials">
              <a href="#" className="text-light me-2">Facebook</a>
              <a href="#" className="text-light me-2">Twitter</a>
              <a href="#" className="text-light">Instagram</a>
            </div>
          </div>

          <div className="col-md-7">
            <nav aria-label="Footer navigation">
              <h5>Quick Links</h5>
              <div className="row mx-0">
                <div className="col-md-4 px-0">
                  <a href="/about" className="nav-link quick-links">About Us</a>
                  <a href="/privacy" className="nav-link quick-links">Privacy Policy</a>
                  <a href="/terms" className="nav-link quick-links">Terms of Service</a>
                </div>

                <div className="col-md-4 px-0">
                  <a href="/discover" className="nav-link quick-links">Join A Book Club</a>
                  <a href="/community-guidelines" className="nav-link quick-links">Community Guidelines</a>
                  <a href="/faqs" className="nav-link quick-links">FAQs</a>
                </div>

                <div className="col-md-4 px-0">
                  <a href="/discussion" className="nav-link quick-links">Community Discussions</a>
                  <a href="/contact" className="nav-link quick-links">Contact Us</a>
                  <a href="/how-it-works" className="nav-link quick-links">How It Works</a>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="text-center mb-1 mt-4">
          <p className="mb-0">
            © {new Date().getFullYear()} Read2Geda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
