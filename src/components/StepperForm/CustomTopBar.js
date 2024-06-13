import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CustomTopBarRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(2),
  color: "#FFF",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

const CircularIconContainer = styled(Box)(({ theme }) => ({
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.dark,
  color: "#FFF",
  marginRight: theme.spacing(1),
}));

export const CustomTopBar = ({ title = "", onClick }) => {
  return (
    <CustomTopBarRoot>
      <CircularIconContainer>
        <ArrowBackIcon
          onClick={onClick}
          sx={{
            cursor: "pointer",
          }}
        />
      </CircularIconContainer>
      <Typography variant="h6">{title}</Typography>
    </CustomTopBarRoot>
  );
};
