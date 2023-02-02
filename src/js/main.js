'use strict';

import tabs from "./modules/tabs";
import timer from "./modules/timer";
import modal from "./modules/modal";
import form from "./modules/form";
import { openModals } from "./modules/modal";
import card from "./modules/card";
import slider from "./modules/slider";
import calc from "./modules/calc";


window.addEventListener('DOMContentLoaded', () => {

    const modalsSetTimout = setTimeout(() => openModals('.modal',  modalsSetTimout), 2000); 

    tabs('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2023-02-15');
    modal('[data-open]', '.modal', '[data-closes]', modalsSetTimout);
    form('form');
    card();
    slider({
        conteiner: '.offer__slider',
        slid: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        currentCounter: '#current',
        totalCounter: '#total',
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider__inner'
    });
    calc();
    

});




    















      

      