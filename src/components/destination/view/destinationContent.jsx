import { useState, React } from "react";

import { motion } from "framer-motion";

const DestinationGroup = ({name, desc, writer}) => {

	return (
		<div className="text-white flex flex-col gap-5 w-full" >
			<hr className="opacity-25"></hr>
			<p className="font-quicksand text-lg font-semibold tracking-wider">{name}</p>
			<p className="font-quicksand font-light tracking-wide whitespace-pre-wrap">{desc}</p>
			<hr className="opacity-75"></hr>
			<div className="flex flex-row">
				<h2 className="text-xl font-inknut-antiqua font-black tracking-wider md:text-3xl">Written By</h2>
				<h3 className="ml-auto text-xl font-quicksand text-right md:text-2xl">{writer}</h3>
			</div>
		</div>
	);
}

export default DestinationGroup;
