
export async function getPlace (id) {
    return await fetch(`http://52.166.128.133/places/?id=` + id, {
    method : 'GET',
    headers: { 'Content-type': 'application/json',
        'Accept': '*/*' }
    })
    .then(res => res.json())
    .catch(err => ({hasError : true, status : err}))
}

export async function getFilter (token) {
    return await fetch('http://52.166.128.133/filter/?token=' + token)
    .then(res => res.json())
    .catch(err => ({hasError : true, status : err}))
}