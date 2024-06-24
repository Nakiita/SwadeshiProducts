import React from "react";

const About = () => {
  return (
    <>
      <div className="container mx-auto mt-12">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-4 mt-10 md:mt-36">
            <h1 className="text-3xl font-bold">About</h1>
            <h4 className="text-gray-500 mt-5 mb-5 text-lg">
              Discover the Essence of Nepal: A Guide to Our Swadeshi Collection
            </h4>
            <p className="text-base">
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
          <div className="mb-[5rem] mt-[5rem] md:w-1/2 px-4">
            <img
              src="../assets/images/about.jpg"
              alt="Nepali Handicrafts"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
