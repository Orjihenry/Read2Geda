import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { notifyAlert } from "../alerts/sweetAlert";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      notifyAlert({
        title: "Message Sent!",
        text: "Thank you for contacting us. We'll get back to you soon.",
        icon: "success",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h1 className="display-6 mb-3">📧 Contact Us</h1>
            <p className="lead text-muted">
              Have a question, suggestion, or need help? We&apos;d love to hear
              from you!
            </p>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h3 className="mb-4">Send us a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label fw-bold">
                        Your Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label fw-bold">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="subject" className="form-label fw-bold">
                        Subject <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="bug">Report a Bug</option>
                        <option value="partnership">Partnership Opportunities</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label htmlFor="message" className="form-label fw-bold">
                        Message <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows={6}
                        placeholder="Tell us what's on your mind..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-success btn-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="mb-4">Get in Touch</h3>
                <div className="mb-4">
                  <h5 className="fw-bold mb-3">📧 Email</h5>
                  <p className="mb-0">
                    <a
                      href="mailto:info@read2geda.com"
                      className="text-decoration-none"
                    >
                      info@read2geda.com
                    </a>
                  </p>
                  <p className="text-muted small mt-1">
                    We typically respond within 24-48 hours
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="fw-bold mb-3">⏰ Response Time</h5>
                  <ul className="list-unstyled">
                    <li>General inquiries: 24-48 hours</li>
                    <li>Technical support: 12-24 hours</li>
                    <li>Urgent issues: Same day</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="fw-bold mb-3">💬 Other Ways to Reach Us</h5>
                  <p className="text-muted">
                    Follow us on social media for updates, book recommendations,
                    and community highlights.
                  </p>
                  <div className="d-flex gap-3">
                    <a
                      href="#"
                      className="text-decoration-none text-dark rounded"
                      aria-label="Facebook"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-decoration-none text-dark rounded"
                      aria-label="Twitter"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-decoration-none text-dark rounded"
                      aria-label="Instagram"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.196-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.196 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.196 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="alert alert-info mt-4">
                  <strong>💡 Tip:</strong> For faster support, include as much
                  detail as possible in your message, including screenshots if
                  applicable.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <div className="card bg-light">
              <div className="card-body p-4">
                <h3 className="mb-3">Before You Contact Us</h3>
                <p className="lead mb-3">
                  You might find answers to common questions in our{" "}
                  <a
                    href="/faqs"
                    className="text-decoration-none text-light bg-dark p-1 rounded"
                  >
                    FAQs
                  </a>{" "}
                  or{" "}
                  <a
                    href="/community-guidelines"
                    className="text-decoration-none text-light bg-dark p-1 rounded"
                  >
                    Community Guidelines
                  </a>
                  .
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    ✅ Check our FAQs for quick answers to common questions
                  </li>
                  <li className="mb-2">
                    ✅ Review community guidelines for platform policies
                  </li>
                  <li className="mb-2">
                    ✅ Include relevant details when reporting bugs or issues
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
