import { BrowserRouter, Routes, Route } from "react-router-dom";
import Place_QuestSelect from "./page/Place_QuestSelect";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/place-quest-select" element={<Place_QuestSelect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
