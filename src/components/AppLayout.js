import { Routes, Route } from "react-router-dom";
import { Inicio } from "./Inicio";
import { StepperForm } from "./StepperForm";

function AppLayout() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/horoscope/form" element={<StepperForm />} />
    </Routes>
  );
}

export default AppLayout;
