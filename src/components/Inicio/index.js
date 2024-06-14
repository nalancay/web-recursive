import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Skeleton } from "@mui/material";
import styled from "@emotion/styled";

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 35px;
  margin-top: 70px;

  & img {
    width: 100%;
    height: auto;
    max-width: 230px;
  }
`;

export const Inicio = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const navigate = useNavigate();
  const goToHoroscopeForm = () => {
    navigate("/horoscope/form");
  };

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/dama.png";
    img.onload = () => setImgLoaded(true);
  }, []);

  return (
    <StyledContainer>
      {imgLoaded ? (
        <img src="/assets/dama.png" alt="Dama" />
      ) : (
        <Skeleton variant="rectangular" width="100%" height={300} />
      )}
      <Button
        variant="contained"
        color="warning"
        onClick={goToHoroscopeForm}
        sx={{
          borderRadius: "14px",
          paddingLeft: "100px",
          paddingRight: "100px",
        }}
        size="medium"
      >
        IGRESAR
      </Button>
    </StyledContainer>
  );
};
