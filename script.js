// ============================================================
//  L'Échiquier Royal — Script Complet (Vanilla JS)
//  IA Minimax αβ • Académie • Boutique • Profil • Succès
// ============================================================

/* global Chess */
'use strict';

// ── SVG des pièces ──────────────────────────────────────────
const S={
w:{p:'M22.5 9c-3 0-5.5 2.5-5.5 5.5 0 2.3 1.4 4.2 3.4 5C17.5 21 15.5 24 15.5 28c0 2 3.5 3 3.5 3l-5 3.5c-1.5 1-2 3-2 4.5h21c0-1.5-.5-3.5-2-4.5l-5-3.5s3.5-1 3.5-3c0-4-2-7-4.9-8.5 2-.8 3.4-2.7 3.4-5C28 11.5 25.5 9 22.5 9z',
  r:'M9 39h27v-3H9v3zm3-3h21v-4H12v4zm2-7.5V16.5h17v15H14zm0-13L11 14h23l-3-2.5H14zM11 14v-5h4v2h5V9h5v2h5V9h4v5',n:'M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-12M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.04-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-3 1-3-4 0-2 6-12 6-12s1.89-1.9 2-3.5C14.27 9.506 14.5 8.5 14.5 7.5 15.5 6.5 16.5 10 16.5 10L18.5 10C18.5 10 19.28 8.008 21 7 22 7 22 10 22 10',
  b:'M9 36c3.39-.97 9.11.43 12.5-2 3.39 2.43 9.11 1.03 12.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-9.11.46-12.5-1C19.11 38.96 13.39 37.53 9 38.5c-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2zM15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM22.5 8c1.27 0 2.3 1.03 2.3 2.3 0 1.27-1.03 2.3-2.3 2.3-1.27 0-2.3-1.03-2.3-2.3C20.2 9.03 21.23 8 22.5 8z',
  q:'M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1L25.5 24.5 22.5 10 19.5 24.5l-5.2-14.6L14 25 6.5 13.5zM9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1 2.5-1 2.5-1.5 1.5 0 2.5 0 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-21-1.5-27 0z',
  k:'M22.5 11.63V6M20 8h5M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5M11.5 37C17 40.5 27 40.5 32.5 37l.5-7c0 0 9-4.5 6-10.5-4-6-12.5-3-15 4.5V30v4L11.5 37z'},
b:{p:'M22.5 9c-3 0-5.5 2.5-5.5 5.5 0 2.3 1.4 4.2 3.4 5C17.5 21 15.5 24 15.5 28c0 2 3.5 3 3.5 3l-5 3.5c-1.5 1-2 3-2 4.5h21c0-1.5-.5-3.5-2-4.5l-5-3.5s3.5-1 3.5-3c0-4-2-7-4.9-8.5 2-.8 3.4-2.7 3.4-5C28 11.5 25.5 9 22.5 9z',
  r:'M9 39h27v-3H9v3zm3-3h21v-4H12v4zm2-7.5V16.5h17v15H14zm0-13L11 14h23l-3-2.5H14zM11 14v-5h4v2h5V9h5v2h5V9h4v5',n:'M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-12M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.04-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-3 1-3-4 0-2 6-12 6-12s1.89-1.9 2-3.5C14.27 9.506 14.5 8.5 14.5 7.5 15.5 6.5 16.5 10 16.5 10L18.5 10C18.5 10 19.28 8.008 21 7 22 7 22 10 22 10',
  b:'M9 36c3.39-.97 9.11.43 12.5-2 3.39 2.43 9.11 1.03 12.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-9.11.46-12.5-1C19.11 38.96 13.39 37.53 9 38.5c-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2zM15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM22.5 8c1.27 0 2.3 1.03 2.3 2.3 0 1.27-1.03 2.3-2.3 2.3-1.27 0-2.3-1.03-2.3-2.3C20.2 9.03 21.23 8 22.5 8z',
  q:'M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1L25.5 24.5 22.5 10 19.5 24.5l-5.2-14.6L14 25 6.5 13.5zM9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1 2.5-1 2.5-1.5 1.5 0 2.5 0 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-21-1.5-27 0z',
  k:'M22.5 11.63V6M20 8h5M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5M11.5 37C17 40.5 27 40.5 32.5 37l.5-7c0 0 9-4.5 6-10.5-4-6-12.5-3-15 4.5V30v4L11.5 37z'},
};

// ── Thèmes de pièces (5 jeux colorés) ───────────────────────
const PT=[
 {nm:'Ivoire & Ébène',w:['#FFFDF9','#F3ECE0','#DECFAE'],b:['#3B352F','#221E1B','#12100E'],sw:'#26201A',sb:'#100E0C'},
 {nm:'Or & Onyx',w:['#FFF6DC','#F0D27A','#C9971F'],b:['#3A3A3D','#1C1C1E','#050505'],sw:'#5A430B',sb:'#000000'},
 {nm:'Rubis & Saphir',w:['#FDEEF0','#F2A9B4','#C23A52'],b:['#4C6FD1','#26418F','#101B42'],sw:'#6E1626',sb:'#0A1230'},
 {nm:'Émeraude & Or',w:['#FFFBEF','#F5E3AE','#D8B24A'],b:['#4E9C74','#2C6B4C','#123423'],sw:'#5C4111',sb:'#081C12'},
 {nm:'Marbre Antique',w:['#F5F5F0','#E4E1D6','#C9C4B4'],b:['#6B6E73','#45484D','#232528'],sw:'#4B473C',sb:'#101112'},
];
function gradDefs(i){
  const th=PT[Math.max(0,Math.min(i,PT.length-1))];
  return `<linearGradient id="wg${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${th.w[0]}"/><stop offset="60%" stop-color="${th.w[1]}"/><stop offset="100%" stop-color="${th.w[2]}"/></linearGradient><linearGradient id="bg${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${th.b[0]}"/><stop offset="55%" stop-color="${th.b[1]}"/><stop offset="100%" stop-color="${th.b[2]}"/></linearGradient>`;
}
function pSVGP(t,c,i){
  const i2=Math.max(0,Math.min(i|0,PT.length-1)),th=PT[i2];
  const f=c==='w'?`url(#wg${i2})`:`url(#bg${i2})`,sk=c==='w'?th.sw:th.sb;
  return `<svg viewBox="0 0 45 45" class="psvg"><defs>${gradDefs(i2)}</defs><g fill="${f}" stroke="${sk}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${S[c][t]}"/></g></svg>`;
}
function pSVG(t,c){return pSVGP(t,c,P.pt||0)}

// ── Notation française ──────────────────────────────────────
const FRENCH={N:'C',B:'F',R:'T',Q:'D',K:'R'};
function toFR(s){if(!s||s.startsWith('O-O'))return s;let r=s;if(FRENCH[r[0]])r=FRENCH[r[0]]+r.slice(1);return r.replace(/=([NBRQK])/g,(_,p)=>'='+(FRENCH[p]||p))}

// ── Tables PST & évaluation ─────────────────────────────────
const PST={p:[[0,0,0,0,0,0,0,0],[50,50,50,50,50,50,50,50],[10,10,20,30,30,20,10,10],[5,5,10,25,25,10,5,5],[0,0,0,20,20,0,0,0],[5,-5,-10,0,0,-10,-5,5],[5,10,10,-20,-20,10,10,5],[0,0,0,0,0,0,0,0]],n:[[-50,-40,-30,-30,-30,-30,-40,-50],[-40,-20,0,0,0,0,-20,-40],[-30,0,10,15,15,10,0,-30],[-30,5,15,20,20,15,5,-30],[-30,0,15,20,20,15,0,-30],[-30,5,10,15,15,10,5,-30],[-40,-20,0,5,5,0,-20,-40],[-50,-40,-30,-30,-30,-30,-40,-50]],b:[[-20,-10,-10,-10,-10,-10,-10,-20],[-10,0,0,0,0,0,0,-10],[-10,0,5,10,10,5,0,-10],[-10,5,5,10,10,5,5,-10],[-10,0,10,10,10,10,0,-10],[-10,10,10,10,10,10,10,-10],[-10,5,0,0,0,0,5,-10],[-20,-10,-10,-10,-10,-10,-10,-20]],r:[[0,0,0,0,0,0,0,0],[5,10,10,10,10,10,10,5],[-5,0,0,0,0,0,0,-5],[-5,0,0,0,0,0,0,-5],[-5,0,0,0,0,0,0,-5],[-5,0,0,0,0,0,0,-5],[-5,0,0,0,0,0,0,-5],[0,0,0,5,5,0,0,0]],q:[[-20,-10,-10,-5,-5,-10,-10,-20],[-10,0,0,0,0,0,0,-10],[-10,0,5,5,5,5,0,-10],[-5,0,5,5,5,5,0,-5],[0,0,5,5,5,5,0,-5],[-10,5,5,5,5,5,0,-10],[-10,0,5,0,0,0,0,-10],[-20,-10,-10,-5,-5,-10,-10,-20]],k:[[-30,-40,-40,-50,-50,-40,-40,-30],[-30,-40,-40,-50,-50,-40,-40,-30],[-30,-40,-40,-50,-50,-40,-40,-30],[-30,-40,-40,-50,-50,-40,-40,-30],[-20,-30,-30,-40,-40,-30,-30,-20],[-10,-20,-20,-20,-20,-20,-20,-10],[20,20,0,0,0,0,20,20],[20,30,10,0,0,10,30,20]]};
const VAL={p:100,n:320,b:330,r:500,q:900,k:20000};

function ev(c){
  if(c.in_checkmate())return c.turn()==='w'?-99999:99999;
  if(c.in_draw()||c.in_stalemate()||c.in_threefold_repetition())return 0;
  let s=0;const b=c.board();
  for(let r=0;r<8;r++)for(let f=0;f<8;f++){const p=b[r][f];if(!p)continue;const v=VAL[p.type]+(p.color==='w'?PST[p.type][r][f]:PST[p.type][7-r][f]);s+=p.color==='w'?v:-v;}
  if(c.in_check())s+=c.turn()==='w'?-25:25;
  return s;
}

// ── IA Minimax Alpha-Beta ───────────────────────────────────
function bestMove(fen,d,bl){
  const c=new Chess(fen),ms=c.moves({verbose:true});
  if(!ms.length)return null;
  if(Math.random()<bl&&ms.length>1)return ms[Math.random()*ms.length|0];
  function mm(ch,d,a,b,mx){
    if(d===0||ch.game_over())return ev(ch);
    const ms=ch.moves({verbose:true}).sort((x,y)=>{let a=0,bb=0;if(x.captured)a+=10*VAL[x.captured]-VAL[x.piece];if(x.promotion)a+=800;if(y.captured)bb+=10*VAL[y.captured]-VAL[y.piece];if(y.promotion)bb+=800;return bb-a;});
    if(mx){let m=-Infinity;for(const mv of ms){ch.move(mv);const v=mm(ch,d-1,a,b,false);ch.undo();m=Math.max(m,v);a=Math.max(a,v);if(b<=a)break;}return m;}
    else{let m=Infinity;for(const mv of ms){ch.move(mv);const v=mm(ch,d-1,a,b,true);ch.undo();m=Math.min(m,v);b=Math.min(b,v);if(b<=a)break;}return m;}
  }
  const w=c.turn()==='w';let bm=ms[0],bv=w?-Infinity:Infinity;
  for(const m of ms){c.move(m);const v=mm(c,d-1,-Infinity,Infinity,!w)+(Math.random()-.5)*12;c.undo();if(w?v>bv:v<bv){bv=v;bm=m;}}
  return bm;
}

// ── Niveaux IA ──────────────────────────────────────────────
const AI=[
  {id:'nov',n:'Petit Pion',t:'Le Novice Étourdi',elo:500,d:1,bl:.48,bc:'#6B7280'},
  {id:'deb',n:'Gaspard',t:"L'Apprenti du Café",elo:800,d:1,bl:.30,bc:'#2E8B57'},
  {id:'am',n:'Camille',t:"L'Amateur Passionnée",elo:1050,d:2,bl:.20,bc:'#22A699'},
  {id:'int',n:'Éléonore',t:'La Stratège de Club',elo:1300,d:2,bl:.11,bc:'#3B82F6'},
  {id:'cf',n:'Thibault',t:'Le Joueur Confirmé',elo:1550,d:2,bl:.06,bc:'#6366F1'},
  {id:'av',n:'Henri de Valois',t:'Le Maître Tactique',elo:1800,d:3,bl:.025,bc:'#D97706'},
  {id:'ex',n:'Isabella Rossi',t:"L'Experte Positionnelle",elo:2050,d:3,bl:.01,bc:'#E85D75'},
  {id:'gm',n:"L'Automate Royal",t:'Grand Maître du Salon',elo:2300,d:3,bl:0,bc:'#D4AF37'},
  {id:'lg',n:'Le Spectre de Caïssa',t:'Légende Immortelle',elo:2600,d:3,bl:0,bc:'#A855F7'},
];

// ── Audio Web Audio API ─────────────────────────────────────
const Au={ctx:null,on:true,
  _g(){if(!this.on)return null;if(typeof AudioContext==='undefined')return null;if(!this.ctx)this.ctx=new AudioContext;if(this.ctx.state==='suspended')this.ctx.resume();return this.ctx},
  _t(f,d,tp,v){const c=this._g();if(!c)return;const o=c.createOscillator(),g=c.createGain();o.type=tp||'triangle';o.frequency.setValueAtTime(f,c.currentTime);o.frequency.exponentialRampToValueAtTime(f*.4,c.currentTime+d);g.gain.setValueAtTime(v||.25,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+d);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+d)},
  move(){this._t(145,.065,'triangle',.28)},capture(){this._t(190,.09,'sawtooth',.32)},check(){this._t(587,.28,'sine',.22)},
  castle(){this.move();setTimeout(()=>this.move(),90)},success(){[523,659,784,1047].forEach((f,i)=>setTimeout(()=>this._t(f,.38,'triangle',.18),i*85))},
  error(){this._t(160,.22,'sawtooth',.16)},
};

function vib(ms){try{navigator.vibrate(ms||8)}catch(e){}}

// ── Persistance ─────────────────────────────────────────────
function ld(k,d){try{const r=localStorage.getItem(k);return r?JSON.parse(r):d}catch(e){return d}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
let P=ld('er2_p',{name:'Maître du Salon',avI:0,tiI:0,bt:'bois',pt:0,coins:50,tc:50,elo:0,worldElo:1200,worldStats:{wins:0,losses:0,draws:0,games:0},owned:['b0','a0','t0','pt0'],ach:[],trophies:[],st:{},lg:0,streak:0,bestS:0,hist:[],ld:null,bestPuzzleStreak:0,puzzleStreak:0,totalPuzzlesSolved:0,totalLessonsDone:0,bestElo:0,fastLaunches:0});
let PL=ld('er2_l',[]),PP=ld('er2_pp',[]),TE=ld('er2_te',1200),tutS=!!ld('er2_tut',false);
if(!P.owned)P.owned=['b0','a0','t0','pt0'];
['b0','a0','t0','pt0'].forEach(x=>{if(!P.owned.includes(x))P.owned.push(x)});
if(!P.trophies)P.trophies=[];
if(P.elo===undefined)P.elo=0;
if(P.pt===undefined)P.pt=0;
// Migration non destructive : les anciennes sauvegardes gardent leur ELO Solo et leurs statistiques.
if(typeof P.worldElo!=='number'||!Number.isFinite(P.worldElo))P.worldElo=1200;
P.worldStats={wins:0,losses:0,draws:0,games:0,...(P.worldStats&&typeof P.worldStats==='object'&&!Array.isArray(P.worldStats)?P.worldStats:{})};
['wins','losses','draws','games'].forEach(k=>{
  if(typeof P.worldStats[k]!=='number'||!Number.isFinite(P.worldStats[k]))P.worldStats[k]=0;
});
function svA(){sv('er2_p',P);sv('er2_l',PL);sv('er2_pp',PP);sv('er2_te',TE);sv('er2_tut',tutS);}

// ── Compte en ligne (Supabase — Étape 1 : Auth + Profil) ─────
// Règles de cette étape :
//  • Clé publique "anon" uniquement (jamais la service_role côté client).
//  • Aucun matchmaking, aucune partie en ligne, aucun classement.
//  • L'ELO Solo (P.elo) reste 100 % local et n'est jamais envoyé.
//  • Le profil Supabase deviendra plus tard la source officielle de l'ELO mondial.
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

const SB={
  client:null,        // instance supabase-js
  user:null,          // utilisateur connecté (auth.users)
  profile:null,       // ligne de la table `profiles`
  busy:false,         // opération réseau en cours
  err:'',             // dernier message d'erreur à afficher
  lb:[],              // liste publique du classement mondial
  lbLoading:false,    // chargement du classement en cours
  lbLoaded:false,     // classement déjà chargé au moins une fois
  lbErr:'',           // erreur éventuelle du classement
  configured(){return !!(window.SUPABASE_URL&&window.SUPABASE_ANON&&window.supabase);},
  init(){
    if(!this.configured())return false;
    try{this.client=window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_ANON);}
    catch(e){console.warn('Supabase init',e);return false;}
    // Restaure la session existante puis écoute les changements (connexion/déconnexion).
    this.client.auth.getSession().then(({data})=>this._onSession(data?.session||null));
    this.client.auth.onAuthStateChange((_ev,session)=>this._onSession(session));
    return true;
  },
  async _onSession(session){
    this.user=session?.user||null;
    this.profile=null;
    if(this.user){
      await this.ensureProfile();
      if(this.profile){
        if(typeof this.profile.world_elo==='number')P.worldElo=this.profile.world_elo;
        P.worldStats={
          wins:this.profile.world_wins||0,
          losses:this.profile.world_losses||0,
          draws:this.profile.world_draws||0,
          games:this.profile.world_games||0
        };
        svA();
      }
    }
    if(G.tab==='world'||this.lbLoaded){this.fetchLeaderboard();}
    render();
  },
  // Crée le profil s'il n'existe pas encore, puis le charge.
  async ensureProfile(){
    if(!this.client||!this.user)return null;
    const {data,error}=await this.client.from('profiles').select('*').eq('id',this.user.id).maybeSingle();
    if(error){console.warn('profiles select',error);this.err=error.message;return null;}
    if(data){this.profile=data;return data;}
    const fresh={id:this.user.id,username:P.name||'Maître du Salon',avatar_idx:P.avI||0,world_elo:1200,world_wins:0,world_losses:0,world_draws:0,world_games:0};
    const ins=await this.client.from('profiles').insert(fresh).select('*').maybeSingle();
    if(ins.error){console.warn('profiles insert',ins.error);this.err=ins.error.message;return null;}
    this.profile=ins.data||fresh;return this.profile;
  },
  // Synchronise pseudo + avatar local vers le profil en ligne (jamais l'ELO Solo).
  async pushCosmetics(){
    if(!this.client||!this.user)return;
    const {error}=await this.client.from('profiles').update({username:P.name,avatar_idx:P.avI||0}).eq('id',this.user.id);
    if(error){console.warn('profiles update',error);return;}
    if(this.profile){this.profile.username=P.name;this.profile.avatar_idx=P.avI||0;}
    if(this.lbLoaded)this.fetchLeaderboard();
  },
  // Récupère le classement mondial par world_elo décroissant (lecture seule).
  async fetchLeaderboard(limit=100){
    if(!this.configured()){this.lbErr='Supabase non configuré.';render();return[];}
    if(!this.client){this.init();}
    if(!this.client){this.lbErr='Client Supabase indisponible.';render();return[];}
    this.lbLoading=true;this.lbErr='';render();
    try{
      const {data,error}=await this.client
        .from('profiles')
        .select('id,username,avatar_idx,world_elo,world_wins,world_losses,world_draws,world_games')
        .order('world_elo',{ascending:false})
        .order('world_wins',{ascending:false})
        .order('created_at',{ascending:true})
        .limit(limit);
      this.lbLoading=false;
      if(error){
        console.warn('leaderboard select',error);
        this.lbErr=error.message||'Impossible de récupérer le classement.';
        render();return[];
      }
      this.lb=Array.isArray(data)?data:[];
      this.lbLoaded=true;
      render();
      return this.lb;
    }catch(e){
      this.lbLoading=false;
      this.lbErr=(e&&e.message)||'Erreur réseau lors du chargement.';
      render();
      return[];
    }
  },
  async signUp(email,pass,username){
    this.busy=true;this.err='';render();
    const {data,error}=await this.client.auth.signUp({email,password:pass,options:{data:{username}}});
    this.busy=false;
    if(error){this.err=error.message;render();return false;}
    if(username)P.name=username;svA();
    // Si la confirmation e-mail est activée, la session est nulle jusqu'à validation.
    if(!data.session){toast('📧','Vérifiez vos e-mails','Confirmez votre adresse pour activer le compte.');render();return true;}
    toast('✅','Compte créé','Bienvenue au Salon !');return true;
  },
  async signIn(email,pass){
    this.busy=true;this.err='';render();
    const {error}=await this.client.auth.signInWithPassword({email,password:pass});
    this.busy=false;
    if(error){this.err=error.message;render();return false;}
    toast('🔐','Connecté','Profil en ligne chargé.');return true;
  },
  async signOut(){
    if(!this.client)return;
    await this.client.auth.signOut();
    this.user=null;this.profile=null;toast('👋','Déconnecté','À bientôt !');render();
  },
};

// Bloc "Compte" affiché dans le Profil (design existant : cartes .cd, boutons .btn).
function rAccount(){
  if(!SB.configured())return`<div class="cd"><div class="fb mb2"><span class="bold sm">🌐 Compte en ligne</span><span class="bg2 bg-r">Non configuré</span></div><div class="inline-note">Renseignez <code>SUPABASE_URL</code> et <code>SUPABASE_ANON</code> dans <code>index.html</code> pour activer la création de compte et le Classement Mondial. L'ELO Solo et le Duel Local fonctionnent sans compte.</div></div>`;
  if(SB.user){
    const pr=SB.profile;
    return`<div class="cd"><div class="fb mb2"><span class="bold sm">🌐 Compte en ligne</span><span class="bg2 bg-n">Connecté</span></div>
    <div class="xs tm">${esc(SB.user.email||'')}</div>
    ${pr?`<div class="kpi-row mt2"><div class="kpi"><div class="v tg">${pr.world_elo}</div><div class="l">ELO mondial (profil)</div></div><div class="kpi"><div class="v">${pr.world_games}</div><div class="l">Parties classées</div></div><div class="kpi"><div class="v tgn">${pr.world_wins}</div><div class="l">Victoires</div></div></div>`:`<div class="inline-note mt2">Chargement du profil…</div>`}
    <div class="inline-note mt2">Votre ELO Solo reste local (contre les IA). L'ELO Mondial est dédié au classement en ligne.</div>
    <button class="btn btn-g btn-f btn-s mt2" onclick="openWorld()">🌍 Voir le Classement Mondial</button>
    <div class="g2 mt2"><button class="btn btn-d btn-s" onclick="SB.pushCosmetics().then(()=>toast('☁️','Profil synchronisé','Pseudo et avatar mis à jour.'))">☁️ Synchroniser pseudo/avatar</button><button class="btn btn-d btn-s" onclick="SB.signOut()">Se déconnecter</button></div></div>`;
  }
  return`<div class="cd"><div class="fb mb2"><span class="bold sm">🌐 Compte en ligne</span><span class="bg2 bg-g">Hors ligne</span></div>
  <div class="inline-note">Créez un compte pour apparaître dans le Classement Mondial (1200 ELO au départ). Vos données locales sont conservées.</div>
  <div class="g2 mt2"><button class="btn btn-g btn-s" onclick="openAuth('in')">Se connecter</button><button class="btn btn-d btn-s" onclick="openAuth('up')">Créer un compte</button></div>
  <button class="btn btn-d btn-f btn-s mt2" onclick="openWorld()">🌍 Consulter le Classement Mondial</button></div>`;
}

// Feuille d'authentification (email + mot de passe), réutilise .ov / .pr-b existants.
function openAuth(mode){
  const up=mode==='up';
  const ov=document.createElement('div');ov.className='ov c';ov.id='auth-ov';
  ov.innerHTML=`<div class="pr-b" style="padding:20px;max-width:360px;width:100%;text-align:left">
    <h4 class="font-serif lg mb2" style="font-family:'Cormorant Garamond',serif">${up?'Créer un compte':'Se connecter'}</h4>
    ${up?`<label class="xs tm">Pseudo</label><input type="text" id="au-name" value="${P.name}" maxlength="28" style="width:100%;margin:4px 0 8px">`:''}
    <label class="xs tm">E-mail</label><input type="email" id="au-email" autocomplete="email" style="width:100%;margin:4px 0 8px">
    <label class="xs tm">Mot de passe</label><input type="password" id="au-pass" autocomplete="${up?'new-password':'current-password'}" minlength="6" style="width:100%;margin:4px 0 8px">
    <div id="au-err" class="xs tr" style="min-height:14px">${SB.err||''}</div>
    <button class="btn btn-g btn-f mt2" id="au-go" onclick="submitAuth(${up})">${up?'Créer mon compte':'Connexion'}</button>
    <button class="btn btn-d btn-f mt2" onclick="document.getElementById('auth-ov').remove()">Annuler</button>
    <div class="inline-note mt2">${up?'6 caractères minimum. Un e-mail de confirmation peut être requis.':'Pas encore de compte ? <a href="#" onclick="document.getElementById(\'auth-ov\').remove();openAuth(\'up\');return false" style="color:var(--gold)">Créer un compte</a>'}</div>
  </div>`;
  ov.addEventListener('click',e=>{if(e.target===ov)ov.remove();});
  document.body.appendChild(ov);setTimeout(()=>document.getElementById(up?'au-name':'au-email')?.focus(),80);
}
async function submitAuth(up){
  const email=(document.getElementById('au-email')?.value||'').trim();
  const pass=document.getElementById('au-pass')?.value||'';
  const name=(document.getElementById('au-name')?.value||'').trim();
  const err=document.getElementById('au-err'),go=document.getElementById('au-go');
  if(!email||pass.length<6){if(err)err.textContent='E-mail valide et mot de passe de 6 caractères minimum requis.';return;}
  if(go){go.disabled=true;go.textContent='Patientez…';}
  const ok=up?await SB.signUp(email,pass,name):await SB.signIn(email,pass);
  if(ok){document.getElementById('auth-ov')?.remove();}
  else{if(err)err.textContent=SB.err||'Erreur inconnue.';if(go){go.disabled=false;go.textContent=up?'Créer mon compte':'Connexion';}}
}

// ── Données Leçons ──────────────────────────────────────────
const LESSONS=[
{id:'ou',title:'Les 3 Règles d\'Or',cat:'Fondamentaux',lv:'Débutant',
 steps:[
  {t:'1. Occuper le centre',i:'Jouez e4 pour contrôler d5 et f5.',n:'Le coup le plus joué de l\'histoire.',fen:'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',f:'e2',to:'e4',opp:{f:'e7',to:'e5'}},
  {t:'2. Développer le Cavalier',i:'Cf3 attaque le pion e5.',n:'Prépare le roque et contrôle le centre.',fen:'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',f:'g1',to:'f3',opp:{f:'b8',to:'c6'}},
  {t:'3. Fou en c4',i:'Développez Fc4, visant f7.',n:'La diagonale a2-g8 est mortelle.',fen:'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',f:'f1',to:'c4',opp:{f:'f8',to:'c5'}},
  {t:'4. Petit Roque',i:'O-O pour mettre le Roi à l\'abri.',n:'Roi en sécurité + Tour activée !',fen:'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',f:'e1',to:'g1'},
 ]},
{id:'it',title:'Partie Italienne',cat:'Ouvertures',lv:'Intermédiaire',
 steps:[
  {t:'1. Fc4',i:'Placez le Fou en c4.',n:'Contrôle la diagonale a2-g8.',fen:'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',f:'f1',to:'c4',opp:{f:'f8',to:'c5'}},
  {t:'2. c3',i:'Préparez d4 avec c3.',n:'Le duo e4-d4 sera royal.',fen:'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',f:'c2',to:'c3',opp:{f:'g8',to:'f6'}},
  {t:'3. d4 !',i:'Poussez d4.',n:'L\'initiative centrale !',fen:'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5',f:'d2',to:'d4',opp:{f:'e5',to:'d4'}},
  {t:'4. cxd4',i:'Reprenez cxd4.',n:'Pions e4+d4 = centre parfait !',fen:'r1bqk2r/pppp1ppp/2n2n2/2b5/2BpP3/2P2N2/PP3PPP/RNBQK2R w KQkq - 0 6',f:'c3',to:'d4'},
 ]},
{id:'sc',title:'Défense Sicilienne',cat:'Ouvertures',lv:'Intermédiaire',
 steps:[
  {t:'1...c5',i:'Répondez c5 à 1.e4.',n:'Déséquilibre immédiat.',fen:'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',f:'c7',to:'c5',opp:{f:'g1',to:'f3'}},
  {t:'2...d6',i:'Consolidez avec d6.',n:'Prépare Najdorf.',fen:'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',f:'d7',to:'d6',opp:{f:'d2',to:'d4'}},
  {t:'3...cxd4',i:'Échangez le pion central.',n:'Pion c contre pion d.',fen:'rnbqkbnr/pp2pppp/3p4/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3',f:'c5',to:'d4',opp:{f:'f3',to:'d4'}},
  {t:'4...Cf6',i:'Attaquez e4.',n:'Prépare le roque.',fen:'rnbqkbnr/pp2pppp/3p4/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4',f:'g8',to:'f6'},
 ]},
{id:'me',title:'Mat de l\'Escalier',cat:'Finales',lv:'Débutant',
 steps:[
  {t:'1. Tb7+',i:'Coupez le Roi.',n:'Une Tour coupe, l\'autre mate.',fen:'8/4k3/R7/1R6/8/8/8/4K3 w - - 0 1',f:'b5',to:'b7',opp:{f:'e7',to:'d8'}},
  {t:'2. Ta8#',i:'Terminez !',n:'Bravo, mat sur la 8e !',fen:'3k4/1R6/R7/8/8/8/8/4K3 w - - 2 2',f:'a6',to:'a8'},
 ]},
];

// ── Données Puzzles ─────────────────────────────────────────
const PUZZLES=[
{id:'p1',title:'Mat du Couloir',th:'Mat',elo:800,d:'Débutant',ori:'w',fen:'6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',obj:'Mat en 1 coup.',hint:'Le Roi noir est bloqué par ses pions.',expl:'Td8# !',st:[{f:'d1',t:'d8'}]},
{id:'p2',title:'Mat Arabe',th:'Mat',elo:900,d:'Débutant',ori:'w',fen:'7k/1R6/5N2/8/8/8/6PP/6K1 w - - 0 1',obj:'Mat en 1 coup.',hint:'Le Cavalier f6 protège g8.',expl:'Th7# !',st:[{f:'b7',t:'h7'}]},
{id:'p3',title:'Baiser de la Mort',th:'Mat Dame',elo:1000,d:'Débutant',ori:'w',fen:'6k1/5p1p/6pQ/6N1/8/8/5PPP/6K1 w - - 0 1',obj:'Mat en 1 coup.',hint:'Dg7#, soutenue par Cf5.',expl:'Dg7# !',st:[{f:'h6',t:'g7'}]},
{id:'p4',title:'Fourchette Royale',th:'Fourchette',elo:1100,d:'Intermédiaire',ori:'w',fen:'r3k2r/ppp2ppp/8/3N4/8/8/PPP2PPP/4K3 w kq - 0 1',obj:'Gagnez la Tour.',hint:'Cc7+ attaque Roi + Tour.',expl:'Cc7+ Rd7 2.Cxa8 !',st:[{f:'d5',t:'c7'},{opp:{f:'e8',to:'d7'}},{f:'c7',t:'a8'}]},
{id:'p5',title:'Clouage',th:'Clouage',elo:1200,d:'Intermédiaire',ori:'w',fen:'4k3/8/3q4/8/1B6/8/8/4R1K1 w - - 0 1',obj:'Gagnez la Dame.',hint:'La Dame et le Roi sont alignés.',expl:'Fxd6+ ! Dame gagnée.',st:[{f:'b4',t:'d6'}]},
{id:'p6',title:'Sacrifice & Mat',th:'Déviation',elo:1400,d:'Intermédiaire',ori:'w',fen:'3r2k1/5ppp/8/8/8/8/5PPP/1Q1R2K1 w - - 0 1',obj:'Mat en 2 coups.',hint:'La Tour d8 défend. Déviation !',expl:'1.Db8+ Txb8 2.Td8# !',st:[{f:'b1',t:'b8'},{opp:{f:'d8',to:'b8'}},{f:'d1',t:'d8'}]},
{id:'p7',title:'Étouffée de Philidor',th:'Philidor',elo:1700,d:'Avancé',ori:'w',fen:'5r1k/6pp/8/4N3/8/2Q5/6PP/6K1 w - - 0 1',obj:'Mat en 2 coups.',hint:'Sacrifiez la Dame en g8 !',expl:'1.Dg8+ Txg8 2.Cf7# !',st:[{f:'c3',t:'g8'},{opp:{f:'f8',to:'g8'}},{f:'e5',t:'f7'}]},
{id:'p8',title:'Mat de l\'Opéra (1858)',th:'Historique',elo:1700,d:'Avancé',ori:'w',fen:'4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16',obj:'Mat en 2 coups.',hint:'Sacrifiez Db8 !',expl:'1.Db8+ Cxb8 2.Td8# !',st:[{f:'b3',t:'b8'},{opp:{f:'d7',to:'b8'}},{f:'d1',t:'d8'}]},
{id:'p9',title:'Mat des Épaulettes',th:'Mat',elo:1400,d:'Intermédiaire',ori:'w',fen:'3rkr2/8/6Q1/8/8/8/6PP/6K1 w - - 0 1',obj:'Mat en 1 coup.',hint:'Les Tours bloquent leur propre Roi.',expl:'De6# !',st:[{f:'g6',t:'e6'}]},
{id:'p10',title:'Mat de Boden',th:'Deux Fous',elo:1800,d:'Expert',ori:'w',fen:'2kr3r/pp1n1ppp/2p1p3/8/1b2P3/2N1B3/PPPQ1PPP/1K1R1B1R w - - 0 1',obj:'Mat en 2 coups.',hint:'Sacrifiez la Dame en c6 !',expl:'1.Dxc6+ bxc6 2.Fa6# !',st:[{f:'d2',t:'c6'},{opp:{f:'b7',to:'c6'}},{f:'f1',t:'a6'}]},
{id:'p11',title:'Enfilade Tour',th:'Enfilade',elo:1250,d:'Intermédiaire',ori:'w',fen:'8/2k5/8/8/8/8/2q5/R5K1 w - - 0 1',obj:'Gagnez la Dame.',hint:'Roi et Dame alignés sur colonne c.',expl:'1.Tc1+ Rd6 2.Txc3 !',st:[{f:'a1',t:'c1'},{opp:{f:'c7',to:'d6'}},{f:'c1',t:'c3'}]},
{id:'p12',title:'Centre Dynamique',th:'Attaque',elo:1500,d:'Avancé',ori:'w',fen:'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 w - - 0 1',obj:'Gagnez un Fou.',hint:'d4 ouvre la position.',expl:'1.d4 exd4 2.Cxd4 Fxd4 3.Dxd4 !',st:[{f:'d3',t:'d4'},{opp:{f:'e5',to:'d4'}},{f:'f3',t:'d4'},{opp:{f:'c5',to:'d4'}},{f:'d1',t:'d4'}]},
];

// ── Succès ──────────────────────────────────────────────────
const ACHS=[
 {id:'fw',nm:'Première Victoire',ds:'Battez l\'IA.',cn:25,ic:'🏆',fn:()=>P.st.wins>0},
 {id:'pz1',nm:'Œil de Faucon',ds:'Résolvez 1 puzzle.',cn:10,ic:'🧩',fn:()=>PP.length>=1},
 {id:'pz5',nm:'Tacticien Sérieux',ds:'Résolvez 5 puzzles.',cn:20,ic:'✨',fn:()=>PP.length>=5},
 {id:'pz12',nm:'Machine Tactique',ds:'Résolvez tous les puzzles.',cn:70,ic:'⚡',fn:()=>PP.length>=PUZZLES.length},
 {id:'ls1',nm:'Premiers Pas',ds:'Terminez 1 leçon.',cn:10,ic:'📖',fn:()=>PL.length>=1},
 {id:'ls4',nm:'Érudit',ds:'Toutes les leçons.',cn:50,ic:'🎓',fn:()=>PL.length>=LESSONS.length},
 {id:'st3',nm:'Série de 3',ds:'3 victoires d\'affilée.',cn:30,ic:'🔥',fn:()=>P.bestS>=3},
 {id:'st5',nm:'Main Brûlante',ds:'5 victoires d\'affilée.',cn:60,ic:'🔥',fn:()=>P.bestS>=5},
 {id:'e14',nm:'Force Montante',ds:'1400 ELO.',cn:40,ic:'📈',fn:()=>P.elo>=1400},
 {id:'e18',nm:'Maître Reconnu',ds:'1800 ELO.',cn:80,ic:'👑',fn:()=>P.elo>=1800},
 {id:'e22',nm:'Élite du Salon',ds:'2200 ELO.',cn:120,ic:'💎',fn:()=>P.elo>=2200},
 {id:'coin500',nm:'Collectionneur',ds:'Accumulez 500 Couronnes au total.',cn:50,ic:'🪙',fn:()=>P.tc>=500},
];

// ── Route des Trophées (paliers ELO récompensés) ────────────
const TROPHIES=[
 {elo:150, nm:'Pion de Bronze',cn:25,ic:'🥉',ds:'Premiers pas sur l\'échiquier.'},
 {elo:350, nm:'Cavalier d\'Argent',cn:35,ic:'🥈',ds:'Les premières combinaisons s\'ouvrent à vous.'},
 {elo:600, nm:'Écu d\'Or',cn:50,ic:'🥇',ds:'Votre style prend forme.'},
 {elo:900, nm:'Lion du Salon',cn:70,ic:'🦁',ds:'Les adversaires redoutent votre attaque.'},
 {elo:1250,nm:'Comte des Échecs',cn:90,ic:'🛡️',ds:'Un joueur que le club prend au sérieux.'},
 {elo:1650,nm:'Prince Tactique',cn:120,ic:'🐺',ds:'Vos attaques sont devenues des chasses.'},
 {elo:2100,nm:'Roi du Mat',cn:160,ic:'👑',ds:'Le trône du Salon vous attend.'},
 {elo:2600,nm:'Immortel de Caïssa',cn:250,ic:'🐉',ds:'Seuls les légendes atteignent ce sommet.'},
];
function checkTrophies(){
  let got=false;
  TROPHIES.forEach(t=>{
    if(!P.trophies.includes(t.elo)&&P.elo>=t.elo){
      P.trophies.push(t.elo);got=true;
      P.coins+=t.cn;P.tc+=t.cn;
      toast(t.ic,`Trophée : ${t.nm}`,`+${t.cn} Couronnes !`);
    }
  });
  return got;
}

// ── Boutique ────────────────────────────────────────────────
const SHOP=[
 // Échiquiers
 {id:'b0',cat:'board',nm:'Acajou & Érable',p:0,th:'bois',ds:'Le bois noble des salons de 1800. Simple, chaleureux, intemporel.'},
 {id:'b1',cat:'board',nm:'Émeraude de Tournoi',p:120,th:'emeraude',ds:'La teinte officielle des championnats : vert profond et blanc cassé.'},
 {id:'b2',cat:'board',nm:'Obsidienne & Vermeil',p:150,th:'obsidienne',ds:'Pierre volcanique taillée main, pour les parties nocturnes.'},
 {id:'b3',cat:'board',nm:'Marbre de Carrare',p:200,th:'marbre',ds:'Le marbre des palais italiens, poli à la pierre.'},
 {id:'b4',cat:'board',nm:'Voûte Céleste',p:280,th:'cosmos',ds:'Jouez sous une voûte d\'étoiles, case après case.'},
 {id:'b5',cat:'board',nm:'Récif de Corail',p:200,th:'corail',ds:'Ambiance tropicale, teintes de sable et de corail rose.'},
 // Jeux de pièces (thèmes de couleurs fonctionnels sur l'échiquier)
 {id:'pt0',cat:'piece',nm:'Ivoire & Ébène',p:0,pidx:0,ds:'Les pièces traditionnelles en buis et palissandre.'},
 {id:'pt1',cat:'piece',nm:'Or & Onyx',p:150,pidx:1,ds:'Or ciselé pour les Blancs, onyx poli pour les Noirs. Le luxe absolu.'},
 {id:'pt2',cat:'piece',nm:'Rubis & Saphir',p:180,pidx:2,ds:'Géme rubis pour les Blancs, saphir royal pour les Noirs.'},
 {id:'pt3',cat:'piece',nm:'Émeraude & Or',p:200,pidx:3,ds:'Or antique pour les Blancs, émeraude impériale pour les Noirs.'},
 {id:'pt4',cat:'piece',nm:'Marbre Antique',p:160,pidx:4,ds:'Blanc de Paros et gris de lave, style Grèce Antique.'},
 // Avatars
 {id:'a0',cat:'avatar',nm:'La Couronne',p:0,em:'👑',bg:'#D4AF37',bg2:'#8A6D1B',ds:'Symbole intemporel de la royauté échiquéenne.'},
 {id:'a1',cat:'avatar',nm:'La Tour',p:60,em:'🏰',bg:'#6B7280',bg2:'#374151',ds:'Solide et inébranlable comme une forteresse.'},
 {id:'a2',cat:'avatar',nm:'Le Duelliste',p:80,em:'⚔️',bg:'#DC2626',bg2:'#7F1D1D',ds:'Prêt pour tous les combats tactiques.'},
 {id:'a3',cat:'avatar',nm:'L\'Étoile',p:100,em:'⭐',bg:'#F59E0B',bg2:'#B45309',ds:'Un talent prometteur qui commence à briller.'},
 {id:'a4',cat:'avatar',nm:'Le Spectre',p:200,em:'💀',bg:'#8B5CF6',bg2:'#4C1D95',ds:'Réservé aux plus grands esprits tactiques.'},
 {id:'a5',cat:'avatar',nm:'Le Sage',p:140,em:'🦉',bg:'#2563EB',bg2:'#1E3A8A',ds:'Patience et clairvoyance du vieux maître.'},
 {id:'a6',cat:'avatar',nm:'Le Joyau',p:180,em:'💎',bg:'#0EA5E9',bg2:'#0E7490',ds:'Rare, précieux, facetté de stratégies.'},
 // Titres
 {id:'t0',cat:'title',nm:'Novice du Salon',p:0,ds:'Le titre de tout apprenti échiquéen.'},
 {id:'t1',cat:'title',nm:'Stratège Émérite',p:90,ds:'Pense toujours trois coups à l\'avance.'},
 {id:'t2',cat:'title',nm:'Tacticien Redoutable',p:110,ds:'La terreur de toutes les combinaisons.'},
 {id:'t3',cat:'title',nm:'Gardien du Roi',p:130,ds:'Nul ne s\'approche impunément de votre Roi.'},
 {id:'t5',cat:'title',nm:'Seigneur du Blitz',p:220,ds:'Ses doigts volent quand la pendule brûle.'},
 {id:'t6',cat:'title',nm:'Architecte du Mat',p:260,ds:'Chaque partie est une cathédrale de combinaisons.'},
 {id:'t4',cat:'title',nm:'Légende de l\'Échiquier',p:300,ds:'Le titre suprême, réservé aux Maîtres accomplis.'},
];

// ── État de l'application ───────────────────────────────────
const G={
  tab:'menu', game:null, mode:'ai', aiI:3, pColor:'w', orient:'w',
  sel:null, hist:[], fens:[], lastM:null, vIdx:0,
  aiTh:false, coach:null, showCh:true,
  wTime:600, bTime:600, tLim:600, tInc:0, tOut:null, resBy:null, rep:false,
  lsnMode:null, lsnIdx:0, lsnFen:'', lsnSt:'wait', lsnFb:'',
  pzMode:null, pzIdx:0, pzFen:'', pzSt:'solving', pzHint:false, pzSel:null,
  shopCat:'board', showTut:!tutS,
};

// ── Helpers ─────────────────────────────────────────────────
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function fmt(s){return String(s/60|0).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function opening(){
  const h=G.hist.map(m=>m.san).join(' ');
  if(!h)return 'Position Initiale';
  const o=[['e4 e5 Nf3 Nc6 Bb5','Espagnole'],['e4 e5 Nf3 Nc6 Bc4','Italienne'],['e4 c5','Sicilienne'],['e4 e6','Française'],['d4 d5 c4','Gambit Dame'],['d4 Nf6','Indienne'],['c4','Anglaise'],['Nf3','Réti'],['e4','1.e4'],['d4','1.d4']];
  for(const[k,n]of o)if(h.startsWith(k))return n;
  return 'Milieu de Jeu';
}
function bColors(th){const m={bois:'#E6D7B9 #7D563B',emeraude:'#EAECE2 #4A6B5D',obsidienne:'#D9D2C5 #3E3731',marbre:'#EDEAE2 #A8A093',cosmos:'#3A3F5C #171A2B',corail:'#FBEFE4 #E08A6B'};const c=(m[th]||m.bois).split(' ');return`linear-gradient(135deg,${c[0]} 50%,${c[1]} 50%)`;}
function capPieces(ch,col){const s={p:8,n:2,b:2,r:2,q:1},c={p:0,n:0,b:0,r:0,q:0};const b=ch.board();for(let r=0;r<8;r++)for(let f=0;f<8;f++){const p=b[r][f];if(p&&p.color===col)c[p.type]++;}let h='';const o=col==='w'?'b':'w';['q','r','b','n','p'].forEach(t=>{const m=Math.max(0,s[t]-c[t]);for(let i=0;i<m;i++)h+=pSVG(t,o);});return h;}
function adv(ch,col){const v={p:1,n:3,b:3,r:5,q:9};let w=0,b=0;const bd=ch.board();for(let r=0;r<8;r++)for(let f=0;f<8;f++){const p=bd[r][f];if(!p)continue;if(p.color==='w')w+=v[p.type];else b+=v[p.type];}const a=col==='w'?w-b:b-w;return a>0?`+${a}`:null;}
function getDailyPuzzle(){const idx=(new Date().getDate()+new Date().getMonth())%PUZZLES.length;return PUZZLES[idx];}
function startDailyPuzzle(){const p=getDailyPuzzle();startPz(p.id);G.tab='academy';render();}
function recAI(){
  // Index de l'IA la plus proche de l'ELO actuel du joueur
  let best=0,bd=Infinity;
  AI.forEach((a,i)=>{const d=Math.abs(a.elo-P.elo);if(d<bd){bd=d;best=i;}});
  return best;
}
function startFromPreset(type){
  startG();
  if(type==='start'){return;}
  if(type==='opera'){
    G.game=new Chess('4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16');
    G.hist=[];G.fens=[G.game.fen()];G.lastM=null;G.vIdx=0;G.sel=null;render();updateEv();return;
  }
  if(type==='sicilian'){
    G.game=new Chess('rnbqkb1r/pp2pppp/3p1n2/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3');
    G.hist=[];G.fens=[G.game.fen()];G.lastM=null;G.vIdx=0;G.sel=null;render();updateEv();return;
  }
}
function openQuickPlaySheet(){
  const ov=document.createElement('div');ov.className='ov';
  ov.innerHTML=`<div class="sh"><div class="sh-h"></div><h3 class="cd-t mb2">Partie rapide</h3><p class="xs tm mb3">Choisissez une cadence express.</p><div class="g2"><button class="btn btn-g btn-f" onclick="setTC(180,2);this.closest('.ov').remove()">Blitz 3+2</button><button class="btn btn-g btn-f" onclick="setTC(300,0);this.closest('.ov').remove()">Blitz 5</button><button class="btn btn-d btn-f" onclick="setTC(600,0);this.closest('.ov').remove()">Rapide 10</button><button class="btn btn-d btn-f" onclick="setTC(900,10);this.closest('.ov').remove()">Classique 15+10</button></div></div>`;
  ov.addEventListener('click',e=>{if(e.target===ov)ov.remove();});document.body.appendChild(ov);
}
function setTC(t,inc){G.tLim=t;G.tInc=inc;G.wTime=t;G.bTime=t;P.fastLaunches=(P.fastLaunches||0)+1;svA();showDP();}

// ── Render principal ────────────────────────────────────────
function render(){
  const a=$('#app');
  a.innerHTML=renderHD()+`<div class="mn"><div class="pg" id="pg-menu">${rMenu()}</div><div class="pg h" id="pg-play">${rPlay()}</div><div class="pg h" id="pg-trophies">${rTrophies()}</div><div class="pg h" id="pg-world">${rWorld()}</div><div class="pg h" id="pg-academy">${rAcad()}</div><div class="pg h" id="pg-profile">${rProf()}</div><div class="pg h" id="pg-shop">${rShop()}</div></div>`+renderTB()+`<div class="tw" id="tw"></div>`+(G.showTut?rTut():'');
  $$('.pg').forEach(p=>p.classList.add('h'));
  const pg=$(`#pg-${G.tab}`);if(pg)pg.classList.remove('h');
}

function openWorld(){
  G.tab='world';
  render();
  if(SB.configured()&&!SB.lbLoading)SB.fetchLeaderboard();
}

// ── Classement Mondial (Supabase — lecture publique world_elo) ──
function rWorld(){
  const rows=SB.lb||[];
  const myId=SB.user?SB.user.id:null;
  const myRank=myId?rows.findIndex(r=>r.id===myId)+1:0;
  const myElo=SB.profile?SB.profile.world_elo:P.worldElo;
  const myGames=SB.profile?SB.profile.world_games:(P.worldStats?.games||0);
  const myAv=SHOP.find(s=>s.id===`a${SB.profile?SB.profile.avatar_idx:P.avI}`)||SHOP.find(s=>s.cat==='avatar');

  let body='';
  if(!SB.configured()){
    body=`<div class="cd"><div class="ebx e"><div class="ebt tr">🌐 Supabase non configuré</div><div class="ebb">Renseignez <code>SUPABASE_URL</code> et <code>SUPABASE_ANON</code> dans <code>index.html</code> pour afficher le classement mondial en direct.</div></div></div>`;
  }else if(SB.lbLoading&&!rows.length){
    body=`<div class="cd empty-state">⏳ Chargement du classement mondial...</div>`;
  }else if(SB.lbErr){
    body=`<div class="cd"><div class="ebx e"><div class="ebt tr">⚠️ Impossible de charger le classement</div><div class="ebb">${esc(SB.lbErr)}</div></div><button class="btn btn-g btn-f" onclick="SB.fetchLeaderboard()">🔄 Réessayer</button></div>`;
  }else if(!rows.length){
    body=`<div class="cd empty-state">Aucun joueur classé pour le moment.<br>Créez un compte dans l'onglet Profil pour inaugurer le Classement Mondial !</div>`;
  }else{
    body=`<div class="lb-list">${rows.map((r,idx)=>{
      const pos=idx+1;
      const isMe=!!(myId&&r.id===myId);
      const av=SHOP.find(s=>s.id===`a${r.avatar_idx||0}`)||SHOP.find(s=>s.cat==='avatar');
      const topCls=pos===1?'top1':pos===2?'top2':pos===3?'top3':'';
      const medal=pos===1?'🥇':pos===2?'🥈':pos===3?'🥉':'';
      const gms=r.world_games||0;
      const w=r.world_wins||0,d=r.world_draws||0,l=r.world_losses||0;
      return`<div class="lb-row ${topCls} ${isMe?'me':''}">
        <div class="lb-rank">${medal?`<span>${medal}</span>`:''}<span>#${pos}</span></div>
        <div class="lb-av" style="background:linear-gradient(135deg,${av?.bg||'#D4AF37'},${av?.bg2||av?.bg||'#8A6D1B'})">${av?.em||'👑'}</div>
        <div class="lb-info">
          <div class="lb-name"><span class="trunc">${esc(r.username||'Joueur')}</span>${isMe?'<span class="bg2 bg-g">VOUS</span>':''}</div>
          <div class="lb-sub">${gms} partie${gms>1?'s':''} classée${gms>1?'s':''} · ${w}V ${d}N ${l}D</div>
        </div>
        <div class="lb-right">
          <div class="lb-elo">${r.world_elo??1200}</div>
          <div class="lb-games">ELO Mondial</div>
        </div>
      </div>`;
    }).join('')}</div>`;
  }

  const meBanner=SB.user?`<div class="cd lb-me-banner">
    <div class="fb">
      <div style="display:flex;align-items:center;gap:10px;min-width:0">
        <div class="lb-av" style="background:linear-gradient(135deg,${myAv?.bg||'#D4AF37'},${myAv?.bg2||myAv?.bg||'#8A6D1B'})">${myAv?.em||'👑'}</div>
        <div style="min-width:0">
          <div class="xs tg bold">VOTRE RANG MONDIAL</div>
          <div class="sm bold trunc">${esc(SB.profile?.username||P.name)}</div>
          <div class="xs tm">${myGames} partie${myGames>1?'s':''} classée${myGames>1?'s':''}</div>
        </div>
      </div>
      <div style="text-align:right">
        <div class="fm xl bold tg">${myRank>0?'#'+myRank:'—'}</div>
        <div class="xs tm">${myElo} ELO</div>
      </div>
    </div>
  </div>`:(SB.configured()?`<div class="cd"><div class="fb"><div><div class="sm bold">Rejoignez le Classement Mondial</div><div class="xs tm">Connectez-vous ou créez un compte (1200 ELO au départ).</div></div><button class="btn btn-g btn-s" onclick="G.tab='profile';render()">Mon Compte</button></div></div>`:'');

  return`<div class="cd cd-g"><div class="fb"><div><h2 class="cd-t">🌍 Classement Mondial</h2><div class="xs tm">Joueurs classés par ELO Mondial officiel</div></div><button class="btn btn-d btn-s ${SB.lbLoading?'off':''}" onclick="SB.fetchLeaderboard()">🔄 ${SB.lbLoading?'...':'Actualiser'}</button></div></div>
  ${meBanner}
  ${body}
  <div class="cd mt3"><div class="inline-note">🛡️ <strong>Séparation stricte des ELO :</strong> ce classement affiche uniquement l'<strong>ELO Mondial</strong> (départ à 1200). Votre <strong>ELO Solo</strong> contre les IA (${P.elo} ELO) reste strictement local et n'est jamais envoyé ici.</div></div>`;
}

// ── Route des Trophées ─────────────────────────────────────
function rTrophies(){
  const total=TROPHIES.length,got=P.trophies.length;
  const nextT=TROPHIES.find(t=>!P.trophies.includes(t.elo));
  const prevT=[...TROPHIES].reverse().find(t=>P.trophies.includes(t.elo));
  const lo=prevT?prevT.elo:0,hi=nextT?nextT.elo:TROPHIES[TROPHIES.length-1].elo+400;
  const pct=nextT?Math.max(0,Math.min(100,(P.elo-lo)/(hi-lo)*100)):100;
  return`<div class="cd cd-g"><div class="fb"><div><h2 class="cd-t">Route des Trophées</h2><div class="xs tm">Montez en ELO et débloquez les paliers royaux</div><div class="xs tg bold mt2">${got}/${total} trophées débloqués</div></div><div class="cb">🪙 ${P.coins}</div></div></div>
  <div class="cd"><div class="fb mb2"><span class="bold sm">🎯 Votre progression</span><span class="fm xs tg bold">ELO ${P.elo}</span></div>
  ${nextT?`<div class="xs tm mb2">Prochain palier : <strong class="tg">${nextT.ic} ${nextT.nm}</strong> à ${nextT.elo} ELO — encore <strong class="tg">${nextT.elo-P.elo}</strong> points !</div>`:`<div class="xs tgn mb2">🐉 Tous les trophées sont à vous. Vous êtes un Immortel de Caïssa !</div>`}
  <div class="pbar" style="height:10px"><div class="pfill" style="width:${pct}%"></div></div>
  <div class="fb mt2"><span class="xs tm">${lo} ELO</span><span class="xs tm">${hi} ELO</span></div></div>
  <div class="troad">${TROPHIES.map(t=>{
    const done=P.trophies.includes(t.elo);
    const isNext=nextT&&t.elo===nextT.elo;
    return`<div class="trnode ${done?'done':''} ${isNext?'next':''}">
      <div class="tr-medal">${done?t.ic:'🔒'}</div>
      <div class="tr-info">
        <div class="tr-name">${t.nm} ${isNext?'<span class="bg2 bg-g" style="margin-left:4px">Objectif</span>':''}</div>
        <div class="tr-sub">${t.ds}</div>
      </div>
      <div class="tr-right">
        <div class="tr-elo">${t.elo} ELO</div>
        <div class="tr-cn ${done?'':'tm'}">${done?'Reçu ✓':'+'+t.cn+' 🪙'}</div>
      </div>
    </div>`;}).join('')}</div>
  <div class="cd"><div class="inline-note">💡 Chaque partie vous fait monter en ELO. Plus l'adversaire est fort, plus les gains sont importants. Les trophées rapportent des Couronnes à vie (une seule fois par palier) — dépensez-les à la Boutique !</div>
  <button class="btn btn-g btn-f mt3" onclick="showDP()">⚔️ Gagner de l'ELO</button></div>`;
}

// ── Header & Tab Bar ────────────────────────────────────────
function renderHD(){return`<div class="hd"><div class="lg"><div class="li2">♔</div><div class="lt">L'Échiquier Royal</div></div><div class="ac"><button class="cb" onclick="G.tab='shop';render()">🪙 ${P.coins}</button><button class="ib" onclick="Au.on=!Au.on;render()">${Au.on?'🔊':'🔇'}</button></div></div>`;}
function renderTB(){const tabs=[{id:'menu',ic:'🏠',lb:'Salon'},{id:'play',ic:'⚔️',lb:'Jouer'},{id:'trophies',ic:'🏆',lb:'Trophées'},{id:'world',ic:'🌍',lb:'Mondial'},{id:'academy',ic:'🎓',lb:'Académie'},{id:'shop',ic:'🛍️',lb:'Boutique'},{id:'profile',ic:'👤',lb:'Profil'}];return`<div class="tb"><div class="in">${tabs.map(t=>`<button class="tbtn ${G.tab===t.id?'a':''}" onclick="${t.id==='world'?'openWorld()':`G.tab='${t.id}';render()`}"><div class="ic">${t.ic}</div><div class="lb">${t.lb}</div></button>`).join('')}</div></div>`;}

// ── Menu ────────────────────────────────────────────────────
function rMenu(){
  const ti=SHOP.find(s=>s.id===`t${P.tiI}`)||SHOP.find(s=>s.cat==='title');
  const av=SHOP.find(s=>s.id===`a${P.avI}`)||SHOP.find(s=>s.cat==='avatar');
  const st=P.st||{};const w=st.wins||0,l=st.losses||0,d=st.draws||0;
  const daily=getDailyPuzzle();
  return `
  <div class="cd cd-g fb-s">
    <div class="ap" style="background:${av?.bg||'#D4AF37'};width:52px;height:52px;font-size:26px">${av?.em||'👑'}</div>
    <div style="flex:1;min-width:0">
      <div class="bold" style="font-size:16px" class="trunc">${P.name}</div>
      <div class="xs tm">${ti?.nm||'Novice du Salon'}</div>
      <div class="mt2"><span class="bg2 bg-g">ELO ${P.elo}</span></div>
    </div>
    <div class="cb">🪙 ${P.coins}</div>
  </div>

  <div class="cd cd-g daily-card">
    <div class="hero-chip">♔ Salon de Grand Maître</div>
    <h2 class="cd-t" style="font-size:28px;line-height:1.1;margin-top:10px">L'art royal des échecs,<br><span style="color:var(--gold);font-weight:500">en vrai jeu mobile.</span></h2>
    <p class="xs tm mt2">IA compétitive, académie interactive, progression, boutique, succès et puzzles du jour.</p>
    <div class="hero-cta-stack mt3">
      <button class="btn btn-g btn-f" onclick="showDP()">🤖 Jouer contre l'IA</button>
      <button class="btn btn-d btn-f" onclick="openQuickPlaySheet()">⚡ Partie rapide</button>
    </div>
    <div class="g3 mt2">
      <button class="btn btn-d btn-s" onclick="G.mode='local';startG()">👥 Duel</button>
      <button class="btn btn-d btn-s" onclick="G.tab='academy';G.lsnMode=null;G.pzMode=null;render()">🧩 Tactiques</button>
      <button class="btn btn-d btn-s" onclick="G.tab='academy';G.lsnMode=null;G.pzMode=null;render()">📖 Leçons</button>
    </div>
  </div>

  <div class="cd">
    <div class="section-title"><h3>⚡ Accès rapides</h3><span>En un tap</span></div>
    <div class="g2">
      <button class="quick-tile" onclick="startFromPreset('opera')"><div class="quick-emoji">♟️</div><div><div class="sm bold">Morphy</div><div class="xs tm">Mat de l'Opéra</div></div></button>
      <button class="quick-tile" onclick="startFromPreset('start')"><div class="quick-emoji">🏁</div><div><div class="sm bold">Nouvelle Partie</div><div class="xs tm">Position initiale</div></div></button>
      <button class="quick-tile" onclick="startFromPreset('sicilian')"><div class="quick-emoji">🐉</div><div><div class="sm bold">Sicilienne</div><div class="xs tm">Position d'ouverture</div></div></button>
      <button class="quick-tile" onclick="startDailyPuzzle()"><div class="quick-emoji">🗓️</div><div><div class="sm bold">Puzzle du Jour</div><div class="xs tm">${daily.title}</div></div></button>
    </div>
  </div>

  <div class="cd">
    <div class="section-title"><h3>📊 Progression</h3><span>${PP.length}/${PUZZLES.length} puzzles</span></div>
    <div class="kpi-row">
      <div class="kpi"><div class="v tgn">${w}</div><div class="l">Victoires</div></div>
      <div class="kpi"><div class="v">${w+l+d}</div><div class="l">Parties</div></div>
      <div class="kpi"><div class="v tg">${P.streak||0}</div><div class="l">Série</div></div>
    </div>
    <div class="subtle-divider"></div>
    <div class="mini-grid">
      <button class="btn btn-d btn-s" onclick="openWorld()">🌍 Mondial</button>
      <button class="btn btn-d btn-s" onclick="G.tab='trophies';render()">🏆 Trophées</button>
      <button class="btn btn-d btn-s" onclick="G.tab='profile';render()">👤 Profil</button>
      <button class="btn btn-d btn-s" onclick="G.tab='shop';render()">🛍️ Boutique</button>
      <button class="btn btn-d btn-s" onclick="claimD()">🎁 Bonus</button>
      <button class="btn btn-d btn-s" onclick="openHelp()">❓ Aide</button>
    </div>
  </div>

  <div class="cd">
    <div class="section-title"><h3>🧩 Puzzle du jour</h3><span>${daily.elo} ELO</span></div>
    <div class="notice">
      <div class="bold sm">${daily.title}</div>
      <div class="xs tm mt2">${daily.obj}</div>
    </div>
    <button class="btn btn-g btn-f mt3" onclick="startPz('${daily.id}');G.tab='academy';render()">Jouer ce puzzle</button>
  </div>

  <div class="cd">
    <div class="section-title"><h3>📖 Mémento FFE</h3><span>Notation française</span></div>
    <div class="g3">${[['p','Pion','1pt'],['n','Cav. (C)','3pts'],['b','Fou (F)','3pts'],['r','Tour (T)','5pts'],['q','Dame (D)','9pts'],['k','Roi (R)','∞']].map(([t,n,v])=>`<div style="display:flex;align-items:center;gap:6px;padding:6px;background:var(--surface3);border-radius:8px;border:1px solid rgba(255,255,255,.06)"><div style="width:24px;height:24px">${pSVG(t,'w')}</div><div><div class="xs bold">${n}</div><div class="xs fm tg">${v}</div></div></div>`).join('')}</div>
  </div>`;
}

// ── Play ────────────────────────────────────────────────────
function rPlay(){
  if(!G.game)return`<div class="cd cd-g tc" style="padding:40px 20px"><h2 class="cd-t" style="font-size:24px">Prêt à jouer ?</h2><p class="sm tm mt2">Choisissez un mode.</p><button class="btn btn-g btn-f mt3" onclick="showDP()">🤖 Contre l'IA</button><button class="btn btn-d btn-f mt2" onclick="G.mode='local';startG()">👥 Duel Local</button></div>`;
  const c=G.game,fen=c.fen(),over=c.game_over()||!!G.tOut||!!G.resBy,turn=c.turn();
  const ai=AI[G.aiI],isA=G.mode==='ai';
  const topC=G.orient==='w'?'b':'w',botC=G.orient==='w'?'w':'b';
  function pc(col,isTop){
    const isAP=isA&&col!==G.pColor;
    const nm=isAP?ai.n:col==='w'?'Blancs':'Noirs';
    const sb=isAP?ai.t:(isTop?'':'À vous');
    const act=!over&&turn===col;const cp=capPieces(c,col),av=adv(c,col);
    const ck=col==='w'?G.wTime:G.bTime,lo=ck<30&&G.tLim>0;
    return`<div class="pc ${act?'at':''}"><div class="pa ${col}">${isAP?'🤖':col==='w'?'♔':'♚'}</div><div style="flex:1;min-width:0"><div class="pn trunc">${nm} ${act&&!over?'<span class="bg2 bg-n">À vous</span>':''} ${G.aiTh&&isAP?'<span class="bg2 bg-g">Réflexion...</span>':''}</div><div class="ps trunc">${sb} ${av?`<span class="bg2 bg-n" style="margin-left:4px">${av}</span>`:''}</div>${cp?`<div class="cpt mt2">${cp}</div>`:''}</div>${G.tLim>0?`<div class="ck ${act?'a':'i'} ${lo?'lo':''}">⏱ ${fmt(ck)}</div>`:''}</div>`;
  }
  const coach=G.coach&&G.showCh&&!over;
  const histBanner=G.vIdx!==G.fens.length-1?`<div class="notice mt2">Vous consultez un coup passé. <button class="btn btn-g btn-s" style="display:inline-flex;margin-top:8px" onclick="goLive();render()">Retour au direct</button></div>`:'';
  return`<div class="cd" style="padding:8px 12px"><div class="fb"><span class="xs tm">📖 ${opening()}</span><button class="btn btn-d btn-s" onclick="showHist()">📜 ${G.hist.length}</button></div></div>${pc(topC,true)}<div class="board-shell"><div class="bc mt2"><div class="eb" id="eb"><div class="efw" id="efw" style="height:50%"></div><div class="efb"></div><div class="el" id="el">0.0</div></div><div class="bf" data-t="${P.bt||'bois'}"><div class="brd" id="brd">${rBoard(fen)}</div></div></div>${histBanner}</div>${over?rGameOver():''}${pc(botC,false)}<div class="cbr"><button class="cb2" onclick="hint()" ${over?'disabled':''}><span class="i2">💡</span><span class="l2">Indice</span></button><button class="cb2" onclick="undo()" ${G.hist.length===0||G.aiTh?'disabled':''}><span class="i2">↩️</span><span class="l2">Annuler</span></button><button class="cb2" onclick="showHist()"><span class="i2">📜</span><span class="l2">Coups</span></button><button class="cb2" onclick="resign()" ${over?'disabled':''}><span class="i2">🏳️</span><span class="l2">Abandon</span></button></div>${coach?`<div class="ch"><div class="ch-h"><span class="ch-l">💡 Conseil du Maître</span><span class="ch-s">${G.coach.fr}</span><button class="ib" style="width:24px;height:24px;font-size:12px" onclick="G.showCh=false;render()">✕</button></div><p class="ch-t">${G.coach.tx}</p><button class="btn btn-gn btn-f btn-s" onclick="playCoach()">Jouer ${G.coach.fr}</button></div>`:''}<button class="btn btn-g float-btn" onclick="showDP()">+ Partie</button>`;
}

function rBoard(fen){
  const ch=new Chess(fen),files=G.orient==='w'?'abcdefgh':'hgfedcba',ranks=G.orient==='w'?'87654321':'12345678';
  let h='';const guide=G.coach&&G.showCh?[G.coach.from,G.coach.to]:[];
  for(let r=0;r<8;r++)for(let f=0;f<8;f++){
    const sq=files[f]+ranks[r],il=(r+f)%2===0,p=ch.get(sq),isS=G.sel===sq,isL=G.lastM&&(G.lastM.from===sq||G.lastM.to===sq);
    const legal=G.sel?ch.moves({square:G.sel,verbose:true}):[];
    const can=legal.some(m=>m.to===sq),cap=can&&(p||legal.find(m=>m.to===sq)?.flags?.includes('e'));
    const chk=p&&p.type==='k'&&p.color===ch.turn()&&ch.in_check(),gh=guide.includes(sq);
    let cl=`sq ${il?'l':'d'} t${isS?' sel':''}${isL?' lm':''}${chk?' chk':''}${gh?' gh':''}${G.sel&&can?' cm':''}`;
    h+=`<div class="${cl}" data-sq="${sq}" onclick="tapSq('${sq}')">${f===0?`<span class="cr">${ranks[r]}</span>`:''}${r===7?`<span class="cf2">${files[f]}</span>`:''}${can&&!cap?'<div class="ld"></div>':''}${can&&cap?'<div class="lr"></div>':''}${p?pSVG(p.type,p.color):''}</div>`;
  }
  if(G.coach&&G.showCh&&!G.game?.game_over())h+=`<svg class="al" viewBox="0 0 800 800"><defs><marker id="ah" markerWidth="4.5" markerHeight="4.5" refX="2.7" refY="2.25" orient="auto"><polygon points="0 0,4.5 2.25,0 4.5" fill="#2E8B57"/></marker></defs>${arrow(G.coach.from,G.coach.to,files,ranks)}</svg>`;
  return h;
}
function arrow(fr,to,fi,ri){
  const fx=fi.indexOf(fr[0])*100+50,fy=ri.indexOf(fr[1])*100+50,tx=fi.indexOf(to[0])*100+50,ty=ri.indexOf(to[1])*100+50;
  const dx=tx-fx,dy=ty-fy,l=Math.hypot(dx,dy);if(!l)return '';
  const s=24;return`<line x1="${fx}" y1="${fy}" x2="${tx-dx/l*s}" y2="${ty-dy/l*s}" stroke="#2E8B57" stroke-width="17" stroke-linecap="round" marker-end="url(#ah)" opacity=".85"/>`;
}

function rGameOver(){
  const c=G.game;let t='',s='';
  if(c.in_checkmate()){const w=c.turn()==='w'?'Noirs':'Blancs';t=`Échec et Mat — ${w} gagnent`;s=G.mode==='ai'?(c.turn()!==G.pColor?'Félicitations !':'L\'IA a gagné.'):'Magnifique partie !';}
  else if(G.tOut){t='Drapeau tombé';s='Le temps est écoulé.';}else if(G.resBy){t='Abandon';s='Terminé.';}
  else{t='Partie Nulle';s=c.in_stalemate()?'Pat.':'Égalité.';}
  return`<div class="cd cd-g tc afi"><div style="font-size:32px;margin-bottom:8px">🏆</div><h3 class="cd-t">${t}</h3><p class="xs tm mb3">${s}</p><div class="g2"><button class="btn btn-g" onclick="startG()">Rejouer</button><button class="btn btn-d" onclick="G.game=null;G.tab='menu';render()">Salon</button></div></div>`;
}

// ── Academy ─────────────────────────────────────────────────
function rAcad(){
  if(G.lsnMode)return rLesson();
  if(G.pzMode)return rPuzzle();
  return`<div class="cd cd-g fb"><div><h2 class="cd-t">Académie Royale</h2><div class="xs tm">${PL.length}/${LESSONS.length} leçons · ${PP.length}/${PUZZLES.length} puzzles</div></div><div class="bg2 bg-g">ELO ${TE}</div></div><div class="cd"><div class="section-title"><h3>🎓 Progression</h3><span>Apprendre & résoudre</span></div><div class="kpi-row"><div class="kpi"><div class="v">${PL.length}</div><div class="l">Leçons</div></div><div class="kpi"><div class="v">${PP.length}</div><div class="l">Puzzles</div></div><div class="kpi"><div class="v tg">${P.bestPuzzleStreak||0}</div><div class="l">Série puzzle</div></div></div></div><div class="fb mb3"><span class="bold sm">📖 Leçons</span><span class="xs tm">Guidées pas à pas</span></div>${LESSONS.map(l=>{const d=PL.includes(l.id);return`<button class="li" onclick="startLsn('${l.id}')"><div style="font-size:24px">${d?'✅':'📖'}</div><div style="flex:1;min-width:0"><div class="sm bold trunc">${l.title}</div><div class="xs tm">${l.cat} · ${l.lv} · ${l.steps.length} étapes</div></div></button>`;}).join('')}<div class="fb mb3 mt3"><span class="bold sm">🧩 Problèmes Tactiques</span><span class="xs tm">Vision combinatoire</span></div><div class="fp">${['Tous','Débutant','Intermédiaire','Avancé','Expert'].map((d,i)=>`<button class="pl ${i===0?'a':''}" onclick="filterPz(this,'${d==='Tous'?'all':d}')">${d}</button>`).join('')}</div><div id="pzl">${rPzList('all')}</div>`;
}
function rPzList(fl){return PUZZLES.filter(p=>fl==='all'||p.d===fl).map(p=>{const d=PP.includes(p.id);return`<button class="li" onclick="startPz('${p.id}')"><div style="font-size:24px">${d?'✅':'🧩'}</div><div style="flex:1;min-width:0"><div class="sm bold trunc">${p.title}</div><div class="xs tm">${p.th} · ${p.elo} ELO</div></div></button>`;}).join('');}
function filterPz(btn,fl){const el=$('#pzl');if(el)el.innerHTML=rPzList(fl);$$('.fp .pl').forEach(b=>b.classList.remove('a'));btn.classList.add('a');}

function rLesson(){
  const ls=LESSONS.find(l=>l.id===G.lsnMode);if(!ls)return'';const s=ls.steps[G.lsnIdx];if(!s)return'';
  return`<button class="xs tm" onclick="G.lsnMode=null;render()">← Retour</button><div class="cd cd-g mt2"><div class="fb mb2"><span class="bg2 bg-g">Étape ${G.lsnIdx+1}/${ls.steps.length}</span><span class="xs tm">${ls.lv}</span></div><div class="sd">${ls.steps.map((_,i)=>`<div class="sdt ${i<G.lsnIdx?'done':''} ${i===G.lsnIdx?'cur':''}"></div>`).join('')}</div><h3 class="cd-t">${s.t}</h3></div><div class="ebx i"><div class="ebt">🎯 Consigne</div><div class="ebb">${s.i}</div></div>${G.lsnSt==='success'?`<div class="ebx s"><div class="ebt tgn">✅ Validé !</div><div class="ebb">${G.lsnFb}</div></div>`:''}${G.lsnSt==='error'?`<div class="ebx e"><div class="ebt tr">❌ Réessayez</div><div class="ebb">${G.lsnFb}</div></div>`:''}<div class="ebx h"><div class="ebt tg">💡 Pourquoi ?</div><div class="ebb">${s.n}</div></div><div class="bc mt2"><div class="bf" data-t="${P.bt||'bois'}"><div class="brd" id="brd">${rLsnBoard(s)}</div></div></div><div class="g3 mt2"><button class="btn btn-d btn-s" onclick="lsnPrev()">← Préc</button><button class="btn btn-d btn-s" onclick="lsnReset()">↺</button>${G.lsnIdx<ls.steps.length-1?`<button class="btn btn-g btn-s" onclick="lsnNext()">Suiv →</button>`:`<button class="btn btn-gn btn-s" onclick="lsnFin()">Terminé ✓</button>`}</div>`;
}
function rLsnBoard(s){
  const ch=new Chess(s.fen),files='abcdefgh',ranks='87654321';let h='';
  for(let r=0;r<8;r++)for(let f=0;f<8;f++){const sq=files[f]+ranks[r],il=(r+f)%2===0,p=ch.get(sq);
    h+=`<div class="sq ${il?'l':'d'} t" data-sq="${sq}" onclick="tapLsn('${sq}')">${p?pSVG(p.type,p.color):''}</div>`;}return h;}

function rPuzzle(){
  const pz=PUZZLES.find(p=>p.id===G.pzMode);if(!pz)return'';
  return`<button class="xs tm" onclick="G.pzMode=null;render()">← Retour</button><div class="cd cd-g mt2"><div class="fb mb2"><span class="bg2 bg-g">${pz.th} · ${pz.elo} ELO</span></div><h3 class="cd-t">${pz.title}</h3></div><div class="ebx i"><div class="ebt">🎯 ${pz.obj}</div></div>${G.pzSt==='solved'?`<div class="ebx s"><div class="ebt tgn">✅ Résolu ! (+18 ELO)</div><div class="ebb">${pz.expl}</div></div>`:''}${G.pzSt==='wrong'?`<div class="ebx e"><div class="ebt tr">❌ Pas le bon coup</div><div class="ebb">Cherchez les échecs et menaces !</div></div>`:''}${G.pzHint&&G.pzSt!=='solved'?`<div class="ebx h"><div class="ebt tg">💡 Indice</div><div class="ebb">${pz.hint}</div></div>`:''}<div class="bc mt2"><div class="bf" data-t="${P.bt||'bois'}"><div class="brd" id="brd">${rPzBoard(pz)}</div></div></div><div class="g3 mt2"><button class="btn btn-d btn-s" onclick="G.pzHint=true;render()">💡 Indice</button><button class="btn btn-d btn-s" onclick="pzDemo()">▶ Solution</button><button class="btn btn-g btn-s" onclick="startPz(G.pzMode)">↺</button></div>${G.pzSt==='solved'?`<button class="btn btn-g btn-f mt2" onclick="nextPz()">Suivant →</button>`:''}`;
}
function rPzBoard(pz){
  const ch=new Chess(pz.fen),files=pz.ori==='w'?'abcdefgh':'hgfedcba',ranks=pz.ori==='w'?'87654321':'12345678';let h='';
  for(let r=0;r<8;r++)for(let f=0;f<8;f++){const sq=files[f]+ranks[r],il=(r+f)%2===0,p=ch.get(sq);
    let cl=`sq ${il?'l':'d'} t${G.pzSel===sq?' sel':''}`;
    let leg='';if(G.pzSel){const legal=ch.moves({square:G.pzSel,verbose:true});if(legal.some(m=>m.to===sq)){cl+=' cm';leg=p?'<div class="lr"></div>':'<div class="ld"></div>';}}
    h+=`<div class="${cl}" data-sq="${sq}" onclick="tapPz('${sq}')">${leg}${p?pSVG(p.type,p.color):''}</div>`;}return h;}

// ── Profile ─────────────────────────────────────────────────
function rProf(){
  const st=P.st||{};const w=st.wins||0,l=st.losses||0,d=st.draws||0,t=w+l+d,rate=t>0?Math.round(w/t*100):0;
  const av=SHOP.find(s=>s.id===`a${P.avI}`)||SHOP.find(s=>s.cat==='avatar');
  const ti=SHOP.find(s=>s.id===`t${P.tiI}`)||SHOP.find(s=>s.cat==='title');
  return`<div class="cd cd-g"><div style="display:flex;align-items:center;gap:12px;margin-bottom:12px"><div class="ap" style="background:linear-gradient(135deg,${av?.bg||'#D4AF37'},${av?.bg2||av?.bg||'#8A6D1B'});width:60px;height:60px;font-size:32px">${av?.em||'👑'}</div><div style="flex:1;min-width:0"><div class="fb"><span class="bold lg trunc" style="max-width:180px" id="pname">${P.name}</span><button class="btn btn-d btn-s" onclick="editName()">✏️</button></div><span class="bg2 bg-g mt2">${ti?.nm||'Novice'}</span></div></div><div class="elo-pair"><div class="elo-box solo"><div class="elo-head"><span>ELO SOLO</span><span class="elo-tag">Contre les IA</span></div><div class="elo-number">${P.elo}</div><div class="elo-caption">Progression contre l'IA</div></div><div class="elo-box world" style="cursor:pointer" onclick="openWorld()"><div class="elo-head"><span>ELO MONDIAL</span><span class="elo-tag ${SB.profile?'':'offline'}">${SB.profile?'COMPTE LIÉ':'NON CONNECTÉ'}</span></div><div class="elo-number">${SB.profile?SB.profile.world_elo:P.worldElo}</div><div class="elo-caption">🌍 Voir le classement →</div></div></div><div class="fb mt2"><span class="xs tm">Niveau ${P.tc/80+1|0} · 🏆 ${P.trophies.length}/8 trophées</span><span class="cb">🪙 ${P.coins}</span></div><div class="pbar mt2"><div class="pfill" style="width:${P.tc%80/80*100}%"></div></div><button class="btn btn-gn btn-s btn-f mt2" onclick="claimD()">🎁 ${P.ld===new Date().toDateString()?'Bonus quotidien déjà réclamé':'+25 Couronnes — Bonus quotidien'}</button></div><div class="g2"><div class="sbox tc"><div class="slab">⚔️ Parties IA</div><div class="sval">${t}</div></div><div class="sbox tc"><div class="slab">🏆 Victoires IA</div><div class="sval tgn">${w}</div></div><div class="sbox tc"><div class="slab">🤝 Nulles IA</div><div class="sval">${d}</div></div><div class="sbox tc"><div class="slab">📈 Taux victoire IA</div><div class="sval tg">${rate}%</div></div></div><div class="g2 mt3"><div class="sbox tc"><div class="slab">🧩 Puzzles</div><div class="sval">${P.totalPuzzlesSolved||PP.length}</div></div><div class="sbox tc"><div class="slab">📖 Leçons</div><div class="sval">${P.totalLessonsDone||PL.length}</div></div><div class="sbox tc"><div class="slab">🔥 Série max</div><div class="sval">${P.bestS||0}</div></div><div class="sbox tc"><div class="slab">⚡ Blitz</div><div class="sval">${P.fastLaunches||0}</div></div></div>${rAccount()}<div class="cd mt3"><div class="fb mb2"><span class="bold sm">🏆 Succès</span><span class="xs tm">${P.ach.length}/${ACHS.length}</span></div>${ACHS.map(a=>{const u=P.ach.includes(a.id);return`<div class="ach ${u?'u':'l'}"><div class="ach-i">${u?a.ic:'🔒'}</div><div><div class="xs bold">${a.nm}</div><div class="xs tm">${a.ds}</div><div class="xs fm tg">+${a.cn} 🪙</div></div></div>`;}).join('')}</div>`;
}

// ── Shop ────────────────────────────────────────────────────
function shopPreview(item){
  if(item.cat==='board')return`<div class="bp" style="background:${bColors(item.th)}"></div>`;
  if(item.cat==='piece')return`<div class="shop-prev-piece">${pSVGP('q','w',item.pidx)}${pSVGP('n','b',item.pidx)}</div>`;
  if(item.cat==='avatar')return`<div class="ap" style="background:linear-gradient(135deg,${item.bg},${item.bg2||item.bg});width:52px;height:52px;font-size:26px">${item.em||'👤'}</div>`;
  return`<div class="tpp tpp-lg">${item.nm}</div>`;
}
function rShop(){
  const ownedCount=P.owned.length;
  const cats=[['board','♟️','Échiquiers'],['piece','👑','Pièces'],['avatar','😀','Avatars'],['title','🏷️','Titres']];
  if(!cats.find(c=>c[0]===G.shopCat))G.shopCat='board';
  return`<div class="cd cd-g fb"><div><h2 class="cd-t">Boutique Royale</h2><div class="xs tm">${ownedCount} objet(s) possédé(s) sur ${SHOP.length}</div></div><div class="cb">🪙 ${P.coins}</div></div><div class="shop-cats mb3">${cats.map(([c,e,l])=>`<button class="pl ${G.shopCat===c?'a':''}" onclick="G.shopCat='${c}';render()"><span style="font-size:16px">${e}</span><div>${l}</div></button>`).join('')}</div>${SHOP.filter(s=>s.cat===G.shopCat).map(item=>{
  const owned=P.owned.includes(item.id)||item.p===0;
  const eq=(G.shopCat==='board'&&P.bt===item.th)||(G.shopCat==='piece'&&P.pt===(item.pidx||0))||(G.shopCat==='avatar'&&P.avI===+item.id.slice(1))||(G.shopCat==='title'&&P.tiI===+item.id.slice(1));
  const canBuy=P.coins>=item.p;
  return`<div class="shop-card ${eq?'eq':''} ${owned?'own':''}">
    <div class="shop-prev">${shopPreview(item)}</div>
    <div class="shop-body">
      <div class="shop-name">${item.nm} ${eq?'<span class="bg2 bg-n">Actif</span>':''}</div>
      <div class="shop-desc">${item.ds}</div>
      <div class="fb mt2">
        <span class="fm xs bold ${item.p===0?'tgn':''}">${item.p===0?'Offert':item.p+' 🪙'}</span>
        ${owned?`<button class="btn ${eq?'btn-d off':'btn-g'} btn-s" onclick="equip('${item.id}')">${eq?'Équipé':'Équiper'}</button>`:`<button class="btn ${canBuy?'btn-g':'btn-d off'} btn-s" onclick="buy('${item.id}')">${canBuy?'Acheter':'Pas assez de 🪙'}</button>`}
      </div>
    </div>
  </div>`;}).join('')}`;
}

// ── Logique de jeu ──────────────────────────────────────────
function startG(){
  // Sélection automatique de l'IA recommandée si le joueur n'en a pas choisi
  if(!G.aiPick&&P.elo<400)G.aiI=recAI();
  G.aiPick=false;
  G.game=new Chess();G.hist=[];G.fens=[G.game.fen()];G.lastM=null;G.vIdx=0;G.sel=null;
  G.aiTh=false;G.coach=null;G.showCh=true;G.wTime=G.tLim||600;G.bTime=G.tLim||600;G.tOut=null;G.resBy=null;G.rep=false;
  G.tab='play';render();
}

function tapSq(sq){
  if(!G.game)return;const c=G.game;
  if(c.game_over()||G.tOut||G.resBy||G.aiTh)return;
  if(G.vIdx!==G.fens.length-1)return;
  if(G.mode==='ai'&&c.turn()!==G.pColor)return;
  const p=c.get(sq);
  if(G.sel){
    const legal=c.moves({square:G.sel,verbose:true});
    if(legal.some(m=>m.to===sq)){
      if(legal.some(m=>m.to===sq&&m.promotion)){showPromo(G.sel,sq);return;}
      doMove(G.sel,sq);return;
    }
  }
  if(p&&p.color===c.turn())G.sel=G.sel===sq?null:sq;else G.sel=null;
  render();
}

function doMove(fr,to,pr){
  const c=G.game;try{const m=c.move({from:fr,to:to,promotion:pr||'q'});if(!m)return false;
  G.sel=null;G.coach=null;const fr2=toFR(m.san);
  G.hist.push({san:m.san,french:fr2});G.fens.push(c.fen());G.lastM={from:fr,to:to};G.vIdx=G.fens.length-1;
  if(G.tInc>0&&G.hist.length>1){if(m.color==='w')G.wTime+=G.tInc;else G.bTime+=G.tInc;}
  if(c.in_checkmate())Au.success();else if(c.in_draw())Au.move();else if(c.in_check())Au.check();else if(m.san.startsWith('O-O'))Au.castle();else if(m.captured)Au.capture();else Au.move();
  vib();render();updateEv();
  if(c.game_over())reportR();
  if(G.mode==='ai'&&!c.game_over()&&c.turn()!==G.pColor)aiGo();
  return true;}catch(e){return false;}
}

function aiGo(){
  G.aiTh=true;render();
  setTimeout(()=>{const ai=AI[G.aiI];const m=bestMove(G.game.fen(),ai.d,ai.bl);
    if(m){const r=G.game.move(m);if(r){G.hist.push({san:r.san,french:toFR(r.san)});G.fens.push(G.game.fen());G.lastM={from:m.from,to:m.to};G.vIdx=G.fens.length-1;
      if(G.tInc>0){if(r.color==='w')G.wTime+=G.tInc;else G.bTime+=G.tInc;}
      if(G.game.in_checkmate())Au.check();else if(G.game.in_check())Au.check();else if(r.san.startsWith('O-O'))Au.castle();else if(r.captured)Au.capture();else Au.move();}}
    G.aiTh=false;render();updateEv();if(G.game.game_over())reportR();},350);
}

function undo(){
  if(!G.game||!G.hist.length||G.aiTh)return;
  const n=G.mode==='ai'&&G.game.turn()===G.pColor&&G.hist.length>=2?2:1;
  for(let i=0;i<n;i++)G.game.undo();
  G.hist.splice(-n);G.fens.splice(-n);G.vIdx=G.fens.length-1;G.sel=null;G.coach=null;G.resBy=null;G.tOut=null;G.rep=false;render();
}

function hint(){
  if(!G.game||G.game.game_over()||G.aiTh)return;
  const m=bestMove(G.game.fen(),3,0);if(!m)return;
  const fr=toFR(m.san);let tx='';
  if(m.san.includes('#'))tx=`Échec et mat avec ${fr} !`;
  else if(m.san.startsWith('O-O'))tx=`Roque ${fr} pour sécuriser le Roi.`;
  else if(m.captured)tx=`Capturez avec ${fr}.`;
  else if(m.san.includes('+'))tx=`Échec avec ${fr} !`;
  else{const pn={n:'Cavalier',b:'Fou',r:'Tour',q:'Dame',k:'Roi'};tx=`Le Maître recommande ${fr} (${pn[m.piece]||''}).`;}
  G.coach={from:m.from,to:m.to,fr,tx};G.showCh=true;render();
}
function playCoach(){if(G.coach)doMove(G.coach.from,G.coach.to);}

function resign(){if(!G.game||G.game.game_over())return;G.resBy=G.mode==='ai'?G.pColor:G.game.turn();reportR();render();}

function reportR(){
  if(G.rep)return;G.rep=true;

  // Les parties locales ne sont ni classées Solo ni Mondiales.
  if(G.mode==='local'){
    P.lg=(P.lg||0)+1;
    svA();
    return;
  }

  // Réservé à une future intégration des parties en ligne.
  // Aucune statistique ni aucun ELO mondial n'est modifié dans cette version.
  if(G.mode==='online')return;
  if(G.mode!=='ai')return;

  let res='draw';const c=G.game;
  if(c.in_checkmate())res=c.turn()===G.pColor?'loss':'win';
  else if(G.tOut)res=G.tOut===G.pColor?'win':'loss';
  else if(G.resBy)res=G.resBy===G.pColor?'loss':'win';
  const ai=AI[G.aiI],st=P.st||(P.st={});
  if(!st[ai.id])st[ai.id]={w:0,l:0,d:0,g:0};
  st[ai.id].g++;st[ai.id][res==='win'?'w':res==='loss'?'l':'d']++;
  st.wins=(st.wins||0)+(res==='win'?1:0);st.losses=(st.losses||0)+(res==='loss'?1:0);st.draws=(st.draws||0)+(res==='draw'?1:0);
  const sc=res==='win'?1:res==='draw'?.5:0,ex=1/(1+Math.pow(10,(ai.elo-P.elo)/400));
  const K=P.elo<1800?32:16;
  P.elo=Math.max(0,Math.round(P.elo+K*(sc-ex)));
  P.bestElo=Math.max(P.bestElo||0,P.elo);
  if(res==='win'){P.streak=(P.streak||0)+1;P.bestS=Math.max(P.bestS||0,P.streak);}else P.streak=0;
  const base=15+AI.indexOf(ai)*6,cn=res==='win'?base:res==='draw'?Math.max(4,base*.4|0):4;
  P.coins+=cn;P.tc+=cn;
  toast('🪙',`+${cn} Couronnes • ELO ${P.elo}`,"vs "+ai.n);
  P.hist.unshift({d:Date.now(),op:ai.n,r:res,m:G.hist.length,elo:P.elo});
  if(P.hist.length>30)P.hist.length=30;
  checkTrophies();checkAch();svA();
}

// ── Logique Académie ────────────────────────────────────────
function startLsn(id){G.lsnMode=id;G.lsnIdx=0;G.lsnSt='wait';G.lsnFb='';const l=LESSONS.find(x=>x.id===id);if(l)G.lsnFen=l.steps[0].fen;G._ls=null;render();}

function tapLsn(sq){
  if(G.lsnSt==='success')return;
  const ls=LESSONS.find(l=>l.id===G.lsnMode);if(!ls)return;
  const s=ls.steps[G.lsnIdx];if(!s)return;
  const ch=new Chess(G.lsnFen);
  if(G._ls){
    try{const m=ch.move({from:G._ls,to:sq});if(m){
      if(G._ls===s.f&&sq===s.to){
        G.lsnFen=ch.fen();Au.move();vib();
        if(s.opp){setTimeout(()=>{const c2=new Chess(G.lsnFen);c2.move(s.opp);G.lsnFen=c2.fen();Au.move();G.lsnSt='success';G.lsnFb=`Excellent (${toFR(m.san)}) ! ${s.n}`;
          if(G.lsnIdx===ls.steps.length-1){Au.success();if(!PL.includes(ls.id)){PL.push(ls.id);P.totalLessonsDone=(P.totalLessonsDone||0)+1;P.coins+=15;P.tc+=15;toast('📖','+15 Couronnes','Leçon validée !');checkAch();svA();}}render();},450);}
        else{G.lsnSt='success';G.lsnFb=`Parfait (${toFR(m.san)}) ! ${s.n}`;if(G.lsnIdx===ls.steps.length-1){Au.success();if(!PL.includes(ls.id)){PL.push(ls.id);P.totalLessonsDone=(P.totalLessonsDone||0)+1;P.coins+=15;P.tc+=15;toast('📖','+15 Couronnes','Leçon validée !');checkAch();svA();}}}
        G._ls=null;render();return;}
      else{Au.error();vib(20);G.lsnSt='error';G.lsnFb=`${toFR(m.san)} est légal mais l'objectif est ${s.f}→${s.to}.`;G._ls=null;render();return;}}}catch(e){}
  }
  const p=ch.get(sq);if(p)G._ls=sq;render();
}
function lsnPrev(){if(G.lsnIdx>0){G.lsnIdx--;G.lsnSt='wait';G.lsnFb='';const l=LESSONS.find(x=>x.id===G.lsnMode);if(l)G.lsnFen=l.steps[G.lsnIdx].fen;G._ls=null;render();}}
function lsnNext(){const l=LESSONS.find(x=>x.id===G.lsnMode);if(l&&G.lsnIdx<l.steps.length-1){G.lsnIdx++;G.lsnSt='wait';G.lsnFb='';G.lsnFen=l.steps[G.lsnIdx].fen;G._ls=null;render();}}
function lsnReset(){const l=LESSONS.find(x=>x.id===G.lsnMode);if(l){G.lsnFen=l.steps[G.lsnIdx].fen;G.lsnSt='wait';G.lsnFb='';G._ls=null;render();}}
function lsnFin(){const l=LESSONS.find(x=>x.id===G.lsnMode);if(l){const i=LESSONS.indexOf(l);G.lsnMode=LESSONS[(i+1)%LESSONS.length].id;G.lsnIdx=0;G.lsnSt='wait';G.lsnFb='';G.lsnFen=LESSONS.find(x=>x.id===G.lsnMode).steps[0].fen;render();}}

function startPz(id){const p=PUZZLES.find(x=>x.id===id);if(!p)return;G.pzMode=id;G.pzIdx=0;G.pzFen=p.fen;G.pzSt='solving';G.pzHint=false;G.pzSel=null;render();}

function tapPz(sq){
  if(G.pzSt==='solved')return;
  const pz=PUZZLES.find(p=>p.id===G.pzMode);if(!pz)return;
  const ch=new Chess(G.pzFen),p=ch.get(sq);
  const st=pz.st[G.pzIdx];if(!st||!st.f)return;
  if(G.pzSel){
    const legal=ch.moves({square:G.pzSel,verbose:true});
    if(legal.some(m=>m.to===sq)){
      if(G.pzSel===st.f&&sq===st.t){
        ch.move({from:G.pzSel,to:sq});G.pzFen=ch.fen();G.pzSel=null;Au.move();vib();
        const last=G.pzIdx>=pz.st.filter(s=>s.f).length-1;
        if(last){G.pzSt='solved';Au.success();vib([8,40,8,40,16]);if(!PP.includes(pz.id)){PP.push(pz.id);P.totalPuzzlesSolved=(P.totalPuzzlesSolved||0)+1;P.puzzleStreak=(P.puzzleStreak||0)+1;P.bestPuzzleStreak=Math.max(P.bestPuzzleStreak||0,P.puzzleStreak);TE+=18;P.coins+=12;P.tc+=12;toast('🧩','+12 Couronnes','Puzzle résolu !');checkAch();svA();}}
        else{const nx=pz.st[G.pzIdx+1];if(nx&&nx.opp){setTimeout(()=>{const c2=new Chess(G.pzFen);c2.move(nx.opp);G.pzFen=c2.fen();G.pzIdx+=2;Au.move();render();},400);}else G.pzIdx++;}
        render();return;}
      else{Au.error();vib(20);G.pzSt='wrong';P.puzzleStreak=0;G.pzSel=null;render();return;}
    }
    if(p&&p.color===ch.turn()){G.pzSel=sq;}else G.pzSel=null;render();return;
  }
  if(p&&p.color===ch.turn()){G.pzSel=sq;render();}
}
function pzDemo(){const pz=PUZZLES.find(p=>p.id===G.pzMode);if(!pz)return;const s=pz.st[G.pzIdx];if(s&&s.f){tapPz(s.f);setTimeout(()=>tapPz(s.t),100);}}
function nextPz(){const i=PUZZLES.findIndex(p=>p.id===G.pzMode);startPz(PUZZLES[(i+1)%PUZZLES.length].id);}

// ── Évaluation ──────────────────────────────────────────────
function updateEv(){
  if(!G.game)return;const cp=ev(G.game),p=cp/100,pct=Math.max(4,Math.min(96,Math.round(50+(Math.max(-1000,Math.min(1000,cp))/1000)*45)));
  const sign=p>0?'+':'';const w=$('#efw');if(w)w.style.height=pct+'%';
  const lb=$('#el');if(lb)lb.textContent=G.game.in_checkmate()?(G.game.turn()==='w'?'-MAT':'MAT'):sign+p.toFixed(1);
}

// ── Chronomètre ─────────────────────────────────────────────
setInterval(()=>{if(!G.game||G.game.game_over()||G.tOut||G.resBy||!G.hist.length||!G.tLim)return;
  if(G.game.turn()==='w'){G.wTime=Math.max(0,G.wTime-1);if(G.wTime===0){G.tOut='b';reportR();render();}}
  else{G.bTime=Math.max(0,G.bTime-1);if(G.bTime===0){G.tOut='w';reportR();render();}}
  const cks=$$('.ck');if(cks.length>=2){cks[0].textContent='⏱ '+fmt(G.wTime);cks[1].textContent='⏱ '+fmt(G.bTime);}},1000);

// ── Sheet / Overlay helpers ─────────────────────────────────
function showDP(){
  const rec=recAI();
  const ov=document.createElement('div');ov.className='ov';
  ov.innerHTML=`<div class="sh"><div class="sh-h"></div><h3 class="cd-t mb2">Choisissez votre Adversaire</h3><p class="xs tm mb3">9 niveaux, de l'apprenti à la légende. Votre ELO actuel : <strong class="tg">${P.elo}</strong></p>${AI.map((a,i)=>{
    const isRec=i===rec;
    return`<button class="li ${isRec?'li-rec':''}" onclick="G.mode='ai';G.aiI=${i};G.aiPick=true;G.pColor='w';G.orient='w';startG();this.closest('.ov').remove()"><div style="width:40px;height:40px;border-radius:8px;background:${a.bc}30;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">🤖</div><div style="flex:1;min-width:0"><div class="fb"><span class="bold sm trunc">${a.n} ${isRec?'<span class="bg2 bg-n" style="margin-left:4px">Recommandé</span>':''}</span><span class="fm xs tg bold">${a.elo}</span></div><div class="xs tm">${a.t}</div></div><span style="color:var(--muted)">→</span></button>`;}).join('')}</div>`;
  ov.addEventListener('click',e=>{if(e.target===ov)ov.remove();});document.body.appendChild(ov);
}

function showHist(){
  const ov=document.createElement('div');ov.className='ov';
  ov.innerHTML=`<div class="sh"><div class="sh-h"></div><div class="fb mb3"><div><h3 class="cd-t">Feuille de Partie (FFE)</h3><div class="xs tm">${G.hist.length} coup(s)</div></div><button class="ib" onclick="this.closest('.ov').remove()">✕</button></div><div class="g3 mb3"><button class="btn btn-d btn-s" onclick="goStep(-1)">← Préc</button><button class="btn btn-d btn-s" onclick="goLive()">Direct</button><button class="btn btn-d btn-s" onclick="goStep(1)">Suiv →</button></div><div style="max-height:300px;overflow-y:auto">${G.hist.length?rMP():`<div class="tc xs tm" style="padding:20px">Aucun coup joué.</div>`}</div><button class="btn btn-g btn-f mt3" onclick="showDP();this.closest('.ov').remove()">Nouvelle Partie</button></div>`;
  ov.addEventListener('click',e=>{if(e.target===ov)ov.remove();});document.body.appendChild(ov);
}

function rMP(){let h='';for(let i=0;i<G.hist.length;i+=2){const n=i/2+1,w=G.hist[i],b=G.hist[i+1];h+=`<div class="mr"><div class="n">${n}.</div><button class="mv" onclick="goM(${i+1})">${w?.french||''}</button><button class="mv" onclick="goM(${i+2})">${b?.french||''}</button></div>`;}return h;}

function goM(i){if(i>=0&&i<G.fens.length){G.vIdx=i;const b=$('#brd');if(b)b.innerHTML=rBoard(G.fens[i]);updateEv();}}
function goStep(d){goM(Math.max(0,Math.min(G.fens.length-1,G.vIdx+d)));}
function goLive(){goM(G.fens.length-1);}

function showPromo(fr,to){
  const ov=document.createElement('div');ov.className='ov c';
  const col=G.game.turn();
  ov.innerHTML=`<div class="pr-b"><div class="xs" style="text-transform:uppercase;letter-spacing:1px;color:var(--gold);font-weight:700">Couronnement</div><h4 class="font-serif lg mt2" style="font-family:'Cormorant Garamond',serif;margin-top:8px;margin-bottom:4px">Choisissez votre pièce</h4><div class="pr-g">${[{t:'q',l:'Dame'},{t:'r',l:'Tour'},{t:'b',l:'Fou'},{t:'n',l:'Cavalier'}].map(x=>`<button class="pr-c" onclick="doMove('${fr}','${to}','${x.t}');this.closest('.ov').remove()">${pSVG(x.t,col)}<span>${x.l}</span></button>`).join('')}</div></div>`;
  document.body.appendChild(ov);
}

function editName(){
  const ov=document.createElement('div');ov.className='ov c';
  ov.innerHTML=`<div class="pr-b" style="padding:20px"><h4 class="font-serif lg mb2" style="font-family:'Cormorant Garamond',serif">Votre Nom</h4><input type="text" id="ni" value="${P.name}" maxlength="28"><button class="btn btn-g btn-f mt3" onclick="P.name=document.getElementById('ni').value.trim()||P.name;svA();if(SB.user)SB.pushCosmetics();this.closest('.ov').remove();render()">Valider</button></div>`;
  document.body.appendChild(ov);setTimeout(()=>document.getElementById('ni')?.focus(),100);
}

function claimD(){if(P.ld===new Date().toDateString())return;P.ld=new Date().toDateString();P.coins+=25;P.tc+=25;toast('🎁','Bonus quotidien','+25 🪙 !');checkAch();svA();render();}

function buy(id){const it=SHOP.find(s=>s.id===id);if(!it||P.coins<it.p)return;P.coins-=it.p;P.owned.push(id);vib([8,40,8]);Au.success();toast('🛍️','Article acquis !',it.nm);svA();render();}
function equip(id){const it=SHOP.find(s=>s.id===id);if(!it)return;const n=+id.slice(1);if(it.cat==='board')P.bt=it.th;else if(it.cat==='piece')P.pt=it.pidx||0;else if(it.cat==='avatar'){P.avI=n;if(SB.user)SB.pushCosmetics();}else if(it.cat==='title')P.tiI=n;vib();Au.move();svA();render();}

function toast(ic,t,s){const el=document.createElement('div');el.className='tst';el.innerHTML=`<span class="tst-i">${ic}</span><div><div class="tst-t">${t}</div>${s?`<div class="tst-s">${s}</div>`:''}</div>`;const tw=$('#tw');if(tw){tw.appendChild(el);setTimeout(()=>el.remove(),4200);}}

function checkAch(){ACHS.forEach(a=>{if(!P.ach.includes(a.id)&&a.fn()){P.ach.push(a.id);P.coins+=a.cn;P.tc+=a.cn;toast('🏆',`Succès : ${a.nm}`,`+${a.cn} 🪙`);}});}

function rTut(){return`<div class="ov c" id="tut"><div class="pr-b" style="padding:20px;max-width:360px;text-align:left"><h3 class="font-serif xl mb3 tc" style="font-family:'Cormorant Garamond',serif">🎓 Bienvenue !</h3><div class="sm tm" style="line-height:1.6"><p class="mb2"><strong class="tg">📱 Jouer :</strong> Touchez une pièce puis la destination.</p><p class="mb2"><strong class="tg">💡 Indice :</strong> Le bouton bleu vous guide.</p><p class="mb2"><strong class="tg">🪙 Couronnes :</strong> Gagnez-en en jouant.</p><p class="mb2"><strong class="tg">🛍️ Boutique :</strong> Personnalisez votre Salon.</p></div><button class="btn btn-g btn-f mt3" onclick="tutS=true;sv('er2_tut',true);document.getElementById('tut').remove();G.showTut=false;">Compris !</button></div></div>`;}
function openHelp(){const ov=document.createElement('div');ov.className='ov c';ov.innerHTML=rTut().replace('id="tut"','id="help"').replace('Bienvenue !','Comment jouer ?').replace("tutS=true;sv('er2_tut',true);document.getElementById('tut').remove();G.showTut=false;","document.getElementById('help').remove();");document.body.appendChild(ov);}

// ── Démarrage ───────────────────────────────────────────────
checkTrophies();svA();
SB.init(); // sans effet si SUPABASE_URL / SUPABASE_ANON ne sont pas renseignés
render();