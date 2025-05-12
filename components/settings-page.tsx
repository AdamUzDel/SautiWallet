"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Moon, Smartphone, ChevronRight, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"

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

export function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("profile")
  const [voiceNotifications, setVoiceNotifications] = useState(true)
  const [transactionAlerts, setTransactionAlerts] = useState(true)
  const [marketingMessages, setMarketingMessages] = useState(false)
  const [biometricAuth, setBiometricAuth] = useState(true)
  const [pinRequired, setPinRequired] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="language">Language</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeIn}>
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-6">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-2">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+256 712 345 678" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue="123 Main Street, Kampala" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue="Kampala" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select defaultValue="uganda">
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="uganda">Uganda</SelectItem>
                            <SelectItem value="kenya">Kenya</SelectItem>
                            <SelectItem value="tanzania">Tanzania</SelectItem>
                            <SelectItem value="rwanda">Rwanda</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="sauti-gradient hover:opacity-90 transition-opacity">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Linked Accounts</CardTitle>
                  <CardDescription>Manage your connected accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mr-3">
                        <svg
                          className="h-6 w-6 text-yellow-600 dark:text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">MTN Mobile Money</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Connected</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Manage <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-3">
                        <svg
                          className="h-6 w-6 text-red-600 dark:text-red-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Airtel Money</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Connected</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Manage <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                        <svg
                          className="h-6 w-6 text-blue-600 dark:text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Bank Account</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Not connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeIn}>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Voice Notifications</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive voice alerts for important transactions
                        </p>
                      </div>
                      <Switch checked={voiceNotifications} onCheckedChange={setVoiceNotifications} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Transaction Alerts</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified about deposits, withdrawals, and payments
                        </p>
                      </div>
                      <Switch checked={transactionAlerts} onCheckedChange={setTransactionAlerts} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Marketing Messages</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive updates about new features and promotions
                        </p>
                      </div>
                      <Switch checked={marketingMessages} onCheckedChange={setMarketingMessages} />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notification Channels</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                            <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">In-app alerts</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
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
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Daily digest</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                            <svg
                              className="h-5 w-5 text-purple-600 dark:text-purple-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">SMS Notifications</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Important alerts only</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="sauti-gradient hover:opacity-90 transition-opacity">Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeIn}>
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Biometric Authentication</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Use fingerprint or face recognition to log in
                        </p>
                      </div>
                      <Switch checked={biometricAuth} onCheckedChange={setBiometricAuth} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">PIN Required for Transactions</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Require PIN for all financial transactions
                        </p>
                      </div>
                      <Switch checked={pinRequired} onCheckedChange={setPinRequired} />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Change PIN</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPin">Current PIN</Label>
                        <Input id="currentPin" type="password" placeholder="Enter current PIN" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPin">New PIN</Label>
                        <Input id="newPin" type="password" placeholder="Enter new PIN" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPin">Confirm New PIN</Label>
                        <Input id="confirmPin" type="password" placeholder="Confirm new PIN" />
                      </div>
                    </div>
                    <Button className="w-full">Update PIN</Button>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Device Management</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                            <Smartphone className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium text-gray-900 dark:text-white mr-2">Current Device</p>
                              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs rounded-full">
                                Active
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">iPhone 13 • Kampala, Uganda</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                            <svg
                              className="h-5 w-5 text-gray-600 dark:text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">MacBook Pro</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Last active: 2 days ago</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-red-600 dark:text-red-400">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="language" className="mt-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeIn}>
              <Card>
                <CardHeader>
                  <CardTitle>Language Settings</CardTitle>
                  <CardDescription>Choose your preferred language</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="appLanguage">App Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="appLanguage">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="lg">Luganda</SelectItem>
                          <SelectItem value="sw">Swahili</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="voiceLanguage">Voice Assistant Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="voiceLanguage">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="lg">Luganda</SelectItem>
                          <SelectItem value="sw">Swahili</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Voice Assistant Preferences
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                            <svg
                              className="h-5 w-5 text-blue-600 dark:text-blue-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Sarah (Female)</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">English</p>
                          </div>
                        </div>
                        <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                            <svg
                              className="h-5 w-5 text-blue-600 dark:text-blue-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">David (Male)</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">English</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Check className="h-4 w-4 opacity-0" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                            <svg
                              className="h-5 w-5 text-blue-600 dark:text-blue-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Nakato (Female)</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Luganda</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Check className="h-4 w-4 opacity-0" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="sauti-gradient hover:opacity-90 transition-opacity">
                      Save Language Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeIn}>
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize how SautiWallet looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            theme === "light"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                          onClick={() => setTheme("light")}
                        >
                          <div className="h-20 bg-white border border-gray-200 rounded-md mb-2 flex items-center justify-center">
                            <svg
                              className="h-6 w-6 text-yellow-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                              />
                            </svg>
                          </div>
                          <p className="text-center text-sm font-medium text-gray-900 dark:text-white">Light</p>
                        </div>

                        <div
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            theme === "dark"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                          onClick={() => setTheme("dark")}
                        >
                          <div className="h-20 bg-gray-900 border border-gray-700 rounded-md mb-2 flex items-center justify-center">
                            <Moon className="h-6 w-6 text-gray-400" />
                          </div>
                          <p className="text-center text-sm font-medium text-gray-900 dark:text-white">Dark</p>
                        </div>

                        <div
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            theme === "system"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                          onClick={() => setTheme("system")}
                        >
                          <div className="h-20 bg-gradient-to-r from-white to-gray-900 border border-gray-200 rounded-md mb-2 flex items-center justify-center">
                            <svg
                              className="h-6 w-6 text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <p className="text-center text-sm font-medium text-gray-900 dark:text-white">System</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <Label htmlFor="textSize">Text Size</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger id="textSize">
                          <SelectValue placeholder="Select text size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="animations" className="text-base">
                          Animations
                        </Label>
                        <Switch id="animations" defaultChecked />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Enable smooth transitions and animations
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="sauti-gradient hover:opacity-90 transition-opacity">
                      Save Appearance Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
