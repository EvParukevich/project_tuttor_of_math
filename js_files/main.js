import { form, retrieveFormValue } from './submitForm.js';
import { scrollUp } from './scrollUp.js';

form.addEventListener('submit', retrieveFormValue)

document.addEventListener('DOMContentLoaded', scrollUp);