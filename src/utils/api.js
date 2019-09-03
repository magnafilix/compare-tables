import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

export const fetchAllPlannings = () => axios.get(`${BASE_URL}/planning/all`)

export const createPlanning = planning => axios.post(`${BASE_URL}/planning`, planning)

export const deletePlanning = id => axios.delete(`${BASE_URL}/planning/${id}`)