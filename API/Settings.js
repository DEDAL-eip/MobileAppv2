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
        .then(res => {
        console.log(res)
        return res.json()
        })
        .catch(err => err)
}


export async function MypatchParams (id, values, token) {
    return await fetch(`http://52.166.128.133/update_info/?id=${id}`, {
        method: 'PATCH',
        body: JSON.stringify(values),
        headers: {
        'Content-type': 'application/json',
        'x-access-token' : token,
        'Accept': '*/*' }
        })
        .then(res => res.status)
        .catch(err => err)
}

export async function tmp(id, token) {
    return await fetch(`http://52.166.128.133/user/?id=${id}`, {
        method :'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': '*/*',
            'x-access-token' : token
        }
    }).then(res => res.json())
    .catch(err => err)
}

