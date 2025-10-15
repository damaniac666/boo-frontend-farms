import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ResetCSS } from '@pancakeswap-libs/uikit';
import BigNumber from 'bignumber.js';
import GlobalStyle from './style/Global';
import Menu from './components/Menu';
import PageLoader from './components/PageLoader';
import { WalletProvider } from './utils/walletContext';
import { ThemeContextProvider } from './contexts/ThemeContext';

const Home = lazy(() => import('./views/Home'));
const Farms = lazy(() => import('./views/Farms'));
const Burn = lazy(() => import('./views/Burn'));

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const App: React.FC = () => {
  return (
    <WalletProvider>
      <ThemeContextProvider>
        <Router>
          <ResetCSS />
          <GlobalStyle />
          <Menu>
            <Suspense fallback={<PageLoader />}>
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/farms">
                  <Farms />
                </Route>
                <Route path="/burn">
                  <Burn />
                </Route>
                <Route path="*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </Suspense>
          </Menu>
        </Router>
      </ThemeContextProvider>
    </WalletProvider>
  );
};

export default React.memo(App);