export const fadeInUp = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeIn" } },
};

export const slideInLeft = {
    hidden: { opacity: 0, translateX: "-5%" },
    visible: { opacity: 1, translateX: "0%", transition: { duration: 0.5, ease: "easeIn" } },
};


export const slideInRight = {
    hidden: { opacity: 0, translateX: "5%" },
    visible: { opacity: 1, translateX: "0%", transition: { duration: 0.5, ease: "easeIn" } },
};

export const slideInUp = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeIn" } },
};

export const slideInDown = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeIn" } },
};