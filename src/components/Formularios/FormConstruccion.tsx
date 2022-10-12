import { Button, Form, Input, Radio, Select, Table } from "antd";
import { Option } from "antd/lib/mentions";
import { useEffect, useState } from "react";
import { useEditConstruccion } from "src/graphql/construcciones/hooks";

const FormConstruccion = ({ values, handleCancel }) => {
  const [currentConstruccion, setCurrentConstruccion] = useState<any>({});
  const editarConstruccion = useEditConstruccion();
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCurrentConstruccion({
      ...currentConstruccion,
      [name]: value,
    });
  };

  const handleSelectChange = (value: any, tipoTerreno: string) => {
    setCurrentConstruccion({
      ...currentConstruccion,
      [tipoTerreno]: value,
    });
  };

  const handleSubmit = () => {
    let payLoad = {
      direcccion: currentConstruccion.direcccion,
      areaTotal: currentConstruccion.areaTotal,
      numeroPisos: currentConstruccion.numeroPisos,
      tipoConstruccion: currentConstruccion.tipoConstruccion,
    };
    editarConstruccion({
      variables: { idEdit: currentConstruccion.id, ...payLoad },
    });
    handleCancel();
  };
  useEffect(() => {
    setCurrentConstruccion(values);
  }, [values]);

  return (
    <div>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tipo de Construccion"
          //name="tipoConstruccion"
          rules={[
            {
              required: true,
              message: "Por favor seleccione el tipo de Construccion!",
            },
          ]}
        >
          <Select
            value={currentConstruccion.tipoConstruccion}
            onChange={(e) => handleSelectChange(e, "tipoConstruccion")}
          >
            <Option value="inndustrial">Industrial</Option>
            <Option value="comercial">Comercial</Option>
            <Option value="residencial">Residencial</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Numero de Pisos"
          rules={[
            { required: true, message: "Por favor ingrese Numero de Pisos" },
          ]}
        >
          <Input
            onChange={handleInputChange}
            value={currentConstruccion.numeroPisos}
            name="numeroPisos"
          />
        </Form.Item>

        <Form.Item
          label="Area Total"
          rules={[
            { required: true, message: "Por favor ingrese el Area Total!" },
          ]}
        >
          <Input
            onChange={handleInputChange}
            value={currentConstruccion.areaTotal}
            name="areaTotal"
          />
        </Form.Item>

        <Form.Item
          label="Direccion"
          rules={[
            { required: true, message: "Por favor ingrese la Direccion!" },
          ]}
        >
          <Input
            onChange={handleInputChange}
            value={currentConstruccion.direcccion}
            name="direcccion"
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

export default FormConstruccion;
