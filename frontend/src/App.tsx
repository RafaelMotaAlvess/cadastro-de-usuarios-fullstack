import { Route, Routes } from "react-router-dom"
import { Users } from "./pages/Users"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
    </Routes>
  )
}