import { inOut } from "react-native/Libraries/Animated/Easing"

/**
 * @class
 * 
 * @returns A function that returns the filters fetched by the API.
 * @category API
 */
export default async function getFilters(token) {
    return await fetch('http://52.166.128.133/filter/', {
        method: 'GET',
        'Content-type': 'application/json',
        headers: {
            'x-access-token': token,
            'Accept': '*/*'
        }
    })
        .then(res => res.json())
        .catch(err => ({ hasError: true, status: err }))
}

export const getInfoUser = async (token, userId) => {
    console.log(token, userId)
    return await fetch('http://52.166.128.133/user/?id=' + userId, {
        method: 'GET',
        'Content-type': 'application/json',
        headers: {
            'x-access-token': token,
            'Accept': '*/*'
        }
    })
        .then(res => res.json())
        .catch(err => ({ hasError: true, status: err }))
}
export const setInfoUser = async (token, userId, info) => {
    console.log('in', token, userId, info)
    return await fetch(`http://52.166.128.133/user/?id=${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({ lastInfo : info }),
        headers: {
            'x-access-token': token,
            'Accept': '*/*',
            'Content-type': 'application/json',
        },
    })
    .then(res => res)
}
