/**
 * 这个index.js向外暴露了一个方法 useAxios 
 * useAxios接收一个data数据（可以是响应式数据），其中有一个属性是url表示访问的网址
 * 返回response.data
 */
import { isRef, ref, unref } from 'vue'
import axios from 'axios'
export function useAxios(data) {
    const response = ref("")

    function doPost(realData) {
        axios.post(realData.url, realData)
            .then(res => {
                response.value = res.data
            })
            .catch(error => {
                response.value = null
            })
    }

    if (isRef(data)) {
        doPost(url, unref(data))
    } else {
        doPost(url, data)
    }

    return response
}