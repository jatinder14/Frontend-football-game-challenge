import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
const ErrorMessage: React.FC = () => {
  const navigate = useNavigate(); 
  return (
    <>
        <tr>
          <td colSpan={9} className="text-center">
            <div className="h-[460px] flex flex-col justify-center items-center">
              <h4 className="text-center text-lg leading-[27px] font-semibold flex items-center gap-2">
                <img
                  src="/image/triangle-exclamation.svg"
                  width={23}
                  height={23}
                  alt="exclamation"
                />
                No Player data found
              </h4>
              <p className="text-accent text-sm font-normal leading-[22px] mt-2">
                please import your roster first
              </p>
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={() => navigate("/")}
                  className="py-3 px-5 rounded-lg text-lightWhite focus:outline-none text-sm leading-[21px] font-medium border bg-transparent border-accent"
                >
                  Go to Import List Page
                </button>
              </div>
            </div>
          </td>
        </tr>
    </>
  );
};

export default ErrorMessage;