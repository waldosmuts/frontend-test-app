import { BrowserRouter, Routes, Route } from "react-router-dom"
import Vouchers from "./routes/Vouchers/index"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Vouchers />} />
        <Route path="voucher/:id" />
      </Routes>
    </BrowserRouter>
  )
}