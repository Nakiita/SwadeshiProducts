import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
const About = () => {
  return (
    <>
      <div className="container mt-5">
        <div class="row">
          <div class="col-md-6 content0" style={{ marginTop: "150px" }}>
            <h1>About</h1>
            <h4
              style={{ color: "grey", marginTop: "20px", marginBottom: "20px" }}
            >
              Discover the Essence of Nepal: A Guide to Our Swadeshi Collection
            </h4>
            <p>
              Welcome to Swadeshi Products, your premier destination for
              authentic Nepali swadeshi products. Founded with a vision to
              promote and celebrate the rich heritage and craftsmanship of
              Nepal, we are committed to showcasing the finest handcrafted goods
              that reflect the essence of our nation. At Swadeshi, we take pride
              in offering a diverse range of products, from traditional
              handicrafts to modern innovations, all sourced directly from local
              artisans and manufacturers across Nepal. Our mission is to not
              only provide customers with high-quality products but also to
              support local communities and empower artisans by creating
              sustainable livelihood opportunities. With a focus on
              authenticity, quality, and ethical sourcing, we invite you to
              explore our curated collection and experience the true essence of
              Nepal through our swadeshi offerings. Thank you for supporting
              Nepali craftsmanship and joining us on this journey of discovery
              and appreciation.
            </p>
          </div>
          <div class="col-md-6">
            <img src="../assets/images/about.jpg" alt="Nepali Handicrafts" />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
