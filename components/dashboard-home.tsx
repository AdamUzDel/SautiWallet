"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, Send, Download, CreditCard, PiggyBank, ArrowRight, TrendingUp, ChevronRight } from "lucide-react"
import { VoiceAssistant } from "@/components/voice-assistant"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function DashboardHome() {
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false)

  const quickActions = [
    { name: "Send Money", icon: Send, color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400" },
    { name: "Receive", icon: Download, color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400" },
    {
      name: "Pay Bills",
      icon: CreditCard,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
    },
    { name: "Save", icon: PiggyBank, color: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400" },
  ]

  const recentTransactions = [
    {
      id: 1,
      name: "Sarah Nakato",
      amount: "50,000",
      type: "sent",
      date: "Today",
      time: "10:30 AM",
      category: "Family",
    },
    {
      id: 2,
      name: "MTN Mobile Money",
      amount: "100,000",
      type: "received",
      date: "Yesterday",
      time: "2:15 PM",
      category: "Deposit",
    },
    {
      id: 3,
      name: "Umeme Ltd",
      amount: "75,000",
      type: "paid",
      date: "May 10",
      time: "9:45 AM",
      category: "Utilities",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Voice assistant overlay */}
      {showVoiceAssistant && <VoiceAssistant onClose={() => setShowVoiceAssistant(false)} />}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <Button
          onClick={() => setShowVoiceAssistant(true)}
          className="rounded-full sauti-gradient hover:opacity-90 transition-opacity"
        >
          <Mic className="h-4 w-4 mr-2" />
          Speak to Sauti
        </Button>
      </div>

      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
        {/* Balance cards */}
        <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glassmorphism overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 dark:text-gray-400">Wallet Balance</span>
                <div className="flex items-baseline mt-1">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">UGX 450,000</span>
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12%
                  </span>
                </div>
              </div>
              <div className="absolute top-0 right-0 h-full w-1/3 gold-gradient opacity-10 rounded-l-full transform translate-x-1/2"></div>
            </CardContent>
          </Card>

          <Card className="glassmorphism overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 dark:text-gray-400">Savings</span>
                <div className="flex items-baseline mt-1">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">UGX 250,000</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 h-full w-1/3 sauti-gradient opacity-10 rounded-l-full transform translate-x-1/2"></div>
            </CardContent>
          </Card>

          <Card className="glassmorphism overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 dark:text-gray-400">SACCO Group</span>
                <div className="flex items-baseline mt-1">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">UGX 1,200,000</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 h-full w-1/3 bg-purple-600 opacity-10 rounded-l-full transform translate-x-1/2"></div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick actions */}
        <motion.div variants={fadeIn}>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Card
                key={action.name}
                className="glassmorphism hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all"
              >
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className={`h-12 w-12 rounded-full ${action.color} flex items-center justify-center mb-3`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{action.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* AI Tips */}
        <motion.div variants={fadeIn}>
          <Card className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 flex items-start">
              <div className="h-10 w-10 rounded-full sauti-gradient flex items-center justify-center mr-4 flex-shrink-0">
                <Mic className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">Sauti AI Tip</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Hello John, you spent 50,000 UGX last week on airtime. Try bundling your data and calls to save up to
                  30%.
                </p>
                <Button variant="link" className="text-blue-600 dark:text-blue-400 p-0 h-auto mt-1 text-sm">
                  Show me how <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent transactions */}
        <motion.div variants={fadeIn}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Transactions</h2>
            <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <Card key={transaction.id} className="glassmorphism">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                        transaction.type === "sent"
                          ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                          : transaction.type === "received"
                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                      }`}
                    >
                      {transaction.type === "sent" && <Send className="h-5 w-5" />}
                      {transaction.type === "received" && <Download className="h-5 w-5" />}
                      {transaction.type === "paid" && <CreditCard className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{transaction.name}</p>
                        <p
                          className={`text-sm font-medium ${
                            transaction.type === "sent" || transaction.type === "paid"
                              ? "text-red-600 dark:text-red-400"
                              : "text-green-600 dark:text-green-400"
                          }`}
                        >
                          {transaction.type === "sent" || transaction.type === "paid" ? "-" : "+"} UGX{" "}
                          {transaction.amount}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {transaction.date} • {transaction.time}
                        </p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                          {transaction.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
