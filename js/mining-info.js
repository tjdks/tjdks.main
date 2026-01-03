/* =========================
   채광 정보 탭 - 전문가 세팅 (mining-info.js)
========================= */

const MINING_STORAGE_KEY = 'miningExpertSettings';

// 전문가 스킬 데이터
const miningExpertData = {
  cobi: {
    name: '코비타임',
    levels: [
      { lv: 1, desc: '아일랜드에서 채광 시 코비 등장 확률 +1%' },
      { lv: 2, desc: '아일랜드에서 채광 시 코비 등장 확률 +1.5%' },
      { lv: 3, desc: '아일랜드에서 채광 시 코비 등장 확률 +2%' },
      { lv: 4, desc: '아일랜드에서 채광 시 코비 등장 확률 +2.5%' },
      { lv: 5, desc: '아일랜드에서 채광 시 코비 등장 확률 +3%' },
      { lv: 6, desc: '아일랜드에서 채광 시 코비 등장 확률 +4%' },
      { lv: 7, desc: '아일랜드에서 채광 시 코비 등장 확률 +5%' }
    ]
  },
  ingot: {
    name: '주괴 좀 사주괴',
    levels: [
      { lv: 1, desc: '주괴 판매가 +5%' },
      { lv: 2, desc: '주괴 판매가 +7%' },
      { lv: 3, desc: '주괴 판매가 +10%' },
      { lv: 4, desc: '주괴 판매가 +20%' },
      { lv: 5, desc: '주괴 판매가 +30%' },
      { lv: 6, desc: '주괴 판매가 +50%' }
    ]
  },
  'gem-start': {
    name: '반짝임의 시작',
    levels: [
      { lv: 1, desc: '아일랜드 채광 시 3% 확률로 보석 1개 드롭' },
      { lv: 2, desc: '아일랜드 채광 시 7% 확률로 보석 1개 드롭' },
      { lv: 3, desc: '아일랜드 채광 시 10% 확률로 보석 2개 드롭' }
    ]
  },
  'gem-shine': {
    name: '반짝반짝 눈이 부셔',
    levels: [
      { lv: 1, desc: '보석 판매가 +5%' },
      { lv: 2, desc: '보석 판매가 +7%' },
      { lv: 3, desc: '보석 판매가 +10%' },
      { lv: 4, desc: '보석 판매가 +20%' },
      { lv: 5, desc: '보석 판매가 +30%' },
      { lv: 6, desc: '보석 판매가 +50%' }
    ]
  },
  lucky: {
    name: '럭키 히트',
    levels: [
      { lv: 1, desc: '아일랜드 채광 시 1% 확률로 광석 1개 추가 드롭' },
      { lv: 2, desc: '아일랜드 채광 시 2% 확률로 광석 1개 추가 드롭' },
      { lv: 3, desc: '아일랜드 채광 시 3% 확률로 광석 1개 추가 드롭' },
      { lv: 4, desc: '아일랜드 채광 시 4% 확률로 광석 1개 추가 드롭' },
      { lv: 5, desc: '아일랜드 채광 시 5% 확률로 광석 1개 추가 드롭' },
      { lv: 6, desc: '아일랜드 채광 시 6% 확률로 광석 1개 추가 드롭' },
      { lv: 7, desc: '아일랜드 채광 시 7% 확률로 광석 1개 추가 드롭' },
      { lv: 8, desc: '아일랜드 채광 시 8% 확률로 광석 2개 추가 드롭' },
      { lv: 9, desc: '아일랜드 채광 시 10% 확률로 광석 2개 추가 드롭' },
      { lv: 10, desc: '아일랜드 채광 시 15% 확률로 광석 3개 추가 드롭' }
    ]
  },
  'fire-pick': {
    name: '불붙은 곡괭이',
    levels: [
      { lv: 1, desc: '채광 시 1% 확률로 광석이 주괴 1개로 제련' },
      { lv: 2, desc: '채광 시 2% 확률로 광석이 주괴 1개로 제련' },
      { lv: 3, desc: '채광 시 3% 확률로 광석이 주괴 1개로 제련' },
      { lv: 4, desc: '채광 시 4% 확률로 광석이 주괴 1개로 제련' },
      { lv: 5, desc: '채광 시 5% 확률로 광석이 주괴 1개로 제련' },
      { lv: 6, desc: '채광 시 6% 확률로 광석이 주괴 1개로 제련' },
      { lv: 7, desc: '채광 시 7% 확률로 광석이 주괴 1개로 제련' },
      { lv: 8, desc: '채광 시 8% 확률로 광석이 주괴 1개로 제련' },
      { lv: 9, desc: '채광 시 9% 확률로 광석이 주괴 1개로 제련' },
      { lv: 10, desc: '채광 시 15% 확률로 광석이 주괴 1개로 제련' }
    ]
  }
};

// 전문가 설명 HTML 생성
function generateExpertDescHTML(skillId) {
  const skill = miningExpertData[skillId];
  if (!skill) return '';
  
  return skill.levels.map(level => 
    `<strong>LV ${level.lv}</strong> – ${level.desc}`
  ).join('<br>');
}

// 전문가 정보 토글 함수
function toggleExpertInfo(id) {
  const desc = document.getElementById('desc-' + id);
  if (desc) {
    if (desc.style.display === 'none') {
      // 내용이 비어있으면 생성
      if (!desc.innerHTML.trim()) {
        desc.innerHTML = generateExpertDescHTML(id);
      }
      desc.style.display = 'block';
    } else {
      desc.style.display = 'none';
    }
  }
}

/**
 * 설정값을 localStorage에 저장
 */
function saveMiningSettings() {
  const settings = {
    pickaxeLevel: document.getElementById('pickaxe-level')?.value || '',
    cobi: document.getElementById('expert-cobi-level')?.value || '',
    ingot: document.getElementById('expert-ingot-level')?.value || '',
    gemStart: document.getElementById('expert-gem-start-level')?.value || '',
    gemShine: document.getElementById('expert-gem-shine-level')?.value || '',
    lucky: document.getElementById('expert-lucky-level')?.value || '',
    firePick: document.getElementById('expert-fire-pick-level')?.value || ''
  };
  
  localStorage.setItem(MINING_STORAGE_KEY, JSON.stringify(settings));
  console.log('채광 설정 저장됨:', settings);
}

/**
 * localStorage에서 설정값 불러오기
 */
function loadMiningSettings() {
  const saved = localStorage.getItem(MINING_STORAGE_KEY);
  
  if (!saved) {
    console.log('저장된 채광 설정 없음');
    return;
  }
  
  try {
    const settings = JSON.parse(saved);
    
    const fieldMap = {
      pickaxeLevel: 'pickaxe-level',
      cobi: 'expert-cobi-level',
      ingot: 'expert-ingot-level',
      gemStart: 'expert-gem-start-level',
      gemShine: 'expert-gem-shine-level',
      lucky: 'expert-lucky-level',
      firePick: 'expert-fire-pick-level'
    };
    
    Object.entries(fieldMap).forEach(([key, inputId]) => {
      if (settings[key] !== undefined && settings[key] !== '') {
        const input = document.getElementById(inputId);
        if (input) input.value = settings[key];
      }
    });
    
    console.log('채광 설정 불러옴:', settings);
  } catch (e) {
    console.error('채광 설정 불러오기 실패:', e);
  }
}

/**
 * 모든 전문가 설정값 가져오기
 */
function getMiningExpertSettings() {
  return {
    pickaxeLevel: parseInt(document.getElementById('pickaxe-level')?.value || 0),
    cobi: parseInt(document.getElementById('expert-cobi-level')?.value || 0),
    ingot: parseInt(document.getElementById('expert-ingot-level')?.value || 0),
    gemStart: parseInt(document.getElementById('expert-gem-start-level')?.value || 0),
    gemShine: parseInt(document.getElementById('expert-gem-shine-level')?.value || 0),
    lucky: parseInt(document.getElementById('expert-lucky-level')?.value || 0),
    firePick: parseInt(document.getElementById('expert-fire-pick-level')?.value || 0)
  };
}

/**
 * 설정 변경 감지 및 저장
 */
function setupMiningSettingsSync() {
  const inputs = [
    'pickaxe-level',
    'expert-cobi-level',
    'expert-ingot-level',
    'expert-gem-start-level',
    'expert-gem-shine-level',
    'expert-lucky-level',
    'expert-fire-pick-level'
  ];
  
  const updateSettings = () => {
    // localStorage에 저장
    saveMiningSettings();
    
    // 전체 설정 콘솔 출력
    const allSettings = getMiningExpertSettings();
    console.log('채광 전문가 세팅 업데이트:', allSettings);
  };
  
  inputs.forEach(inputId => {
    const input = document.getElementById(inputId);
    if (input) {
      input.addEventListener('input', updateSettings);
      input.addEventListener('change', updateSettings);
    }
  });
}

// 초기화
document.addEventListener('DOMContentLoaded', function() {
  // 먼저 저장된 설정 불러오기
  loadMiningSettings();
  
  // 설정 동기화 및 저장 이벤트 설정
  setupMiningSettingsSync();
  
  console.log('Mining info initialized');
});