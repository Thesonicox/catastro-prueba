import {
  Button,
  Form,
  Input,
  Popconfirm,
  Select,
  Space,
  message,
  Modal,
} from "antd";
import {
  useConstrucciones,
  useCreateConstrucciones,
  useDeleteConstruccion,
} from "../src/graphql/construcciones/hooks";
import Table, { ColumnsType } from "antd/lib/table";
import { useState, useEffect } from "react";
import FormConstruccion from "src/components/Formularios/FormConstruccion";
const { Option } = Select;

export default function Construcciones() {
  const elimanarConstruccion = useDeleteConstruccion();
  const [isModalOpen, setIsModalOpne] = useState(false);
  const { data, loading } = useConstrucciones();
  const crearConstruccion = useCreateConstrucciones();
  const [construcciones, setConstrucciones] = useState([]);
  const [construccionSelected, setConstruccionSelected] = useState({});
  const handleSubmit = (values: any) => {
    let valores = { ...values };
    crearConstruccion({ variables: valores });
  };

  const showModal = (terreno: any) => {
    setConstruccionSelected(terreno);
    setIsModalOpne(true);
  };
  const handleOk = () => {
    setIsModalOpne(false);
  };
  const handleCancel = () => {
    setIsModalOpne(false);
    setConstruccionSelected({});
  };


  useEffect(() => {
    setConstrucciones(data?.allConstrucciones.nodes);
  }, [data]);

  const columns = [
    {
      title: "Tipo de Construccion",
      dataIndex: "tipoConstruccion",
      key: "tipoConstruccion",
    },
    {
      title: "Numero de pisos",
      dataIndex: "numeroPisos",
      key: "numeroPisos",
    },
    {
      title: "Area Total",
      dataIndex: "areaTotal",
      key: "areaTotal",
    },
    {
      title: "Direccion",
      dataIndex: "direcccion",
      key: "direcccion",
    },
    {
      title: "Acciones",
      key: "action",
      render: (x, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(x)}>
            Actualizar
          </Button>
          <Popconfirm
            title="¿Estas seguro que deseas eliminar?"
            onConfirm={() => deleteConstruccionById(record.id)}
            okText="Si"
            cancelText="No"
          >
            <Button type="primary" danger>
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteConstruccionById = (id) => {
    elimanarConstruccion({ variables: { idDelete: id } });
  };

  return (
    <div>
      <h2>Construcciones</h2>
      <Table dataSource={construcciones} columns={columns} />
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tipo de Construccion"
          name="tipoConstruccion"
          rules={[
            {
              required: true,
              message: "Por favor seleccione el tipo de Construccion!",
            },
          ]}
        >
          <Select>
            <Option value="inndustrial">Industrial</Option>
            <Option value="comercial">Comercial</Option>
            <Option value="residencial">Residencial</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Numero de Pisos"
          name="numeroPisos"
          rules={[
            { required: true, message: "Por favor ingrese Numero de Pisos" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Area Total"
          name="areaTotal"
          rules={[
            { required: true, message: "Por favor ingrese el Area Total!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Direccion"
          name="direccion"
          rules={[
            { required: true, message: "Por favor ingrese la Direccion!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar Formulario
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <FormConstruccion
          values={construccionSelected}
          handleCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}
