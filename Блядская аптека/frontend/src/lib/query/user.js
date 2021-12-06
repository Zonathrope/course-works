import { useMutation, useQuery } from 'react-query'
import axios from 'axios'

const getUser = async (jwtToken) => {
  if(jwtToken === '1')
  return false
  const responce = await axios.get(`http://localhost:5000/api/getUser/${jwtToken}`)
  .catch((error) => {
    if (error.response) {
      return error.response.data
    }
  });
  if (responce.status === 400) throw new Error("Could not get profile");
  return responce.data[0]
}

const updateUser = async (user) => {
  const responce = await axios.post('http://localhost:5000/api/updateUser', {
    ...user
  }).catch((error) => {
    if (error.response) {
      return error.response.data
    }
  });
  return responce
}

export const useUpdateUser = () => {
  return useMutation((user) => updateUser(user))
}



export const useGetUser = (jwt) => {
 return useQuery(['user'], () => getUser(jwt))
}