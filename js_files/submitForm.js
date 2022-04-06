const isCheckboxOrRadio = type => ['checkbox', 'radio'].includes(type);

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
    
    localStorage.setItem('form', JSON.stringify(values));
    localStorage.getItem('form');
    
    document.querySelector('#form').value = null;
    document.querySelector('#tel').value = null;
}

export {retrieveFormValue, isCheckboxOrRadio, form};