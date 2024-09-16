import React from 'react'

function CustomBtn({title,onclick}) {
  return (
   <div className='w-fit ms-auto' onClick={onclick}>
   <button className='bg-blue-600 hover:bg-blue-700 t07 cp  text-white px-4 py-2 rounded-lg'> {title}</button>
 </div>
  )
}

export default CustomBtn