//theme toggle
document.addEventListener('DOMContentLoaded',()=>{
    const themeToggle = document.getElementById('theme-toggle')
    themeToggle.addEventListener("click", ()=>{
        const htmlElement =document.documentElement;
        htmlElement.classList.toggle("dark");
    
        if(htmlElement.classList.contains("dark")){
            themeToggle.textContent = "☀️";
        }else{
            themeToggle.textContent =" 🌙";
        }
    });
})
//hambugger display

const initApp = () => {
    const hamburgerBtn = document.getElementById('hamburger-button')
    const mobileMenu = document.getElementById('mobile-menu')

    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden')
        mobileMenu.classList.toggle('flex')
        hamburgerBtn.classList.toggle('toggle-btn')
    }

    hamburgerBtn.addEventListener('click', toggleMenu)
    mobileMenu.addEventListener('click', toggleMenu)
}
document.addEventListener('DOMContentLoaded', initApp)
