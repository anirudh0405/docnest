document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const email = document.getElementById('registerEmail').value;

        
        localStorage.setItem('registeredUsername', username);
        localStorage.setItem('registeredPassword', password);

        alert('Registration successful!');
        window.location.href = 'login.html'; 
    });
});
