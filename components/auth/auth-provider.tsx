"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { supabase, createDemoUser, isDemoUser } from "@/lib/supabase/client"

type AuthContextType = {
  session: Session | null
  user: User | null
  isLoading: boolean
  isDemo: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any; data: any }>
  signOut: () => Promise<void>
  startDemo: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        checkIfDemo(session.user.id)
      }

      setIsLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        checkIfDemo(session.user.id)
      } else {
        setIsDemo(false)
      }

      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkIfDemo = async (userId: string) => {
    const demo = await isDemoUser(userId)
    setIsDemo(demo)
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          phone: userData.phone,
        },
      },
    })

    if (!error && data.user) {
      // Create user profile
      const { error: profileError } = await supabase.from("users").insert({
        id: data.user.id,
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: email,
        phone: userData.phone,
        language: userData.language || "en",
        theme: "light",
      })

      if (profileError) {
        return { error: profileError, data: null }
      }

      // Create notification preferences
      await supabase.from("notification_preferences").insert({
        user_id: data.user.id,
      })

      // Create security settings
      await supabase.from("security_settings").insert({
        user_id: data.user.id,
      })
    }

    return { error, data }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const startDemo = async () => {
    setIsLoading(true)

    try {
      // Create a demo user
      const demoUserId = await createDemoUser()

      if (demoUserId) {
        // Sign in as the demo user
        await supabase.auth.signInWithPassword({
          email: `demo-${demoUserId}@example.com`,
          password: "demo-password", // This won't actually be used
        })

        setIsDemo(true)
      }
    } catch (error) {
      console.error("Error starting demo:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    session,
    user,
    isLoading,
    isDemo,
    signIn,
    signUp,
    signOut,
    startDemo,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
