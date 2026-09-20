/* Junhyung Kim — resume site
   Vanilla JS, no build step. Ported from the Claude Design file
   `Junhyung Kim Resume.dc.html`: `data(lang)` mirrors the DCLogic `data()`
   method, and the four panels mirror its <sc-if> branches.

   All four panels render up front and tabs toggle `.is-active`, so switching
   tabs is instant, the contact form keeps whatever you typed, and printing
   can reveal every section at once (see the @media print block). */

const EMAIL = 'junhyung0865@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/hyeonbin-jung-a49b79274/';
const PDF_URL = 'assets/Junhyung_Kim_Resume.pdf';
const PHOTO_URL = 'assets/profile.jpg';
const LANG_KEY = 'jk-resume-lang';

const TAB_KEYS = ['experience', 'projects', 'skills', 'contact'];

const state = { lang: 'en', tab: 'experience' };

/* ---------- helpers ---------- */

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* Bold the "Label: " prefix of a bullet, same rule as the design's split(). */
function split(s) {
  const i = s.indexOf(': ');
  return i > 0 && i < 48 ? { lead: s.slice(0, i + 2), text: s.slice(i + 2) } : { lead: '', text: s };
}

/* ---------- content ---------- */

function data(L) {
  const ko = L === 'ko';

  const exp = [
    {
      org: 'ValueSystem Asset Management', url: 'https://valuesystem.co.kr/home/',
      location: ko ? '서울' : 'Seoul, South Korea',
      period: ko ? '2026.05 – 2026.08' : 'May 2026 – Aug 2026',
      title: ko ? '인턴, 자산운용본부' : 'Intern, Asset Management Division',
      bullets: ko ? [
        '투자 리서치 & 발표: 주당 12회 기업 IR 세션에 참석해 내용을 종합하고, 포트폴리오 매니저 및 경영진과의 주간 회의에서 투자 테마와 관심 기업을 발표.',
        '기술적 & 섹터 분석: 셀사이드 산업 리서치와 트레이딩 플랫폼 차트 분석을 결합해 주도 종목의 과거 가격 패턴(20주 이동평균 포함)을 분석하고 투자 회의에서 발표.',
        'AI 인프라 리서치: Amazon, Alphabet, Meta, NVIDIA의 실적 발표, CAPEX 가이던스, 영업현금흐름 및 AI 인프라 전략을 비교하고 지출 계획과 현금 창출력 분석을 발표.',
        '포트폴리오 리스크 관리: 2026년 여름 주식시장 변동성 국면에서 기관 고객 펀드의 손실 한도, 손절 시점, 리밸런싱 평가 과정을 참관.',
        '회사 소개서 개발: 경영기획팀과 협업해 부서별 역할을 정리하고 회사 소개 자료 콘텐츠를 공동 개발.'
      ] : [
        'Investment Research & Presentations: Attended 12 company investor relations sessions per week, synthesized findings, and presented investment themes and companies of interest at weekly meetings with portfolio managers and senior leadership.',
        'Technical & Sector Analysis: Combined sell-side industry research with trading-platform chart analysis to examine historical price patterns of market-leading stocks, including 20-week moving averages; presented findings at investment meetings.',
        'AI Infrastructure Research: Compared earnings calls, capital expenditure guidance, operating cash flow and AI infrastructure strategies across Amazon, Alphabet, Meta and NVIDIA; presented analysis of spending plans and cash generation.',
        'Portfolio Risk Management: Observed portfolio managers evaluate loss thresholds, stop-loss timing and portfolio rebalancing across institutional client funds during summer 2026 equity-market volatility.',
        "Corporate Presentation Development: Collaborated with the corporate planning team to map departmental responsibilities and co-develop content for the firm's corporate presentation."
      ]
    },
    {
      org: 'Midas Capital', url: 'https://www.linkedin.com/company/midas-capital-2026/',
      location: 'London, ON',
      period: ko ? '2026.09 – 현재' : 'Sep 2026 – Present',
      title: ko ? '주식 애널리스트, 산업재' : 'Equity Analyst, Industrials',
      bullets: ko ? [
        '섹터 커버리지: AI 데이터센터 전력 수요, 전력망 CAPEX, 국방 지출에 초점을 두고 전기설비·전력 인프라·항공우주/방산 미국 산업재 스크리닝; Eaton (NYSE: ETN), GE Vernova (NYSE: GEV) 커버.',
        '밸류에이션 & 거래 분석: 컨센서스 추정치, 회사 가이던스, 15개 이상 트레이딩 비교기업을 바탕으로 DCF, 민감도, 하방 시나리오 분석을 통해 기업가치 $500M–$2B 범위의 다수 기업 평가.',
        '투자 분석: DCF, 트레이딩 비교, 촉매 분석, bull/base/bear 시나리오를 포함한 6개 이상 투자 케이스 개발; 핵심 리스크 평가 및 영업 가정에 대한 20%+ 상·하방 민감도 모델링.'
      ] : [
        'Sector Coverage: Screen US industrials across electrical equipment, power infrastructure, and aerospace & defense, focusing on AI data-center power demand, grid capital expenditure and defense spending; cover Eaton (NYSE: ETN) and GE Vernova (NYSE: GEV).',
        'Valuation & Transaction Analysis: Evaluated $500M–$2B enterprise value ranges across multiple companies using DCF, sensitivity, and downside-case analyses informed by consensus estimates, company guidance, and 15+ trading comparables.',
        'Investment Analysis: Developed 6+ investment cases with DCF, trading comparables, catalyst analysis, and bull/base/bear scenarios; assessed key risks and modeled 20%+ upside/downside sensitivity to operating assumptions.'
      ]
    }
  ];

  const proj = [
    {
      org: 'Automated DCF Model', url: 'https://github.com/HyeonbinJung/Automated-DCF-ML',
      location: ko ? '서울' : 'Seoul, South Korea',
      period: ko ? '2026.07 – 2026.09' : 'July 2026 – Sep 2026',
      title: ko ? 'Paratus Investment를 위해 구축' : 'Built for Paratus Investment',
      bullets: ko ? [
        '밸류에이션 및 거래 자문을 지원하기 위해 영업 예측, 현금흐름 분석, 민감도 테스트를 통합한 자동화 DCF 및 재무 분석 워크플로우 구축.',
        'Python, pandas, NumPy, Excel 자동화를 활용해 반복적인 모델링 작업을 표준화하고 밸류에이션·실사 워크스트림 전반의 일관성 개선.'
      ] : [
        'Built an automated DCF and financial analysis workflow to support valuation and transaction advisory, integrating operating forecasts, cash flow analysis, and sensitivity testing.',
        'Used Python, pandas, NumPy, and Excel automation to standardize recurring modeling tasks and improve consistency across valuation and diligence workstreams.'
      ]
    },
    {
      org: 'SUPERDUPERCATAI', url: 'https://www.instagram.com/superdupercatai/',
      location: ko ? 'Y Combinator W27 지원' : 'Applied to Y Combinator, Winter 2027 Batch',
      period: ko ? '2026.09' : 'Sep 2026',
      title: ko ? '창업 프로젝트' : 'Entrepreneurial Project',
      bullets: ko ? [
        'OpenAI, Runway, Midjourney API를 활용해 아이디어 발굴, 에셋 생성, 숏폼 영상 제작을 자동화하는 AI 기반 콘텐츠 제작·배포 시스템 구축.',
        '계정을 팔로워 2.5만 명으로 성장, 최고 조회수 700만+, 릴당 평균 약 50만 조회 달성; 저비용 오가닉 배포와 빠른 콘텐츠 실험 검증.',
        '영업이익률 극대화, 비용 절감 기회 발굴, 소규모 사업 PNexus 운영 지원 등 시스템 기획과 사업 운영에 참여.'
      ] : [
        'Built an AI-driven content production and distribution system using OpenAI, Runway, and Midjourney APIs, automating ideation, asset generation, and short-form video production.',
        'Scaled the account to 25K followers, with 7M+ peak views and roughly 500K average views per reel, validating low-cost organic distribution and rapid content experimentation.',
        'Participated in system planning and business operations, including initiatives to maximize operating margins, identify cost-reduction opportunities, and support the management of a small business, PNexus.'
      ]
    }
  ];

  const map = e => Object.assign({}, e, { bullets: e.bullets.map(split) });

  return {
    experience: exp.map(map),
    projects: proj.map(map),
    education: {
      period: 'Sep 2024 – Aug 2028',
      location: 'London, ON',
      school: 'Western University',
      honours: "Continue in Canada Scholarship · Dean's Honour List",
      coursework: 'Foundations of Financial Economics, Risk and Financial Institutions, Econometrics I & II, Managerial Economics, Intermediate Microeconomics, Intermediate Macroeconomics, International Economics'
    },
    skills: [
      { label: ko ? '툴' : 'Tools', items: ['Excel', 'PowerPoint', 'Power BI', 'Capital IQ', 'Bloomberg', 'FactSet', 'SQL', 'Python', 'Power Query'] },
      { label: ko ? '파이낸스' : 'Finance', items: ['Financial Statement Modeling', 'DCF Valuation', 'Comparable Company Analysis', 'Transaction Analysis'] },
      { label: ko ? '데이터 / 분석' : 'Data / Analytics', items: ['Data Cleaning', 'Financial Data Automation', 'Time-Series Analysis', 'Dashboarding'] },
      { label: ko ? '언어' : 'Languages', items: ko ? ['한국어 (모국어)', '영어 (전문 업무 가능)'] : ['Korean (Native)', 'English (Professional Working Proficiency)'] }
    ],
    tabs: ko
      ? { experience: '경력', projects: '프로젝트', skills: '학력 & 스킬', contact: '연락' }
      : { experience: 'Experience', projects: 'Projects', skills: 'Education & Skills', contact: 'Contact' },
    t: ko ? {
      name: '김준형', role: '금융 · Western University 경제학', download: '이력서 PDF',
      intro: '밸류에이션과 산업재 섹터 리서치 경험을 가진 Western University 경제학 전공자입니다. 자산운용 인턴십과 주식 리서치, 자동화 DCF 모델링 경험을 바탕으로 금융 분야에서 커리어를 쌓고자 합니다.',
      degree: '경제학 학사 (Bachelor of Arts, Economics) · 2028년 8월 졸업 예정', honours: '수상', coursework: '주요 과목',
      githubDesc: 'Python, pandas, NumPy, Excel 자동화 기반 DCF 및 재무 분석 워크플로우. Paratus Investment를 위해 구축.',
      followers: '팔로워', peakViews: '최고 조회', avgViews: '릴 평균', embedSoon: '인스타그램 릴 임베드 자리',
      contactTitle: '연락하기', contactNote: '리크루팅, 네트워킹, 리서치 관련 문의 모두 환영합니다. 이메일로 전달됩니다.',
      fName: '이름', fEmail: '이메일', fMessage: '메시지', send: '보내기', orLinkedin: '또는 LinkedIn으로 연결',
      photoAlt: '김준형 프로필 사진', photoPh: '사진 자리'
    } : {
      name: 'Junhyung Kim', role: 'Finance · Economics, Western University', download: 'Resume PDF',
      intro: 'Economics student at Western University with experience in valuation and industrials sector research. Pursuing a career in the financial field after an asset-management internship, equity research coverage, and building an automated DCF model.',
      degree: 'Bachelor of Arts, Economics · Expected Aug 2028', honours: 'Honours', coursework: 'Coursework',
      githubDesc: 'Automated DCF and financial analysis workflow in Python, pandas, NumPy and Excel automation. Built for Paratus Investment.',
      followers: 'Followers', peakViews: 'Peak views', avgViews: 'Avg / reel', embedSoon: 'Instagram reel embed placeholder',
      contactTitle: 'Get in touch', contactNote: 'Open to recruiting conversations, coffee chats and research questions. Messages go straight to my inbox.',
      fName: 'Name', fEmail: 'Email', fMessage: 'Message', send: 'Send message', orLinkedin: 'or connect on LinkedIn',
      photoAlt: 'Junhyung Kim', photoPh: 'Drop headshot'
    }
  };
}

/* ---------- icons ---------- */

const ICON_DOWNLOAD = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M4 21h16"></path></svg>';
const ICON_GITHUB = '<svg width="20" height="20" viewBox="0 0 24 24" fill="#14213D" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"></path></svg>';
const ICON_INSTAGRAM = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14213D" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1" fill="#14213D"></circle></svg>';

/* ---------- partials ---------- */

function topbar(d, lang) {
  return `
<header class="topbar">
  <div class="brand">Junhyung Kim</div>
  <div class="topbar-actions">
    <div class="langtoggle" role="group" aria-label="Language">
      <button type="button" data-lang="en" aria-pressed="${lang === 'en'}">EN</button>
      <button type="button" data-lang="ko" aria-pressed="${lang === 'ko'}">한국어</button>
    </div>
    <a class="btn-pdf" href="${PDF_URL}" download="Junhyung_Kim_Resume.pdf">${ICON_DOWNLOAD}${esc(d.t.download)}</a>
  </div>
</header>`;
}

function hero(d) {
  const t = d.t;
  return `
<section class="hero">
  <div class="hero-main">
    <div class="eyebrow">${esc(t.role)}</div>
    <h1>${esc(t.name)}</h1>
    <p class="intro">${esc(t.intro)}</p>
    <div class="meta">
      <a class="strong" href="mailto:${EMAIL}">${EMAIL}</a>
      <a href="https://wa.me/15196438561">+1 519-643-8561</a>
      <span>+82 10-2412-5105</span>
      <a class="strong" href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a>
      <span>London, ON · Seoul</span>
    </div>
  </div>
  <div class="photo" id="photo">
    <img src="${PHOTO_URL}" alt="${esc(t.photoAlt)}">
    <span class="photo-ph">${esc(t.photoPh)}</span>
  </div>
</section>`;
}

function tabbar(d, tab) {
  const btns = TAB_KEYS.map(k => `
    <button type="button" role="tab" id="tab-${k}" data-tab="${k}"
      aria-selected="${tab === k}" aria-controls="panel-${k}" tabindex="${tab === k ? 0 : -1}">${esc(d.tabs[k])}</button>`).join('');
  return `<nav class="tabs" role="tablist" aria-label="${esc(d.t.name)}">${btns}</nav>`;
}

function entry(e) {
  const bullets = e.bullets.map(b =>
    `<li>${b.lead ? `<span class="lead">${esc(b.lead)}</span>` : ''}${esc(b.text)}</li>`).join('');
  return `
<article class="row">
  <div class="row-meta">
    <span class="period">${esc(e.period)}</span>
    <span>${esc(e.location)}</span>
  </div>
  <div class="row-body">
    <div class="row-head">
      <a class="org" href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.org)}</a>
      <div class="role">${esc(e.title)}</div>
    </div>
    <ul class="bullets">${bullets}</ul>
  </div>
</article>`;
}

function projectCards(t) {
  return `
<div class="cards">
  <a class="card" href="https://github.com/HyeonbinJung/Automated-DCF-ML" target="_blank" rel="noopener">
    <div class="card-top">${ICON_GITHUB}<span class="card-handle">github.com/HyeonbinJung</span></div>
    <div class="card-title">Automated-DCF-ML</div>
    <div class="card-desc">${esc(t.githubDesc)}</div>
  </a>
  <a class="card" href="https://www.instagram.com/superdupercatai/" target="_blank" rel="noopener">
    <div class="card-top">${ICON_INSTAGRAM}<span class="card-handle">@superdupercatai</span></div>
    <div class="card-title">SUPERDUPERCATAI</div>
    <div class="stats">
      <div class="stat"><span class="stat-v">25K</span><span class="stat-l">${esc(t.followers)}</span></div>
      <div class="stat"><span class="stat-v">7M+</span><span class="stat-l">${esc(t.peakViews)}</span></div>
      <div class="stat"><span class="stat-v">500K</span><span class="stat-l">${esc(t.avgViews)}</span></div>
    </div>
    <div class="embed">${esc(t.embedSoon)}</div>
  </a>
</div>`;
}

function skillsPanel(d) {
  const ed = d.education, t = d.t;
  const rows = d.skills.map(s => `
<div class="skill-row">
  <div class="skill-label">${esc(s.label)}</div>
  <div class="chips">${s.items.map(i => `<span class="chip">${esc(i)}</span>`).join('')}</div>
</div>`).join('');
  return `
<article class="row">
  <div class="row-meta">
    <span class="period">${esc(ed.period)}</span>
    <span>${esc(ed.location)}</span>
  </div>
  <div class="row-body">
    <div class="row-head">
      <div class="org">${esc(ed.school)}</div>
      <div class="role">${esc(t.degree)}</div>
    </div>
    <dl class="edu-detail">
      <dt>${esc(t.honours)}</dt><dd>${esc(ed.honours)}</dd>
      <dt>${esc(t.coursework)}</dt><dd>${esc(ed.coursework)}</dd>
    </dl>
  </div>
</article>${rows}`;
}

function contactPanel(t) {
  return `
<div class="contact">
  <div class="contact-aside">
    <span class="t">${esc(t.contactTitle)}</span>
    <span>${esc(t.contactNote)}</span>
  </div>
  <form id="contactForm">
    <input name="name" required placeholder="${esc(t.fName)}" autocomplete="name">
    <input name="email" type="email" required placeholder="${esc(t.fEmail)}" autocomplete="email">
    <textarea name="message" required rows="6" placeholder="${esc(t.fMessage)}"></textarea>
    <div class="contact-actions">
      <button class="btn-send" type="submit">${esc(t.send)}</button>
      <a class="alt-link" href="${LINKEDIN}" target="_blank" rel="noopener">${esc(t.orLinkedin)}</a>
    </div>
  </form>
</div>`;
}

function panel(key, tab, title, inner) {
  return `<section class="panel${tab === key ? ' is-active' : ''}" id="panel-${key}"
    role="tabpanel" aria-labelledby="tab-${key}" data-title="${esc(title)}">${inner}</section>`;
}

/* ---------- render ---------- */

function render() {
  const d = data(state.lang), t = d.t, tab = state.tab;

  document.documentElement.lang = state.lang;
  document.documentElement.dataset.lang = state.lang;
  document.title = `${t.name} — ${t.role}`;

  document.getElementById('app').innerHTML = [
    topbar(d, state.lang),
    hero(d),
    tabbar(d, tab),
    panel('experience', tab, d.tabs.experience, d.experience.map(entry).join('')),
    panel('projects', tab, d.tabs.projects, d.projects.map(entry).join('') + projectCards(t)),
    panel('skills', tab, d.tabs.skills, skillsPanel(d)),
    panel('contact', tab, d.tabs.contact, contactPanel(t))
  ].join('');

  wire();
}

function selectTab(key) {
  if (!TAB_KEYS.includes(key)) return;
  state.tab = key;
  document.querySelectorAll('.tabs button').forEach(b => {
    const on = b.dataset.tab === key;
    b.setAttribute('aria-selected', String(on));
    b.tabIndex = on ? 0 : -1;
  });
  document.querySelectorAll('.panel').forEach(p => p.classList.toggle('is-active', p.id === `panel-${key}`));
}

function wire() {
  // Language toggle — re-renders in place, keeping scroll position and tab.
  document.querySelectorAll('.langtoggle button').forEach(b => {
    b.addEventListener('click', () => {
      if (b.dataset.lang === state.lang) return;
      state.lang = b.dataset.lang;
      try { localStorage.setItem(LANG_KEY, state.lang); } catch (e) { /* private mode */ }
      const y = window.scrollY;
      render();
      window.scrollTo(0, y);
    });
  });

  // Tabs — click plus left/right arrow roving focus.
  const tabBtns = [...document.querySelectorAll('.tabs button')];
  tabBtns.forEach((b, i) => {
    b.addEventListener('click', () => selectTab(b.dataset.tab));
    b.addEventListener('keydown', ev => {
      const step = ev.key === 'ArrowRight' ? 1 : ev.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      ev.preventDefault();
      const next = tabBtns[(i + step + tabBtns.length) % tabBtns.length];
      selectTab(next.dataset.tab);
      next.focus();
    });
  });

  // Headshot: fall back to the dashed placeholder when assets/profile.jpg is absent.
  const photo = document.getElementById('photo');
  const img = photo && photo.querySelector('img');
  if (img) img.addEventListener('error', () => { photo.classList.add('is-empty'); img.remove(); });

  // Contact form — opens the visitor's mail client, same as the design.
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', ev => {
    ev.preventDefault();
    if (!form.reportValidity()) return;
    const f = new FormData(form);
    const subject = encodeURIComponent('Website contact from ' + f.get('name'));
    const body = encodeURIComponent(f.get('message') + '\n\n— ' + f.get('name') + ' (' + f.get('email') + ')');
    location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  });
}

try {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === 'en' || saved === 'ko') state.lang = saved;
} catch (e) { /* private mode */ }

render();
