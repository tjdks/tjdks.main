/* =========================
   재배 정보 탭 - 전문가 세팅 (farming-info.js)
========================= */

const FARMING_STORAGE_KEY = 'farmingExpertSettings';

// 전문가 스킬 데이터
const farmingExpertData = {
  gift: {
    name: '자연이 주는 선물',
    levels: [
      { lv: 1, desc: '채집 시 1% 확률로 씨앗 +1개' },
      { lv: 2, desc: '채집 시 2% 확률로 씨앗 +1개' },
      { lv: 3, desc: '채집 시 3% 확률로 씨앗 +1개' },
      { lv: 4, desc: '채집 시 4% 확률로 씨앗 +1개' },
      { lv: 5, desc: '채집 시 5% 확률로 씨앗 +2개' },
      { lv: 6, desc: '채집 시 6% 확률로 씨앗 +2개' },
      { lv: 7, desc: '채집 시 7% 확률로 씨앗 +3개' },
      { lv: 8, desc: '채집 시 8% 확률로 씨앗 +4개' },
      { lv: 9, desc: '채집 시 9% 확률로 씨앗 +5개' },
      { lv: 10, desc: '채집 시 10% 확률로 씨앗 +8개' }
    ]
  },
  harvest: {
    name: '오늘도 풍년이다!',
    levels: [
      { lv: 1, desc: '수확 시 1% 확률로 농작물 +1개' },
      { lv: 2, desc: '수확 시 2% 확률로 농작물 +1개' },
      { lv: 3, desc: '수확 시 3% 확률로 농작물 +1개' },
      { lv: 4, desc: '수확 시 4% 확률로 농작물 +1개' },
      { lv: 5, desc: '수확 시 5% 확률로 농작물 +2개' },
      { lv: 6, desc: '수확 시 7% 확률로 농작물 +2개' },
      { lv: 7, desc: '수확 시 10% 확률로 농작물 +3개' }
    ]
  },
  pot: {
    name: '한 솥 가득',
    levels: [
      { lv: 1, desc: '한 번에 3세트 이상 판매 시 1% 보너스' },
      { lv: 2, desc: '한 번에 3세트 이상 판매 시 2% 보너스' },
      { lv: 3, desc: '한 번에 3세트 이상 판매 시 3% 보너스' },
      { lv: 4, desc: '한 번에 3세트 이상 판매 시 4% 보너스' },
      { lv: 5, desc: '한 번에 3세트 이상 판매 시 7% 보너스' }
    ]
  },
  money: {
    name: '돈 좀 벌어볼까?',
    levels: [
      { lv: 1, desc: '요리 판매가 +1%' },
      { lv: 2, desc: '요리 판매가 +2%' },
      { lv: 3, desc: '요리 판매가 +3%' },
      { lv: 4, desc: '요리 판매가 +4%' },
      { lv: 5, desc: '요리 판매가 +5%' },
      { lv: 6, desc: '요리 판매가 +6%' },
      { lv: 7, desc: '요리 판매가 +10%' },
      { lv: 8, desc: '요리 판매가 +15%' },
      { lv: 9, desc: '요리 판매가 +30%' },
      { lv: 10, desc: '요리 판매가 +50%' }
    ]
  },
  king: {
    name: '왕 크니까 왕 좋아',
    levels: [
      { lv: 1, desc: '수확 시 대왕 작물이 등장할 확률 0.5% 증가' },
      { lv: 2, desc: '수확 시 대왕 작물이 등장할 확률 1% 증가' },
      { lv: 3, desc: '수확 시 대왕 작물이 등장할 확률 3% 증가' },
      { lv: 4, desc: '수확 시 대왕 작물이 등장할 확률 5% 증가' }
    ]
  },
  'seed-bonus': {
    name: '씨앗은 덤이야',
    levels: [
      { lv: 1, desc: '수확 시 1% 확률로 씨앗 드롭' },
      { lv: 2, desc: '수확 시 2% 확률로 씨앗 드롭' },
      { lv: 3, desc: '수확 시 3% 확률로 씨앗 드롭' },
      { lv: 4, desc: '수확 시 4% 확률로 씨앗 드롭' },
      { lv: 5, desc: '수확 시 5% 확률로 씨앗 드롭' },
      { lv: 6, desc: '수확 시 6% 확률로 씨앗 드롭' },
      { lv: 7, desc: '수확 시 7% 확률로 씨앗 드롭' },
      { lv: 8, desc: '수확 시 10% 확률로 씨앗 드롭' },
      { lv: 9, desc: '수확 시 20% 확률로 씨앗 드롭' },
      { lv: 10, desc: '수확 시 30% 확률로 씨앗 드롭' }
    ]
  },
  fire: {
    name: '불붙은 괭이',
    levels: [
      { lv: 1, desc: '채집 시 1% 확률로 씨앗이 베이스 1개로 가공되어 드롭' },
      { lv: 2, desc: '채집 시 2% 확률로 씨앗이 베이스 1개로 가공되어 드롭' },
      { lv: 3, desc: '채집 시 3% 확률로 씨앗이 베이스 2개로 가공되어 드롭' },
      { lv: 4, desc: '채집 시 4% 확률로 씨앗이 베이스 2개로 가공되어 드롭' },
      { lv: 5, desc: '채집 시 5% 확률로 씨앗이 베이스 2개로 가공되어 드롭' },
      { lv: 6, desc: '채집 시 6% 확률로 씨앗이 베이스 3개로 가공되어 드롭' },
      { lv: 7, desc: '채집 시 7% 확률로 씨앗이 베이스 3개로 가공되어 드롭' },
      { lv: 8, desc: '채집 시 8% 확률로 씨앗이 베이스 5개로 가공되어 드롭' },
      { lv: 9, desc: '채집 시 9% 확률로 씨앗이 베이스 5개로 가공되어 드롭' },
      { lv: 10, desc: '채집 시 15% 확률로 씨앗이 베이스 7개로 가공되어 드롭' }
    ]
  }
};

// 전문가 설명 HTML 생성
function generateExpertDescHTML(skillId) {
  const skill = farmingExpertData[skillId];
  if (!skill) return '';
  
  return skill.levels.map(level => 
    `<strong>LV ${level.lv}</strong> – ${level.desc}`
  ).join('<br>');
}

/**
 * 전문가 정보 토글
 */
function toggleExpertInfo(type) {
  const infoId = `desc-${type}`;
  const infoElement = document.getElementById(infoId);
  
  if (!infoElement) return;
  
  if (infoElement.style.display === 'none' || infoElement.style.display === '') {
    // 내용이 비어있으면 생성
    if (!infoElement.innerHTML.trim()) {
      infoElement.innerHTML = generateExpertDescHTML(type);
    }
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
  
  console.log('Farming info initialized');
});