import ItemList from "../components/ItemList";
import React from "react";
import Slider from "../components/Slider";
import styled from "styled-components";
const Homepage = () => {
  return (
    <Home>
      <Slider />
      <ItemList />
    </Home>
  );
};

const Home = styled.div``;

export default Homepage;
