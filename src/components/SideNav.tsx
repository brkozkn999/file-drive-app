'use client'

import Link from "next/link"
import { Button } from "./ui/button"
import { FileIcon, Star } from "lucide-react"
import { usePathname } from "next/navigation"
import clsx from "clsx"

export function SideNav() {
    const pathname = usePathname();
    return (
        <div className="w-40 flex flex-col gap-4">
            <Link href='/dashboard/files'>
              <Button variant={'link'} className={clsx('flex gap-1', {
                'text-blue-500' : pathname.includes('/dashboard/files')
              })}>
                <FileIcon /> All Files
              </Button>
            </Link>
            
            <Link href='/dashboard/favorites'>
            <Button variant={'link'} className={clsx('flex gap-1', {
                'text-yellow-500' : pathname.includes('/dashboard/favorites')
              })}>
                <Star /> Favorites
              </Button>
            </Link>
          </div>
    )
}