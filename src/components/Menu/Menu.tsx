import { Menu } from "antd";

import Link from "next/link";

export const MenuComponent = () => {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
            <Link href='/'>Inicio</Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Link href='/construcciones'>Construcciones</Link>
        </Menu.Item>
        <Menu.Item key="3">
            <Link href='/terrenos'>Terrenos</Link>
        </Menu.Item>
        <Menu.Item key="4">
            <Link href='/propietarios'>Propietarios</Link>
        </Menu.Item>
        <Menu.Item key="5">
            <Link href='/predios'>Predios</Link>
        </Menu.Item>
      </Menu>
  );
};
