import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "react-bootstrap/Carousel";
import React, { Component, useState } from "react"; // requires a loader
import ReactDOM from "react-dom";
import promo from "./../imgs/promo.jpg";
import styled from "styled-components";
const Slider = () => {
  const [index, setIndex] = useState(0);
  /* src =
    "https://media.gq.com/photos/5eab4aaeeffccbb34a5b0454/master/pass/gq%20may%202020%20The%20Future%20of%20the%20Fashion%20Show%20Is%20Here.jpg"; */

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel pause="false" style={{ minHeight: "90vh", margin: "auto" }}>
      <Carousel.Item interval={3000} style={{ minHeight: "90vh" }}>
        <img
          className="d-block w-100"
          src="https://www.pantone.com/media/wysiwyg/fashion-color-trend-report/spring-summer-2022/new-york/Pantone-Fashion-Color-Trend-Report-New-York-Spring-Summer-2022-Article.jpg"
          alt="First slide"
          style={{ minHeight: "90vh", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <HeadText>Fashion</HeadText>
          <UnderHeaderText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </UnderHeaderText>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000} style={{ minHeight: "90vh" }}>
        <img
          className="d-block w-100"
          src="https://www.prym-fashion.com/fileadmin/prym-fashion.com/Bilder/Header-Images/Prym-Fashion-Home-Teaser_1920x1920.jpg"
          alt="Second slide"
          style={{ minHeight: "90vh", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <HeadText>Trends</HeadText>
          <UnderHeaderText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </UnderHeaderText>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000} style={{ minHeight: "90vh" }}>
        <img
          className="d-block w-100"
          src="https://www.supdeluxe.com/sites/default/files/mba_fashion.jpg"
          alt="Third slide"
          style={{ minHeight: "90vh", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <HeadText>Unisex</HeadText>
          <UnderHeaderText>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </UnderHeaderText>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
const HeadText = styled.h3`
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
  font-size: 4rem;
`;
const UnderHeaderText = styled.p`
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
`;
UnderHeaderText;
