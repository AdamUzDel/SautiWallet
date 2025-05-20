"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "./auth-provider"
import { useRouter } from "@/i18n/navigation"

export function AuthButton() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const handleSignIn = () => {
    router.push("/auth/login")
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">{user.email}</span>
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <Button variant="outline" size="sm" onClick={handleSignIn}>
      Sign in
    </Button>
  )
}
