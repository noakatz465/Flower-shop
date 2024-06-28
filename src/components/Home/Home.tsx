import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='Home'>
      <div className="home-container">
        <header className="header">
          <h1>ברוכים הבאים לחנות הפרחים שלנו</h1>
          <p>מבחר רחב של זרי פרחים טריים ומדהימים</p>
        </header>
        <main className="main-content">
          <section className="features-section">
            <div className="feature">
              <img src="/home1.jpg" alt="Feature 1" className="feature-image" />
              <div className="feature-text">
                <h2 className="feature-title">משלוח חינם</h2>
                <p className="feature-description">קנו עכשיו ותהנו ממשלוח חינם לכל חלקי הארץ.</p>
              </div>
            </div>
            <div className="feature">
              <img src="/home2.jpg" alt="Feature 2" className="feature-image" />
              <div className="feature-text">
                <h2 className="feature-title">מבצעים מיוחדים</h2>
                <p className="feature-description">כל יום מבצעים מיוחדים והנחות על זרי הפרחים הכי יפים בחנות.</p>
              </div>
            </div>
            <div className="feature">
              <img src="/home3.jpg" alt="Feature 3" className="feature-image" />
              <div className="feature-text">
                <h2 className="feature-title">שירות לקוחות מעולה</h2>
                <p className="feature-description">צוות השירות לקוחות שלנו זמין 24/7 לכל שאלה או דרישה.</p>
              </div>
            </div>
          </section>
          <section className="cta-section">
            <h2 className="cta-title">מצאו את הזר המושלם עבורכם עוד היום</h2>
            <Link to="/flower-list" className="cta-button">ראה עוד</Link>
          </section>
          <section className="testimonials-section">
            <h2 className="section-title">מה הלקוחות שלנו אומרים</h2>
            <div className="testimonial">
              <p className="testimonial-text">“השירות היה מעולה והפרחים היו יפיפיים. בהחלט אחזור לקנות שוב!”</p>
              <p className="testimonial-author">- יעל, תל אביב</p>
            </div>
            <div className="testimonial">
              <p className="testimonial-text">“המשלוח הגיע מהר מאוד והפרחים היו טריים וריחניים.”</p>
              <p className="testimonial-author">- דני, ירושלים</p>
            </div>
          </section>
          <section className="offers-section">
            <h2 className="section-title">מבצעים נוכחיים</h2>
            <div className="offer">
              <h3 className="offer-title">10% הנחה על כל הזרים האדומים</h3>
              <p className="offer-description">נצלו את ההזדמנות וקנו עכשיו זר פרחים מהמם במחיר מיוחד!</p>
            </div>
            <div className="offer">
              <h3 className="offer-title">קנו 2 זרים וקבלו משלוח חינם</h3>
              <p className="offer-description">מבצע מיוחד לחודש הקרוב. אל תפספסו!</p>
            </div>
          </section>
        </main>
        <footer className="footer">
          <p>כל הזכויות שמורות &copy; 2024 חנות הפרחים שלנו</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;

