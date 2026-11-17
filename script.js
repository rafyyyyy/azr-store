// === SETTING PENTING - GANTI DISINI AJA ===
const ADMIN_PASS = "AZR17";
const NOMOR_WA = "6285864639077";
// ============================================

let akunList = JSON.parse(localStorage.getItem('azr_akun')) || [
  {game:"Free Fire",nama:"Akun FF - Elite Heroic",spek:"Level 70 • 120 Skin • 15 Emote",harga:"450000",foto:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600",status:"READY"},
  {game:"Mobile Legends",nama:"Akun ML - Mythic 50 Stars",spek:"Role Assassin & Mage • 80 Skin Epic • WR 65%",harga:"800000",foto:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600",status:"READY"},
  {game:"PUBG Mobile",nama:"Akun PUBG - Conqueror",spek:"UC 3000 • Outfit Rare • Level 65",harga:"1200000",foto:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600",status:"TERJUAL"}
];

let testiList = JSON.parse(localStorage.getItem('azr_testi')) || [
  {nama:"Raka, Pembeli FF",pesan:"Akun FF yang saya beli aman dan proses cepat, admin responsif!",bintang:5},
  {nama:"Sari, Pembeli ML",pesan:"ML akun sesuai deskripsi, legit dan terpercaya. Recommended AZR STORE!",bintang:5},
  {nama:"Dimas, Pembeli PUBG",pesan:"PUBG akun bagus, harga bersaing. Pelayanan ramah!",bintang:5}
];

let isAdmin = localStorage.getItem('azr_admin')==='1';

function save(){
  localStorage.setItem('azr_akun',JSON.stringify(akunList));
  localStorage.setItem('azr_testi',JSON.stringify(testiList));
}
function formatRp(n){return "Rp "+Number(n).toLocaleString('id-ID')}

function renderAkun(){
  document.getElementById('listAkun').innerHTML = akunList.map((a,i)=>`
  <div class="card">
    <img src="${a.foto}">
    <div class="card-body">
      <span class="badge ${a.status=='READY'?'ready':'sold'}">${a.status}</span>
      <h3>${a.game}</h3>
      <p><b>${a.nama}</b><br>${a.spek}</p>
      <div class="price">${formatRp(a.harga)}</div>
      <button class="btn" style="width:100%;margin-top:10px" onclick="beli('${a.nama}')">Beli Sekarang</button>
      ${isAdmin?`<button class="btn-outline" style="width:100%;margin-top:6px" onclick="hapusAkun(${i})">Hapus (Admin)</button><button class="btn-outline" style="width:100%;margin-top:6px" onclick="ubahStatus(${i})">Ubah Status READY/TERJUAL</button>`:''}
    </div>
  </div>`).join('');
}

function renderTesti(){
  document.getElementById('listTesti').innerHTML = testiList.map((t,i)=>`
  <div class="testi-card">
    <div class="stars">${'★'.repeat(t.bintang)}${'☆'.repeat(5-t.bintang)}</div>
    <p style="margin:8px 0">"${t.pesan}"</p>
    <b style="color:#e8c872">${t.nama}</b>
    ${isAdmin?`<br><button class="btn-outline" style="margin-top:8px" onclick="hapusTesti(${i})">Hapus (Admin)</button>`:''}
  </div>`).join('');
}

function openLogin(){document.getElementById('loginModal').style.display='flex'}
function closeLogin(){document.getElementById('loginModal').style.display='none'}

function login(){
  if(document.getElementById('passInput').value===ADMIN_PASS){
    isAdmin=true;localStorage.setItem('azr_admin','1');closeLogin();checkAdmin();alert('Login berhasil! Panel admin terbuka.');
  } else alert('Password salah!');
}
function logout(){isAdmin=false;localStorage.removeItem('azr_admin');checkAdmin();}

function checkAdmin(){
  document.getElementById('adminPanel').style.display = isAdmin?'block':'none';
  renderAkun();renderTesti();
}

function tambahAkun(){
  let foto=document.getElementById('fotoAkun').value||"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600";
  akunList.unshift({game:document.getElementById('gameInput').value,nama:document.getElementById('namaAkun').value,spek:document.getElementById('spekAkun').value,harga:document.getElementById('hargaAkun').value,foto:foto,status:"READY"});
  save();checkAdmin();alert('Akun berhasil ditambah!');
}

function tambahTesti(){
  testiList.unshift({nama:document.getElementById('namaTesti').value,pesan:document.getElementById('pesanTesti').value,bintang:Number(document.getElementById('bintangTesti').value)});
  save();checkAdmin();alert('Testimoni berhasil ditambah!');
}

function hapusAkun(i){akunList.splice(i,1);save();checkAdmin();}
function hapusTesti(i){testiList.splice(i,1);save();checkAdmin();}
function ubahStatus(i){akunList[i].status=akunList[i].status=='READY'?'TERJUAL':'READY';save();checkAdmin();}

function beli(nama){
  window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent('Halo AZR STORE, saya mau beli: '+nama)}`,'_blank');
}

checkAdmin();