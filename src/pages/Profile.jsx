import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { toast } from "react-toastify";
import { getUserProfile } from "../services/UserService";
import { BreadcrumbsWithIcon } from "../components/BeardScrumb";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (token) {
      getUserProfile(token)
        .then((data) => setProfile(data))
        .catch(() => {
          toast.error("Không thể tải thông tin người dùng.");
        });
    }
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg">Bạn chưa đăng nhập.</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg">Đang tải thông tin...</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto sm:rounded-lg bg-white p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 px-4">My Profile</h1>

      <div className="bg-white rounded-lg p-6 max-w-3xl mx-auto space-y-6">
        <div className="flex items-center space-x-6">
          <img
            src={profile.image || Logo}
            alt="Avatar"
            className="w-40 h-40 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold">
              {profile.firstName} {profile.lastName}
            </h2>

            <p className="text-gray-700">{profile.email}</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-40 font-semibold text-gray-700">Ngày sinh:</div>
          <div className="text-gray-800">
            {profile.birthDate || "Chưa cập nhật"}
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-40 font-semibold text-gray-700">Giới tính:</div>
          <div className="capitalize text-gray-800">
            {profile.gender || "Chưa cập nhật"}
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-40 font-semibold text-gray-700">Nơi làm việc:</div>
          <div className="capitalize text-gray-800">
            {profile?.company?.address?.address},{" "}
            {profile?.company?.address?.city}
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-40 font-semibold text-gray-700">Địa chỉ nhà:</div>
          <div className="capitalize text-gray-800">
            {profile.address.address}, {profile.address.city}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
