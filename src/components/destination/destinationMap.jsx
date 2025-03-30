import { React } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import DestinationFilter from './destinationTag';
import DestinationCard from './destinationCard';
import 'leaflet/dist/leaflet.css';

const DestinationMap = ({pos}) => {

  return (
    <div className='mt-16 flex flex-col w-full caret-transparent' >
      <h1 className='relative mx-auto mb-5 px-3 font-inknut-antiqua text-4xl tracking-wider w-fit text-center text-[#FFA666] font-semibold bg-[#221122]'>
        Explore Area
      </h1>
      <MapContainer center={pos} zoom={5} scrollWheelZoom={false} className="mx-auto bg-gray-500 w-full aspect-[12/4] rounded-md">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default DestinationMap;
