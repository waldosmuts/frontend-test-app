import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Main from "./Main"
import scrollToTop from "../../utils/ScrollToTop"

export default function Voucher() {
    scrollToTop()

    return (
        <div className="bg-neutral-100 min-h-screen flex flex-col justify-between items-center scroll-smooth">
            <Navbar />
            <Main />
            <Footer />
        </div>
    )
}