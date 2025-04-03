import { React, useEffect, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
};
const DestinationMap = ({ pos, zoom, name, isSelected, provinces = [] }) => {
    return (
        <div className="items-center mt-12 md:mt-16 flex flex-col w-full caret-transparent">
            <h1 className="relative mx-auto mb-5 px-3 font-inknut-antiqua text-3xl md:text-4xl tracking-wider w-fit text-center text-[#FFA666] font-semibold bg-[#221122]">
                Explore available Provinces
            </h1>
            <MapContainer
                center={pos}
                zoom={zoom}
                scrollWheelZoom={true}
                className="bg-gray-500 w-full md:w-11/12 aspect-[1/2] md:aspect-[12/5] rounded-md"
            >
                {isSelected && <ChangeView center={pos} zoom={zoom} />}

                {isSelected ? (
                    <Marker position={pos}>
                        <Popup> {name}</Popup>
                    </Marker>
                ) : (
                    provinces.map((el) => (
                        <Marker position={[el.lat, el.long]} key={el.name}>
                            <Popup> {el.name}</Popup>
                        </Marker>
                    ))
                )}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    );
};

export default DestinationMap;
