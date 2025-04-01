import React from 'react'
import Image5 from "../../assets/homePage/image5.webp";
import Image6 from "../../assets/homePage/image6.webp";
import Image7 from "../../assets/homePage/image7.webp";
import { motion } from "framer-motion";
import { fadeInUp } from '../../util/animation';
import { Link } from 'react-router-dom';
import SeeDetail from '../seeDetail';

const topDestination = () => {
  return (
    <>
      {/* Top Destination */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        variants={fadeInUp}
        className="relative flex flex-col items-center justify-center gap-4 py-12 px-8 lg:px-0 bg-[#252527] text-white"
      >
        <h1 className="font-inknut-antiqua lg:text-4xl text-2xl">
          <span className="text-[#FFA666]">Top</span> Destination
        </h1>
        <p className="font-quicksand lg:text-2xl text-xl text-center">
          Lorem Ipsum is simply dummy text of the printing and t
        </p>

        <div className="lg:w-5xl">
          <Link
            to="/destination"
            className="underline underline-offset-2 font-quicksand mb-4"
          >
            See More Destination
          </Link>
          <div className="flex flex-col lg:flex-row items-center gap-5">
            <SeeDetail
              image={Image5}
              title="Bromo Mountain"
              description="Lorem Ipsum is simply dummy text of the printing and f"
            />

            <SeeDetail
              image={Image6}
              title="Raja Ampat"
              description="Lorem Ipsum is simply dummy text of the printing and f"
            />

            <SeeDetail
              image={Image7}
              title="Komodo Island"
              description="Lorem Ipsum is simply dummy text of the printing and f"
            />
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default topDestination
