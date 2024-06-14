import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Box,
  Typography,
  Skeleton,
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

function GenderSelection({ gender, handleInputChange, handleNext }) {
  const [imgLoaded, setImgLoaded] = useState({
    male: false,
    other: false,
    female: false,
  });
  const [showMessage, setShowMessage] = useState(false);

  const handleGenderChange = (event, newGender) => {
    if (newGender !== null) {
      setShowMessage(false);
      handleInputChange({ target: { name: "gender", value: newGender } });
    }
  };

  const handleNextClick = () => {
    if (gender === "") {
      setShowMessage(true);
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    const maleImg = new Image();
    const otherImg = new Image();
    const femaleImg = new Image();

    maleImg.src = "/assets/gen-1.png";
    otherImg.src = "/assets/gen-2.png";
    femaleImg.src = "/assets/gen-3.png";

    maleImg.onload = () =>
      setImgLoaded((prevState) => ({ ...prevState, male: true }));
    otherImg.onload = () =>
      setImgLoaded((prevState) => ({ ...prevState, other: true }));
    femaleImg.onload = () =>
      setImgLoaded((prevState) => ({ ...prevState, female: true }));
  }, []);

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
        value={gender}
        exclusive
        onChange={handleGenderChange}
        aria-label="gender selection"
      >
        <StyledToggleButton value="male" aria-label="male">
          {imgLoaded.male ? (
            <img src="/assets/gen-1.png" alt="Male" />
          ) : (
            <Skeleton
              variant="rectangular"
              width={100}
              height={100}
              sx={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}
        </StyledToggleButton>
        <StyledToggleButton value="other" aria-label="other">
          {imgLoaded.other ? (
            <img src="/assets/gen-2.png" alt="Other" />
          ) : (
            <Skeleton
              variant="rectangular"
              width={100}
              height={100}
              sx={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}
        </StyledToggleButton>
        <StyledToggleButton value="female" aria-label="female">
          {imgLoaded.female ? (
            <img src="/assets/gen-3.png" alt="Female" />
          ) : (
            <Skeleton
              variant="rectangular"
              width={100}
              height={100}
              sx={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}
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

GenderSelection.propTypes = {
  gender: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleNext: PropTypes.func,
};

export default GenderSelection;
