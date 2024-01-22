import { Route, Routes } from "react-router-dom";

import { Ambalage } from "./ambalage";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Ambalage />} />
    </Routes>
  );
};
