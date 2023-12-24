import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Landing } from "./landing";
import { Ambalage } from "./modules/ambalage/routes/ambalage";
import { Rangement } from "./modules/rangement/pages/Rangement";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/emballage" element={<Ambalage />} />
        <Route path="/rangement" element={<Rangement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
