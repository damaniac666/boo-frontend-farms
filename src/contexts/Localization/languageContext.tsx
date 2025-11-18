import React from 'react';

export const LanguageContext = React.createContext({
  selectedLanguage: { code: 'en' },
  setSelectedLanguage: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});

const LanguageContextProvider: React.FC = ({ children }) => (
  <LanguageContext.Provider value={{ selectedLanguage: { code: 'en' }, setSelectedLanguage: () => {} /* eslint-disable-line @typescript-eslint/no-empty-function */ }}>
    {children}
  </LanguageContext.Provider>
);

export default LanguageContextProvider;