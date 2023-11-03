// ================================================== исключение по наименованию страницы
// const contactsPage = window.location.pathname == '/contacts.html'
// if(contactsPage){
//     ...
// }


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ПРОКРУТКА, ШАПКА
const headerLogic = ()=> {
    const header = document.querySelector('.header')
    function headerActiveToggle() {
        const scrollSize = window.pageYOffset
        scrollSize > 1 ? header.classList.add('active') : header.classList.remove('active')
    }
    window.addEventListener('load', headerActiveToggle) // ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ ЕСЛИ СТРАНИЦА УЖЕ ПРОСКРОЛЛЕНА
    window.addEventListener('scroll', headerActiveToggle) // ПРИ СКРОЛЛЕ
    
    $('.js-scrollToSection').click(function () {
        var scroll_elem = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(scroll_elem).offset().top
        }, 1000);
    });
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ МАСКА ДЛЯ ИНПУТОВ (https://github.com/RobinHerbots/Inputmask)
const inputMask = () => {
    $(".js-maskPhone").inputmask({
        mask: "+7 999 999 99 99",
        clearIncomplete: true
    });
    $('.email').inputmask({
        mask: "*{1,20}[.*{1,20}]@*{1,20}.*{2,4}",
        clearIncomplete: true
    //     greedy: false,
    //     onBeforePaste: function (pastedValue, opts) {
    //         pastedValue = pastedValue.toLowerCase();
    //         return pastedValue.replace("mailto:", "");
    //     },
    //     definitions: {
    //         '*': {
    //             validator: "[0-9A-Za-z-а-я-]",
    //             casing: "lower"
    //         }
    //     }
    });
    $(".js-maskDate").inputmask({
        mask: "99/99/9999",
        clearIncomplete: true,
        'placeholder': 'dd/mm/yyyy'
    });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ СЛАЙДЕР SWIPER (https://swiperjs.com/get-started) 
const sliders = () => {
    const swiper = new Swiper('.js-sliderSteps', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            992: {
                slidesPerView: 4
            },
            768: {
                slidesPerView: 3
            },
            565: {
                slidesPerView: 2
            }
        }
    });
    const swiper2 = new Swiper('.js-sliderPartners', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            992: {
                slidesPerView: 4
            },
            768: {
                slidesPerView: 3
            },
            565: {
                slidesPerView: 2
            }
        }
    });

}

const calculator = () => {
    let inputSum = document.querySelector(".js-inputSum"), // видимый инпут с суммой, с разбивкой на разряды
		// sumDouble - это будет скрытый инпут с суммой , который будет дублировать видимый, но без разбивки на разряды
		// (формула будет работать именно с этим инпутом, т.к разбивка на разряды нужна только для видимости)
		inputSumDouble = document.querySelector(".js-inputSumDouble"),
		resultSum = document.querySelector(".js-resultSum"),
		inputTime = document.querySelector(".js-inputTime"),
		inputPercent = document.querySelector(".js-inputPercent"),
		resultPercent = document.querySelector(".js-resultPercent")

    // ~~~~~~~~~~~~~~~~ формула расчета аннуитетного платежа - https://yandex.ru/images/search?img_url=https%3A%2F%2Fnarcosis-css.ru%2F800%2F600%2Fhttp%2Fimages.myshared.ru%2F10%2F1011885%2Fslide_22.jpg&lr=10758&pos=0&rpt=simage&source=serp&text=%D1%84%D0%BE%D1%80%D0%BC%D1%83%D0%BB%D0%B0%20%D0%B0%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%87%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%BF%D0%BB%D0%B0%D1%82%D0%B5%D0%B6%D0%B0
	function formula() {
		// процентная ставка по займу в мес
		let i = inputPercent.value / (100 * 12)
		// кол-во месяцев
		let n = inputTime.value * 12
		// формула расчета аннуитетного платежа
		let k = (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
		// в значении Ежемесячный платеж выводим результат
		// Number(this.value.replace(/\D/g,'')).toLocaleString('ru') - разбивает число на разряды
		resultSum.innerHTML = Math.round(
			inputSumDouble.value.replace(/\D/g, "") * k
		).toLocaleString("ru")
        resultPercent.innerHTML = inputPercent.value
	}
	formula();

    // у видимого инпута с суммой делаем разбивку на разряды
    inputSum.value = Number(inputSum.value.replace(/\D/g, "")).toLocaleString("ru")

    function actions(){
        // при изменении значения в инпуте, сохраняем ему разбивку на разряды
        inputSum.value = Number(inputSum.value.replace(/\D/g, "")).toLocaleString("ru");
        // теперь выведем значение инпута в переменную и уберем из него разбивку по разрядам
		let transform = inputSum.value.replace(/\s+/g, "");
		transform = transform * 1;
        // в скрытый инпут передаем это значение, без разбивки по разрядам
		inputSumDouble.value = transform;

        formula()
    }

    inputSum.addEventListener('input', actions)
    inputTime.addEventListener('input', formula)

    // выбираем значение по кликам на кнопки
    document.querySelectorAll('.js-btnWrap').forEach(item => {
        item.querySelectorAll('.js-dataBtn')[0].classList.add('is-active')
        item.addEventListener('click', function(e){
            let btn = e.target.closest('button')
            if(btn){
                item.querySelectorAll('.js-dataBtn').forEach(elem => {
                    elem.classList.remove('is-active')
                })
                btn.classList.add('is-active')
    
            }
            if(e.target.closest('.js-dataSum')){
                let million = Number(e.target.closest('.js-dataSum').querySelector('.js-dataValue').innerText) * 1000000
                inputSum.value = million
                actions()
            }
            if(e.target.closest('.js-dataTime')){
                inputTime.value = Number(e.target.closest('.js-dataTime').querySelector('.js-dataValue').innerText)
                actions()
            }
            if(e.target.closest('.js-dataPercent')){
                inputPercent.value = Number(e.target.closest('.js-dataPercent').querySelector('.js-dataValue').innerText)
                actions()
            }
        })
    })

    inputSum.addEventListener('input', function(){

        // значение в инпуте с суммой не может быть меньше 300000
        if(inputSumDouble.value < 300000){
            inputSumDouble.value = 300000
            inputSum.value = Number(inputSumDouble.value.replace(/\D/g, "")).toLocaleString("ru");
        }

        // если данные, введенные вручную в инпуты совпадают с данными в кнопке, то эта кнопка становится активной
        document.querySelectorAll('.js-dataSum').forEach(item => {
            if( inputSumDouble.value == +item.querySelector('.js-dataValue').innerText * 1000000  ){
                item.classList.add('is-active')
            } else{
                item.classList.remove('is-active')
            }
        })
    })
    
    inputTime.addEventListener('input', function(){

        // значение в инпуте со сроком не может быть ниже 1 и выше 30
        if(inputTime.value <= 1){
            inputTime.value = 1
        } else if(inputTime.value > 30){
            inputTime.value = 30
        }
        formula()

        // если данные, введенные вручную в инпуты совпадают с данными в кнопке, то эта кнопка становится активной
        document.querySelectorAll('.js-dataTime').forEach(item => {
            if(this.value == +item.querySelector('.js-dataValue').innerText){
                item.classList.add('is-active')
            } else{
                item.classList.remove('is-active')
            }
        })
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ КАРТА, ОТЛОЖЕННАЯ ЗАГРУЗКА (ЧТОБЫ УЛУЧШИТЬ ПОКАЗАТЕЛИ - PageSpeed Insights)
const map = () => {

    setTimeout(function() {
        var headID = document.getElementsByTagName("body")[0];         
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
        headID.appendChild(newScript);
    }, 1000);
    setTimeout(function() {
            var myMap = new ymaps.Map("map", {
            center: [55.707740, 37.625406],
            zoom: 16,
            controls: ['smallMapDefaultSet']
        }, {
            searchControlProvider: 'yandex#search'
        });

        myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "Point"
            },
        });
        myMap.geoObjects
            .add(myGeoObject)
            .add(new ymaps.Placemark([55.707740, 37.625406], {
                balloonContent: '<strong>г. Москва, Гамсоновский переулок, д. 2, стр. 1, БЦ «ЦЕНТР-Т» (м. Тульская)</strong>',
                iconCaption: 'БЦ «ЦЕНТР-Т» (м. Тульская)'
            }, {
                preset: 'islands#blueCircleDotIconWithCaption',
                iconCaptionMaxWidth: '200'
            }));

        myMap.setType('yandex#publicMap');

        myMap.behaviors.disable('scrollZoom');
        //на мобильных устройствах... (проверяем по userAgent браузера)
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //... отключаем перетаскивание карты
            myMap.behaviors.disable('drag');
        }
    }, 2000);

}



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
headerLogic()
inputMask()
sliders()
calculator()
map()
