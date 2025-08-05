// context/AppProvider.jsx
import React, { useState } from 'react';
import { AppContext} from '../context/ContextObject.js';

const AppProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AppContext.Provider value={{ modalOpen, setModalOpen }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
