import React from "react";
import Point1 from "../../components/Main/Point1";
import Point2 from "../../components/Main/Point2";
import Point3 from "../../components/Main/Point3";
import Point4 from "../../components/Main/Point4";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HomeIcon } from "../../styles/globalStyles";
import "../../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const PointTotal = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ padding: "1rem 1rem 2rem", backgroundColor: "#E3F2FD" }}>
      <ChevronLeftIcon
        sx={{
          marginTop: 1,
          cursor: "pointer",
        }}
        onClick={handleBack}
      />
      <Link to="/">
        <HomeIcon color="#555555">
          <FontAwesomeIcon icon="home" />
        </HomeIcon>
      </Link>
      <Point1 />
      <Point2 />
      <Point3 />
      <Point4 />
    </div>
  );
};

export default PointTotal;
