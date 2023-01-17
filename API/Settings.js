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


export async function MypatchParams (id, values, token) {
    //let info = await tmp(id, token)
    console.log('here', values, id)
    return await fetch(`http://52.166.128.133/update_info/?id=9f15bfa8-b353-43d5-a8b4-49fe1f63d1b8`, {
        method: 'PATCH',
        body: JSON.stringify(values),
        headers: {
        'Content-type': 'application/json',
        'Accept': '*/*' }
        })
        .then(res => res.status)
        .catch(err => err)
}

export async function tmp(id, token) {
    return await fetch(`http://52.166.128.133/user/?id=9f15bfa8-b353-43d5-a8b4-49fe1f63d1b8`, {
        method :'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': '*/*',
            'x-access-token' : token
        }
    }).then(res => res.json())
    .catch(err => err)
}

