(()=>{
  const STYLE_ID='plm-loader-mascot-style';
  const SOURCE='assets/mascot/mascot-running-loader.gif.b64';
  const STATIC='assets/mascot/mascot-walking.webp';
  let sourcePromise;

  const ensureStyle=()=>{
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`.plm-loader-mascot{display:block;width:96px;height:auto;margin:4px 0 8px -5px;object-fit:contain}.plm-loader-mascot[hidden]{display:none}@media(max-width:640px){.plm-loader-mascot{width:82px}}`;
    (document.head||document.documentElement).appendChild(style);
  };

  const getSource=()=>{
    if(sourcePromise) return sourcePromise;
    const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced) return sourcePromise=Promise.resolve(STATIC);
    sourcePromise=fetch(SOURCE,{cache:'force-cache'})
      .then(r=>{if(!r.ok) throw new Error('loader mascot '+r.status);return r.text()})
      .then(text=>{
        const binary=atob(text.trim());
        const bytes=new Uint8Array(binary.length);
        for(let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
        return URL.createObjectURL(new Blob([bytes],{type:'image/gif'}));
      })
      .catch(()=>STATIC);
    return sourcePromise;
  };

  const mount=async()=>{
    ensureStyle();
    const targets=[
      ['.loader-inner','.title'],
      ['#plm-boot-cover .plm-boot-inner','.plm-boot-title']
    ];
    for(const [containerSel,titleSel] of targets){
      const container=document.querySelector(containerSel);
      if(!container||container.querySelector('.plm-loader-mascot')) continue;
      const title=container.querySelector(titleSel);
      if(!title) continue;
      const img=document.createElement('img');
      img.className='plm-loader-mascot';
      img.alt='';
      img.setAttribute('aria-hidden','true');
      img.hidden=true;
      title.insertAdjacentElement('afterend',img);
      img.src=await getSource();
      img.hidden=false;
    }
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
  new MutationObserver(mount).observe(document.documentElement,{childList:true,subtree:true});
})();
