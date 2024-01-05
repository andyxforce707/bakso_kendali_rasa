const hide = document.getElementById('hide');
// buat fungsi fetch semua menu data dari database
async function getAllMenu(url, container) {
  try {
    const data = await fetch(url);
    const response = await data.json();
    // console.log(response);
    container.innerHTML = showAllMenu(response);
  } catch (error) {
    console.log('Error');
  }
}

// tampilkan semua menu
function showAllMenu(obj) {
  let fragment = ``;
  for (let val in obj) {
    obj[val].forEach((objval) => {
      fragment += `<div class="menu-box">
        <img src="${objval.gambar}" class="icon">
        <h3>${objval.nama}</h3>
        <p>Rp.${objval.harga}</p>
        <div class="buttons">
        <button class="detail btn" data-id="${objval.id}" data-jenis="${objval.id_jenis}">Detail</button><a href="https://wa.me/082135555343?text=Saya mau beli nih...(${objval.nama}).Bisa share info lebih lanjut?" class="beli btn a" data-id="${objval.id}" data-jenis="${objval.id_jenis}">Beli</a>
        </div>       
    </div>`;
    });
  }
  return fragment;
}

const content = document.getElementById('content');
const semuaMenu = document.querySelector('.semua-menu');
// jalankan fungsi fetch data all menu
getAllMenu('database/menu.json', content);
semuaMenu.addEventListener('click', function () {
  this.classList.add('active');
  makanan.classList.remove('active');
  minuman.classList.remove('active');
  hide.innerHTML = '';
  getAllMenu('database/menu.json', content);
});

// buat fungsi fetch menu makanan dari database
async function getMakanan(url, container) {
  try {
    const data = await fetch(url);
    const response = await data.json();
    // console.log(response);
    container.innerHTML = showMakanan(response.makanan);
  } catch (error) {
    console.log('Error');
  }
}

// tampilkan menu makanan
function showMakanan(arr) {
  let fragment = ``;
  arr.forEach((val) => {
    fragment += `<div class="menu-box">
          <img src="${val.gambar}" class="icon">
          <h3>${val.nama}</h3>
          <p>Rp.${val.harga}</p>
          <div class="buttons">
          <button class="detail btn" data-id="${val.id}" data-jenis="${val.id_jenis}">Detail</button>
          <a href="https://wa.me/082135555343?text=Saya mau beli nih...(${val.nama}). Bisa share info lebih lanjut?" class="beli btn a" data-id="${val.id}" data-jenis="${val.id_jenis}">Beli</a>
          </div>
      </div>`;
  });
  return fragment;
}

const makanan = document.querySelector('.makanan');
// jalankan fungsi fetch data all menu makanan
makanan.addEventListener('click', function () {
  this.classList.add('active');
  semuaMenu.classList.remove('active');
  minuman.classList.remove('active');
  hide.innerHTML = '';
  getMakanan('database/menu.json', content);
});

/* */
// buat fungsi fetch menu minuman dari database
async function getMinuman(url, container) {
  try {
    const data = await fetch(url);
    const response = await data.json();
    // console.log(response);
    container.innerHTML = showMinuman(response.minuman);
  } catch (error) {
    console.log('Error');
  }
}

// tampilkan menu minuman
function showMinuman(arr) {
  let fragment = ``;
  arr.forEach((val) => {
    fragment += `<div class="menu-box">
            <img src="${val.gambar}" class="icon">
            <h3>${val.nama}</h3>
            <p>Rp.${val.harga}</p>
            <div class="buttons">
            <button class="detail btn" data-id="${val.id}" data-jenis="${val.id_jenis}">Detail</button>
            <a href="https://wa.me/082135555343?text=Saya mau beli nih...(${val.nama}). Bisa share info lebih lanjut?" class="beli btn a" data-id="${val.id}" data-jenis="${val.id_jenis}">Beli</a>
            </div>
        </div>`;
  });
  return fragment;
}

const minuman = document.querySelector('.minuman');
// jalankan fungsi fetch data all menu minuman
minuman.addEventListener('click', function () {
  this.classList.add('active');
  semuaMenu.classList.remove('active');
  makanan.classList.remove('active');
  hide.innerHTML = '';
  getMinuman('database/menu.json', content);
});

// tombol detail
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('detail') && e.target.dataset.jenis == 'makanan') {
    hide.innerHTML = '';
    hide.classList.remove('active');
    const id = e.target.dataset.id;
    const data = fetch('database/menu.json');
    data
      .then((response) => response.json())
      .then((result) => {
        let fragment = `<div class="hide-detail">
                <div class="detail-image"><img src="${result.makanan[id].gambar}" class="image"></div>
                <p class="text">Nama : ${result.makanan[id].nama.toUpperCase()}</p>
                <p class="text">Harga : Rp.${result.makanan[id].harga}</p>
                <p class="text">Kategori : ${result.makanan[id].id_jenis}</p>
                <p class="text">Keterangan : ${result.makanan[id].keterangan}</p>
                <span class="close">&cross;<span>
        </div>`;
        hide.innerHTML = fragment;
        hide.classList.add('active');
        const cross = document.querySelector('.close');
        cross.addEventListener('click', function () {
          hide.classList.remove('active');
        });
      });
  } else if (e.target.classList.contains('detail') && e.target.dataset.jenis == 'minuman') {
    hide.innerHTML = '';
    hide.classList.remove('active');
    const id = e.target.dataset.id;
    const data = fetch('database/menu.json');
    data
      .then((response) => response.json())
      .then((result) => {
        let fragment = `<div class="hide-detail">
                <div class="detail-image"><img src="${result.minuman[id].gambar}" class="image"></div>
                <p class="text">Nama : ${result.minuman[id].nama.toUpperCase()}</p>
                <p class="text">Harga : Rp.${result.minuman[id].harga}</p>
                <p class="text">Kategori : ${result.minuman[id].id_jenis}</p>
                <p class="text">Keterangan : ${result.minuman[id].keterangan}</p>
                <span class="close">&cross;<span>
        </div>`;
        const hide = document.getElementById('hide');
        hide.innerHTML = fragment;
        hide.classList.add('active');
        const cross = document.querySelector('.close');
        cross.addEventListener('click', function () {
          hide.classList.remove('active');
        });
      });
  } else {
    console.log('Document does not target anything!');
  }
});

// logic scroll element
const menu = document.querySelector('.menu');
const footer = document.querySelector('.footer');
document.addEventListener('scroll', function () {
  if (window.scrollY > window.innerHeight - 50 || window.scrollY > window.innerHeight) {
    footer.classList.add('reach');
  } else {
    footer.classList.remove('reach');
  }

  if (window.scrollY > 200) {
    menu.classList.add('reach');
  } else {
    menu.classList.remove('reach');
  }
});

const closeGreet = document.querySelector('.close-greet');
const greets = document.getElementById('greet');
closeGreet.addEventListener('click', function () {
  this.parentElement.style.display = 'none';
});
