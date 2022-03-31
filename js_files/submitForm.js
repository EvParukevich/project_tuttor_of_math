const {form} = document.forms;

function retrieveFormValue(event) {
    event.preventDefault();

    const values = {};

    for (let field of form) {
        const {name} = field;

        if (name) {
            const {value} = field;

            values[name] = value;
        }
    }

    console.log(values);
}


form.addEventListener('submit', retrieveFormValue);