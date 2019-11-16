export default function http(address, method, body={}) {
    return fetch('http://localhost:8080/${address}', {
        method: method,
        body: Object.keys(body).length === 0 ? null : JSON.stringify(body),
        mode: 'cors',
        credentials:'include',
        headers:{
            'Content-Type': 'application/json; charset=utf-8'
        }
    })

        .then((response) =>{
            let json = response.json();
            if (response.status >= 400){
                return json.then(response => {
                    throw response;
                });
            }
            console.log('responce', json)
            return json;
        }) ;
}