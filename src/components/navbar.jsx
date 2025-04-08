import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/navbar/finalLogo.webp';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, setData } from '../stores/userReducer';
import { AnimatePresence, motion } from 'framer-motion';
import defaultProfile from '../assets/icons/profile_outline.svg';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../components/dataDestination/deleteConfirm';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout', {}, { withCredentials: true });
            localStorage.removeItem('token');
            dispatch(setData());
        } catch (e) {
            console.log(e);
            toast.error('Something went wrong', {
                autoClose: 3000,
                position: 'top-right',
            });
        } finally {
            setShowLogoutConfirm(false);
        }
    };

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            window.scrollY > 50 ? setIsScrolled(true) : setIsScrolled(false);
        };

        // Handle body overflow when menu is open
        if (mobileMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [mobileMenuOpen]);

    return (
        <div>
            <ToastContainer />
            <div
                className={`fixed top-0 left-0 w-full transition-all duration-300 shadow-md z-50 py-4 ${
                    isScrolled
                        ? 'bg-[#252527] shadow-lg'
                        : 'bg-transparent backdrop-blur-md'
                }`}
            >
                <div className="flex justify-between items-center px-6 font-quicksand text-white">
                    {/* Logo */}
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Logo"
                            className="lg:w-48 w-38 h-auto mr-2"
                        />
                    </Link>

                    {/* Hamburger Menu Button */}
                    <button
                        className="lg:hidden flex items-center gap-1 hover:text-gray-300 transition"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <FaTimes className="text-2xl transform transition-transform duration-300" />
                        ) : (
                            <FaBars className="text-xl transform transition-transform duration-300" />
                        )}
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {/* ... (Desktop menu items sama seperti sebelumnya) */}
                        {/* Menu */}
                        <div className="hidden lg:flex items-center space-x-6">
                            <Link
                                to="/"
                                className={`hover:text-gray-300 transition ${
                                    location.pathname === '/'
                                        ? 'text-[#FFA666] font-bold'
                                        : ''
                                }`}
                            >
                                Home
                            </Link>

                            <Link
                                to="/destination"
                                className={`hover:text-gray-300 transition ${
                                    location.pathname === '/destination'
                                        ? 'text-[#FFA666] font-bold'
                                        : ''
                                }`}
                            >
                                Destination
                            </Link>

                            <Link
                                to="/culture"
                                className={`hover:text-gray-300 transition ${
                                    location.pathname === '/culture'
                                        ? 'text-[#FFA666] font-bold'
                                        : ''
                                }`}
                            >
                                Culture
                            </Link>

                            <Link
                                to="/gallery"
                                className={`hover:text-gray-300 transition ${
                                    location.pathname === '/gallery'
                                        ? 'text-[#FFA666] font-bold'
                                        : ''
                                }`}
                            >
                                Gallery
                            </Link>

                            <Link
                                to="/contact-us"
                                className={`hover:text-gray-300 transition ${
                                    location.pathname === '/contact-us'
                                        ? 'text-[#FFA666] font-bold'
                                        : ''
                                }`}
                            >
                                Contact Us
                            </Link>

                            {!user.id ? (
                                <Link
                                    to="/sign-in"
                                    className="px-4 py-2 border border-[#FFA666] rounded-md hover:bg-[#FFA666] hover:text-black transition"
                                >
                                    Sign In
                                </Link>
                            ) : (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() =>
                                            setIsOpen((prev) => !prev)
                                        }
                                        className="flex items-center gap-2 focus:outline-none cursor-pointer"
                                    >
                                        <img
                                            src={
                                                user.profileImage
                                                    ? new URL(
                                                          user.profileImage,
                                                          import.meta.env.VITE_STATIC_ASSET_BASE_URL,
                                                      ).href
                                                    : defaultProfile
                                            }
                                            alt="Profile"
                                            className="size-10 rounded-full border border-gray-300"
                                        />
                                        <FaChevronDown
                                            className={`text-lg transform transition-transform duration-300 ${
                                                isOpen
                                                    ? 'rotate-180'
                                                    : 'rotate-0'
                                            }`}
                                        />
                                    </button>

                                    <div
                                        className={`absolute right-0 mt-4 w-44 bg-[#252527] border-2 border-[#FFA666] rounded-md shadow-lg z-50 transition-all duration-300 ease-in-out transform ${
                                            isOpen
                                                ? 'opacity-100  translate-y-0 pointer-events-auto'
                                                : 'opacity-0 -translate-y-2 pointer-events-none'
                                        }`}
                                    >
                                        <Link
                                            to="/profile"
                                            className="block px-4 font-semibold py-2 text-sm hover:bg-[#FFA666]"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            to="/admin"
                                            className="block px-4 font-semibold py-2 text-sm hover:bg-[#FFA666]"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Admin
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setShowLogoutConfirm(true);
                                                setIsOpen(false);
                                            }}
                                            className="w-full font-semibold text-left px-4 py-2 text-sm text-red-500 hover:bg-[#FFA666] cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="lg:hidden fixed inset-0 z-40 flex justify-end"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 w-full bg-black/40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* Mobile Menu */}
                        <motion.div
                            className="overflow-y-auto w-1/2 max-w-sm h-screen shadow-xl fixed right-0 bg-[#252527] text-white mt-15 pt-10 px-6 flex flex-col"
                            initial={{ x: '100%' }}
                            animate={{
                                x: 0,
                                transition: { duration: 0.4, ease: 'easeOut' },
                            }}
                            exit={{
                                x: '100%',
                                transition: { duration: 0.3, ease: 'easeIn' },
                            }}
                        >
                            {/* USER INFO + DROPDOWN (TOP) */}
                            {user.id && (
                                <div className="mb-6">
                                    <button
                                        ref={buttonRef}
                                        onClick={() =>
                                            setIsOpen((prev) => !prev)
                                        }
                                        className="flex items-center gap-2 w-full focus:outline-none cursor-pointer"
                                    >
                                        <img
                                            src={
                                                new URL(
                                                    user.profileImage,
                                                    import.meta.env.VITE_STATIC_ASSET_BASE_URL,
                                                ).href || defaultProfile
                                            }
                                            alt="Profile"
                                            className="size-10 rounded-full border border-gray-300"
                                        />
                                        <span className="truncate">
                                            {user.name}
                                        </span>
                                        <FaChevronDown
                                            className={`text-lg transform transition-transform duration-300 ${
                                                isOpen
                                                    ? 'rotate-180'
                                                    : 'rotate-0'
                                            }`}
                                        />
                                    </button>

                                    {/* Dropdown muncul & dorong item di bawahnya */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                className="mt-4 bg-[#252527] border-2 border-[#FFA666] rounded-md shadow-lg"
                                                initial={{
                                                    opacity: 0,
                                                    y: -10,
                                                    height: 0,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    height: 'auto',
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: 0,
                                                    height: 0,
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Link
                                                    to="/profile"
                                                    className="block px-4 py-2 font-semibold text-sm hover:bg-[#FFA666]"
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                >
                                                    My Profile
                                                </Link>
                                                <Link
                                                    to="/admin"
                                                    className="block px-4 py-2 font-semibold text-sm hover:bg-[#FFA666]"
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                >
                                                    Admin
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setShowLogoutConfirm(true);
                                                        setIsOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2 font-semibold text-sm text-red-500 hover:bg-[#FFA666] cursor-pointer"
                                                >
                                                    Logout
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* MENU (MIDDLE) */}
                            <ul className="space-y-6 flex-grow max-h-fit">
                                {[
                                    { name: 'Home', path: '/' },
                                    {
                                        name: 'Destination',
                                        path: '/destination',
                                    },
                                    { name: 'Culture', path: '/culture' },
                                    { name: 'Gallery', path: '/gallery' },
                                    { name: 'Contact Us', path: '/contact-us' },
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                            transition: { delay: 0.1 * index },
                                        }}
                                    >
                                        <Link
                                            to={item.path}
                                            className={`block hover:text-gray-300 transition ${
                                                location.pathname ===
                                                    item.path &&
                                                'text-[#FFA666] font-bold'
                                            }`}
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                                {!user.id && (
                                    <motion.div
                                        className="mt-10"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            transition: { delay: 0.5 },
                                        }}
                                    >
                                        <Link
                                            to="/sign-in"
                                            className="block w-full px-4 py-2 border border-[#FFA666] rounded-md hover:bg-[#FFA666] hover:text-black text-center transition"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            Sign In
                                        </Link>
                                    </motion.div>
                                )}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <DeleteConfirmationModal
                isOpen={showLogoutConfirm}
                item={{ name: 'your session' }}
                title="Confirm Logout"
                message={
                    <>
                        Are you sure you want to loged out from {' '}
                        <span className="text-red-500 font-bold">
                            {user.username}
                        </span>
                        ?
                    </>
                }
                onCancel={() => setShowLogoutConfirm(false)}
                onConfirm={handleLogout}
                cancelText="Stay Logged In"
                confirmText="Yes, Logout"
                confirmBg="bg-red-600"
                confirmHover="hover:bg-red-800"
            />
        </div>
    );
};

export default Navbar;
