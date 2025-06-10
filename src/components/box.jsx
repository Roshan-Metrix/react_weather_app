import React from 'react'

const Box = ({Name,Value}) => {
  return (
    <div className="p-4 w-32 bg-neutral-800 rounded-lg text-center">
        <p className="text-neutral-400">{Name}</p>
        <p className="text-white font-semibold">{Value}</p>
    </div>
  )
}
 export default Box;