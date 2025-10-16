import BigNumber from 'bignumber.js'

const roundToTwoDp = (number: number): number => Math.round(number * 100) / 100

export function calculateBooEarnedPerThousandDollars({
  numberOfDays,
  farmApy,
  booPrice,
}: {
  numberOfDays: number
  farmApy: number
  booPrice: number
}): number {
  if (!farmApy || !booPrice || farmApy <= 0 || booPrice <= 0) return 0

  const principal = 1000 / booPrice
  const aprDecimal = farmApy / 100
  const earned = principal * aprDecimal * (numberOfDays / 365)

  return earned
}


export const apyModalRoi = ({
  amountEarned,
  amountInvested,
}: {
  amountEarned: number
  amountInvested: number
}): string => {
  const percentage = (amountEarned / amountInvested) * 100
  return percentage.toFixed(2)
}

export const calculateApyFromBooPerSecond = ({
  booPerSecond,
  booPriceUsd,
  poolValueUsd,
}: {
  booPerSecond: BigNumber
  booPriceUsd: BigNumber
  poolValueUsd: BigNumber
}): BigNumber => {
  const secondsPerYear = new BigNumber(365 * 24 * 60 * 60)
  const yearlyBoo = booPerSecond.times(secondsPerYear)
  const yearlyRewardUsd = yearlyBoo.times(booPriceUsd)
  return yearlyRewardUsd.div(poolValueUsd).times(100)
}