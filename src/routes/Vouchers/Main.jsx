import { useContext } from "react"
import { AppContext } from "../../AppContext"
import Voucher from "./Voucher"

export default function Main() {
    // Gets isLoading and vouchersData from Provider in App.jsx to avoid prop drilling
    const { isLoading, vouchersData } = useContext(AppContext)
    // Maps through vouchersData and returns an array of components with the props of each voucher to be rendered
    const voucherElements = vouchersData.map(voucher => {
        const voucherData = { ...voucher }
        // Passes voucher data as props to Voucher component
        return <Voucher
            key={voucher.id}
            data={voucherData}
        />
    })

    // if isLoading is true, a loader will appear while the data is getting fetched
    return (
        <main className="font-montserrat font-light">
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