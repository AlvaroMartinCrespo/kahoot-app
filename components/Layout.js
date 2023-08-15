import React from 'react';
import Head from 'next/head';
import Header from './Header';

const Layout = ({ title, children }) => {
  return (
    <div className="bg-slate-50 h-screen text-black">
      <Head>
        <title>{title ? title : 'Next App'}</title>
        <meta name="description" content="Next App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="">{children}</main>
    </div>
  );
};

export default Layout;
