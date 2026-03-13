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