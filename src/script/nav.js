export function navbarPopUp() {
    const navContainer = document.querySelector('.nav-dropDown')
    if (navContainer) {
        if (navContainer.style.display === 'none' || navContainer.style.display === '') {
            navContainer.style.display = 'flex';
        } else {
            navContainer.style.display = 'none';
        }
    }

}