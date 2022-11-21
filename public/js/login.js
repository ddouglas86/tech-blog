const loginFormHandler = async function(event) {
    event.preventDefault();
  
    const usernameEl = document.querySelector('#inputEmail');
    const passwordEl = document.querySelector('#inputPassword');
  
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to login');
    }
  };
  
  document
    .querySelector('#loginForm')
    .addEventListener('submit', loginFormHandler);
  