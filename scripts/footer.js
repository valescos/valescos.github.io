const footerElements = JSON.parse(localStorage.getItem('footerElements')) ||
[
{
  name: 'howto',
  status: ''
},
{
  name: 'idea',
  status: 'is-hidden'
},
{
  name: 'summary',
  status: 'is-hidden'
},
{
  name: 'favor',
  status: 'is-hidden'
}
];


function isFooterElemetHidden(footerElement)
{
  return footerElement.status === 'is-hidden'
}

function arrowChoser(footerElement)
{
  if (isFooterElemetHidden(footerElement))
  {
    return `&#9660;`
  }
  else
  {
    return `&#9650;`
  }
}

function saveToStorage()
{
  localStorage.setItem('footerElements', JSON.stringify(footerElements));
};

export function buildFooter ()
{
  document.querySelector('.footer-container').innerHTML =
  `
  <div> 
  <h3><span class="js-footer-${footerElements[0].name}">${arrowChoser(footerElements[0])} Как пользоваться</span></h3>
  <div class="${footerElements[0].status}">
    <div class="js-footer-${footerElements[0].name}-par">
      <div><img src="/images/arrow-up-circle-svgrepo-com.svg"> Добавить</div>
      <div><img src="images/checkmark-circle-svgrepo-com.svg"> Зачеркнуть</div>
      <div><img src="images/cross-circle-svgrepo-com.svg"> Удалить</div>
      <div><img src="/images/arrow-down-circle-svgrepo-com.svg"> Вернуть вычеркнутое</div>
      <div><img src="/images/refresh-svgrepo-com.svg"> Очистить полностью</div>     
    </div>
  </div>
</div>

<div>
  <h3><span class="js-footer-${footerElements[1].name}">${arrowChoser(footerElements[1])}  История идеи</span></h3>
  <p class="${footerElements[1].status} js-footer-${footerElements[1].name}-par">Среди людей, желающих стать программистами, традиционно бытует мнение:  учись на реальных проектах. Максима эта логична и безапелляционна. За её скобками остается лишь вопрос: а какие это, собственно, реальные проекты? На этом месте из леса забитых идей выходят todo-листы, подделки под фейсбук/амазон и прочие конверторы температур из фаренгейтов в цельсии и обратно. Я решил что негоже в начале пути отходить от традиции. Этот проект — моя вариация todo-листа (интерактивного списка задач). Я довольно часто забываю что-то купить в магазине. В целом, карандаш, блокнот или одно из миллиона мобильных приложений (прошу заметить — уже готовых и протестированных) могут легко решить проблему забывчивости. Но зачем избавляться от позорного недуга, когда его можно обратить в студенческий подвиг?</p>
</div>

<div>
  <h3><span class="js-footer-${footerElements[2].name}">${arrowChoser(footerElements[2])} Краткое описание проекта</span></h3>
  <p class="${footerElements[2].status} js-footer-${footerElements[2].name}-par">Веб-приложение, в котором нечто можно вносить в список и потом вычёркивать из него. Информация должна сохраняться после ухода/возвращения на страницу и её обновления (F5).
  </p>
</div>

<div>
  <h3><span class="js-footer-${footerElements[3].name}">${arrowChoser(footerElements[3])} Просьба тестерам</span></h3>
  <p class="${footerElements[3].status} js-footer-${footerElements[3].name}-par">По возможности проверить на максимальном количестве устройств. Критика и любая обратная связь приветствуются. Буду рад исправить ошибки или внести дополнительный функционал (интересно потренироваться править живой проект).
  </p>
</div>
  `;


  footerElements.forEach((footerElement) =>{
    document.querySelector(`.js-footer-${footerElement.name}`).addEventListener('click', ()=>{
      if(isFooterElemetHidden(footerElement))
      {
        footerElement.status = '';
      }
      else
      {
        footerElement.status = 'is-hidden';
      }
      saveToStorage();
      buildFooter();
    })
  });
}


