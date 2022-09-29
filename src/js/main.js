'use strict';



window.addEventListener('DOMContentLoaded', function()  {


    //tabs

    const tabsContent = document.querySelectorAll('.tabcontent'),
          tabs = document.querySelectorAll('.tabheader__item'),
          tabsParent = document.querySelector('.tabheader__items');


          function hiddenTabsContent() {
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });

            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });

          }
          hiddenTabsContent();

          function showTabContent(i = 0) {
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');

            tabs[i].classList.add('tabheader__item_active');
          }
          showTabContent();

          tabsParent.addEventListener('click', (event) => {
           const target = event.target;

           if(target && target.classList.contains('tabheader__item')) {

                    tabs.forEach((item, i) => {
                        if(target === item) {
                            hiddenTabsContent();
                            showTabContent(i);
                        }
                    });
           }

          });



          //timer


          const deadline = '2022-10-06';

          function  getTimeRemaining(endtime) {
            const t = Date.parse(endtime) - Date.parse(new Date()),
                  days = Math.floor(t /(1000 * 60 * 60 * 24)),
                  hours = Math.floor((t / (1000 * 60 * 60 ))/ 24),
                  minutes = Math.floor((t/1000/60) % 60),
                  seconds = Math.floor((t/1000) % 60 );

                  return {
                    'total': t,
                    'days': days,
                    'hours': hours,
                   'minutes': minutes,
                   'seconds': seconds
                  };
          }

          function getZero(num) {

            if(num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }

          }

          function setClock(selector, endtime) {
            const timer = document.querySelector(selector),
                  days = timer.querySelector("#days"),
                  hours = timer.querySelector("#hours"),
                  minutes = timer.querySelector("#minutes"),
                  seconds = timer.querySelector("#seconds"),
                  timeInterval = setInterval(updateClock, 1000);

                  updateClock(); 

                  function updateClock() {
                    const t = getTimeRemaining(endtime);
                    
                    days.innerHTML = getZero(t.days);
                    hours.innerHTML = getZero(t.hours);
                    minutes.innerHTML = getZero(t.minutes);
                    seconds.innerHTML = getZero(t.seconds);

                    if(t.total <= 0) {
                        clearInterval(timeInterval);
                    }
                          
                  }
          }
          setClock('.timer',  deadline);




          // modal

          const openModalsBtn = document.querySelectorAll('[data-open]'),
                closModalsBtn = document.querySelector('[data-closes]'),
                modals = document.querySelector('.modal');

                function openModals() {
                    modals.classList.add('show');
                    modals.classList.remove('hide');
                    document.body.style.overflow = 'hidden';
                    clearInterval(modalInterval);
                }

                function closModals() {
                    modals.classList.add('hide');
                    modals.classList.remove('show');
                    document.body.style.overflow = '';
                }


                openModalsBtn.forEach(item => {
                    item.addEventListener('click', () => {
                        openModals();
                    });
                });


                closModalsBtn.addEventListener('click', () => {
                    closModals();
                });


                 modals.addEventListener('click', (e) => {
                        if(e.target === modals || e.target.getAttribute('data-closes') == "") {
                            closModals();
                        }
                });

                document.addEventListener('keydown', (e) => {

                    if(e.code === "Escape" && modals.classList.contains('show')) {
                        closModals();
                    }

                });

            const modalInterval = setInterval(openModals, 2000);

            function showModalByScroll() {
                if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight ) {
                    openModals();
                    window.removeEventListener('scroll', showModalByScroll);
                }
            }


            window.addEventListener('scroll', showModalByScroll);



            // Используем классы для создания карточек меню 


        class MenuCart{
            constructor(src, alt, title, descr, price, parentSelector, ...classes) {
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.parent = document.querySelector(parentSelector);
                this.classes = classes;
                this.transfer = 27;
                this.changeToUAH();
            }

            changeToUAH() {
                this.price = this.price * this.transfer;
            }

            render() {
                const element = document.createElement('div');
                if(this.classes.length === 0) {
                    this.classes = 'menu__item';
                    this.element.classList.add(this.classes);
                } else {
                   this.classes.forEach(clasName => element.classList.add(clasName));
                }
                element.innerHTML = `
                
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                
                `;
                this.parent.append(element);

            }
        }


        new MenuCart(
            "img/tabs/vegy.jpg",
            "vegy",
            'Меню "Фитнес"',
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            9,
            '.menu .container',
            'menu__item'
        ).render();

        new MenuCart(
            "img/tabs/elite.jpg",
            "elite",
            'Меню “Премиум”',
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            27,
            '.menu .container',
            'menu__item'
        ).render();
                
        new MenuCart(
            "img/tabs/post.jpg",
            "post",
            'Меню "Постное"',
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            39,
            '.menu .container',
            'menu__item'
        ).render();


        //forms


        const forms = document.querySelectorAll('form');

       const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
       };

        forms.forEach(item => {
            postData(item);
        });

        function postData(form) {

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                `;
                form.append(statusMessage);


                const formData = new FormData(form);

                const object = {};
                formData.forEach((value, key) => {
                    object[key] = value;
                });

                fetch('server.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(object)
                }).then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                }); 
                

            });

        }


        function showThanksModal(message) {
           const hiddenTabsContent = document.querySelector('.modal__dialog');

           hiddenTabsContent.classList.add('hide');
           openModals();

           const thanksModal = document.createElement('div');
           thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
            <div class="modal__content">
            <div data-closes class="modal__close">&times;</div>
            <div class="modal__title">Мы свяжемся с вами как можно быстрее!</div>
            </div>
            `;
            document.querySelector('.modal').append(thanksModal);

            setTimeout(() => {
                thanksModal.remove();
                hiddenTabsContent.classList.add('show');
                hiddenTabsContent.classList.remove('hide');
                closModals();
            },3000);
            
        }

        
 
});       

    















      

      