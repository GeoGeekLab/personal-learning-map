/* Personal Learning Map — interaction and UI quality layer */
(()=>{
  const finePointer=window.matchMedia('(hover:hover) and (pointer:fine)');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion:reduce)');

  const MAP={
    zh:{
      mark:'MAP',
      title:'学习架构总览',
      intro:'先看能力之间的结构，再进入细节。点击任一节点可直接定位到对应能力域。',
      cue:'查看能力',
      bands:[
        {title:'基础层',note:'承载与自我调节',items:[[1,'身体与心理承载'],[2,'自主学习与元认知']]},
        {title:'认知骨架',note:'理解、推理与决策',items:[[3,'数量、证据与科学推理'],[4,'系统、复杂性与决策']]},
        {title:'横向能力',note:'跨情境创造与协作',items:[[5,'创造、设计与实验'],[6,'沟通、协作与领导'],[7,'数字、计算与 AI'],[8,'人文、伦理、公民与文明']]},
        {title:'整合层',note:'把能力转化为长期价值',items:[[9,'专业深度与价值创造'],[10,'人生治理与长期责任']]}
      ]
    },
    en:{
      mark:'MAP',
      title:'Learning architecture overview',
      intro:'See the capability structure before entering the detail. Select a node to jump to its capability domain.',
      cue:'View domain',
      bands:[
        {title:'Foundation',note:'Capacity and self-regulation',items:[[1,'Physical & psychological capacity'],[2,'Learning agency & metacognition']]},
        {title:'Cognitive core',note:'Reasoning and decisions',items:[[3,'Quantitative, evidential & scientific reasoning'],[4,'Systems, complexity & decisions']]},
        {title:'Cross-cutting',note:'Creation and coordination',items:[[5,'Creativity, design & experimentation'],[6,'Communication, collaboration & leadership'],[7,'Digital, computing & AI'],[8,'Humanities, ethics & citizenship']]},
        {title:'Integration',note:'Convert capability into durable value',items:[[9,'Professional depth & value creation'],[10,'Life governance & long-term responsibility']]}
      ]
    }
  };

  function activeLanguage(){
    return document.querySelector('.lang-page:not([hidden])')?.dataset.lang||'zh';
  }

  function buildOverviewMaps(){
    document.querySelectorAll('.lang-page').forEach(page=>{
      if(page.querySelector('.overview-map')) return;
      const lang=page.dataset.lang==='en'?'en':'zh';
      const copy=MAP[lang];
      const hero=page.querySelector('.hero');
      const capabilities=page.querySelector('[data-section="capabilities"] .cap-list');
      if(!hero||!capabilities) return;

      const rows=[...capabilities.querySelectorAll('.cap-row')];
      rows.forEach((row,index)=>{row.id=`cap-${lang}-${String(index+1).padStart(2,'0')}`});

      const section=document.createElement('section');
      section.className='overview-map';
      section.setAttribute('aria-labelledby',`overview-title-${lang}`);
      section.innerHTML=`
        <div class="overview-head">
          <div class="overview-mark">${copy.mark}</div>
          <div class="overview-copy">
            <h2 id="overview-title-${lang}">${copy.title}</h2>
            <p>${copy.intro}</p>
          </div>
        </div>
        <div class="map-flow">
          ${copy.bands.map(band=>`
            <div class="map-band" data-count="${band.items.length}">
              <div class="map-band-label"><b>${band.title}</b><span>${band.note}</span></div>
              <div class="map-nodes">
                ${band.items.map(([number,title])=>{
                  const id=`cap-${lang}-${String(number).padStart(2,'0')}`;
                  return `<button type="button" class="map-node" data-cap-target="${id}" aria-controls="${id}">
                    <span class="map-no">${String(number).padStart(2,'0')}</span>
                    <span class="map-title">${title}</span>
                    <span class="map-cue">${copy.cue} →</span>
                  </button>`;
                }).join('')}
              </div>
            </div>`).join('')}
        </div>`;
      hero.insertAdjacentElement('afterend',section);
    });

    document.querySelectorAll('[data-cap-target]').forEach(button=>{
      button.addEventListener('click',()=>{
        const target=document.getElementById(button.dataset.capTarget);
        if(!target) return;
        target.scrollIntoView({behavior:reducedMotion.matches?'auto':'smooth',block:'center'});
        target.classList.add('is-map-target');
        window.setTimeout(()=>target.classList.remove('is-map-target'),1600);
      });
    });
  }

  function enhanceAppearanceControl(){
    const controls=document.querySelector('.floating-controls');
    const palette=document.querySelector('.palette-switch');
    if(!controls||!palette||controls.querySelector('.appearance-toggle')) return;

    const toggle=document.createElement('button');
    toggle.type='button';
    toggle.className='appearance-toggle';
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-controls','palette-switch');
    palette.id='palette-switch';
    toggle.innerHTML='<span class="appearance-dot" aria-hidden="true"></span><span class="appearance-label">主题</span>';
    palette.before(toggle);

    const close=()=>{
      controls.classList.remove('appearance-open');
      toggle.setAttribute('aria-expanded','false');
    };
    const updateLabel=()=>{
      const label=toggle.querySelector('.appearance-label');
      if(label) label.textContent=activeLanguage()==='zh'?'主题':'Theme';
      toggle.setAttribute('aria-label',activeLanguage()==='zh'?'选择页面主题':'Choose page theme');
    };
    updateLabel();

    toggle.addEventListener('click',e=>{
      e.stopPropagation();
      const open=controls.classList.toggle('appearance-open');
      toggle.setAttribute('aria-expanded',String(open));
    });
    palette.addEventListener('click',()=>window.setTimeout(close,0));
    document.addEventListener('click',e=>{if(!controls.contains(e.target)) close()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape') close()});
    document.querySelectorAll('[data-lang-btn]').forEach(button=>button.addEventListener('click',()=>window.setTimeout(updateLabel,0)));
  }

  function enhanceSearchLabels(){
    document.querySelectorAll('.search[data-search]').forEach((input,index)=>{
      if(input.id) return;
      const lang=input.dataset.search==='en'?'en':'zh';
      const id=`resource-search-${lang}-${index}`;
      input.id=id;
      input.setAttribute('aria-label',lang==='zh'?'搜索开放学习资源':'Search open learning resources');
      const label=document.createElement('label');
      label.className='sr-only';
      label.htmlFor=id;
      label.textContent=lang==='zh'?'搜索开放学习资源':'Search open learning resources';
      input.before(label);
    });
  }

  function syncA11yState(){
    document.querySelectorAll('[data-lang-btn]').forEach(button=>{
      button.setAttribute('aria-pressed',String(button.classList.contains('active')));
    });
    document.querySelectorAll('[data-palette-btn]').forEach(button=>{
      const label=button.dataset.label||button.title||'Color theme';
      button.setAttribute('aria-label',label);
      button.setAttribute('aria-pressed',String(button.classList.contains('active')));
    });
    document.querySelectorAll('#floating-nav [data-go]').forEach(button=>{
      if(button.classList.contains('active')) button.setAttribute('aria-current','location');
      else button.removeAttribute('aria-current');
    });
  }

  function enhanceTables(){
    document.querySelectorAll('.table-wrap').forEach(wrap=>{
      if(wrap.dataset.enhanced==='true') return;
      wrap.dataset.enhanced='true';
      let dragging=false,startX=0,startScroll=0,moved=false,seen=false;
      const page=wrap.closest('.lang-page');
      const lang=page?.dataset.lang==='en'?'en':'zh';
      const cue=document.createElement('div');
      cue.className='table-scroll-cue';
      cue.setAttribute('aria-hidden','true');
      wrap.insertAdjacentElement('afterend',cue);

      const updateCue=()=>{
        const scrollable=wrap.scrollWidth>wrap.clientWidth+4;
        wrap.classList.toggle('is-scrollable',scrollable);
        cue.hidden=!scrollable||seen;
        const touch=!finePointer.matches;
        cue.textContent=lang==='zh'
          ?(touch?'左右滑动查看完整表格 →':'横向拖动查看完整表格 →')
          :(touch?'Swipe horizontally to view the full table →':'Drag horizontally to view the full table →');
      };

      wrap.addEventListener('pointerdown',e=>{
        if(!finePointer.matches||e.button!==0) return;
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
      wrap.addEventListener('scroll',()=>{
        if(Math.abs(wrap.scrollLeft)>8){
          seen=true;
          wrap.classList.add('has-scrolled');
          cue.hidden=true;
        }
      },{passive:true});

      requestAnimationFrame(updateCue);
      window.addEventListener('resize',()=>requestAnimationFrame(updateCue),{passive:true});
    });
  }

  buildOverviewMaps();
  enhanceAppearanceControl();
  enhanceSearchLabels();
  enhanceTables();
  syncA11yState();

  document.addEventListener('click',e=>{
    if(e.target.closest('[data-lang-btn],[data-palette-btn],[data-go]')) window.setTimeout(syncA11yState,0);
  });
  window.addEventListener('scroll',()=>requestAnimationFrame(syncA11yState),{passive:true});
  window.addEventListener('resize',()=>requestAnimationFrame(syncA11yState),{passive:true});
})();
