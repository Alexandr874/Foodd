import { openModals } from "./modal";
import { closesModals } from "./modal";
import { postData } from "../servises/servises";

function form(formSelector, modalsSetTimout) {
    const forms = document.querySelectorAll(formSelector);

    const messange = {
        loading: 'Загрузка',
        success: 'Спасибо! Мы скоро вам перезвоним!',
        failure: 'Что то пошло не так'
    };

    forms.forEach(form => {
        postFormData(form);
    });

    function postFormData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.textContent = messange.loading;
            form.append(statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    thankShowModals(messange.success);  
                })
                .catch(() => {
                    thankShowModals(messange.failure);
                })
                .finally(() => {
                    form.reset();
                });
                

        });

    }

    function thankShowModals(messange) {
       const hiddenThankModal = document.querySelector('.modal__dialog');
       hiddenThankModal.classList.add('hide');

       openModals('.modal', modalsSetTimout);

       const thankModals = document.createElement('div');
       thankModals.classList.add('modal__dialog');
       thankModals.innerHTML = `
       <div class="modal__content">
       <div data-closes class="modal__close">&times;</div>
       <div class="modal__title">Мы свяжемся с вами как можно быстрее!</div>
       </div>
       `;
       document.querySelector('.modal').append(thankModals);

       setTimeout(() => {
        thankModals.remove();
        hiddenThankModal.classList.add('show');
        hiddenThankModal.classList.remove('hide');
        closesModals('.modal');

       }, 4000);
    }

}
export default form;