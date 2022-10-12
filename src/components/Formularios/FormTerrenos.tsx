import { Button, Form, Input, Radio, Select, Table } from "antd";
import { Option } from "antd/lib/mentions";
import { useEffect, useState } from "react";
import { useEditTerreno } from "src/graphql/terrenos/hooks";

const FormTerrenos = ({ values, handleCancel}) => {
  const [currentTerreno, setCurrentTerreno] = useState<any>({});
  const editarTerreno = useEditTerreno();
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCurrentTerreno({
      ...currentTerreno,
      [name]: value,
    });
  };

  const handleSelectChange = (value: any, tipoTerreno: string) => {
    setCurrentTerreno({
      ...currentTerreno,
      [tipoTerreno]: value,
    });
  };

  const handleCheckboxChange = (e: any, name: string) => {
    setCurrentTerreno({
      ...currentTerreno,
      [name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    let payLoad = {
        valorComercial: currentTerreno.valorComercial,
        area: currentTerreno.area,
        construcciones: currentTerreno.construcciones,
        fuenteAgua : currentTerreno.fuenteAgua,
        tipoTerreno: currentTerreno.tipoTerreno
    }
    editarTerreno({variables: {idEdit: currentTerreno.id,...payLoad }})
    handleCancel();
  }
  useEffect(() => {
    setCurrentTerreno(values);
  }, [values]);


  return (
    <div>
      <Form layout="vertical" onFinish={handleSubmit }>
        <Form.Item
          label="Valor Comercial"
          //   name="valorComercial"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el Valor Comercial!",
            },
          ]}
        >
          <Input
            onChange={handleInputChange}
            value={currentTerreno.valorComercial}
            name="valorComercial"
          />
        </Form.Item>

        <Form.Item
          label="Area Total"
          //   name="area"
          rules={[{ required: true, message: "Por favor ingrese el Area!" }]}
        >
          <Input
            onChange={handleInputChange}
            value={currentTerreno.area}
            name="area"
          />
        </Form.Item>

        <Form.Item
          label="Tipo de Terreno"
          //   name=""
          rules={[
            {
              required: true,
              message: "Por favor seleccione el tipo de Terreno!",
            },
          ]}
        >
          <Select
            value={currentTerreno.tipoTerreno}
            onChange={(e) => handleSelectChange(e, "tipoTerreno")}
          >
            <Option value="rural">Rural</Option>
            <Option value="urbano">Urbano</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="¿Tiene Construcciones?"
          // name="construcciones"
          rules={[
            {
              required: true,
              message: "Por favor selecccione una respuesta!",
            },
          ]}
        >
          <Radio.Group
            value={currentTerreno.construcciones}
            onChange={(e) => handleCheckboxChange(e, "construcciones")}
          >
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item></Form.Item>

        <Form.Item
          label="¿Tiene Fuentes de agua cerca?"
          //   name="fuenteAgua"
          rules={[
            {
              required: true,
              message: "Por favor selecccione una respuesta!",
            },
          ]}
        >
          <Radio.Group
            value={currentTerreno.fuenteAgua}
            onChange={(e) => handleCheckboxChange(e, "fuenteAgua")}
          >
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
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

export default FormTerrenos;
