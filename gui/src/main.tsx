import { render } from "preact";
import "./styles.css";
import { SnackbarProvider } from "notistack";
import { StrictMode } from "preact/compat";
import { App } from "./app.tsx";

render(
  <StrictMode>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </StrictMode>,
  document.getElementById("root")!
);
