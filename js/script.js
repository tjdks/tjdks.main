/* =========================
   상태 관리 객체
   ========================= */
const formState = {};

/* =========================
   상태 저장 함수
   ========================= */
function saveCurrentTabState(tabId) {
  if (!tabId) return;
  
  // 해당 탭의 상태 객체가 없으면 생성
  if (!formState[tabId]) {
    formState[tabId] = {};
  }
  
  const inputs = document.querySelectorAll(`#${tabId} input, #${tabId} select, #${tabId} textarea`);
  inputs.forEach(input => {
    const key = input.name || input.id;
    if (key) {
      formState[tabId][key] = input.value;
    }
  });
}

/* =========================
   상태 복원 함수
   ========================= */
function restoreTabState(tabId) {
  if (!tabId || !formState[tabId]) return;
  
  Object.keys(formState[tabId]).forEach(key => {
    const input = document.querySelector(`#${tabId} [name="${key}"], #${tabId} #${key}`);
    if (input && formState[tabId][key]) {
      input.value = formState[tabId][key];
    }
  });
}

/* =========================
   DOMContentLoaded - 모든 초기화 코드
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  
  /* 메인 탭 활성화 (페이지 기준) */
  const currentPath = location.pathname.split("/").pop();
  
  document.querySelectorAll(".main-nav a").forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  /* 하위 탭 전환 */
  document.querySelectorAll(".sub-header-inner a").forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();

      // 현재 보이는 탭의 상태 저장
      const currentTab = document.querySelector('.tab-content[style*="display: block"]') 
                      || document.querySelector('.tab-content:not([style*="display: none"])');
      if (currentTab) {
        saveCurrentTabState(currentTab.id);
      }

      // 탭 active 처리
      document.querySelectorAll(".sub-header-inner a")
        .forEach(t => t.classList.remove("active"));

      tab.classList.add("active");

      // 콘텐츠 전환
      const targetId = tab.dataset.target;
      if (!targetId) return;

      document.querySelectorAll(".tab-content")
        .forEach(c => c.style.display = "none");

      const target = document.getElementById(targetId);
      if (target) {
        target.style.display = "block";
        
        // 새 탭의 저장된 상태 복원
        restoreTabState(targetId);
      }
    });
  });
  
});