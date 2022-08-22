'use strict';

document.addEventListener('DOMContentLoaded', () => {

    //tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
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
         


          function showTabContent(i = 0) {
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');

            tabs[i].classList.add('tabheader__item_active');
          }


          hiddenTabsContent();
          showTabContent();


          tabsParent.addEventListener('click', (event) => {
            const target = event.target;

            if (target && target.classList.contains('tabheader__item')) {

                tabs.forEach((item, i) => {

                    if (target === item) {
                        hiddenTabsContent();
                        showTabContent(i);
                    }

                });
            }

          });


          //timer

          const established = '2022-09-15';

          function totalTime(eanable) {
            const t = Date.parse(eanable) - Date.parse(new Date()),
                  days = Math.floor(t / (1000 * 60 * 60 * 24)),
                  hours = Math.floor((t / 1000 * 60 *60 )% 24),
                  minutes = Math.floor((t / 1000 / 60) % 60),
                  seconds = Math.floor((t / 60 )% 60);

                  return {
                    'total': t,
                    'days': days,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds
                  };

          }


          function getZero(num) {

            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
          }


          function getTimeOutput(selector, eanable) {
            const timer = document.querySelector(selector),
                  days = timer.querySelector('#days'),
                  hours = timer.querySelector('#hours'),
                  minutes = timer.querySelector('#minutes'),
                  seconds = timer.querySelector('#seconds'),
                  setTimer = setInterval(insertTheReceivedTime, 1000);

                  insertTheReceivedTime();
                

                  function insertTheReceivedTime() {
                    const t = totalTime(eanable);
                    days.innerHTML = getZero(t.days);
                    hours.innerHTML = getZero(t.hours);
                    minutes.innerHTML = getZero(t.minutes);
                    seconds.innerHTML = getZero(t.seconds);

                    if (t.total <= 0) {
                        clearInterval(setTimer);
                    }
                  }



          }

          getTimeOutput('.timer', established);




          //modals 


         const modalOpenBtn = document.querySelectorAll('[data-open]'),
               modals = document.querySelector('.modal'),
               modalClosesBtn = document.querySelector('[data-closes]');

               function modalOpen() {
                modals.classList.add('show');
                modals.classList.remove('hide');
                document.body.style.overflow = 'hidden';
                clearInterval(modalTimer);

               }


               modalOpenBtn.forEach(item => {
                item.addEventListener('click', () => {
                    modalOpen();
                });
               });


               function modalCloses() {
                modals.classList.add('hide');
                modals.classList.remove('show');
                document.body.style.overflow = '';
               }


               modalClosesBtn.addEventListener('click', modalCloses);


               document.addEventListener('keydown', (e) => {

                if (e.code === 'Escape' && modals.classList.contains('show')) {

                    modalCloses(); 
                }

               });


               const modalTimer = setTimeout(modalOpen, 3000);


               function scrollAndOpen() {

                    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                        modalOpen();

                        window.removeEventListener('scroll', scrollAndOpen);
                    }
                
               }
               

               window.addEventListener('scroll', scrollAndOpen); 





               // card 


            class MenuCart{
                constructor(src, alt, title, descr, price, parentSelector, ...classes) {
                    this.src = src;
                    this.alt = alt;
                    this.title = title;
                    this.descr = descr;
                    this.price = price;
                    this.parent = document.querySelector(parentSelector);
                    this.classes = classes;
                    this.converter = 27;
                    this.currencExchange();
                }
                currencExchange() {
                    this.price = this.price *  this.converter;
                }

                render() {
                    const element = document.createElement('div');
                    if(this.classes.length === 0) {
                        this.element = 'menu__item';
                        element.classList.add(this.element);
                    } else {
                        this.classes.forEach(className => element.classList.add(className));
                    }
                    element.innerHTML = `
                   
                        <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>`;
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
                24,
                '.menu .container'


            ).render();


            new MenuCart(
                "img/tabs/post.jpg",
                "post",
                'Меню "Постное"',
                'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
                20,
                '.menu .container'


            ).render();





});











      

      