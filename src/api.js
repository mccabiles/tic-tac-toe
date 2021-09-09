import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export const checkBoardState = (boardState) => {
  return axios({
    baseURL: API_URL,
    url: 'checkBoard',
    method: 'POST',
    data: { boardState }
  })
}