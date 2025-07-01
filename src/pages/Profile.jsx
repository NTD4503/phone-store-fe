import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { toast } from "react-toastify";
import { getUserProfile } from "../services/UserService";
import { Card, Avatar, Typography, Descriptions, Spin } from "antd";

const { Title, Text } = Typography;

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getUserProfile(token)
        .then((data) => {
          setProfile(data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Không thể tải thông tin người dùng.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  if (!token) {
    return (
      <div className="h-full flex justify-center items-center">
        <Text strong>Bạn chưa đăng nhập.</Text>
      </div>
    );
  }

  if (loading || !profile) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spin tip="Đang tải thông tin..." size="large" />
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto sm:rounded-lg bg-white p-4 h-full">
      <div className="bg-white rounded-lg p-6">
        <Title level={2}>Thông tin cá nhân</Title>

        <div className="flex items-center gap-6 mb-6">
          <Avatar src={profile.image || Logo} size={96} alt="Avatar" />
          <div>
            <Title level={4} className="mb-0">
              {profile.firstName} {profile.lastName}
            </Title>
            <Text type="secondary">{profile.email}</Text>
          </div>
        </div>

        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Ngày sinh">
            {profile.birthDate || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính">
            {profile.gender || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label="Nơi làm việc">
            {profile?.company?.address?.address},{" "}
            {profile?.company?.address?.city}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ nhà">
            {profile?.address?.address}, {profile?.address?.city}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default Profile;
