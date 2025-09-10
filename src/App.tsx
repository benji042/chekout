import { ASAP } from "@asap-crypto/react-sdk";
import "./index.css"

export default function App () {
  return (
    <>
      <div className="container">
        <ASAP amount={1000} currency="NGN" />
      </div>
    </>
  )
}