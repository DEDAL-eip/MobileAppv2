
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

export async function getMap(pos, name, filters) {
    console.log(JSON.stringify({
        id : filters,
        position : pos,
        name : name
    }))
    return await fetch('http://52.166.128.133/path_finding',{
    method : 'POST',
    headers: { 'Content-type': 'application/json',
        'Accept': '*/*' },
    body : JSON.stringify({
        id : filters,
        position : pos,
        name : name
    })
    })
    .then(res => {console.log('here') 
    return res.json()})
    .catch(err => ({hasError : true, status : err}))
}