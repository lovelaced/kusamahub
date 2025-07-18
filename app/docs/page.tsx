"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Book, FileText, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface DocFile {
  id: string
  title: string
  filename: string
  description?: string
}

const docFiles: DocFile[] = [
  {
    id: "about-kusama-asset-hub",
    title: "About Kusama Asset Hub",
    filename: "about-kusama-asset-hub.md",
    description: "Learn about Kusama Asset Hub, network details, and testing"
  },
  {
    id: "about-kusamahub-com",
    title: "About kusamahub.com",
    filename: "about-kusamahub-com.md",
    description: "Information about the KusamaHub platform"
  },
  {
    id: "canvas-game",
    title: "Canvas Game",
    filename: "canvas-game.md",
    description: "Interactive canvas gaming on Kusama"
  },
  {
    id: "raffle-game",
    title: "Raffle Game",
    filename: "raffle-game.md",
    description: "Daily raffle mechanics and participation"
  },
  {
    id: "why-something",
    title: "WHY SOMETHING",
    filename: "why-something.md",
    description: "The philosophy behind experimental dApps"
  },
  {
    id: "wallets",
    title: "Wallets",
    filename: "wallets.md",
    description: "Supported wallets and connection guides"
  }
]

export default function Documentation() {
  const [selectedDoc, setSelectedDoc] = useState<DocFile | null>(null)
  const [docContent, setDocContent] = useState<string>("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedDoc) {
      setLoading(true)
      fetch(`/docs/content/${selectedDoc.filename}`)
        .then(res => res.text())
        .then(text => {
          setDocContent(text)
          setLoading(false)
        })
        .catch(err => {
          console.error("Error loading doc:", err)
          setDocContent("Error loading documentation. Please try again.")
          setLoading(false)
        })
    }
  }, [selectedDoc])

  return (
    <div className="min-h-screen bg-midnight-void text-ghost-grey pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-toxic-slime mb-4">documentation</h1>
          <p className="text-soda-chrome font-vt323 text-lg mb-2">learn about kusama asset hub & kusamahub.com</p>
          <p className="text-ghost-grey font-vt323 text-sm">guides • tutorials • technical reference</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-midnight-void/80 border-soda-chrome/30 sticky top-24">
              <CardHeader>
                <CardTitle className="text-toxic-slime font-orbitron text-lg flex items-center">
                  <Book className="w-5 h-5 mr-2" />
                  docs menu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {docFiles.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`w-full text-left p-3 rounded transition-all duration-200 ${
                      selectedDoc?.id === doc.id
                        ? "bg-toxic-slime/20 text-toxic-slime border-l-4 border-toxic-slime"
                        : "text-ghost-grey hover:text-toxic-slime hover:bg-toxic-slime/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        <span className="font-vt323">{doc.title}</span>
                      </div>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedDoc ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                <Card className="bg-midnight-void/80 border-soda-chrome/30">
                  <CardHeader>
                    <CardTitle className="text-toxic-slime font-orbitron text-2xl mb-2">
                      {selectedDoc.title}
                    </CardTitle>
                    {selectedDoc.description && (
                      <p className="text-soda-chrome">{selectedDoc.description}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="animate-pulse text-toxic-slime">Loading documentation...</div>
                      </div>
                    ) : (
                      <div className="prose prose-invert max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({children}) => <h1 className="text-toxic-slime font-orbitron text-3xl mb-4 mt-6">{children}</h1>,
                            h2: ({children}) => <h2 className="text-aqua-glitch font-orbitron text-2xl mb-3 mt-5">{children}</h2>,
                            h3: ({children}) => <h3 className="text-laser-berry font-orbitron text-xl mb-2 mt-4">{children}</h3>,
                            p: ({children}) => <p className="text-ghost-grey mb-4 leading-relaxed">{children}</p>,
                            ul: ({children}) => <ul className="list-disc list-inside text-ghost-grey mb-4 space-y-1">{children}</ul>,
                            ol: ({children}) => <ol className="list-decimal list-inside text-ghost-grey mb-4 space-y-1">{children}</ol>,
                            li: ({children}) => <li className="text-ghost-grey">{children}</li>,
                            code: ({inline, children}) => inline 
                              ? <code className="bg-midnight-void px-2 py-1 rounded text-toxic-slime font-mono text-sm">{children}</code>
                              : <pre className="bg-midnight-void/50 border border-soda-chrome/30 rounded-lg p-4 overflow-x-auto mb-4">
                                  <code className="text-ghost-grey font-mono text-sm">{children}</code>
                                </pre>,
                            a: ({href, children}) => (
                              <a 
                                href={href} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-aqua-glitch hover:text-aqua-glitch/80 transition-colors inline-flex items-center"
                              >
                                {children}
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            ),
                            blockquote: ({children}) => (
                              <blockquote className="border-l-4 border-toxic-slime pl-4 italic text-soda-chrome my-4">
                                {children}
                              </blockquote>
                            ),
                            table: ({children}) => (
                              <div className="overflow-x-auto mb-4">
                                <table className="w-full border-collapse border border-soda-chrome/30">
                                  {children}
                                </table>
                              </div>
                            ),
                            th: ({children}) => (
                              <th className="border border-soda-chrome/30 px-4 py-2 bg-midnight-void/50 text-toxic-slime font-orbitron">
                                {children}
                              </th>
                            ),
                            td: ({children}) => (
                              <td className="border border-soda-chrome/30 px-4 py-2 text-ghost-grey">
                                {children}
                              </td>
                            ),
                          }}
                        >
                          {docContent}
                        </ReactMarkdown>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              /* Overview Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {docFiles.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className="bg-midnight-void/80 border-soda-chrome/30 hover:border-toxic-slime/50 transition-all duration-300 cursor-pointer h-full"
                      onClick={() => setSelectedDoc(doc)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-toxic-slime font-orbitron text-lg mb-2 flex items-center">
                              <FileText className="w-5 h-5 mr-2" />
                              {doc.title}
                            </CardTitle>
                            {doc.description && (
                              <p className="text-soda-chrome text-sm">{doc.description}</p>
                            )}
                          </div>
                          <ChevronRight className="w-5 h-5 text-soda-chrome" />
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <Card className="mt-8 bg-midnight-void/80 border-soda-chrome/30">
          <CardHeader>
            <CardTitle className="text-amber-crt font-orbitron">explore kusamahub</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <a
                href="/data-heist"
                className="flex items-center text-toxic-slime hover:text-toxic-slime/80 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                <span className="font-vt323">Data Heist v2</span>
              </a>
              <a
                href="/loot-tombola"
                className="flex items-center text-laser-berry hover:text-laser-berry/80 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                <span className="font-vt323">Loot Tombola</span>
              </a>
              <a
                href="/bingo"
                className="flex items-center text-aqua-glitch hover:text-aqua-glitch/80 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                <span className="font-vt323">Futarchy Markets</span>
              </a>
              <a
                href="/chaos-log"
                className="flex items-center text-amber-crt hover:text-amber-crt/80 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                <span className="font-vt323">Chaos Log</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}