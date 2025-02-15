import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = ({children, className}: HeaderProps) => {
  return (
    <div className={cn('header', className)} style={{ padding: '0 50px' }}>
      <Link href='/' className='md:fex-1'>
      <Image src='/assets/logo.png' alt='logo' width={220} height={65} />
      {/* <Image src='/assets/icons/logo-icon.svg' alt='logo' width={32} height={32} className='mr-2 md:hidden' /> */}
      </Link>
      {children}
    </div>
  )
}

export default Header
