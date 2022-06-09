import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppContext } from "./AppContext"
import Vouchers from "./routes/Vouchers/index"
import Voucher from "./routes/Voucher/index"

export default function App() {
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

  // isLoading and vouchersData will be passed to a Provider to avoid prop drilling
  return (
    <AppContext.Provider value={{ isLoading, vouchersData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Vouchers />} />
          <Route path="voucher/:voucherId" element={<Voucher />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}