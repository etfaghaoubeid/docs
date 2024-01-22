import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Landing } from "./landing";
import { Rangement } from "./modules/rangement/pages";
import { Emplacement } from "./modules/rangement/pages/Emplacement";
import { RangementList } from "./modules/rangement/pages/RangementList";
import { RangementProduit } from "./modules/rangement/pages/Rangement-produit";
import { Ambalage } from "./modules/ambalage/pages";
import { Affectation } from "./modules/affectation/pages";
import { Chariot } from "./modules/ambalage/pages/chariot";
import { ProductEmplacement } from "./modules/ambalage/pages/product-emplacement";
import { Reception } from "./modules/reception/pages";
import { ReceptionProductList } from "./modules/reception/pages/reception-product-list";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Login } from "./modules/auth/pages";
import { TraitementLitige } from "./modules/reception/pages/traitement-litige";
import { Entrepot } from "./modules/entrepot/pages";
import { EntrepotProductList } from "./modules/entrepot/pages/reception-product-list";
import { EtrepotTraitementLitige } from "./modules/entrepot/pages/traitement-litige";

function App() {
  return (
    <div className=" bg-neutral-50">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/traitement-litige/:productId/:toAddQuantity"
              element={<TraitementLitige />}
            />
            <Route
              path="/entrepot-traitement-litige/:productId/:toAddQuantity"
              element={<EtrepotTraitementLitige />}
            />
            <Route path="/" element={<Landing />} />
            <Route path="/rangementList" element={<RangementList />} />
            <Route
              path="/reception-product-list/:cdaId"
              element={<ReceptionProductList />}
            />
            <Route
              path="/entrepot-product-list/:cdaId"
              element={<EntrepotProductList />}
            />

            <Route path="/entrepot" element={<Entrepot />} />
            <Route path="/reception" element={<Reception />} />
            <Route path="/rangement-produit" element={<RangementProduit />} />
            <Route path="/rangement" element={<Rangement />} />
            <Route path="/emplacement" element={<Emplacement />} />
            <Route path="/emballage" element={<Ambalage />} />
            <Route path="/affectation" element={<Affectation />} />
            <Route path="/chariot" element={<Chariot />} />
            <Route
              path="/product-emplacement"
              element={<ProductEmplacement />}
            />
            <Route path="/*" element={<Landing />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
