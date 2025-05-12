"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Download, CreditCard, Search, Calendar, Filter } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

// Add this interface at the top of the file, after the imports
interface Transaction {
  id: number
  name: string
  amount: string
  type: "sent" | "received" | "paid"
  date: string
  time: string
  category: string
  description: string
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

// Make sure the transactions array is properly typed:
const transactions: Transaction[] = [
  {
    id: 1,
    name: "Sarah Nakato",
    amount: "50,000",
    type: "sent",
    date: "May 12, 2023",
    time: "10:30 AM",
    category: "Family",
    description: "Weekly allowance",
  },
  {
    id: 2,
    name: "MTN Mobile Money",
    amount: "100,000",
    type: "received",
    date: "May 11, 2023",
    time: "2:15 PM",
    category: "Deposit",
    description: "Salary deposit",
  },
  {
    id: 3,
    name: "Umeme Ltd",
    amount: "75,000",
    type: "paid",
    date: "May 10, 2023",
    time: "9:45 AM",
    category: "Utilities",
    description: "Electricity bill",
  },
  {
    id: 4,
    name: "David Okello",
    amount: "25,000",
    type: "sent",
    date: "May 8, 2023",
    time: "4:20 PM",
    category: "Friends",
    description: "Lunch payment",
  },
  {
    id: 5,
    name: "Kampala Market SACCO",
    amount: "150,000",
    type: "sent",
    date: "May 5, 2023",
    time: "11:00 AM",
    category: "Savings",
    description: "Monthly contribution",
  },
  {
    id: 6,
    name: "Airtel Money",
    amount: "20,000",
    type: "sent",
    date: "May 3, 2023",
    time: "8:30 AM",
    category: "Mobile",
    description: "Airtime purchase",
  },
  {
    id: 7,
    name: "John Mukasa",
    amount: "200,000",
    type: "received",
    date: "May 1, 2023",
    time: "3:45 PM",
    category: "Business",
    description: "Product payment",
  },
]

export function TransactionHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [date, setDate] = useState<Date | undefined>(undefined)
  // Replace the useState<any | null>(null) with:
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const filteredTransactions = transactions.filter((transaction) => {
    // Search filter
    const matchesSearch =
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Type filter
    const matchesType = !typeFilter || transaction.type === typeFilter

    // Category filter
    const matchesCategory = !categoryFilter || transaction.category === categoryFilter

    // Date filter
    const matchesDate = !date || transaction.date === format(date, "MMMM d, yyyy")

    return matchesSearch && matchesType && matchesCategory && matchesDate
  })

  const categories = [...new Set(transactions.map((t) => t.category))]

  // Update the handleViewDetails function:
  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
  }

  const handleCloseDetails = () => {
    setSelectedTransaction(null)
  }

  const clearFilters = () => {
    setTypeFilter(null)
    setCategoryFilter(null)
    setDate(undefined)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transaction History</h1>
      </div>

      {selectedTransaction ? (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeIn}>
            <Button variant="ghost" onClick={handleCloseDetails} className="mb-4 pl-0">
              ← Back to Transactions
            </Button>

            <Card className="glassmorphism">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center mr-4 ${
                        selectedTransaction.type === "sent"
                          ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                          : selectedTransaction.type === "received"
                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                      }`}
                    >
                      {selectedTransaction.type === "sent" && <Send className="h-6 w-6" />}
                      {selectedTransaction.type === "received" && <Download className="h-6 w-6" />}
                      {selectedTransaction.type === "paid" && <CreditCard className="h-6 w-6" />}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedTransaction.type === "sent"
                          ? "Sent to"
                          : selectedTransaction.type === "received"
                            ? "Received from"
                            : "Paid to"}{" "}
                        {selectedTransaction.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        {selectedTransaction.date} at {selectedTransaction.time}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-right ${
                      selectedTransaction.type === "sent" || selectedTransaction.type === "paid"
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    <p className="text-2xl font-bold">
                      {selectedTransaction.type === "sent" || selectedTransaction.type === "paid" ? "-" : "+"}
                      UGX {selectedTransaction.amount}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Transaction Type</p>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{selectedTransaction.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedTransaction.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedTransaction.description}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Transaction ID</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        TRX{Math.floor(Math.random() * 1000000)}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline">Download Receipt</Button>
                    <Button variant="outline" className="text-red-600 dark:text-red-400">
                      Report Issue
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select
                value={typeFilter || "all"}
                onValueChange={(value) => setTypeFilter(value === "all" ? null : value)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={categoryFilter || "all"}
                onValueChange={(value) => setCategoryFilter(value === "all" ? null : value)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[130px] justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "MMM d, yyyy") : <span>Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </motion.div>

          {(typeFilter || categoryFilter || date) && (
            <motion.div variants={fadeIn} className="flex items-center mb-4">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Filter className="h-4 w-4 mr-2" />
                <span>Filters applied:</span>
                {typeFilter && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs capitalize">
                    {typeFilter}
                  </span>
                )}
                {categoryFilter && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                    {categoryFilter}
                  </span>
                )}
                {date && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                    {format(date, "MMM d, yyyy")}
                  </span>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto text-sm">
                Clear filters
              </Button>
            </motion.div>
          )}

          <motion.div variants={fadeIn} className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No transactions found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <Card
                  key={transaction.id}
                  className="glassmorphism hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all"
                  onClick={() => handleViewDetails(transaction)}
                >
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
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {transaction.name}
                          </p>
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
                          <div className="flex items-center">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 mr-2">
                              {transaction.category}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                              {transaction.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
