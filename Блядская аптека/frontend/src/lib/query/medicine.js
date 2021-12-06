import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

const getDrugshopByName = async (name) => {
  const drugshops = await axios.get(`http://localhost:5000/api/getDrugshopsByName/${name ? name : 'all'}`)
  return drugshops.data
}

export const useGetDrugShopsByName = (name) => {
  return useQuery(['drugshops', name], () => getDrugshopByName(name))
}

const getAllMedicines = async (drugshopID) => {
 const medicines = await axios.get(`http://localhost:5000/api/getAllMedicines/${drugshopID}`)
 return medicines.data
}

export const useGetAllMedicines = (drugshopID) => {
  return useQuery(['medicines', drugshopID], () => getAllMedicines(drugshopID))
}

const getAllMedicinesByName = async (name) => {
  const medicines = await axios.get(`http://localhost:5000/api/getAllMedicinesByName/${name ? name : 'all'}`)
  return medicines.data
}

export const useGetAllMedicinesByName = (name) => {
  return useQuery(['searched-medicines', name], () => getAllMedicinesByName(name))
}

const addMedicineToCart = async (jwt, medicineID, amount) => {
  const answer = await axios.post('http://localhost:5000/api/addToCart', {
    jwtToken: jwt,
    itemID: medicineID,
    amount
  })
  return answer.data
}

export const useAddMedicineToCart = () => {
  const query = useQueryClient()
  return useMutation(({jwtToken, medicineID, amount }) => addMedicineToCart(jwtToken, medicineID, amount), {
    onSuccess: () => {
      query.invalidateQueries('searched-medicines')
    }
  })
}

const getDrugshopInfo = async (id) => {
  const answer = await axios.get(`http://localhost:5000/api/getDrugshopDyName/${id}`)
  return answer.data
}

export const useGetDrugshopInfo = (id) => {
  return useQuery(['drugshop', id], () => getDrugshopInfo(id))
}

const getUserCart = async (jwt) => {
  const answer = await axios.get(`http://localhost:5000/api/getUserCart/${jwt}`)
  return answer.data
}

export const useGetUserCart = (jwt) => {
  return useQuery(['usercart', jwt], () => getUserCart(jwt))
}

const deleteItemFromCart = async (id) => {
  const answer = await axios.post(`http://localhost:5000/api/deleteFromCart`, { id })
  return answer.data
}

export const useDeleteItemFromCart = () => {
  const query = useQueryClient()
  return useMutation((id) => deleteItemFromCart(id), {
    onSuccess: () => {
      query.invalidateQueries('usercart')
    }
  })
}

const clearCart = async (jwt) => {
  const answer = await axios.post('http://localhost:5000/api/clearCart', {jwt: jwt})
  return answer.data
}

export const useClearCart = () => {
  const query = useQueryClient()
  return useMutation((jwt) => clearCart(jwt), {
    onSuccess: () => {
      query.invalidateQueries('usercart')
    }
  })
}
