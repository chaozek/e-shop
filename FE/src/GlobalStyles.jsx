import { createGlobalStyle } from "styled-components";
export const theme = {
  color: {
    darkGray: "#121212",
    white: "white",
    blue: "#3bb6d7",
    customWhite: "#e8f9f2",
    gray: "##FEFEFE",
  },
};

export const GlobalStyles = createGlobalStyle`
input {
  all: unset;
}
  body {
    -webkit-appearance:none;
    background-position: top right;
    background-repeat: no-repeat;
    background-size: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
    font-family: 'Roboto', sans-serif;
    scroll-behavior: smooth;
html{
  -webkit-appearance:none;
  box-sizing: border-box; 
  margin: 0;
    padding: 0;
    scroll-behavior: smooth;

}
  }
a{
  text-decoration: none !important;

}
h1,h2,h3,h4,h5{
  font-family: 'Bebas Neue', cursive;
}
  ul{
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: black;
  }


input{
  box-sizing: border-box; 
}

@media screen and (max-width: 576px) {
  .shippingForm {
    width: 100%;
   } 
   .marginTop{
    margin:  50px 0;
  
}
   
   }

`;
