import Layout from '@/components/Layout';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
export default function Preguntas() {
  const handleSubmit = (e) => {
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
    console.log(quest);
    // Aqui hay que hacer fetch a la API interna que tengamos para mandar las preguntas y que las agregen a la base de datos
    
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
              <div className="flex justify-center mt-10">
                <Button type="submit" color="primary" variant="ghost">
                  Agregar Pregunta
                </Button>
              </div>
            </form>
          </div>
        </section>
      </Layout>
    </>
  );
}
