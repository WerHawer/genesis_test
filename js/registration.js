const userForm = document.querySelector('.registration-screen__reg-form');
const userNameInput = userForm.elements.user_name;
const userEmailInput = userForm.elements.user_email;
const userPasswordInput = userForm.elements.user_password;
const userConfirm18 = userForm.elements.confirm_18;
const userConfirm18Label = document.querySelector('.registration-screen__confirm')
const userLookingFor = userForm.elements.looking_for;
const formBtn = userForm.elements.form_btn;
const userLink = document.querySelector('.registration-screen__link');
const warningName = document.querySelector('.warning--name');
const warningEmail = document.querySelector('.warning--email');
const warningPassword = document.querySelector('.warning--password');

let userNameGlobal;
let userEmailGlobal;
let userPasswordGlobal;

const usersFromLS = localStorage.getItem('users');
const users = JSON.parse(usersFromLS) || [];

console.log(users);

const passwordBlackList = ['123456', '123456789', 'qwerty', '12345678', '111111', '1234567890', '1234567', 'password', '123123', '987654321', 'qwertyuiop', 'mynoob', '123321', '666666', '18atcskd2w', '7777777', '1q2w3e4r', '654321', '555555', '3rjs1la7qe', 'google', '1q2w3e4r5t', '123qwe', 'zxcvbnm', '1q2w3e', ];

// I know that do like this id creator it`s wrong, but it is only for example
const idCreator = () => Date.now();

const addUser = (name, email, password, lookingFor) => {
    const id = idCreator();
    name = userNameInput.value;
    email = userEmailInput.value.toLowerCase();
    password = userPasswordInput.value;
    lookingFor = userLookingFor.value;

    if (name && email && password && lookingFor) {
        users.push({ id, name, email, password, lookingFor });
        userNameInput.value = '';
        userEmailInput.value = '';
        userPasswordInput.value = '';
        userLookingFor.forEach(el => el.checked = false);
    }

    localStorage.setItem('users', JSON.stringify(users));
};

const isNameValid = userName => !userName.match(/[%#.,*+=?^${}()|/[\]\\]/g);
const isNameLengthGood = userName => userName.length > 2 && userName.length < 16;
const isNameUnique = (userName, arr) => !arr.find(({ name }) => name === userName);

const isPasswordLengthGood = userPassword => userPassword.length > 5;
const isPasswordPopular = userPassword => !passwordBlackList.includes(userPassword);
const isPasswordLatin = userPassword => !userPassword.match(/[^A-Za-z0-9%#.,*+=?^${}()|/<>/;':"[\]\\]/g);

const isEmailUnique = (userEmail, arr) => !arr.find(({ email }) => email === userEmail.toLowerCase());
const isEmaiValid = userEmail => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(userEmail)
}

function nameValidation(userName, arr = users) {

    userName = userNameInput.value;
    let err;

    if (!userName) {
        err = '';
        userNameInput.classList.remove('input--bad');
        warningName.classList.remove('warning--open');
        return;
    }

    if (!isNameValid(userName)) {
        err = 'При вводе имени используйте только буквы и цифры';
        userNameGlobal = '';

    } else if (!isNameLengthGood(userName)) {
        err = 'Имя должно быть больше 2 и меньше 16 символов';
        userNameGlobal = '';


    } else if (!isNameUnique(userName, arr)) {
        err = 'пользователь с таким именем уже существует';
        userNameGlobal = '';


    }

    if (err) {
        console.log(err);
        userNameInput.classList.add('input--bad');
        warningName.classList.add('warning--open');
        warningName.textContent = err;
        return;

    }

    if (userNameInput.classList.contains('input--bad')) {
        userNameInput.classList.remove('input--bad');
        warningName.classList.remove('warning--open')
    }

    userNameGlobal = userName;
    return userName;
}

function passwordValidation() {
    const userPassword = userPasswordInput.value;
    let err;

    if (!userPassword) {
        err = '';
        userPasswordInput.classList.remove('input--bad');
        warningPassword.classList.remove('warning--open');
        return;
    }

    if (!isPasswordLengthGood(userPassword)) {
        err = 'Слишком короткий пароль';
        userPasswordGlobal = '';

    } else if (!isPasswordLatin(userPassword)) {
        err = 'Используйте только латинский алфавит';
        userPasswordGlobal = '';


    } else if (!isPasswordPopular(userPassword)) {
        err = 'Ваш пароль входит в ТОП самых простых и распространённых паролей. Придумайте более сложный пароль';
        userPasswordGlobal = '';


    }

    if (err) {
        console.log(err);
        userPasswordInput.classList.add('input--bad');
        warningPassword.classList.add('warning--open');
        warningPassword.textContent = err;
        return;

    }
    if (userPasswordInput.classList.contains('input--bad')) {
        userPasswordInput.classList.remove('input--bad');
        warningPassword.classList.remove('warning--open');
    }

    userPasswordGlobal = userPassword;
    return userPassword;
}

function emailValidation(userEmail, arr = users) {
    userEmail = userEmailInput.value;
    let err;

    if (!userEmail) {
        err = '';
        userEmailInput.classList.remove('input--bad');
        warningEmail.classList.remove('warning--open');
        return;
    }

    if (!isEmailUnique(userEmail, arr)) {
        err = 'Пользователь с такой почтой уже зарегестрирован'
        userEmailGlobal = '';


    } else if (!isEmaiValid(userEmail)) {
        err = 'Введите валидный email'
        userEmailGlobal = '';

    }

    if (err) {
        console.log(err);
        userEmailInput.classList.add('input--bad');
        warningEmail.classList.add('warning--open');
        warningEmail.textContent = err;
        return;

    }
    if (userEmailInput.classList.contains('input--bad')) {
        userEmailInput.classList.remove('input--bad');
        warningEmail.classList.remove('warning--open');

    }
    userEmailGlobal = userEmail;
    return userEmail.toLowerCase();
}

function finalCheck(e) {

    if (userNameGlobal && userEmailGlobal && userPasswordGlobal && userLookingFor.value && userConfirm18.checked) {
        userLink.classList.add('registration-screen__link--active');
        userLink.href = '#hello';

        // scroll animation+addUser
        $(document).ready(function() {
            $("a[href=#hello]").on("click", function(e) {
                const anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $(anchor.attr('href')).offset().top
                }, 600);

                addUser();
                e.preventDefault();
                return false;
            });
        });


    } else {

        if (userLink.classList.contains('registration-screen__link--active')) {
            userLink.classList.remove('registration-screen__link--active');
        }
    };

    if (!userConfirm18.checked) {
        userConfirm18Label.classList.add('registration-screen__not-confirm');

    } else if (userConfirm18Label.classList.contains('registration-screen__not-confirm')) {
        userConfirm18Label.classList.remove('registration-screen__not-confirm')
    }
}

userForm.addEventListener('click', (e) => e.target === userLink && !userLink.classList.contains('registration-screen__link--active') ? e.preventDefault() : undefined);
formBtn.addEventListener('click', (e) => e.target === userLink && userLink.classList.contains('registration-screen__link--active') ? console.log('good') : e.preventDefault());
userNameInput.addEventListener('input', _.debounce(nameValidation, 500));
userEmailInput.addEventListener('blur', emailValidation);
userPasswordInput.addEventListener('input', passwordValidation)
userForm.addEventListener('input', finalCheck);