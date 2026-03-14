import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact-section">

      <div className="container">

        <div className="row contact-wrapper">

          {/* LEFT SIDE INFO */}

          <div className="col-lg-5 contact-info">

            <h2>Contact Us</h2>

            <p>
              Have questions about your order or need help with our menu?
              Our team is here to help you anytime.
            </p>

            <div className="contact-item">
              <i className="bi bi-geo-alt"></i>
              <span>Pune, Maharashtra</span>
            </div>

            <div className="contact-item">
              <i className="bi bi-envelope"></i>
              <span>support@foodhub.com</span>
            </div>

            <div className="contact-item">
              <i className="bi bi-telephone"></i>
              <span>+91 89563 33734</span>
            </div>

          </div>

          {/* RIGHT SIDE FORM */}

          <div className="col-lg-7">

            <div className="contact-form-card">

              <h3>Send us a message</h3>

              <form>

                <div className="row g-3">

                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="First Name"
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="Last Name"
                    />
                  </div>

                  <div className="col-12">
                    <input
                      type="email"
                      className="form-control custom-input"
                      placeholder="Email Address"
                    />
                  </div>

                  <div className="col-12">
                    <textarea
                      className="form-control custom-input"
                      rows="5"
                      placeholder="Your Message"
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <button className="send-btn">
                      Send Message
                    </button>
                  </div>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Contact;