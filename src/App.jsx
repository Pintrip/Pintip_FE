import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Landing from "./pages/Landing";
import Place_QuestSelect from "./pages/Place_QuestSelect";
import SectionCreate from "./pages/SectionCreate";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },

  {
    path: "/place-quest-select",
    Component: Place_QuestSelect,
  },

  {
    path: "/sectioncreate",
    Component: SectionCreate,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
