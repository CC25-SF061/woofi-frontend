import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import DestinationHeaderGenerated from '../components/destination/view/destinationHeaderGenerated.jsx';
import DestinationContentGenerated from '../components/destination/view/destinationContentGenerated.jsx';
import Footer from '../components/footer.jsx';
import { ToastContainer } from 'react-toastify';
import { getDestination } from '../util/generatedDestinationManagement.js';

const DestinationViewPageGenerated = () => {
    const { destinationId } = useParams();
    const [destination, setDestination] = useState(null);
    const navigate = useNavigate();
    const refreshDestination = async () => {
        const destination = getDestination(destinationId);
        if (!destination) {
            await navigate('/not-found', { replace: true });
        }
        setDestination(destination);
    };

    useEffect(() => {
        refreshDestination();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [destinationId]);

    return destination ? (
        <>
            <Navbar />
            <main className="flex flex-col px-8 pt-20 py-10 items-center bg-[#221122]">
                <DestinationHeaderGenerated
                    name={destination.NameLocation}
                    image={[[destination.Foto]]}
                    location={destination.Alamat}
                    province={destination.Provinsi}
                    category={destination.interest}
                    rating={destination.Rating}
                />
                <DestinationContentGenerated
                    name={destination.name}
                    detail={destination.Penjelasan_English}
                    writer="System"
                />
            </main>
            <Footer />
            <ToastContainer />
        </>
    ) : (
        <ToastContainer />
    );
};

export default DestinationViewPageGenerated;
