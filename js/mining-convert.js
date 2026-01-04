/* =========================
   채광 변환 계산기 JS
   mining-convert.js
========================= */

// 레시피 데이터
const convertRecipes = {
  'ability': {
    name: '어빌리티스톤',
    materials: [
      { name: '코룸 주괴', count: 1 },
      { name: '리프톤 주괴', count: 1 },
      { name: '세렌트 주괴', count: 1 }
    ]
  },
  'life-low': {
    name: '하급 라이프스톤',
    materials: [
      { name: '조약돌 뭉치', count: 2 },
      { name: '구리 블록', count: 8 },
      { name: '레드스톤 블록', count: 3 },
      { name: '코룸 주괴', count: 1 }
    ]
  },
  'life-mid': {
    name: '중급 라이프스톤',
    materials: [
      { name: '심층암 조약돌 뭉치', count: 2 },
      { name: '청금석 블록', count: 5 },
      { name: '철 블록', count: 5 },
      { name: '다이아몬드 블록', count: 3 },
      { name: '리프톤 주괴', count: 2 }
    ]
  },
  'life-high': {
    name: '상급 라이프스톤',
    materials: [
      { name: '구리 블록', count: 30 },
      { name: '자수정 블록', count: 20 },
      { name: '철 블록', count: 7 },
      { name: '금 블록', count: 7 },
      { name: '다이아몬드 블록', count: 5 },
      { name: '세렌트 주괴', count: 3 }
    ]
  }
};

// 주괴 → 하위 재료 (분해용)
const ingotBreakdown = {
  '코룸 주괴': { ore: '코룸', oreCount: 16, torch: 2 },
  '리프톤 주괴': { ore: '리프톤', oreCount: 16, torch: 4 },
  '세렌트 주괴': { ore: '세렌트', oreCount: 16, torch: 8 }
};

let convertRowCounter = 1;
const CONVERT_SET_SIZE = 64;

// 세트 표시 포맷 (1/0 형식)
function formatConvertCount(count, useSet) {
  if (!useSet) {
    return count.toLocaleString() + '개';
  }
  
  const sets = Math.floor(count / CONVERT_SET_SIZE);
  const remainder = count % CONVERT_SET_SIZE;
  
  return sets + '/' + remainder;
}

// 행 추가
function addConvertRow() {
  convertRowCounter++;
  const container = document.getElementById('convert-inputs-container');
  
  const newRow = document.createElement('div');
  newRow.className = 'convert-input-row';
  newRow.dataset.rowId = convertRowCounter;
  newRow.innerHTML = `
    <div class="convert-input-group">
      <label class="convert-label">
        제작
        <select class="convert-select convert-item-select" onchange="calculateConvert()">
          <option value="">선택</option>
          <option value="ability">어빌리티스톤</option>
          <option value="life-low">하급 라이프스톤</option>
          <option value="life-mid">중급 라이프스톤</option>
          <option value="life-high">상급 라이프스톤</option>
        </select>
      </label>
      
      <label class="convert-label">
        수량
        <input type="number" class="convert-input convert-quantity-input" value="1" min="1" oninput="calculateConvert()">
        <span class="convert-unit">개</span>
      </label>
    </div>
    <button class="convert-btn-remove" onclick="removeConvertRow(this)">×</button>
  `;
  
  container.appendChild(newRow);
}

// 행 삭제
function removeConvertRow(btn) {
  const row = btn.closest('.convert-input-row');
  row.remove();
  calculateConvert();
}

// 각 아이템별 결과 박스 생성
function createConvertItemBox(itemKey, quantity, useSet) {
  const recipe = convertRecipes[itemKey];
  
  // 직접 재료 계산
  let materialsHtml = recipe.materials.map(mat => {
    const totalCount = mat.count * quantity;
    return `
      <div class="convert-material-row">
        <span class="convert-label-text">${mat.name}</span>
        <span class="convert-value-text">${formatConvertCount(totalCount, useSet)}</span>
      </div>
    `;
  }).join('');
  
  // 주괴 하위 재료 계산
  let subMaterialsHtml = '';
  let totalOres = {};
  let totalTorch = 0;
  
  recipe.materials.forEach(mat => {
    if (ingotBreakdown[mat.name]) {
      const ingot = ingotBreakdown[mat.name];
      const ingotCount = mat.count * quantity;
      
      if (!totalOres[ingot.ore]) totalOres[ingot.ore] = 0;
      totalOres[ingot.ore] += ingot.oreCount * ingotCount;
      totalTorch += ingot.torch * ingotCount;
    }
  });
  
  if (Object.keys(totalOres).length > 0) {
    let subItems = Object.entries(totalOres).map(([ore, count]) => `
      <div class="convert-sub-row">
        <span class="convert-label-text">${ore}</span>
        <span class="convert-value-text">${formatConvertCount(count, useSet)}</span>
      </div>
    `).join('');
    
    subItems += `
      <div class="convert-sub-row">
        <span class="convert-label-text">강화 횃불</span>
        <span class="convert-value-text">${formatConvertCount(totalTorch, useSet)}</span>
      </div>
    `;
    
    subMaterialsHtml = `
      <div class="convert-sub-section">
        <div class="convert-sub-title">└ 주괴 재료</div>
        ${subItems}
      </div>
    `;
  }
  
  return `
    <div class="convert-item-section">
      <div class="convert-item-title">
        ${recipe.name}
        <span class="convert-item-count">${quantity}개</span>
      </div>
      ${materialsHtml}
      ${subMaterialsHtml}
    </div>
  `;
}

// 계산
function calculateConvert() {
  const useSet = document.getElementById('convert-set-toggle').checked;
  const resultCard = document.getElementById('convert-result-card');
  const resultBody = document.getElementById('convert-result-body');
  
  // 모든 입력 행에서 데이터 수집
  const rows = document.querySelectorAll('.convert-input-row');
  
  let resultBoxes = [];
  
  rows.forEach(row => {
    const select = row.querySelector('.convert-item-select');
    const quantityInput = row.querySelector('.convert-quantity-input');
    const selectedItem = select.value;
    const quantity = parseInt(quantityInput.value) || 0;
    
    if (!selectedItem || quantity <= 0) return;
    
    // 각 아이템별로 결과 박스 생성
    resultBoxes.push(createConvertItemBox(selectedItem, quantity, useSet));
  });
  
  if (resultBoxes.length === 0) {
    resultCard.style.display = 'block';
    resultBody.innerHTML = '<div class="convert-empty-state">제작할 아이템을 선택하세요</div>';
    return;
  }
  
  resultCard.style.display = 'block';
  resultBody.innerHTML = `
    <div class="convert-result-grid">
      ${resultBoxes.join('')}
    </div>
  `;
}

// 초기화
document.addEventListener('DOMContentLoaded', function() {
  // 첫 번째 행의 select에 이벤트 연결
  const firstSelect = document.querySelector('.convert-item-select');
  const firstInput = document.querySelector('.convert-quantity-input');
  
  if (firstSelect) {
    firstSelect.addEventListener('change', calculateConvert);
  }
  if (firstInput) {
    firstInput.addEventListener('input', calculateConvert);
  }
});