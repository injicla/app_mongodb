const registerUser = () => {
    event.preventDefault()


    const userData = {
        name:document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        email:document.getElementById('email').value,
        password:document.getElementById('password').value
    }


    fetch('http://127.0.0.1:3000/register', {
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success',data)
        })
        .catch(error => {
            console.error('Error:',error)
        })

}