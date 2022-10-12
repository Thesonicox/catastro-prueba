import { Button, Form, Input, Radio, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { useEditPredios } from "src/graphql/predios/hooks";

const FormPredios = ({ values, handleCancel}) => {
  const [currentPredios, setCurrentPredios] = useState<any>({});
  const editarPredios = useEditPredios();
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCurrentPredios({
      ...currentPredios,
      [name]: value,
    });
  };


  const handleSubmit = () => {
    let payLoad = {
        numeroPredial: currentPredios.numeroPredial,
        avaluo: currentPredios.avaluo,
        nombre: currentPredios.nombre,
        departamento: currentPredios.departamento,
        municipio: currentPredios.municipio
    }
    editarPredios({variables: {idEdit: currentPredios.id,...payLoad }})
    handleCancel();
  }
  useEffect(() => {
    setCurrentPredios(values);
  }, [values]);


  return (
    <div>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Numero Predial"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el Numero Predial!",
            },
          ]}
        >
          <Input
            onChange={handleInputChange}
            value={currentPredios.numeroPredial}
            name="numeroPredial"
          />
        </Form.Item>

        <Form.Item
          label="Avaluo"
          rules={[{ required: true, message: "Por favor ingrese el Avalúo!" }]}
        >
          <Input
            onChange={handleInputChange}
            value={currentPredios.avaluo}
            name="avaluo"
          />
        </Form.Item>

        <Form.Item
          label="Nombre"
          rules={[
            {
              required: true,
              message: "Por favor seleccione el Nombre!",
            },
          ]}
        >
          <Input
            onChange={handleInputChange}
            value={currentPredios.nombre}
            name="nombre"
          />
        </Form.Item>

        <Form.Item
          label="Departamento"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el Departamento!",
            },
          ]}
        >
          <Input
            onChange={handleInputChange}
            value={currentPredios.departamento}
            name="departamento"
          />
        </Form.Item>


        <Form.Item
          label="Municipio"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el Municipio!",
            },
          ]}
        >
          <Input
            onChange={handleInputChange}
            value={currentPredios.municipio}
            name="municipio"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar Formulario
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormPredios;