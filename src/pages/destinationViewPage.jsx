import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import DestinationViewHeader from '../components/destination/view/destinationHeader';
import DestinationContent from '../components/destination/view/destinationContent';
import Footer from '../components/footer';

import NotFound from './notFound';
import { showLoading, hideLoading } from '../stores/loadingReducer';

import Image1 from '../assets/gallery/image1.webp';
import Image2 from '../assets/gallery/image2.webp';
import Image3 from '../assets/gallery/lompatBatu.webp';
import Image4 from '../assets/gallery/rambuSolo.webp';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import ErrorConstant from '../util/errorConstant';

const DestinationViewPage = () => {
    const { destinationId } = useParams();
    const [destination, setDestination] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                dispatch(showLoading('DestinationViewPageLoading'));
                const response = (
                    await axios.get(`/api/destination/${destinationId}`)
                ).data;
                setDestination(response.data || null);
            } catch (e) {
                if (!(e instanceof AxiosError)) {
                    return toast.error(
                        'Something went wrong, Please try again later.',
                        {
                            position: 'top-right',
                        },
                    );
                }
                const response = e.response;
                if (
                    !response ||
                    response.data.payload.code !== ErrorConstant.ERR_NOT_FOUND
                ) {
                    await navigate('/not-found');
                }
            } finally {
                dispatch(hideLoading('DestinationViewPageLoading'));
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [destinationId]);

    return destination ? (
        // TODO: Fix the backend/this part so that the data match up (refer some of the || used below)
        <>
            <Navbar />
            <main className="flex flex-col px-10 pt-25 py-10 items-center bg-[#221122]">
                <DestinationViewHeader
                    id={destinationId}
                    name={destination.name}
                    image={[
                        [
                            new URL(
                                destination.image,
                                ' https://kesavamas.my.id',
                            ).href,
                        ],
                    ]}
                    location={destination.location}
                    province={destination.province}
                    avgRating={destination?.rating?.toFixed(1) || 0}
                    countRating={destination.ratingCount || 0}
                    isWishlist={destination.isWishlisted}
                    personalRating={destination.personalRating || 0}
                />
                <DestinationContent
                    name={destination.name}
                    detail={destination.detail}
                    writer={destination.writer}
                />
            </main>
            <Footer />
            <ToastContainer />
        </>
    ) : null;
};

export default DestinationViewPage;
