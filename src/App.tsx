import React from "react";
import { Route, Routes } from "react-router-dom";
import { ImportListTemplate } from "./components/template/ImportList-Template";
import ImporterTemplate from "./components/template/importer";
import FormationFiledTemplate from "./components/template/formation-filed";
import RosterDetailTemplate from "./components/template/roster-detail-template";
import { RosterPlayer } from "./components/template/roster-player";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ImportListTemplate />} />
        <Route path="/importer" element={<ImporterTemplate />} />
        <Route path="/roster-player/:id" element={<RosterPlayer/>} />
      </Routes>
    </div>
  );
};

export default App;
