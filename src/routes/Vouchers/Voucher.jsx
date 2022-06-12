import { Link } from "react-router-dom"

export default function Voucher({ data }) {
    // Spreads data prop for better readability
    const { id, voucherImageUrl, hotelName, name, description, currency, price, voucherType, variants } = data
    // Using Imgix's API to change the width for images that are unneccesserely large
    const optimizedImageUrl = `${voucherImageUrl}?fit=clip&w=400`

    return (
        <article className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition duration-300 lg:hover:scale-110 relative">
            <Link to={`voucher/${id}`} className="h-60 overflow-hidden shadow-md relative">
                <div className="absolute right-3 top-3 z-10 bg-tintswalo-primary text-white uppercase text-xs font-normal rounded-full px-4 py-2">{voucherType.replace("-", " ")}</div>
                <img className="h-full w-full object-cover object-center align-middle hover:scale-110 transition duration-300" src={optimizedImageUrl} alt="" />
            </Link>
            <div className="flex flex-col grow">
                <span className="font-normal text-xs px-6 py-3 bg-tintswalo-primary text-white uppercase">{hotelName}</span>
                <Link to={`voucher/${id}`}>
                    <h4 className="text-lg leading-6 mx-6 mt-4 uppercase hover:text-tintswalo-primary">{name}</h4>
                </Link>
                <div className="mt-3 mx-6 font-medium text-neutral-500 text-sm relative flex flex-col justify-between h-full">
                    <div className="h-20 overflow-hidden pointer-events-none" dangerouslySetInnerHTML={{ __html: description }} />
                    <div className="h-20 absolute top-0 left-0 w-full bg-gradient-to-b from-transparent to-white pointer-events-none" />
                    <div className="flex items-end justify-between w-full mb-6 mt-12 lg:mt-6">
                        <div className="flex flex-col">
                            {(voucherType === "cash-wildcard" || variants.length) ? <span className="uppercase text-xs">Starting From</span> : false}
                            <span className="flex items-end text-sm font-medium">
                                <span className="leading-none">{currency}</span>
                                <span className="font-light text-xl leading-none ml-1 -mb-px">{price.toLocaleString()}</span>
                            </span>
                        </div>
                        <Link to={`voucher/${id}`}
                            className="uppercase font-montserrat font-normal text-sm px-4 lg:px-6 py-2 lg:py-3 border border-y-tintswalo-primary border-x-transparent rounded text-tintswalo-primary hover:text-white hover:bg-tintswalo-primary hover:scale-110 transition duration-300"
                        >More Info</Link>
                    </div>
                </div>
            </div>
        </article>
    )
}