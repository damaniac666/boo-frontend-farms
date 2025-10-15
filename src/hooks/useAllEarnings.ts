import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import useRefresh from './useRefresh';
import { farmsConfig } from 'config/constants';

const useAllEarnings = () => {
  const [balances, setBalance] = useState<BigNumber[]>([]);
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    // Dummy balances (0 for each farm)
    const res = farmsConfig.map(() => new BigNumber(0));
    setBalance(res);
  }, [fastRefresh]);

  return balances;
};

export default useAllEarnings;