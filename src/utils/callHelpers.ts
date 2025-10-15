import BigNumber from 'bignumber.js';

export const approve = async (lpContract, masterChefContract, account) => {
  console.log(`Stubbed approve for account: ${account}`);
  // Future: Use phantasma-sdk-ts for approve
  return 'dummy-tx-hash';
};

export const stake = async (masterChefContract, pid, amount, account) => {
  console.log(`Stubbed stake for PID: ${pid}, amount: ${amount}, account: ${account}`);
  // Future: Use phantasma-sdk-ts for stake
  return 'dummy-tx-hash';
};

export const sousStake = async (sousChefContract, amount, account) => {
  console.log(`Stubbed sousStake for amount: ${amount}, account: ${account}`);
  // Future: Use phantasma-sdk-ts for sousStake
  return 'dummy-tx-hash';
};

export const sousStakeBnb = async (sousChefContract, amount, account) => {
  console.log(`Stubbed sousStakeBnb for amount: ${amount}, account: ${account}`);
  // Future: Use phantasma-sdk-ts for sousStakeBnb
  return 'dummy-tx-hash';
};

export const unstake = async (masterChefContract, pid, amount, account) => {
  console.log(`Stubbed unstake for PID: ${pid}, amount: ${amount}, account: ${account}`);
  // Future: Use phantasma-sdk-ts for unstake
  return 'dummy-tx-hash';
};

export const sousUnstake = async (sousChefContract, amount, account) => {
  console.log(`Stubbed sousUnstake for amount: ${amount}, account: ${account}`);
  // Future: Use phantasma-sdk-ts for sousUnstake
  return 'dummy-tx-hash';
};

export const sousEmegencyUnstake = async (sousChefContract, amount, account) => {
  console.log(`Stubbed sousEmegencyUnstake for amount: ${amount}, account: ${account}`);
  // Future: Use phantasma-sdk-ts for emergency unstake
  return 'dummy-tx-hash';
};

export const harvest = async (masterChefContract, pid, account) => {
  console.log(`Stubbed harvest for PID: ${pid}, account: ${account}`);
  // Future: Use phantasma-sdk-ts for harvest
  return 'dummy-tx-hash';
};

export const soushHarvest = async (sousChefContract, account) => {
  console.log(`Stubbed soushHarvest for account: ${account}`);
  // Future: Use phantasma-sdk-ts for harvest
  return 'dummy-tx-hash';
};

export const soushHarvestBnb = async (sousChefContract, account) => {
  console.log(`Stubbed soushHarvestBnb for account: ${account}`);
  // Future: Use phantasma-sdk-ts for harvest BNB
  return 'dummy-tx-hash';
};