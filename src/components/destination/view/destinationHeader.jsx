import { useState, React } from "react";

import StarFull from "../../../assets/icons/ratestar/full.svg";
import StarHalf from "../../../assets/icons/ratestar/half.svg";
import StarEmpty from "../../../assets/icons/ratestar/empty.svg";
import WishlistEmpty from "../../../assets/icons/wishlist/empty.svg";
import Wishlisted from "../../../assets/icons/wishlist/full.svg";
import DestinationCollage from "./destinationCollage"; 
import { motion } from "framer-motion";

import countStars from "../../../util/starRating";

const DestinationGroup = ({name, images, location, province, avgRating, countRating, isWishlist}) => {

	const [rating, setRating] = useState(avgRating);
	const [wishlist, setWishlist] = useState(isWishlist);

	const {whole_rating, has_half_rating, empty_rating} = countStars(rating);

	function handleShowMoreImages() {
		// TODO: Navigate to image previews page
	}
	function handleWishlist() {
		setWishlist(!wishlist); // TODO: Send data to backend (boolean)
	}
	function handleRating(value) {
		setRating(value); // TODO: Send data to backend (int; 1 2 3 4 5)
	}

	return (
		<div className="text-white flex flex-col w-full mb-4 gap-4" >
			<div className="flex flex-row gap-4 items-center">
				<h1 className="font-inknut-antiqua font-normal text-lg md:font-semibold md:text-3xl">{name}</h1>
				<motion.div
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.25, ease: "backOut", delay: 0 }}
					whileHover={{ scale: 1.25 }}
					whileTap={{ scale: 0.95 }}
					className="cursor-pointer caret-transparent flex-none"
					onMouseUp={ handleWishlist }
				>
					<img aria-hidden src={wishlist ? Wishlisted : WishlistEmpty} width="28"/>
				</motion.div>
				<motion.div className="p-1 px-4 ml-auto text-white font-light text-sm border-[1px] border-white border-solid rounded-lg cursor-pointer hover:bg-[#ffffff44] caret-transparent text-nowrap" onMouseUp={ handleShowMoreImages }>
					Show all Views
				</motion.div>
			</div>
			<DestinationCollage images={images} onClick={handleShowMoreImages}></DestinationCollage>
			<div className="flex flex-row">
				<div className="font-quicksand text-sm md:text-2xl pr-8">
					<p className="text-white">{location}</p>
					<p className="text-[#bbb] font-light">{province}</p>
				</div>
				<div className="flex flex-col ml-auto">
					<div className="flex flex-row gap-2 md:gap-4">
						{
							Array.from({length: whole_rating}).map((_, i) => {
								return (
									<motion.div
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.25, ease: "backOut", delay: 0 }}
										whileHover={{ scale: 1.15 }}
										whileTap={{ scale: 0.95 }}
										className="cursor-pointer caret-transparent min-w-6"
										onMouseUp={() => handleRating(1+i)}
									>
										<img src={StarFull} width="33"/>
									</motion.div>
								)
							})
						}
						{
							has_half_rating ? (
								<motion.div
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.25, ease: "backOut", delay: 0 }}
									whileHover={{ scale: 1.15 }}
									whileTap={{ scale: 0.95 }}
									className="cursor-pointer caret-transparent min-w-6"
									onMouseUp={() => handleRating(whole_rating+1)}
								>
									<img src={StarHalf} width="33"/>
								</motion.div>
							) : null
						}
						{
							Array.from({length: empty_rating}).map((_, i) => {
								return (
									<motion.div
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.25, ease: "backOut", delay: 0 }}
										whileHover={{ scale: 1.15 }}
										whileTap={{ scale: 0.95 }}
										className="cursor-pointer caret-transparent min-w-6"
										onMouseUp={() => handleRating(1 + i + whole_rating + (has_half_rating ? 1 : 0))}
									>
										<img src={StarEmpty} width="33"/>
									</motion.div>
								)
							})
						}
					</div>
					<p className="text-[#FFA666] text-right text-xl font-quicksand tracking-wider">{avgRating}  ·  <span className="text-[#FFA666DD] text-base tracking-normal">{countRating} ratings</span></p>
				</div>
			</div>
		</div>
	);
}

export default DestinationGroup;
