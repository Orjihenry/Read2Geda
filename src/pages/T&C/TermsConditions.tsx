import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Terms() {
  return (
    <>
      <Header />
      <div className="container my-5">
        <h1 className="display-6 mb-4">📑 Terms & Conditions</h1>

        <section className="mb-4">
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing or using Read2Geda, you agree to these Terms & Conditions. 
            If you do not agree, please discontinue use of the platform immediately.
          </p>
        </section>

        <section className="mb-4">
          <h3>2. Eligibility</h3>
          <p>
            You must be at least 13 years old to use Read2Geda. 
            By using the app, you confirm that you meet this requirement.
          </p>
        </section>

        <section className="mb-4">
          <h3>3. User Accounts</h3>
          <ul>
            <li>You are responsible for maintaining the confidentiality of your account and password.</li>
            <li>You agree to provide accurate and up-to-date information.</li>
            <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h3>4. User Content</h3>
          <p>
            Users may post reviews, discussions, and other content in book clubs. 
            You retain ownership of your content, but by posting, you grant Read2Geda 
            a non-exclusive license to display and distribute that content within the app.
          </p>
        </section>

        <section className="mb-4">
          <h3>5. Prohibited Activities</h3>
          <ul>
            <li>Posting harmful, offensive, or unlawful content.</li>
            <li>Harassing or impersonating other users.</li>
            <li>Attempting to hack, disrupt, or misuse the platform.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h3>6. Intellectual Property</h3>
          <p>
            All trademarks, logos, and app content (excluding user-generated content) 
            are the property of Read2Geda. You may not copy or use them without permission.
          </p>
        </section>

        <section className="mb-4">
          <h3>7. Termination</h3>
          <p>
            We may suspend or terminate your account if you violate these Terms, 
            misuse the platform, or engage in harmful behavior towards the community.
          </p>
        </section>

        <section className="mb-4">
          <h3>8. Limitation of Liability</h3>
          <p>
            Read2Geda is provided "as is." We do not guarantee uninterrupted access or 
            error-free service. We are not liable for any damages resulting from use of the platform.
          </p>
        </section>

        <section className="mb-4">
          <h3>9. Changes to Terms</h3>
          <p>
            We may update these Terms occasionally. When we do, we will update the 
            “Effective Date” above. Continued use of the platform means you accept the updated terms.
          </p>
        </section>

        <section className="mb-4">
          <h3>10. Contact Us</h3>
          <p>
            For questions about these Terms, contact us at{" "}
            <a href="mailto:info@read2geda.com">info@read2geda.com</a>.
          </p>
        </section>

        <div className="alert alert-info text-center mt-4">
          💡 Respect the community, share responsibly, and let’s grow together through books.
        </div>
      </div>
      <Footer />
    </>
  );
}
