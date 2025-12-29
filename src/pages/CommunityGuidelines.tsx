import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CommunityGuidelines() {
  return (
    <>
      <Header />
      <div className="container my-5">
        <h1 className="display-6 mb-4">🤝 Community Guidelines</h1>
        <p className="lead mb-4">
          Read2Geda is a space for readers to connect, share, and grow together.
          These guidelines help ensure a positive experience for everyone.
        </p>

        <section className="mb-4">
          <h3>1. Be Respectful and Kind</h3>
          <ul>
            <li>
              <strong>Treat everyone with respect:</strong> We welcome diverse
              perspectives, backgrounds, and opinions. Disagreements are natural,
              but personal attacks, harassment, or discrimination are not
              tolerated.
            </li>
            <li>
              <strong>Use inclusive language:</strong> Be mindful of how your
              words affect others. Avoid offensive, discriminatory, or harmful
              language.
            </li>
            <li>
              <strong>Listen actively:</strong> Engage thoughtfully with others&apos;
              ideas, even when you disagree. Healthy debate enriches our
              community.
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h3>2. Content Guidelines</h3>
          <ul>
            <li>
              <strong>Keep it relevant:</strong> Share content related to books,
              reading, book clubs, and literary discussions. Off-topic spam or
              self-promotion may be removed.
            </li>
            <li>
              <strong>No spoilers without warnings:</strong> Use spoiler tags or
              clear warnings when discussing plot points, endings, or major
              revelations.
            </li>
            <li>
              <strong>Respect intellectual property:</strong> Do not share
              copyrighted material, full book texts, or pirated content. Share
              quotes and excerpts responsibly.
            </li>
            <li>
              <strong>Be honest in reviews:</strong> Share genuine thoughts and
              experiences. Fake reviews or manipulative content are not allowed.
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h3>3. Book Club Participation</h3>
          <ul>
            <li>
              <strong>Follow club rules:</strong> Each book club may have its own
              guidelines. Respect the moderators and the community&apos;s
              established norms.
            </li>
            <li>
              <strong>Active participation:</strong> Members are encouraged to actively participate in discussions and share their thoughts. Your unique perspective enriches our reading experience. Contribute meaningfully to discussions—low-effort posts, trolling, or derailing conversations are discouraged.
            </li>
            <li>
              <strong>Respect reading pace:</strong> Be mindful of spoilers if
              you&apos;re ahead of the group. Use designated channels for
              advanced discussions when available.
            </li>
            <li>
              <strong>Moderator authority:</strong> Club moderators have the
              right to manage their communities. Follow their guidance and
              decisions.
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h3>4. Privacy and Safety</h3>
          <ul>
            <li>
              <strong>Protect personal information:</strong> Do not share your
              own or others&apos; private information (addresses, phone numbers,
              emails, etc.) publicly.
            </li>
            <li>
              <strong>Respect boundaries:</strong> If someone asks you to stop
              contacting them or to change your behavior, respect that request.
            </li>
            <li>
              <strong>Report concerns:</strong> If you see harassment, spam,
              threats, or other violations, report them using our{" "}
              <a href="/contact" className="text-decoration-none text-light bg-dark p-1 rounded">contact form</a> or
              in-app reporting tools.
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h3>5. Prohibited Behavior</h3>
          <p>The following actions are not allowed on Read2Geda:</p>
          <ul>
            <li>Harassment, bullying, or targeted attacks</li>
            <li>Hate speech, discrimination, or bigotry</li>
            <li>Spam, scams, or fraudulent activity</li>
            <li>Impersonation of other users or entities</li>
            <li>Sharing explicit, violent, or illegal content</li>
            <li>Attempting to hack, disrupt, or abuse the platform</li>
            <li>Creating multiple accounts to evade bans or restrictions</li>
          </ul>
        </section>

        <section className="mb-4">
          <h3>6. Enforcement and Consequences</h3>
          <ul>
            <li>
              <strong>Warnings:</strong> Minor violations may result in a
              warning and guidance on expected behavior.
            </li>
            <li>
              <strong>Temporary restrictions:</strong> Repeated or moderate
              violations may lead to temporary limitations on posting, joining
              clubs, or messaging.
            </li>
            <li>
              <strong>Account suspension or termination:</strong> Serious
              violations, repeated offenses, or harmful behavior may result in
              permanent account removal.
            </li>
            <li>
              <strong>Appeal process:</strong> If you believe an action was taken
              in error, you can contact us to request a review.
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h3>7. Your Role in the Community</h3>
          <p>
            Every member helps shape Read2Geda. By following these guidelines,
            reporting violations, and treating others with kindness, you
            contribute to a welcoming space for all readers.
          </p>
          <p>
            Remember: Behind every profile is a real person who loves books just
            like you. Let&apos;s build a community where everyone feels safe to
            share, learn, and connect.
          </p>
        </section>

        <section className="mb-4">
          <h3>8. Questions or Concerns?</h3>
          <p>
            If you have questions about these guidelines or need to report a
            violation, please{" "}
            <a href="/contact" className="text-decoration-none text-light bg-dark p-1 rounded">contact us</a>. We&apos;re here to help.
          </p>
        </section>

        <div className="alert alert-info text-center mt-4">
          📚 Together, we create a space where every reader belongs. Thank you
          for being part of the Read2Geda community!
        </div>
      </div>
      <Footer />
    </>
  );
}
