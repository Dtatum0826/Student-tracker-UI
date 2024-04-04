import React from 'react';

const redirect = async event => {
  window.location.href = '/register';
}
const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Track Student Progress, Simplify Your Teaching</h1>
        <p>An intuitive platform for organizing assignments, monitoring grades, and streamlining communication.</p>
        <button className="btn-primary">Sign Up Now</button> 
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
      <button className="register-button" type="submit" onClick={redirect}>Register</button>
    </div>
  );
};

export default LandingPage;