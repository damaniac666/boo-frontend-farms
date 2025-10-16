import BigNumber from 'bignumber.js'
import { fetchBooPrice } from 'utils/phantasmaApi'
import { calculateApyFromBooPerSecond } from 'utils/compoundApyHelpers'

import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const TOTAL_BOO_PER_SECOND = new BigNumber('0.3472222222') // 10 decimals

const farms: FarmConfig[] = [
   
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'SOUL-KCAL LP',
    allocPoints: 500,
    depositFeeBP: 0,
    lpAddresses: {
      97: '',
      56: 'S3d8omDir3j7kUBFU7e2j1d3jhE7hZcmPZ6A2wsmomhwz6r', // SATRN NFT ADDRESS
    },
    tokenSymbol: 'SOUL',
    tokenAddresses: {
      97: '',
      56: 'S3...SOMETHING', // BOO Placeholder 
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    image: 'soul-kcal', // ✅ explicitly define the image name,
    type: 'nft',
    isTokenOnly: false
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'BOO-KCAL LP',
    allocPoints: 800,
    depositFeeBP: 0,
    lpAddresses: {
      97: '',
      56: 'S3d8omDir3j7kUBFU7e2j1d3jhE7hZcmPZ6A2wsmomhwz6r', // SATRN NFT ADDRESS
    },
    tokenSymbol: QuoteToken.BOO,
    tokenAddresses: {
      97: '',
      56: 'S3...SOMETHING', // BOO Placeholder
    },
    quoteTokenSymbol: QuoteToken.KCAL,
    quoteTokenAdresses: contracts.busd,
    image: 'boo-kcal', // ✅ explicitly define the image name,
    type: 'nft',
    isTokenOnly: false
  },
  {
    pid: 2,
    risk: 5,
    lpSymbol: 'BOO-SOUL LP',
    allocPoints: 300,
    depositFeeBP: 0,
    lpAddresses: {
      97: '',
      56: 'S3d8omDir3j7kUBFU7e2j1d3jhE7hZcmPZ6A2wsmomhwz6r', // SATRN NFT ADDRESS
    },
    tokenSymbol: 'BOO',
    tokenAddresses: {
      97: '',
      56: 'S3...SOMETHING', // BOO Placeholder
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    image: 'boo-soul', // ✅ explicitly define the image name,
    type: 'nft',
    isTokenOnly: false
  },
  {
    pid: 3,
    risk: 5,
    lpSymbol: 'KCAL',
    allocPoints: 200,
    depositFeeBP: 200,
    lpAddresses: {
      97: '',
      56: 'S3dP6LRC3f3xw4ZZ2HH9BQHzYNHuHS8vetbCQpkMFvRmVEF',
    },
    tokenSymbol: 'KCAL',
    tokenAddresses: {
      97: '',
      56: 'S3dP6LRC3f3xw4ZZ2HH9BQHzYNHuHS8vetbCQpkMFvRmVEF', // BOO Placeholder
    },
    quoteTokenSymbol: QuoteToken.KCAL,
    quoteTokenAdresses: contracts.busd,
    image: 'kcal', // ✅ explicitly define the image name,
    type: 'stake',
    isTokenOnly: true
  },
  {
    pid: 4,
    risk: 5,
    lpSymbol: 'BOO',
    allocPoints: 200,
    depositFeeBP: 200,
    lpAddresses: {
      97: '',
      56: 'S3...SOMETHING', // BOO Placeholder
    },
    tokenSymbol: 'BOO',
    tokenAddresses: {
      97: '',
      56: 'S3...SOMETHING', // BOO Placeholder
    },
    quoteTokenSymbol: QuoteToken.BOO,
    quoteTokenAdresses: contracts.busd,
    image: 'boo', // ✅ explicitly define the image name,
    type: 'stake',
    isTokenOnly: true

  },
]

const BASE_ALLOC = 100
const TOTAL_ALLOC_POINTS = farms.reduce((sum, farm) => sum + farm.allocPoints, 0)

const getFarmsWithApy = async (): Promise<FarmConfig[]> => {
  const booPriceUsdRaw = await fetchBooPrice()
  const BOO_PRICE_USD = new BigNumber(booPriceUsdRaw)

  const farmsWithApy = farms.map((farm) => {
    const poolShare = new BigNumber(farm.allocPoints).div(TOTAL_ALLOC_POINTS)
    const farmBooPerSecond = TOTAL_BOO_PER_SECOND.times(poolShare)
    const poolValueUsd = new BigNumber(20000)

    const simulatedApy = calculateApyFromBooPerSecond({
      booPerSecond: farmBooPerSecond,
      booPriceUsd: BOO_PRICE_USD,
      poolValueUsd,
    })

    return {
      ...farm,
      multiplier: `${farm.allocPoints / BASE_ALLOC}X`,
      apy: simulatedApy,
    }
  })

  return farmsWithApy
}

export default getFarmsWithApy