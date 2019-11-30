const askForm = document.querySelector('.question-screen-1__form');
const askOptions = askForm.elements.question_1;
const usersPecentContainer = document.querySelector('.question-screen-1__percent');
const userPercent = document.querySelector('.percent');
const userChoise = document.querySelector('.option');
const askDoneBtn = document.querySelector('.question-screen-1__btn');



askForm.addEventListener('change', openContainer);

function openContainer() {

    changeTextInContainer();

    if (askOptions.value) {
        usersPecentContainer.classList.add('question-screen-1__percent--open');
        askDoneBtn.classList.add('question-screen-1__btn--open');
    }
};

function changeTextInContainer() {

    userChoise.textContent = `пользвателей — вариант ${askOptions.value}`

    if (askOptions.value === 'A') {
        userPercent.textContent = '47,6%';
        return;
    }

    if (askOptions.value === 'B') {
        userPercent.textContent = '52,4%';
        return;
    }

};