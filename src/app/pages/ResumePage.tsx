import classNames from 'classnames';
import React, { useState } from 'react'
import styled from 'styled-components';
// import classNames from "classnames";

export default function ResumePage() {
    const headerMenu =['About', 'Skills', 'Experience', "Projects", "Contact", "Resume"]
    const [activeMenu, setActiveMenu] = useState<string>(headerMenu[5]);

    const handleClickMenu = (menu: string) => {
      setActiveMenu(menu);  
    }
  return (
    <>
      <div className="divide-y divide-dashed border-b hover:bg-gray-50 py-2.5">
        <div className="container mx-auto">
          <div className="flex justify-between">
            <div className="font-semibold text-2xl">Portfolio</div>
            <div className="grid gap-1.5 grid-cols-6">
              {headerMenu.map((item, index) => (
                <ButtonMenu
                  className={classNames(
                    "text-xl w-20 hover:bg-red-300 hover:text-red-600 rounded-md py-1.5",
                    { active: item === activeMenu }
                  )}
                  key={index}
                  onClick={() => handleClickMenu(item)}
                >
                  {item}
                </ButtonMenu>
              ))}
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
}

const ButtonMenu = styled.button`
  &.active {
    background-color: rgb(254 226 226 / var(--tw-bg-opacity, 1));
    color: rgb(220 38 38 / var(--tw-text-opacity, 1));
    font-weight: 600;
  }
`;

