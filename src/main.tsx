import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);


// import React from "react"; 
// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// import { UserProvider } from "@/contexts/UserContext";

// createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <UserProvider>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </UserProvider>
//   </React.StrictMode>
// );

