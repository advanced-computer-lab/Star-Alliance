const button = document.querySelector("button")
button.addEventListener("click", () =>{
    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    
    }).then(res => {
        if(res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
        console.log(url);
        //window.location = url
    }).catch(e => {
        console.error(e.error);
    })
})