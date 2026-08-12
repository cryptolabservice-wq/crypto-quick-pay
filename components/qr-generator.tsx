'use client'

import { QRCodeSVG } from 'qrcode.react'
import { useMemo, useState } from 'react'
import { CopyButton } from '@/components/copy-button'
import {
  buildPaymentUri,
  NETWORK_LIST,
  NETWORKS,
  type NetworkId,
} from '@/lib/crypto'
import { cn } from '@/lib/utils'

export function QrGenerator() {
  const [network, setNetwork] = useState<NetworkId>('usdc-polygon')
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')

  const config = NETWORKS[network]

  const amountError =
    amount.trim() !== '' && !/^\d*\.?\d*$/.test(amount.trim())
      ? 'Enter a valid number.'
      : amount.trim() !== '' && Number(amount) < 0
        ? 'Amount cannot be negative.'
        : null

  const uri = useMemo(
    () => (amountError ? '' : buildPaymentUri(network, address, amount)),
    [network, address, amount, amountError],
  )

  const hasQr = uri.length > 0

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:gap-10">
      {/* Inputs */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Network</label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {NETWORK_LIST.map((n) => {
              const active = n.id === network
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setNetwork(n.id)}
                  aria-pressed={active}
                  className={cn(
                    'rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    active
                      ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                      : 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary',
                  )}
                >
                  <span className="block">{n.label}</span>
                  <span
                    className={cn(
                      'text-xs font-normal',
                      active
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground',
                    )}
                  >
                    {n.symbol}
                  </span>
                </button>
              )
            })}
          </div>
          <p className="text-xs text-muted-foreground">{config.hint}</p>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="wallet-address"
            className="text-sm font-medium text-foreground"
          >
            Wallet address
          </label>
          <input
            id="wallet-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={`Recipient ${config.symbol} address`}
            spellCheck={false}
            autoComplete="off"
            className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 font-mono text-sm text-foreground shadow-sm transition-colors placeholder:font-sans placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="amount"
            className="text-sm font-medium text-foreground"
          >
            Amount{' '}
            <span className="font-normal text-muted-foreground">
              ({config.symbol}, optional)
            </span>
          </label>
          <div className="relative">
            <input
              id="amount"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              aria-invalid={amountError ? true : undefined}
              className={cn(
                'w-full rounded-lg border bg-card px-3.5 py-2.5 pr-16 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2',
                amountError
                  ? 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30'
                  : 'border-input focus-visible:border-primary focus-visible:ring-ring',
              )}
            />
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
              {config.symbol}
            </span>
          </div>
          {amountError ? (
            <p className="text-xs text-destructive" role="alert">
              {amountError}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Leave blank to generate an address-only QR code.
            </p>
          )}
        </div>
      </div>

      {/* QR output */}
      <div className="flex w-full flex-col items-center gap-4 rounded-xl border border-border bg-secondary/50 p-6 lg:w-[280px]">
        <div className="flex size-[220px] items-center justify-center rounded-lg border border-border bg-card p-4">
          {hasQr ? (
            <QRCodeSVG
              value={uri}
              size={188}
              level="M"
              marginSize={0}
              bgColor="#ffffff"
              fgColor="#1c2a45"
              title="Payment QR code"
            />
          ) : (
            <p className="px-4 text-center text-sm text-muted-foreground text-balance">
              Enter a wallet address to generate a scannable QR code.
            </p>
          )}
        </div>

        <div className="w-full">
          <p className="mb-1 text-xs font-medium text-muted-foreground">
            Payment link
          </p>
          <p className="mb-3 max-h-16 overflow-y-auto break-all rounded-md bg-card px-2.5 py-2 font-mono text-xs text-foreground">
            {hasQr ? uri : '—'}
          </p>
          <CopyButton
            value={uri}
            label="Copy payment link"
            disabled={!hasQr}
            className="w-full justify-center"
          />
        </div>
      </div>
    </div>
  )
}
