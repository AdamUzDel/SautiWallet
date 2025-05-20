/**
 * SautiWallet Type Definitions
 *
 * This file contains all the TypeScript interfaces and types used throughout the application.
 * It serves as a central reference for data structures and can help with planning the database schema.
 */

/**
 * User related types
 */
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: string
  city?: string
  country?: string
  profileImage?: string
  pin?: string // Note: In a real app, never store PINs or passwords in plain text
  language: string
  theme: "light" | "dark" | "system"
  voiceAssistantId?: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Contact related types
 */
export interface Contact {
  id: number | string
  name: string
  phone: string
  email?: string
  recent?: boolean
  userId?: string // Reference to the user who owns this contact
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Transaction related types
 */
export type TransactionType = "sent" | "received" | "paid"

export interface Transaction {
  id: number | string
  name: string
  amount: string
  type: TransactionType
  date: string
  time: string
  category: string
  description: string
  recipientId?: string | number // Could be a contact ID or phone number
  senderId?: string // User ID of the sender
  status?: "pending" | "completed" | "failed"
  fee?: string
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Savings Group (SACCO) related types
 */
export interface SavingsGroup {
  id: number | string
  name: string
  members: number
  totalSaved: string
  goalAmount: string
  goalName: string
  nextMeeting: string
  progress: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
  chairpersonId?: string // User ID of the chairperson
}

export interface GroupMember {
  id: number | string
  userId: string
  groupId: number | string
  name: string
  role: "Chairperson" | "Treasurer" | "Secretary" | "Member"
  contribution: string
  joinedAt?: Date
}

export interface GroupDiscussion {
  id: number | string
  groupId: number | string
  authorId: string
  author: string
  message: string
  time: string
  createdAt?: Date
}

/**
 * Voice Assistant related types
 */
export interface VoiceAssistant {
  id: string
  name: string
  gender: "male" | "female"
  language: string
  preview: string
}

/**
 * Settings and Preferences
 */
export interface NotificationPreference {
  userId: string
  voiceNotifications: boolean
  transactionAlerts: boolean
  marketingMessages: boolean
  pushEnabled: boolean
  emailEnabled: boolean
  smsEnabled: boolean
}

export interface SecuritySettings {
  userId: string
  biometricAuth: boolean
  pinRequired: boolean
  lastPinChange?: Date
  devices?: ConnectedDevice[]
}

export interface ConnectedDevice {
  id: string
  userId: string
  deviceName: string
  deviceType: string
  lastActive: Date
  isCurrentDevice: boolean
  location?: string
}

/**
 * Linked Account types
 */
export interface LinkedAccount {
  id: string
  userId: string
  accountType: "mobile_money" | "bank" | "card"
  provider: string
  accountNumber?: string
  isConnected: boolean
  lastSync?: Date
}

/**
 * Amount type for consistent handling of monetary values
 */
export interface MoneyAmount {
  value: string // Store as string to preserve exact decimal values
  currency: string // e.g., "UGX"
  numericValue?: number // Computed value for calculations
}
