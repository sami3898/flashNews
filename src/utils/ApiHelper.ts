import axios, { AxiosResponse } from 'axios'

// Base url
const BASE_URL = 'https://inshorts.me/news/'

const ENDPOINTS = {
    TOPICS: 'topics/',
    TRENDING: 'trending',
    TOP: 'top',
    ALL: 'all',
    SEARCH: 'search'
}

// TODO: get all news
export const fetchAllNews =async (offset:number = 0) => {
    try {
        const response:AxiosResponse = await axios.get(`${BASE_URL + ENDPOINTS.ALL}?offset=${offset}&limit=30` )
        if (response.status === 200) {
            return response.data?.data?.articles
        } else {
            console.log("API ERROR RES: ", response.data.message)
        }
    } catch (error) {
        console.log("API ERROR: ", error)
    }
}
// TODO: get all cateogry
export const fetchAllCategory = async () => {
    try {
        const response:AxiosResponse = await axios.get(`${BASE_URL + ENDPOINTS.TOPICS}` )
        if (response.status === 200) {
            return response.data?.data?.topics;
        } else {
            return response.data.message
        }
    } catch (error) {
        console.log("API ERROR: ", error)
    }
}
// TODO: get news by catagory
export const fetchNewsByCatagory = async (catagory: string, offset: number) => {
    try {
        const response:AxiosResponse = await axios.get(`${BASE_URL + ENDPOINTS.TOPICS + catagory}?offset=${offset}&limit=30`)

        if (response.status === 200) {
            return response.data?.data?.articles;
        } else {
            return response.data.message
        }
    } catch (error) {
        console.log("API ERROR: ", error)
    }
}
// TODO: search news
export const fetchNewsBySearch =async (query:string, offset: number) => {
    try {
        const response: AxiosResponse = await axios.get(`${BASE_URL + ENDPOINTS.SEARCH}?query=${query}&offset=${offset}&limit=30`)
        if (response.status === 200) {
            return response.data?.data?.articles
        } else {
            return response.data.message
        }
    } catch (error) {
        console.log("API ERROR: ", error)
    }
}
// TODO: fetch trending news
export const fetchTrendingNews =async (offset: number) => {
    try {
        const response: AxiosResponse = await axios.get(`${BASE_URL + ENDPOINTS.TRENDING}?offset=${offset}&limit=30`)
        if (response.status === 200) {
            return response.data?.data?.articles
        } else {
            return response.data?.message
        }
    } catch (error) {
        console.log("API ERROR: ", error)
    }
}
