import axios from 'axios';
import React, { use, useRef, useState } from 'react'
import { API_PATH } from '../../_path.service';
import * as yup from "yup";
import { useMutation } from '@tanstack/react-query';
import { serviceLogin } from '../Services/authService';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup.string().required("Password wajib diisi"),
});

export default function SignInPage() {
    const refInput = useRef<any>({});
    const navigate = useNavigate();
    const [message, setMessage] = useState<any>("");
    
    const handleSubmit = () => {
    const listKeyRef = ["email", "password"];
    let objParams: any = {};
    listKeyRef.map((item) => {
      objParams[item] = refInput.current[item].value;
    });
    setMessage("");
    login.mutate(objParams);
    }

    const login:any = useMutation({
      mutationFn: serviceLogin,
      onSuccess: (data) => {
        const content = data?.content;
          localStorage.setItem("token", content?.token); // simpan token
          localStorage.setItem("user", JSON.stringify(content?.user));
          navigate("/admin");
          setMessage("✅ Login berhasil!");
      },
      onError: (error) => {
        setMessage("❌ Login gagal!");
      },
    })

    // console.log(login);
    

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <div className="text-5xl font-bold">Sign In to Nodewave</div>
          <div className="text-base text-[#92929D;]">
            Just sign in if you have an account in here. Enjoy our Website
          </div>
        </div>

        <form
          // onSubmit={handleSubmit}
          className="w-[32rem] max-w-md bg-white p-8 rounded-2xl shadow-xl"
        >
          <div className="mb-6">
            <label className="block text-blue-500 mb-1 text-base">
              Your Email / Username
            </label>
            <input
              type="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-blue-400 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="soeraji@squareteam.com"
              ref={(el: any) => (refInput.current["email"] = el)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-blue-500 mb-1 text-base">
              {/* {error ? "Enter Password" : "Password"} */}
              Password
            </label>
            <input
              type="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              // className={`w-full px-4 py-3 rounded-xl outline-none border ${
              //   error
              //     ? "border-red-500 focus:ring-2 focus:ring-red-300"
              //     : "border-blue-400 focus:ring-2 focus:ring-blue-500"
              // }`}
              className={`w-full px-4 py-3 rounded-xl outline-none border`}
              placeholder="Enter your password"
              ref={(el: any) => (refInput.current["password"] = el)}
            />
          </div>

          <div className="flex items-center justify-between mb-6 text-base">
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                //   checked={remember}
                //   onChange={() => setRemember(!remember)}
                className="accent-blue-500 w-4 h-4"
              />
              <span>Remember Me</span>
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password
            </a>
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

          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all"
            onClick={handleSubmit}
          >
            {login.isPending ? "Loading..." : "Sign In"}
          </button>

          <p className="mt-6 text-center text-base text-blue-600">
            Dont have an account?{" "}
            <a href="/register" className="font-semibold hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
