"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "./auth-provider"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut } from "lucide-react"

export function AuthButton() {
  const { user, isDemo, signOut } = useAuth()
  const router = useRouter()
  const t = useTranslations("auth")

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const handleSignIn = () => {
    router.push("/login")
  }

  if (!user) {
    return (
      <Button onClick={handleSignIn} variant="outline">
        {t("sign_in")}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.email || "User"} />
            <AvatarFallback>{user.user_metadata?.first_name?.[0] || user.email?.[0] || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.user_metadata?.first_name} {user.user_metadata?.last_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            {isDemo && <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">{t("demo_mode")}</p>}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User className="mr-2 h-4 w-4" />
          <span>{t("profile")}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("sign_out")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
