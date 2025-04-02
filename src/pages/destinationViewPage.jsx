import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import DestinationViewHeader from "../components/destination/view/destinationHeader";
import DestinationContent from "../components/destination/view/destinationContent";
import Footer from "../components/footer";

import NotFound from './notFound';
import {showLoading, hideLoading} from '../stores/loadingReducer';

import Image1 from "../assets/gallery/image1.webp";
import Image2 from "../assets/gallery/image2.webp";
import Image3 from "../assets/gallery/lompatBatu.webp";
import Image4 from "../assets/gallery/rambuSolo.webp";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import ErrorConstant from "../util/errorConstant";


const DestinationViewPage = () => {

  const { destinationId } = useParams();
  const [destination, setDestination] = useState(null);
  const dispatch = useDispatch(); 

  useEffect(() => {
    return async () => {
      try {
        dispatch(showLoading('DestinationViewPageLoading'));
        await axios.get(`/api/destination/${destinationId}`) // TODO: LOADING
          .then(v => {
            setDestination(v.data.data || null);
          })
          .catch(console.err);
      } catch (e) {
          if (!(e instanceof AxiosError) || e.code !== ErrorConstant.ERR_BAD_REQUEST) {
            toast.error("Something went wrong, Please try again later.", {
              position: "top-right",
            });            
          }
        }
      dispatch(hideLoading('DestinationViewPageLoading'));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationId]);

  return destination ? ( // TODO: Fix the backend/this part so that the data match up (refer some of the || used below)
    <>
      <Navbar />
      <main className="flex flex-col px-10 pt-25 py-10 items-center bg-[#221122]">
        <DestinationViewHeader name={destination.name} image={destination.image} location={destination.location} province={destination.province} avgRating={destination.avgRating || 0} countRating={destination.countRating || 404} isWishlist={destination.isWishlisted} />
        <DestinationContent name={destination.name} detail={destination.detail} writer={destination.writer || 'Undefined'}/>
      </main>
      <Footer />
      <ToastContainer />
      </>
  ) : (
    <>
      <NotFound />
      <ToastContainer />
    </>
  );
};

export default DestinationViewPage;
