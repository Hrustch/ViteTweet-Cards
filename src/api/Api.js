import axios from 'axios';

const URL = 'https://649f255d245f077f3e9d6017.mockapi.io/';
axios.defaults.baseURL = URL;

export const getUsers = async (page)=>{
    const data = await axios.get('users', {params:{
        page: page,
        limit: 4
    }})
    return data.data;
}

export const handleSubscribe = async (id, followers)=>{
    const data = await axios.put(`users/${id}`,{
        followers: followers + 1,
    })
}

export const handleUnsubscribe = async (id, followers)=>{
    const data = await axios.put(`users/${id}`,{
        followers: followers - 1,
    })
}
