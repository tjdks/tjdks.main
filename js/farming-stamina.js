// 스태미나 계산 관련 데이터 및 함수

// 전역 설정
const STAMINA_CONFIG = {
  perHarvest: 7,
  hoeLevel: 0,
  expertGift: 0,
  expertFire: 0,
};

// 세이지 괭이 스탯 (강화 레벨별 씨앗 드롭 수)
const HOE_STATS = {
  1: 2, 2: 3, 3: 3, 4: 3, 5: 4,
  6: 4, 7: 4, 8: 5, 9: 5, 10: 5,
  11: 6, 12: 6, 13: 7, 14: 7, 15: 12
};

// 전문가 스킬: 자연이 주는 선물
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

// 전문가 스킬: 불붙은 괭이
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

// 작물 이름
const CROP_NAMES = {
  tomato: '토마토',
  onion: '양파',
  garlic: '마늘'
};

// 입력 카운터
let inputCount = 1;

/**
 * 숫자 포맷팅
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 입력창 추가
 */
function addStaminaInput() {
  inputCount++;
  const container = document.getElementById('stamina-inputs-container');
  
  const newInputRow = document.createElement('div');
  newInputRow.className = 'stamina-input-row';
  newInputRow.id = `input-row-${inputCount}`;
  newInputRow.innerHTML = `
    <div class="stamina-input-group">
      <label class="stamina-label">
        스태미나
        <input type="number" id="stamina-input-${inputCount}" class="stamina-input" placeholder="3300" min="0" step="7">
      </label>
      
      <label class="stamina-label">
        작물
        <select id="crop-select-${inputCount}" class="stamina-select">
          <option value="tomato">토마토</option>
          <option value="onion">양파</option>
          <option value="garlic">마늘</option>
        </select>
      </label>
    </div>
    <button class="btn-remove" onclick="removeStaminaInput(${inputCount})">삭제</button>
  `;
  
  container.appendChild(newInputRow);
}

/**
 * 입력창 삭제
 */
function removeStaminaInput(id) {
  const row = document.getElementById(`input-row-${id}`);
  if (row) {
    row.remove();
  }
}

/**
 * 스태미나 계산
 */
function calculateStamina() {
  const results = [];
  
  for (let i = 1; i <= inputCount; i++) {
    const inputElem = document.getElementById(`stamina-input-${i}`);
    const selectElem = document.getElementById(`crop-select-${i}`);
    
    if (!inputElem || !selectElem) continue;
    
    const stamina = parseInt(inputElem.value);
    const cropType = selectElem.value;
    
    if (!stamina || stamina <= 0) continue;
    
    const harvestCount = Math.floor(stamina / STAMINA_CONFIG.perHarvest);
    
    const seedsPerHarvest = STAMINA_CONFIG.hoeLevel > 0 ? (HOE_STATS[STAMINA_CONFIG.hoeLevel] || 0) : 0;
    const basicSeeds = harvestCount * seedsPerHarvest;
    
    const giftData = EXPERT_GIFT[STAMINA_CONFIG.expertGift];
    const bonusSeeds = Math.floor(harvestCount * giftData.chance * giftData.amount);
    const giftPercent = (giftData.chance * 100).toFixed(1);
    
    const totalSeeds = basicSeeds + bonusSeeds;
    
    const fireData = EXPERT_FIRE[STAMINA_CONFIG.expertFire];
    const baseDrops = Math.floor(harvestCount * fireData.chance * fireData.amount);
    const firePercent = (fireData.chance * 100).toFixed(1);
    
    results.push({
      cropName: CROP_NAMES[cropType],
      basicSeeds,
      bonusSeeds,
      giftPercent,
      totalSeeds,
      baseDrops,
      firePercent
    });
  }
  
  if (results.length === 0) {
    alert('스태미나를 입력해주세요.');
    return;
  }
  
  displayResults(results);
}

/**
 * 결과 표시
 */
function displayResults(results) {
  const resultCard = document.getElementById('stamina-result-card');
  const resultBody = document.getElementById('result-body');
  
  resultCard.style.display = 'block';
  
  let html = '';
  results.forEach((result) => {
    html += `
      <div class="crop-result-section">
        <h5 class="crop-result-title">${result.cropName} 씨앗</h5>
        <div class="crop-result-row">
          <span class="result-label">기본 씨앗:</span>
          <span class="result-value">${formatNumber(result.basicSeeds)}개</span>
        </div>
        <div class="crop-result-row">
          <span class="result-label">추가 씨앗 (${result.giftPercent}%):</span>
          <span class="result-value">${formatNumber(result.bonusSeeds)}개</span>
        </div>
        <div class="crop-result-row">
          <span class="result-label">총 씨앗:</span>
          <span class="result-value highlight">${formatNumber(result.totalSeeds)}개</span>
        </div>
        <div class="crop-result-row">
          <span class="result-label">베이스 드롭 (${result.firePercent}%):</span>
          <span class="result-value">${formatNumber(result.baseDrops)}개</span>
        </div>
      </div>
    `;
  });
  
  resultBody.innerHTML = html;
  
  setTimeout(() => {
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

/**
 * 전문가 정보 표시 업데이트
 */
function updateExpertDisplay() {
  const giftLevel = STAMINA_CONFIG.expertGift;
  const fireLevel = STAMINA_CONFIG.expertFire;
  const hoeLevel = STAMINA_CONFIG.hoeLevel;
  
  const expertInfoElem = document.getElementById('farming-expert-info');
  if (expertInfoElem) {
    expertInfoElem.textContent = `괭이 ${hoeLevel}강, 자연이 주는 선물 LV${giftLevel}, 불붙은 괭이 LV${fireLevel}`;
  }
}

/**
 * 전문가 설정 업데이트 (정보 탭에서 호출)
 */
function updateExpertSettings(giftLevel, fireLevel, hoeLevel) {
  STAMINA_CONFIG.expertGift = giftLevel || 0;
  STAMINA_CONFIG.expertFire = fireLevel || 0;
  STAMINA_CONFIG.hoeLevel = hoeLevel || 0;
  
  updateExpertDisplay();
  
  const resultCard = document.getElementById('stamina-result-card');
  if (resultCard && resultCard.style.display === 'block') {
    calculateStamina();
  }
}

/**
 * 초기화
 */
document.addEventListener('DOMContentLoaded', () => {
  const staminaInput = document.getElementById('stamina-input-1');
  if (staminaInput) {
    staminaInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        calculateStamina();
      }
    });
  }
  
  updateExpertDisplay();
});