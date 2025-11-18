import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import useRefresh from './useRefresh';
import { farmsConfig } from '../config/constants';

const useAllEarnings = () => {
  const [balances, setBalance] = useState<BigNumber[]>([]);
  const { fastRefresh } = useRefresh();

useEffect(() => {
  const fetchDummyBalances = async () => {
    const farms = await farmsConfig()
    const res = farms.map(() => new BigNumber(0))
    setBalance(res)
  }

  fetchDummyBalances()
}, [fastRefresh])

  return balances;
};

export default useAllEarnings;