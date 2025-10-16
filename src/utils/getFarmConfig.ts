import { farmsConfig } from 'config/constants'
import { FarmConfig } from 'config/constants/types'

const getFarmConfig = async (pid: number): Promise<FarmConfig | undefined> => {
  const farms = await farmsConfig()
  return farms.find((f) => f.pid === pid)
}

export default getFarmConfig