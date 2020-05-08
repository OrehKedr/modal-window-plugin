$.confirm = function(options) {
  return new Promise( (resolve, reject) => {
    const modal = $.modal({
      title: options.title,
      width: '400px',
      closable: false,
      content: options.content,

      // По аналогии с модными фреймворками создадим "хук" для этапа "закрытие" жизненного цикла модалки.
      // По сути, не обязательно жёстко кодировать этот хук здесь, а можно передавать функцию
      // в качестве поля объекта конфигурации при вызове $.confirm({...options}), см. index.js.
      // Здесь это сделано для наглядности. 
      // Этот хук будем по условию вызывать в методе $.modal.close(), см. modal.js.
      onClose() {
        modal.destroy()
      },
      footerButtons: [
        {text: 'Отмена', type: 'secondary', handler() {
          modal.close();
          reject();
        }},
        {text: 'Удалить', type: 'danger', handler() {
          modal.close();
          resolve();
        }}
      ]
    });

    // Добавление модального окна в DOM-дерево - асинхронная операция.
    // Для того, чтобы сработала анимация, нужно искусственно выставить задержку.
    setTimeout( () => modal.open(), 200);
  });
};