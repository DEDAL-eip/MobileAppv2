export async function SendCode (email) {
    return await fetch(`http://52.166.128.133/change_password`, {
        method: 'POST',
        body: JSON.stringify({'email': email}),
        headers: {
        'Content-type': 'application/json',
        'Accept': '*/*' }
        })
    .catch(err => err)
    .then(res => res)
}

export async function changePassword (email, password, code) {
    return await fetch(`http://52.166.128.133/code_new_password`, {
        method: 'POST',
        body: JSON.stringify({'email': email, 'password' : password, 'code' : code }),
        headers: {
        'Content-type': 'application/json',
        'Accept': '*/*' }
        })
    .catch(err => err)
    .then(res => res)
}

export async function patchParams (id, values) {
    return await fetch(`http://52.166.128.133/user/${id}/param`, {
        method: 'PATCH',
        body: JSON.stringify(values),
        headers: {
        'Content-type': 'application/json',
        'Accept': '*/*' }
        })
    .then(res => res.json())
    .catch(err => console.error(err))
} 

