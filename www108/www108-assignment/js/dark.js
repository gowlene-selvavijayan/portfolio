// Glowing gradient following cursor movement
document.addEventListener('mousemove', (e) => { 
    const glow = document.querySelector(" .cursor-glow");
    glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`; 
}); 