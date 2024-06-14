import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { StepperForm } from "../";

describe("StepperForm Test", () => {
  const TestComponent = () => (
    <MemoryRouter initialEntries={["/horoscope/form"]}>
      <StepperForm />
    </MemoryRouter>
  );

  test("should show error message when no gender is selected and IGRESAR is clicked", async () => {
    render(<TestComponent />);
    fireEvent.click(screen.getByRole("button", { name: /IGRESAR/i }));

    const errorMessage = await screen.findByText(
      "Por favor, seleccione un género."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("should show 'INGRESA TUS DATOS' when a gender is selected and IGRESAR is clicked", async () => {
    render(<TestComponent />);
    const genderButton = screen.getByLabelText(/female/i);
    fireEvent.click(genderButton);

    fireEvent.click(screen.getByRole("button", { name: /IGRESAR/i }));

    const nextStepText = await screen.findByText(/INGRESA TUS DATOS/i);
    expect(nextStepText).toBeInTheDocument();
  });

  test("should show an error message when you have not completed all the required fields when you click 'CONTINUE'", async () => {
    render(<TestComponent />);

    const genderButton = screen.getByLabelText(/female/i);
    fireEvent.click(genderButton);

    fireEvent.click(screen.getByRole("button", { name: /IGRESAR/i }));

    fireEvent.click(screen.getByRole("button", { name: /CONTINUAR/i }));

    const errorMessageName = await screen.findByText(
      /Por favor, ingrese su nombre./i
    );

    const errorMessageEmail = await screen.findByText(
      /Por favor, ingrese su email./i
    );

    const errorMessageDateOfBirth = await screen.findByText(
      /Por favor, ingrese su fecha de nacimiento./i
    );

    expect(errorMessageName).toBeInTheDocument();
    expect(errorMessageEmail).toBeInTheDocument();
    expect(errorMessageDateOfBirth).toBeInTheDocument();
    expect(screen.queryByText(/Tu Horóscopo/i)).not.toBeInTheDocument();
  });

  test("should show 'Tu Horóscopo' after completing all steps", async () => {
    render(<TestComponent />);

    const genderButton = screen.getByLabelText(/female/i);
    fireEvent.click(genderButton);

    fireEvent.click(screen.getByRole("button", { name: /IGRESAR/i }));

    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("dateOfBirth-input"), {
      target: { value: "2000-01-01" },
    });

    fireEvent.click(screen.getByRole("button", { name: /CONTINUAR/i }));

    const horoscopeText = await screen.findByText(/Tu Horóscopo/i);
    expect(horoscopeText).toBeInTheDocument();
  });
});
