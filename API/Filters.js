/**
 * @class
 * 
 * @returns A function that returns the filters fetched by the API.
 * @category API
 */
export default async function getFilters (token) {
    return await fetch('http://52.166.128.133/filter/?token=' + token)
    .then(res => res.json())
    .catch(err => ({hasError : true, status : err}))
}