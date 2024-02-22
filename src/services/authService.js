export async function userLogin(loginDetails){
    var url = `http://localhost:8000/login`

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: "include",
        body: JSON.stringify(loginDetails)
    })

    if(!response.ok){
        throw {message : response.statusText, statusCode : response.status} // eslint-disable-line
    }

    const data = await response.json();

    return data;
}

export function logout(){
    sessionStorage.removeItem("cuser");
}