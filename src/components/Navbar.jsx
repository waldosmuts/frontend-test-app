import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CloseIcon, MenuIcon } from "../assets/Icons"
import { Transition } from "@headlessui/react"

export default function Navbar() {
    const [showNav, setShowNav] = useState(false)

    // Creating an array for all the anchors in the navbar for easier styiling and reading
    const navData = [
        {
            id: 1,
            href: "https://www.tintswalo.com/atlantic/",
            text: "Home"
        },
        {
            id: 2,
            href: "https://www.tintswalo.com/atlantic/",
            text: "Experience"
        },
        {
            id: 3,
            href: "https://www.tintswalo.com/atlantic/events/",
            text: "Events"
        },
        {
            id: 4,
            href: "https://www.tintswalo.com/atlantic/atlantic-diaries-blog/",
            text: "Atlantic Diaries"
        },
        {
            id: 5,
            href: "https://www.nightsbridge.co.za/bridge/book?bbid=23208",
            text: "Reservations"
        },
        {
            id: 6,
            href: "https://www.tintswalo.com/atlantic/gallery/",
            text: "Gallery"
        },
        {
            id: 7,
            href: "https://tintswalo.com/atlantic/wp-content/uploads/Tintswalo-Atlantic-Domestic-Specials-20-Dec-to-30-April-TA.pdf",
            text: "Promotions"
        },
        {
            id: 8,
            href: "https://www.tintswalo.com/atlantic/contact/",
            text: "Contact"
        },
    ]

    // Using the navData array to put the elements in an array, this allows me to change the style for all elements in one place
    const navLinks = navData.map(item => {
        return <a className="px-3 uppercase text-sm font-medium underline decoration-2 underline-offset-8 decoration-transparent hover:text-tintswalo-primary hover:decoration-tintswalo-primary transition-colors duration-300" key={item.id} href={item.href}>{item.text}</a>
    })

    function toggleNav() {
        setShowNav(prevState => !prevState)
    }

    useEffect(() => {
        if (window.innerWidth > 1280) setShowNav(true)
        window.addEventListener("resize", () => {
            if (window.innerWidth > 1280) {
                setShowNav(true)
            } else {
                setShowNav(false)
            }
        })
    }, [])

    return (
        <nav className="flex items-center justify-between pl-6 pr-12 py-6 font-montserrat font-light bg-white shadow-md w-full z-20">
            <Link to="/"><img className="w-28" src="https://www.tintswalo.com/atlantic/wp-content/uploads/2021/12/tintswalo-atlantic-logo-008080.png" alt="Tintswalo Atlantic Logo" /></Link>
            <Transition
                show={showNav}
                className="fixed top-0 left-0 h-screen xl:h-auto xl:static z-30 origin-left"
                enter="transition duration-300 xl:transition-none"
                enterFrom="scale-x-0"
                enterTo="scale-x-1"
                leave="transition duration-300"
                leaveFrom="scale-x-1"
                leaveTo="scale-x-0"
            >
                <div className="flex items-center justify-start xl:justify-center gap-y-6 xl:gap-y-0 flex-col py-16 xl:py-0 px-16 xl:p-0 top-0 left-0 xl:flex-row h-screen w-screen sm:w-auto xl:h-auto bg-white shadow-xl xl:shadow-none xl:bg-transparent">
                    <button onClick={toggleNav} className="absolute top-6 right-6 stroke-tintswalo-primary xl:hidden"><CloseIcon /></button>
                    <Link to="/" className="mb-12 xl:hidden"><img className="w-44" src="https://www.tintswalo.com/atlantic/wp-content/uploads/2021/12/tintswalo-atlantic-logo-008080.png" alt="Tintswalo Atlantic Logo" /></Link>
                    {navLinks}
                </div>
            </Transition>
            <Transition
                className="bg-black w-screen h-screen fixed top-0 left-0 z-20 hidden sm:block xl:hidden"
                show={showNav}
                enter="transition-opacity duration-75 xl:transition-none"
                enterFrom="opacity-0"
                enterTo="opacity-25"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-25"
                leaveTo="opacity-0"
            />
            <button onClick={toggleNav} className="stroke-tintswalo-primary xl:hidden"><MenuIcon /></button>
        </nav>
    )
}