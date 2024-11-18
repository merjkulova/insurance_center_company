"use strict";

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  document.body.classList.add("_touch");

  let menuArrows = document.querySelectorAll(".menu__arrow");
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click", function (e) {
        menuArrow.parentElement.classList.toggle("_active");
      });
    }
  }
} else {
  document.body.classList.add("_pc");
}  

// меню бургер
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}

const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        pageYOffset -
        document.querySelector("header").offsetHeight;

      if (iconMenu.classList.contains("_active")) {
        document.body.classList.remove("_lock");
        iconMenu.classList.remove("_active");
        menuBody.classList.remove("_active");
      }
      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}

// background header
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

//анимация фона главного контейнера
document.addEventListener("mousemove", function (e) {
  const background = document.querySelector(".main__bcg");
  const amountMovedX = (e.clientX / window.innerWidth) * 20;
  const amountMovedY = (e.clientY / window.innerHeight) * 20;
  background.style.transform = `translate(-${amountMovedX}px, -${amountMovedY}px)`;
});

document.addEventListener("DOMContentLoaded", function () {
  // Текст заголовка
  let mainText = 'АООТ "Атиячландырыш меркези" — Комплексные страховые решения';

  // Получаем ссылку на элемент заголовка
  let typingMain = document.getElementById("typing__text");

  // Функция для анимации вывода текста
  function typeWriter(text, i) {
    if (i < text.length) {
      typingMain.innerHTML += text.charAt(i);
      i++;
      setTimeout(function () {
        typeWriter(text, i);
      }, 70); // Скорость вывода символов (в миллисекундах)
    }
  }

  // Запускаем анимацию вывода текста
  typeWriter(mainText, 0);
});

document.addEventListener("DOMContentLoaded", function () {
  let mainTextEn =
    '"Atiyachlandyrysh Merkezi" OJSC - Comprehensive insurance solutions';

  let typingMainEn = document.getElementById("typing__text-en");

  function typeWriterEn(text, i) {
    if (i < text.length) {
      typingMainEn.innerHTML += text.charAt(i);
      i++;
      setTimeout(function () {
        typeWriterEn(text, i);
      }, 70); // Скорость вывода символов (в миллисекундах)
    }
  }
  typeWriterEn(mainTextEn, 0);
});
document.addEventListener("DOMContentLoaded", function () {
  let mainTextTm =
    '"Ätiýaçlandyryş merkezi" AGPJ - Giňişleýin ätiýaçlandyryş çözgütleri';

  let typingMainTm = document.getElementById("typing__text-tm");

  function typeWriterTm(text, i) {
    if (i < text.length) {
      typingMainTm.innerHTML += text.charAt(i);
      i++;
      setTimeout(function () {
        typeWriterTm(text, i);
      }, 70); // Скорость вывода символов (в миллисекундах)
    }
  }
  typeWriterTm(mainTextTm, 0);
});

// АНИМАЦИЯ МЕИНА
document.addEventListener("DOMContentLoaded", function () {
  // Получаем ссылку на элемент хедера
  var main = document.getElementById("main-column");

  // Задаем начальное состояние хедера
  main.style.opacity = 0;
  main.style.transform = "translateY(-100%)";

  // Запускаем анимацию через 2 секунды после загрузки страницы
  setTimeout(function () {
    anime({
      targets: main,
      translateY: [main - 100, 0], // Анимация появления сверху
      opacity: [0, 1], // Анимация прозрачности
      duration: 1000, // Продолжительность анимации в миллисекундах
      easing: "easeOutQuad", // Функция анимации (может быть изменена на другую)
    });
  }, 1000); // 2 секунды задержки перед анимацией
});

// animation elements scroll
function onEntry(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add("element-show");
    }
    // else{
    //   change.target.classList.remove('element-show');
    // }
  });
}
let options = {
  threshold: [0.5],
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll(".element-animation");
for (let elm of elements) {
  observer.observe(elm);
}

//счетчик
// счетчик ratting
function out1() {
  const time = 1000; //ms
  const step = 10;

  function outNum(num, elem) {
    let l = document.querySelector("#" + elem);
    let n = 0;
    let t = Math.round(time / (num / step));
    let interval = setInterval(() => {
      n = n + step;
      if (n >= num) {
        clearInterval(interval);
        n = num;
      }
      l.innerHTML = n + "+";
    }, t);
  }

  outNum(15, "out-c");
  outNum(900, "out-p");
  outNum(1000, "out-r");
}

//анимация фона связаться контейнера
document.addEventListener("mousemove", function (e) {
  const background = document.querySelector(".us__bcg");
  const amountMovedX = (e.clientX / window.innerWidth) * 40;
  const amountMovedY = (e.clientY / window.innerHeight) * 40;
  background.style.transform = `translate(-${amountMovedX}px, -${amountMovedY}px)`;
});

// alert for button contact-us
// function func_1(){
// 	alert('Кнопка отправки находится в разработке')
// }

// обработка форм


// async function submitForm(event) {
//   event.preventDefault();
//   const form = event.target;
//   const formBtn = document.querySelector('.form__btn');
//   const formSendResult = document.querySelector('.form__send-result');
//   formSendResult.textContent = '';

//   // Получение данных из формы
//   const formData = new FormData(form);
//   const formDataObject = {};

//   formData.forEach((value, key) => {
//       formDataObject[key] = value.trim().replace(/\s+/g, ' ');
//   });

//   console.log(formDataObject)
//   // Валидация полей на клиенте
//   const validationErrors = validateForm(formDataObject);

//   // Обновление интерфейса для отображения ошибок
//   displayErrors(validationErrors);
//   if (validationErrors.length > 0) return;

//   // // Отправка формы на бэк
//   // sendFormData(form, formBtn, formSendResult, formDataObject);
// }

// // async function sendFormData(form, formBtn, formSendResult, formDataObject) {

// //   try {
// //       formBtn.textContent = 'Loading...';
// //       formBtn.disabled = true;

// //       const response = await fetch('http://localhost:5000/send-email', {
// //           method: 'POST',
// //           headers: {
// //               'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(formDataObject),
// //       });

// //       if (response.ok) {
// //           formSendResult.textContent = 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';
// //           form.reset();
// //       } else if (response.status === 422) {
// //           const errors = await response.json();
// //           console.log(errors);
// //           throw new Error('Ошибка валидации данных');
// //       } else {
// //           throw new Error(response.statusText);
// //       }

// //   } catch (error) {
// //       console.error(error.message);
// //       formSendResult.textContent = 'Письмо не отправлено! Попробуйте позже.';
// //       formSendResult.style.color = 'red';

// //   } finally {
// //       formBtn.textContent = 'Отправить';
// //       formBtn.disabled = false;
// //   }
// // }

// function validateForm(formData) {
//   const { name, number, email, service, message } = formData;

//   const numberRegex = /^\+[0-9]{5,15}$/;
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const errors = [];

//   if (!name) {
//       errors.push({ field: 'name', message: 'Пожалуйста, введите ваше ФИО.' });
//   } else if (name.length < 5 || name.length > 20) {
//       errors.push({ field: 'name', message: 'Пожалуйста, введите корректные данные.' });
//   }

//   if (!number) {
//       errors.push({ field: 'number', message: 'Пожалуйста, введите номер телефона.' });
//   } else if (!numberRegex.test(number)) {
//       errors.push({ field: 'number', message: 'Пожалуйста, введите корректный номер телефона.' });
//   }

//   if (!email) {
//       errors.push({ field: 'email', message: 'Пожалуйста, введите адрес электронной почты.' });
//   } else if (!emailRegex.test(email) || (email.length < 5 || email.length > 100)) {
//       errors.push({ field: 'email', message: 'Пожалуйста, введите корректный адрес электронной почты.' });
//   }

//   if (!service || service === '16') {
//     errors.push({ field: 'service', message: 'Пожалуйста, выберите услугу.' });
// }

//   if (!message) {
//       errors.push({ field: 'message', message: 'Пожалуйста, введите сообщение.' });
//   } else if (message.length < 2 || message.length > 400) {
//       errors.push({ field: 'message', message: 'В сообщении должно быть мин. 10 и не более 400 символов.' });
//   }
  
//   return errors;
// }

// function displayErrors(errors) {
//   // Скрытие всех ошибок перед отображением новых
//   const errorElements = document.querySelectorAll('.form__error');
//   errorElements.forEach((errorElement) => {
//       errorElement.textContent = '';
//   });

//   if(errors.length < 1) return;

//   // Отображение ошибок для соответствующих полей
//   errors.forEach((error) => {
//       const { field, message } = error;
//       const errorElement = document.querySelector(`[data-for="${field}"]`);
//       errorElement.textContent = message;
//   });
// }

const feedback__form = document.querySelector('#feedback-form');

function sendFeedback(feedback){
  fetch("#####",{
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(feedback),
  }).then((response)=>response.json()).then(data => {
    console.log(data);
    alert('Успешно!')
  }).catch((error) =>{
    console.error(error);
    alert("Ошибка!")
  });
}

feedback__form.addEventListener('submit', (e) => {
  e.preventDefault();
  const feedbackFormData = new FormData(e.target);
  console.log('feedbackFormData', feedbackFormData);
  const feedback = Object.fromEntries(feedbackFormData);
  console.log('feedback', feedback);

  sendFeedback(feedback);
})