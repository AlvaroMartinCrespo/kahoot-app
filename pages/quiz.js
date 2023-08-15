import Layout from '@/components/Layout';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '@/components/Loading';

export default function Quiz() {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setPreguntas('');
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      <Layout title="Quiz">
        <section>
          <div className="flex justify-center">
            {loading ? (
              <>
                <Loading title="Cargando preguntas ..." />
              </>
            ) : (
              <>
                {preguntas ? (
                  <></>
                ) : (
                  <>
                    <h1>Todavia no hay preguntas</h1>
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}
