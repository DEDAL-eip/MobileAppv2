export async function getLocationOut (filter) {
    return await fetch(`http://52.166.128.133/places_filter?id=${filter}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json',
        'Accept': '*/*' }    
    })
        .then(res => res.text())
        .catch((error) => console.error(error))
}

export async function getLocationIn (filter) {
    return await fetch(`http://localhost:8080/places_nofilter/?id=${filter}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json',
        'Accept': '*/*' }    
    })
        .then(res => res.text())
        .catch((error) => console.error(error))
}
//http://localhost:8080/places_nofilter/?id=9f15bfa8-b353-43d5-a8b4-49fe1f63d1b8