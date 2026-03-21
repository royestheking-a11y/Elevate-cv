
  import { createRoot } from "react-dom/client";
  import App from "./app/App";
  import "./styles/index.css";
  import { GoogleOAuthProvider } from "@react-oauth/google";

  createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId="414957069308-21aj1u273g9huhb3angu30n72194vov6.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  );
  