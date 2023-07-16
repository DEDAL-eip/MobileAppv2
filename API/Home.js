
/**
 * @function API
 * @export
 *
 * @param {string} id
 * @return {TODO} 
 */
export async function getPlace (id, token) {
    return await fetch(`http://52.166.128.133/places/?id=` + id, {
    method : 'GET',
    headers: {
        'Content-type': 'application/json',
        'x-access-token' : token,
        'Accept': '*/*' }
    })
    .then(res => res.json())
    .catch(err => ({hasError : true, status : err}))
}

/**
 * @function API
 * @export
 *
 * @param {string} token
 * @return {TODO} 
 */
export async function getFilter (token) {
    return await fetch('http://52.166.128.133/filter/?token=' + token)
    .then(res => res.json())
    .catch(err => ({hasError : true, status : err}))
}


/**
 * @function API
 * @export
 * 
 * @param {{x:  Int16Array, y : int}]} pos
 * @param {string} pos
 * @param {string} json
 * @param {string} id
 * @return {TODO} 
 */
export async function getPath(places, position, id) {
    return await fetch(`http://52.166.128.133/path_finding/?id=${id}`,{
    method : 'POST',
    headers: { 'Content-type': 'application/json',
        'Accept': '*/*' },
    body : JSON.stringify({
        places : places,
        position : position
    })
    })
    .then(res => res.json())
    .catch(err => ({hasError : true, status : err}))
}


/**
 * @function API
 * @export
 *
 * @param {string} id
 * @return {TODO} 
 */
export async function getMap (id, token) {
    console.log(id, token)
    return await fetch(`http://52.166.128.133/map/?id=${id}`, {
        method: 'GET',
        'Content-type': 'application/json',
        headers: {
            'x-access-token' : token,
            'Accept': '*/*' 
        }
    })
    .then(res => res.json())
    .catch(err => ({hasError : true, status : err}))
}

export async function getGeneratedPlace (id, token) {
    return await fetch(`http://52.166.128.133/places_generate/?id=${id}`, {
        method: 'POST',
        'Content-type': 'application/json',
        headers: {
            'x-access-token' : token,
            'Accept': '*/*' 
        }
    })
    .then(res =>{
        return res.text().then(res => res)})
}

