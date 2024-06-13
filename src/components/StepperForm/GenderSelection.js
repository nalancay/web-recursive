import React, { useState } from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Box,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

const StyledToggleButton = styled(ToggleButton)`
  padding: 10px;
  border: none;
  flex: 0 0 auto;

  & img {
    width: 100%;
    height: auto;
    max-width: 100px;
  }

  @media (max-width: 600px) {
    & img {
      max-width: 80px;
    }
  }
`;

function GenderSelection({ personalDetails, handleInputChange, handleNext }) {
  const [showMessage, setShowMessage] = useState(false);

  const handleGenderChange = (event, newGender) => {
    if (newGender !== null) {
      setShowMessage(false);
      handleInputChange({ target: { name: "gender", value: newGender } });
    }
  };

  const handleNextClick = () => {
    if (personalDetails.gender === "") {
      setShowMessage(true);
    } else {
      handleNext();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "50px",
      }}
    >
      <ToggleButtonGroup
        value={personalDetails.gender}
        exclusive
        onChange={handleGenderChange}
        aria-label="gender selection"
      >
        <StyledToggleButton value="male" aria-label="male">
          <img src="/assets/gen-1.png" alt="Male" />
        </StyledToggleButton>
        <StyledToggleButton value="other" aria-label="other">
          <img src="/assets/gen-2.png" alt="Other" />
        </StyledToggleButton>
        <StyledToggleButton value="female" aria-label="female">
          <img src="/assets/gen-3.png" alt="Female" />
        </StyledToggleButton>
      </ToggleButtonGroup>
      {showMessage && (
        <Typography color="error" variant="body2">
          Por favor, seleccione un género.
        </Typography>
      )}
      <Button
        variant="contained"
        color="warning"
        onClick={handleNextClick}
        sx={{
          borderRadius: "14px",
          paddingLeft: "100px",
          paddingRight: "100px",
        }}
        size="medium"
      >
        IGRESAR
      </Button>
    </Box>
  );
}

export default GenderSelection;
