import { QrCode, Wallet, Zap } from 'lucide-react'
import { LicenseSection } from '@/components/license-section'
import { QrGenerator } from '@/components/qr-generator'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="size-4" aria-hidden="true" />
            </span>
            <span className="text-base font-semibold tracking-tight text-foreground">
              Crypto Quick Pay
            </span>
          </div>
          <a
            href="#license"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Get License
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        {/* Hero */}
        <section className="py-12 text-center sm:py-16">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="flex size-1.5 rounded-full bg-primary" />
            Peer-to-peer crypto payments, no middleman
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl">
            Accept crypto payments in seconds
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
            Generate a live, scannable QR code for USDC on Polygon, Litecoin, or
            Ethereum. Share it, get paid directly to your wallet, and sell
            digital licenses — all from one clean interface.
          </p>
        </section>

        {/* QR Generator */}
        <section aria-labelledby="generator-heading" className="scroll-mt-20">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <QrCode className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2
                  id="generator-heading"
                  className="text-xl font-semibold text-foreground"
                >
                  Crypto Payment QR Generator
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose a network, enter your wallet and amount, then share the
                  QR code to receive funds.
                </p>
              </div>
            </div>
            <QrGenerator />
          </div>
        </section>

        {/* License */}
        <section
          id="license"
          aria-labelledby="license-heading"
          className="scroll-mt-20 pt-14"
        >
          <div className="mb-6 flex items-start gap-3">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Wallet className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2
                id="license-heading"
                className="text-xl font-semibold text-foreground"
              >
                Commercial License &amp; Sales
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Buy the full source-code script and deploy your own Crypto Quick
                Pay instance.
              </p>
            </div>
          </div>
          <LicenseSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Crypto Quick Pay</p>
          <p className="text-xs">
            Always verify wallet addresses before sending funds.
          </p>
        </div>
      </footer>
    </div>
  )
}
