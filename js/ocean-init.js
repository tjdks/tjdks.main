/*************************************************
 * 해양 계산기 - 메인 초기화
 *************************************************/

import { setupTabs, setupSetSwitcher, setupInputSetDisplay } from './ocean-ui.js';
import * as Calculator1Star from './ocean-calculator-1star.js';
import * as Calculator2Star from './ocean-calculator-2star.js';
import * as Calculator3Star from './ocean-calculator-3star.js';
import * as Stamina from './ocean-stamina.js';
import { getElement, saveAllInputs, restoreAllInputs } from './ocean-utils.js';

/**
 * 페이지 초기화
 */
function init() {
    // 탭 설정
    setupTabs();

    // 계산기 초기화
    Calculator1Star.init();
    Calculator2Star.init();
    Calculator3Star.init();
    Stamina.init();

    // 세트 스위처 설정
    setupSetSwitcher(() => {
        Calculator1Star.refresh();
        Calculator2Star.refresh();
        Calculator3Star.refresh();
    });

    // 첫 화면 입력칸 세트 표시 설정
    const firstStar = getElement('star-1');
    if (firstStar) setupInputSetDisplay(firstStar);

    // 프리미엄 입력값 자동 반영
    const premiumInput = getElement("info-expert-premium-price");
    if (premiumInput) {
        premiumInput.addEventListener("input", () => {
            // 결과가 있으면 재계산
            Calculator1Star.refresh();
            Calculator2Star.refresh();
            Calculator3Star.refresh();
        });
    }

    // 저장된 상태 복원
    restoreAllInputs();

    // 입력값 변경 시 자동 저장
    setupAutoSave();

    console.log("✅ 해양 계산기 초기화 완료");
}

/**
 * 자동 저장 설정
 */
function setupAutoSave() {
    // 모든 입력 필드에 이벤트 리스너 추가
    const saveDebounced = debounce(saveAllInputs, 500);
    
    // 입력 필드
    document.querySelectorAll('#tab-gold input, #tab-stamina input, #tab-info input, #tab-gold select, #tab-stamina select')
        .forEach(elem => {
            elem.addEventListener('input', saveDebounced);
            elem.addEventListener('change', saveDebounced);
        });
    
    // 라디오 버튼
    document.querySelectorAll('input[name="star-level"]')
        .forEach(elem => {
            elem.addEventListener('change', saveAllInputs);
        });
    
    // 스위처
    const setSwitcher = getElement('switcher-set');
    const advancedSwitcher = getElement('switcher-advanced');
    if (setSwitcher) setSwitcher.addEventListener('change', saveAllInputs);
    if (advancedSwitcher) advancedSwitcher.addEventListener('change', saveAllInputs);
}

/**
 * 디바운스 함수
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// DOM 로드 시 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}