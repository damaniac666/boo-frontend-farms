import React, { useState, useContext, useEffect } from 'react';
import useTheme from '../../hooks/useTheme';
import { LanguageContext } from '../../contexts/Localization/languageContext';
import { allLanguages } from '../../config/Localization/languageCodes';
import { Menu as UikitMenu, Button } from '@pancakeswap-libs/uikit';
import { useWalletContext } from '../../utils/walletContext';
import { fetchBooPrice } from '../../utils/phantasmaApi';
import config from './config';

const Menu = (props) => {
  const { account, login, logout } = useWalletContext();
  const { isDark, toggleTheme } = useTheme();
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
  const [booPrice, setBooPrice] = useState<number>(0);

  useEffect(() => {
    fetchBooPrice()
      .then(setBooPrice)
      .catch((error) => {
        console.error('[Menu] Error fetching BOO price:', error);
      });
  }, []);

  return (
    <UikitMenu
      logo={<img src="/images/phantasma-logo.png" alt="Phantasma Logo" width={100} height={40} />}
      account={account ?? undefined}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || 'en'}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      priceLink="https://www.coingecko.com/en/coins/phantasma"
      cakePriceUsd={booPrice}
      links={config}
      profileLink={account ? `https://explorer.phantasma.info/en/address?id=${account}` : undefined}
      connectors={{}} // Disable EVM connectors
      walletButton={
        <Button
  onClick={() => (account ? logout() : login())}
  variant="primary"
>
  {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Phantasma Wallet'}
</Button>
      }
      {...props}
    />
  );
};

export default Menu;