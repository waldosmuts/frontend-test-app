import { EmailIcon, FacebookIcon, InstagramIcon, PhoneIcon, TripadvisorIcon } from "../assets/Icons"

export default function Footer() {
    return (
        <footer className="flex flex-col items-center w-full py-12 px-6 lg:px-12 xl:px-24 2xl:px-48 bg-gradient-to-r text-white from-teal-400 to-tintswalo-primary font-montserrat font-light">
            <div className="flex gap-x-3 items-center">
                <a className="fill-tintswalo-primary hover:fill-teal-200 transition duration-300" href="https://www.facebook.com/TintswaloAtlantic/" target="_blank" rel="noreferrer"><FacebookIcon /></a>
                <a className="fill-tintswalo-primary hover:fill-teal-200 transition duration-300" href="https://www.instagram.com/tintswalo_atlantic/?hl=en" target="_blank" rel="noreferrer"><InstagramIcon /></a>
                <a className="fill-tintswalo-primary hover:fill-teal-200 transition duration-300" href="https://www.tripadvisor.co.za/Hotel_Review-g469392-d1218468-Reviews-Tintswalo_Atlantic-Hout_Bay_Western_Cape.html" target="_blank" rel="noreferrer"><TripadvisorIcon /></a>
            </div>
            <div className="flex items-center flex-col md:flex-row gap-3 text-lg mt-12">
                <a className="hover:text-teal-200 transition duration-300 flex items-center gap-x-3 stroke-white hover:stroke-teal-200" href="tel:+27217730900"><PhoneIcon /><span>+27 21 773 0900</span></a>
                <a className="hover:text-teal-200 transition duration-300 flex items-center gap-x-3 stroke-white hover:stroke-teal-200" href="mailto:reservations@tintswalo.com"><EmailIcon /><span>reservations@tintswalo.com</span></a>
            </div>
            <div className="flex w-full items-center flex-col md:flex-row justify-center gap-x-3 text-sm font-normal mt-6 md:mt-3">
                <span>Challenge By <a className="hover:text-teal-200 transition duration-300 font-medium" href="https://www.in1solutions.com/" target="_blank" rel="noreferrer">In1 Solutions</a>.</span>
                <span>Coded By <a className="hover:text-teal-200 transition duration-300 font-medium" href="https://github.com/waldosmuts" target="_blank" rel="noreferrer">Waldo Smuts</a>.</span>
            </div>
        </footer>
    )
}