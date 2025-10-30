import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="container my-5">
        <h1 className="display-6 mb-4">📜 Privacy Policy</h1>

        <section className="mb-4">
          <h3>1. Information We Collect</h3>
          <ul>
            <li><strong>Account Information:</strong> Name, email, and profile details you provide.</li>
            <li><strong>Book & Club Data:</strong> Books you read, clubs you join or create, and activity within those clubs.</li>
            <li><strong>Usage Data:</strong> How you interact with the app (pages visited, time spent, etc.).</li>
            <li><strong>Device Information:</strong> Browser type, IP address, and operating system.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h3>2. How We Use Your Information</h3>
          <ul>
            <li>Provide and improve the Read2Geda experience.</li>
            <li>Personalize book club suggestions and reading recommendations.</li>
            <li>Facilitate communication between club members.</li>
            <li>Ensure the safety and integrity of the community.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h3>3. Sharing Your Information</h3>
          <p>We <strong>do not sell</strong> your personal information. We may share data only in these cases:</p>
          <ul>
            <li>With other members (limited to name, club activity, and shared content).</li>
            <li>With service providers who help us run the app (e.g., hosting, analytics).</li>
            <li>If required by law or to protect rights, property, or safety.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h3>4. Your Choices</h3>
          <ul>
            <li>You can update or delete your profile information at any time.</li>
            <li>You may leave or delete book clubs you no longer wish to be part of.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h3>5. Data Security</h3>
          <p>
            We take reasonable measures to protect your information, but no online service is
            completely secure. Please use strong passwords and be cautious when sharing
            information.
          </p>
        </section>

        <section className="mb-4">
          <h3>6. Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will update the
            “Effective Date” at the top of this page.
          </p>
        </section>

        <section className="mb-4">
          <h3>7. Contact Us</h3>
          <p>
            If you have questions or concerns, reach us at:
            <a href="mailto:info@read2geda.com" className="mx-1">info@read2geda.com</a>
          </p>
        </section>

        <div className="alert alert-info text-center mt-4">
          ✨ With Read2Geda, your data stays yours. We just help you share your love for books.
        </div>
      </div>
      <Footer />
    </>
  );
}
