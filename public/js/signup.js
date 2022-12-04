const signupFormHandler = async (event) => {
  event.preventDefault();

  const usernameEl = document.querySelector('#inputUsername');
  const emailEl = document.querySelector('#inputEmail')
  const passwordEl = document.querySelector('#inputPassword');

  if (usernameEl && emailEl && passwordEl) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl.value,
        email: emailEl.value,
        password: passwordEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Error signing up');
    }
  }
};

document
  .querySelector('#signupForm')
  .addEventListener('submit', signupFormHandler);
