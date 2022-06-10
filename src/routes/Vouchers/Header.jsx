export default function Header() {
    return (
        <header className="font-montserrat font-light relative overflow-hidden">
            <div className="h-[400px] xl:h-[600px] bg-fixed bg-cover bg-no-repeat bg-bottom brightness-75" style={{ backgroundImage: "url(https://www.tintswalo.com/atlantic/wp-content/uploads/2022/01/Tintswalo-Atlantic-Luxury-Boutique-Hotel-Pool-Deck-Gallery-8.jpg)" }} />
            <div className="flex flex-col items-center px-6 gap-y-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-white uppercase">
                <h2 className="text-sm sm:text-base md:text-xl tracking-[0.025rem]">Tintswalo Atlantic</h2>
                <h1 className="text-xl sm:text-4xl md:text-6xl tracking-[1rem]">Gift Vouchers</h1>
                <h3 className="text-sm sm:text-base md:text-xl tracking-[0.025rem]">Treat yourself, and others, with a voucher</h3>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="rotate-45 w-5 h-5 border-[3px] border-transparent border-b-white border-r-white" />
            </div>
        </header>
    )
}