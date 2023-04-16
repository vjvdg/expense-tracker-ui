import React, { useEffect } from "react";
import { useApi } from './hooks/UseApi';
import metadataApi from './api/MetadataApi';
import "./App.css";
import Expense from "./components/Expense";
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
      <div>
        <Expense />
      </div>
    </AppContext.Provider>
  );
}

export default App;