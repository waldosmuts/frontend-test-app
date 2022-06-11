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
    // Voucher state declaration
    const [voucherData, setVoucherData] = useState({})
    const [showImagePreview, setShowImagePreview] = useState(false)
    const [voucherVariant, setVoucherVariant] = useState({})
    const [cashVoucherValue, setCashVoucherValue] = useState(0)
    const [displayPrice, setDisplayPrice] = useState("")

    // Maps through vouchersData to find the voucher using the Id as reference, returns null if not found
    useEffect(() => {
        async function getAndSetVoucherData() {
            const data = await vouchersData.find(voucher => voucher.id === Number(voucherId))
            setVoucherData(data || {})
        }

        if (vouchersData.length) {
            getAndSetVoucherData()
        }

    }, [vouchersData])

    // Sets the voucher price once voucherData has been set
    useEffect(() => {
        if (voucherData.price) {
            setDisplayPrice(voucherData.price.toLocaleString())
        }
    }, [voucherData])

    // Sets the voucher variant once voucherData has been set
    useEffect(() => {
        if (voucherData.hasOwnProperty("variants") && voucherData.variants.length) {
            setVoucherVariant(voucherData.variants[0])
        }
    }, [voucherData])

    // Sets the voucher initial value once voucherData has been set
    useEffect(() => {
        if (voucherData.voucherType === "cash-wildcard") {
            setCashVoucherValue(voucherData.price)
        }
    }, [voucherData])

    // Sets the voucher variant once voucherData has been set
    useEffect(() => {
        if (voucherData.voucherType === "cash-wildcard") {
            setDisplayPrice(cashVoucherValue.toLocaleString())
        }
    }, [cashVoucherValue])

    // Returns a loader component while loading
    if (!vouchersData.length) {
        return (
            <main>
                <div className="relative w-full h-full">
                    <div className="loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-14" />
                </div>
            </main>
        )
    }

    // Returns error message if voucher was not found
    if (Object.keys(voucherData).length === 0) {
        return (
            <main className="flex flex-col items-center justify-center font-montserrat">
                <h1 className="uppercase">That voucher could not be found or is no longer available</h1>
                <Link className="uppercase font-montserrat font-normal text-sm px-6 py-3 border border-y-tintswalo-primary border-x-transparent rounded text-tintswalo-primary hover:text-white hover:bg-tintswalo-primary hover:scale-110 transition duration-300 mt-6" to="/">Return Home</Link>
            </main>
        )
    }

    // Destructuring voucherData for easier access and readability
    const { name, hotelName, description, currency, voucherUrl, voucherImageUrl, voucherType, variants } = voucherData

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
    function handleChangeVoucherVariant(packageId) {
        const variant = variants.find(variant => variant.id === packageId)
        setVoucherVariant(variant)
        setDisplayPrice((Number(variant.price)).toLocaleString())
    }

    // Maps through variants and creats a radio option for each
    const VoucherRadioOptions = variants && variants.map(variant => {
        return (
            <RadioGroup.Option key={variant.id} className="cursor-pointer flex text-center focus:outline-none" value={variant.id}>
                {({ checked }) => (
                    <span className={`${checked ? 'text-white bg-tintswalo-primary' : 'text-tintswalo-primary'} w-full uppercase font-montserrat font-normal text-sm lg:text-lg px-4 lg:px-6 py-2 lg:py-3 border border-y-tintswalo-primary border-x-transparent rounded hover:text-white hover:bg-tintswalo-primary hover:scale-110 transition duration-300`}>{variant.name}</span>
                )}
            </RadioGroup.Option>
        )
    })

    // VoucherRadio component that handles the package selection
    const VoucherRadioGroup = voucherVariant.id ?
        (
            <RadioGroup className="flex flex-col w-full mb-6" value={voucherVariant.id} onChange={handleChangeVoucherVariant}>
                <RadioGroup.Label className="font-medium text-tintswalo-primary">Packages</RadioGroup.Label>
                <div className="mt-6 flex flex-col lg:flex-row gap-6">
                    {VoucherRadioOptions}
                </div>
            </RadioGroup>
        ) :
        null

    function handleVoucherAmountChange(e) {
        const newValue = Number(e.target.value)
        setCashVoucherValue(newValue)
    }

    const WildcardValue = (voucherData && voucherType === "cash-wildcard") ?
        (
            <div className="flex flex-col items-center w-full mt-6 uppercase font-montserrat font-normal">
                <label className="font-medium text-tintswalo-primary" htmlFor="voucher-amount">Amount</label>
                <div className="flex justify-between w-full text-sm lg:text-lg px-4 lg:px-6 py-2 lg:py-3 mt-6 border border-y-tintswalo-primary border-x-transparent rounded text-tintswalo-primary transition duration-300">
                    <span className="mr-2">{currency}</span>
                    <input onChange={handleVoucherAmountChange} min={voucherData.price} max="10000" value={cashVoucherValue} className="w-full focus:outline-none" type="number" name="voucher-amount" id="voucher-amount" />
                </div>
            </div>
        ) :
        null

    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <main className="flex justify-center w-full pt-32 lg:pt-24 pb-24 px-6 lg:px-12 xl:px-24 2xl:px-48 font-montserrat font-light relative">
            <Dialog open={showImagePreview} onClose={() => handleDialogClose()} className="flex justify-center items-center bg-black bg-opacity-25 backdrop-blur-sm w-screen h-screen fixed top-0 left-0 z-40">
                <Dialog.Panel>
                    <div className="relative rounded-lg overflow-hidden m-6">
                        <img src={optimizedImageUrl} alt="" />
                        <button onClick={handleDialogClose} className="stroke-white z-50 absolute top-6 right-6 bg-black bg-opacity-25 hover:bg-tintswalo-primary transition duration-300 p-2 rounded-full focus:outline-none">
                            <CloseIcon />
                        </button>
                    </div>
                </Dialog.Panel>
            </Dialog>
            <div className="flex flex-col items-center lg:items-stretch lg:flex-row lg:justify-between rounded-lg bg-white shadow-lg w-full max-w-6xl">
                <div className="flex flex-col items-start p-6 md:p-12 w-full order-2 lg:order-1">
                    <h1 className="text-center w-full lg:text-left text-xl md:text-2xl uppercase">{voucherVariant.name ? voucherVariant.name : name}</h1>
                    <h2 className="text-center w-full lg:text-left text-lg mt-6 lg:mt-0 capitalize font-medium text-tintswalo-primary">{hotelName} - {voucherType && voucherType.replace("-", " ")}</h2>
                    <div className="voucher--description text-center w-full lg:text-left mt-6 font-normal mx-auto lg:mx-0 max-w-lg text-sm lg:text-base" dangerouslySetInnerHTML={{ __html: description }} />
                    <form onSubmit={handleSubmit} className="mt-auto w-full">
                        {voucherType === "package" && (variants.length ? VoucherRadioGroup : null)}
                        {voucherType === "cash-wildcard" && WildcardValue}
                        <a href={voucherUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between w-full mt-6 uppercase font-montserrat font-normal text-sm lg:text-lg px-4 lg:px-6 py-2 lg:py-3 border border-y-tintswalo-primary border-x-transparent rounded text-tintswalo-primary fill-tintswalo-primary hover:text-white hover:bg-tintswalo-primary hover:fill-white hover:scale-110 transition duration-300"><span className="flex items-center gap-2">
                            <CartIcon /><span>Buy</span></span><span>{currency} {displayPrice || voucherData.price}</span>
                        </a>
                    </form>
                </div>
                <div className="w-full lg:w-[500px] h-[300px] md:h-[400px] lg:h-[500px] rounded-t-lg lg:rounded-lg lg:-mr-6 -mt-6 lg:mb-6 shrink-0 shadow-xl overflow-hidden relative order-1 lg:order-2">
                    <div onClick={handleDialogOpen} className="absolute bg-transparent hover:bg-black hover:bg-opacity-25 hover:backdrop-blur-sm transition duration-300 stroke-transparent hover:stroke-white flex items-center justify-center w-full h-full cursor-pointer z-10">
                        <EyeIcon />
                    </div>
                    <img className="object-cover object-center w-full h-full pointer-events-none" src={optimizedImageUrl} alt="" />
                </div>
            </div>
            <Link className="flex items-center gap-2 absolute left-6 top-6 z-10 uppercase font-montserrat font-normal text-sm px-6 py-3 border border-y-tintswalo-primary border-x-transparent rounded text-tintswalo-primary stroke-tintswalo-primary hover:text-white hover:bg-tintswalo-primary hover:stroke-white hover:stroke-2 hover:scale-110 transition duration-300" to="/">
                <ChevronLeftIcon />Vouchers
            </Link>
        </main>
    )
}