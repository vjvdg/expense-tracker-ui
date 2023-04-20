import React, { useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { useApi } from './hooks/UseApi';
import metadataApi from './api/MetadataApi';
import "./App.css";
import LoginPage from "./components/login/LoginPage";
import Expense from "./components/expense/Expense";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const AppContext = React.createContext({});

function App() {
  const getMetadataApi = useApi(metadataApi.getMetadata);

  useEffect(() => {
    getMetadataApi.request();
  }, []);

  return getMetadataApi?.data && (
    <AppContext.Provider value={{ metadata: getMetadataApi?.data }}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Expense />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;