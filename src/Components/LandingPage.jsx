import React from 'react';
import '../styles/LandingPage.css'


const redirect = async event => {
  window.location.href = '/register';
}
const LandingPage = () => {

  return (
    <div>
      {/* Hero Section */}
      
<section className="hero">
  <div className="hero-content">
    <h1>Track Student Progress, Simplify Your Teaching</h1>
    <p>An intuitive platform for organizing assignments, monitoring grades, and streamlining communication.</p>
    <button className="register-button" onClick={redirect}>Sign Up Now</button>
  </div>
</section>
     

      {/* Features Section */}
      <section className="features">
        {/* Feature 1, Feature 2, Feature 3... */}
      </section>

      {/* Testimonials Section (if desired) */}
      <section className="testimonials">
        {/* Testimonials...*/}
      </section>

       {/* Secondary CTA */}
      <section className="call-to-action">
        {/* Repeat button */}
      </section>
      
    </div>
  );
};

export default LandingPage;