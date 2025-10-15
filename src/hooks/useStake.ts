import { useCallback } from 'react';

const useStake = (pid: number) => {
  const handleStake = useCallback(
    async (amount: string) => {
      console.log(`Stubbed stake for PID: ${pid}, amount: ${amount}`);
      // Future: Use phantasma-sdk-ts for stake
    },
    [pid],
  );

  return { onStake: handleStake };
};

export default useStake;