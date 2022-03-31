/* const form = document.getElementById('contacts_form');

console.log(form);
function retrieveFormValue(event) {
    event.preventDefault();

   const name = form.querySelector('[name="name"]'),
         telephone = form.querySelector('[name="telephone"]');

    const values = {
        name: name.value,
        telephone: telephone.value
    }

    console.log('subObject', values);
}

form.addEventListener('submit', retrieveFormValue) */

const isCheckboxOrRadio = type => ['checkbox', 'radio'].includes(type);

// const {form} = document.forms;
const form = document.getElementById('contacts_form');

function retrieveFormValue(event) {
    event.preventDefault();

    const values = {};

    for (let field of form) {
        const {name} = field;

        if (name) {
            const {type, checked, value} = field;

            values[name] = isCheckboxOrRadio(type) ? checked : value;
        }
    }

    // history.go();
    console.log('submitObj', values);
}

form.addEventListener('submit', retrieveFormValue)