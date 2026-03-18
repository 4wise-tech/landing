export const metadata = {
  title: "Terms of Service • 4wise",
  description: "Terms of service for 4wise Tech OÜ.",
};

export default function TermsPage() {
  return (
    <main className="legalShell">
      <div className="legalInner">
        <h1 className="legalH1">Terms of Service</h1>
        <p className="muted">Last updated: {new Date().toISOString().slice(0, 10)}</p>

        <div className="legalCard">
          <h2 className="legalH2">Website use</h2>
          <p className="muted">
            By using this website, you agree to use it lawfully and not to attempt to disrupt, damage, or gain
            unauthorized access to systems or data.
          </p>

          <h2 className="legalH2">No warranty</h2>
          <p className="muted">
            The website and its content are provided “as is” without warranties of any kind. We may update content at
            any time without notice.
          </p>

          <h2 className="legalH2">Limitation of liability</h2>
          <p className="muted">
            To the maximum extent permitted by law, 4wise Tech OÜ is not liable for indirect, incidental, or
            consequential damages arising from use of the website.
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

