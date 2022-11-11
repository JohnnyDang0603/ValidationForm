var username = document.querySelector('#username');
var email = document.querySelector('#email');
var password = document.querySelector('#password');
var confirmPassword = document.querySelector('#confirm-password');
var form = document.querySelector('form');
function showError(input, mess) {
  let parent = input.parentElement;
  let small = parent.querySelector('small');
  parent.classList.add('error');
  small.innerText = mess;
}
function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector('small');
  parent.classList.remove('error');
  small.innerText = '';
}

function checkEmptyError(listInput) {
  let isEmptyError = false;
  listInput.forEach((input) => {
    input.value = input.value.trim();
    if (!input.value) {
      isEmptyError = true;
      showError(input, 'Không được để trống');
    } else {
      showSuccess(input);
    }
  });
  return isEmptyError;
}
function checkEmailError(input) {
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  input.value = input.value.trim();
  let isEmailError = !regexEmail.test(input.value);
  if (regexEmail.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'Email Invalid');
  }
  return regexEmail.test(input.value);
}

function checkLengthError(input, min, max) {
  input.value = input.value.trim();
  if (input.value.length < min) {
    showError(input, `Phải có ít nhất ${min} ký tự`);
    return true;
  }
  if (input.value.length > max) {
    showError(input, `Không được quá ${max} ký tự `);
    return true;
  }
  showSuccess(input);
  return false;
}
function checkMatchPasswordError(passwordInput, cfPasswordInput) {
  if (passwordInput.value !== cfPasswordInput.value) {
    showError(cfPasswordInput, 'MK không trùng khớp');
    return true;
  }
  return false;
}
form.addEventListener('submit', function (e) {
  e.preventDefault();
  let isEmptyError = checkEmptyError([
    username,
    email,
    password,
    confirmPassword,
  ]);
  let isEmailError = checkEmailError(email);
  let isPasswordLengthError = checkLengthError(password, 3, 10);
  let isUserNameLengthError = checkLengthError(username, 3, 10);
  let isMatchError = checkMatchPasswordError(password, confirmPassword);
});
