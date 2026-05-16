import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Landing from "./pages/Landing";
import Place_QuestSelect from "./pages/Place_QuestSelect";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },

  {
    path: "/place-quest-select",
    Component: Place_QuestSelect,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
