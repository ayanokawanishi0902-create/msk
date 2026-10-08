//==================== ハンバーガーメニューの開閉　===============
// 1. 操作したい要素を取得する
const navBtn = document.getElementById('nav-btn');
const mainNav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('.main-nav a');

// 2. ボタンをクリックした時の動きを決める
navBtn.addEventListener('click', () => {
  // メニュー本体の表示・非表示を切り替える
  mainNav.classList.toggle('is-open');
  
  // ボタン自体の形（三本線 ⇄ ×）を切り替える
  navBtn.classList.toggle('is-open');
});

// 3. リンクをクリックした時にメニューを閉じる処理を追加
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // クラスを削除してメニューを閉じ、ボタンを三本線に戻す
    mainNav.classList.remove('is-open');
    navBtn.classList.remove('is-open');
  });
});


//==================== TOPに戻るボタンの出現　===============
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) { // 400px以上スクロールしたら
    backToTop.classList.add('is-show');
  } else {
    backToTop.classList.remove('is-show');
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const workThumbs = document.querySelectorAll('.work-thumb');
  const modal = document.getElementById('worksModal');
  if (!modal) return;

  const modalOverlay = modal.querySelector('.modal-overlay');
  const modalClose = modal.querySelector('.modal-close');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');

  // 作品タップでモーダルを開く
  workThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const imgSrc = thumb.getAttribute('data-img');
      const title = thumb.getAttribute('data-title');
      const desc = thumb.getAttribute('data-desc');

      modalImg.src = imgSrc;
      modalTitle.textContent = title;
      modalDesc.innerHTML = desc;

      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden'; // 背後スクロール防止
    });
  });

  // モーダルを閉じる
  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
});