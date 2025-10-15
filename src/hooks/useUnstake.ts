import { useCallback } from 'react';

const useUnstake = (pid: number) => {
  const handleUnstake = useCallback(
    async (amount: string) => {
      console.log(`Stubbed unstake for PID: ${pid}, amount: ${amount}`);
      // Future: Use phantasma-sdk-ts for unstake
    },
    [pid],
  );

  return { onUnstake: handleUnstake };
};

export default useUnstake;