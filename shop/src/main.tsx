import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./scss/index.scss";
import { worker } from "./mocks/browser";

if (import.meta.env) {
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>
);
