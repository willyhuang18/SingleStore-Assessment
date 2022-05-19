const email = document.getElementById('email');

function setError(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'input-box error';
	small.innerText = message;
}

function setSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'input-box success';
}
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const emailValue = email.value.trim();

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Please make sure this not a personal email address');
    } else {
        setSuccess(email);
    }

};


document.querySelectorAll('.custom-select').forEach(setupSelector);
function setupSelector(selector) {
  selector.addEventListener('change', e => {
    console.log('changed', e.target.value);
  })

  selector.addEventListener('mousedown', e => {
    if(window.innerWidth >= 420) {
      e.preventDefault();

      const select = selector.children[0];
      const dropDown = document.createElement('ul');
      dropDown.className = "selector-options";

      [...select.children].forEach(option => {
        const dropDownOption = document.createElement('li');
        dropDownOption.textContent = option.textContent;

        dropDownOption.addEventListener('mousedown', (e) => {
          e.stopPropagation();
          select.value = option.value;
          selector.value = option.value;
          select.dispatchEvent(new Event('change'));
          selector.dispatchEvent(new Event('change'));
          dropDown.remove();
        });

        dropDown.appendChild(dropDownOption);   
      });

      selector.appendChild(dropDown);
      // handle click out
      document.addEventListener('click', (e) => {
        if(!selector.contains(e.target)) {
          dropDown.remove();
        }
      });
    }
  });
}

function selectOption(){
    let radio = document.forms[0];
    let text = "";
    let size = document.getElementById('size').value;
    console.log(size);
    let email = document.getElementById('email').value;
    console.log(email);


    for (let i = 0; i < radio.length; i++) {
        if(radio[i].checked){
            text += radio[i].value + "";
        }    
    }

    if(text == "Price" || text == "Full Text Search" || text == "Document Storage" || size == "1-10"){
        window.location.href = "./unqualified.html";
    }else if(text == "" || size =="" || email == " "){
        window.alert("Please fill out the form!")
    }else{
        window.location.href = "./qualified.html";
    }
    validateInputs();
}
