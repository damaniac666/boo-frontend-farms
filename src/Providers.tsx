import React from 'react';
import { Provider } from 'react-redux';
import { ModalProvider, light, dark } from '@pancakeswap-libs/uikit';
import { ThemeProvider } from 'styled-components';
import LanguageContextProvider from './contexts/Localization/languageContext';
import { ThemeContextProvider } from './contexts/ThemeContext'
import BlockContextProvider from './contexts/BlockContext';
import RefreshContextProvider from './contexts/RefreshContext';
import store from './state';
import useTheme from './hooks/useTheme'; // For global theme

const Providers: React.FC = ({ children }) => {
  const { isDark } = useTheme(); // Use the theme context for global theme

  return (
    <Provider store={store}>
      <ThemeProvider theme={isDark ? dark : light}>
        <ThemeContextProvider>
          <LanguageContextProvider>
            <BlockContextProvider>
              <RefreshContextProvider>
                <ModalProvider>{children}</ModalProvider>
              </RefreshContextProvider>
            </BlockContextProvider>
          </LanguageContextProvider>
        </ThemeContextProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;