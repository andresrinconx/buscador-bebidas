import {useState, useEffect} from 'react'
import axios from "axios"
import { createContext } from "react"
import BebidaInterface from '../interfaces/BebidaInterface'

const BebidasContext = createContext<{
  consultarBebidas: (datos: any) => void
  bebidas: BebidaInterface[]
  handleModalClick: () => void
  modal: boolean
  handleBebidaIdClick: (id: number) => void
  receta: any
  cargando: boolean
}>({
  consultarBebidas: () => {},
  bebidas: [],
  handleModalClick: () => {},
  modal: false,
  handleBebidaIdClick: () => {},
  receta: {},
  cargando: false
})

export const BebidasProvider = ({children}: {children: React.ReactNode}) => {
  const [bebidas, setBebidas] = useState([])
  const [modal, setModal] = useState(false)
  const [bebidaId, setBebidaId] = useState(0)
  const [receta, setReceta] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    setCargando(true)
    const obtenerReceta = async () => {
      if(!bebidaId) return // si bebidaId es false no ejecutes nada mas

      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
        const {data} = await axios(url)
        setReceta(data.drinks[0])
      } catch (error) {
        console.log(error)
      } finally { // el finally se ejecuta cuando se resuelve el try o el catch, comoquiera
        setCargando(false)  
      }
    }
    obtenerReceta()
  }, [bebidaId])
  
  const consultarBebidas = async (datos: any) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`
      const {data} = await axios(url)
      setBebidas(data.drinks)
    } catch (error) {
      console.log(error)
    }
  }

  const handleModalClick = () => {
    setModal(!modal)
  }

  const handleBebidaIdClick = (id: number) => {
    setBebidaId(id)
  }
  
  return (
    <BebidasContext.Provider value={{
      consultarBebidas,
      bebidas,
      handleModalClick,
      modal,
      handleBebidaIdClick,
      receta,
      cargando
    }}>
      {children}
    </BebidasContext.Provider>
  )
}

export default BebidasContext