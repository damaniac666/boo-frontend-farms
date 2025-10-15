import React from 'react';

export const RefreshContext = React.createContext({
  slowRefresh: 0,
  fastRefresh: 0,
});

const RefreshContextProvider: React.FC = ({ children }) => (
  <RefreshContext.Provider value={{ slowRefresh: 0, fastRefresh: 0 }}>
    {children}
  </RefreshContext.Provider>
);

export default RefreshContextProvider;