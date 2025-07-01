// src/components/SidebarLayout.js

import React from "react";
import { Layout, Menu, Button, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <Sider
      style={{ background: colorBgContainer }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      {collapsed ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="text"
            icon={<MenuUnfoldOutlined />}
            onClick={toggleCollapsed}
            style={{
              fontSize: "16px",
              width: 40,
              height: 40,
              background: colorBgContainer,
            }}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 0.5rem",
          }}
        >
          <h1 style={{ margin: 10, fontSize: 18, fontWeight: "bold" }}>MENU</h1>
          <Button
            type="text"
            icon={<MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{
              fontSize: "16px",
              width: 40,
              height: 40,
              background: colorBgContainer,
            }}
          />
        </div>
      )}

      <Menu
        mode="inline"
        style={{ border: "none" }}
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <ShopOutlined />,
            label: <Link to="/shop">Shop</Link>,
          },
          {
            key: "2",
            icon: <ShoppingCartOutlined />,
            label: <Link to="/cart">Cart</Link>,
          },
          {
            key: "3",
            icon: <UserOutlined />,
            label: <Link to="/profile">Profile</Link>,
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
