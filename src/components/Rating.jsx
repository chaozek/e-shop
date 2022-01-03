import React from "react";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
/* eslint-disable react/prop-types */
const Rating = ({ rating }) => {
  return (
    <div>
      {rating > 0.5 ? (
        <StarIcon style={{ color: "#F7B011" }} />
      ) : <StarHalfIcon style={{ color: "#F7B011" }} /> && rating < 0.5 ? (
        <StarOutlineIcon style={{ color: "#F7B011" }} />
      ) : (
        <StarHalfIcon style={{ color: "#F7B011" }} />
      )}
      {rating > 1 ? (
        <StarIcon style={{ color: "#F7B011" }} />
      ) : <StarHalfIcon style={{ color: "#F7B011" }} /> && rating < 1.5 ? (
        <StarOutlineIcon style={{ color: "#F7B011" }} />
      ) : (
        <StarHalfIcon style={{ color: "#F7B011" }} />
      )}
      {rating > 2.5 ? (
        <StarIcon style={{ color: "#F7B011" }} />
      ) : <StarHalfIcon style={{ color: "#F7B011" }} /> && rating < 2.5 ? (
        <StarOutlineIcon style={{ color: "#F7B011" }} />
      ) : (
        <StarHalfIcon />
      )}
      {rating > 3.5 ? (
        <StarIcon style={{ color: "#F7B011" }} />
      ) : <StarHalfIcon style={{ color: "#F7B011" }} /> && rating < 3.5 ? (
        <StarOutlineIcon style={{ color: "#F7B011" }} />
      ) : (
        <StarHalfIcon style={{ color: "#F7B011" }} />
      )}
      {rating > 4.5 ? (
        <StarIcon style={{ color: "#F7B011" }} />
      ) : <StarHalfIcon style={{ color: "#F7B011" }} /> && rating < 4.5 ? (
        <StarOutlineIcon style={{ color: "#F7B011" }} />
      ) : (
        <StarHalfIcon style={{ color: "#F7B011" }} />
      )}
    </div>
  );
};

export default Rating;
