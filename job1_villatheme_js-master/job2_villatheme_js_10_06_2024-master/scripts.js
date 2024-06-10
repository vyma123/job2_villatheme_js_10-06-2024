const container = document.querySelector('.main > .div');
const saveD = document.getElementById('saveD');

window.addEventListener('load', () => {
  const saveForms =
    JSON.parse(localStorage.getItem('forms')) || [];

  saveForms.forEach((form) => {
    if (form.type === 'textarea') {
      addTextareaField(form);
    } else if (form.type === 'btn') {
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
      'input, select, textarea'
    );
    const data = {};

    inputs.forEach((input) => {
      if (
        input.id === 'name' &&
        input.value.trim() === ''
      ) {
        input.classList.add('warning');
        checkEmpty = true;
      } else if (
        input.id === 'name2' &&
        input.value.trim() === ''
      ) {
        input.classList.add('warning');
        checkEmpty2 = true;
      } else if (
        input.id === 'id3' &&
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

    if (form.querySelector('#type')) {
      data.type = form.querySelector('#type').value;
    } else if (form.querySelector('#type3')) {
      data.type = 'btn';
    } else if (form.querySelector('#wrap2')) {
      data.type = 'textarea';
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
  alert('đã lưu');
  localStorage.setItem('forms', JSON.stringify(formData));
}

function updateDataToLocal() {
  const forms = document.querySelectorAll(
    '.main > .div > .div'
  );

  let checkEmpty = false;
  let checkEmpty2 = false;
  let checkEmpty3 = false;

  const formData = Array.from(forms).map((form) => {
    const inputs = form.querySelectorAll(
      'input, select, textarea'
    );
    const data = {};

    inputs.forEach((input) => {
      if (
        input.id === 'name' &&
        input.value.trim() === ''
      ) {
        input.classList.add('warning');
        checkEmpty = true;
      } else if (
        input.id === 'name2' &&
        input.value.trim() === ''
      ) {
        input.classList.add('warning');
        checkEmpty2 = true;
      } else if (
        input.id === 'id3' &&
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

    if (form.querySelector('#type')) {
      data.type = form.querySelector('#type').value;
    } else if (form.querySelector('#type3')) {
      data.type = 'btn';
    } else if (form.querySelector('#wrap2')) {
      data.type = 'textarea';
    }

    return data;
  });

  alert('đã xóa');
  localStorage.setItem('forms', JSON.stringify(formData));
}

function addInputField(data = {}) {
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
                                <option value="button" ${
                                  data.type === 'button'
                                    ? 'selected'
                                    : ''
                                }>button</option>
                                <option value="checkbox" ${
                                  data.type === 'checkbox'
                                    ? 'selected'
                                    : ''
                                }>checkbox</option>
                                <option value="color" ${
                                  data.type === 'color'
                                    ? 'selected'
                                    : ''
                                }>color</option>
                                <option value="date" ${
                                  data.type === 'date'
                                    ? 'selected'
                                    : ''
                                }>date</option>
                                <option value="datetime" ${
                                  data.type ===
                                  'datetime-local'
                                    ? 'selected'
                                    : ''
                                }>datetime-local</option>
                                <option value="email" ${
                                  data.type === 'email'
                                    ? 'selected'
                                    : ''
                                }>email</option>
                                <option value="file" ${
                                  data.type === 'file'
                                    ? 'selected'
                                    : ''
                                }>file</option>
                                <option value="hidden" ${
                                  data.type === 'hidden'
                                    ? 'selected'
                                    : ''
                                }>hidden</option>
                                <option value="image" ${
                                  data.type === 'image'
                                    ? 'selected'
                                    : ''
                                }>image</option>
                                <option value="month" ${
                                  data.type === 'month'
                                    ? 'selected'
                                    : ''
                                }>month</option>
                                <option value="number" ${
                                  data.type === 'number'
                                    ? 'selected'
                                    : ''
                                }>number</option>
                                <option value="password" ${
                                  data.type === 'password'
                                    ? 'selected'
                                    : ''
                                }>password</option>
                                <option value="radio" ${
                                  data.type === 'radio'
                                    ? 'selected'
                                    : ''
                                }>radio</option>
                                <option value="range" ${
                                  data.type === 'range'
                                    ? 'selected'
                                    : ''
                                }>range</option>
                                <option value="reset" ${
                                  data.type === 'reset'
                                    ? 'selected'
                                    : ''
                                }>reset</option>
                                <option value="search" ${
                                  data.type === 'search'
                                    ? 'selected'
                                    : ''
                                }>search</option>
                                <option value="submit" ${
                                  data.type === 'submit'
                                    ? 'selected'
                                    : ''
                                }>submit</option>
                                <option value="tel" ${
                                  data.type === 'tel'
                                    ? 'selected'
                                    : ''
                                }>tel</option>
                                <option value="text" ${
                                  data.type === 'text'
                                    ? 'selected'
                                    : ''
                                }>text</option>
                                <option value="time" ${
                                  data.type === 'time'
                                    ? 'selected'
                                    : ''
                                }>time</option>
                                <option value="url" ${
                                  data.type === 'url'
                                    ? 'selected'
                                    : ''
                                }>url</option>
                                <option value="week" ${
                                  data.type === 'week'
                                    ? 'selected'
                                    : ''
                                }>week</option>
                            </select>
                        </div>
                        <div class="box_input">
                            <label for="label">Label</label>
                            <input  type="text" id="label" name="label" required value="${
                              data.label || ''
                            }">
                        </div>
                        <div class="box_input">
                            <label for="name">Name</label>
                            <input type="text" placeholder='required' id="name" name="name" required value="${
                              data.name || ''
                            }">
                        </div>
                        <div class="box_input">
                            <label for="id">Id</label>
                            <input type="text" id="id" name="id" required value="${
                              data.id || ''
                            }">
                        </div>
                        <div class="box_input">
                            <label for="placeholder">Placeholder</label>
                            <input type="text" id="placeholder" name="placeholder" required value="${
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
                    <form class="form">
                        <div class="box_input">
                            <label class="wrap2" for="type">Wrap</label>
                            <select id='wrap2'>
                                <option value="hard" ${
                                  data.wrap2 === 'hard'
                                    ? 'selected'
                                    : ''
                                }>hard</option>
                                <option value="soft" ${
                                  data.wrap2 === 'soft'
                                    ? 'selected'
                                    : ''
                                }>soft</option>
                            </select>
                        </div>
                        <div class="box_input">
                            <label for="name2">Name</label>
                            <input value="${
                              data.name2 || ''
                            }" type="text" id="name2" name="name2" placeholder='required' required>
                        </div>
                        <div class="box_input">
                            <label for="row2">Rows</label>
                            <input value="${
                              data.rows2 || '1' // Giá trị mặc định là 1 nếu không có dữ liệu
                            }" type="number" id="rows2" minlength="1" name="rows2" required>
                        </div>
                        <div class="box_input">
                            <label for="cols2">Columns</label>
                            <input value="${
                              data.cols2 || '1' // Giá trị mặc định là 1 nếu không có dữ liệu
                            }" type="number" id="cols2" minlength="1" name="cols2" required>
                        </div>
                        <div class="box_input end">
                            <label for="readonly2">Readonly</label>
                            <input value="${
                              data.readonly2 || 'checked'
                            }" class="last_input" type="checkbox" id="readonly2" name="readonly2" required>
                        </div>
                        <div class="box_input end">
                            <label value="${
                              data.required2 || 'checked'
                            }" for="required2">Required</label>
                            <input class="last_input" type="checkbox" id="required2" name="required2" required>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;
  container.insertAdjacentHTML('beforeend', formHTML);
}

function addButtonField(data = {}) {
  const id = Date.now();

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
                    <form class="form">
                        <div class="box_input">
                            <label class="label3" for="type">Type</label>
                            <select id='type3'>
                               <option value="button" 
                               ${
                                 data.button === 'button'
                                   ? 'selected'
                                   : ''
                               }
                               >button</option>
                                <option value="reset"  ${
                                  data.button === 'reset'
                                    ? 'selected'
                                    : ''
                                }>reset</option>
                                <option value="submit"  ${
                                  data.button === 'submit'
                                    ? 'selected'
                                    : ''
                                }>submit</option>

                            </select>
                        </div>
                        <div class="box_input">
                            <label for="name3">Name</label>
                            <input  value="${
                              data.name3 || ''
                            }"  type="text" id="name3" name="name3" required>
                        </div>
                        <div class="box_input">
                            <label for="id3">Id</label>
                            <input value="${
                              data.id3 || ''
                            }" type="text" id="id3" name="id3" placeholder='required' required>
                        </div>
                        <div class="box_input">
                            <label for="value3">Value</label>
                            <input value="${
                              data.value3 || ''
                            } " type="text" id="value3" name="value3" required>
                        </div>
                        <div class="box_input end">
                            <label for="disabled3">Disabled</label>
                            <input 
                            value="${data.value3 || ''} " 
                             class="last_input" type="checkbox" id="disabled3" name="disabled3" required>
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
    updateDataToLocal();
  }
}

saveD.addEventListener('click', function (event) {
  event.preventDefault();
  saveDataToLocal();
});
