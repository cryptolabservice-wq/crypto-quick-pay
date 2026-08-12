export type NetworkId = 'usdc-polygon' | 'litecoin' | 'ethereum'

export interface NetworkConfig {
  id: NetworkId
  label: string
  symbol: string
  /** Decimals used to convert a human amount into base units */
  decimals: number
  /** Short helper text shown under the selector */
  hint: string
}

export const NETWORKS: Record<NetworkId, NetworkConfig> = {
  'usdc-polygon': {
    id: 'usdc-polygon',
    label: 'USDC on Polygon',
    symbol: 'USDC',
    decimals: 6,
    hint: 'ERC-20 transfer on the Polygon network (chain 137).',
  },
  litecoin: {
    id: 'litecoin',
    label: 'Litecoin',
    symbol: 'LTC',
    decimals: 8,
    hint: 'Native Litecoin payment (BIP-21 URI).',
  },
  ethereum: {
    id: 'ethereum',
    label: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    hint: 'Native ETH transfer on Ethereum mainnet (EIP-681 URI).',
  },
}

export const NETWORK_LIST = Object.values(NETWORKS)

// USDC (native) contract on Polygon
const USDC_POLYGON_CONTRACT = '0x3c499c542cEF5E3811e1192ce70d8cc03d5c3359'

/**
 * Convert a decimal string amount (e.g. "1.25") into an integer base-unit
 * string (e.g. wei) without floating point rounding errors.
 */
export function toBaseUnits(amount: string, decimals: number): string | null {
  if (!amount) return null
  const cleaned = amount.trim()
  if (!/^\d*\.?\d*$/.test(cleaned) || cleaned === '.' || cleaned === '') {
    return null
  }
  const [wholeRaw, fractionRaw = ''] = cleaned.split('.')
  const whole = wholeRaw || '0'
  const fraction = fractionRaw.slice(0, decimals).padEnd(decimals, '0')
  const combined = `${whole}${fraction}`.replace(/^0+(?=\d)/, '')
  try {
    return BigInt(combined).toString()
  } catch {
    return null
  }
}

/**
 * Build a wallet-scannable payment URI for the given network.
 * Returns the raw address when no valid amount is provided so the QR is
 * still useful for a plain address scan.
 */
export function buildPaymentUri(
  networkId: NetworkId,
  address: string,
  amount: string,
): string {
  const trimmedAddress = address.trim()
  if (!trimmedAddress) return ''

  const network = NETWORKS[networkId]
  const hasAmount = amount.trim() !== '' && Number(amount) > 0

  switch (networkId) {
    case 'litecoin': {
      return hasAmount
        ? `litecoin:${trimmedAddress}?amount=${amount.trim()}`
        : `litecoin:${trimmedAddress}`
    }
    case 'ethereum': {
      const wei = hasAmount ? toBaseUnits(amount, network.decimals) : null
      return wei
        ? `ethereum:${trimmedAddress}@1?value=${wei}`
        : `ethereum:${trimmedAddress}@1`
    }
    case 'usdc-polygon': {
      const base = hasAmount ? toBaseUnits(amount, network.decimals) : null
      return base
        ? `ethereum:${USDC_POLYGON_CONTRACT}@137/transfer?address=${trimmedAddress}&uint256=${base}`
        : `ethereum:${USDC_POLYGON_CONTRACT}@137/transfer?address=${trimmedAddress}`
    }
    default:
      return trimmedAddress
  }
}

/** The commercial license price and receiving details. */
export const LICENSE = {
  priceUsd: 15,
  ltcAddress: 'LUdWjiuC3WGZJKcsEnUyWAfZkKy7tEbQ2f',
  downloadPath: '/crypto-quick-pay-source.zip',
  downloadName: 'crypto-quick-pay-source.zip',
} as const
