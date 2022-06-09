import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Detects when pathname changes and scroll to the top when it does
export default function scrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}