
function openModals(modalSelector, modalsSetTimout) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalsSetTimout) {
        clearTimeout(modalsSetTimout);
    }
    
  }

  function closesModals(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }


function modal(openModalsSelector, modalSelector, closesModalsSelector, modalsSetTimout) {

    const openModalsBt = document.querySelectorAll(openModalsSelector),
          modal = document.querySelector(modalSelector),
          closesModalsBt = document.querySelector(closesModalsSelector);

          
          openModalsBt.forEach(item => {
            item.addEventListener('click',() => openModals(modalSelector, modalsSetTimout)); 

          });

          closesModalsBt.addEventListener('click', () =>  closesModals(modalSelector));


          window.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains(modalSelector.slice(1))) {
                    closesModals(modalSelector);
            } 

          });

          document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                closesModals(modalSelector);
            }

        });
            
          


          function modalScroll() {
            if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModals(modalSelector, modalsSetTimout);
                window.removeEventListener('scroll', modalScroll);
            }
          }

          window.addEventListener('scroll', modalScroll);
            


}
export default modal;
export {openModals};
export {closesModals};



