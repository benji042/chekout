import { ASAP } from "@asap-crypto/react-sdk";
import "./index.css"

export default function App () {
  return (
    <>
      <div className="container">
        <ASAP amount={2500} currency="NGN" />
      </div>
    </>
  )
}