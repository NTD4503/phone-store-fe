import { Link } from "react-router-dom";
import { Layout, Avatar, Dropdown, Menu, Button, Typography } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { toast } from "react-toastify";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.profile);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    toast.success("Bạn đã đăng xuất thành công!");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader
      style={{
        backgroundColor: "#e0f7fa", // light cyan
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div
          className="flex items-center cursor-pointer"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <img src={Logo} alt="Logo" style={{ width: 40, height: 40 }} />
          <h1
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Mobile Shopping
          </h1>
        </div>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={onMenuClick}
          className="md:hidden"
        />

        {user ? (
          <Dropdown
            overlay={userMenu}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Avatar
              src={user.image || Logo}
              size="large"
              style={{ cursor: "pointer", backgroundColor: "#fff" }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        ) : (
          <Button icon={<LoginOutlined />} type="primary" onClick={handleLogin}>
            Login
          </Button>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;
