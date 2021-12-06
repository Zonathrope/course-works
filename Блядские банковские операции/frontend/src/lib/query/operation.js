import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'

const createOperation = async (operationData) => {
  const res = await axios.post('http://localhost:5000/api/createOperation', operationData)
  .catch((error) => {
    if (error.response) {
      return error.response.data
    }
  });
  return res.data;
}

const sendMoney = async (transferData) => {
  const res = await axios.post('http://localhost:5000/api/transferMoney', transferData)
  .catch((error) => {
    if (error.response) {
      return error.response.data
    }
  });
  return res.data;
}

export const useSendMoney = () => {
  const query = useQueryClient()
  return useMutation((data) => sendMoney(data), {
    onSettled: () => {
      query.invalidateQueries('user-cards')
    }
  })
}

export const useCreateOperation = () => {
  const query = useQueryClient()
  return useMutation((data) => createOperation(data), {
    onSettled: () => {
      query.invalidateQueries('user-cards')
    }
  })
}