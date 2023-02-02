function calc() {
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age,
    ratio;

    if (localStorage.getItem('sex')) {
       sex = localStorage.getItem('sex');
    } else {
        sex = 'femele';
        localStorage.setItem('sex', 'femele');
    }

    if (localStorage.getItem('ratio')) {
       ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '_____';
            return;
        }
        if (sex === 'femele') {
          result.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio);
        } else {
            result.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio);
        }   
    }
    calcTotal();

    function insertLocal(selector, activClass) {
        const element = document.querySelectorAll(selector);
        element.forEach(elem => {
            elem.classList.remove(activClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
               elem.classList.add(activClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activClass);
            }

        });

    }
    insertLocal('#gender div', 'calculating__choose-item_active');
    insertLocal('.calculating__choose_big div', 'calculating__choose-item_active');

    function staticInform(selector, activClass) {
        const element = document.querySelectorAll(selector);
        element.forEach(elem => {
            elem.addEventListener('click', () => {
                if (elem.getAttribute('data-ratio')) {
                    ratio = +elem.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +elem.getAttribute('data-ratio'));
                } else {
                    sex = elem.getAttribute('id');
                    localStorage.setItem('sex',elem.getAttribute('id'));
                }

                element.forEach(elem => {
                    elem.classList.remove(activClass);
                });
                elem.classList.add(activClass);

                calcTotal();
            });
        });


    }
    staticInform('#gender div', 'calculating__choose-item_active');
    staticInform('.calculating__choose_big div', 'calculating__choose-item_active');


    function dinamicInform(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
            }

            calcTotal();
        });

    }
    dinamicInform('#height');
    dinamicInform('#weight');
    dinamicInform('#age');

}

export default calc;