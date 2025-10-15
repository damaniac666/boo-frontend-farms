import { EasyConnect } from 'phantasma-sdk-ts';
     import React, { createContext, useContext, useEffect, useState } from 'react';
     import { connectWallet, disconnectWallet, getWalletAddress, isWalletConnected, getEasyInstance } from './easyConnect';

     interface WalletContextType {
       account: string | null;
       connected: boolean;
       login: (provider?: 'ecto' | 'poltergeist' | 'auto') => Promise<void>;
       logout: () => void;
       easyConnect: EasyConnect;
     }

     const WalletContext = createContext<WalletContextType>({
       account: null,
       connected: false,
       login: async () => {
         throw new Error('WalletContext.login not initialized');
       },
       logout: () => {
         throw new Error('WalletContext.logout not initialized');
       },
       easyConnect: getEasyInstance(),
     });

     export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
       const [account, setAccount] = useState<string | null>(null);
       const [connected, setConnected] = useState(false);
       const easyConnect = getEasyInstance();

       useEffect(() => {
         const init = async () => {
           const isConnected = await isWalletConnected();
           setConnected(isConnected);
           if (isConnected) {
             const address = await getWalletAddress();
             setAccount(address ?? null);
           }
         };
         init();

         const interval = setInterval(async () => {
           const isConnected = await isWalletConnected();
           const address = await getWalletAddress();
           if (isConnected !== connected || address !== account) {
             setConnected(isConnected);
             setAccount(address ?? null);
           }
         }, 10000);

         return () => clearInterval(interval);
       }, [account, connected]);

       const login = async (provider: 'ecto' | 'poltergeist' | 'auto' = 'auto') => {
         const success = await connectWallet(provider);
         setConnected(success);
         if (success) {
           const address = await getWalletAddress();
           setAccount(address ?? null);
         } else {
           console.error(`[WalletContext] Connection failed. Install ${provider} wallet.`);
         }
       };

       const logout = () => {
         disconnectWallet();
         setConnected(false);
         setAccount(null);
       };

       return (
         <WalletContext.Provider value={{ account, connected, login, logout, easyConnect }}>
           {children}
         </WalletContext.Provider>
       );
     };

     export const useWalletContext = () => useContext(WalletContext);