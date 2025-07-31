import classNames from 'classnames';
import React, { use, useRef, useState } from 'react'
import styled from 'styled-components';
import EyeSlashIcon from '../../../asset/icon/EyeSlashIcon';
import EyeIconV2 from '../../../asset/icon/EyeIconV2';
import axios from 'axios';
import { API_PATH } from '../../_path.service';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { serviceRegister } from '../Services/authService';

export default function RegisterPage() {
  const refInput = useRef<any>({});
  const [errors, setErrors] = useState<any>({});
  const [currentPassword, setCurrentPassword] = useState<string>();
  const [isCurrentPassword, setIsCurrentPassword] = useState<boolean>(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const validateForm = (is:boolean = false) => {
    if(!is) return;
    const errors: any = {};
    const listKey = [
      "first_name",
      "last_name",
      "email",
      "password",
    ];

    listKey?.map((obj: any) => {
      if (!Boolean(refInput.current[obj].value)) {
        errors[obj] = "Wajib diisi";
        return
      }
      if(obj === "email"){
        const v = refInput.current[obj].value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
          errors[obj] = "Masukan email dengan benar";
          return
        }
      }
    })
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSubmit = () => {
    if(!validateForm(true)) return;
      const listKeyRef = [
        "email",
        "password",
      ];
    
    let objParams: any = {};
    listKeyRef.map((item) => {
      objParams[item] = refInput.current[item].value
    })

    const firstName = refInput.current["first_name"].value || "";
    const lastName = refInput.current["last_name"].value || "";
    objParams["fullName"] = `${firstName} ${lastName}`.trim(); 
    
    register.mutate(objParams);
  }


const register = useMutation({
  mutationFn: serviceRegister,
  onSuccess: (data:any) => {
    setMessage("✅ Pendaftaran berhasil!");
    // localStorage.setItem("token", data?.token || ""); // simpan token jika ada
    console.log(data);
  },
  onError: (err: any) => {
    setMessage(err?.message || "❌ Pendaftaran gagal.");
  },
});

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <div className="text-5xl font-bold">Register</div>
          <div className="text-base text-[#92929D;]">
            Let’s Sign up first for enter into Square Website. Uh She Up!
          </div>
        </div>

        <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-base text-gray-500">First Name</label>
              <Input
                type="text"
                className={classNames(
                  "w-full text-base mt-1 px-4 py-3 border border-blue-400 rounded-xl outline-none focus:ring-2 focus:ring-blue-500",
                  { error: !!errors?.first_name }
                )}
                placeholder="First Name"
                ref={(el: any) => (refInput.current["first_name"] = el)}
                onChange={() => validateForm(true)}
              />
              {!!errors?.first_name && (
                <div className="text-base mt-1 text-red-500">
                  {errors?.first_name}
                </div>
              )}
            </div>
            <div>
              <label className="text-base text-gray-500">Last Name</label>
              <Input
                type="text"
                className={classNames(
                  "w-full text-base mt-1 px-4 py-3 border border-blue-400 rounded-xl outline-none focus:ring-2 focus:ring-blue-500",
                  { error: !!errors?.last_name }
                )}
                placeholder="Last Name"
                ref={(el: any) => (refInput.current["last_name"] = el)}
                onChange={() => validateForm(true)}
              />
              {!!errors?.last_name && (
                <div className="text-base mt-1 text-red-500">
                  {errors?.last_name}
                </div>
              )}
            </div>

            <div>
              <label className="text-base text-gray-500">Phone Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 bg-gray-100 border rounded-l-xl text-blue-500 text-base">
                  +62
                </span>
                <input
                  type="number"
                  className="w-full text-base  px-4 py-3 border border-l-0 rounded-r-xl outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div>
              <label className="text-base text-gray-500">Your Country</label>
              <select className="w-full text-base mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                <option className="text-base" value="">
                  Select Country
                </option>
                <option className="text-base" value="id">
                  Indonesia
                </option>
                <option className="text-base" value="us">
                  United States
                </option>
                <option className="text-base" value="uk">
                  United Kingdom
                </option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-base text-gray-500">Email Address</label>
              <div className="flex">
                <Input
                  type="text"
                  className={classNames(
                    "w-full text-base mt-1 px-4 py-3 border border-blue-400 rounded-l-xl outline-none focus:ring-2 focus:ring-blue-500",
                    { error: !!errors?.email }
                  )}
                  placeholder="yourname"
                  ref={(el: any) => (refInput.current["email"] = el)}
                  onChange={() => validateForm(true)}
                />
                <span className="inline-flex items-center px-4 border border-l-0 rounded-r-xl bg-gray-100 text-base text-gray-500">
                  @gmail.com
                </span>
              </div>
              {!!errors?.email && (
                <div className="text-base mt-1 text-red-500">
                  {errors?.email}
                </div>
              )}
            </div>

            <div>
              <label className="text-base text-gray-500">Password</label>
              <div className="relative">
                <Input
                  type={isCurrentPassword ? "text" : "password"}
                  className={classNames(
                    "w-full text-base mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500",
                    {
                      error: !!errors["password"],
                    }
                  )}
                  placeholder="Password"
                  ref={(el: any) => (refInput.current["password"] = el)}
                  onChange={() => validateForm(true)}
                />
                {!!errors?.password && (
                  <div className="text-base mt-1 text-red-500">
                    {errors?.password}
                  </div>
                )}
                <div
                  className="absolute right-4 top-4 text-gray-400 cursor-pointer"
                  onClick={() => setIsCurrentPassword(!isCurrentPassword)}
                >
                  {isCurrentPassword ? <EyeIconV2 /> : <EyeSlashIcon />}
                </div>
              </div>
            </div>
            <div>
              <label className="text-base text-gray-500">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={isConfirmPassword ? "text" : "password"}
                  className={classNames(
                    "w-full text-base mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500",
                    {
                      error:
                        currentPassword !== refInput.current["password"]?.value,
                    }
                  )}
                  placeholder="Confirm Password"
                  onChange={(e: any) => setCurrentPassword(e.target.value)}
                />
                {currentPassword !== refInput.current["password"]?.value && (
                  <div className="text-base mt-1 text-red-500">
                    Password tidak cocok
                  </div>
                )}
                <div
                  className="absolute right-4 top-4 text-gray-400 cursor-pointer"
                  onClick={() => setIsConfirmPassword(!isConfirmPassword)}
                >
                  {isConfirmPassword ? <EyeIconV2 /> : <EyeSlashIcon />}
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="text-base text-gray-500 text-base">
                Tell us about yourself
              </label>
              <textarea
                className="w-full text-base mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Hello my name..."
              />
            </div>
          </div>

          {message && (
            <p
              className={`text-base mb-4 ${
                message.includes("berhasil") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl"
              onClick={() => navigate("/signin")}
            >
              Login
            </button>
            <button
              type="button"
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export const Input = styled.input`
  &.error{
    border: 1px solid red;
    color: red;
    background-color: rgb(254 226 226 / var(--tw-bg-opacity, 1));
  }
`;