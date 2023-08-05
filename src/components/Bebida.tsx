import useBebidas from "../hooks/useBebidas"
import BebidaInterface from "../interfaces/BebidaInterface"
import {Col, Card, Button} from 'react-bootstrap'

const Bebida = ({bebida}: {bebida: BebidaInterface}) => {
  const {handleModalClick, handleBebidaIdClick} = useBebidas()

  return (
    <Col md={6} lg={4}>
      <Card>
        <Card.Img
          variant="top"
          src={bebida.strDrinkThumb}
          alt={`imagen de ${bebida.strDrink}`}
        />

        <Card.Body>
          <Card.Title>{bebida.strDrink}</Card.Title>
          <Button 
            variant="warning" 
            className="w-100 text-uppercase mt-2"
            onClick={() => {
              handleModalClick()
              handleBebidaIdClick(Number(bebida.idDrink))
            }}
          >
            Ver Receta
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Bebida
