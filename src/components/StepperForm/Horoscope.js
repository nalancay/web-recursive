import PropTypes from "prop-types";
import { Button, Typography, Box, CircularProgress } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

import { calculateDaysUntilBirthday } from "../../utils/date";

export const Horoscope = ({
  dataHoroscope,
  isLoadingZodiacSign,
  iconZodiacSign,
  personalDetails,
  goToInicio,
  errorMessage,
}) => {
  return (
    <>
      {errorMessage?.code && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
            backgroundColor: "#f8d7da",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <WarningIcon
            sx={{ fontSize: 60, color: "#721c24", marginBottom: "20px" }}
          />
          <Typography
            variant="h6"
            align="center"
            sx={{ color: "#721c24", marginBottom: "10px" }}
          >
            Tenemos un problema técnico con el servidor.
          </Typography>
          <Typography variant="body1" align="center" sx={{ color: "#721c24" }}>
            Inténtalo más tarde.
          </Typography>
          <Button
            variant="contained"
            color="warning"
            onClick={goToInicio}
            sx={{
              borderRadius: "14px",
              paddingLeft: "100px",
              paddingRight: "100px",
              marginTop: "30px",
            }}
            size="medium"
          >
            Aceptar
          </Button>
        </Box>
      )}
      {isLoadingZodiacSign ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "500px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {errorMessage === undefined && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{ textAlign: "center", padding: "20px" }}
            >
              <Box
                component="img"
                src={iconZodiacSign}
                alt="sign"
                marginBottom="30px"
                sx={{
                  width: {
                    xs: "70%",
                    md: "30%",
                  },
                  height: "auto",
                  alignSelf: "flex-start",
                }}
              />
              <Typography variant="h6" align="center" marginBottom="20px">
                {`Hola ${
                  personalDetails.name.charAt(0).toUpperCase() +
                  personalDetails.name.slice(1)
                }!`}
              </Typography>
              <Typography variant="body1" align="center" marginBottom="30px">
                Tu horóscopo para hoy dice: {dataHoroscope}
              </Typography>
              <Typography variant="body1" align="center">
                {`Faltan  ${calculateDaysUntilBirthday(
                  personalDetails.dateOfBirth
                )} días para tu cumpleaños.`}
              </Typography>
              <Button
                variant="contained"
                color="warning"
                onClick={goToInicio}
                sx={{
                  borderRadius: "14px",
                  paddingLeft: "100px",
                  paddingRight: "100px",
                  marginTop: "30px",
                }}
                size="medium"
              >
                Continuar
              </Button>
            </Box>
          )}
        </>
      )}
    </>
  );
};

Horoscope.propTypes = {
  dataHoroscope: PropTypes.string,
  isLoadingZodiacSign: PropTypes.bool,
  iconZodiacSign: PropTypes.string,
  personalDetails: PropTypes.object,
  goToInicio: PropTypes.func,
  errorMessage: PropTypes.object,
};
