import starknet from 'starknet'

export const getParsedAddress = (address?: string): string | null => {
  if (!address) {
    return null
  }

  const parsedAddress = starknet.validateAndParseAddress(address)

  if (!parsedAddress) {
    return null
  }

  return parsedAddress.toLowerCase()
}
