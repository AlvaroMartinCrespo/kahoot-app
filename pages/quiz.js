import Layout from '@/components/Layout';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '@/components/Loading';
import { supabaseClient } from '../supabase/client';
import { Card, CardHeader, CardBody, CardFooter, Divider } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Pagination, PaginationItem, PaginationCursor } from '@nextui-org/react';
export default function Quiz() {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pregunta, setPregunta] = useState([]);
  // Se efectuara este codigo una vez entre en la pagina o se carge de nuevo.
  useEffect(() => {
    const fetchQuest = async () => {
      console.log(page);
      // Set loading
      setLoading(true);
      // Obtenemos las preguntas
      const { data: Preguntas, error } = await supabaseClient.from('Preguntas').select('*');
      // Si hay error nos salimos de la funcion
      if (error) {
        return;
      }
      // Seteamos las preguntas
      setPreguntas(Preguntas);
      setPregunta(Preguntas[page]);
      // Seteamos el loading a false para que deje de cargar

      setLoading(false);
    };

    fetchQuest();
  }, [page]);

  // Cambia la pagina y con ello la pregunta
  const handleChange = (e) => {
    setPage(e - 1);
  };

  const handleClick = (e) => {
    const respuesta = e.target.innerText;
    if (respuesta === pregunta.correcta) {
      toast.success('Respuesta correcta', {
        position: 'bottom-right',
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  return (
    <>
      <Layout title="Quiz">
        <section className="flex justify-center">
          <div className="grid grid-cols-1 gap-5 p-5">
            {loading ? (
              <>
                <Loading title="Cargando preguntas ..." />
              </>
            ) : (
              <>
                {preguntas.length !== 0 ? (
                  <>
                    <section>
                      <Card className="lg:max-w-[1200px] max-w-[400px]">
                        <CardHeader className="flex justify-center gap-3">
                          <p>{pregunta.pregunta}</p>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                          <section className="grid grid-cols-2 gap-5">
                            <div>
                              <Button color="primary" onClick={handleClick} variant="flat">
                                {pregunta.correcta}
                              </Button>
                            </div>
                            <div>
                              <Button color="primary" onClick={handleClick} variant="flat">
                                {pregunta.incorrecta1}
                              </Button>
                            </div>
                            <div>
                              <Button color="primary" onClick={handleClick} variant="flat">
                                {pregunta.incorrecta2}
                              </Button>
                            </div>
                            <div>
                              <Button color="primary" onClick={handleClick} variant="flat">
                                {pregunta.incorrecta3}
                              </Button>
                            </div>
                          </section>
                        </CardBody>
                        <Divider />
                        <CardFooter></CardFooter>
                      </Card>
                    </section>
                    <Pagination total={preguntas.length} onChange={handleChange} initialPage={page + 1} />
                  </>
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
