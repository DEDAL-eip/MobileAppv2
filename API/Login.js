export default async function easyLog() {
    let res
    try {
        res = await fetch("http://52.166.128.133/ping").then(res => res.status)
    }
    catch {
        res = 404
    }

    finally {
        return res
    }
}