"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ChevronRight, Search, User, Mic, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Add this interface at the top of the file, after the imports
interface Contact {
  id: number | string
  name: string
  phone: string
  recent?: boolean
}

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

// Make sure the contacts array is properly typed:
const contacts: Contact[] = [
  { id: 1, name: "Sarah Nakato", phone: "+256 712 345 678", recent: true },
  { id: 2, name: "David Okello", phone: "+256 774 567 890", recent: true },
  { id: 3, name: "Mary Auma", phone: "+256 701 234 567", recent: true },
  { id: 4, name: "John Mukasa", phone: "+256 782 345 678", recent: false },
  { id: 5, name: "Grace Atim", phone: "+256 756 789 012", recent: false },
]

const recentAmounts = [{ amount: "5,000" }, { amount: "10,000" }, { amount: "20,000" }, { amount: "50,000" }]

export function SendMoneyFlow() {
  const [step, setStep] = useState(0)
  // Replace the useState<any>(null) with:
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContacts = contacts.filter(
    (contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.phone.includes(searchQuery),
  )

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleRecordNote = () => {
    setIsRecording(true)
    // Simulate recording
    setTimeout(() => {
      setIsRecording(false)
      setNote("For groceries and household items. Thanks!")
    }, 3000)
  }

  const handleSelectAmount = (selectedAmount: string) => {
    setAmount(selectedAmount)
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Send Money</h1>
        <p className="text-gray-600 dark:text-gray-300">Transfer funds to friends and family</p>
      </div>

      {step === 0 && (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeIn} className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search contacts or enter phone number"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {searchQuery && filteredContacts.length === 0 ? (
            <motion.div variants={fadeIn} className="text-center py-8">
              <div className="flex justify-center mb-4">
                <User className="h-12 w-12 text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">No contacts found</p>
              <Button
                // Update where you set the contact from search query:
                onClick={() => {
                  setSelectedContact({
                    id: "new",
                    name: searchQuery,
                    phone: searchQuery,
                  })
                  nextStep()
                }}
              >
                Send to {searchQuery}
              </Button>
            </motion.div>
          ) : (
            <>
              {filteredContacts.some((contact) => contact.recent) && (
                <motion.div variants={fadeIn} className="mb-6">
                  <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Recent</h2>
                  <div className="space-y-2">
                    {filteredContacts
                      .filter((contact) => contact.recent)
                      .map((contact) => (
                        <Card
                          key={contact.id}
                          className="glassmorphism hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all"
                          onClick={() => {
                            setSelectedContact(contact)
                            nextStep()
                          }}
                        >
                          <CardContent className="p-3 flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage
                                src={`/placeholder.svg?height=40&width=40&text=${contact.name.charAt(0)}`}
                                alt={contact.name}
                              />
                              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {contact.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{contact.phone}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </motion.div>
              )}

              {filteredContacts.some((contact) => !contact.recent) && (
                <motion.div variants={fadeIn}>
                  <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">All Contacts</h2>
                  <div className="space-y-2">
                    {filteredContacts
                      .filter((contact) => !contact.recent)
                      .map((contact) => (
                        <Card
                          key={contact.id}
                          className="glassmorphism hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all"
                          onClick={() => {
                            setSelectedContact(contact)
                            nextStep()
                          }}
                        >
                          <CardContent className="p-3 flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage
                                src={`/placeholder.svg?height=40&width=40&text=${contact.name.charAt(0)}`}
                                alt={contact.name}
                              />
                              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {contact.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{contact.phone}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      )}

      {step === 1 && (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeIn} className="mb-6">
            <Button variant="ghost" onClick={prevStep} className="mb-4 pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div className="flex items-center mb-6">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage
                  src={`/placeholder.svg?height=48&width=48&text=${selectedContact?.name?.charAt(0)}`}
                  alt={selectedContact?.name}
                />
                <AvatarFallback>{selectedContact?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedContact?.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">{selectedContact?.phone}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="mb-6">
            <Label htmlFor="amount" className="text-gray-700 dark:text-gray-300 mb-2 block">
              Amount (UGX)
            </Label>
            <Input
              id="amount"
              type="text"
              placeholder="Enter amount"
              className="text-lg font-bold"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {recentAmounts.map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={`rounded-full ${amount === item.amount ? "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700" : ""}`}
                  onClick={() => handleSelectAmount(item.amount)}
                >
                  {item.amount}
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="note" className="text-gray-700 dark:text-gray-300">
                Add a note (optional)
              </Label>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={handleRecordNote}>
                <Mic className={`h-4 w-4 ${isRecording ? "text-red-600 dark:text-red-400" : ""}`} />
                <span className="sr-only">Record note</span>
              </Button>
            </div>
            <Textarea
              id="note"
              placeholder="What's this payment for?"
              className="resize-none"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            {isRecording && <p className="text-xs text-red-600 dark:text-red-400 mt-1 animate-pulse">Recording...</p>}
          </motion.div>

          <motion.div variants={fadeIn}>
            <Button
              onClick={nextStep}
              disabled={!amount}
              className="w-full py-6 sauti-gradient hover:opacity-90 transition-opacity"
            >
              Continue <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeIn} className="mb-6">
            <Button variant="ghost" onClick={prevStep} className="mb-4 pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Confirm Transaction</h2>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="glassmorphism mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Sending</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">UGX {amount}</p>
                  <p className="text-gray-600 dark:text-gray-300">to</p>
                </div>

                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-16 w-16 mb-3">
                    <AvatarImage
                      src={`/placeholder.svg?height=64&width=64&text=${selectedContact?.name?.charAt(0)}`}
                      alt={selectedContact?.name}
                    />
                    <AvatarFallback>{selectedContact?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{selectedContact?.name}</p>
                  <p className="text-gray-600 dark:text-gray-300">{selectedContact?.phone}</p>
                </div>

                {note && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Note:</p>
                    <p className="text-gray-700 dark:text-gray-300">{note}</p>
                  </div>
                )}

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-600 dark:text-gray-300">Transaction fee</p>
                    <p className="text-gray-900 dark:text-white">UGX 500</p>
                  </div>
                  <div className="flex justify-between font-medium">
                    <p className="text-gray-600 dark:text-gray-300">Total amount</p>
                    <p className="text-gray-900 dark:text-white">
                      UGX {Number.parseInt(amount.replace(/,/g, "")) + 500}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn} className="mb-6">
            <Label htmlFor="pin" className="text-gray-700 dark:text-gray-300 mb-2 block">
              Enter your PIN to confirm
            </Label>
            <Input
              id="pin"
              type="password"
              placeholder="Enter 4-digit PIN"
              className="text-center text-lg tracking-widest"
              maxLength={4}
            />
          </motion.div>

          <motion.div variants={fadeIn}>
            <Button onClick={nextStep} className="w-full py-6 sauti-gradient hover:opacity-90 transition-opacity">
              Send Money <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
          <motion.div variants={fadeIn} className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Transfer Successful!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              You&apos;ve sent UGX {amount} to {selectedContact?.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Transaction ID: TRX{Math.floor(Math.random() * 1000000)}
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep(0)}>
              Send Another
            </Button>
            <Button
              className="flex-1 sauti-gradient hover:opacity-90 transition-opacity"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Back to Home
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
