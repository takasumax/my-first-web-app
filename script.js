/* === スクロール時のフェードイン演出 === */

// 1. フェードインさせたい要素（js-fadeクラスを持つもの）をすべて取得
const fadeElements = document.querySelectorAll('.js-fade');

// 2. フェードイン処理を実行する関数
const handleFade = () => {
  // すべてのフェードイン対象要素に対して処理を繰り返す
  fadeElements.forEach((element) => {
    // 要素が画面の上端からどれくらいの位置にあるかを取得
    const elementTop = element.getBoundingClientRect().top;
    
    // 画面の高さの約80%（少し余裕を持たせる）の位置を計算
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.8;

    // 要素がその位置よりも上（画面内）に入ったら
    if (elementTop < triggerPoint) {
      // CSSの「is-visible」クラスを追加して表示させる
      element.classList.add('is-visible');
    }
  });
};

// 3. 画面の読み込み完了時と、スクロール時に handleFade 関数を実行
window.addEventListener('load', handleFade); // ページが開いた瞬間の表示
window.addEventListener('scroll', handleFade); // スクロールするたびの表示


/* === スライドショーの制御 === */
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

const nextSlide = () => {
  // 現在のスライドからクラスを外す
  slides[currentIndex].classList.remove('is-active');
  
  // 次のインデックスを計算（最後まできたら0に戻る）
  currentIndex = (currentIndex + 1) % slides.length;
  
  // 次のスライドにクラスを付ける
  slides[currentIndex].classList.add('is-active');
};

// 5000ミリ秒（5秒）おきに実行
setInterval(nextSlide, 5000);


/* === お問い合わせフォームの送信シミュレーション === */
const contactForm = document.getElementById('cafe-contact-form');
const thanksMessage = document.getElementById('form-thanks');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // ページのリロードを防ぐ
    e.preventDefault();
    
    // フォームを消して、お礼メッセージを表示
    contactForm.style.opacity = '0';
    setTimeout(() => {
      contactForm.style.display = 'none';
      thanksMessage.style.display = 'block';
      // お礼メッセージをふわっと出す
      thanksMessage.style.opacity = '1';
    }, 400);
  });
}


/* === 営業時間の判定ロジック === */
function updateBusinessStatus() {
  const statusElement = document.getElementById('business-status');
  if (!statusElement) return;

  const now = new Date(); // 現在の日時を取得
  const hour = now.getHours(); // 現在の「時」を取得
  
  // 営業時間のルール：11時〜19時（19時ちょうどに閉店と仮定）
  const openTime = 11;
  const closeTime = 19;

  if (hour >= openTime && hour < closeTime) {
    // 営業中の場合
    statusElement.textContent = '営業中';
    statusElement.classList.remove('closed');
    statusElement.classList.add('open');
  } else {
    // 準備中の場合
    statusElement.textContent = '準備中';
    statusElement.classList.remove('open');
    statusElement.classList.add('closed');
  }
}

// ページ読み込み時に実行
window.addEventListener('load', updateBusinessStatus);