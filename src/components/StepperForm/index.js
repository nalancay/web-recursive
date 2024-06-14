import { useNavigate } from "react-router-dom";
import { CustomTopBar } from "./CustomTopBar";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { CircleRounded, CircleOutlined } from "@mui/icons-material";
import { useStepperForm } from "./useStepperForm";
import GenderSelection from "./GenderSelection";
import { UserData } from "./UserData";
import { Horoscope } from "./Horoscope";

const steps = ["Tu Género", "Tus Datos", "Tu Horóscopo"];

const theme = createTheme({
  components: {
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: "#007BFF",
        },
      },
    },
  },
});

export const StepperForm = () => {
  const navigate = useNavigate();
  const goToInicio = () => {
    navigate("/");
  };

  const {
    activeStep,
    personalDetails,
    handleInputChange,
    handleNext,
    handleBack,
    validateFields,
    errorMessageFields,
    handleApply,
    dataZodiacSign,
    isLoadingZodiacSign,
    iconZodiacSign,
    errorMessage,
  } = useStepperForm();

  return (
    <ThemeProvider theme={theme}>
      <CustomTopBar
        title={steps[activeStep]}
        onClick={activeStep === 0 ? goToInicio : handleBack}
      />
      <Container>
        <Box sx={{ width: "100%" }}>
          {activeStep !== 2 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                mt: 10,
              }}
            >
              <Stepper activeStep={activeStep} sx={{ width: "90%" }}>
                {steps.map((_, index) => (
                  <Step key={index} sx={{ margin: 0, padding: 0 }}>
                    <StepLabel
                      StepIconComponent={() => (
                        <IconButton
                          sx={{
                            color: theme.palette.primary.main,
                            margin: 0,
                            padding: 0,
                            cursor: "default",
                          }}
                        >
                          {index === activeStep || index === 0 ? (
                            <CircleRounded />
                          ) : (
                            <CircleOutlined />
                          )}
                        </IconButton>
                      )}
                      sx={{
                        "& .MuiStepLabel-iconContainer": { padding: 0 },
                      }}
                    />
                  </Step>
                ))}
              </Stepper>
              <Typography
                variant="h6"
                align="center"
                style={{
                  textTransform: "uppercase",
                  color: theme.palette.primary.main,
                }}
              >
                {`Ingresa ${steps[activeStep]}`}
              </Typography>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            {activeStep === 2 ? (
              <Horoscope
                dataHoroscope={dataZodiacSign?.horoscope}
                isLoadingZodiacSign={isLoadingZodiacSign}
                iconZodiacSign={iconZodiacSign}
                personalDetails={personalDetails}
                goToInicio={goToInicio}
                errorMessage={errorMessage}
              />
            ) : (
              <Box>
                {activeStep === 0 && (
                  <GenderSelection
                    gender={personalDetails.gender}
                    handleInputChange={handleInputChange}
                    handleNext={handleNext}
                  />
                )}
                {activeStep === 1 && (
                  <UserData
                    personalDetails={personalDetails}
                    handleInputChange={handleInputChange}
                    handleBack={handleBack}
                    handleApply={handleApply}
                    validateFields={validateFields}
                    errorMessageFields={errorMessageFields}
                  />
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
