// 정보 탭 - 전문가 세팅 관련 함수

const FARMING_STORAGE_KEY = 'farmingExpertSettings';

/**
 * 전문가 정보 토글
 */
function toggleExpertInfo(type) {
  const infoId = `expert-${type}-info`;
  const infoElement = document.getElementById(infoId);
  
  if (!infoElement) return;
  
  if (infoElement.style.display === 'none' || infoElement.style.display === '') {
    infoElement.style.display = 'block';
  } else {
    infoElement.style.display = 'none';
  }
}

/**
 * 설정값을 localStorage에 저장
 */
function saveFarmingSettings() {
  const settings = {
    hoeLevel: document.getElementById('hoe-level')?.value || '',
    gift: document.getElementById('expert-gift')?.value || '',
    harvest: document.getElementById('expert-harvest')?.value || '',
    pot: document.getElementById('expert-pot')?.value || '',
    money: document.getElementById('expert-money')?.value || '',
    king: document.getElementById('expert-king')?.value || '',
    seedBonus: document.getElementById('expert-seed-bonus')?.value || '',
    fire: document.getElementById('expert-fire')?.value || ''
  };
  
  localStorage.setItem(FARMING_STORAGE_KEY, JSON.stringify(settings));
  console.log('재배 설정 저장됨:', settings);
}

/**
 * localStorage에서 설정값 불러오기
 */
function loadFarmingSettings() {
  const saved = localStorage.getItem(FARMING_STORAGE_KEY);
  
  if (!saved) {
    console.log('저장된 재배 설정 없음');
    return;
  }
  
  try {
    const settings = JSON.parse(saved);
    
    const fieldMap = {
      hoeLevel: 'hoe-level',
      gift: 'expert-gift',
      harvest: 'expert-harvest',
      pot: 'expert-pot',
      money: 'expert-money',
      king: 'expert-king',
      seedBonus: 'expert-seed-bonus',
      fire: 'expert-fire'
    };
    
    Object.entries(fieldMap).forEach(([key, inputId]) => {
      if (settings[key] !== undefined) {
        const input = document.getElementById(inputId);
        if (input) input.value = settings[key];
      }
    });
    
    console.log('재배 설정 불러옴:', settings);
  } catch (e) {
    console.error('재배 설정 불러오기 실패:', e);
  }
}

/**
 * 모든 전문가 설정값 가져오기
 */
function getAllExpertSettings() {
  return {
    hoeLevel: parseInt(document.getElementById('hoe-level')?.value || 0),
    gift: parseInt(document.getElementById('expert-gift')?.value || 0),
    harvest: parseInt(document.getElementById('expert-harvest')?.value || 0),
    pot: parseInt(document.getElementById('expert-pot')?.value || 0),
    money: parseInt(document.getElementById('expert-money')?.value || 0),
    king: parseInt(document.getElementById('expert-king')?.value || 0),
    seedBonus: parseInt(document.getElementById('expert-seed-bonus')?.value || 0),
    fire: parseInt(document.getElementById('expert-fire')?.value || 0)
  };
}

/**
 * 재배 관련 설정값만 가져오기 (스태미나 탭용)
 */
function getFarmingSettings() {
  const hoeLevel = parseInt(document.getElementById('hoe-level')?.value || 0);
  const expertGift = parseInt(document.getElementById('expert-gift')?.value || 0);
  const expertFire = parseInt(document.getElementById('expert-fire')?.value || 0);
  
  return {
    hoeLevel,
    expertGift,
    expertFire
  };
}

/**
 * 설정 변경 감지 및 다른 탭에 반영 + 저장
 */
function setupSettingsSync() {
  const inputs = [
    'hoe-level',
    'expert-gift',
    'expert-harvest',
    'expert-pot',
    'expert-money',
    'expert-king',
    'expert-seed-bonus',
    'expert-fire'
  ];
  
  const updateSettings = () => {
    // localStorage에 저장
    saveFarmingSettings();
    
    const settings = getFarmingSettings();
    
    // farming-stamina.js의 설정 업데이트
    if (typeof updateExpertSettings === 'function') {
      updateExpertSettings(settings.expertGift, settings.expertFire, settings.hoeLevel);
    }
    
    // 전체 설정 콘솔 출력
    const allSettings = getAllExpertSettings();
    console.log('전문가 세팅 업데이트:', allSettings);
  };
  
  inputs.forEach(inputId => {
    const input = document.getElementById(inputId);
    if (input) {
      input.addEventListener('input', updateSettings);
      input.addEventListener('change', updateSettings);
    }
  });
  
  // 초기 설정 적용
  updateSettings();
}

/**
 * 페이지 로드 시 초기화
 */
document.addEventListener('DOMContentLoaded', () => {
  // 먼저 저장된 설정 불러오기
  loadFarmingSettings();
  
  // 설정 동기화 및 저장 이벤트 설정
  setupSettingsSync();
});