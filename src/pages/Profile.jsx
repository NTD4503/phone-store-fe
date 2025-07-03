import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../redux/user/userThunk";
import Logo from "../assets/Logo.png";
import { Typography, Descriptions, Avatar, Spin, Alert } from "antd";

const { Title, Text } = Typography;

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, profile, loading, error, isLoggedIn } = useSelector(
    (state) => state.user
  );
  console.log("Profile component rendered", profile);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    } else if (!profile) {
      dispatch(fetchUserProfile());
    }
  }, [token, profile, dispatch, navigate]);

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spin tip="Đang tải thông tin..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex justify-center items-center">
        <Alert message="Lỗi" description={error} type="error" showIcon />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="h-full flex justify-center items-center">
        <Text strong>Bạn chưa đăng nhập.</Text>
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
