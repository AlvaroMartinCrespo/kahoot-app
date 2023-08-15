import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="py-10">
      <ul className="flex justify-center">
        <li className="flex justify-center gap-10">
          <Link href="/sign-up">Sign Up</Link>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
