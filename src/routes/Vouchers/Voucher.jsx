import { Link } from "react-router-dom"

export default function Voucher({ data }) {
    // Spreads data 
    const { id, voucherImageUrl, hotelName, name, description, currency, price } = data
    // Using Imgix's API to change the width for images that are unneccesserely large
    const optimizedImageUrl = `${voucherImageUrl}?fit=clip&w=500`

    return (
        <article className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition duration-300 hover:scale-110 relative pb-24">
            <Link to={`voucher/${id}`} className="h-60 overflow-hidden shadow-md">
                <img className="h-full w-full object-cover object-center align-middle hover:scale-110 transition duration-300" src={optimizedImageUrl} alt="" loading="lazy" />
            </Link>
            <div className="flex flex-col">
                <span className="font-normal text-xs px-6 py-3 bg-tintswalo-primary text-white uppercase">{hotelName}</span>
                <Link to={`voucher/${id}`}>
                    <h4 className="text-lg mx-6 mt-4">{name}</h4>
                </Link>
                <div className="mt-3 h-20 overflow-hidden mx-6 font-medium text-neutral-500 text-sm relative">
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white" />
                </div>
                <div className="flex items-end justify-between w-full px-6 absolute bottom-6">
                    <span className="flex items-end text-sm font-medium">
                        <span className="leading-none">{currency}</span>
                        <span className="font-light text-xl leading-none ml-1 -mb-px">{price.toLocaleString()}</span>
                    </span>
                    <Link to={`voucher/${id}`}
                        className="uppercase font-montserrat font-normal text-sm px-6 py-3 border border-y-tintswalo-primary border-x-transparent rounded text-tintswalo-primary hover:text-white hover:bg-tintswalo-primary hover:scale-110 transition duration-300"
                    >More Info</Link>
                </div>
            </div>
        </article>
    )
}