  const passwordVisibility = (passwordId, eye) =>{
    const passwordInput = document.getElementById(passwordId);
    const eyeSvg = document.getElementById(eye);
    const eyeClosedSvg = document.getElementById(`${eye}Closed`)

    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    //lucide-eye-icon lucide-eye
    //lucide-eye-closed-icon lucide-eye-closed
    
    if(eyeSvg.classList.contains('hidden')){
      eyeSvg.classList.remove('hidden');
      eyeClosedSvg.classList.add('hidden');
    }else{
      eyeClosedSvg.classList.remove('hidden');
      eyeSvg.classList.add('hidden');
    }
    
    console.log(eyeSvg)
  }