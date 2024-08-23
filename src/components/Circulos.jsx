/* eslint-disable react/prop-types */
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

// eslint-disable-next-line react/prop-types
const Circulos = ({
  circulos,
  currAlbumPoss,
  handleCirculo,
  carrouselLeft,
  carrouselRight,
}) => {
  return (
    <div className="top5_circulos">
      <ResponsivePagination
        current={currAlbumPoss}
        total={circulos.length - 1}
        onPageChange={handleCirculo}
      />
      {/*  <div className="left" onClick={carrouselLeft}>
        <ArrowBackIosIcon
          style={{ color: "rgb(26, 23, 23, 0.6)" }}
          onClick={carrouselLeft}
        />
      </div>
      {circulos.map((i) => (
        <div key={i}>
          {i === currAlbumPoss ? (
            <Brightness1Icon style={{ color: "rgb(26, 23, 23, 0.6)" }} />
          ) : (
            <Brightness1Icon
              onClick={() => handleCirculo(i)}
              style={{
                color: "rgb(26, 23, 23, 0.2)",
                cursor: "pointer",
              }}
            />
          )}
        </div>
      ))}
      <div className="right" onClick={carrouselRight}>
        <ArrowForwardIosIcon
          style={{ color: "rgb(26, 23, 23, 0.6)" }}
          onClick={carrouselRight}
        />
      </div> */}
    </div>
  );
};

export default Circulos;
