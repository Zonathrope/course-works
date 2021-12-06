import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

const getUserCards = async (jwt) => {
  if (jwt) {
    const responce = await axios.get(`http://localhost:5000/api/getUserCards/${jwt}`)
      .catch((error) => {
        if (error.response) {
          return error.response.data
        }
      });
    return responce
  }
  return []
}

const createNewCard = async (jwt) => {
  if (jwt) {
    const responce = await axios.post('http://localhost:5000/api/createCard', { jwtToken: jwt.jwt })
      .catch((error) => {
        if (error.response) {
          return error.response.data
        }
      });
    return responce
  }
}

const deleteCard = async (id) => {
  const responce = await axios.post('http://localhost:5000/api/deleteCard', { cardID: id.id })
      .catch((error) => {
        if (error.response) {
          return error.response.data
        }
      });
    return responce
}

const getUser = async (jwtToken) => {
  const responce = await axios.get(`http://localhost:5000/api/getUser/${jwtToken}`)
  .catch((error) => {
    if (error.response) {
      return error.response.data
    }
  });
return responce
}

export const useGetUser = (jwt) => {
 return useQuery(['user', jwt], () => getUser(jwt))
}

export const useDeleteCard = () => {
  const queryClient = useQueryClient()
  return useMutation((id) => deleteCard(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('user-cards')
    }
  })
}

export const useCreateNewCard = () => {
  const queryClient = useQueryClient()
  return useMutation((jwt) => createNewCard(jwt), {
    onSuccess: () => {
      queryClient.invalidateQueries('user-cards')
    }
  })
}



export const useGetUserCards = (jwt) => {
  return useQuery(['user-cards', jwt], () => getUserCards(jwt))
}