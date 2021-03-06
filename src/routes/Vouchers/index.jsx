import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import scrollToTop from "../../utils/ScrollToTop"
import Header from "./Header"
import Main from "./Main"

export default function Vouchers() {
    scrollToTop()

    return (
        <div className="bg-neutral-100 min-h-screen flex flex-col justify-between scroll-smooth">
            <Navbar />
            <Header />
            <Main />
            <Footer />
        </div>
    )
}