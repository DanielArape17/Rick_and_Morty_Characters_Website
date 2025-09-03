const registerPassword = document.getElementById('registerPassword');
const strengthFill = document.getElementById('strengthFill');
const switchToLogin = document.getElementById('switchToLogin');
const switchToRegister = document.getElementById('switchToRegister');

/**
 * Toggles password visibility and changes the eye icon
 * @param {string} passwordId - ID of the password field
 * @param {string} eye - ID of the open eye icon
 * @returns {void}
 */
const passwordVisibility = (passwordId, eye) =>{
  const passwordInput = document.getElementById(passwordId);
  const eyeSvg = document.getElementById(eye);
  const eyeClosedSvg = document.getElementById(`${eye}Closed`)

  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  
  if(eyeSvg.classList.contains('hidden')){
    eyeSvg.classList.remove('hidden');
    eyeClosedSvg.classList.add('hidden');
  }else{
    eyeClosedSvg.classList.remove('hidden');
    eyeSvg.classList.add('hidden');
  }
}


/**
 * Listens for input events on the password field and updates the strength indicator
 * @returns {void}
 */
registerPassword.addEventListener('input', () => {
  let fill = 0;
  let password = registerPassword.value

  if (password.length >= 8 && password.length <= 30) fill++;
  if (/[a-z]/.test(password)) fill++;
  if (/[A-Z]/.test(password)) fill++;
  if (/[0-9]/.test(password)) fill++;
  if (/[!*.[\]#@&]/.test(password)) fill++;

  const strengthConfig = [
    ['w-[0%]', 'bg-red-500'], 
    ['w-[20%]', 'bg-orange-500'], 
    ['w-[40%]', 'bg-yellow-500'],
    ['w-[60%]', 'bg-blue-500'],
    ['w-[80%]', 'bg-green-500'],
    ['w-[100%]', 'bg-green-700']
  ]

  strengthConfig.forEach((configArray) => { 
    configArray.forEach(config => {
      strengthFill.classList.remove(config);
    });
    
  });

  strengthFill.classList.add(strengthConfig[fill][0]);
  strengthFill.classList.add(strengthConfig[fill][1]);
})

// Animation for switching between Login and Register forms
switchToRegister.addEventListener('click', () => { 
  activatePortal(true)
});

switchToLogin.addEventListener('click', () => {
  activatePortal(false)
});