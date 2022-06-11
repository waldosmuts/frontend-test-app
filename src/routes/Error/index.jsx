import Navbar from "../../components/Navbar"
import Main from "./Main"
import Footer from "../../components/Footer"
import scrollToTop from "../../utils/ScrollToTop"

export default function Error() {
    scrollToTop()

    return (
        <div className="bg-neutral-100 min-h-screen flex flex-col justify-between scroll-smooth">
            <Navbar />
            <Main />
            <Footer />
        </div>
    )
}