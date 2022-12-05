const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#inputUsername').value;
  const email = document.querySelector('#inputEmail').value;
  const password = document.querySelector('#inputPassword').value;

  if (username && email && password) {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
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
