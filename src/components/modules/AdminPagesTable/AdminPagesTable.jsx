import React from 'react'
import Skeleton from '../Skeleton/Skeleton'
import AdminTableRow from '../AdminTableRow/AdminTableRow'

function AdminPagesTable({data,dataLoding,editFunc,deleteProduct }) {

  return (
    <>
    <div className='w-full h-[60vh] overflow-y-auto my-10 rounded-lg relative '>
      <table className="w-full h-full bg-[#8080804b]   rounded-lg   ">
            <tr className="w-full border-b border-gray-500 sticky bg-[#04040499] top-0 left-0">
              <th className="text-white py-4 hidden lg:table-cell">Id</th>
              {
               data[0] && data[0].imageBase64 ? (
                  <th className="text-white py-4 hidden lg:table-cell">Image</th>
                ) :null
              }    
                 {
               data[0] && data[0].category ? (
                  <th className="text-white py-4 hidden lg:table-cell">Category</th>
                ) :null
              }         
              <th className="text-white py-4">Name</th>
              {/* <th className="text-white py-4 hidden lg:table-cell">Edit</th>
              <th className="text-white py-4 hidden lg:table-cell">Delete</th> */}
              <th className="text-white py-4 ">More </th>
            </tr>
            {dataLoding ? (
              <Skeleton count={3} />
            ) : (
              data.map((category) => <AdminTableRow editFunc={editFunc} deleteProduct ={deleteProduct } key={category.id} item={category} />)
            )}
          </table>
          </div>
    </>
  )
}

export default AdminPagesTable