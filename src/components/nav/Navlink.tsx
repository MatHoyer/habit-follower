'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink: React.FC<{ href: string; name: string }> = ({ href, name }) => {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        'transition-colors hover:text-foreground/80 text-foreground/60',
        path === href && 'text-foreground'
      )}
    >
      {name}
    </Link>
  );
};

export default NavLink;
