import { React } from "react";
import { motion } from "framer-motion";

const DestinationGroup = ({images, onClick}) => {

	switch(images.length) {
		case 1:
			return <img 
					className={ 'w-full h-[26rem] rounded-xl cursor-pointer object-cover' }
					src={images[0]}
					onMouseUp={onClick}
				/>;
		case 2:
			return (<div className="grid grid-cols-2 gap-2 cursor-pointer" onMouseUp={onClick}>
				<img 
				className="w-full h-[26rem] rounded-xl max-h-96 object-cover"
				src={images[0]}
				/>
				<img 
					className="w-full h-[26rem] rounded-xl max-h-96 object-cover"
					src={images[1]} 
				/>
			</div>);
		default:
			return (<div className="flex flex-row gap-2 cursor-pointer items-stretch" onMouseUp={onClick}>
				<img 
					className="w-full h-[26rem] rounded-xl object-cover max-h-[30rem]"
					src={images[0]}
				/>
				<div className="flex flex-col gap-2 justify-evenly">
					<img 
						className="w-full h-[12.5rem] rounded-xl object-cover"
						src={images[1]}
					/>
					<img 
						className="w-full h-[12.5rem] rounded-xl object-cover"
						src={images[2]}
					/>
				</div>
			</div>);
	}	
}

export default DestinationGroup;
