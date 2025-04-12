import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import ProfileIcon from '../../assets/navbar/Icon.webp';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import DestinationCard from '../../components/destination/destinationCard';
import imgURL from '../../util/imgURL';

const DetailUser = () => {
    const [user, setUser] = useState();
    const params = useParams();
    DestinationCard;
    useEffect(() => {
        (async () => {
            const response = await axios.get(`/api/user/${params.userId}`);
            setUser(response.data.data);
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
