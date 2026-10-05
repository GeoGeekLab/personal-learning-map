/* Personal Learning Map — curated university open lectures and resource quality layer */
(()=>{
  if(typeof resources==='undefined'||typeof renderResources!=='function') return;

  const curatedLectures=[
    {
      cat:'systems',tier:'canonical',stage:'Learn / Open lecture',institution:'Yale',format:'Full course',
      name:'Yale — Game Theory (ECON 159)',
      zh:'Ben Polak 的完整 Yale 本科公开课。用博弈、承诺、信息、均衡与现实案例训练战略互动和决策推理。',
      en:'Ben Polak’s complete Yale undergraduate lecture course on strategic interaction, equilibrium, commitment, information and applied decision reasoning.',
      prereq:{zh:'基础代数；熟悉概率更好。',en:'Basic algebra; probability helps.'},
      use:{zh:'作为战略互动的主干课。完成后再进入更数学化的 MIT 14.12。',en:'Use as the main strategic-interaction course before a more mathematical game-theory course such as MIT 14.12.'},
      url:'https://oyc.yale.edu/economics/econ-159'
    },
    {
      cat:'humanities',tier:'canonical',stage:'Learn / Open lecture',institution:'Yale',format:'Full course',
      name:'Yale — Philosophy and the Science of Human Nature',
      zh:'把经典哲学文本与认知科学放在同一课程中，围绕幸福、道德、正义、政治合法性与人的判断展开。',
      en:'Pairs major philosophical texts with cognitive science around flourishing, morality, justice, political legitimacy and human judgement.',
      prereq:{zh:'无正式先修；需要愿意阅读哲学原典。',en:'No formal prerequisite; willingness to read primary philosophical texts is useful.'},
      use:{zh:'适合作为伦理、判断与人的行为理解之间的桥梁课。',en:'Use as a bridge between ethics, judgement and empirical accounts of human behaviour.'},
      url:'https://oyc.yale.edu/philosophy/phil-181'
    },
    {
      cat:'humanities',tier:'canonical',stage:'Learn / Open lecture',institution:'Yale',format:'Full course',
      name:'Yale — Foundations of Modern Social Theory',
      zh:'从 Hobbes、Locke、Rousseau、Smith、Marx、Weber 到 Durkheim，建立现代社会、权力、制度与秩序的思想骨架。',
      en:'Builds a modern social-theory spine from Hobbes, Locke and Rousseau through Smith, Marx, Weber and Durkheim.',
      prereq:{zh:'无正式先修；建议配合历史背景阅读。',en:'No formal prerequisite; historical context improves comprehension.'},
      use:{zh:'不要把它当观点合集。重点比较不同模型如何解释制度、市场、阶级与秩序。',en:'Do not treat it as a list of opinions. Compare how competing models explain institutions, markets, class and social order.'},
      url:'https://oyc.yale.edu/sociology/socy-151'
    },
    {
      cat:'sustainability',tier:'advanced',stage:'Learn / Apply / Open lecture',institution:'Yale',format:'Full course',
      name:'Yale — Environmental Politics and Law',
      zh:'以真实环境法规与案例分析法律如何改变行为，连接可持续性、公共政策、健康风险与制度设计。',
      en:'Uses real environmental laws and cases to connect sustainability, public policy, health risk and institutional design.',
      prereq:{zh:'无硬性先修；有基础经济学或公共政策背景更好。',en:'No hard prerequisite; basic economics or public-policy context helps.'},
      use:{zh:'用于理解“技术方案为什么不等于制度方案”。法规细节需要结合当前版本更新。',en:'Use it to understand why technical solutions are not the same as institutional solutions. Update legal details against current rules.'},
      url:'https://oyc.yale.edu/environmental-studies/evst-255'
    },
    {
      cat:'reasoning',tier:'canonical',stage:'Learn / Practice / Open lecture',institution:'Yale',format:'Full course',
      name:'Yale — Fundamentals of Physics I',
      zh:'Ramamurti Shankar 的经典基础物理公开课。重点不是记公式，而是训练定量建模、问题求解和物理推理。',
      en:'Ramamurti Shankar’s classic introductory physics lectures, with strong emphasis on quantitative modelling, problem solving and physical reasoning.',
      prereq:{zh:'高中代数、三角函数与基础微积分。',en:'High-school algebra, trigonometry and introductory calculus.'},
      use:{zh:'用作“从文字问题到数学模型”的训练。必须做题，不建议只看视频。',en:'Use it to train translation from verbal problems to mathematical models. Do problems; do not only watch lectures.'},
      url:'https://oyc.yale.edu/physics/phys-200'
    },
    {
      cat:'reasoning',tier:'advanced',stage:'Orient / Learn / Open lecture',institution:'Yale',format:'Full course',
      name:'Yale — Frontiers and Controversies in Astrophysics',
      zh:'通过系外行星、黑洞和暗能量展示科学如何处理未知、证据与竞争解释，适合训练科学推理。',
      en:'Uses exoplanets, black holes and dark energy to show how science works with uncertainty, evidence and competing explanations.',
      prereq:{zh:'基础物理和定量思维。',en:'Introductory physics and quantitative reasoning.'},
      use:{zh:'把它当科学方法案例课，而不是追踪最新天文学结论。具体前沿事实应再查当前资料。',en:'Use it as a case course in scientific reasoning, not as the current state of astrophysics. Recheck frontier claims against current sources.'},
      url:'https://oyc.yale.edu/astronomy/astr-160'
    },
    {
      cat:'technology',tier:'advanced',stage:'Learn / Practice / Open lecture',institution:'MIT',format:'Full course',
      name:'MIT — 6.006 Introduction to Algorithms',
      zh:'MIT 的核心算法公开课，覆盖数据结构、图、动态规划、复杂度与算法设计，并配有完整 lecture videos 与习题。',
      en:'MIT’s foundational algorithms course covering data structures, graphs, dynamic programming, complexity and algorithm design with full lecture videos and problems.',
      prereq:{zh:'熟练编程；离散数学基础。',en:'Programming fluency and basic discrete mathematics.'},
      use:{zh:'如果目标是软件工程深度，这是 CS50 之后优先级很高的一门严格课程。',en:'For software-engineering depth, this is a high-priority rigorous course after an introductory CS foundation such as CS50.'},
      url:'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/'
    },
    {
      cat:'technology',tier:'advanced',stage:'Learn / Practice / Open lecture',institution:'Harvard',format:'Project course',
      name:'Harvard — CS50 AI: Introduction to Artificial Intelligence with Python',
      zh:'Harvard CS50 系列的 AI 进阶课，覆盖搜索、知识表示、不确定性、优化、机器学习、神经网络与语言，并以项目验证学习。',
      en:'A project-based Harvard course spanning search, knowledge, uncertainty, optimization, machine learning, neural networks and language.',
      prereq:{zh:'Python 编程；最好先完成 CS50x 或同等基础。',en:'Python programming; CS50x or equivalent foundation is recommended.'},
      use:{zh:'适合建立 AI 方法地图。完成项目后，再根据专业需求深入 ML、NLP 或系统。',en:'Use it to build an AI-method map. After the projects, deepen selectively into ML, NLP or systems based on professional need.'},
      url:'https://cs50.harvard.edu/ai/'
    },
    {
      cat:'humanities',tier:'canonical',stage:'Orient / Learn / Open lecture',institution:'Harvard',format:'Course / free audit',
      name:'Harvard — Justice with Michael Sandel',
      zh:'Michael Sandel 的经典政治哲学课程。通过功利主义、自由、权利、平等与公共道德争议训练规范性推理。提供免费 audit 路径。',
      en:'Michael Sandel’s widely known political-philosophy course on utility, liberty, rights, equality and public morality, with a free audit path.',
      prereq:{zh:'无正式先修。',en:'No formal prerequisite.'},
      use:{zh:'适合训练“事实判断”和“价值判断”分离。最好写短论证，而不是只观看讨论。',en:'Use it to separate factual claims from normative claims. Write short arguments instead of only watching discussions.'},
      url:'https://harvardonline.harvard.edu/course/justice'
    },
    {
      cat:'design',tier:'canonical',stage:'Orient / Learn / Open lecture',institution:'Harvard GSD',format:'Course / free audit',
      name:'Harvard GSD — The Architectural Imagination',
      zh:'Harvard GSD 的建筑与设计入门。通过重要建筑训练视觉阅读、空间表达、历史语境与设计判断。提供免费 audit 路径。',
      en:'A Harvard GSD introduction to architectural reading, spatial representation, historical context and design judgement, available through a free audit path.',
      prereq:{zh:'无正式先修。',en:'No formal prerequisite.'},
      use:{zh:'用于扩展视觉与空间判断，不应替代真实设计练习、草图和批评。',en:'Use it to expand visual and spatial judgement; it does not replace making, sketching and critique.'},
      url:'https://pll.harvard.edu/course/architectural-imagination'
    },
    {
      cat:'technology',tier:'advanced',stage:'Learn / Open lecture',institution:'Stanford',format:'Full course archive',
      name:'Stanford Engineering Everywhere — CS229 Machine Learning',
      zh:'Stanford 经典机器学习公开课，提供完整 lecture videos、讲义与作业。适合在概率、线性代数和编程基础之后进入。',
      en:'Stanford’s classic machine-learning lecture course with full videos, notes and assignments; best after probability, linear algebra and programming foundations.',
      prereq:{zh:'概率、线性代数、微积分与编程。',en:'Probability, linear algebra, calculus and programming.'},
      use:{zh:'作为数学化 ML 主干。算法细节仍有价值，但工具链应使用当前框架重新实践。',en:'Use as a mathematical ML spine. The algorithms remain useful, but reimplement exercises with a current toolchain.'},
      url:'https://see.stanford.edu/Course/CS229'
    },
    {
      cat:'humanities',tier:'canonical',stage:'Orient / Learn / Open lecture',institution:'Oxford',format:'Lecture series',
      name:'Oxford — General Philosophy (2018)',
      zh:'Oxford 一年级 General Philosophy 的 8 讲公开系列，覆盖知识、怀疑论、归纳、心身、个人同一性、自由意志与道德。',
      en:'Eight Oxford first-year lectures covering knowledge, scepticism, induction, mind and body, personal identity, free will and morality.',
      prereq:{zh:'无正式先修。',en:'No formal prerequisite.'},
      use:{zh:'作为哲学问题地图。之后应转向原典和论证写作，而不是继续只听概览课。',en:'Use it as a map of core philosophical problems, then move to primary texts and argument writing.'},
      url:'https://www.podcasts.ox.ac.uk/index.php/series/general-philosophy-2018'
    },
    {
      cat:'technology',tier:'living',stage:'Living edge / Open lecture',institution:'Oxford',format:'Continuing lecture series',
      name:'Oxford — Strachey Lectures in Computer Science',
      zh:'Oxford Computer Science 自 1995 年延续的公开讲座系列。适合跟踪 AI、密码学、形式化方法、系统与计算机科学前沿。',
      en:'Oxford Computer Science’s long-running public lecture series for advanced developments in AI, cryptography, formal methods, systems and computing.',
      prereq:{zh:'按主题不同，需要相应计算机科学基础。',en:'Topic-dependent computer-science background.'},
      use:{zh:'只作为前沿输入，不作为系统基础课。看到重要主题后，再寻找教材、论文和可复现实验。',en:'Use only as frontier input, not as a foundation. Follow important topics with textbooks, papers and reproducible work.'},
      url:'https://podcasts.ox.ac.uk/series/strachey-lectures'
    },
    {
      cat:'technology',tier:'living',stage:'Orient / Ethics / Open lecture',institution:'Oxford Uehiro',format:'Public lecture series',
      name:'Oxford Uehiro — Ethics and Artificial Intelligence',
      zh:'Oxford Uehiro Practical Ethics 的公开讲座，把分析哲学用于 AI 的价值、治理、责任与系统设计问题。',
      en:'Public Oxford Uehiro lectures applying analytic philosophy to AI values, governance, responsibility and system design.',
      prereq:{zh:'无固定先修；有 AI 基础更容易判断技术主张。',en:'No fixed prerequisite; AI fundamentals help evaluate technical claims.'},
      use:{zh:'用于建立 AI 伦理问题清单。政策与技术事实需要结合最新资料复核。',en:'Use it to build an AI-ethics question set. Recheck policy and technical claims against current sources.'},
      url:'https://podcasts.ox.ac.uk/series/uehiro-lectures-practical-solutions-ethical-challenges'
    },
    {
      cat:'humanities',tier:'living',stage:'Living edge / Public lecture',institution:'Princeton',format:'Continuing public lectures',
      name:'Princeton — University Public Lectures',
      zh:'Princeton 面向公众的持续讲座平台，覆盖科学、社会、经济、政治、人文与公共问题；适合作为长期 Living Edge 输入。',
      en:'Princeton’s continuing public-lecture program across science, society, economics, politics and the humanities; useful as a Living Edge feed.',
      prereq:{zh:'按讲座主题决定。',en:'Depends on the lecture.'},
      use:{zh:'只选与你当前能力域或现实问题相关的讲座。不要把公开讲座当系统课程。',en:'Select talks tied to an active capability domain or real problem. Do not treat public lectures as a substitute for systematic courses.'},
      url:'https://lectures.princeton.edu/lectures'
    },
    {
      cat:'governance',tier:'advanced',stage:'Learn / Apply / Open lecture',institution:'MIT',format:'Full course',
      name:'MIT — 14.41 Public Finance and Public Policy',
      zh:'Jonathan Gruber 的完整公共财政课程，用微观经济学分析外部性、公共品、社会保险、医疗、再分配与税收。2024 版提供完整 lecture videos、讲义与习题。',
      en:'Jonathan Gruber’s complete public-finance course applying microeconomics to externalities, public goods, social insurance, health care, redistribution and taxation, with 2024 lecture videos and problem sets.',
      prereq:{zh:'微观经济学；基础统计和微积分有帮助。',en:'Microeconomics; basic statistics and calculus help.'},
      use:{zh:'用于人生治理和公共政策判断。重点训练成本收益、激励与政策副作用，而不是记美国制度细节。',en:'Use it for life-governance and public-policy reasoning. Focus on incentives, cost-benefit analysis and policy side effects rather than memorizing U.S.-specific institutional details.'},
      url:'https://ocw.mit.edu/courses/14-41-public-finance-and-public-policy-fall-2024/'
    },
    {
      cat:'systems',tier:'advanced',stage:'Learn / Practice / Open lecture',institution:'MIT',format:'Full course',
      name:'MIT — 14.12 Economic Applications of Game Theory',
      zh:'MIT 2025 年本科博弈论课程，包含完整视频、讲义、习题与考试，覆盖均衡、重复博弈、谈判、拍卖、信号和信息。',
      en:'MIT’s 2025 undergraduate game-theory course with full videos, notes, problems and exams covering equilibrium, repeated games, bargaining, auctions, signaling and information.',
      prereq:{zh:'微观经济学；基础概率和微积分。',en:'Microeconomics plus basic probability and calculus.'},
      use:{zh:'适合作为 Yale ECON 159 之后的严格升级。必须做问题集，否则收益很低。',en:'Use as a rigorous follow-on to Yale ECON 159. The problem sets are essential.'},
      url:'https://ocw.mit.edu/courses/14-12-economic-applications-of-game-theory-fall-2025/'
    },
    {
      cat:'communication',tier:'canonical',stage:'Learn / Practice / Free audit',institution:'Harvard',format:'Course / free audit',
      name:'Harvard — Rhetoric: The Art of Persuasive Writing and Public Speaking',
      zh:'James Engell 的修辞课程，把论证、修辞技巧、逻辑谬误、说服性写作与短演讲放在同一训练路径中，并提供免费 audit。',
      en:'James Engell’s rhetoric course integrates argument analysis, rhetorical technique, logical fallacies, persuasive writing and short speeches, with a free audit path.',
      prereq:{zh:'无正式先修。',en:'No formal prerequisite.'},
      use:{zh:'每一单元都应产出真实文本或演讲录像。只看视频无法形成沟通能力。',en:'Produce real writing or recorded speeches for every unit. Watching alone will not build communication skill.'},
      url:'https://harvardonline.harvard.edu/course/rhetoric-art-persuasive-writing-public-speaking'
    },
    {
      cat:'humanities',tier:'canonical',stage:'Learn / Open lecture',institution:'Yale',format:'Full course',
      name:'Yale — Introduction to Political Philosophy',
      zh:'从 Plato、Aristotle、Machiavelli、Hobbes、Locke、Rousseau 到 Tocqueville，系统比较城邦、主权、宪政与民主的政治思想。',
      en:'A systematic introduction to political philosophy through Plato, Aristotle, Machiavelli, Hobbes, Locke, Rousseau and Tocqueville, comparing the polis, sovereignty, constitutional government and democracy.',
      prereq:{zh:'无正式先修；需要阅读原典。',en:'No formal prerequisite; primary-text reading is required.'},
      use:{zh:'用于建立政治制度背后的规范性问题。应与历史数据和现代政治学经验研究分开理解。',en:'Use it to understand normative questions behind political institutions; keep philosophical argument distinct from empirical political science.'},
      url:'https://oyc.yale.edu/political-science/plsc-114'
    },
    {
      cat:'health',tier:'canonical',stage:'Orient / Learn / Open lecture',institution:'Yale',format:'Full course',
      name:'Yale — The Psychology, Biology and Politics of Food',
      zh:'把营养、心理、公共卫生、农业、食品产业和政策放在同一课程中，适合理解个人饮食如何嵌入环境与制度。课程录制较早，具体营养结论必须用当前指南更新。',
      en:'Integrates nutrition, psychology, public health, agriculture, food industry and policy to explain how individual eating sits inside larger environments and institutions. The course is older, so specific nutrition claims need current evidence checks.',
      prereq:{zh:'无正式先修。',en:'No formal prerequisite.'},
      use:{zh:'用于建立食物系统地图，而不是作为当前营养处方。涉及健康决策时回到 WHO、专业指南和最新综述。',en:'Use it to build a food-system map, not as current nutrition prescription. For health decisions, return to current guidelines and recent reviews.'},
      url:'https://oyc.yale.edu/psychology/psyc-123'
    },
    {
      cat:'humanities',tier:'advanced',stage:'Learn / Open lecture',institution:'Yale',format:'Full course',
      name:'Yale — Introduction to Theory of Literature',
      zh:'系统介绍二十世纪文学理论，并把文学解释与哲学、语言、社会和权力问题连接起来。适合提升文本分析和解释框架意识。',
      en:'A survey of twentieth-century literary theory connecting interpretation with philosophy, language, society and power; useful for developing textual analysis and framework awareness.',
      prereq:{zh:'有一定文学、人文阅读经验更合适。',en:'Best after some literature or humanities reading experience.'},
      use:{zh:'目标不是背理论流派，而是比较不同解释框架如何改变你看到的问题。',en:'The goal is not memorizing schools of theory; compare how interpretive frameworks change what you notice and explain.'},
      url:'https://oyc.yale.edu/english/engl-300'
    },
    {
      cat:'design',tier:'living',stage:'Living edge / Public lecture',institution:'Stanford STVP',format:'Continuing talk archive',
      name:'Stanford eCorner — Entrepreneurial Thought Leaders',
      zh:'Stanford Technology Ventures Program 的长期创业公开讲座与访谈库，持续覆盖产品、创新、领导、融资、团队与创业失败。',
      en:'Stanford Technology Ventures Program’s long-running public archive of talks on products, innovation, leadership, financing, teams and entrepreneurial failure.',
      prereq:{zh:'无固定先修。',en:'No fixed prerequisite.'},
      use:{zh:'按当前项目问题检索，不建议顺序刷完。把讲者经验当案例，不当普遍定律。',en:'Search it by active project problem rather than consuming it sequentially. Treat speaker experience as case evidence, not universal law.'},
      url:'https://stvp.stanford.edu/ecorner'
    },
    {
      cat:'humanities',tier:'living',stage:'Living edge / Public lecture',institution:'LSE',format:'Continuing public events',
      name:'LSE — Public Lectures and Events',
      zh:'LSE 持续举办免费公开讲座，覆盖经济、政治、国际关系、社会科学、气候与技术，并保留大量 podcast / video。适合更新社会科学世界模型。',
      en:'LSE’s continuing free public-lecture program spans economics, politics, international relations, social science, climate and technology, with extensive podcast and video archives.',
      prereq:{zh:'按主题决定。',en:'Depends on the event.'},
      use:{zh:'用于 Living Edge。先有稳定的经济、历史和政治基础，再用讲座跟踪当前争论。',en:'Use as a Living Edge feed after building stable foundations in economics, history and politics.'},
      url:'https://www.lse.ac.uk/events'
    }
  ];

  const baseMetadata={
    'https://stat110.hsites.harvard.edu/':{tier:'canonical',institution:'Harvard',format:'Full course',prereq:{zh:'高中代数；微积分有帮助。',en:'High-school algebra; calculus helps.'},use:{zh:'概率与不确定性推理主干。必须做题。',en:'A probability and uncertainty-reasoning spine. Do the problems.'}},
    'https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/':{tier:'canonical',institution:'MIT',format:'Full course',prereq:{zh:'基础微积分。',en:'Introductory calculus.'},use:{zh:'技术、数据与机器学习的重要数学基础。',en:'A key mathematical foundation for technical work, data and machine learning.'}},
    'https://ocw.mit.edu/courses/res-15-004-system-dynamics-systems-thinking-and-modeling-for-a-complex-world-january-iap-2020/':{tier:'canonical',institution:'MIT',format:'Short course',prereq:{zh:'无正式先修。',en:'No formal prerequisite.'},use:{zh:'先建立反馈、存量流量和系统边界，再决定是否深入系统动力学。',en:'Build feedback, stock-flow and system-boundary intuition before deeper system dynamics.'}},
    'https://cs50.harvard.edu/x/':{tier:'canonical',institution:'Harvard',format:'Full course',prereq:{zh:'无正式编程先修。',en:'No formal programming prerequisite.'},use:{zh:'计算机科学主干入口。优先完成作业和最终项目。',en:'A computer-science spine. Prioritize problem sets and the final project.'}},
    'https://dschool.stanford.edu/tools/starter-kit':{tier:'canonical',institution:'Stanford d.school',format:'Practice kit',prereq:{zh:'无正式先修。',en:'No formal prerequisite.'},use:{zh:'快速开始真实用户研究、构思、原型和测试。',en:'Use to begin real user research, ideation, prototyping and testing quickly.'}},
    'https://ocw.mit.edu/courses/res-tll-005-how-to-speak-january-iap-2018/':{tier:'canonical',institution:'MIT',format:'Lecture / practice',prereq:{zh:'无正式先修。',en:'No formal prerequisite.'},use:{zh:'看完后立即做真实技术汇报并录像复盘。',en:'Follow immediately with a real presentation and recorded review.'}},
    'https://oyc.yale.edu/economics/econ-252':{tier:'canonical',institution:'Yale',format:'Full course',prereq:{zh:'基础经济学和概率有帮助。',en:'Basic economics and probability help.'},use:{zh:'建立金融制度和风险的结构理解，不作为投资建议。',en:'Use to understand financial institutions and risk structurally, not as investment advice.'}},
    'https://climate.mit.edu/primer':{tier:'canonical',institution:'MIT',format:'Primer',prereq:{zh:'无正式先修。',en:'No formal prerequisite.'},use:{zh:'作为气候科学、风险与解决方案的稳定入口。',en:'Use as a stable entry point to climate science, risk and solutions.'}}
  };

  const existing=new Set(resources.map(item=>item.url));
  curatedLectures.forEach(item=>{
    const current=resources.find(x=>x.url===item.url);
    if(current) Object.assign(current,item);
    else {resources.push(item);existing.add(item.url)}
  });
  resources.forEach(item=>{if(baseMetadata[item.url]) Object.assign(item,baseMetadata[item.url])});

  const tierFilters={zh:'all',en:'all'};
  const tierOrder={canonical:0,advanced:1,living:2};
  const copy={
    zh:{
      title:'资源质量分层',
      intro:'名校不是质量保证。这里按学习用途区分主干、进阶和前沿；有明确先修要求的课程不会被包装成“零基础”。',
      all:'全部',canonical:'Canonical 主干',advanced:'Advanced 进阶',living:'Living Edge 前沿',
      canonDesc:'可长期作为能力主干，优先完成练习、项目或原典阅读。',
      advDesc:'质量高，但需要先修基础；跳级通常会降低学习效率。',
      liveDesc:'用于更新世界模型和专业前沿，不替代稳定基础。',
      prereq:'先修',use:'建议用法',none:'没有匹配结果'
    },
    en:{
      title:'Resource quality tiers',
      intro:'Prestige is not a quality guarantee. Resources are separated by learning role: stable spines, rigorous follow-ons and frontier feeds. Courses with prerequisites are not presented as beginner material.',
      all:'All',canonical:'Canonical',advanced:'Advanced',living:'Living Edge',
      canonDesc:'Durable capability spines. Prioritize exercises, projects or primary-text work.',
      advDesc:'High-quality but prerequisite-dependent. Skipping foundations usually lowers learning efficiency.',
      liveDesc:'Use to update world models and professional frontiers, not to replace stable foundations.',
      prereq:'Prerequisite',use:'Use',none:'No matches'
    }
  };

  function tierLabel(lang,tier){
    if(!tier) return '';
    if(lang==='zh') return tier==='canonical'?'Canonical · 主干':tier==='advanced'?'Advanced · 进阶':'Living Edge · 前沿';
    return tier==='canonical'?'Canonical':tier==='advanced'?'Advanced':'Living Edge';
  }

  function buildCurationUI(){
    document.querySelectorAll('.lang-page').forEach(page=>{
      const lang=page.dataset.lang==='en'?'en':'zh';
      const section=page.querySelector('[data-section="resources"]');
      const tools=section?.querySelector('.resource-tools');
      if(!section||!tools) return;
      section.querySelector('.open-lecture-note')?.remove();
      if(section.querySelector('.resource-curation')) return;
      const c=copy[lang];
      const box=document.createElement('div');
      box.className='resource-curation';
      box.innerHTML=`
        <div class="resource-curation-head">
          <div class="resource-curation-copy"><b>${c.title}</b><p>${c.intro}</p></div>
          <div class="resource-tier-filters" role="group" aria-label="${lang==='zh'?'资源质量层级':'Resource quality tier'}">
            <button type="button" class="resource-tier-btn active" data-tier-filter="all">${c.all}</button>
            <button type="button" class="resource-tier-btn" data-tier-filter="canonical">${c.canonical}</button>
            <button type="button" class="resource-tier-btn" data-tier-filter="advanced">${c.advanced}</button>
            <button type="button" class="resource-tier-btn" data-tier-filter="living">${c.living}</button>
          </div>
        </div>
        <div class="resource-tier-legend">
          <div><b>${c.canonical}</b><span>${c.canonDesc}</span></div>
          <div><b>${c.advanced}</b><span>${c.advDesc}</span></div>
          <div><b>${c.living}</b><span>${c.liveDesc}</span></div>
        </div>`;
      tools.before(box);
      box.querySelectorAll('[data-tier-filter]').forEach(button=>button.addEventListener('click',()=>{
        tierFilters[lang]=button.dataset.tierFilter;
        box.querySelectorAll('[data-tier-filter]').forEach(b=>b.classList.toggle('active',b===button));
        renderResources(lang);
      }));
    });
  }

  renderResources=function(lang){
    const page=document.querySelector(`.lang-page[data-lang="${lang}"]`); if(!page) return;
    const q=(page.querySelector(`[data-search="${lang}"]`)?.value||'').trim().toLowerCase();
    const cat=filters[lang];
    const tier=tierFilters[lang]||'all';
    const list=resources.filter(r=>{
      const inCat=cat==='all'||r.cat===cat;
      const inTier=tier==='all'||r.tier===tier;
      const haystack=[r.name,r.zh,r.en,r.stage,r.cat,r.institution,r.format,r.tier,r.prereq?.zh,r.prereq?.en,r.use?.zh,r.use?.en].filter(Boolean).join(' ').toLowerCase();
      return inCat&&inTier&&(!q||haystack.includes(q));
    }).map((r,index)=>({r,index})).sort((a,b)=>{
      const ar=a.r.tier in tierOrder?tierOrder[a.r.tier]:3;
      const br=b.r.tier in tierOrder?tierOrder[b.r.tier]:3;
      return ar-br||a.index-b.index;
    }).map(x=>x.r);
    const host=page.querySelector(`[data-resource-list="${lang}"]`);
    const c=copy[lang];
    host.innerHTML=list.map(r=>{
      const meta=[r.tier?`<span class="resource-tier" data-tier="${r.tier}">${tierLabel(lang,r.tier)}</span>`:'',r.institution?`<span class="resource-institution">${r.institution}${r.format?` · ${r.format}`:''}</span>`:''].filter(Boolean).join('');
      const detail=(r.prereq||r.use)?`<p class="resource-detail">${r.prereq?`<b>${c.prereq}:</b> ${lang==='zh'?r.prereq.zh:r.prereq.en}`:''}${r.prereq&&r.use?'　':''}${r.use?`<b>${c.use}:</b> ${lang==='zh'?r.use.zh:r.use.en}`:''}</p>`:'';
      return `<div class="resource"><div class="resource-main"><h4><a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.name}</a></h4>${meta?`<div class="resource-meta">${meta}</div>`:''}</div><div class="stage-label">${r.stage}</div><div><p>${lang==='zh'?r.zh:r.en}</p>${detail}</div><div class="cat">${catNames[lang][r.cat]}</div></div>`;
    }).join('') || `<div class="resource"><div class="resource-main"><h4>${c.none}</h4></div></div>`;
  };

  buildCurationUI();
  try{renderResources('zh');renderResources('en')}catch(_){ }
})();
