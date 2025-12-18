/*************************************************
 * 4️⃣ 스태미나 계산기 (정보탭 전문가 반영)
 *************************************************/

// 낚싯대 강화 단계별 드롭 수와 기본 조개 확률
const rodData = {
    1: { drop: 1, clamRate: 0 },
    2: { drop: 1, clamRate: 0.01 },
    3: { drop: 2, clamRate: 0.01 },
    4: { drop: 2, clamRate: 0.01 },
    5: { drop: 2, clamRate: 0.02 },
    6: { drop: 3, clamRate: 0.02 },
    7: { drop: 3, clamRate: 0.02 },
    8: { drop: 3, clamRate: 0.03 },
    9: { drop: 4, clamRate: 0.03 },
    10:{ drop: 4, clamRate: 0.03 },
    11:{ drop: 4, clamRate: 0.05 },
    12:{ drop: 5, clamRate: 0.05 },
    13:{ drop: 5, clamRate: 0.05 },
    14:{ drop: 5, clamRate: 0.05 },
    15:{ drop: 6, clamRate: 0.10 },
};

window.runStaminaSimulation = function runStaminaSimulation() {
    const stamina = +document.getElementById("input-stamina").value || 0;
    const item = document.getElementById("stamina-item-select").value;

    if (!stamina) return alert("스태미나를 입력해주세요.");

    // 정보탭 전문가 값 가져오기
    const rodLV = +document.getElementById("info-expert-rod")?.value || 1;
    const stormLV = +document.getElementById("expert-storm")?.value || 0;
    const starLV = +document.getElementById("expert-star")?.value || 0;
    const clamLV = +document.getElementById("expert-clam-refill")?.value || 0;

    const staminaPerGather = 15;
    const gatherCount = Math.floor(stamina / staminaPerGather);

    // 낚싯대 드롭 수와 조개 확률
    const rodInfo = rodData[rodLV] || { drop: 1, clamRate: 0 };
    let totalDrops = gatherCount * rodInfo.drop;

    // 폭풍의 물질꾼: 비 오는 날만 적용 (여기선 가정으로 true)
    const isRain = true;
    if (stormLV > 0 && isRain) {
        // 레벨에 따라 추가 % 적용: LV1=1%, LV2=3%, LV3=5%, LV4=7%, LV5=10%
        const stormBonus = [0, 0.01, 0.03, 0.05, 0.07, 0.10];
        totalDrops = Math.floor(totalDrops * (1 + (stormBonus[stormLV] || 0)));
    }

    // 등급 확률
    const rate3 = 0.1 + 0.01 * starLV; // 별별별! 적용
    const rate2 = 0.3;
    const rate1 = 1 - rate2 - rate3;

    // 등급별 수량
    const count1 = Math.floor(totalDrops * rate1);
    const count2 = Math.floor(totalDrops * rate2);
    const count3 = Math.floor(totalDrops * rate3);

    // 조개 등장 확률: 낚싯대 + 조개 무한리필
    const clamRatePerLV = [0, 0.01, 0.015, 0.02, 0.025, 0.03, 0.035, 0.04, 0.045, 0.05, 0.07];
    const clamRate = (rodInfo.clamRate || 0) + (clamRatePerLV[clamLV] || 0);
    const clamCount = Math.floor(gatherCount * clamRate);

    // 결과 출력
    const html = `
        <ul>
            <li>1성 ${item}: ${count1}</li>
            <li>2성 ${item}: ${count2}</li>
            <li>3성 ${item}: ${count3}</li>
            <li>조개: ${clamCount}</li>
        </ul>
    `;
    document.getElementById("stamina-item-list").innerHTML = html;

    // 전문가 요약 업데이트
    updateStaminaExpertSummary();
}

window.updateStaminaExpertSummary = function updateStaminaExpertSummary() {
    const rodLV = +document.getElementById("info-expert-rod")?.value || 1;
    const stormLV = +document.getElementById("expert-storm")?.value || 0;
    const starLV = +document.getElementById("expert-star")?.value || 0;
    const clamLV = +document.getElementById("expert-clam-refill")?.value || 0;

    const summaryElem = document.getElementById("stamina-expert-summary");
    if (summaryElem) {
        summaryElem.textContent = `(폭풍 ${stormLV}LV, 별별별 ${starLV}LV, 조개 무한리필 ${clamLV}LV, 낚싯대 ${rodLV}강 적용)`;
    }
}

window.toggleDesc = function toggleDesc(id) {
    const elem = document.getElementById(id);
    if (!elem) return;
    elem.style.display = (elem.style.display === 'none' || elem.style.display === '') ? 'block' : 'none';
}