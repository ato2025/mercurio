import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { divIcon } from 'leaflet';  
import { renderToString } from 'react-dom/server';
import LocationIcon from '../LocationIcon/LocationIcon';
function Map({height,loc}) {
  
       const position = loc

      const customIcon = divIcon({
        className: 'custom-marker-icon',
        html: renderToString(<LocationIcon />),
      })

  return (
       <>
       <div className={`w-full ${height} 
        overflow-hidden rounded-lg relative`}>

       <MapContainer center={position} zoom={15} scrollWheelZoom={true} style={{height:'100%',width:'100%'}} >
       <TileLayer
         attribution='<a href="https://www.sajjad.com">sajjad</a>'
         url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
       />
       <Marker position={position} icon={customIcon} >
       <Popup>
         <a href="geo:35.784705,51.444192">
          Direction
         </a>
        </Popup>
       </Marker>
     </MapContainer>

<a href={`geo:${position[0]},${position[1]}`} className='absolute right-0 bottom-0 z-[1000] bg-blue-500 text-white px-4 py-1 rounded-lg'>Diraction ...</a>
       </div>
       </>
        
      

  )
}

export default Map
