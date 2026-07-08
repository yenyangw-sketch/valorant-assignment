'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Header */}
      <header>
        <div className="logo">
          <h2>APU Valorant Club</h2>
        </div>
        <nav>
          <ul>
            <li><Link href="/">HOME</Link></li>
            <li><Link href="/about">ABOUT</Link></li>
            <li><Link href="/rules">RULES</Link></li>
            <li><Link href="/equipment">EQUIPMENT</Link></li>
            <li><Link href="/events">EVENTS</Link></li>
            <li><Link href="/gallery">GALLERY</Link></li>
            <li><Link href="/register">REGISTER</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>APU Valorant Club</h2>
          <p>Play • Compete • Improve Together</p>
          <Link href="/register" className="button">Join Our Club&#10142;</Link>
        </div>
      </section>

      {/* Home Content Grid */}
      <div className="home-content">
        <section className="about">
          <h2>About Us</h2>
          <p>
            The APU Valorant Club is a community for students who are
            passionate about esports and teamwork.
          </p>
          <Link href="/about" className="button">READ MORE&#10142;</Link>
        </section>

        <section className="events">
          <h2>Upcoming Events</h2>
          <ul>
            <li>Monthly Tournament</li>
            <li>Weekly Training</li>
            <li>Workshop</li>
          </ul>
          <Link href="/events" className="button">VIEW ALL EVENTS&#10142;</Link>
        </section>

        <section className="news">
          <h2>Latest News</h2>
          <Link href="/news" className="button">SEE ALL NEWS&#10142;</Link>
        </section>

        <section className="gallery">
          <h2>Gallery Preview</h2>
          <Link href="/gallery" className="button">VIEW GALLERY&#10142;</Link>
        </section>
      </div>

      {/* Join Section */}
      <section className="join">
        <h2>BECOME OUR MEMBER TODAY!</h2>
        <Link href="/register" className="button">REGISTER NOW&#10142;</Link>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-about">
            <h3>APU Valorant Club</h3>
            <p>© 2026</p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/">HOME</Link></li>
              <li><Link href="/about">ABOUT</Link></li>
              <li><Link href="/rules">RULES</Link></li>
              <li><Link href="/events">EVENTS</Link></li>
              <li><Link href="/gallery">GALLERY</Link></li>
              <li><Link href="/register">REGISTER</Link></li>
            </ul>
          </div>
          <div className="footer-social">
            <h3>Follow Us</h3>
            <Link href="#">Instagram</Link>
            <Link href="#">YouTube</Link>
            <Link href="#">Discord</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
