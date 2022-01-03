import { Container } from "../App";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ItemList from "../components/ItemList";
import React, { useEffect } from "react";
import Slider from "../components/Slider";
import styled from "styled-components";
const Homepage = () => {
  return (
    <Home>
      <Slider />
      <Container>
        <ItemList />
      </Container>
    </Home>
  );
};

const Home = styled.div``;

export default Homepage;
