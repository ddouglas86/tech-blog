const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const emailEl = document.querySelector('#inputEmail');
    const passwordEl = document.querySelector('#inputPassword');
  
    if (emailEl && passwordEl) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        email: emailEl.value,
        password: passwordEl.value,
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
  