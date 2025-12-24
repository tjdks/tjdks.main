// 요리 조합법 데이터
const recipes = [
  {
    name: "토마토 스파게티",
    ingredients: "토마토 베이스 1개 + 호박 묶음 1개",
    minPrice: 243,
    maxPrice: 810
  },
  {
    name: "어니언 링",
    ingredients: "양파 베이스 2개 + 요리용 소금 1개",
    minPrice: 388,
    maxPrice: 1296
  },
  {
    name: "갈릭 케이크",
    ingredients: "마늘 베이스 1개 + 당근 묶음 1개",
    minPrice: 243,
    maxPrice: 810
  },
  {
    name: "삼겹살 토마토 찌개",
    ingredients: "토마토 베이스 2개 + 비트 묶음 1개 + 요리용 소금 1개 + 익힌 돼지고기 1개 + 익힌 돼지 삼겹살 1개",
    minPrice: 576,
    maxPrice: 1921
  },
  {
    name: "삼색 아이스크림",
    ingredients: "양파 베이스 2개 + 수박 묶음 1개 + 코코넛 1개 + 설탕 큐브 1개 + 요리용 우유 1개",
    minPrice: 758,
    maxPrice: 2527
  },
  {
    name: "마늘 양갈비 핫도그",
    ingredients: "마늘 베이스 2개 + 감자 묶음 1개 + 오일 1개 + 익힌 양고기 1개 + 익힌 양 갈비살 1개",
    minPrice: 549,
    maxPrice: 1832
  },
  {
    name: "달콤 시리얼",
    ingredients: "토마토 베이스 2개 + 달콤한 열매 묶음 1개 + 파인애플 1개 + 밀가루 반죽 1개 + 오일 1개",
    minPrice: 589,
    maxPrice: 1964
  },
  {
    name: "로스트 치킨 파이",
    ingredients: "마늘 베이스 2개 + 당근 묶음 1개 + 버터 조각 1개 + 익힌 닭고기 1개 + 익힌 닭 다리살 1개",
    minPrice: 675,
    maxPrice: 2253
  },
  {
    name: "스윗 치킨 햄버거",
    ingredients: "토마토 베이스 1개 + 양파 베이스 1개 + 비트 묶음 1개 + 달콤한 열매 묶음 1개 + 익힌 닭 가슴살 1개 + 익힌 닭 다리살 1개",
    minPrice: 1083,
    maxPrice: 3612
  },
  {
    name: "토마토 파인애플 피자",
    ingredients: "토마토 베이스 2개 + 마늘 베이스 2개 + 파인애플 1개 + 치즈 조각 1개 + 스테이크 1개 + 익힌 소 등심 1개",
    minPrice: 878,
    maxPrice: 2930
  },
  {
    name: "양파 수프",
    ingredients: "양파 베이스 2개 + 마늘 베이스 1개 + 감자 묶음 1개 + 코코넛 1개 + 버터 조각 1개 + 익힌 돼지 앞다리살 1개",
    minPrice: 1000,
    maxPrice: 3335
  },
  {
    name: "허브 삼겹살 찜",
    ingredients: "마늘 베이스 2개 + 양파 베이스 1개 + 호박 묶음 1개 + 요리용 소금 1개 + 오일 1개 + 익힌 돼지 삼겹살 1개",
    minPrice: 749,
    maxPrice: 2499
  },
  {
    name: "토마토 라자냐",
    ingredients: "토마토 베이스 1개 + 양파 베이스 1개 + 마늘 베이스 1개 + 당근 묶음 1개 + 호박 묶음 1개 + 밀가루 반죽 1개 + 익힌 양 다리살 1개",
    minPrice: 1253,
    maxPrice: 4177
  },
  {
    name: "딥 크림 빠네",
    ingredients: "토마토 베이스 1개 + 양파 베이스 1개 + 마늘 베이스 1개 + 수박 묶음 1개 + 감자 묶음 1개 + 치즈 조각 1개 + 요리용 우유 1개",
    minPrice: 1151,
    maxPrice: 3837
  },
  {
    name: "트리플 소갈비 꼬치",
    ingredients: "토마토 베이스 1개 + 양파 베이스 1개 + 마늘 베이스 1개 + 당근 묶음 1개 + 비트 묶음 1개 + 설탕 큐브 1개 + 익힌 소 갈비살 1개",
    minPrice: 1291,
    maxPrice: 4307
  }
];

// 가공 재료 조합법 데이터
const processingRecipes = [
  { name: "당근 묶음", materials: "당근 64개" },
  { name: "감자 묶음", materials: "감자 64개" },
  { name: "비트 묶음 x2", materials: "비트 64개" },
  { name: "호박 묶음 x2", materials: "호박 64개" },
  { name: "수박 묶음 x2", materials: "수박 64개" },
  { name: "달콤한 열매 묶음", materials: "달콤한 열매 64개" },
  { name: "설탕 큐브", materials: "사탕수수 64개" },
  { name: "요리용 소금", materials: "소금 16개" },
  { name: "토마토 베이스", materials: "토마토 8개" },
  { name: "양파 베이스", materials: "양파 8개" },
  { name: "마늘 베이스", materials: "마늘 8개" },
  { name: "치즈 조각", materials: "요리용 우유 8개 + 소금 8개" },
  { name: "밀가루 반죽", materials: "밀 12개 + 요리용 달걀 4개" },
  { name: "버터 조각", materials: "요리용 우유 8개 + 소금 4개 + 오일 4개" }
];

// 숫자 포맷팅 (천 단위 구분)
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 요리 테이블 렌더링
function renderRecipeTable(recipesToShow = recipes) {
  const tbody = document.getElementById('recipe-tbody');
  
  if (!tbody) return;
  
  if (recipesToShow.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <div class="empty-state-text">검색 결과가 없습니다.</div>
        </td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = recipesToShow.map(recipe => `
    <tr>
      <td class="recipe-name">${recipe.name}</td>
      <td class="recipe-ingredients">${recipe.ingredients}</td>
      <td class="price-low">${formatNumber(recipe.minPrice)} G</td>
      <td class="price-high">${formatNumber(recipe.maxPrice)} G</td>
    </tr>
  `).join('');
}

// 가공 재료 테이블 렌더링
function renderProcessingTable() {
  const tbody = document.getElementById('processing-tbody');
  
  if (!tbody) return;
  
  tbody.innerHTML = processingRecipes.map(recipe => `
    <tr>
      <td class="processing-name">${recipe.name}</td>
      <td class="processing-materials">${recipe.materials}</td>
    </tr>
  `).join('');
}

// 검색 기능
function setupSearch() {
  const searchInput = document.getElementById('recipe-search');
  
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm) ||
      recipe.ingredients.toLowerCase().includes(searchTerm)
    );
    renderRecipeTable(filteredRecipes);
  });
}

// 정렬 기능
function setupSort() {
  const sortSelect = document.getElementById('sort-select');
  
  if (!sortSelect) return;
  
  sortSelect.addEventListener('change', (e) => {
    const sortType = e.target.value;
    let sortedRecipes = [...recipes];
    
    switch(sortType) {
      case 'name':
        sortedRecipes.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
        break;
      case 'price-low':
        sortedRecipes.sort((a, b) => a.minPrice - b.minPrice);
        break;
      case 'price-high':
        sortedRecipes.sort((a, b) => b.maxPrice - a.maxPrice);
        break;
    }
    
    renderRecipeTable(sortedRecipes);
  });
}

// 조합법 탭 전환 기능
function setupRecipeTabs() {
  const tabs = document.querySelectorAll('.recipe-tab');
  const contents = document.querySelectorAll('.recipe-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 모든 탭과 콘텐츠에서 active 제거
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      // 클릭한 탭과 해당 콘텐츠에 active 추가
      tab.classList.add('active');
      const targetId = tab.dataset.recipeTab + '-recipes';
      document.getElementById(targetId)?.classList.add('active');
    });
  });
}

// 기본 재료 가격 토글 기능
function toggleBasicMaterials() {
  const section = document.getElementById('basic-materials-section');
  const icon = document.querySelector('.toggle-icon');
  
  if (section.style.display === 'none') {
    section.style.display = 'block';
    icon.classList.add('open');
  } else {
    section.style.display = 'none';
    icon.classList.remove('open');
  }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  // 요리 조합법 테이블 렌더링
  renderRecipeTable();
  
  // 가공 재료 테이블 렌더링
  renderProcessingTable();
  
  // 검색 기능 설정
  setupSearch();
  
  // 정렬 기능 설정
  setupSort();
  
  // 조합법 탭 전환 설정
  setupRecipeTabs();
});