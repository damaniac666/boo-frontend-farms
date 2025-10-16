import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import useRefresh from './useRefresh';
import { FarmConfig } from 'config/constants/types';
import { farmsConfig } from 'config/constants';

export interface FarmWithBalance extends FarmConfig {
  balance: BigNumber;
}

const useFarmsWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState<FarmWithBalance[]>([]);
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchFarms = async () => {
      const farms = await farmsConfig(); // ✅ resolve the promise
      const results = farms.map((farm) => ({
        ...farm,
        balance: new BigNumber(0),
      }));
      setFarmsWithBalances(results);
    };

    fetchFarms();
  }, [fastRefresh]);

  return farmsWithBalances;
};

export default useFarmsWithBalance;