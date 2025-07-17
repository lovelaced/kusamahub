"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-midnight-void text-ghost-grey font-inter flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Glitchy 404 */}
        <motion.div
          className="mb-8"
          animate={{
            textShadow: ["0 0 5px #b6ff00", "0 0 20px #b6ff00, 0 0 30px #ff006e", "0 0 5px #b6ff00"],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <h1 className="text-8xl font-orbitron font-black text-toxic-slime mb-4">404</h1>
        </motion.div>

        {/* Error Icon */}
        <motion.div
          className="mb-6"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <AlertTriangle className="w-16 h-16 text-laser-berry mx-auto" />
        </motion.div>

        {/* Error Message */}
        <h2 className="text-2xl font-orbitron font-bold text-laser-berry mb-4">Page Not Found</h2>
        <p className="text-soda-chrome mb-8 font-vt323">
          This page has been consumed by the void.
          <br />
          Perhaps it never existed at all...
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-bold">
              <Home className="w-4 h-4 mr-2" />
              Return to Hub
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-laser-berry text-laser-berry hover:bg-laser-berry/10 bg-transparent"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Glitch Effect */}
        <motion.div
          className="mt-8 text-xs font-vt323 text-soda-chrome/50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          ERROR_CODE: VOID_CONSUMED_REALITY
        </motion.div>
      </div>
    </div>
  )
}
