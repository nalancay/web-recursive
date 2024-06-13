import { useNavigate } from "react-router-dom";
import { Container, Button } from "@mui/material";
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
  const navigate = useNavigate();
  const goToHoroscopeForm = () => {
    navigate("/horoscope/form");
  };

  return (
    <StyledContainer>
      <img src="/assets/dama.png" alt="Dama" />
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
