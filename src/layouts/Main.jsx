import { useState } from "react";
import { BreadcrumbsWithIcon } from "../components/BeardScrumb";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import { Layout, theme } from "antd";
const { Content } = Layout;
import Header from "../components/Header";

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      ></Header>
      <Layout>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout style={{ padding: "0 24px" }}>
          <BreadcrumbsWithIcon></BreadcrumbsWithIcon>
          <Content
            style={{
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
