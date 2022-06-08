import { useEffect, useState } from "react"
import Voucher from "./Voucher"

export default function Main() {
    const [isLoading, setIsLoading] = useState(true)
    const [vouchersData, setVouchersData] = useState([])

    // Async get function gets vouchersData from URL and changes the state to reflect the changes
    useEffect(() => {
        const url = "https://shop.bookin1.com/api/property/11128/allvouchers"

        async function getAndSetVouchersData() {
            const res = await fetch(url)
            const data = await res.json()
            setVouchersData(data.vouchers)
            setIsLoading(false)
        }

        getAndSetVouchersData()
    }, [])

    // Maps through vouchersData and returns an array of components with the props of each voucher to be rendered
    const voucherElements = vouchersData.map(voucher => {
        const voucherData = { ...voucher }

        return <Voucher
            key={voucher.id}
            data={voucherData}
        />
    })

    return (
        <main className="font-montserrat font-light">
            <div className="relative overflow-hidden">
                <img className="h-[500px] object-cover w-full brightness-75" src="https://www.tintswalo.com/atlantic/wp-content/uploads/2022/01/Tintswalo-Atlantic-Luxury-Boutique-Hotel-Pool-Deck-Gallery-8.jpg" alt="" />
                <div className="flex flex-col items-center gap-y-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-white uppercase">
                    <h2 className="text-xl tracking-[0.025rem]">Tintswalo Atlantic</h2>
                    <h1 className="text-6xl tracking-[1rem]">Gift Vouchers</h1>
                    <h3 className="text-xl tracking-[0.025rem]">Treat yourself, and others, with a voucher</h3>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="rotate-45 w-5 h-5 border-[3px] border-transparent border-b-white border-r-white" />
                </div>
            </div>
            {
                isLoading
                    ?
                    <div className="relative w-full h-[300px]">
                        <div className="loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-14" />
                    </div>
                    :
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-12 relative p-24">
                        {voucherElements}
                    </div>
            }


        </main>
    )
}