

export function buildFooter ()
{

  document.querySelector('.js-footer-idea').addEventListener('click', ()=>{
    document.querySelector('.js-footer-idea-par').classList.toggle("is-hidden"); 
  });

  document.querySelector('.js-footer-summary').addEventListener('click', ()=>{
    document.querySelector('.js-footer-summary-par').classList.toggle("is-hidden"); 
  });

  document.querySelector('.js-footer-favor').addEventListener('click', ()=>{
    document.querySelector('.js-footer-favor-par').classList.toggle("is-hidden"); 
  });
}


