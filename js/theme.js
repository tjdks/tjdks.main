/* ===== 로고 아이콘 토글 + 다크모드 ===== */

(function() {
  'use strict';

  const LOGO_LIGHT = 'img/1x0x7_.png';
  const LOGO_DARK = 'img/1x0x7_2.png';

  let isDark = localStorage.getItem('theme') === 'dark';

  function apply() {
    const logo = document.querySelector('.logo img');
    if (logo) {
      logo.src = isDark ? LOGO_DARK : LOGO_LIGHT;
    }
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }

  window.toggleTheme = function() {
    isDark = !isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    apply();
  };

  // 페이지 로드 시 적용
  apply();
  document.addEventListener('DOMContentLoaded', apply);

})();