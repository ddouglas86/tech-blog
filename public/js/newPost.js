const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('input[name="postTitle"]').value;
    const content = document.querySelector('textarea[name="postContent"]').value;
  if (title && content) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
    document.location.replace('/dashboard');
    }
  }
  };
  
  document
    .querySelector('#newPost')
    .addEventListener('submit', newFormHandler);
  