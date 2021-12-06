import {useMutation} from 'react-query'
import axios from 'axios'

const register = async (userData) => {
  const res = await axios.post('http://localhost:5000/api/register', userData)
  return res.data;
}

const login = async (userData) => {
  const res = await axios.post('http://localhost:5000/api/login', userData)
  .catch((error) => {
    if (error.response) {
      return error.response.data
    }
  });
  return res
}

export const useLogin = () => {
  return useMutation((data) => login(data))
}

export const useRegister = () => {
  return useMutation((data) => register(data))
}