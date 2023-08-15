import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from '@nextui-org/react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Quiz', url: '/quiz' },
    { name: 'Añadir Preguntas', url: '/preguntas' },
  ];
  return (
    <header className="p-3">
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
          <NavbarBrand>
            <p className="font-bold text-inherit">CresHoot</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/quiz">
              Quiz
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/preguntas" aria-current="page">
              Añadir Preguntas
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color={'foreground'} className="w-full" href={item.url} size="lg">
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </header>
  );
};

export default Header;
