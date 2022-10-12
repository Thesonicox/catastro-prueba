import {  Layout, Menu } from 'antd';
import { MenuComponent } from '../Menu/Menu';


const { Header, Content, Footer } = Layout;

const LayoutComponent = ({children}) => {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <MenuComponent/>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64, height: '86vh' }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
        { children }
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Realizado por Sebastain Ramirez Vasco
      </Footer>
    </Layout>
  );
};


export default LayoutComponent;