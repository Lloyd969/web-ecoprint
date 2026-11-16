const motifList = [
  {name:'Ranting Senja',image:'images/ranting-senja.jpg',video:'videos/ranting-senja.mp4',plant:'Daun jati',description:'Daun jati meninggalkan bentuk urat yang tegas dengan rona cokelat kemerahan. Susunan rantingnya memberi kesan hangat seperti cahaya sore. Daun disusun di atas kain sebelum dikukus agar bentuk dan pigmen alaminya berpindah.',facts:'Daun: jati · Karakter: urat tegas dan warna bumi · Setiap susunan cetak berbeda.'},
  {name:'Kembang Pagi',image:'images/kembang-pagi.jpg',video:'videos/kembang-pagi.mp4',plant:'Daun jarak dan bunga',description:'Perpaduan daun jarak dan bunga kecil menghasilkan siluet bundar yang lembut. Warna merah bata dan hijau alami membuat motif ini terasa ceria. Susunan bunga dilakukan satu per satu sebelum kain dikukus.',facts:'Daun dan bunga: jarak, bunga taman · Karakter: bentuk bundar dan warna lembut.'},
  {name:'Jejak Pakis',image:'images/jejak-pakis.jpg',video:'videos/jejak-pakis.mp4',plant:'Daun pakis',description:'Daun pakis menghadirkan pola berulang yang mengalir seperti tumbuh di tepi hutan. Urat daunnya tercetak sebagai detail alami dengan bentuk yang tidak seragam.',facts:'Daun: pakis · Karakter: pola berulang dan memanjang · Warna berasal dari proses ecoprint.'},
  {name:'Mekar Liar',image:'images/mekar-liar.jpg',video:'videos/mekar-liar.mp4',plant:'Daun eucalyptus',description:'Daun eucalyptus menghasilkan bentuk bulat lonjong dengan nuansa hijau zaitun. Daun ditata spontan agar komposisi motif pada setiap totebag memiliki karakter sendiri.',facts:'Daun: eucalyptus · Karakter: bentuk bulat lonjong dan warna hijau zaitun.'},
  {name:'Daun Teduh',image:'images/daun-teduh.jpg',video:'videos/daun-teduh.mp4',plant:'Daun monstera',description:'Satu daun monstera menjadi pusat perhatian dengan bentuk lebar dan belahan khas. Ruang kosong di sekelilingnya menonjolkan siluet daun dan tekstur kain.',facts:'Daun: monstera · Karakter: satu bentuk daun lebar dengan komposisi lapang.'},
  {name:'Kebun Kecil',image:'images/kebun-kecil.jpg',video:'videos/kebun-kecil.mp4',plant:'Daun dan bunga kebun',description:'Kolase daun dan bunga kecil mengingatkan pada kebun di pagi hari. Bentuk-bentuknya ditata dengan tangan, tanpa pola cetak berulang.',facts:'Daun dan bunga: pilihan dari kebun · Karakter: kolase spontan dengan warna bumi.'}
];
const requestedName = new URLSearchParams(window.location.search).get('motif');
const motif = motifList.find(item => item.name === requestedName) || motifList[0];
document.title = `${motif.name} — Rona Rimba`;
document.querySelector('#motifTitle').textContent = motif.name;
document.querySelector('#motifPlant').textContent = motif.plant;
document.querySelector('#motifDescription').textContent = motif.description;
document.querySelector('#motifFacts').textContent = motif.facts;
const motifImage = document.querySelector('#motifImage');
motifImage.src = motif.image;
motifImage.alt = `Totebag ecoprint ${motif.name} dengan motif ${motif.plant}`;
const video = document.querySelector('#processVideo');
const toggle = document.querySelector('#videoToggle');
const message = document.querySelector('#videoMessage');
video.src = motif.video;
video.loop = true;
video.muted = true;
video.playsInline = true;
function updateVideoButton(){toggle.textContent = video.paused ? '▶' : 'Ⅱ';toggle.setAttribute('aria-label',video.paused ? 'Putar video' : 'Jeda video')}
toggle.addEventListener('click',()=>{if(video.paused){video.play().catch(()=>{message.textContent='Tekan tombol putar untuk melihat video.'})}else{video.pause()}updateVideoButton()});
video.addEventListener('play',updateVideoButton);
video.addEventListener('pause',updateVideoButton);
video.addEventListener('error',()=>{message.textContent=`Tambahkan video ${motif.video} ke folder geografi.`;toggle.textContent='▶';toggle.setAttribute('aria-label','Video belum tersedia')});
video.play().then(updateVideoButton).catch(()=>{message.textContent='Tekan tombol putar untuk memulai video.';updateVideoButton()});
