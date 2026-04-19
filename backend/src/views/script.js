function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function switchModal(closeId, openId) {
    closeModal(closeId);
    setTimeout(() => {
        openModal(openId);
    }, 300);
}

// Close on outside click
window.onclick = function (event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
    }
}

// Handle Signup Submission
async function handleSignup(e) {
    e.preventDefault();
    const form = e.target;
    const payload = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        role: 'customer' // default
    };

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (response.ok) {
            alert('Registration successful! Please log in.');
            switchModal('signupModal', 'loginModal');
            form.reset();
        } else {
            alert('Registration failed: ' + (data.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred during registration.');
    }
}

// Handle Login Submission
async function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const email = form[0].value;
    const password = form[1].value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (response.ok) {
            //alert('Login successful! Welcome back.');
            // Store token if applicable or handle redirection
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            closeModal('loginModal');
            form.reset();

            // Redirect if role is admin
            if (data.user && data.user.role === 'admin') {
                window.location.href = 'http://localhost:5173/admin';
            }
            if (data.user && data.user.role === 'customer') {
                window.location.href = 'http://localhost:5173/';
            }
        } else {
            alert('Login failed: ' + (data.error || 'Invalid credentials'));
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    }
}
