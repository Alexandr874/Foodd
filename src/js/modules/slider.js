

function slider({conteiner, slid, prevArrow, nextArrow, currentCounter, totalCounter, wrapper, inner}) {
    const slider = document.querySelector(conteiner),
          slides = document.querySelectorAll(slid),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          sliderWrapper = document.querySelector(wrapper),
          sliderInner = document.querySelector(inner),
          width = window.getComputedStyle(sliderWrapper).width;

          let slidIndex = 1;
          let offset = 0;


          sliderInner.style.width = 100 * slides.length + '%';
          sliderInner.style.display = 'flex';
          sliderInner.style.transition = '0.5s all';

          sliderWrapper.style.overflow = 'hidden';

          slides.forEach(slid => {
                slid.style.width = width;
          });

          slider.style.position = 'relative';

          const indicators = document.createElement('ol'),
                dots = [];
          indicators.classList.add('carousel-indicators');
          indicators.style.cssText = `
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 15;
          display: flex;
          justify-content: center;
          margin-right: 15%;
          margin-left: 15%;
          list-style: none;
          `;
          slider.append(indicators);

          for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slider-dot', i + 1);
            dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
            `;
            if (i === 0) {
                dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);

          }

          if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slidIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent = slidIndex;
        }

          next.addEventListener('click', () => {
                if (offset === removeLetters(width) * (slides.length -1)) {
                    offset = 0;
                } else {
                    offset += removeLetters(width);
                }

                sliderInner.style.transform = `translateX(-${offset}px)`;

                if (slidIndex === slides.length) {
                    slidIndex = 1;
                } else {
                    slidIndex++;
                }

                currentSlid();

                dotOpaciti();

          });

          prev.addEventListener('click', () => {
            if (offset === 0) {
                offset = removeLetters(width) * (slides.length -1);
            } else {
                offset -= removeLetters(width);
            }

            sliderInner.style.transform = `translateX(-${offset}px)`;

            if (slidIndex <= 1) {
                slidIndex = slides.length;
            } else {
                slidIndex--;
            }

            currentSlid();

            dotOpaciti();

      });

      dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const dotTo = e.target.getAttribute('data-slider-dot');

            offset = removeLetters(width) * (dotTo -1);

            sliderInner.style.transform = `translateX(-${offset}px)`;

            slidIndex = dotTo;

            currentSlid();

            dotOpaciti();

        });

      });

          function removeLetters(str) {
            return +str.replace(/\D/g, '');

          }

          function currentSlid() {
                if (slides.length < 10) {
                    current.textContent = `0${slidIndex}`;
                } else {
                    current.textContent = slidIndex;
                }
          }

          function dotOpaciti() {
            dots.forEach(dot => {
                dot.style.opacity = '.5';
            });

            dots[slidIndex - 1].style.opacity = 1;
          }


}
export default slider;