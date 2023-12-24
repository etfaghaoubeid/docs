import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "../landing";

export const AppRoutes = () => {
  <Routes>
    <Route path="/" element={<Landing />} />
  </Routes>;
};
