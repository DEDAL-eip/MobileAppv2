
/**
 * @function API
 * @export
 *
 * @param {string} id
 * @return {TODO} 
 */
export async function getPlace (id) {
    return await fetch(`http://52.166.128.133/places/?id=` + id, {
    method : 'GET',
    headers: { 'Content-type': 'application/json',
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
 * @param {string} name
 * @param {string} filters
 * @return {TODO} 
 */
export async function getMap(pos, name, filters) {
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
export async function getInfo (id) {
    return await fetch(`http://52.166.128.133/map/?id=` + id, {
        method: 'GET',
        headers: {
        'Content-type': 'application/json',
        'Accept': '*/*' }
        })
        .then(res => res.text())
        .catch(err => ({hasError : true, status : err}))
}