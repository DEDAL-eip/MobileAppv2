/**
 * @returns A function that returns the locations fetched by the API.
 * @category API
 */
export async function getLocations() {
    let res
    
    res = await fetch("http://localhost:8080/places")
    .then(
        // res => res.json()
        console.log('res.status: ', res.status, ', res.json: ', res.json(), ', res.txt: ', res.txt())
    )
    .catch(error => {
        console.error(error)
        return 400
    })
    
    console.log('APIplaces: ', res.txt())

    return res
}