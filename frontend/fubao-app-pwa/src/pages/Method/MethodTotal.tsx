import React, { useEffect, useState } from "react";
import Method1 from "../../components/Main/Method1";
import Method2 from "../../components/Main/Method2";
import Method3 from "../../components/Main/Method3";
import Method4 from "../../components/Main/Method4";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { methodGetApi } from "../../store/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HomeIcon } from "../../styles/globalStyles";
import "../../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MethodTotal = () => {
  const [methods, setMethods] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const response = await methodGetApi(token);
        setMethods(response);
        console.log(response);
      } catch (error) {
        console.error("API 호출 중 에러 발생:", error);
      }
    };

    fetchMethods();
  }, [token]);

  return (
    <div style={{ position:"relative", padding: "1rem 1rem 2rem", backgroundColor: "#E3F2FD" }}>
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
      <Method1 />
      <Method2 />
      <Method3 />
      <Method4 />
    </div>
  );
};

export default MethodTotal;
