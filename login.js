document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const messageElement = document.getElementById('message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        
        const registeredUsername = localStorage.getItem('registeredUsername');
        const registeredPassword = localStorage.getItem('registeredPassword');

        
        if (username === registeredUsername && password === registeredPassword) {
            
            messageElement.textContent = '';

        
            alert('Login successful!');

            
            window.location.href = 'appointment.html';
        } else {
            
            messageElement.textContent = 'Invalid username or password';
        }
    });
});
