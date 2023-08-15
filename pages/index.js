import Image from 'next/image';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Layout title="Inicio">
        <section className="p-10">
          <div className="flex justify-center flex-col gap-5">
            <h1>Bienvenido a Kahoot</h1>
            <Button>
              <Link href="/quiz">Hacer Quiz</Link>
            </Button>
            <Button>
              <Link href="/preguntas">Añadir Preguntas</Link>
            </Button>
          </div>
        </section>
      </Layout>
    </main>
  );
}
