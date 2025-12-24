// 스태미나 계산 관련 데이터 및 함수

// 전역 설정
const STAMINA_CONFIG = {
  perHarvest: 7, // 1회 채집당 스태미나
  hoeLevel: 8, // 세이지 괭이 레벨 (기본값, 나중에 정보탭에서 가져올 예정)
  expertGift: 0, // 자연이 주는 선물 레벨
  expertFire: 0, // 불붙은 괭이 레벨
};

// 세이지 괭이 스탯 (강화 레벨별 씨앗 드롭 수)
const HOE_STATS = {
  1: 2, 2: 3, 3: 3, 4: 3, 5: 4,
  6: 4, 7: 4, 8: 5, 9: 5, 10: 5,
  11: 6, 12: 6, 13: 7, 14: 7, 15: 12
};

// 전문가 스킬: 자연이 주는 선물 (씨앗 추가 드롭)
const EXPERT_GIFT = {
  0: { chance: 0, amount: 0 },
  1: { chance: 0.01, amount: 1 },
  2: { chance: 0.02, amount: 1 },
  3: { chance: 0.03, amount: 1 },
  4: { chance: 0.04, amount: 1 },
  5: { chance: 0.05, amount: 2 },
  6: { chance: 0.06, amount: 2 },
  7: { chance: 0.07, amount: 3 },
  8: { chance: 0.08, amount: 4 },
  9: { chance: 0.09, amount: 5 },
  10: { chance: 0.10, amount: 8 }
};

// 전문가 스킬: 불붙은 괭이 (베이스 드롭)
const EXPERT_FIRE = {
  0: { chance: 0, amount: 0 },
  1: { chance: 0.01, amount: 1 },
  2: { chance: 0.02, amount: 1 },
  3: { chance: 0.03, amount: 2 },
  4: { chance: 0.04, amount: 2 },
  5: { chance: 0.05, amount: 2 },
  6: { chance: 0.06, amount: 3 },
  7: { chance: 0.07, amount: 3 },
  8: { chance: 0.08, amount: 5 },
  9: { chance: 0.09, amount: 5 },
  10: { chance: 0.15, amount: 7 }
};

// 작물 이름 매핑
const CROP_NAMES = {
  tomato: '토마토',
  onion: '양파',
  garlic: '마늘'
};

// 베이스 이름 매핑
const BASE_NAMES = {
  tomato: '토마토 베이스',
  onion: '양파 베이스',
  garlic: '마늘 베이스'
};

/**
 * 스태미나 계산 메인 함수
 */
function calculateStamina() {
  // 입력값 가져오기
  const staminaInput = document.getElementById('stamina-input').value;
  const cropType = document.getElementById('crop-select').value;
  
  if (!staminaInput || staminaInput <= 0) {
    alert('스태미나를 입력해주세요.');
    return;
  }
  
  const totalStamina = parseInt(staminaInput);
  
  // 채집 횟수 계산
  const harvestCount = Math.floor(totalStamina / STAMINA_CONFIG.perHarvest);
  const usedStamina = harvestCount * STAMINA_CONFIG.perHarvest;
  
  // 기본 씨앗 계산
  const seedsPerHarvest = HOE_STATS[STAMINA_CONFIG.hoeLevel] || 5;
  const basicSeeds = harvestCount * seedsPerHarvest;
  
  // 보너스 씨앗 계산 (자연이 주는 선물)
  const giftData = EXPERT_GIFT[STAMINA_CONFIG.expertGift];
  const bonusSeeds = Math.floor(harvestCount * giftData.chance * giftData.amount);
  
  // 총 씨앗
  const totalSeeds = basicSeeds + bonusSeeds;
  
  // 베이스 드롭 계산 (불붙은 괭이)
  const fireData = EXPERT_FIRE[STAMINA_CONFIG.expertFire];
  const baseDrops = Math.floor(harvestCount * fireData.chance * fireData.amount);
  
  // 결과 표시
  displayResults({
    harvestCount,
    usedStamina,
    basicSeeds,
    bonusSeeds,
    totalSeeds,
    baseDrops,
    cropType,
    giftLevel: STAMINA_CONFIG.expertGift,
    fireLevel: STAMINA_CONFIG.expertFire
  });
}

/**
 * 결과 표시 함수
 */
function displayResults(data) {
  const resultCard = document.getElementById('stamina-result-card');
  
  // 결과 카드 표시
  resultCard.style.display = 'block';
  
  // 기본 정보
  document.getElementById('harvest-count').textContent = data.harvestCount + '회';
  document.getElementById('used-stamina').textContent = data.usedStamina;
  
  // 씨앗 수확
  document.getElementById('basic-seeds').textContent = formatNumber(data.basicSeeds) + '개';
  document.getElementById('bonus-seeds').textContent = '+' + formatNumber(data.bonusSeeds) + '개';
  document.getElementById('total-seeds').textContent = formatNumber(data.totalSeeds) + '개';
  
  // 보너스 정보
  const giftPercent = (EXPERT_GIFT[data.giftLevel].chance * 100).toFixed(1);
  document.getElementById('gift-bonus-info').textContent = 
    data.giftLevel > 0 ? `LV${data.giftLevel} ${giftPercent}%` : '미적용';
  
  // 베이스 드롭
  document.getElementById('base-drops').textContent = formatNumber(data.baseDrops) + '개';
  
  const firePercent = (EXPERT_FIRE[data.fireLevel].chance * 100).toFixed(1);
  document.getElementById('fire-bonus-info').textContent = 
    data.fireLevel > 0 ? `LV${data.fireLevel} ${firePercent}%` : '미적용';
  
  // 전문가 미적용 안내
  const expertNotice = document.getElementById('expert-notice');
  if (data.giftLevel === 0 && data.fireLevel === 0) {
    expertNotice.style.display = 'flex';
  } else {
    expertNotice.style.display = 'none';
  }
  
  // 결과 카드로 스크롤
  setTimeout(() => {
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

/**
 * 숫자 포맷팅 (천 단위 구분)
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 전문가 설정 업데이트 (정보 탭에서 호출될 예정)
 */
function updateExpertSettings(giftLevel, fireLevel, hoeLevel) {
  STAMINA_CONFIG.expertGift = giftLevel || 0;
  STAMINA_CONFIG.expertFire = fireLevel || 0;
  STAMINA_CONFIG.hoeLevel = hoeLevel || 8;
}

/**
 * 페이지 로드 시 초기화
 */
document.addEventListener('DOMContentLoaded', () => {
  // 스태미나 입력 필드에서 Enter 키 처리
  const staminaInput = document.getElementById('stamina-input');
  if (staminaInput) {
    staminaInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        calculateStamina();
      }
    });
  }
});