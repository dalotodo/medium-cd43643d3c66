import axios from 'axios'
export async function getPostsUsingAxios() {
    const url = 'https://jsonplaceholder.typicode.com/posts'    
    return axios.get(url);
}