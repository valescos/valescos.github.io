export const shoperItems = JSON.parse(localStorage.getItem('shoperItems')) ||
[];



export function isItemPurchased(shoperItem)
{
  return shoperItem.status === 'purchased';
};

function isItemNew(item)
{
  let isItemNew = true;

  shoperItems.forEach((shoperItem) =>{
    if(shoperItem.name === item)
    {
      isItemNew = false;
    }
  })

  return isItemNew;
};

export function addItem(shoperItem)
{
  if(isItemNew(shoperItem))
  {
  shoperItems.push(
    {
      name: shoperItem,
      status: 'nonPurchased'
    });
  }
  saveToStorage();
};

export function purchaseItem(item)
{
  shoperItems.forEach((shoperItem) =>{
    if(shoperItem.name === item)
    {
      shoperItem.status = 'purchased';
    }
  });
  saveToStorage();
};

export function unPurchaseItem(item)
{
  shoperItems.forEach((shoperItem) =>{
    if(shoperItem.name === item)
    {
      shoperItem.status = '';
    }
  });
  saveToStorage();
};

export function removeItem(item)
{
  shoperItems.forEach((shoperItem) =>{
    if(shoperItem.name === item)
    {
      shoperItems.splice(shoperItems.indexOf(shoperItem), 1);
    }
  });
  saveToStorage();
};

function saveToStorage()
{
  localStorage.setItem('shoperItems', JSON.stringify(shoperItems));
};