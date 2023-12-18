import {shoperItems, isItemPurchased, addItem, purchaseItem, removeItem, unPurchaseItem} from '../data/item.js';
import {buildFooter} from './footer.js';

let autocompleteSuggestions = JSON.parse(localStorage.getItem('autocompleteSuggestions')) || [];
let input = document.querySelector('.item-input');
input.addEventListener('input', ()=>{
  autoSRender();
});

function autoSRender ()
{
  const inputValue = input.value;

  let fileredSuggestions = '';

  fileredSuggestions = autocompleteSuggestions.filter((suggestion) =>{
    return suggestion.substring(0, inputValue.length).toLowerCase() === inputValue.toLowerCase()
          && inputValue.length >= 2
          && suggestion.toLowerCase() !== inputValue.toLowerCase()
  });

  let html = '';

  if(fileredSuggestions)
  {
    fileredSuggestions.forEach((suggestion) =>{
      html +=
      `
      <button class="autocomplite-field-option">${suggestion}</button>
    `
    })
  }
  document.querySelector('.autocomplite-field').innerHTML = html;

  document.querySelectorAll('.autocomplite-field-option')
  .forEach((button) =>{
    button.addEventListener('click', ()=>{
      addItem(button.innerText);
      renderEasyShoper();
    })
  })
}


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
          <p>
          <button class="item-index">${shoperItems.indexOf(shoperItem)+1})</button>
          ${shoperItem.name}
          <button class="js-unpurchase-button" data-name="${shoperItem.name}"><img src="/images/arrow-down-circle-svgrepo-com.svg" class="func-img"></button>
          <button class="js-delete-button" data-name="${shoperItem.name}"><img src="images/cross-circle-svgrepo-com.svg" class="func-img"></button>
          </p>
        </div>
      `;
    }
    else
    {
      listHtml +=
      `
      <div class="non-purchased-item">
        <p>
          <button class="item-index">${shoperItems.indexOf(shoperItem)+1})</button>
          ${shoperItem.name}
          <button class="js-purchase-button" data-name="${shoperItem.name}"><img src="images/checkmark-circle-svgrepo-com.svg" class="func-img"></button>
          <button class="js-delete-button" data-name="${shoperItem.name}"><img src="images/cross-circle-svgrepo-com.svg" class="func-img"></button>
        </p>
      </div>
      `;
    }
  });
  
  // setTimeout(()=>{
  document.querySelector('.item-input').value = '';
  // });

  document.querySelector('.js-items-container').innerHTML = listHtml;

  autoSRender();

//QUERYS-Ss=>

  document.querySelector('.refresh-button').addEventListener('click', ()=>{
    localStorage.removeItem('shoperItems');
    shoperItems.splice(0, shoperItems.length);
    renderEasyShoper();
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

    document.querySelectorAll('.js-unpurchase-button')
    .forEach((button) =>{
      button.addEventListener('click', ()=>{
        const name = button.dataset.name;
        unPurchaseItem(name);
        renderEasyShoper();
      });
    }); 
}

renderEasyShoper();
buildFooter();

document.querySelector('.add-button').addEventListener('click', ()=>{
  const name = document.querySelector('.item-input').value;

  if(name)
  {
    let formatedName = name.substring(0, 1).toUpperCase() + name.substring(1, name.lenght).toLowerCase();
    addItem(formatedName);
    saveSuggestion(formatedName);    
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
        let formatedName = name.substring(0, 1).toUpperCase() + name.substring(1, name.lenght).toLowerCase();
        addItem(formatedName);
        saveSuggestion(formatedName);
        renderEasyShoper();
      }
    }
});

document.querySelector('.flush-autocomplite-button').addEventListener('click', ()=>{
  flushSuggestionToStorage();
})

function saveSuggestion(suggestion)
{
  if (autocompleteSuggestions.indexOf(suggestion) === -1)
  {
    autocompleteSuggestions.push(suggestion);
    localStorage.setItem('autocompleteSuggestions', JSON.stringify(autocompleteSuggestions));
  }
}

function flushSuggestionToStorage()
{
  localStorage.removeItem('autocompleteSuggestions');
  autocompleteSuggestions = [];
  renderEasyShoper();
}

