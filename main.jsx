import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ListOfProject from "./listofproject";

const root = createRoot(document.getElementById("reactEntry"));

root.render(
    <StrictMode>
        <ListOfProject />
    </StrictMode>
);