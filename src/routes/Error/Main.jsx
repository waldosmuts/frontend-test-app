import { Link } from "react-router-dom"

export default function Main() {
    // Returns error message if route was not found
    return (
        <main className="flex flex-col items-center justify-center font-montserrat">
            <h1 className="uppercase">Couldn't find the page you were looking for</h1>
            <Link className="uppercase font-montserrat font-normal text-sm px-6 py-3 border border-y-tintswalo-primary border-x-transparent rounded text-tintswalo-primary hover:text-white hover:bg-tintswalo-primary hover:scale-110 transition duration-300 mt-6" to="/">Return Home</Link>
        </main>
    )
}