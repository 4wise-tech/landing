export const metadata = {
  title: "Privacy Policy • 4wise",
  description: "Privacy policy for 4wise Tech OÜ.",
};

export default function PrivacyPage() {
  return (
    <main className="legalShell">
      <div className="legalInner">
        <h1 className="legalH1">Privacy Policy</h1>
        <p className="muted">Last updated: {new Date().toISOString().slice(0, 10)}</p>

        <div className="legalCard">
          <h2 className="legalH2">Who we are</h2>
          <p className="muted">
            4wise Tech OÜ
            <br />
            Harju maakond, Tallinn, Kesklinna linnaosa, Veskiposti tn 2-1002, 10138, Estonia
            <br />
            Registry No: 17445723
          </p>

          <h2 className="legalH2">What we collect</h2>
          <ul className="legalList">
            <li>Information you provide when contacting us (e.g., name, email, message).</li>
            <li>Basic technical data to keep the site secure and reliable (e.g., IP address, user agent, timestamps).</li>
            <li>Analytics/cookies if enabled (see Cookie Policy).</li>
          </ul>

          <h2 className="legalH2">How we use information</h2>
          <ul className="legalList">
            <li>To respond to inquiries and provide requested information.</li>
            <li>To operate, maintain, and improve the website.</li>
            <li>To prevent abuse, fraud, and security incidents.</li>
          </ul>

          <h2 className="legalH2">Sharing</h2>
          <p className="muted">
            We do not sell personal data. We may share data with service providers (e.g., hosting) only as necessary to
            operate the website and deliver services.
          </p>

          <h2 className="legalH2">Your rights</h2>
          <p className="muted">
            Depending on your location, you may have rights to access, correct, delete, or restrict processing of your
            personal data. To exercise these rights, contact us at <a className="legalLink" href="mailto:hello@4wise.tech">hello@4wise.tech</a>.
          </p>

          <h2 className="legalH2">Contact</h2>
          <p className="muted">
            Email: <a className="legalLink" href="mailto:hello@4wise.tech">hello@4wise.tech</a>
          </p>
        </div>
      </div>
    </main>
  );
}

