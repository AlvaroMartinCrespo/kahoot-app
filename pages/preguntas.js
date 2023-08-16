import Layout from '@/components/Layout';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { supabaseClient } from '../supabase/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
export default function Preguntas() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Obtener los datos del formulario con formData
    const form = e.target;
    const formData = new FormData(form);
    const quest = {
      pregunta: formData.get('Pregunta'),
      correcta: formData.get('correcta'),
      incorrecta1: formData.get('incorrecta1'),
      incorrecta2: formData.get('incorrecta2'),
      incorrecta3: formData.get('incorrecta3'),
    };
    // console.log(quest);
    // Insertar los datos en la base de datos
    const { data, error } = await supabaseClient.from('Preguntas').insert([
      {
        pregunta: quest.pregunta,
        correcta: quest.correcta,
        incorrecta1: quest.incorrecta1,
        incorrecta2: quest.incorrecta2,
        incorrecta3: quest.incorrecta3,
      },
    ]);
    if (!error) {
      toast.success('Pregunta agregada', {
        position: 'bottom-right',
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      form.reset();
    } else {
      toast.error(error.message);
    }
  };

  const handleClick = async () => {
    const { error } = await supabaseClient.from('Preguntas').delete().neq('id', -1);
    console.log({ error });
    if (!error) {
      toast.success('Preguntas eliminadas', {
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
      <Layout title="Preguntas">
        <section>
          <div className="flex justify-center p-10">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center my-5">
                <Input type="text" color="default" name="Pregunta" label="Pregunta" className="max-w-[320px]" />
              </div>
              <div className="w-full grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  color="primary"
                  name="correcta"
                  label="Respuesta 1 (Correcta)"
                  className="max-w-[220px]"
                />
                <Input type="text" color="secondary" name="incorrecta1" label="Respuesta 2" className="max-w-[220px]" />
                <Input type="text" color="success" name="incorrecta2" label="Respuesta 3" className="max-w-[220px]" />
                <Input type="text" color="warning" name="incorrecta3" label="Respuesta 4" className="max-w-[220px]" />
              </div>
              <div className="flex justify-center mt-10 flex-col gap-5">
                <Button type="submit" color="primary" variant="ghost">
                  Agregar Pregunta
                </Button>
                <Button onClick={handleClick} color="danger" variant="ghost">
                  Eliminar preguntas
                </Button>
                <Button>
                  <Link href="/quiz">Ir a Quiz</Link>
                </Button>
              </div>
            </form>
          </div>
        </section>
        <ToastContainer />
      </Layout>
    </>
  );
}
