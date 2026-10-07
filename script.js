/* ══════════════════════════════════════════════
   POTIFY.UZ — Ta'lim Platformasi
   Asosiy JavaScript fayli
══════════════════════════════════════════════ */

/* ─── DATA ─────────────────────────────────── */
let teachers = [
  {id:1, name:"Aziza Karimova", subject:"Matematika", email:"aziza@potify.uz", password:"teacher123", phone:"+998901234568", exp:"8 yil", emoji:"👩‍🏫",
   achievements:"2023-yil eng yaxshi o'qituvchisi, 5 nafar o'quvchi olimpiada g'olibi, Respublika mukofoti sohibi"},
  {id:2, name:"Bobur Toshmatov", subject:"Fizika", email:"bobur@potify.uz", password:"teacher123", phone:"+998901234569", exp:"6 yil", emoji:"👨‍🔬",
   achievements:"Xalqaro fizika olimpiadasi hakami, 3 marta eng yaxshi o'qituvchi sovrinini olgan"},
  {id:3, name:"Gulnora Mahmudova", subject:"Ingliz tili", email:"gulnora@potify.uz", password:"teacher123", phone:"+998901234570", exp:"10 yil", emoji:"👩‍💼",
   achievements:"IELTS 8.5, Cambridge sertifikati sohibi, 12 nafar o'quvchisi xorijda o'qiydi"},
  {id:4, name:"Dilshod Rahimov", subject:"Kimyo", email:"dilshod@potify.uz", password:"teacher123", phone:"+998901234571", exp:"7 yil", emoji:"🧪",
   achievements:"Kimyo olimpiadasi g'oliblari tayyorlagan, 2 ta ilmiy maqola muallifi"}
];

let students = [
  {id:101, name:"Ali Valiyev", group:"10-A", teacher:"Aziza Karimova", phone:"998901234567", password:"1234", emoji:"🧑‍🎓",
   achievements:"Matematika olimpiadasi 1-o'rin, Respublika matematika musobaqasi g'olibi",
   grades:{Matematika:95, Fizika:88, Ingliz:82, Kimyo:79}, attendance:92},
  {id:102, name:"Zebo Akbarova", group:"11-B", teacher:"Gulnora Mahmudova", phone:"998901234568", password:"1234", emoji:"👩‍🎓",
   achievements:"IELTS 7.5 ball, Ingliz tili olimpiadasi 1-o'rin",
   grades:{Matematika:85, Fizika:78, Ingliz:97, Kimyo:81}, attendance:96},
  {id:103, name:"Jasur Alimov", group:"9-C", teacher:"Bobur Toshmatov", phone:"998901234569", password:"1234", emoji:"🧑‍💻",
   achievements:"Fizika olimpiadasi 1-o'rin, Xalqaro musobaqa 3-o'rin",
   grades:{Matematika:90, Fizika:98, Ingliz:75, Kimyo:85}, attendance:89},
  {id:104, name:"Madina Sobirova", group:"10-A", teacher:"Dilshod Rahimov", phone:"998901234570", password:"1234", emoji:"👩‍🔬",
   achievements:"Kimyo olimpiadasi 1-o'rin, Ilmiy loyiha 1-o'rin",
   grades:{Matematika:87, Fizika:83, Ingliz:79, Kimyo:96}, attendance:94},
  {id:105, name:"Sardor Komilov", group:"11-A", teacher:"Aziza Karimova", phone:"998901234571", password:"1234", emoji:"🧑‍🎓",
   achievements:"Matematika olimpiadasi 2-o'rin, Dasturlash musobaqasi g'olibi",
   grades:{Matematika:93, Fizika:86, Ingliz:88, Kimyo:80}, attendance:91},
  {id:106, name:"Nilufar Qodiova", group:"9-B", teacher:"Gulnora Mahmudova", phone:"998901234572", password:"1234", emoji:"👩‍🎓",
   achievements:"Ingliz tili 2-o'rin, IELTS 6.5 ball",
   grades:{Matematika:78, Fizika:72, Ingliz:91, Kimyo:75}, attendance:97}
];

let achievements = [
  {id:201, type:"student", owner:"Ali Valiyev", title:"Matematika olimpiadasi", place:"1-o'rin", date:"2026-01-15", emoji:"🥇"},
  {id:202, type:"student", owner:"Zebo Akbarova", title:"IELTS 7.5 ball", place:"Sertifikat", date:"2026-02-01", emoji:"🌍"},
  {id:203, type:"teacher", owner:"Aziza Karimova", title:"Yil o'qituvchisi 2026", place:"Respublika", date:"2025-12-20", emoji:"🏆"},
  {id:204, type:"student", owner:"Jasur Alimov", title:"Fizika olimpiadasi", place:"1-o'rin", date:"2026-01-20", emoji:"⚡"},
  {id:205, type:"student", owner:"Madina Sobirova", title:"Kimyo olimpiadasi", place:"1-o'rin", date:"2026-02-10", emoji:"⚗️"},
  {id:206, type:"teacher", owner:"Gulnora Mahmudova", title:"Cambridge sertifikati", place:"C2 daraja", date:"2025-11-05", emoji:"📜"}
];

let tickerItems = [
  {text:"🏆 Xalqaro matematika olimpiadasi — 1-o'rin", title:"Xalqaro olimpiada", cat:"Yutuq"},
  {text:"👨‍🏫 Aziza Karimova — Yil o'qituvchisi 2026", title:"Yil o'qituvchisi", cat:"Maktab"},
  {text:"🎓 5 nafar o'quvchi xorijiy grant sohibi", title:"Grant sohiblari", cat:"Ta'lim"},
  {text:"🔬 Zamonaviy kimyo laboratoriyasi ochildi", title:"Yangi laboratoriya", cat:"Maktab"},
  {text:"🌍 Zebo Akbarova — IELTS 7.5 ball", title:"IELTS", cat:"Ta'lim"}
];

let messages = [];
let currentUser = null;
let dark = false;

/* ─── HELPERS ──────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ─── TOAST ────────────────────────────────── */
function toast(msg) {
  const t = $('#toast');
  t.querySelector('span').textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2500);
}

/* ─── MODALS ───────────────────────────────── */
function openModal(id) { $('#' + id).classList.add('open'); }
function closeModal(id) { $('#' + id).classList.remove('open'); }

function showArt(title, cat) {
  const emojis = {'Matematika':'🧮','Fizika':'⚡','Ingliz tili':'🌍','Kimyo':'⚗️','O\'quvchi':'👨‍🎓','Yutuq':'🏆','Maktab':'🏫','Ta\'lim':'📚','Fan':'🔬','Platforma':'💻'};
  $('#modalTag').textContent = cat;
  $('#modalTitle').textContent = title;
  $('#modalEmoji').textContent = emojis[cat] || emojis[title] || '📰';
  $('#modalText').textContent = `POTIFY.UZ ta'lim platformasida "${title}" haqida yangiliklar va muhim ma'lumotlar. O'qituvchilar va o'quvchilarimiz faol ishtirokida qo'zg'atib borilayotgan bu yo'nalishda yangi yutuqlar qo'lga kiritilmoqda.`;
  openModal('articleModal');
}

/* ─── THEME ────────────────────────────────── */
function toggleTheme() {
  dark = !dark;
  document.body.classList.toggle('dark-mode', dark);
  const root = document.documentElement.style;
  root.setProperty('--paper', dark ? '#111118' : '#f7f5f0');
  root.setProperty('--paper-2', dark ? '#1a1a24' : '#ede9e0');
  root.setProperty('--paper-3', dark ? '#22222f' : '#e2ddd4');
  root.setProperty('--ink', dark ? '#f0ede8' : '#0a0a0f');
  root.setProperty('--ink-2', dark ? '#e0ddd8' : '#1a1a2e');
  root.setProperty('--white', dark ? '#1a1a24' : '#ffffff');
  root.setProperty('--border', dark ? 'rgba(240,237,232,0.1)' : 'rgba(10,10,15,0.1)');
  root.setProperty('--muted', dark ? '#9090a0' : '#6b6b80');
  // Yangilash ikonlar
  $$('.icon-btn i.fas.fa-moon, .icon-btn i.fas.fa-sun').forEach(i => {
    i.classList.toggle('fa-moon', !dark);
    i.classList.toggle('fa-sun', dark);
  });
  toast(dark ? '🌙 Qorong\'u rejim' : '☀️ Yorug\' rejim');
}

/* ─── PAGE ROUTER ──────────────────────────── */
function goTo(id) {
  $$('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(id);
  if (!page) return;
  page.classList.add('active');
  window.scrollTo(0, 0);

  if (id === 'mainPage') renderMain();
  if (id === 'adminPage') { renderAdminTab('dashboard'); updateBadges(); }
  if (id === 'teacherPage') { renderTeacherTab('tDash'); updateBadges(); }
  if (id === 'studentPage') { renderStudentTab('sDash'); updateBadges(); }
  updateHeader();
}

function scrollTo2(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function nav(el, sec) {
  $$('.nav-link').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
  scrollTo2(sec);
}

/* ─── HEADER UPDATE ────────────────────────── */
function updateHeader() {
  const a = $('#headerActions');
  if (!a) return;
  const themeBtn = `<div class="icon-btn" data-theme title="Tema"><i class="fas fa-${dark ? 'sun' : 'moon'}"></i></div>`;
  if (!currentUser) {
    a.innerHTML = `${themeBtn}
      <button class="btn-ghost" data-goto="loginPage"><i class="fas fa-sign-in-alt"></i> Kirish</button>
      <button class="btn-solid" data-goto="loginPage"><i class="fas fa-user-plus"></i> Ro'yxat</button>`;
  } else {
    const pg = currentUser.role === 'admin' ? 'adminPage' :
               currentUser.role === 'teacher' ? 'teacherPage' : 'studentPage';
    a.innerHTML = `${themeBtn}
      <span style="font-size:0.8rem;font-weight:600;color:var(--muted)">${currentUser.name || 'Foydalanuvchi'}</span>
      <button class="btn-ghost" data-goto="${pg}">Panel</button>
      <button class="btn-ghost" data-logout>Chiqish</button>`;
  }
}

/* ─── LOGOUT ───────────────────────────────── */
function logout() {
  currentUser = null;
  toast('Tizimdan chiqildi');
  goTo('mainPage');
}

/* ─── LOGIN ────────────────────────────────── */
function setRole(r) {
  $$('.role-tab').forEach(t => t.classList.toggle('active', t.dataset.role === r));
  const ri = $('#roleInput');
  if (ri) ri.value = r;
}

function showReg() {
  $('#loginForm').style.display = 'none';
  $('#regForm').style.display = 'block';
}
function showLogin() {
  $('#regForm').style.display = 'none';
  $('#loginForm').style.display = 'block';
}

function doLogin() {
  const email = $('#loginEmail').value.trim();
  const pass = $('#loginPass').value;
  const role = $('#roleInput').value;
  $('#loginErr').style.display = 'none';

  if (role === 'admin' && email === 'admin@potify.uz' && pass === 'admin123') {
    currentUser = { role: 'admin', name: 'Super Admin' };
    toast('Admin sifatida kirdingiz! 🎉');
    goTo('adminPage');
    return;
  }
  const t = teachers.find(t => t.email === email && t.password === pass);
  if (t) {
    currentUser = { ...t, role: 'teacher' };
    toast(`Xush kelibsiz, ${t.name}! 👋`);
    goTo('teacherPage');
    return;
  }
  const s = students.find(s => s.phone === email && s.password === pass);
  if (s) {
    currentUser = { ...s, role: 'student' };
    toast(`Xush kelibsiz, ${s.name}! 🎓`);
    goTo('studentPage');
    return;
  }
  $('#loginErr').style.display = 'block';
  setTimeout(() => { $('#loginErr').style.display = 'none'; }, 3000);
}

function doReg() {
  const n = $('#rName').value.trim();
  const s = $('#rSurname').value.trim();
  const p = $('#rPass').value;
  const p2 = $('#rPass2').value;
  const err = $('#regErr');
  if (!n || !s) { err.textContent = 'Ism va familiyani kiriting!'; err.style.display = 'block'; return; }
  if (p !== p2) { err.textContent = 'Parollar mos kelmadi!'; err.style.display = 'block'; return; }
  if (p.length < 4) { err.textContent = 'Parol kamida 4 ta belgidan iborat bo\'lsin!'; err.style.display = 'block'; return; }

  const newT = {
    id: Date.now(),
    name: `${n} ${s}`,
    subject: $('#rSubject').value || 'Umumiy',
    email: $('#rEmail').value,
    password: p,
    phone: $('#rPhone').value,
    exp: "Yangi",
    emoji: "👨‍🏫",
    achievements: "Yangi o'qituvchi"
  };
  teachers.push(newT);
  currentUser = { ...newT, role: 'teacher' };
  toast(`Xush kelibsiz, ${newT.name}! 🎉`);
  goTo('teacherPage');
}

/* ─── MAIN RENDER ──────────────────────────── */
function renderMain() {
  // Ticker
  const ticker = $('#ticker');
  if (ticker && !ticker.dataset.rendered) {
    ticker.dataset.rendered = '1';
    ticker.innerHTML = tickerItems.concat(tickerItems).map(it => `
      <div class="ticker-item" data-art="${it.title}|${it.cat}">${it.text}</div>
    `).join('');
  }

  // Teachers
  const tg = $('#teacherGrid');
  if (tg) {
    tg.innerHTML = teachers.map(t => `
      <div class="t-card" data-art="${t.name}|${t.subject}">
        <div class="t-card-img">
          <div class="emoji">${t.emoji}</div>
          <div class="overlay"></div>
        </div>
        <div class="t-card-body">
          <div class="t-card-name">${t.name}</div>
          <div class="chip"><i class="fas fa-book-open"></i> ${t.subject}</div>
          <div class="t-achieve"><i class="fas fa-trophy"></i> ${t.achievements.substring(0, 45)}...</div>
        </div>
      </div>
    `).join('');
  }

  // Students
  const sg = $('#studentGrid');
  if (sg) {
    sg.innerHTML = students.slice(0, 6).map(s => `
      <div class="s-card" data-art="${s.name}|O'quvchi">
        <div class="s-card-img">${s.emoji}</div>
        <div class="s-card-body">
          <div class="s-card-name">${s.name}</div>
          <div class="s-grade">${s.group} — ${s.teacher.split(' ')[0]}</div>
          <div class="s-achieve">🏅 ${s.achievements.substring(0, 28)}...</div>
        </div>
      </div>
    `).join('');
  }

  // Achievements
  const ag = $('#achieveGrid');
  if (ag) {
    ag.innerHTML = achievements.map(a => `
      <div class="a-card" data-art="${a.title}|Yutuq">
        <div class="a-icon">${a.emoji}</div>
        <div>
          <div class="a-title">${a.title}</div>
          <div class="a-sub">${a.owner} · ${a.date}</div>
          <span class="a-badge">${a.place}</span>
        </div>
      </div>
    `).join('');
  }
}

/* ─── TABS ─────────────────────────────────── */
function showTab(panel, tab, el) {
  const sidebar = el.closest('.sidebar');
  $$('.sidebar-item', sidebar).forEach(i => i.classList.remove('active'));
  el.classList.add('active');
  if (panel === 'admin') renderAdminTab(tab);
  if (panel === 'teacher') renderTeacherTab(tab);
  if (panel === 'student') renderStudentTab(tab);
}

/* ─── ADMIN TABS ───────────────────────────── */
function renderAdminTab(tab) {
  const c = $('#adminContent');
  if (!c) return;

  if (tab === 'dashboard') {
    c.innerHTML = `
      <h2>Salom, Admin! 👋</h2>
      <p class="page-sub">Platforma statistikasi</p>
      <div class="stats-row">
        <div class="stat-box"><div class="icon orange">👨‍🏫</div><div class="num">${teachers.length}</div><div class="lbl">O'qituvchilar</div></div>
        <div class="stat-box"><div class="icon teal">🎓</div><div class="num">${students.length}</div><div class="lbl">O'quvchilar</div></div>
        <div class="stat-box"><div class="icon gold">🏆</div><div class="num">${achievements.length}</div><div class="lbl">Yutuqlar</div></div>
        <div class="stat-box"><div class="icon dark">💬</div><div class="num">${messages.length}</div><div class="lbl">Xabarlar</div></div>
      </div>
      <div class="table-wrap">
        <div class="table-head"><h3>So'nggi o'quvchilar</h3></div>
        <table>
          <thead><tr><th>Ism</th><th>Guruh</th><th>O'qituvchi</th><th>Holat</th></tr></thead>
          <tbody>${students.slice(0, 5).map(s => `
            <tr>
              <td><div class="td-name"><div class="avatar">${s.name[0]}</div>${s.name}</div></td>
              <td>${s.group}</td>
              <td>${s.teacher}</td>
              <td><span class="status ok">✓ Faol</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  } else if (tab === 'teachers') {
    c.innerHTML = `
      <h2 class="mb">O'qituvchilar ro'yxati</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>O'qituvchi</th><th>Fan</th><th>Tajriba</th><th>O'quvchilar</th><th>Holat</th></tr></thead>
          <tbody>${teachers.map(t => `
            <tr>
              <td><div class="td-name"><div class="avatar accent">${t.name[0]}</div>${t.name}</div></td>
              <td><span class="chip" style="font-size:0.72rem;margin:0">${t.subject}</span></td>
              <td>${t.exp}</td>
              <td>${students.filter(s => s.teacher === t.name).length}</td>
              <td><span class="status ok">✓ Faol</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  } else if (tab === 'students') {
    c.innerHTML = `
      <h2 class="mb">O'quvchilar ro'yxati</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>O'quvchi</th><th>Guruh</th><th>O'qituvchi</th><th>O'rtacha baho</th><th>Davomat</th></tr></thead>
          <tbody>${students.map(s => {
            const avg = Math.round(Object.values(s.grades).reduce((a, b) => a + b, 0) / Object.values(s.grades).length);
            return `<tr>
              <td><div class="td-name"><div class="avatar">${s.name[0]}</div>${s.name}</div></td>
              <td>${s.group}</td>
              <td>${s.teacher}</td>
              <td><span class="grade-val ${avg >= 90 ? 'high' : avg >= 75 ? 'mid' : 'low'} small">${avg}</span></td>
              <td><span class="status ${s.attendance >= 90 ? 'ok' : s.attendance >= 75 ? 'warn' : 'red'}">${s.attendance}%</span></td>
            </tr>`;
          }).join('')}
          </tbody>
        </table>
      </div>`;
  } else if (tab === 'achievements') {
    c.innerHTML = `
      <h2 class="mb">Yutuqlar ro'yxati</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Yutuq</th><th>Egasi</th><th>Turi</th><th>O'rin</th><th>Sana</th></tr></thead>
          <tbody>${achievements.map(a => `
            <tr>
              <td><div class="td-name">${a.emoji} ${a.title}</div></td>
              <td>${a.owner}</td>
              <td><span class="status ${a.type === 'teacher' ? 'warn' : 'ok'}">${a.type === 'teacher' ? "👨‍🏫 O'qituvchi" : "🎓 O'quvchi"}</span></td>
              <td>${a.place}</td>
              <td>${a.date}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  } else if (tab === 'addTeacher') {
    c.innerHTML = `
      <h2 class="mb">O'qituvchi qo'shish</h2>
      <div class="card-box narrow">
        <div class="form-row">
          <div class="form-group"><label>Ism</label><input id="atn" class="form-input" placeholder="Ism"></div>
          <div class="form-group"><label>Familiya</label><input id="ats" class="form-input" placeholder="Familiya"></div>
        </div>
        <div class="form-group"><label>Fan</label><input id="atsubj" class="form-input" placeholder="Fan nomi"></div>
        <div class="form-group"><label>Email</label><input id="atemail" class="form-input" placeholder="email@potify.uz"></div>
        <div class="form-row">
          <div class="form-group"><label>Telefon</label><input id="atphone" class="form-input" placeholder="+998..."></div>
          <div class="form-group"><label>Tajriba</label><input id="atexp" class="form-input" placeholder="3 yil"></div>
        </div>
        <div class="form-group"><label>Parol</label><input type="password" id="atpass" class="form-input" placeholder="Parol"></div>
        <button class="btn-submit" id="addTeacherBtn">Qo'shish →</button>
      </div>`;
  } else if (tab === 'addStudent') {
    c.innerHTML = `
      <h2 class="mb">O'quvchi qo'shish</h2>
      <div class="card-box narrow">
        <div class="form-row">
          <div class="form-group"><label>Ism</label><input id="asn" class="form-input" placeholder="Ism"></div>
          <div class="form-group"><label>Familiya</label><input id="ass" class="form-input" placeholder="Familiya"></div>
        </div>
        <div class="form-group"><label>Guruh</label><input id="asgroup" class="form-input" placeholder="10-A"></div>
        <div class="form-group"><label>O'qituvchi</label>
          <select id="asteacher" class="form-select">
            ${teachers.map(t => `<option value="${t.name}">${t.name} — ${t.subject}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label>Telefon (login)</label><input id="asphone" class="form-input" placeholder="998901234567"></div>
        <div class="form-group"><label>Parol</label><input type="password" id="aspass" class="form-input" placeholder="Parol"></div>
        <button class="btn-submit" id="addStudentBtn">Qo'shish →</button>
      </div>`;
  } else if (tab === 'addAchieve') {
    c.innerHTML = `
      <h2 class="mb">Yutuq qo'shish</h2>
      <div class="card-box narrow">
        <div class="form-group"><label>Yutuq nomi</label><input id="acht" class="form-input" placeholder="Olimpiada nomi"></div>
        <div class="form-group"><label>Egasi</label>
          <select id="acho" class="form-select">
            <optgroup label="O'qituvchilar">${teachers.map(t => `<option value="${t.name}|teacher">${t.name}</option>`).join('')}</optgroup>
            <optgroup label="O'quvchilar">${students.map(s => `<option value="${s.name}|student">${s.name}</option>`).join('')}</optgroup>
          </select>
        </div>
        <div class="form-group"><label>O'rin / Natija</label><input id="achp" class="form-input" placeholder="1-o'rin"></div>
        <div class="form-group"><label>Sana</label><input type="date" id="achd" class="form-input" value="2026-04-29"></div>
        <button class="btn-submit" id="addAchieveBtn">Qo'shish →</button>
      </div>`;
  }

  // Hodisa biriktirish
  const btnAddT = $('#addTeacherBtn');
  if (btnAddT) btnAddT.addEventListener('click', addTeacherAdmin);
  const btnAddS = $('#addStudentBtn');
  if (btnAddS) btnAddS.addEventListener('click', addStudentAdmin);
  const btnAddA = $('#addAchieveBtn');
  if (btnAddA) btnAddA.addEventListener('click', addAchieveAdmin);
}

function addTeacherAdmin() {
  const n = $('#atn').value.trim();
  const s = $('#ats').value.trim();
  if (!n || !s) { toast('Ism va familiyani kiriting!'); return; }
  teachers.push({
    id: Date.now(), name: `${n} ${s}`,
    subject: $('#atsubj').value || 'Umumiy',
    email: $('#atemail').value,
    password: $('#atpass').value || 'teacher123',
    phone: $('#atphone').value,
    exp: $('#atexp').value || 'Yangi',
    emoji: '👨‍🏫', achievements: 'Yangi o\'qituvchi'
  });
  toast(`${n} ${s} muvaffaqiyatli qo'shildi!`);
  renderAdminTab('teachers');
}

function addStudentAdmin() {
  const n = $('#asn').value.trim();
  const s = $('#ass').value.trim();
  if (!n || !s) { toast('Ism va familiyani kiriting!'); return; }
  students.push({
    id: Date.now(), name: `${n} ${s}`,
    group: $('#asgroup').value || '10-A',
    teacher: $('#asteacher').value,
    phone: $('#asphone').value,
    password: $('#aspass').value || '1234',
    emoji: '🎓', achievements: 'Yangi o\'quvchi',
    grades: { Matematika: 85, Fizika: 80, Ingliz: 80, Kimyo: 80 }, attendance: 90
  });
  toast(`${n} ${s} muvaffaqiyatli qo'shildi!`);
  renderAdminTab('students');
}

function addAchieveAdmin() {
  const t = $('#acht').value.trim();
  if (!t) { toast('Yutuq nomini kiriting!'); return; }
  const [owner, type] = ($('#acho').value || '').split('|');
  achievements.push({
    id: Date.now(), type: type || 'student', owner: owner || '',
    title: t, place: $('#achp').value || '1-o\'rin',
    date: $('#achd').value || '2026-04-29', emoji: '🏆'
  });
  toast('Yutuq muvaffaqiyatli qo\'shildi!');
  renderAdminTab('achievements');
}

/* ─── TEACHER TABS ─────────────────────────── */
function renderTeacherTab(tab) {
  if (!currentUser) return;
  const c = $('#teacherContent');
  if (!c) return;
  const myStudents = students.filter(s => s.teacher === currentUser.name);
  const myAchieve = achievements.filter(a => a.owner === currentUser.name || myStudents.some(s => s.name === a.owner));

  if (tab === 'tDash') {
    const avgAll = myStudents.length > 0
      ? Math.round(myStudents.reduce((a, s) => a + Object.values(s.grades).reduce((x, y) => x + y, 0) / Object.values(s.grades).length, 0) / myStudents.length)
      : 0;
    c.innerHTML = `
      <div class="profile-banner">
        <div class="p-avatar">${(currentUser.name || 'T')[0]}</div>
        <div class="p-info">
          <h2>${currentUser.name}</h2>
          <p>${currentUser.email || ''}</p>
          <div class="p-tags">
            <span class="p-tag">📚 ${currentUser.subject}</span>
            <span class="p-tag">⏱ ${currentUser.exp}</span>
            <span class="p-tag">📞 ${currentUser.phone || ''}</span>
          </div>
        </div>
      </div>
      <div class="stats-row">
        <div class="stat-box"><div class="icon teal">🎓</div><div class="num">${myStudents.length}</div><div class="lbl">O'quvchilarim</div></div>
        <div class="stat-box"><div class="icon gold">🏆</div><div class="num">${myAchieve.length}</div><div class="lbl">Yutuqlar</div></div>
        <div class="stat-box"><div class="icon orange">⭐</div><div class="num">${avgAll}</div><div class="lbl">O'rt. baho</div></div>
      </div>
      <div class="card-box">
        <h3>O'quvchilarim (${myStudents.length})</h3>
        ${myStudents.map(s => {
          const avg = Math.round(Object.values(s.grades).reduce((a, b) => a + b, 0) / Object.values(s.grades).length);
          return `<div class="grade-item">
            <div><div class="grade-name">${s.emoji} ${s.name}</div><div class="grade-sub">${s.group}</div></div>
            <div class="grade-val ${avg >= 90 ? 'high' : 'mid'}">${avg}</div>
          </div>`;
        }).join('') || '<p style="color:var(--muted)">O\'quvchi yo\'q</p>'}
      </div>`;
  } else if (tab === 'tStudents') {
    c.innerHTML = `
      <h2 class="mb">O'quvchilarim</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>O'quvchi</th><th>Guruh</th><th>Telefon</th><th>O'rt. baho</th><th>Davomat</th></tr></thead>
          <tbody>${myStudents.map(s => {
            const avg = Math.round(Object.values(s.grades).reduce((a, b) => a + b, 0) / Object.values(s.grades).length);
            return `<tr>
              <td><div class="td-name"><div class="avatar">${s.name[0]}</div>${s.name}</div></td>
              <td>${s.group}</td><td>${s.phone}</td>
              <td><span class="grade-val ${avg >= 90 ? 'high' : avg >= 75 ? 'mid' : 'low'} small">${avg}</span></td>
              <td><span class="status ${s.attendance >= 90 ? 'ok' : s.attendance >= 75 ? 'warn' : 'red'}">${s.attendance}%</span></td>
            </tr>`;
          }).join('') || '<tr><td colspan="5" class="td-empty">O\'quvchi yo\'q</td></tr>'}
          </tbody>
        </table>
      </div>`;
  } else if (tab === 'tGrades') {
    c.innerHTML = `
      <h2 class="mb">Baholar kiritish</h2>
      ${myStudents.map(s => `
        <div class="card-box">
          <h3>${s.emoji} ${s.name} — ${s.group}</h3>
          <div class="grade-inputs">
            ${Object.entries(s.grades).map(([subj, grade]) => `
              <div>
                <label>${subj}</label>
                <input type="number" min="0" max="100" value="${grade}" class="form-input"
                  data-grade-student="${s.id}" data-grade-subject="${subj}">
              </div>`).join('')}
          </div>
        </div>`).join('') || '<p style="color:var(--muted)">O\'quvchi yo\'q</p>'}
    `;
    // Kiritishni kuzatish
    $$('input[data-grade-student]', c).forEach(inp => {
      inp.addEventListener('change', e => {
        const sid = +e.target.dataset.gradeStudent;
        const subj = e.target.dataset.gradeSubject;
        const st = students.find(s => s.id === sid);
        if (st) {
          st.grades[subj] = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
          e.target.value = st.grades[subj];
          toast(`${st.name} — ${subj}: ${st.grades[subj]} ball`);
        }
      });
    });
  } else if (tab === 'tAttend') {
    c.innerHTML = `
      <h2 class="mb">Davomat belgilash</h2>
      ${myStudents.map(s => `
        <div class="card-box">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">
            <h3>${s.name}</h3>
            <span class="status ${s.attendance >= 90 ? 'ok' : s.attendance >= 75 ? 'warn' : 'red'}">${s.attendance}% davomat</span>
          </div>
          <div class="att-grid">
            ${Array.from({ length: 28 }, (_, i) => {
              const r = Math.random();
              const cls = r > 0.9 ? 'absent' : r > 0.05 ? 'present' : 'empty';
              return `<div class="att-day ${cls}" data-att-day title="${i + 1}-kun">${i + 1}</div>`;
            }).join('')}
          </div>
          <div class="att-legend">
            <span><span class="swatch present"></span>Keldi</span>
            <span><span class="swatch absent"></span>Kelmadi</span>
          </div>
        </div>`).join('') || '<p style="color:var(--muted)">O\'quvchi yo\'q</p>'}
    `;
    $$('.att-day[data-att-day]', c).forEach(el => {
      el.addEventListener('click', () => {
        if (el.classList.contains('present')) { el.classList.remove('present'); el.classList.add('absent'); }
        else if (el.classList.contains('absent')) { el.classList.remove('absent'); el.classList.add('present'); }
      });
    });
  } else if (tab === 'tAchieve') {
    c.innerHTML = `
      <h2 class="mb">Yutuqlar</h2>
      <div class="card-box narrow mb-lg">
        <h3 style="margin-bottom:1rem">Yangi yutuq qo'shish</h3>
        <div class="form-group"><label>O'quvchi</label>
          <select id="tachS" class="form-select">${myStudents.map(s => `<option value="${s.name}">${s.name}</option>`).join('') || '<option>O\'quvchi yo\'q</option>'}</select>
        </div>
        <div class="form-group"><label>Yutuq nomi</label><input id="tachT" class="form-input" placeholder="Olimpiada nomi"></div>
        <div class="form-row">
          <div class="form-group"><label>O'rin</label><input id="tachP" class="form-input" placeholder="1-o'rin"></div>
          <div class="form-group"><label>Sana</label><input type="date" id="tachD" class="form-input" value="2026-04-29"></div>
        </div>
        <button class="btn-submit btn-compact" id="addTeacherAchieveBtn">Qo'shish →</button>
      </div>
      <div class="table-wrap">
        <div class="table-head"><h3>O'quvchilarim yutuqlari</h3></div>
        <table>
          <thead><tr><th>Yutuq</th><th>O'quvchi</th><th>O'rin</th><th>Sana</th></tr></thead>
          <tbody>${myAchieve.filter(a => a.type === 'student').map(a => `
            <tr><td><div class="td-name">${a.emoji} ${a.title}</div></td>
            <td>${a.owner}</td><td>${a.place}</td><td>${a.date}</td></tr>`).join('') || '<tr><td colspan="4" class="td-empty">Yutuq yo\'q</td></tr>'}
          </tbody>
        </table>
      </div>`;

    const btn = $('#addTeacherAchieveBtn');
    if (btn) btn.addEventListener('click', addTeacherAchieve);
  } else if (tab === 'tMsg') {
    c.innerHTML = `
      <h2 class="mb">Xabar yuborish</h2>
      <div class="card-box narrow">
        <div class="form-group"><label>Kimga</label>
          <select id="tmTo" class="form-select">
            <option value="admin">👑 Admin</option>
            ${myStudents.map(s => `<option value="${s.phone}">🎓 ${s.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label>Xabar</label><textarea id="tmText" class="form-input" rows="4" placeholder="Xabaringizni yozing..."></textarea></div>
        <button class="btn-submit btn-compact" id="sendTeacherMsgBtn"><i class="fas fa-paper-plane"></i> Yuborish</button>
      </div>
      <div class="table-wrap" style="margin-top:1.5rem">
        <div class="table-head"><h3>Kelgan xabarlar</h3></div>
        <div style="padding:1rem">
          ${getMyMessages().length ? getMyMessages().map(m => `
            <div class="msg-item ${m.read ? '' : 'unread'}" data-msg-read="${m.id}">
              <div class="msg-from">${m.from}</div>
              <div class="msg-text">${m.text}</div>
              <div class="msg-date">${m.date}</div>
            </div>`).join('') : '<p style="color:var(--muted);font-size:0.85rem">Xabar yo\'q</p>'}
        </div>
      </div>`;

    const btn = $('#sendTeacherMsgBtn');
    if (btn) btn.addEventListener('click', sendTeacherMsg);
    bindMsgRead();
  }
}

function addTeacherAchieve() {
  const t = $('#tachT').value.trim();
  if (!t) { toast('Yutuq nomini kiriting!'); return; }
  achievements.push({
    id: Date.now(), type: 'student',
    owner: $('#tachS').value,
    title: t, place: $('#tachP').value || '1-o\'rin',
    date: $('#tachD').value, emoji: '🏆'
  });
  toast('Yutuq muvaffaqiyatli qo\'shildi!');
  renderTeacherTab('tAchieve');
}

function sendTeacherMsg() {
  const text = $('#tmText').value.trim();
  if (!text) { toast('Xabar yozing!'); return; }
  messages.push({
    id: Date.now(), from: currentUser.name,
    fromId: currentUser.email,
    to: $('#tmTo').value,
    text, date: new Date().toLocaleDateString('uz-UZ'), read: false
  });
  $('#tmText').value = '';
  toast('Xabar yuborildi! ✉️');
  updateBadges();
}

/* ─── STUDENT TABS ─────────────────────────── */
function renderStudentTab(tab) {
  if (!currentUser) return;
  const c = $('#studentContent');
  if (!c) return;
  const myAchieve = achievements.filter(a => a.owner === currentUser.name);
  const myTeacher = teachers.find(t => t.name === currentUser.teacher);

  if (tab === 'sDash') {
    const grades = Object.values(currentUser.grades || {});
    const avg = Math.round(grades.reduce((a, b) => a + b, 0) / (grades.length || 1));
    c.innerHTML = `
      <div class="profile-banner">
        <div class="p-avatar">${(currentUser.name || 'S')[0]}</div>
        <div class="p-info">
          <h2>${currentUser.name}</h2>
          <p>${currentUser.group} · ${currentUser.teacher}</p>
          <div class="p-tags">
            <span class="p-tag">📱 ${currentUser.phone}</span>
            <span class="p-tag">📊 O'rtacha: ${avg}</span>
            <span class="p-tag">📅 Davomat: ${currentUser.attendance}%</span>
          </div>
        </div>
      </div>
      <div class="stats-row">
        <div class="stat-box"><div class="icon orange">📊</div><div class="num">${avg}</div><div class="lbl">O'rtacha ball</div></div>
        <div class="stat-box"><div class="icon teal">📅</div><div class="num">${currentUser.attendance}%</div><div class="lbl">Davomat</div></div>
        <div class="stat-box"><div class="icon gold">🏆</div><div class="num">${myAchieve.length}</div><div class="lbl">Yutuqlar</div></div>
      </div>
      <div class="card-box">
        <h3>Baholarim</h3>
        ${Object.entries(currentUser.grades || {}).map(([subj, grade]) => `
          <div class="grade-item">
            <div><div class="grade-name">${subj}</div></div>
            <div class="grade-val ${grade >= 90 ? 'high' : grade >= 75 ? 'mid' : 'low'}">${grade}</div>
          </div>`).join('')}
      </div>`;
  } else if (tab === 'sGrades') {
    c.innerHTML = `
      <h2 class="mb">Baholarim</h2>
      <div class="card-box">
        ${Object.entries(currentUser.grades || {}).map(([subj, grade]) => `
          <div class="grade-item">
            <div>
              <div class="grade-name">${subj}</div>
              <div class="grade-sub">${myTeacher && subj === currentUser.subject ? myTeacher.name : 'POTIFY o\'qituvchisi'}</div>
            </div>
            <div style="display:flex;align-items:center;gap:0.75rem">
              <div style="width:120px;height:6px;background:var(--paper-2);border-radius:3px;overflow:hidden">
                <div style="width:${grade}%;height:100%;background:${grade >= 90 ? 'var(--accent-teal)' : grade >= 75 ? 'var(--accent-gold)' : 'var(--accent)'};border-radius:3px"></div>
              </div>
              <div class="grade-val ${grade >= 90 ? 'high' : grade >= 75 ? 'mid' : 'low'}">${grade}</div>
            </div>
          </div>`).join('')}
      </div>`;
  } else if (tab === 'sAttend') {
    c.innerHTML = `
      <h2 class="mb">Davomatim — ${currentUser.attendance}%</h2>
      <div class="card-box">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">
          <h3>Aprel 2026</h3>
          <span class="status ${currentUser.attendance >= 90 ? 'ok' : currentUser.attendance >= 75 ? 'warn' : 'red'}">${currentUser.attendance}% davomat</span>
        </div>
        <div class="att-grid wide">
          ${Array.from({ length: 30 }, (_, i) => {
            const present = i < (currentUser.attendance / 100 * 28);
            return `<div class="att-day ${i < 28 ? (present ? 'present' : 'absent') : 'empty'}" style="font-size:0.65rem">${i < 28 ? i + 1 : ''}</div>`;
          }).join('')}
        </div>
      </div>`;
  } else if (tab === 'sAchieve') {
    c.innerHTML = `
      <h2 class="mb">Yutuqlarim</h2>
      ${myAchieve.length ? `<div class="grid-3">${myAchieve.map(a => `
        <div class="a-card"><div class="a-icon">${a.emoji}</div>
        <div><div class="a-title">${a.title}</div><div class="a-sub">${a.date}</div>
        <span class="a-badge">${a.place}</span></div></div>`).join('')}</div>`
      : '<div class="card-box pad-empty"><p>Hali yutuq yo\'q. Mehnat qiling! 💪</p></div>'}`;
  } else if (tab === 'sSchedule') {
    const schedule = [
      { day: 'Dushanba', lessons: ['08:00 — Matematika', '09:00 — Fizika', '10:00 — Ingliz tili', '11:00 — Kimyo'] },
      { day: 'Seshanba', lessons: ['08:00 — Kimyo', '09:00 — Matematika', '10:00 — Tarix', '11:00 — Jismoniy'] },
      { day: 'Chorshanba', lessons: ['08:00 — Ingliz tili', '09:00 — Kimyo', '10:00 — Matematika', '11:00 — Fizika'] },
      { day: 'Payshanba', lessons: ['08:00 — Fizika', '09:00 — Ingliz tili', '10:00 — Kimyo', '11:00 — Matematika'] },
      { day: 'Juma', lessons: ['08:00 — Matematika', '09:00 — Tarix', '10:00 — Jismoniy', '11:00 — Ingliz tili'] }
    ];
    c.innerHTML = `
      <h2 class="mb">Dars jadvali</h2>
      <div class="schedule-grid">
        ${schedule.map(d => `
          <div class="card-box schedule-day">
            <h3>${d.day}</h3>
            ${d.lessons.map(l => `
              <div class="schedule-lesson">
                <i class="fas fa-clock"></i> ${l}
              </div>`).join('')}
          </div>`).join('')}
      </div>`;
  } else if (tab === 'sMsg') {
    c.innerHTML = `
      <h2 class="mb">Xabar yuborish</h2>
      <div class="card-box narrow">
        <div class="form-group"><label>Kimga</label>
          <select id="smTo" class="form-select">
            <option value="admin">👑 Admin</option>
            ${myTeacher ? `<option value="${myTeacher.email}">👨‍🏫 ${myTeacher.name} (O'qituvchim)</option>` : ''}
          </select>
        </div>
        <div class="form-group"><label>Xabar</label><textarea id="smText" class="form-input" rows="4" placeholder="Xabaringizni yozing..."></textarea></div>
        <button class="btn-submit btn-compact" id="sendStudentMsgBtn"><i class="fas fa-paper-plane"></i> Yuborish</button>
      </div>
      <div class="table-wrap" style="margin-top:1.5rem">
        <div class="table-head"><h3>Kelgan xabarlar</h3></div>
        <div style="padding:1rem">
          ${getMyMessages().length ? getMyMessages().map(m => `
            <div class="msg-item ${m.read ? '' : 'unread'}" data-msg-read="${m.id}">
              <div class="msg-from">${m.from}</div>
              <div class="msg-text">${m.text}</div>
              <div class="msg-date">${m.date}</div>
            </div>`).join('') : '<p style="color:var(--muted);font-size:0.85rem">Xabar yo\'q</p>'}
        </div>
      </div>`;

    const btn = $('#sendStudentMsgBtn');
    if (btn) btn.addEventListener('click', sendStudentMsg);
    bindMsgRead();
  }
}

function sendStudentMsg() {
  const text = $('#smText').value.trim();
  if (!text) { toast('Xabar yozing!'); return; }
  messages.push({
    id: Date.now(), from: currentUser.name,
    fromId: currentUser.phone,
    to: $('#smTo').value,
    text, date: new Date().toLocaleDateString('uz-UZ'), read: false
  });
  $('#smText').value = '';
  toast('Xabar yuborildi! ✉️');
  updateBadges();
}

/* ─── MESSAGES ─────────────────────────────── */
function getMyMessages() {
  if (!currentUser) return [];
  if (currentUser.role === 'admin') return messages;
  const myId = currentUser.email || currentUser.phone;
  return messages.filter(m => m.to === myId);
}

function updateBadges() {
  const unread = getMyMessages().filter(m => !m.read).length;
  ['adminBadge', 'teacherBadge', 'studentBadge'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = unread;
      el.classList.toggle('show', unread > 0);
    }
  });
  const mc = $('#msgCount');
  if (mc) {
    mc.textContent = unread;
    mc.classList.toggle('show', unread > 0);
  }
}

function openMsgs() {
  openModal('msgsModal');
  const list = $('#msgList');
  const myMsgs = getMyMessages();
  if (myMsgs.length) {
    list.innerHTML = myMsgs.map(m => `
      <div class="msg-item ${m.read ? '' : 'unread'}" data-msg-read="${m.id}">
        <div class="msg-from">${m.from} → ${m.to}</div>
        <div class="msg-text">${m.text}</div>
        <div class="msg-date">${m.date}</div>
      </div>`).join('');
  } else {
    list.innerHTML = '<p style="color:var(--muted);font-size:0.85rem">Xabar yo\'q</p>';
  }
  const ss = $('#msgSendSection');
  if (ss) ss.style.display = currentUser && currentUser.role !== 'admin' ? 'block' : 'none';
  const msgTo = $('#msgTo');
  if (msgTo && currentUser) {
    if (currentUser.role === 'teacher') {
      msgTo.innerHTML = '<option value="admin">👑 Admin</option>' +
        students.filter(s => s.teacher === currentUser.name)
          .map(s => `<option value="${s.phone}">🎓 ${s.name}</option>`).join('');
    } else if (currentUser.role === 'student') {
      const myT = teachers.find(t => t.name === currentUser.teacher);
      msgTo.innerHTML = '<option value="admin">👑 Admin</option>' +
        (myT ? `<option value="${myT.email}">👨‍🏫 ${myT.name}</option>` : '');
    }
  }
  updateBadges();
  bindMsgRead();
}

function sendMsg() {
  const text = $('#msgText').value.trim();
  if (!text) { toast('Xabar yozing!'); return; }
  messages.push({
    id: Date.now(), from: currentUser.name,
    fromId: currentUser.email || currentUser.phone,
    to: $('#msgTo').value,
    text, date: new Date().toLocaleDateString('uz-UZ'), read: false
  });
  $('#msgText').value = '';
  toast('Xabar yuborildi! ✉️');
  closeModal('msgsModal');
  updateBadges();
}

function bindMsgRead() {
  $$('[data-msg-read]').forEach(el => {
    if (el.dataset.bound) return;
    el.dataset.bound = '1';
    el.addEventListener('click', () => {
      const id = +el.dataset.msgRead;
      const m = messages.find(x => x.id === id);
      if (m) {
        m.read = true;
        el.classList.remove('unread');
        updateBadges();
      }
    });
  });
}

/* ══════════════════════════════════════════════
   EVENT DELEGATION (global)
══════════════════════════════════════════════ */
document.addEventListener('click', e => {
  const target = e.target.closest('[data-goto], [data-nav], [data-scroll], [data-theme], [data-logout], [data-art], [data-msgs], [data-tab], [data-modal-close], [data-role]');
  if (!target) {
    // Modal tashqarisiga bosish
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('open');
    }
    return;
  }

  // Modal yopish
  if (target.dataset.modalClose) {
    closeModal(target.dataset.modalClose);
    return;
  }

  // Sahifa almashtirish
  if (target.dataset.goto) {
    goTo(target.dataset.goto);
    return;
  }

  // Scroll
  if (target.dataset.scroll) {
    scrollTo2(target.dataset.scroll);
    return;
  }

  // Nav
  if (target.dataset.nav) {
    nav(target, target.dataset.nav);
    return;
  }

  // Tema
  if (target.hasAttribute('data-theme')) {
    toggleTheme();
    return;
  }

  // Chiqish
  if (target.hasAttribute('data-logout')) {
    logout();
    return;
  }

  // Art modal
  if (target.dataset.art) {
    const [title, cat] = target.dataset.art.split('|');
    showArt(title, cat);
    return;
  }

  // Xabarlar
  if (target.hasAttribute('data-msgs')) {
    openMsgs();
    return;
  }

  // Tab
  if (target.dataset.tab) {
    showTab(target.dataset.tab, target.dataset.tabname, target);
    return;
  }

  // Rol
  if (target.dataset.role) {
    setRole(target.dataset.role);
    return;
  }
});

// Lang tugmalari
document.addEventListener('click', e => {
  const lang = e.target.closest('[data-lang]');
  if (lang) {
    e.preventDefault();
    toast(lang.dataset.lang);
  }
});

/* ─── BOSHLANG'ICH SOZLASH ─────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderMain();
  updateHeader();

  // Login
  const loginBtn = $('#loginBtn');
  if (loginBtn) loginBtn.addEventListener('click', doLogin);

  // Registratsiya
  const regBtn = $('#regBtn');
  if (regBtn) regBtn.addEventListener('click', doReg);

  const showRegLink = $('#showRegLink');
  if (showRegLink) showRegLink.addEventListener('click', e => { e.preventDefault(); showReg(); });

  const showLoginLink = $('#showLoginLink');
  if (showLoginLink) showLoginLink.addEventListener('click', e => { e.preventDefault(); showLogin(); });

  // Xabar yuborish (modal)
  const sendMsgBtn = $('#sendMsgBtn');
  if (sendMsgBtn) sendMsgBtn.addEventListener('click', sendMsg);

  // Enter tugmasi bilan login
  const loginPass = $('#loginPass');
  if (loginPass) loginPass.addEventListener('keydown', e => {
    if (e.key === 'Enter') doLogin();
  });

  // Escape bilan modal yopish
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      $$('.modal.open').forEach(m => m.classList.remove('open'));
    }
  });
});