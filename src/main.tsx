import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { BrowserRouter } from "react-router";
import { RouteContext } from "./context/RouteContext.tsx";
import { appRoutes } from "./config/Routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <RouteContext.Provider value={appRoutes}>
          <ChakraProvider value={defaultSystem}>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </ChakraProvider>
        </RouteContext.Provider>
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>,
);
