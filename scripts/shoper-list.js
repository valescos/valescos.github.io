import {shoperItems, isItemPurchased, addItem, purchaseItem, removeItem} from '../data/item.js';

// import {transliterate} from 'https://cdn.jsdelivr.net/npm/transliteration@2.1.8/dist/browser/bundle.esm.min.js';

function renderEasyShoper()
{
  //intro stuff

        document.querySelector('.intro-hitory')
          .addEventListener('click', ()=>{

            const value = document.querySelector('.intro-hitory').innerHTML;

            if (value === 'История идеи ⮟')
            {
            document.querySelector('.hitory').classList.add('parag-shown');
            document.querySelector('.intro-hitory').innerHTML = 'История идеи &#11165;'
            }
            else
            {
            document.querySelector('.hitory').classList.remove('parag-shown');
            document.querySelector('.intro-hitory').innerHTML = 'История идеи &#11167;'
            }
          });

        document.querySelector('.intro-summary')
        .addEventListener('click', ()=>{

            const value = document.querySelector('.intro-summary').innerHTML;

            if (value === 'Краткое описание проекта ⮟')
            {
            document.querySelector('.summary').classList.add('parag-shown');
            document.querySelector('.intro-summary').innerHTML = 'Краткое описание проекта &#11165;'
            }
            else
            {
            document.querySelector('.summary').classList.remove('parag-shown');
            document.querySelector('.intro-summary').innerHTML = 'Краткое описание проекта &#11167;'
            }
          }); 

          document.querySelector('.intro-favor')
          .addEventListener('click', ()=>{
  
            const value = document.querySelector('.intro-favor').innerHTML;

            if (value === 'Просьба тестерам ⮟')
            {
            document.querySelector('.favor').classList.add('parag-shown');
            document.querySelector('.intro-favor').innerHTML = 'Просьба тестерам &#11165;'
            }
            else
            {
            document.querySelector('.favor').classList.remove('parag-shown');
            document.querySelector('.intro-favor').innerHTML = 'Просьба тестерам &#11167;'
            }
          }); 
  

  //intro stuff

  let purchasedHTML = '';
  let nonPurchasedHTML = '';
  
  shoperItems.forEach((shoperItem) =>
  {
    if(isItemPurchased(shoperItem))
    {
      purchasedHTML +=
      `
        <div class="purchased-item">
          <p>${shoperItem.name}</p>
        </div>
      `;
    }
    else
    {
      nonPurchasedHTML +=
      `
      <div class="non-purchased-item">
        <p>
          <button class="js-purchase-button" data-name="${shoperItem.name}"><img src="images/checkmark-circle-svgrepo-com.svg" class="func-img"></button>
          ${shoperItem.name}
          <button class="js-delete-button" data-name="${shoperItem.name}"><img src="images/cross-circle-svgrepo-com.svg" class="func-img"></button>
        </p>
      </div>
      `;
    }
  });
  
  document.querySelector('.js-items-container').innerHTML = purchasedHTML + nonPurchasedHTML;


//QUERYS-Ss=>

  document.querySelector('.refresh-button').addEventListener('click', ()=>{
    localStorage.removeItem('shoperItems');
    shoperItems.splice(0, shoperItems.length);
    renderEasyShoper();
  });

  document.querySelector('.add-button').addEventListener('click', ()=>{
    const name = document.querySelector('.item-input').value;
    addItem(name);
    renderEasyShoper();
    document.querySelector('.item-input').value = '';
  });

  document.querySelectorAll('.js-purchase-button')
    .forEach((button) =>{
      button.addEventListener('click', ()=>{
        const name = button.dataset.name;
        purchaseItem(name);
        renderEasyShoper();
      });
    });

    document.querySelectorAll('.js-delete-button')
    .forEach((button) =>{
      button.addEventListener('click', ()=>{
        const name = button.dataset.name;
        removeItem(name);
        renderEasyShoper();
      });
    });
    
}

renderEasyShoper();

