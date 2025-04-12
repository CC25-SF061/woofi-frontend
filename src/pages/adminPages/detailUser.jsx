import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import ProfileIcon from '../../assets/navbar/Icon.webp';
import axios, { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import DestinationCard from '../../components/destination/destinationCard';
import imgURL from '../../util/imgURL';
import { toast } from 'react-toastify';
import ErrorConstant from '../../util/ErrorConstant';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../stores/loadingReducer';

const DetailUser = () => {
    const [user, setUser] = useState();
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const keyLoading = nanoid();
            try {
                dispatch(showLoading(keyLoading));
                const response = await axios.get(`/api/user/${params.userId}`);
                setUser(response.data.data);
            } catch (e) {
                if (!(e instanceof AxiosError)) {
                    return toast.error('Something went wrong', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
                const response = e?.response?.data?.payload;
                if (response?.errCode === ErrorConstant.ERR_NOT_FOUND) {
                    await navigate('/notfound', { replace: true });
                }
            } finally {
                dispatch(hideLoading(keyLoading));
            }
        })();
        // fetchUser();
    }, []);
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#221122] pt-24 px-5 md:px-10 text-white">
                <div className="max-w-6xl mx-auto bg-[#252527] rounded-lg shadow-lg p-8">
                    {/* Profile Section */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <img
                            className="rounded-full w-24 h-24 mb-3"
                            src={
                                user?.profile_image
                                    ? imgURL(user.profile_image)
                                    : ProfileIcon
                            }
                            alt="Profile"
                        />
                        <h1 className="text-2xl font-bold">{user?.name}</h1>
                        <p className="text-gray-400">{user?.username}</p>
                    </div>

                    <hr className="border-gray-600 mb-6" />

                    {/* Account Info */}
                    <h2 className="text-xl font-semibold mb-6 text-center">
                        Data destination
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5 w-full px-3 pb-5">
                        {/* List card here */}
                        {user?.destinations &&
                            user?.destinations.map((element, order) => (
                                <DestinationCard
                                    key={element.id}
                                    id={element.id}
                                    order={order}
                                    picture={
                                        new URL(
                                            element.image,
                                            import.meta.env.VITE_STATIC_ASSET_BASE_URL,
                                        ).href
                                    }
                                    name={element.name}
                                    isWishlisted={element.isWishlisted}
                                    detail={element.detail}
                                    rating={element.rating}
                                    // onclick={onCardClick}
                                    // onRequestDelete={(source) =>
                                    //     handleRequestDelete(source, element.id)
                                    // }
                                />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailUser;
