import {shoperItems, isItemPurchased, addItem, purchaseItem, removeItem} from '../data/item.js';
import {buildFooter} from './footer.js';

// import {transliterate} from 'https://cdn.jsdelivr.net/npm/transliteration@2.1.8/dist/browser/bundle.esm.min.js';

function renderEasyShoper()
{
  buildFooter();

  let listHtml = '';
  
  shoperItems.forEach((shoperItem) =>
  {
    if(isItemPurchased(shoperItem))
    {
      listHtml +=
      `
        <div class="purchased-item">
          <p>${shoperItem.name}</p>
        </div>
      `;
    }
    else
    {
      listHtml +=
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
  
  setTimeout(()=>{
    document.querySelector('.item-input').value = '';
  });

  document.querySelector('.js-items-container').innerHTML = listHtml;



//QUERYS-Ss=>

  document.querySelector('.refresh-button').addEventListener('click', ()=>{
    localStorage.removeItem('shoperItems');
    shoperItems.splice(0, shoperItems.length);
    renderEasyShoper();
  });

  document.querySelector('.add-button').addEventListener('click', ()=>{
      const name = document.querySelector('.item-input').value;
      if(name)
      {
        addItem(name);
        renderEasyShoper();
      }
  });

  document.querySelector('.item-input')
  .addEventListener('keydown',(e)=>{
    if(e.key === 'Enter')
    {
      const name = document.querySelector('.item-input').value;
      if(name)
      {
        addItem(name);
        renderEasyShoper();
      }
    }
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

