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


//==================== 作品モーダル表示　===============
document.addEventListener('DOMContentLoaded', () => {
  const workThumbs = document.querySelectorAll('.work-thumb');
  const modal = document.getElementById('worksModal');
  if (!modal) return;

  const modalOverlay = modal.querySelector('.modal-overlay');
  const modalClose = modal.querySelector('.modal-close');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');

  const sliderWrap = modal.querySelector('.modal-slider-wrap');
  const btnPrev = document.getElementById('sliderPrev');
  const btnNext = document.getElementById('sliderNext');
  const dotsContainer = document.getElementById('sliderDots');

  let currentImages = [];
  let currentIndex = 0;

  // 指定インデックスの画像を表示・表示更新
  const updateSlide = (index) => {
    currentIndex = index;
    modalImg.style.opacity = '0';
    setTimeout(() => {
      modalImg.src = currentImages[currentIndex];
      modalImg.style.opacity = '1';
    }, 150);

    // ドットの更新
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === currentIndex);
    });
  };

  // 作品タップ時
  workThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const rawImg = thumb.getAttribute('data-img') || '';
      currentImages = rawImg.split(',').map(s => s.trim()).filter(Boolean);
      currentIndex = 0;

      const title = thumb.getAttribute('data-title');
      const desc = thumb.getAttribute('data-desc');

      // 1枚のみの場合は矢印やドットを隠す
      if (currentImages.length <= 1) {
        sliderWrap.classList.add('single-image');
      } else {
        sliderWrap.classList.remove('single-image');
      }

      // ドット生成
      dotsContainer.innerHTML = '';
      currentImages.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (idx === 0) dot.classList.add('is-active');
        dot.addEventListener('click', () => updateSlide(idx));
        dotsContainer.appendChild(dot);
      });

      modalImg.src = currentImages[0] || '';
      modalTitle.textContent = title;
      modalDesc.innerHTML = desc;

      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  });


  // ==========================================
  // スマホ用スワイプ（フリック）操作の実装
  // ==========================================
  let touchStartX = 0;
  let touchEndX = 0;

  const imageWrap = modal.querySelector('.modal-image-wrap');

  // タッチ開始時のX座標を取得
  imageWrap.addEventListener('touchstart', (e) => {
    if (currentImages.length <= 1) return; // 1枚のみの場合は処理しない
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  // タッチ終了時のX座標を取得して判定
  imageWrap.addEventListener('touchend', (e) => {
    if (currentImages.length <= 1) return; // 1枚のみの場合は処理しない
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  // スワイプ方向の判定とスライド移動
  const handleSwipe = () => {
    const swipeThreshold = 40; // スワイプと判定する最小距離（px）

    // 左へスワイプ（次の画像へ）
    if (touchStartX - touchEndX > swipeThreshold) {
      const newIndex = (currentIndex + 1) % currentImages.length;
      updateSlide(newIndex);
    }

    // 右へスワイプ（前の画像へ）
    if (touchEndX - touchStartX > swipeThreshold) {
      const newIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      updateSlide(newIndex);
    }
  };


  // 矢印ボタンイベント
  btnPrev.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateSlide(newIndex);
  });

  btnNext.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % currentImages.length;
    updateSlide(newIndex);
  });

  // 閉じる処理
  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft' && currentImages.length > 1) {
      const newIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      updateSlide(newIndex);
    }
    if (e.key === 'ArrowRight' && currentImages.length > 1) {
      const newIndex = (currentIndex + 1) % currentImages.length;
      updateSlide(newIndex);
    }
  });
});