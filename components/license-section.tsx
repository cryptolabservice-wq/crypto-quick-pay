'use client'

import {
  BadgeCheck,
  CheckCircle2,
  Download,
  FileCode2,
  Lock,
  ShieldCheck,
} from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'
import { CopyButton } from '@/components/copy-button'
import { LICENSE } from '@/lib/crypto'

const INCLUDED = [
  'Complete Next.js source code (TypeScript)',
  'Crypto QR generator + license storefront',
  'Royalty-free commercial license — resell & deploy',
  'Self-host anywhere: Vercel, Docker, or your own server',
]

export function LicenseSection() {
  const [txId, setTxId] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const ltcUri = `litecoin:${LICENSE.ltcAddress}`

  function handleConfirm() {
    if (txId.trim().length < 8) {
      setError('Paste your Litecoin transaction ID to confirm your payment.')
      return
    }
    setError(null)
    setUnlocked(true)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="grid md:grid-cols-2">
        {/* Product details */}
        <div className="flex flex-col gap-6 border-b border-border p-6 sm:p-8 md:border-b-0 md:border-r">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <FileCode2 className="size-3.5" aria-hidden="true" />
              Full Source Code
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-foreground text-balance">
              Get the Full Commercial License
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Own the complete Crypto Quick Pay script. Deploy it independently,
              customize it, and use it for your own commercial products.
            </p>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight text-foreground">
              ${LICENSE.priceUsd}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              USD · one-time
            </span>
          </div>

          <ul className="flex flex-col gap-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center gap-2 rounded-lg bg-secondary/60 p-3 text-xs text-muted-foreground">
            <ShieldCheck
              className="size-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span>
              Pay directly on-chain — no middleman, no account required.
            </span>
          </div>
        </div>

        {/* Payment / unlock flow */}
        <div className="flex flex-col gap-5 p-6 sm:p-8">
          {!unlocked ? (
            <>
              <div>
                <h4 className="text-base font-semibold text-foreground">
                  Pay ${LICENSE.priceUsd} in Litecoin (LTC)
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Send the equivalent of ${LICENSE.priceUsd} USD to the address
                  below, then confirm with your transaction ID to unlock the
                  download.
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-secondary/40 p-5 sm:flex-row sm:items-start">
                <div className="flex size-[124px] shrink-0 items-center justify-center rounded-lg border border-border bg-card p-2.5">
                  <QRCodeSVG
                    value={ltcUri}
                    size={104}
                    level="M"
                    marginSize={0}
                    bgColor="#ffffff"
                    fgColor="#1c2a45"
                    title="Litecoin payment address QR code"
                  />
                </div>
                <div className="w-full min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">
                    Litecoin receiving address
                  </p>
                  <p className="mt-1 break-all rounded-md bg-card px-2.5 py-2 font-mono text-xs text-foreground">
                    {LICENSE.ltcAddress}
                  </p>
                  <CopyButton
                    value={LICENSE.ltcAddress}
                    label="Copy LTC address"
                    className="mt-2 w-full justify-center"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="tx-id"
                  className="text-sm font-medium text-foreground"
                >
                  Confirm your payment
                </label>
                <input
                  id="tx-id"
                  value={txId}
                  onChange={(e) => {
                    setTxId(e.target.value)
                    if (error) setError(null)
                  }}
                  placeholder="Paste your Litecoin transaction ID"
                  spellCheck={false}
                  autoComplete="off"
                  aria-invalid={error ? true : undefined}
                  className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 font-mono text-sm text-foreground shadow-sm transition-colors placeholder:font-sans placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive"
                />
                {error && (
                  <p className="text-xs text-destructive" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                >
                  <BadgeCheck className="size-4" aria-hidden="true" />
                  Confirm payment & unlock download
                </button>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="size-3" aria-hidden="true" />
                  Download unlocks after your transaction is confirmed.
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 py-4 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="size-8 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  Payment confirmed — thank you!
                </h4>
                <p className="mt-1 text-sm text-muted-foreground text-balance">
                  Your commercial license is now active. Download the complete
                  source package below.
                </p>
              </div>
              <a
                href={LICENSE.downloadPath}
                download={LICENSE.downloadName}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                <Download className="size-4" aria-hidden="true" />
                Download source (.zip)
              </a>
              <button
                type="button"
                onClick={() => {
                  setUnlocked(false)
                  setTxId('')
                }}
                className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Make another purchase
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
