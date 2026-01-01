// 해양 정보 탭 - 전문가 세팅 관련 함수

const OCEAN_STORAGE_KEY = 'oceanExpertSettings';

/**
 * 전문가 정보 토글
 */
function toggleExpertInfo(type) {
  const infoId = `desc-${type}`;
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
function saveOceanSettings() {
  const settings = {
    rodLevel: document.getElementById('rod-level')?.value || '',
    clam: document.getElementById('expert-clam-level')?.value || '',
    premiumPrice: document.getElementById('info-expert-premium-price')?.value || '',
    deepSea: document.getElementById('expert-deep-sea')?.value || '',
    star: document.getElementById('expert-star')?.value || '',
    clamRefill: document.getElementById('expert-clam-refill')?.value || ''
  };
  
  localStorage.setItem(OCEAN_STORAGE_KEY, JSON.stringify(settings));
  console.log('해양 설정 저장됨:', settings);
}

/**
 * localStorage에서 설정값 불러오기
 */
function loadOceanSettings() {
  const saved = localStorage.getItem(OCEAN_STORAGE_KEY);
  
  if (!saved) {
    console.log('저장된 해양 설정 없음');
    return;
  }
  
  try {
    const settings = JSON.parse(saved);
    
    // 각 입력 필드에 값 설정
    if (settings.rodLevel !== undefined) {
      const rodInput = document.getElementById('rod-level');
      if (rodInput) rodInput.value = settings.rodLevel;
    }
    
    if (settings.clam !== undefined) {
      const clamInput = document.getElementById('expert-clam-level');
      if (clamInput) clamInput.value = settings.clam;
    }
    
    if (settings.premiumPrice !== undefined) {
      const premiumInput = document.getElementById('info-expert-premium-price');
      if (premiumInput) premiumInput.value = settings.premiumPrice;
    }
    
    if (settings.deepSea !== undefined) {
      const deepSeaInput = document.getElementById('expert-deep-sea');
      if (deepSeaInput) deepSeaInput.value = settings.deepSea;
    }
    
    if (settings.star !== undefined) {
      const starInput = document.getElementById('expert-star');
      if (starInput) starInput.value = settings.star;
    }
    
    if (settings.clamRefill !== undefined) {
      const clamRefillInput = document.getElementById('expert-clam-refill');
      if (clamRefillInput) clamRefillInput.value = settings.clamRefill;
    }
    
    console.log('해양 설정 불러옴:', settings);
  } catch (e) {
    console.error('해양 설정 불러오기 실패:', e);
  }
}

/**
 * 모든 전문가 설정값 가져오기
 */
function getAllOceanExpertSettings() {
  return {
    rodLevel: parseInt(document.getElementById('rod-level')?.value || 0),
    clam: parseInt(document.getElementById('expert-clam-level')?.value || 0),
    premiumPrice: parseInt(document.getElementById('info-expert-premium-price')?.value || 0),
    deepSea: parseInt(document.getElementById('expert-deep-sea')?.value || 0),
    star: parseInt(document.getElementById('expert-star')?.value || 0),
    clamRefill: parseInt(document.getElementById('expert-clam-refill')?.value || 0)
  };
}

/**
 * 해양 관련 설정값만 가져오기 (스태미나 탭용)
 */
function getOceanSettings() {
  const rodLevel = parseInt(document.getElementById('rod-level')?.value || 0);
  const expertDeepSea = parseInt(document.getElementById('expert-deep-sea')?.value || 0);
  const expertStar = parseInt(document.getElementById('expert-star')?.value || 0);
  const expertClamRefill = parseInt(document.getElementById('expert-clam-refill')?.value || 0);
  
  return {
    rodLevel,
    expertDeepSea,
    expertStar,
    expertClamRefill
  };
}

/**
 * 설정 변경 감지 및 다른 탭에 반영 + 저장
 */
function setupOceanSettingsSync() {
  const inputs = [
    'rod-level',
    'expert-clam-level',
    'info-expert-premium-price',
    'expert-deep-sea',
    'expert-star',
    'expert-clam-refill'
  ];
  
  const updateSettings = () => {
    // localStorage에 저장
    saveOceanSettings();
    
    const settings = getOceanSettings();
    
    // ocean-stamina.js의 설정 업데이트
    if (typeof updateOceanExpertSettings === 'function') {
      updateOceanExpertSettings(settings);
    }
    
    // 전체 설정 콘솔 출력
    const allSettings = getAllOceanExpertSettings();
    console.log('해양 전문가 세팅 업데이트:', allSettings);
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
  loadOceanSettings();
  
  // 설정 동기화 및 저장 이벤트 설정
  setupOceanSettingsSync();
});