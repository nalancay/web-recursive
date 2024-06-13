import { Box, Button, TextField, Typography, useTheme } from "@mui/material";

export const UserData = ({
  personalDetails,
  handleInputChange,
  handleBack,
  handleApply,
  validateFields,
  errorMessageFields,
}) => {
  const theme = useTheme();
  const handleNextClick = () => {
    if (validateFields()) {
      handleApply();
    }
  };

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
      noValidate
      autoComplete="off"
    >
      <Box display="flex" alignItems="center">
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.primary.main,
          }}
        >
          Nombre:
        </Typography>
        <TextField
          id="name"
          name="name"
          size="small"
          value={personalDetails.name}
          onChange={handleInputChange}
          error={!!errorMessageFields.name}
          helperText={errorMessageFields.name}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <Typography
          variant="h6"
          marginRight="20px"
          sx={{
            color: theme.palette.primary.main,
          }}
        >
          Email:
        </Typography>
        <TextField
          id="email"
          name="email"
          type="email"
          size="small"
          value={personalDetails.email}
          onChange={handleInputChange}
          error={!!errorMessageFields.email}
          helperText={errorMessageFields.email}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          "@media (max-width: 600px)": {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginRight: "20px",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            minWidth: "150px",
            flex: "0 0 auto",
            color: theme.palette.primary.main,
          }}
        >
          Fecha de Nacimiento:
        </Typography>
        <TextField
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={personalDetails.dateOfBirth}
          onChange={handleInputChange}
          error={!!errorMessageFields.dateOfBirth}
          helperText={errorMessageFields.dateOfBirth}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="20px"
        marginTop="40px"
      >
        <Button
          variant="contained"
          onClick={handleBack}
          size="medium"
          sx={{
            borderRadius: "14px",
            paddingLeft: "45px",
            paddingRight: "45px",
          }}
        >
          VOLVER
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={handleNextClick}
          size="medium"
          sx={{
            borderRadius: "14px",
            paddingLeft: "25px",
            paddingRight: "25px",
          }}
        >
          CONTINUAR
        </Button>
      </Box>
    </Box>
  );
};
