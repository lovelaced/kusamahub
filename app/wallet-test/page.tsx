"use client"

import { useExtension } from "@/contexts/extension-context"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function WalletTestPage() {
  const { extensions, selectedExtension, accounts } = useExtension()

  return (
    <div className="min-h-screen bg-midnight-void text-ghost-grey pt-20 px-4">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-4xl font-orbitron font-black text-toxic-slime mb-8">
          wallet connection test
        </h1>

        <div className="space-y-6">
          {/* Extension Status */}
          <Card className="bg-midnight-void border-2 border-toxic-slime/50 p-6">
            <h2 className="text-xl font-orbitron font-bold text-ghost-grey mb-4">
              extension status
            </h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-vt323 text-soda-chrome">extensions detected:</span>
                <Badge variant="outline" className="border-aqua-glitch text-aqua-glitch">
                  {extensions.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-vt323 text-soda-chrome">selected extension:</span>
                <span className="font-vt323 text-ghost-grey">
                  {selectedExtension || "none"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-vt323 text-soda-chrome">accounts connected:</span>
                <Badge variant="outline" className="border-toxic-slime text-toxic-slime">
                  {accounts.length}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Connected Accounts */}
          {accounts.length > 0 && (
            <Card className="bg-midnight-void border-2 border-toxic-slime/50 p-6">
              <h2 className="text-xl font-orbitron font-bold text-ghost-grey mb-4">
                connected accounts
              </h2>
              <div className="space-y-3">
                {accounts.map((account, index) => (
                  <div
                    key={account.address}
                    className="bg-midnight-void/50 border border-soda-chrome/30 rounded p-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-vt323 text-ghost-grey">
                          {account.name || `Account ${index + 1}`}
                        </div>
                        <div className="font-vt323 text-xs text-soda-chrome/70 mt-1">
                          {account.address}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-toxic-slime/50 text-toxic-slime/50"
                      >
                        #{index + 1}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Instructions */}
          <Card className="bg-midnight-void border-2 border-amber-crt/50 p-6">
            <h2 className="text-xl font-orbitron font-bold text-amber-crt mb-4">
              test instructions
            </h2>
            <ol className="list-decimal list-inside space-y-2 font-vt323 text-soda-chrome">
              <li>Click the "jack in" button in the top navigation</li>
              <li>Select your wallet extension if prompted</li>
              <li>Approve the connection request in your wallet</li>
              <li>Your connected accounts will appear above</li>
              <li>Click on your account in the nav to see more options</li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  )
}