import React, { createContext } from 'react';

export const BlockContext = createContext({ block: 0 });

const BlockContextProvider: React.FC = ({ children }) => {
  // Dummy block value (Phantasma doesn't use block numbers like EVM)
  const block = 0;

  // Future: Fetch Phantasma chain data if needed
  /*
  import { PhantasmaAPI } from 'phantasma-sdk-ts';
  useEffect(() => {
    const api = new PhantasmaAPI('https://mainnet.phantasma.io/rpc');
    // Fetch chain height or equivalent
  }, []);
  */

  return <BlockContext.Provider value={{ block }}>{children}</BlockContext.Provider>;
};

export default BlockContextProvider;