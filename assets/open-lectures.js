/* Personal Learning Map — curated university open lectures */
(()=>{
  if(typeof resources==='undefined'||typeof renderResources!=='function') return;

  const openLectures=[
    {
      cat:'systems',stage:'Learn / Open lecture',
      name:'Yale — Game Theory (ECON 159)',
      zh:'Ben Polak 的完整 Yale 本科公开课。用博弈、承诺、信息、均衡与现实案例训练战略互动和决策推理。',
      en:'Ben Polak’s complete Yale undergraduate lecture course on strategic interaction, equilibrium, commitment, information and applied decision reasoning.',
      url:'https://oyc.yale.edu/economics/econ-159'
    },
    {
      cat:'humanities',stage:'Learn / Open lecture',
      name:'Yale — Philosophy and the Science of Human Nature',
      zh:'把经典哲学文本与认知科学放在同一课程中，围绕幸福、道德、正义、政治合法性与人的判断展开。',
      en:'Pairs major philosophical texts with cognitive science around flourishing, morality, justice, political legitimacy and human judgement.',
      url:'https://oyc.yale.edu/philosophy/phil-181'
    },
    {
      cat:'humanities',stage:'Learn / Open lecture',
      name:'Yale — Foundations of Modern Social Theory',
      zh:'从 Hobbes、Locke、Rousseau、Smith、Marx、Weber 到 Durkheim，建立现代社会、权力、制度与秩序的思想骨架。',
      en:'Builds a modern social-theory spine from Hobbes, Locke and Rousseau through Smith, Marx, Weber and Durkheim.',
      url:'https://oyc.yale.edu/sociology/socy-151'
    },
    {
      cat:'sustainability',stage:'Learn / Open lecture',
      name:'Yale — Environmental Politics and Law',
      zh:'以真实环境法规与案例分析法律如何改变行为，连接可持续性、公共政策、健康风险与制度设计。',
      en:'Uses real environmental laws and cases to connect sustainability, public policy, health risk and institutional design.',
      url:'https://oyc.yale.edu/environmental-studies/evst-255'
    },
    {
      cat:'reasoning',stage:'Learn / Open lecture',
      name:'Yale — Fundamentals of Physics I',
      zh:'Ramamurti Shankar 的经典基础物理公开课。重点不是记公式，而是训练定量建模、问题求解和物理推理。',
      en:'Ramamurti Shankar’s classic introductory physics lectures, with strong emphasis on quantitative modelling, problem solving and physical reasoning.',
      url:'https://oyc.yale.edu/physics/phys-200'
    },
    {
      cat:'reasoning',stage:'Orient / Open lecture',
      name:'Yale — Frontiers and Controversies in Astrophysics',
      zh:'通过系外行星、黑洞和暗能量展示科学如何处理未知、证据与竞争解释，适合训练科学推理。',
      en:'Uses exoplanets, black holes and dark energy to show how science works with uncertainty, evidence and competing explanations.',
      url:'https://oyc.yale.edu/astronomy/astr-160'
    },
    {
      cat:'technology',stage:'Learn / Practice / Open lecture',
      name:'MIT — 6.006 Introduction to Algorithms',
      zh:'MIT 的核心算法公开课，覆盖数据结构、图、动态规划、复杂度与算法设计，并配有完整 lecture videos 与习题。',
      en:'MIT’s foundational algorithms course covering data structures, graphs, dynamic programming, complexity and algorithm design with full lecture videos and problems.',
      url:'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/'
    },
    {
      cat:'technology',stage:'Learn / Practice / Open lecture',
      name:'Harvard — CS50 AI: Introduction to Artificial Intelligence with Python',
      zh:'Harvard CS50 系列的 AI 进阶课，覆盖搜索、知识表示、不确定性、优化、机器学习、神经网络与语言，并以项目验证学习。',
      en:'A project-based Harvard course spanning search, knowledge, uncertainty, optimization, machine learning, neural networks and language.',
      url:'https://cs50.harvard.edu/ai/'
    },
    {
      cat:'humanities',stage:'Orient / Learn / Open lecture',
      name:'Harvard — Justice with Michael Sandel',
      zh:'Michael Sandel 的经典政治哲学课程。通过功利主义、自由、权利、平等与公共道德争议训练规范性推理。提供免费 audit 路径。',
      en:'Michael Sandel’s widely known political-philosophy course on utility, liberty, rights, equality and public morality, with a free audit path.',
      url:'https://harvardonline.harvard.edu/course/justice'
    },
    {
      cat:'design',stage:'Orient / Learn / Open lecture',
      name:'Harvard GSD — The Architectural Imagination',
      zh:'Harvard GSD 的建筑与设计入门。通过重要建筑训练视觉阅读、空间表达、历史语境与设计判断。提供免费 audit 路径。',
      en:'A Harvard GSD introduction to architectural reading, spatial representation, historical context and design judgement, available through a free audit path.',
      url:'https://pll.harvard.edu/course/architectural-imagination'
    },
    {
      cat:'technology',stage:'Learn / Open lecture',
      name:'Stanford Engineering Everywhere — CS229 Machine Learning',
      zh:'Stanford 经典机器学习公开课，提供完整 lecture videos、讲义与作业。适合在概率、线性代数和编程基础之后进入。',
      en:'Stanford’s classic machine-learning lecture course with full videos, notes and assignments; best after probability, linear algebra and programming foundations.',
      url:'https://see.stanford.edu/Course/CS229'
    },
    {
      cat:'humanities',stage:'Orient / Learn / Open lecture',
      name:'Oxford — General Philosophy (2018)',
      zh:'Oxford 一年级 General Philosophy 的 8 讲公开系列，覆盖知识、怀疑论、归纳、心身、个人同一性、自由意志与道德。',
      en:'Eight Oxford first-year lectures covering knowledge, scepticism, induction, mind and body, personal identity, free will and morality.',
      url:'https://www.podcasts.ox.ac.uk/index.php/series/general-philosophy-2018'
    },
    {
      cat:'technology',stage:'Living edge / Open lecture',
      name:'Oxford — Strachey Lectures in Computer Science',
      zh:'Oxford Computer Science 自 1995 年延续的公开讲座系列。适合跟踪 AI、密码学、形式化方法、系统与计算机科学前沿。',
      en:'Oxford Computer Science’s long-running public lecture series for advanced developments in AI, cryptography, formal methods, systems and computing.',
      url:'https://podcasts.ox.ac.uk/series/strachey-lectures'
    },
    {
      cat:'technology',stage:'Orient / Ethics / Open lecture',
      name:'Oxford Uehiro — Ethics and Artificial Intelligence',
      zh:'Oxford Uehiro Practical Ethics 的公开讲座，把分析哲学用于 AI 的价值、治理、责任与系统设计问题。',
      en:'Public Oxford Uehiro lectures applying analytic philosophy to AI values, governance, responsibility and system design.',
      url:'https://podcasts.ox.ac.uk/series/uehiro-lectures-practical-solutions-ethical-challenges'
    },
    {
      cat:'humanities',stage:'Living edge / Public lecture',
      name:'Princeton — University Public Lectures',
      zh:'Princeton 面向公众的持续讲座平台，覆盖科学、社会、经济、政治、人文与公共问题；适合作为长期 Living Edge 输入。',
      en:'Princeton’s continuing public-lecture program across science, society, economics, politics and the humanities; useful as a Living Edge feed.',
      url:'https://lectures.princeton.edu/lectures'
    }
  ];

  const existing=new Set(resources.map(item=>item.url));
  openLectures.forEach(item=>{if(!existing.has(item.url)){resources.push(item);existing.add(item.url)}});

  document.querySelectorAll('.lang-page').forEach(page=>{
    const lang=page.dataset.lang==='en'?'en':'zh';
    const section=page.querySelector('[data-section="resources"]');
    const tools=section?.querySelector('.resource-tools');
    if(!section||!tools||section.querySelector('.open-lecture-note')) return;
    const note=document.createElement('div');
    note.className='note open-lecture-note';
    note.innerHTML=lang==='zh'
      ?'<b>高校公开课堂精选。</b> 补充 MIT、Harvard、Yale、Stanford、Oxford 与 Princeton 的经典公开课和持续讲座。优先选择高校官方入口、完整课程或长期维护系列；它们仍按能力域进入同一筛选系统。'
      :'<b>Selected university open lectures.</b> Adds classic courses and continuing lecture series from MIT, Harvard, Yale, Stanford, Oxford and Princeton. Official university sources, complete courses and durable series are prioritized and remain mapped to the same capability filters.';
    tools.before(note);
  });

  try{
    renderResources('zh');
    renderResources('en');
  }catch(_){ }
})();
