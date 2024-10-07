
import {
  DropdownMenu,
} from '@/components/ui/dropdown-menu'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

export function UserNav() {
  return (
    <DropdownMenu>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </DropdownMenu>
  )
}
