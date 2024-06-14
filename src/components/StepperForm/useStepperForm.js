import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { getZodiacSign } from "../../utils/date";

export const useStepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [iconZodiacSign, setIconZodiacSign] = useState("");
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    gender: "",
  });
  const [errorMessageFields, setErrorMessageFields] = useState(
    personalDetails.name,
    personalDetails.email,
    personalDetails.dateOfBirth
  );
  const [fetchOption, setFetchOption] = useState({
    useInitialFetch: false,
    preventInitialFetch: true,
  });

  const ENDPOINT = "/";
  const {
    data: dataZodiacSign,
    isLoading: isLoadingZodiacSign,
    makeRequest,
    setData: setDataZodiacSign,
    errorMessage,
  } = useFetch(ENDPOINT, fetchOption);

  useEffect(() => {
    if (fetchOption?.method === "post" && !fetchOption.preventInitialFetch)
      makeRequest()
        .then(() => {
          setFetchOption({
            useInitialFetch: false,
            preventInitialFetch: true,
          });
        })
        .catch((error) => console.error(error));
  }, [fetchOption]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setDataZodiacSign(undefined);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleApply = () => {
    const zodiacSign = getZodiacSign(personalDetails.dateOfBirth);
    setIconZodiacSign(`/assets/boton_${zodiacSign}.png`);
    const body = {
      date: personalDetails.dateOfBirth,
      lang: "es",
      sign: zodiacSign,
    };

    setFetchOption((prev) => ({
      ...prev,
      preventInitialFetch: false,
      method: "post",
      data: body,
    }));
    handleNext();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setErrorMessageFields((prevErrorMessageFields) => ({
      ...prevErrorMessageFields,
      [name]: "",
    }));

    setPersonalDetails({
      ...personalDetails,
      [name]: value,
    });
  };

  const validateFields = () => {
    let isValid = true;
    const newErrorMessage = {
      name: "",
      email: "",
      dateOfBirth: "",
    };

    if (!personalDetails.name) {
      newErrorMessage.name = "Por favor, ingrese su nombre.";
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!personalDetails.email) {
      newErrorMessage.email = "Por favor, ingrese su email.";
      isValid = false;
    } else if (!emailPattern.test(personalDetails.email)) {
      newErrorMessage.email = "Por favor, ingrese un email válido.";
      isValid = false;
    }

    if (!personalDetails.dateOfBirth) {
      newErrorMessage.dateOfBirth =
        "Por favor, ingrese su fecha de nacimiento.";
      isValid = false;
    } else {
      const birthDate = new Date(personalDetails.dateOfBirth);
      const currentDate = new Date();
      if (isNaN(birthDate.getTime())) {
        newErrorMessage.dateOfBirth = "Por favor, ingrese una fecha válida.";
        isValid = false;
      } else if (birthDate >= currentDate) {
        newErrorMessage.dateOfBirth =
          "La fecha de nacimiento no puede ser una fecha futura.";
        isValid = false;
      }
    }

    setErrorMessageFields(newErrorMessage);
    return isValid;
  };

  return {
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
  };
};
