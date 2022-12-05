const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#inputEmail').value;
    const password = document.querySelector('#inputPassword').value;
  
    if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Error logging in');
    }
  }
};
  
  document
    .querySelector('#loginForm')
    .addEventListener('submit', loginFormHandler);
  