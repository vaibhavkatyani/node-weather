

const weatherForm = document.querySelector('form');
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    document.querySelector('#message').textContent = "Loading...";
    let address = document.querySelector('input').value;
    let url = "/weather?address="+address;
        fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                document.querySelector('#message').textContent = data.error;
            }else{
                document.querySelector('#message').textContent = data.location;
                document.querySelector('#forecast').textContent = data.forecast;
            }
        })
    })

})