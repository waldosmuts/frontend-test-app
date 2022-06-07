export default function Navbar() {
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
        return <a className="px-3 uppercase text-sm font-medium underline decoration-2 underline-offset-8 decoration-transparent hover:text-neutral-500 hover:decoration-neutral-500 transition-colors duration-500" key={item.id} href={item.href}>{item.text}</a>
    })

    return (
        <nav className="flex items-center justify-between pl-6 pr-12 py-6 font-montserrat font-light bg-white shadow-md">
            <a href="https://www.tintswalo.com/atlantic/"><img className="w-28" src="https://www.tintswalo.com/atlantic/wp-content/uploads/2021/12/tintswalo-atlantic-logo-008080.png" alt="Tintswalo Atlantic Logo" /></a>
            <div className="flex items-center">
                {navLinks}
            </div>
        </nav>
    )
}