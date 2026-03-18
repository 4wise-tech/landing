export const metadata = {
  title: "Cookie Policy • 4wise",
  description: "Cookie policy for 4wise Tech OÜ.",
};

export default function CookiesPage() {
  return (
    <main className="legalShell">
      <div className="legalInner">
        <h1 className="legalH1">Cookie Policy</h1>
        <p className="muted">Last updated: {new Date().toISOString().slice(0, 10)}</p>

        <div className="legalCard">
          <p className="muted">
            Cookies are small text files stored on your device. We use them to make the website work, keep it secure,
            and (optionally) understand how the site is used.
          </p>

          <h2 className="legalH2">Types of cookies</h2>
          <ul className="legalList">
            <li><strong>Essential</strong>: required for core functionality and security.</li>
            <li><strong>Preferences</strong>: remember choices (if enabled).</li>
            <li><strong>Analytics</strong>: help us understand usage (if enabled).</li>
          </ul>

          <h2 className="legalH2">Managing cookies</h2>
          <p className="muted">
            You can control cookies through your browser settings. Disabling some cookies may affect site functionality.
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

