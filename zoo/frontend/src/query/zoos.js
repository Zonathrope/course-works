import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

const getAllZoos = async () => {
  const responce = await axios.get('http://localhost:3000/zoo')
  return responce.data
}

export const useGetAllZoos = () => {
  return useQuery('zoos', () => getAllZoos())
}

const getZoo = async (id) => {
  const responce = await axios.get(`http://localhost:3000/zoo-zone-animal/${id}`)
  return responce.data[0]
}

export const useGetZoo = (id) => {
  return useQuery(['zoo', id], () => getZoo(id))
}

const makeOrder = async (data) => {
  const responce = await axios.post('http://localhost:3000/order', data)
  return responce.data
}

export const useMakeOrder = () => {
  return useMutation((data) => makeOrder(data))
}

const getAllZoosData = async () => {
  const responce = await axios.get(`http://localhost:3000/zoo-zone-animal`)
  return responce.data
}

export const useGetAllZoosData = () => {
  return useQuery('zoos-data', () => getAllZoosData())
}

const createLocation = async (locationData) => {
  const responce = await axios.post('http://localhost:3000/location', { ...locationData })
  return responce.data._id
}

const createZoo = async (zooData) => {
  const { country, city, street, name, img } = zooData
  const location_id = await createLocation({ country, city, street })
  const responce = await axios.post('http://localhost:3000/zoo', { name, img, location_id })
  const createdZoo = await axios.post('http://localhost:3000/zoo-zone-animal', { zoo_id: responce.data._id })
  return [responce.data, createdZoo.data]
}

export const useCreateZoo = () => {
  const queryClient = useQueryClient()
  return useMutation((data) => createZoo(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('zoo')
      queryClient.invalidateQueries('zoos')
      queryClient.invalidateQueries('zoos-data')
    },
    onSettled: () => {
      queryClient.invalidateQueries('zoo')
      queryClient.invalidateQueries('zoos')
      queryClient.invalidateQueries('zoos-data')
    }
  })
}

const createZone = async (data) => {
  const { type, world_part } = data
  const repsonce = await axios.post('http://localhost:3000/zone', { type, world_part })
  return repsonce.data._id
}

const addZoneToZoo = async (values) => {
  const { zoo_id } = values
  const zone_id = await createZone(values)
  const responce = await axios.post('http://localhost:3000/zoo-zone-animal', { zoo_id, zone_id })
  return responce.data
}

export const useAddZoneToZoo = () => {
  const queryClient = useQueryClient()
  return useMutation((data) => addZoneToZoo(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('zoo')
      queryClient.invalidateQueries('zoos-data')
    },
    onSettled: () => {
      queryClient.invalidateQueries('zoo')
      queryClient.invalidateQueries('zoos-data')
    }
  })
}

const createAnimal = async (values) => {
  const { name, specie, year_old } = values
  const responce = await axios.post('http://localhost:3000/animal', { name, specie, year_old })
  return responce.data._id
}

const addAnimalToZoo = async (data) => {
  const { name, specie, year_old, zoo_id, zone_id } = data
  const animal_id = await createAnimal({ name, specie, year_old })
  const responce = await axios.post('http://localhost:3000/zoo-zone-animal', { zoo_id, zone_id, animal_id })
  return responce.rata
}

export const useAddAnimal = () => {
  const queryClient = useQueryClient()
  return useMutation((data) => addAnimalToZoo(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('zoo')
      queryClient.invalidateQueries('zoos-data')
    },
    onSettled: () => {
      queryClient.invalidateQueries('zoo')
      queryClient.invalidateQueries('zoos-data')
    }
  })
}

const deleteAnimal = async (id) => {
  const deletedFromAnimals = await axios.delete(`http://localhost:3000/animal/${id}`)
  const deletedfromtTalbe = await axios.delete(`http://localhost:3000/zoo-zone-animal/animal/${id}`)
  return [deletedFromAnimals, deletedfromtTalbe]
}

export const useDeleteAnimal = () => {
  const queryClient = useQueryClient()
  return useMutation((id) => deleteAnimal(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('zoo')
      queryClient.invalidateQueries('zoos-data')
    },
    onSettled: () => {
      queryClient.invalidateQueries('zoo')
      queryClient.invalidateQueries('zoos-data')
    }
  })
}

const deleteZone = async (id) => {
  const deleteFromZones = await axios.delete(`http://localhost:3000/zone/${id}`)
  const deletedfromTable = await axios.delete(`http://localhost:3000/zoo-zone-animal/zone/${id}`)
  return [deleteFromZones, deletedfromTable]
}

export const useDeleteZone = () => {
  const queryClient = useQueryClient()
  return useMutation((id) => deleteZone(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('zoo')
      queryClient.invalidateQueries('zoos-data')
    },
    onSettled: () => {
      queryClient.invalidateQueries('zoo')
      queryClient.invalidateQueries('zoos-data')
    }
  })
}

const deleteZoo = async (id) => {
  const deleteFromZones = await axios.delete(`http://localhost:3000/zoo/${id}`)
  const deletedfromTable = await axios.delete(`http://localhost:3000/zoo-zone-animal/zoo/${id}`)
  return [deleteFromZones, deletedfromTable]
}

export const useDeleteZoo = () => {
  const queryClient = useQueryClient()
  return useMutation((id) => deleteZoo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('zoos')
      queryClient.invalidateQueries('zoo')
      queryClient.invalidateQueries('zoos-data')
    },
    onSettled: () => {
      queryClient.invalidateQueries('zoos')
      queryClient.invalidateQueries('zoo')
      queryClient.invalidateQueries('zoos-data')
    }
  })
}