const getLiquidityUrlPathParts = ({ quoteTokenAdresses = {}, quoteTokenSymbol, tokenAddresses = {} }) => {
  const chainId = process.env.REACT_APP_CHAIN_ID || '1';
  const firstPart = quoteTokenSymbol === 'BNB' ? 'ETH' : quoteTokenAdresses?.[chainId] ?? 'SOUL';
  const secondPart = tokenAddresses?.[chainId] ?? 'KCAL';
  return `${firstPart}/${secondPart}`;
};

export default getLiquidityUrlPathParts;