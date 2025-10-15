import   farmsConfig   from './farms'

const communityFarms = farmsConfig.filter((farm) => farm.isCommunity).map((farm) => farm.tokenSymbol)

export { farmsConfig, communityFarms }
