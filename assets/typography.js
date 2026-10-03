/* Personal Learning Map — CJK lexical wrapping */
(()=>{
  const page=document.querySelector('.lang-page[data-lang="zh"]');
  if(!page) return;

  page.lang='zh-Hans';
  document.querySelector('.lang-page[data-lang="en"]')?.setAttribute('lang','en');

  const selector=[
    'h1','h2','h3','.dek','.lead','.note','.claim p','.claim h3',
    '.cap-row h3','.cap-row .def','.cap-row .path','.stage p',
    '.resource h4','.resource p','.method h3','.method p',
    '.source h3','.source p','.footer span','td'
  ].join(',');

  const segmenter=typeof Intl!=='undefined'&&Intl.Segmenter
    ? new Intl.Segmenter('zh-Hans',{granularity:'word'})
    : null;
  const han=/[\p{Script=Han}]/u;
  const allHan=/^[\p{Script=Han}]+$/u;
  const skip='script,style,code,pre,.cite,.tag,.cjk-word,button,input,textarea,select';

  function makeUnits(text){
    if(!segmenter) return [text];
    const segs=[...segmenter.segment(text)].map(x=>({text:x.segment,word:!!x.isWordLike}));
    const out=[];
    for(let i=0;i<segs.length;i++){
      const s=segs[i];
      if(!(s.word&&allHan.test(s.text)&&s.text.length>=2)){
        out.push(s.text);continue;
      }
      let group=s.text;
      let j=i+1;
      while(j<segs.length){
        const n=segs[j];
        if(!(n.word&&allHan.test(n.text)&&n.text.length>=2)) break;
        if(group.length+n.text.length>6) break;
        group+=n.text;j++;
      }
      out.push({nowrap:group});
      i=j-1;
    }
    return out;
  }

  function wrapTextNode(node){
    if(!node?.nodeValue||!han.test(node.nodeValue)) return;
    const parent=node.parentElement;
    if(!parent||parent.closest(skip)) return;
    const units=makeUnits(node.nodeValue);
    if(!units.some(x=>typeof x==='object')) return;
    const frag=document.createDocumentFragment();
    units.forEach(u=>{
      if(typeof u==='string') frag.append(document.createTextNode(u));
      else{
        const span=document.createElement('span');
        span.className='cjk-word';
        span.textContent=u.nowrap;
        frag.append(span);
      }
    });
    node.replaceWith(frag);
  }

  function process(root){
    const targets=[];
    if(root.nodeType===1&&root.matches?.(selector)) targets.push(root);
    if(root.querySelectorAll) targets.push(...root.querySelectorAll(selector));
    targets.forEach(el=>{
      const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode(n){
        if(!n.nodeValue||!han.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        if(n.parentElement?.closest(skip)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }});
      const nodes=[];let n;
      while((n=walker.nextNode())) nodes.push(n);
      nodes.forEach(wrapTextNode);
    });
  }

  process(page);
  let queued=false;
  const observer=new MutationObserver(mutations=>{
    if(queued) return;
    if(!mutations.some(m=>[...m.addedNodes].some(n=>n.nodeType===1||n.nodeType===3))) return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;process(page)});
  });
  observer.observe(page,{childList:true,subtree:true});
})();
