/**
 * @class
 * 
 * @returns A function that returns the filters fetched by the API.
 * @category API
 */
export async function getFilters() {
    let res
    
    res = await fetch("http://localhost:8080/filter")
    .then(res => res.status)
    .catch(error => {
        console.error(error)
        return 400
    })
    
    return res
}