import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Inicio } from "../";

describe("Incio Test", () => {
  const TestComponent = () => (
    <MemoryRouter initialEntries={["/"]}>
      <Inicio />
    </MemoryRouter>
  );
  test("should show boton Ingresar", () => {
    render(<TestComponent />);
    expect(screen.getByText("IGRESAR")).toBeInTheDocument();
  });
});
