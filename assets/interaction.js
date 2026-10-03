/* Personal Learning Map — interaction layer */
(()=>{
  const root=document.documentElement;
  if(!document.querySelector('.mouse-light')){
    const light=document.createElement('div');
    light.className='mouse-light';
    light.setAttribute('aria-hidden','true');
    document.body.prepend(light);
  }

  const finePointer=window.matchMedia('(hover:hover) and (pointer:fine)');
  let pointerFrame=0;
  function updatePointer(e){
    if(!finePointer.matches) return;
    if(pointerFrame) cancelAnimationFrame(pointerFrame);
    pointerFrame=requestAnimationFrame(()=>{
      root.style.setProperty('--mx',e.clientX+'px');
      root.style.setProperty('--my',e.clientY+'px');
      const lang=typeof activeLang!=='undefined'?activeLang:'zh';
      const hero=document.querySelector(`.lang-page[data-lang="${lang}"] .hero`);
      if(!hero) return;
      const r=hero.getBoundingClientRect();
      if(r.bottom<=0 || r.top>=innerHeight) return;
      const nx=(e.clientX-r.left)/Math.max(r.width,1)-.5;
      const ny=(e.clientY-r.top)/Math.max(r.height,1)-.5;
      root.style.setProperty('--hero-x',(nx*7).toFixed(2)+'px');
      root.style.setProperty('--hero-y',(ny*5).toFixed(2)+'px');
    });
  }
  window.addEventListener('pointermove',updatePointer,{passive:true});
  window.addEventListener('pointerleave',()=>{
    root.style.setProperty('--hero-x','0px');
    root.style.setProperty('--hero-y','0px');
  },{passive:true});

  document.querySelectorAll('.table-wrap').forEach(wrap=>{
    let dragging=false,startX=0,startScroll=0,moved=false;
    wrap.addEventListener('pointerdown',e=>{
      if(!finePointer.matches || e.button!==0) return;
      if(e.target.closest('a,button,input,select,textarea')) return;
      dragging=true;moved=false;startX=e.clientX;startScroll=wrap.scrollLeft;
      wrap.setPointerCapture?.(e.pointerId);
      wrap.classList.add('is-dragging');
    });
    wrap.addEventListener('pointermove',e=>{
      if(!dragging) return;
      const dx=e.clientX-startX;
      if(Math.abs(dx)>3) moved=true;
      wrap.scrollLeft=startScroll-dx;
    });
    const end=e=>{
      if(!dragging) return;
      dragging=false;wrap.classList.remove('is-dragging');
      try{wrap.releasePointerCapture?.(e.pointerId)}catch(_){ }
    };
    wrap.addEventListener('pointerup',end);
    wrap.addEventListener('pointercancel',end);
    wrap.addEventListener('dragstart',e=>{if(dragging)e.preventDefault()});
    wrap.addEventListener('click',e=>{
      if(!moved) return;
      e.preventDefault();e.stopPropagation();moved=false;
    },true);
  });
})();
