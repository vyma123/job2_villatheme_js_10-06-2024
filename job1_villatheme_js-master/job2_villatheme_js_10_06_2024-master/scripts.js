const container = document.querySelector('.main > .div');
const saveD = document.getElementById('saveD');

window.addEventListener('load', () => {
  const saveForms =
    JSON.parse(localStorage.getItem('forms')) || [];

  saveForms.forEach((form) => {
    if (form.formType === 'textareafield') {
      addTextareaField(form);
    } else if (form.formType === 'buttonfield') {
      addButtonField(form);
    } else {
      addInputField(form);
    }
  });
});

function saveDataToLocal() {
  const forms = document.querySelectorAll(
    '.main > .div > .div'
  );

  let checkEmpty = false;
  let checkEmpty2 = false;
  let checkEmpty3 = false;

  const formData = Array.from(forms).map((form) => {
    const inputs = form.querySelectorAll(
      'input, select, textarea',
      'form'
    );
    const data = {};

    inputs.forEach((input) => {
      if (
        input.name === 'name' &&
        input.value.trim() === ''
      ) {
        input.classList.add('warning');
        checkEmpty = true;
      } else if (
        input.name === 'name2' &&
        input.value.trim() === ''
      ) {
        input.classList.add('warning');
        checkEmpty2 = true;
      } else if (
        input.name === 'id3' &&
        input.value.trim() === ''
      ) {
        input.classList.add('warning');
        checkEmpty3 = true;
      } else {
        input.classList.remove('warning');
      }

      input.addEventListener('focus', () => {
        input.classList.remove('warning');
      });

      data[input.id] =
        input.type === 'checkbox'
          ? input.checked
          : input.value;
    });
    if (form.querySelector('#buttonform')) {
      data.formType = 'buttonfield';
    } else if (form.querySelector('#type')) {
      data.formType = 'inputfield';
    } else if (form.querySelector('#wrap')) {
      data.formType = 'textareafield';
    }

    return data;
  });

  if (checkEmpty) {
    alert('Name input field is required');
    return;
  }

  if (checkEmpty2) {
    alert('Name textarea field is required');
    return;
  }

  if (checkEmpty3) {
    alert('Id button field is required');
    return;
  }

  if (formData.length > 0) {
    alert('đã lưu');
    localStorage.setItem('forms', JSON.stringify(formData));
  } else {
    alert('chưa thêm form');
  }
}

function numbersOnly(input) {
  var regex = /[^a-zA-Z0-9]/g;
  input.value = input.value.replace(regex, '');
}

function lettersOnly(input) {
  // Remove leading numbers
  if (/^[0-9]/.test(input.value)) {
    input.value = input.value.replace(/^[0-9]+/, '');
  }

  if (
    !/^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/.test(input.value)
  ) {
    input.value = input.value.replace(
      /^[^a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+/,
      ''
    );
  }

  input.value = input.value.replace(
    /[^a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]/g,
    ''
  );
}

function addInputField(data = {}) {
  const typeOptions = [
    'button',
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ];

  const typeOptionsHTML = typeOptions
    .map(
      (option) =>
        `
    <option value="${option}" ${
          data.type === option ? 'selected' : ''
        }>${option}</option>
  `
    )
    .join('');

  console.log(typeOptionsHTML);

  const id = Date.now();

  const formHTML = `
    <div class="div" data-id="${id}">
        <div class="section">
            <div class="forms">
                <div class="content">
                    <div class="box_top">
                        <p class="name">Input field</p>
                        <button class="delete" onclick="deleteForm(${id})">
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>
                    <form class="form" name='forms' >
                        <div class="box_input">
                            <label class="label" for="type">Type</label>
                            <select id='type'>
                              ${typeOptionsHTML}
                            </select>
                        </div>
                        <div class="box_input">
                            <label for="label">Label</label>
                            <input onkeyup="lettersOnly(this)"  type="text" id="label" name="label" required value="${
                              data.label || ''
                            }">
                        </div>
                        <div class="box_input">
                            <label for="name">Name</label>
                            <input class='name' onkeyup="lettersOnly(this)" type="text" placeholder='required' id="name" name="name" required value="${
                              data.name || ''
                            }">
                        </div>
                        <div class="box_input">
                            <label for="id">Id</label>
                            <input  onkeyup="lettersOnly(this)" type="text" id="id" name="id" required value="${
                              data.id || ''
                            }">
                        </div>
                        <div class="box_input">
                            <label for="placeholder">Placeholder</label>
                            <input
                             onkeyup="lettersOnly(this)"

                             type="text" id="placeholder" name="placeholder" required value="${
                               data.placeholder || ''
                             }">
                        </div>
                        <div class="box_input end">
                            <label for="required">Required</label>
                            <input class="last_input" type="checkbox" id="required" name="required" ${
                              data.required ? 'checked' : ''
                            }>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', formHTML);
}

function addTextareaField(data = {}) {
  const id = Date.now();

  const typeOptions = ['hard', 'soft'];

  const typeOptionsHTML = typeOptions
    .map(
      (option) =>
        `
    <option value="${option}" ${
          data.type === option ? 'selected' : ''
        }>${option}</option>
    `
    )
    .join('');

  console.log(typeOptionsHTML);

  const formHTML = `
    <div class="div" data-id='${id}'>
        <div class="section">
            <div class="forms">
                <div class="content">
                    <div class="box_top">
                        <p class="name">Textarea field</p>
                        <button class="delete" onclick="deleteForm(${id})">
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>
                    <form class="form" id='wrap'>
                        <div class="box_input">
                            <label class="wrap" for="type">Wrap</label>
                            <select id='wrap'>
                                ${typeOptionsHTML}
                            </select>
                        </div>
                         <div class="box_input">
                            <label for="label">Label</label>
                            <input
                             onkeyup="lettersOnly(this)"
                             value="${
                               data.label || ''
                             }" type="text" id="label" name="label2" required>
                        </div>
                        <div class="box_input">
                            <label for="name">Name</label>
                            <input 
                             onkeyup="lettersOnly(this)"
                            value="${
                              data.name || ''
                            }" type="text" id="name" name="name2" placeholder='required' required>
                        </div>
                        <div class="box_input">
                            <label for="rows">Rows</label>
                            <input
                             onkeyup="numbersOnly(this)"
                             value="${
                               data.rows || '' // Giá trị mặc định là 1 nếu không có dữ liệu
                             }" type="number"  id="rows" name="rows2" required>
                        </div>
                        <div class="box_input">
                            <label for="cols">Columns</label>
                            <input
                             onkeyup="numbersOnly(this)"
                             value="${
                               data.cols || '' // Giá trị mặc định là 1 nếu không có dữ liệu
                             }" type="number" id="cols"  name="cols2" required>
                        </div>
                        <div class="box_input end">
                            <label for="readonly">Readonly</label>
                            <input ${
                              data.readonly ? 'checked' : ''
                            } class="last_input" type="checkbox" id="readonly" name="readonly2">
                        </div>
                        <div class="box_input end">
                            <label for="required">Required</label>
                            <input ${
                              data.required ? 'checked' : ''
                            } class="last_input" type="checkbox" id="required" name="required2">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', formHTML);

  const rowsInput = document.querySelector(
    `[data-id='${id}'] #rows`
  );
  const colsInput = document.querySelector(
    `[data-id='${id}'] #cols`
  );

  rowsInput.addEventListener('input', function () {
    if (parseInt(rowsInput.value) < 0) {
      alert('Không nhập số âm');
      rowsInput.value = '';
    }
  });

  colsInput.addEventListener('input', function () {
    if (parseFloat(colsInput.value) < 0) {
      alert('Không nhập số âm');
      colsInput.value = '';
    }
  });
}

function addButtonField(data = {}) {
  const id = Date.now();

  const typeOptions = ['button', 'reset', 'submit'];

  const typeOptionsHTML = typeOptions
    .map(
      (option) =>
        `
    <option value="${option}" ${
          data.type === option ? 'selected' : ''
        }>${option}</option>
    `
    )
    .join('');

  const formHTML = `
    <div class="div" data-id='${id}'>
        <div class="section">
            <div class="forms">
                <div class="content">
                    <div class="box_top">
                        <p class="name">Button field</p>
                        <button class="delete"  onclick="deleteForm(${id})">
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>
                    <form class="form" id='buttonform'>
                        <div class="box_input">
                            <label class="label" for="type">Type</label>
                            <select id='type'>
                            ${typeOptionsHTML}
                            </select>
                        </div>
                        <div class="box_input">
                            <label for="name">Name</label>
                            <input
                             onkeyup="lettersOnly(this)"
                              value="${
                                data.name || ''
                              }"  type="text" id="name" name="name3" required>
                        </div>
                        <div class="box_input">
                            <label for="id">Id</label>
                            <input
                             onkeyup="lettersOnly(this)"
                             value="${
                               data.id || ''
                             }" type="text" id="id" name="id3" placeholder='required' required>
                        </div>
                        <div class="box_input">
                            <label for="value">Value</label>
                            <input
                             onkeyup="lettersOnly(this)"
                             value="${
                               data.value3 || ''
                             } " type="text" id="value" name="value3" required>
                        </div>
                        <div class="box_input end">
                            <label for="disabled">Disabled</label>
                            <input 
                            value="${data.value || ''} " 
                             class="last_input" type="checkbox" id="disabled" name="disabled3" required>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;
  container.insertAdjacentHTML('beforeend', formHTML);
}

function deleteForm(id) {
  const form = document.querySelector(
    `.main > .div > .div[data-id ="${id}"]`
  );
  if (form) {
    form.remove();
  }
}

saveD.addEventListener('click', function (event) {
  event.preventDefault();
  saveDataToLocal();
});
