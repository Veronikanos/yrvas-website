const forms = () => {
  const form = document.querySelectorAll('form');
  const input = document.querySelectorAll('input');
  const phoneInputs = document.querySelectorAll('input[name="user_phone"]');

  phoneInputs.forEach(item=>{
    item.addEventListener('input', ()=>{
        item.value = item.value.replace(/\D/, "");
    })
  })
  const message = {
    loading: 'Loading...',
    success: 'Thanks, we got your request!',
    failure: 'Something went wrong',
  };

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let res = await fetch(url, {
      method: 'POST',
      body: data,
    });

    return await res.text();
  };

  form.forEach((item) => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.appendChild(statusMessage);

      const formData = new FormData(item);

      postData('https://jsonplaceholder.typicode.com/posts', formData)
        .then((res) => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => {
          statusMessage.textContent = message.failure;
        })
        .finally(() => {
          input.forEach((item) => (item.value = ''));
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  });
};

export default forms;
