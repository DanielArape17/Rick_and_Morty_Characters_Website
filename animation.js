/**
 * @fileoverview Cosmic animation system for creating particle effects and portal transitions
 * @module CosmicAnimation
 */

const cosmicBackground = document.querySelector('.cosmic-background');
const particleContainer = document.querySelector('.cosmic-container');

/**
 * Creates and returns an array of particle elements with random properties
 * @returns {Array<{element: HTMLElement, size: number, color: string}>} Array of particle objects
 */
const createParticles = () => {
  let particles = [];

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
  
  // Crear partículas
  for (let i = 0; i < 150; i++) {
    // Tamaño aleatorio entre 1px y 5px
    const size = Math.random() * 4 + 1;
    
    // Color aleatorio de la paleta
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Crear elemento div para la partícula
    const particle = document.createElement('div');

    particle.className = `particle w-[${size}px] h-[${size}px] bg-[${color}] shadow-[0_0_${size * 2}px_${size}px_${color}] rounded-full`;
    
    // Añadir al contenedor
    particleContainer.appendChild(particle);
    
    // Guardar referencia
    particles.push({
        element: particle,
        size: size,
        color: color,
    });
  }

  return particles
};

/**
 * Animates the background and creates particle movement effects
 * @returns {void}
 */
const backgroundAnimated = () => {
  // Crear partículas
  const particles = createParticles();
  
  // Animación del fondo
  gsap.fromTo(
    particleContainer,
    { 
        backgroundSize: "150% 150%", 
        backgroundPosition: "0% 0%"
    },
    {
        backgroundSize: "100% 100%",
        backgroundPosition: "100% 100%",
        duration: 15,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
    }
  );
  
  // Animación de partículas
  particles.forEach(particle => {
    // Posición inicial aleatoria
    const startX = Math.random() * 140 - 20;
    const startY = Math.random() * 140 - 20;
      
    // Establecer posición inicial
    gsap.set(particle.element, {
      x: `${startX}vw`,
      y: `${startY}vh`,
      opacity: Math.random() * 0.5 + 0.3
    });
    
    // Animación de movimiento
    gsap.to(particle.element, {
      x: `${Math.random() * 140 - 20}vw`,
      y: `${Math.random() * 140 - 20}vh`,
      duration: Math.random() * 10 + 10,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      opacity: Math.random() * 0.5 + 0.1
    });
    
    // Animación de parpadeo
    gsap.to(particle.element, {
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 2 + 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
};

/**
 * Animates the portal transition between login and register views
 * @param {boolean} isSwitchingToRegister - Direction of the transition (true: to register, false: to login)
 * @returns {void}
 */
const portalAnimation = (isSwitchingToRegister) => {
  const registerView = document.getElementById('registerView');
  const loginView = document.getElementById('loginView');

  const masterTl = gsap.timeline();



  masterTl
    .to(isSwitchingToRegister ? loginView : registerView, {
      keyframes: {
        "0%": { opacity: 0.7, scale: 1},
        "30%": { opacity: 0.5, scale: 0.7},
        "60%": { opacity: 0.3, scale: 1.2},
        "100%": { opacity: 0, scale: 0}
      },
      ease: "power1.in",
      duration: 1,
      onComplete: () => {
        if(isSwitchingToRegister){
          loginView.classList.add('hidden')
          registerView.classList.remove('hidden')
        }else{
          registerView.classList.add('hidden')
          loginView.classList.remove('hidden')
        }
      }
    }, 0.3)
    .to("#portal", {
      keyframes: {
        "0%": { opacity: 0.2, scale: 0.1 },
        "25%": { opacity: 0.5, scale: 0.5 },
        "50%": { opacity: 1, scale: 1.5 },
        "75%": { opacity: 0.8, scale: 0.5 },
        "100%": { opacity: 0.2, scale: 0.1, rotation: 360}
      },
      duration: 2,
      ease: "power1.inOut"
    }, 0)
    .to("#central-circle", {
      opacity: 1,
      scale: 1.1,
      duration: 1.8,
      ease: "bounce"
    }, 0)
    .to("#glow-circle", {
      opacity: 1,
      scale: 1.1,
      duration: 1.8,
      ease: "bounce"
    }, 0)
    .to("#principal-circle", {
      keyframes: {
        "0%": { opacity: 0, rotation: 0 },
        "30%": { opacity: 0.5, x: 3, y: 3, ease: "circ.inOut" },
        "60%": { opacity: 1, rotation: 40, ease: "circ.in" },
        "80%": { opacity: 0.5, scale: 1.3, rotation: 50, ease: "elastic.in" }
      },
      duration: 1.8,
    }, 0.2)
    .to("#secondary-circle", {
      keyframes: {
        "0%": { opacity: 0, rotation: 0 },
        "30%": { opacity: 0.5, ease: "circ.inOut" },
        "60%": { opacity: 1, rotation: -40, x: 3, y: 3, ease: "circ.in" },
        "80%": { opacity: 0.5, scale: 1.5, ease: "elastic.in" }
      },
      duration: 1.8,
    }, 0.2); 
  // Fase 2: Contraer el portal y expandir la nueva vista
  masterTl
    .to(isSwitchingToRegister ? registerView : loginView, {
      keyframes: {
        "0%": { opacity: 0, scale: 0, ease: "power1.in" },
        "80%": { opacity: 1, scale: 1.2, ease: "power1.in" },
        "100%": { opacity: 1, scale: 1, ease: "bounce" }
      },
      duration: 1,
    }, 1.2);
    //Final
    masterTl.eventCallback("onComplete", () => {
      gsap.set("#portal", { opacity: 1, scale: 1, rotation: 0, display: 'none' });
      gsap.set("#central-circle", { opacity: 0.9, scale: 1 });
      gsap.set("#glow-circle", { opacity: 1, scale: 1 });
      gsap.set("#principal-circle", { opacity: 0.7, rotation: 0, x: 0, y: 0, scale: 1 });
      gsap.set("#secondary-circle", { opacity: 0.5, rotation: 0, x: 0, y: 0, scale: 1 });
    });
}

/**
 * Activates the portal animation at a random position near the center of the screen
 * @param {boolean} isSwitchingToRegister - Direction of the transition
 * @returns {void}
 */
const activatePortal = (isSwitchingToRegister) => {
  const { innerWidth: w, innerHeight: h } = window;
  const centerX = w / 2 - 150; // Centrar el SVG (300px de ancho / 2)
  const centerY = h / 2 - 150; // Centrar el SVG (300px de alto / 2)
  const range = Math.min(w, h) * 0.15; // 15% del tamaño más pequeño

  const startX = centerX + (Math.random() * range * 2) - range;
  const startY = centerY + (Math.random() * range * 2) - range;

  gsap.set(portal, {
    display: 'block',
    x: startX,
    y: startY,
    opacity: 0,
    scale: 0
  });

  portalAnimation(isSwitchingToRegister);
};

/**
 * Initializes the cosmic animation system when the DOM is fully loaded
 * @event DOMContentLoaded
 * @listens document
 */
document.addEventListener('DOMContentLoaded', (event) => {
  backgroundAnimated()

  // Animación adicional con GSAP para mejorar el efecto
  gsap.to(".cosmicText", {
    textShadow: "0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(79, 205, 196, 0.4), 0 0 45px rgba(69, 183, 209, 0.3)",
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });
});

