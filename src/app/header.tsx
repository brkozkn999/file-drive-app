'use client'
import { Button } from "@/components/ui/button";
import { SignedOut } from "@clerk/clerk-react";
import { OrganizationSwitcher, SignInButton, UserButton } from "@clerk/nextjs";

export function Header() {
    return (
        <div className="border-b py-4 bg-gray-50 shadow-md">
            <div className="flex container mx-auto justify-between">
                <div>
                    Logo
                </div>
                <div className="flex gap-2">
                    <OrganizationSwitcher/>
                    <UserButton/>
                    <SignedOut>
                        <SignInButton>
                            <Button>Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </div>
    )
}