import Image from 'next/image';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <main>
      <Layout title="Inicio">
        <section>
          <div className="flex justify-center">
            <h1>Inicio</h1>
          </div>
        </section>
      </Layout>
    </main>
  );
}
