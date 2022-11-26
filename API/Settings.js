export async function changePassword (email) {
    console.log(email)
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