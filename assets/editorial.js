/* Personal Learning Map — bilingual editorial normalization */
(()=>{
  const copy={
    zh:{
      synthesis:'综合 WEF、OECD、UNESCO 及所引高校培养要求，共同覆盖的主要能力要素包括：身心健康与自我调节、学习能动性、定量与科学推理、创造与设计、沟通与协作、数字与 AI 素养、伦理与公民素养、环境与可持续性，以及专业领域的纵深能力。个人财务、家庭、法律与照护在上述框架中的覆盖相对有限，本体系将其归入“人生治理与长期责任”能力域。',
      audit:'十四个模块按六类发展方式管理：长期基础、横向能力、专业主轴、生命周期学习、参考知识与快速变化的工具栈。各模块的学习投入依据能力目标、发展阶段与内容更新频率配置。',
      criteria:'评估标准：',
      quarterlyLabel:'季度实施。',
      quarterly:'每季度选择少数高优先级能力推进至下一深度；健康、语言等基础能力维持低强度训练，探索性主题可停留在 Orient 或 Learn。季度评价依据实际应用、任务结果与反馈质量。',
      resourceTitle:'资源分层',
      resourceIntro:'资源按课程功能与学习阶段分为主干、进阶和前沿，并标注先修要求与适用阶段。',
      canonical:'用于系统建立核心概念、方法和基础训练。',
      advanced:'用于在既有基础上提高理论深度、技术难度或应用复杂度。',
      living:'用于跟踪研究、技术与公共议题的最新进展。',
      resourceAria:'资源层级'
    },
    en:{
      synthesis:'Across WEF, OECD, UNESCO, and the cited university curricula, the recurring capability areas are physical and psychological health and self-regulation; learning agency; quantitative and scientific reasoning; creativity and design; communication and collaboration; digital and AI literacy; ethics and citizenship; environmental sustainability; and domain-specific depth. Personal finance, family, law, and care receive less direct coverage in these frameworks and are grouped here under life governance and long-term responsibility.',
      audit:'The fourteen modules are managed through six development modes: lifelong foundations, cross-cutting capabilities, a professional major axis, lifecycle learning, reference knowledge, and fast-changing tool stacks. Learning allocation is determined by capability objectives, development stage, and update cycle.',
      criteria:'Assessment criteria:',
      quarterlyLabel:'Quarterly implementation.',
      quarterly:'Each quarter advances a small number of high-priority capabilities to the next depth level. Health and language remain in low-intensity maintenance, while exploratory subjects may remain at Orient or Learn. Quarterly evaluation is based on real-world application, task outcomes, and feedback quality.',
      resourceTitle:'Resource tiers',
      resourceIntro:'Resources are classified by instructional function and learning stage as canonical, advanced, or living-edge, with prerequisites and intended stage stated explicitly.',
      canonical:'Builds core concepts, methods, and foundational practice.',
      advanced:'Extends established foundations through greater theoretical depth, technical difficulty, or application complexity.',
      living:'Tracks current developments in research, technology, and public issues.',
      resourceAria:'Resource tier'
    }
  };

  function setText(el,text){
    if(el&&el.textContent!==text) el.textContent=text;
  }

  function revisePage(page,lang){
    if(!page) return;
    const c=copy[lang];

    setText(page.querySelector('[data-section="scope"] .subhead + .lead'),c.synthesis);
    setText(page.querySelector('[data-section="audit"] > .lead'),c.audit);

    page.querySelectorAll('.cap-row .path b').forEach(label=>{
      const text=label.textContent.trim();
      if((lang==='zh'&&text==='表现证据：')||(lang==='en'&&text==='Evidence:')) setText(label,c.criteria);
    });

    const methodsNote=page.querySelector('[data-section="methods"] .note');
    if(methodsNote&&!methodsNote.dataset.editorialRev){
      methodsNote.replaceChildren();
      const b=document.createElement('b');
      b.textContent=c.quarterlyLabel;
      methodsNote.append(b,document.createTextNode(c.quarterly));
      methodsNote.dataset.editorialRev='1';
    }

    const curation=page.querySelector('.resource-curation');
    if(curation){
      const head=curation.querySelector('.resource-curation-copy');
      setText(head?.querySelector('b'),c.resourceTitle);
      setText(head?.querySelector('p'),c.resourceIntro);
      const legend=curation.querySelectorAll('.resource-tier-legend > div span');
      setText(legend[0],c.canonical);
      setText(legend[1],c.advanced);
      setText(legend[2],c.living);
      curation.querySelector('.resource-tier-filters')?.setAttribute('aria-label',c.resourceAria);
    }
  }

  function apply(){
    revisePage(document.querySelector('.lang-page[data-lang="zh"]'),'zh');
    revisePage(document.querySelector('.lang-page[data-lang="en"]'),'en');
  }

  apply();
  let queued=false;
  const observer=new MutationObserver(mutations=>{
    if(queued||!mutations.some(m=>m.addedNodes.length)) return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;apply()});
  });
  observer.observe(document.body,{childList:true,subtree:true});
})();
