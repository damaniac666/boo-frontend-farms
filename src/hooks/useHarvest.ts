import { useCallback } from 'react';

export const useHarvest = (pid: number) => {
  const handleHarvest = useCallback(async () => {
    console.log(`Stubbed harvest for PID: ${pid}`);
    // Future: Use phantasma-sdk-ts for harvest
    return 'dummy-tx-hash';
  }, [pid]);

  return { onReward: handleHarvest };
};

export const useAllHarvest = (pids: number[]) => {
  const handleAllHarvest = useCallback(async () => {
    console.log(`Stubbed all harvest for PIDs: ${pids.join(', ')}`);
    // Future: Use phantasma-sdk-ts for all harvest
    return 'dummy-tx-hash';
  }, [pids]);

  return { onReward: handleAllHarvest };
};

export default useHarvest;