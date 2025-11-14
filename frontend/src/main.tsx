import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster 
      position="bottom-center"
        toastOptions={{
          style: {
            background: "#212529",
            color: "#fff",
            fontFamily: "font-primary",
            borderRadius: "20px"
          },
        }} />
    </QueryClientProvider>
  </React.StrictMode>
);
