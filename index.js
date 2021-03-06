let fruits = [
  {id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
  {id: 2, title: 'Апельсины', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'},
  {id: 3, title: 'Манго', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'},
]

const toHTML = fruit => `
  <div class="col">
    <div class="card">
      <img class="card-img-top" style="height: 300px;" src="${fruit.img}" alt="${fruit.title}">
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
      </div>
    </div>
  </div>
`;

function render() {
  // Краткая запись const html = fruits.map( fruit => toHTML(fruit) );
  const html = fruits.map(toHTML).join('');
  document.querySelector('#fruits').innerHTML = html;
};

render();

// const modal = $.modal({
//   title: 'Цена на товар',
//   closable: true,
//   content: `
//     <p>Modal is working</p>
//     <p>Lorem ipsum dolor sit.</p>
//   `,
//   width: '400px',
//   footerButtons: [
//     // type - css/bootstrap стили кнопки
//     // handler() - обработчик клика по кнопке
//     {text: 'Ok', type: 'primary', handler() {
//       modal.close();
//     }},
//     {text: 'Cancel', type: 'danger', handler() {
//       console.log('Cancel btn clicked');
//       modal.close();
//     }}
//   ]
// });

const priceModal = $.modal({
  title: 'Цена на товар',
  closable: true,
  width: '400px',
  footerButtons: [
    {text: 'Закрыть', type: 'primary', handler() {
      priceModal.close();
    }}
  ]
});


// Делегируем обработку кликов мыши(в т.ч. по кнопкам модалок) вверх до объекта document.
document.addEventListener('click', event => {
  // По умолчанию при клике по кнопке, в url прописывается символ хэш "#". 
  // Отменяем поведение по умолчанию.
  event.preventDefault();
  const btnType = event.target.dataset.btn;
  const id = +event.target.dataset.id;  // Приводим строку к числу. Чтобы вдальнейшем корректно сравнивать значения с fruit.id
  const fruit = fruits.find( f => f.id === id );

  if (btnType === 'price') {
    priceModal.setContent(`
      <p>Цена на ${fruit.title}: <strong>${fruit.price} руб.</strong></p>
    `);
    priceModal.open();
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Вы уверены?',
      content: `
        <p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>
      `
    }).then( () => {
      console.log('Удалить');
      fruits = fruits.filter( f => f.id != id);
      render();
    } ).catch( () => {
      console.log('Отмена');
    } );
  }
});