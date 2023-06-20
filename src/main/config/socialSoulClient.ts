import axios from 'axios';

export const socialSoulClient = axios.create({
  baseURL: 'https://api.lomadee.com',
  headers: {
    "Accept": "*/*, application/json, text/plain",
  }
})