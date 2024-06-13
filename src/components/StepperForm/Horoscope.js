import { Button, Typography, Box, CircularProgress } from "@mui/material";
import { calculateDaysUntilBirthday } from "../../utils/date";

export const Horoscope = ({
  dataZodiacSign,
  isLoadingZodiacSign,
  iconZodiacSign,
  personalDetails,
  goToInicio,
}) => {
  return (
    <>
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
            Tu horóscopo para hoy dice: {dataZodiacSign.horoscope}
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
  );
};
