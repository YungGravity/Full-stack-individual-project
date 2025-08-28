
//Leaderboard data
const leaderboard = [
  {
    rank:1,
    player:'NovaFox', 
    game:'Call of Zombies', 
    score:98740},
  {
    rank:2, 
    player:'ByteKnight', 
    game:'Rift Racers', 
    score:96420},
  {
    rank:3, 
    player:'EchoWisp', 
    game:'Mech Defense', 
    score:94110},
  {
    rank:4, 
    player:'ZenMara', 
    game:'Call of Zombies', 
    score:90250},
  {
    rank:5, 
    player:'ChefCosmo', 
    game:'Operation: Apolo kitchen', 
    score:88990},
];


//Events data
const events = [
  {
    date:'2025-09-05', 
    title:'Call of zombies: no PaP', 
    details:'Try te survive as long as possible with NO Pack a Punch'
  },
  {
    date:'2025-09-12', 
    title:'Escaperoom -T', 
    details:'Escaperoom battle. Every next escaperoom timer gets -5 min'
  },
  {
    date:'2025-10-31', 
    title:'Kitchen survival', 
    details:'Special designed game mode where you need to hide from monsters while cooking'
  },
  {
    date:'2025-09-26', 
    title:'Rift Racers League Finals', 
    details:'Rift Racers finals with live commentary and big screen to follow the race'
  },
];




//Date
function fmtDate(iso){
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined,{weekday:'short', month:'short', day:'numeric'});
}

//Render leaderboards
function renderLeaderboard(elId, rows = leaderboard.slice(0,5)){
  const rowsHtml = rows.map(r => `<tr><td class="text-muted">#${r.rank}</td><td>${r.player}</td><td>${r.game}</td><td class="text-end">${r.score.toLocaleString()}</td></tr>`).join('');
  const table = `<table class="table table-dark table-striped table-hover align-middle">
    <thead><tr><th>#</th><th>Player</th><th>Game</th><th class="text-end">Score</th></tr></thead>
    <tbody>${rowsHtml}</tbody></table>`;
  document.getElementById(elId).innerHTML = table;
}



//Make the events time line and load the leaderboard
if(document.getElementById('eventsTimeline')){
  const tl = document.getElementById('eventsTimeline');
  tl.innerHTML = events.map(e => `<div class="event-item"><div class="small text-neon">${fmtDate(e.date)}</div><div class="fw-semibold text-neon">${e.title}</div><div >${e.details}</div></div>`).join('');
  renderLeaderboard('leaderboardTable', leaderboard);
}

//Load in the games catalogue and added a search filter
const grid = document.getElementById("gameGrid");

function card(game){
  return `<div class="col-sm-6 col-lg-4">
    <div class="card-game h-100">
      <img src="${game.img}" alt="${game.title}" class="w-100" style="height:200px; object-fit:cover">
      <div class="p-3 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h5 class="mb-0 text-neon">${game.title}</h5>
          <span class="badge badge-new">NEW</span>
        </div>
        <p class="small mb-2">${game.desc}</p>
        <div class="mt-auto d-flex justify-content-between align-items-center">
          <div>${game.tags}</div>
          <span class="text-uppercase small text-neon">${game.genre}</span>
        </div>
      </div>
    </div>
  </div>`;
}

function render(list){ 
  grid.innerHTML = list.map(card).join(''); 
}

//Fetching games
fetch("https://full-stack-individual-project-yunggravity-yunggravitys-projects.vercel.app/get/games") // your Python API
  .then(res => res.json())
  .then(data => {
  const games = data.games.map(row => ({
    id: row.id,
    title: row.title,
    genre: row.genre,
    tags: row.tags,
    img: row.img,
    desc: row.description
  }));

   render(games);

  // search & filter logic
    const search = document.getElementById('gameSearch');
    const filter = document.getElementById('gameFilter');
    function apply(){
      const q = (search.value||'').toLowerCase().trim();
      const f = filter.value;
      const out = games.filter(g => 
        (f==='all'||g.genre===f) &&
        (g.title.toLowerCase().includes(q) || g.tags.toLowerCase().includes(q))
      );
      render(out);
    }
    search.addEventListener('input', apply);
    filter.addEventListener('change', apply);
  }).catch(err => console.error("Error fetching games:", err));

//Fake data for booking slots when checked for availability
if(document.getElementById('checkAvailability')){
  const btn = document.getElementById('checkAvailability');
  const dateInput = document.getElementById('bookingDate');
  const results = document.getElementById('slotResults');
  // default date = tomorrow
  const tomorrow = new Date(Date.now()+86400000);
  dateInput.valueAsDate = tomorrow;
  function generateSlots(){
    const hours = [10,11,12,13,14,15,16,17,18,19,20,21];
    return hours.map(h => `${String(h).padStart(2,'0')}:00`);
  }
  btn.addEventListener('click', () => {
    const slots = generateSlots();
    const html = `<div class="row g-2">` + slots.map(t => {
      const available = Math.random() > 0.25; // mock 75% availability
      return `<div class="col-6 col-md-3"><button class="btn w-100 ${available?'btn-outline-light':'btn-secondary'}" ${available?'':'disabled'}>${t}</button></div>`;
    }).join('') + `</div>`;
    results.innerHTML = html + `<div class="text-muted small mt-2">* Availability is illustrative. You will confirm on checkout.</div>`;
  });
}
