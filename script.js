const products = [
  {name:'Ranting Senja',image:'images/ranting-senja.jpg',plant:'Daun jati',category:'Botani',symbol:'❋',flower:'#997451',flower2:'#84916b',bg:'linear-gradient(145deg,#d4d8c5,#b2c0a6)',description:'Daun jati meninggalkan bentuk urat yang tegas dengan rona cokelat kemerahan. Polanya terasa hangat seperti cahaya sore dan cocok untuk menemani aktivitas sehari-hari.',detail:'Daun: jati · Karakter: urat tegas, warna bumi · Tiap cetakan memiliki susunan yang berbeda.'},
  {name:'Kembang Pagi',image:'images/kembang-pagi.jpg',plant:'Daun jarak & bunga',category:'Bunga',symbol:'✿',flower:'#b36d62',flower2:'#87936a',bg:'linear-gradient(135deg,#e5d5c7,#c9c9b0)',description:'Perpaduan daun jarak dan bunga kecil memberi siluet bundar yang lembut. Warna merah bata dan hijau alami membuat motifnya terasa ceria.',detail:'Daun dan bunga: jarak, bunga taman · Karakter: bentuk bundar, warna lembut · Disusun manual sebelum dikukus.'},
  {name:'Jejak Pakis',image:'images/jejak-pakis.jpg',plant:'Daun pakis',category:'Botani',symbol:'❧',flower:'#587954',flower2:'#a98159',bg:'linear-gradient(135deg,#dce1d1,#b5c0a2)',description:'Daun pakis menghadirkan pola berulang yang mengalir seperti tumbuh di tepi hutan. Jejak tulang daunnya memberi detail yang khas.',detail:'Daun: pakis · Karakter: pola berulang dan memanjang · Warna muncul dari pigmen daun dan proses ecoprint.'},
  {name:'Mekar Liar',image:'images/mekar-liar.jpg',plant:'Daun eucalyptus',category:'Bunga',symbol:'❀',flower:'#a96250',flower2:'#7f9167',bg:'linear-gradient(135deg,#e3d8c8,#c9c3aa)',description:'Daun eucalyptus menghasilkan bentuk bulat lonjong dengan nuansa hijau zaitun. Tata letaknya dibiarkan spontan agar setiap tas punya komposisi sendiri.',detail:'Daun: eucalyptus · Karakter: bentuk bulat lonjong, hijau zaitun · Motif dibuat satu per satu.'},
  {name:'Daun Teduh',image:'images/daun-teduh.jpg',plant:'Daun monstera',category:'Minimal',symbol:'♧',flower:'#617b54',flower2:'#84906d',bg:'linear-gradient(135deg,#d7dfd0,#b6c2af)',description:'Satu daun monstera menjadi pusat perhatian dengan bentuk lebar dan belahan khas. Pilihan sederhana untuk yang menyukai motif yang lapang.',detail:'Daun: monstera · Karakter: satu bentuk daun lebar dengan ruang kosong · Tata letak tiap karya tetap unik.'},
  {name:'Kebun Kecil',image:'images/kebun-kecil.jpg',plant:'Daun & bunga kebun',category:'Botani',symbol:'❁',flower:'#a47858',flower2:'#778764',bg:'linear-gradient(135deg,#ddd8c4,#bdc4a9)',description:'Kolase daun dan bunga kecil mengingatkan pada kebun di pagi hari. Bentuk-bentuknya disusun dengan tangan tanpa pola cetak berulang.',detail:'Daun dan bunga: pilihan dari kebun · Karakter: kolase spontan dengan warna bumi · Satu-satunya untuk setiap tas.'}
];
const grid = document.querySelector('#productGrid');
const dialog = document.querySelector('#motifDialog');
function renderProducts(){
  grid.innerHTML = products.map((p,i)=>`<article class="product-card">
    <div class="product-media-row">
      <button class="product-photo" type="button" data-index="${i}" aria-label="Lihat detail ${p.name}" style="--bg:${p.bg};--flower:${p.flower};--flower2:${p.flower2}">
        <img class="product-image" src="${p.image}" alt="Totebag ecoprint ${p.name}" onerror="this.hidden=true"><span class="product-bag"><span>${p.symbol}</span></span>
      </button>
      <button class="motif-button" type="button" data-index="${i}" aria-label="Informasi motif ${p.name}">i&nbsp; Motif</button>
    </div>
    <div class="product-meta"><div><h3>${p.name}</h3><small>${p.plant} · Kanvas katun</small></div></div>
  </article>`).join('');
  grid.querySelectorAll('.motif-button,.product-photo').forEach(button=>button.addEventListener('click',()=>{const p=products[Number(button.dataset.index)];window.location.href='motif.html?motif='+encodeURIComponent(p.name)}));
}
renderProducts();

// Model totebag prosedural dengan proyeksi perspektif; bisa diputar horizontal dengan mouse atau sentuhan.
const canvas=document.querySelector('#bag3d');
const ctx=canvas.getContext('2d');
const viewer=canvas.parentElement;
let yaw=-0.34,dragging=false,lastX=0,raf=0;
function resizeCanvas(){const rect=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);drawBag()}
function project(point){const [x,y,z]=point,c=Math.cos(yaw),s=Math.sin(yaw),xr=x*c+z*s,zr=-x*s+z*c;const depth=6.5/(6.5+zr),scale=Math.min(canvas.clientWidth,canvas.clientHeight)*.42;return [canvas.clientWidth/2+xr*scale*depth,canvas.clientHeight*.53-y*scale*depth]}
function path(points,fill,stroke='#a99b7e',width=1){ctx.beginPath();points.forEach((point,i)=>{const [x,y]=project(point);if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)});ctx.closePath();ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke()}
function line(points,color,width){ctx.beginPath();points.forEach((point,i)=>{const [x,y]=project(point);if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)});ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.stroke()}
function drawLeaf(x,y,z,scale,color){const points=[];for(let i=0;i<=24;i++){const t=i/24*Math.PI*2;points.push([x+Math.cos(t)*scale,y+Math.sin(t)*scale*.53,z])}path(points,color,color,.7);line([[x-scale*.82,y,z+.01],[x+scale*.82,y,z+.01]],'#e2d9bd',1.3);for(let k=-2;k<=2;k++){const xx=x+k*scale*.25;line([[xx,y,z+.02],[xx-scale*.14,y+scale*.19,z+.02]],'#d8d0af',.7)}}
function drawBag(){if(!canvas.clientWidth||!canvas.clientHeight)return;const w=canvas.clientWidth,h=canvas.clientHeight;ctx.clearRect(0,0,w,h);const frontZ=.34,backZ=-.34;
  // Subtle ambient shadow.
  const shadow=ctx.createRadialGradient(w/2,h*.82,3,w/2,h*.82,w*.22);shadow.addColorStop(0,'#43513b38');shadow.addColorStop(1,'#43513b00');ctx.fillStyle=shadow;ctx.fillRect(w*.2,h*.72,w*.6,h*.18);  // Handle rises above the bag and remains visible while the model turns.
  const handle=[];for(let i=0;i<=28;i++){const t=i/28*Math.PI;handle.push([-.52+1.04*i/28,1.43+Math.sin(t)*.9,.02])}line(handle,'#b5a786',13);line(handle,'#eee2c6',9);
  const front=[[-1.15,1.22,frontZ],[1.15,1.22,frontZ],[1.08,-1.18,frontZ],[-1.08,-1.18,frontZ]];
  const back=[[-1.15,1.22,backZ],[1.15,1.22,backZ],[1.08,-1.18,backZ],[-1.08,-1.18,backZ]];
  path(back,'#bba989','#95866a',1);path([[-1.15,1.22,backZ],[1.15,1.22,backZ],[1.15,1.22,frontZ],[-1.15,1.22,frontZ]],'#e9dfc8','#a99b7e',1);
  path([[-1.15,1.22,frontZ],[-1.15,1.22,backZ],[-1.08,-1.18,backZ],[-1.08,-1.18,frontZ]],'#cbbc9e','#9d8e70',1);
  path([[1.15,1.22,backZ],[1.15,1.22,frontZ],[1.08,-1.18,frontZ],[1.08,-1.18,backZ]],'#c9b999','#9d8e70',1);
  path(front,'#e9dfc8','#9f9277',1.4);
  drawLeaf(-.48,.36,frontZ+.012,.28,'#71845e');drawLeaf(.39,-.13,frontZ+.012,.34,'#a87658');drawLeaf(-.2,-.65,frontZ+.012,.23,'#8a9569');
  line([[-.95,1.05,frontZ+.015],[.95,1.05,frontZ+.015]],'#d0c4a8',1);

}
function pointerDown(event){dragging=true;lastX=event.clientX;canvas.setPointerCapture(event.pointerId)}
function pointerMove(event){if(!dragging)return;const dx=event.clientX-lastX;lastX=event.clientX;yaw+=dx*.012;cancelAnimationFrame(raf);raf=requestAnimationFrame(drawBag)}
function pointerUp(){dragging=false}
canvas.addEventListener('pointerdown',pointerDown);canvas.addEventListener('pointermove',pointerMove);canvas.addEventListener('pointerup',pointerUp);canvas.addEventListener('pointercancel',pointerUp);window.addEventListener('resize',resizeCanvas);resizeCanvas();






