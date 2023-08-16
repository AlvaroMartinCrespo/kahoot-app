import Layout from '@/components/Layout';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '@/components/Loading';
import { supabaseClient } from '../supabase/client';
import { Card, CardHeader, CardBody, CardFooter, Divider } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Pagination, PaginationItem, PaginationCursor } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { Chip } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { shuffle } from '@/utils/shuffleArray';
export default function Quiz() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [numPreguntas, setNumPreguntas] = useState(0);
  const [pregunta, setPregunta] = useState([]);
  const [aciertos, setAciertos] = useState(0);
  const [respuesta, setRespuestas] = useState([]);
  // Se efectuara este codigo una vez entre en la pagina o se carge de nuevo.
  useEffect(() => {
    const fetchQuest = async () => {
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
      setNumPreguntas(Preguntas.length);
      setPregunta(Preguntas[page]);
      if (Preguntas.length > 0) {
        const respuestas = [
          Preguntas[page].correcta,
          Preguntas[page].incorrecta1,
          Preguntas[page].incorrecta2,
          Preguntas[page].incorrecta3,
        ];
        setRespuestas(shuffle(respuestas));
      }

      // Seteamos el loading a false para que deje de cargar

      setLoading(false);
    };

    fetchQuest();
  }, [page]);

  // Cambia la pagina y con ello la pregunta
  // const handleChange = (e) => {
  //   setPage(e - 1);
  // };

  const handleClick = (e) => {
    const respuesta = e.target.innerText;
    if (respuesta === pregunta.correcta) {
      toast.success('Correcta', {
        position: 'bottom-right',
        autoClose: 300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setAciertos(aciertos + 1);
      if (page + 1 < numPreguntas) {
        setPage(page + 1);
      } else {
        onOpen();
        setPage(0);
      }
    } else {
      toast.error('Incorrecta', {
        position: 'bottom-right',
        autoClose: 300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      if (page + 1 < numPreguntas) {
        setPage(page + 1);
      } else {
        onOpen();
        setPage(0);
      }
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    router.reload();
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
                            {respuesta.map((pregunta, index) => {
                              return (
                                <Button key={index} color="primary" onClick={handleClick} variant="flat">
                                  {pregunta}
                                </Button>
                              );
                            })}
                            {/* <div>
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
                            </div> */}
                          </section>
                        </CardBody>
                        <Divider />
                        <CardFooter></CardFooter>
                      </Card>
                    </section>
                    {/* <Pagination total={preguntas.length} onChange={handleChange} initialPage={page + 1} /> */}
                    <div className="flex justify-center">
                      <Chip color="warning" variant="flat">
                        {aciertos} / {numPreguntas}
                      </Chip>
                    </div>
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
        <ToastContainer />
        <section className="flex justify-center">
          <Button>
            <Link href="/preguntas">Añadir más preguntas</Link>
          </Button>
        </section>
      </Layout>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Revisión</ModalHeader>
              <ModalBody>
                <p>
                  Has acertado {aciertos} de {numPreguntas}
                </p>
                <p>Has acertado un {((aciertos / numPreguntas) * 100).toFixed(2)}%</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={handleClose}>
                  Volver a intentar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
