import { BrowserRouter , Routes , Route , Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { PessoasPage } from "./pages/PessoasPage";
import { TransacoesPage } from "./pages/TransacoesPage";
import { TotaisPage } from "./pages/TotaisPage";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Navigate to="/pessoas" replace />} />
          <Route path="pessoas" element={<PessoasPage />} />
          <Route path="transacoes" element={<TransacoesPage />} />
          <Route path="totais" element={<TotaisPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}