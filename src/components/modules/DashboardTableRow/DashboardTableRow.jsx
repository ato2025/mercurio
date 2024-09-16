import React, { useState } from 'react'
import TreeDotsIcon from '../../icons/TreeDotsIcon'

function DashboardTableRow({item}) {

   const [detailModal, setDetailModal] = useState(false)
  return (
    <>
     <tr className="border-0 relative h-10" >
                <th>{item.fullName}</th>
                <th>{item.entity}</th>
                <th className="hidden md:table-cell">{item.action}</th>
                <th className="hidden md:table-cell">{item.createdDate}</th>
                <th className="hidden md:table-cell">{item.hour}</th>
                <th
                  className="md:hidden"
                  onClick={() => setDetailModal((prev) => !prev)}
                >
                  <TreeDotsIcon />
                </th>
                {
                 detailModal && (
                  <table className='bg-[#0b0b0bcf] px-4 py-2 h-[20vh] rounded-lg w-1/2 absolute right-[30%] top-[35%]'>
                     <tr className='my-3'>
                        <th>Action</th>
                        <th>{item.action}</th>
                     </tr>
                     <tr className='my-3'>
                        <th>Date</th>
                        <th>{item.createdDate}</th>
                     </tr>
                     <tr className='my-3'>
                        <th>Hour</th>
                        <th>
                           {item.hour}
                        </th>
                     </tr>
                  </table>
                 )
                }
              </tr>
    </>
  )
}

export default DashboardTableRow