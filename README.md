# 🥞 Pancake Frontend

This project is a fork of the 2021 BSC Pancakeswap v2 farms but converted for PhantasmaChain. All EVM connectivity has been removed and replaced with easyConnect for PhantasmaLink v4 Carbon connections using Ecto(web wallet) or Poltergeist (desktop wallet). 

Once smart contracts are re-enabled on chain I will publish the Tomb converted contracts based on the EVM versions of Masterchef. This is based on the Goose Finance model which was popular for a time and had functionality like fees on deposit. 

The Pancake DEX swap section has not been migrated due to the way Phantasma handles tokens. All DEX LP "deposits" are replaced by "check-ins" for holders of SATRN NFT's for the relevant pools. This essentially opts the holder into receiving rewards by adding their address to a storage list without physically depositing their NFT's in the Masterchef contract. Single staking tokens (in this farm BOO and KCAL) still deposit as normal from the users wallet into the contract address.

This is still a work in progress.