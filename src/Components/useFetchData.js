import {useState, useEffect} from 'react'
import axios from 'axios';

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const primaryKey = 'd9bdfa4543364f9cbec8855da5a4d353';

    useEffect(()=>{
        axios.get(url, {headers: {apikey: primaryKey}})
        .then((res)=>{
            setData(res.data)
        })
        .then(()=>{
            console.log(data)
        })
        .catch((e)=>{
            console.log('Something went wrong fetching the data '+ e)
        })
    },[url])
    return {data};
}
export default useFetchData;
