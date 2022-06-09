import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Dialog, RadioGroup } from "@headlessui/react"
import { AppContext } from "../../AppContext"
import { CartIcon, ChevronLeftIcon, CloseIcon, EyeIcon } from "../../assets/Icons"
import "../../styles/voucher.css"

export default function Main() {
    // Gets isLoading and vouchersData from Provider in App.jsx
    const { isLoading, vouchersData } = useContext(AppContext)
    // Gets the Id from the route parameter which will be use to search for a matching voucher
    const { voucherId } = useParams()
    const [voucherData, setVoucherData] = useState({})
    const [showImagePreview, setShowImagePreview] = useState(false)
    const [voucherPackage, setVoucherPackage] = useState({ id: Number(voucherId) })
    const [displayPrice, setDisplayPrice] = useState("")

    // Maps through vouchersData to find the voucher using the Id as reference, returns null if not found
    useEffect(() => {
        async function getAndSetVoucherData() {
            const data = await vouchersData.find(voucher => {
                return voucher.id === Number(voucherId) ? voucher : false
            })
            setVoucherData(data)
        }
        getAndSetVoucherData()
    }, [vouchersData])

    // Returns error message if voucher was not found
    if (!voucherData) {
        return (
            <main className="flex flex-col items-center justify-center font-montserrat">
                <h1 className="uppercase">That voucher could not be found or is no longer available</h1>
                <Link className="uppercase font-montserrat font-normal text-sm px-6 py-3 border border-y-tintswalo-primary border-x-transparent rounded text-tintswalo-primary hover:text-white hover:bg-tintswalo-primary hover:scale-110 transition duration-300 mt-6" to="/">Return Home</Link>
            </main>
        )
    }

    // Destructuring voucherData for easier access and readability
    const {
        name,
        hotelName,
        description,
        currency,
        price,
        voucherUrl,
        voucherImageUrl,
        voucherType,
        variants
    } = voucherData

    // Using Imgix's API to change the width for images that are unneccesserely large
    const optimizedImageUrl = `${voucherImageUrl}?fit=clip&w=1000`

    // Opens Image Preview Dialog
    function handleDialogOpen() {
        setShowImagePreview(true)
    }

    // Closes Image Preview Dialog
    function handleDialogClose() {
        setShowImagePreview(false)
    }

    // Changes the selected voucher package
    function handleChangeVoucherPackage(packageId) {
        const variant = variants.find(variant => variant.id === packageId)
        setVoucherPackage(variant)
        setDisplayPrice(variant.price)
    }

    // Maps through variants and creats a radio option for each
    const VoucherRadioOptions = variants && variants.map(variant => {
        return (
            <RadioGroup.Option key={variant.id} className="cursor-pointer flex text-center focus:outline-none" value={variant.id}>
                {({ checked }) => (
                    <span className={`${checked ? 'text-white bg-tintswalo-primary' : 'text-tintswalo-primary'} w-full uppercase font-montserrat font-normal text-sm px-6 py-3 border border-y-tintswalo-primary border-x-transparent rounded hover:text-white hover:bg-tintswalo-primary hover:scale-110 transition duration-300`}>{variant.name}</span>
                )}
            </RadioGroup.Option>
        )
    })

    // VoucherRadio component that handles the package selection
    const VoucherRadio = VoucherRadioOptions && (
        <RadioGroup className="flex flex-col w-full mb-6" value={voucherPackage.id} onChange={handleChangeVoucherPackage}>
            <RadioGroup.Label className="font-medium text-tintswalo-primary">Packages</RadioGroup.Label>
            <div className="mt-6 flex gap-6">
                {VoucherRadioOptions}
            </div>
        </RadioGroup>
    )

    return (
        <main className="flex flex-col items-center p-24 font-montserrat font-light relative">
            <Dialog open={showImagePreview} onClose={() => handleDialogClose()} className="flex justify-center items-center bg-black bg-opacity-25 backdrop-blur-sm w-screen h-screen fixed top-0 left-0 z-40">
                <Dialog.Panel>
                    <div className="relative rounded-lg overflow-hidden">
                        <img src={optimizedImageUrl} alt="" />
                        <button onClick={handleDialogClose} className="stroke-white z-50 absolute top-6 right-6 bg-black bg-opacity-25 hover:bg-tintswalo-primary transition duration-300 p-2 rounded-full focus:outline-none">
                            <CloseIcon />
                        </button>
                    </div>
                </Dialog.Panel>
            </Dialog>
            <div className="flex rounded-lg bg-white shadow-lg">
                <div className="flex flex-col items-start p-12">
                    <h1 className="text-2xl uppercase">{name}</h1>
                    <h2 className="text-lg capitalize">{hotelName} - {voucherType.replace("-", " ")}</h2>
                    <div className="voucher--description mt-6 font-normal" dangerouslySetInnerHTML={{ __html: description }} />
                    {(variants.length) ? VoucherRadio : false}
                    <a href={voucherUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between w-full mt-auto uppercase font-montserrat font-normal text-sm px-6 py-3 border border-y-tintswalo-primary border-x-transparent rounded text-tintswalo-primary fill-tintswalo-primary hover:text-white hover:bg-tintswalo-primary hover:fill-white hover:scale-110 transition duration-300"><span className="flex items-center gap-2">
                        <CartIcon /><span>Buy</span></span><span>{currency} {displayPrice || voucherData.price}</span>
                    </a>
                </div>
                <div className="w-[500px] h-[500px] rounded-lg -mr-6 -mt-6 mb-6 ml-6 shrink-0 shadow-xl overflow-hidden relative">
                    <div onClick={handleDialogOpen} className="absolute bg-transparent hover:bg-black hover:bg-opacity-25 hover:backdrop-blur-sm transition duration-300 stroke-transparent hover:stroke-white flex items-center justify-center w-full h-full cursor-pointer z-10">
                        <EyeIcon />
                    </div>
                    <img className="object-cover object-center w-full h-full pointer-events-none" src={optimizedImageUrl} alt="" />
                </div>
            </div>
            <Link className="flex items-center gap-2 absolute left-6 top-6 z-30 uppercase font-montserrat font-normal text-sm px-6 py-3 border border-y-tintswalo-primary border-x-transparent rounded text-tintswalo-primary stroke-tintswalo-primary hover:text-white hover:bg-tintswalo-primary hover:stroke-white hover:stroke-2 hover:scale-110 transition duration-300" to="/">
                <ChevronLeftIcon />Vouchers
            </Link>
        </main>
    )
}