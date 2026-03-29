'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide Navbar on admin and login routes
  const isAdminRoute = pathname?.startsWith('/admin');
  const isLoginRoute = pathname === '/login';
  
  if (isAdminRoute || isLoginRoute) {
    return null;
  }
  
  return <Navbar />;
}
