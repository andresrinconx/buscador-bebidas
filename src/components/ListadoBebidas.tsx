import { Row } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"
import Bebida from "./Bebida"
import BebidaInterface from "../interfaces/BebidaInterface"

const ListadoBebidas = () => {
  const {bebidas} = useBebidas()

  return (
    <Row className="mt-5">
      {bebidas.map((bebida: BebidaInterface) => {
        return (
          <Bebida bebida={bebida} />
        )
      })}
    </Row>
  )
}

export default ListadoBebidas
