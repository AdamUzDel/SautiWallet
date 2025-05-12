"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { PiggyBank, Users, Plus, MessageSquare, TrendingUp, ChevronRight, Calendar, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

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

const savingsGroups = [
  {
    id: 1,
    name: "Kampala Market Vendors",
    members: 15,
    totalSaved: "1,200,000",
    goalAmount: "2,000,000",
    goalName: "Business Expansion",
    nextMeeting: "May 15, 2023",
    progress: 60,
    isActive: true,
  },
  {
    id: 2,
    name: "Family Savings Circle",
    members: 8,
    totalSaved: "750,000",
    goalAmount: "1,500,000",
    goalName: "Education Fund",
    nextMeeting: "May 20, 2023",
    progress: 50,
    isActive: true,
  },
  {
    id: 3,
    name: "Community Housing Fund",
    members: 25,
    totalSaved: "3,500,000",
    goalAmount: "10,000,000",
    goalName: "Land Purchase",
    nextMeeting: "June 1, 2023",
    progress: 35,
    isActive: false,
  },
]

const members = [
  { id: 1, name: "Sarah Nakato", role: "Chairperson", contribution: "150,000" },
  { id: 2, name: "David Okello", role: "Treasurer", contribution: "120,000" },
  { id: 3, name: "Mary Auma", role: "Secretary", contribution: "100,000" },
  { id: 4, name: "John Mukasa", role: "Member", contribution: "80,000" },
  { id: 5, name: "Grace Atim", role: "Member", contribution: "100,000" },
]

const discussions = [
  {
    id: 1,
    author: "Sarah Nakato",
    message:
      "Hello everyone! Our next meeting will be on May 15th at the usual place. Please make sure to bring your contributions.",
    time: "2 days ago",
  },
  {
    id: 2,
    author: "David Okello",
    message: "I've updated our financial records. We're making good progress towards our goal!",
    time: "Yesterday",
  },
  {
    id: 3,
    author: "Mary Auma",
    message: "I found a potential supplier for our business expansion. Will share details at the meeting.",
    time: "5 hours ago",
  },
]

export function SavingsGroups() {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  const handleSelectGroup = (groupId: number) => {
    setSelectedGroup(groupId)
    setActiveTab("overview")
  }

  const handleBackToGroups = () => {
    setSelectedGroup(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {selectedGroup ? "Group Details" : "Savings Groups (SACCO)"}
        </h1>
        {!selectedGroup && (
          <Button className="sauti-gradient hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        )}
        {selectedGroup && (
          <Button variant="ghost" onClick={handleBackToGroups}>
            Back to Groups
          </Button>
        )}
      </div>

      {!selectedGroup ? (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4">
          {savingsGroups.map((group) => (
            <motion.div key={group.id} variants={fadeIn}>
              <Card
                className={`glassmorphism hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all ${
                  !group.isActive ? "opacity-70" : ""
                }`}
                onClick={() => handleSelectGroup(group.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-gray-900 dark:text-white">{group.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{group.members} members</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-300">Goal: {group.goalName}</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        UGX {group.totalSaved} / {group.goalAmount}
                      </span>
                    </div>
                    <Progress value={group.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Calendar className="h-4 w-4 mr-1" />
                      Next meeting: {group.nextMeeting}
                    </div>
                    {!group.isActive && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                        Inactive
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          {/* Group details */}
          <motion.div variants={fadeIn}>
            <Card className="glassmorphism mb-6">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 rounded-full sauti-gradient flex items-center justify-center mr-4">
                    <PiggyBank className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{savingsGroups[0].name}</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {savingsGroups[0].members} members • Created Jan 2023
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-300">Goal: {savingsGroups[0].goalName}</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      UGX {savingsGroups[0].totalSaved} / {savingsGroups[0].goalAmount}
                    </span>
                  </div>
                  <Progress value={savingsGroups[0].progress} className="h-3 mb-2" />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Started</span>
                    <span>Current</span>
                    <span>Goal</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Next meeting: {savingsGroups[0].nextMeeting}
                  </div>
                  <Button size="sm" className="sauti-gradient hover:opacity-90 transition-opacity">
                    Make Contribution
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Group Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Total Contributions</span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">UGX 1,200,000</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Average Per Member</span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">UGX 80,000</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Growth Rate</span>
                        <span className="text-xl font-bold text-green-600 dark:text-green-400 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          12% monthly
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Goal Completion</span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">60%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 flex-shrink-0">
                          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Monthly Meeting</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">May 15, 2023 • 2:00 PM</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Agenda: Review progress, collect contributions, discuss business expansion opportunities
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-600 dark:text-green-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Loan Distribution</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">May 20, 2023 • 10:00 AM</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Eligible members will receive business loans based on contribution history
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="members" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Group Members</CardTitle>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Invite
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage
                                src={`/placeholder.svg?height=40&width=40&text=${member.name.charAt(0)}`}
                                alt={member.name}
                              />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900 dark:text-white">UGX {member.contribution}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Total contribution</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussions" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Group Chat</CardTitle>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      New Message
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {discussions.map((discussion) => (
                        <div key={discussion.id} className="flex items-start">
                          <Avatar className="h-10 w-10 mr-3 mt-1">
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40&text=${discussion.author.charAt(0)}`}
                              alt={discussion.author}
                            />
                            <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center mb-1">
                              <p className="font-medium text-gray-900 dark:text-white mr-2">{discussion.author}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{discussion.time}</p>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{discussion.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center">
                      <Input placeholder="Type your message..." className="mr-2" />
                      <Button size="icon" className="sauti-gradient hover:opacity-90 transition-opacity">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
