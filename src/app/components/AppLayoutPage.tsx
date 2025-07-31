import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import CheronDoubleLeftIcon from '../../asset/icon/CheronDoubleLeftIcon';
import HomeIcon from '../../asset/icon/HomeIcon';
import LogoutIcon from '../../asset/icon/LogoutIcon';

export default function AppLayoutPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

 function Header() {
  const userStorage:any = localStorage.getItem("user");
  const user = JSON.parse(userStorage);
  return (
    <header className="h-14 bg-white shadow-md px-6 flex items-center justify-end border-b">
      <div className="flex items-center space-x-3">
        <span className="font-bold text-base capitalize">{user?.fullName}</span>
        <div className="relative">
          <img
            src="https://i.pravatar.cc/40?img=41"
            alt="Avatar"
            className="w-9 h-9 rounded-full"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
        </div>
      </div>
    </header>
  );
}

function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    // aksi logout bisa hapus token + redirect
    // console.log("Logout clicked");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } transition-all duration-300 bg-white shadow-md h-full border-r relative flex flex-col h-screen`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-4 top-4 z-10 bg-white border border-gray-300 rounded-full p-1 shadow-md"
      >
        {isOpen ? <CheronDoubleLeftIcon /> : <CheronDoubleLeftIcon />}
      </button>

      <div className="p-4 font-bold text-lg">{isOpen ? "Nodewave" : "N"}</div>

      <nav className="flex-1 mt-4">
        <ul>
          <li className="px-4 py-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <HomeIcon />
            {isOpen && <span>To Do</span>}
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-gray-700 hover:text-red-600 w-full"
        >
          <LogoutIcon />
          {isOpen && <span>Keluar</span>}
        </button>
      </div>
    </aside>
  );
}


