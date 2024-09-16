import React, { useEffect, useState } from "react";
import TreeDotsIcon from "../../icons/TreeDotsIcon";

function AdminTableRow({item,editFunc,deleteProduct }) {
  const [isShowModal, setIsShowModal] = useState();


  return (
    <>
      <tr className="w-full" key={item.id}>
        <th className="text-white py-4 hidden lg:table-cell">{item.id}</th>
        {item.imageBase64 && (
          <th className="text-white py-4 hidden lg:table-cell">
            <div className="w-full h-full flex justify-center items-center">
              <img
                src={`data:image/jpg;base64,${item.imageBase64}`}
                className="w-16 h-10 rounded-md"
                alt=""
              />
            </div>
          </th>
        )}
        {item.category && (
          <th className="text-white py-4 hidden lg:table-cell">
            <div className="w-full h-full flex justify-center items-center">
              {item.category}
            </div>
          </th>
        )}
        <th className="text-white py-4">{item.title}</th>
        {/* <th className="text-white py-4 hidden lg:table-cell">
          <button className="bg-sky-500 px-4 py-2 rounded-lg">Edit</button>
        </th>
        <th className="text-white py-4 hidden lg:table-cell">
          <button className="bg-red-600 px-4 py-2 rounded-lg">Delete</button>
        </th> */}
        <th className="text-white py-4 ">
          <div className="w-full h-full flex justify-center items-center relative">
            <TreeDotsIcon
              onclick={() => {
                setIsShowModal((prev) => !prev);
              }}
            />
            {isShowModal && (
              <div className="absolute top-[-50%] right-2/3 rounded-lg bg-[#0000005c] px-4 py-2">
                <button className="bg-sky-500 my-1 w-20 px-4 py-2 rounded-lg" onClick={()=>{editFunc({...item})}}>
                  Edit
                </button>
                <br />
                <button className="bg-red-600 my-1 w-20 px-4 py-2 rounded-lg" onClick={()=>{deleteProduct(item.id)}} >
                  Delete
                </button>
              </div>
            )}
          </div>
        </th>
      </tr>
    </>
  );
}

export default AdminTableRow;
