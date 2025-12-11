// 탭 열기
function openTab(tabName, elmnt) {
    const tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) tabs[i].style.display = "none";
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => link.classList.remove("active"));
    document.getElementById(tabName).style.display = "block";
    if (elmnt) elmnt.classList.add("active");
}

// 기존 정수·핵 토글
document.getElementById("toggleExisting").addEventListener("click", () => {
    const div = document.getElementById("existingInputs");
    div.style.display = div.style.display === "none" ? "block" : "none";
});

// 계산 버튼 클릭 시 결과 토글
document.getElementById("calcBtn").addEventListener("click", () => {
    const input = {
        g: Number(document.getElementById("굴").value)||0,
        s: Number(document.getElementById("소라").value)||0,
        o: Number(document.getElementById("문어").value)||0,
        m: Number(document.getElementById("미역").value)||0,
        u: Number(document.getElementById("성게").value)||0,
        eG_exist:Number(document.getElementById("eG_exist").value)||0,
        eW_exist:Number(document.getElementById("eW_exist").value)||0,
        eC_exist:Number(document.getElementById("eC_exist").value)||0,
        eL_exist:Number(document.getElementById("eL_exist").value)||0,
        eCo_exist:Number(document.getElementById("eCo_exist").value)||0,
        cWG_exist:Number(document.getElementById("cWG_exist").value)||0,
        cWP_exist:Number(document.getElementById("cWP_exist").value)||0,
        cOD_exist:Number(document.getElementById("cOD_exist").value)||0,
        cVD_exist:Number(document.getElementById("cVD_exist").value)||0,
        cED_exist:Number(document.getElementById("cED_exist").value)||0,
    };

    const res = calculateCoreOptimization(input);
    const resultDiv = document.getElementById("result");

    // 이미 열려있으면 닫기 (토글)
    if(resultDiv.classList.contains("show")){
        resultDiv.classList.remove("show");
        // 애니메이션 끝나면 내용 초기화
        setTimeout(() => { resultDiv.innerHTML = ""; }, 500);
        return;
    }

    // 재료 부족 시
    if(!res){ 
        resultDiv.innerHTML = `<div class="section"><span class="label">재료 부족으로 계산 불가</span></div>`; 
        resultDiv.classList.add("show");
        return; 
    }

    // HTML 구조로 출력
    resultDiv.innerHTML = `
        <div class="section"><span class="label">💰 최종 골드 :</span> <span class="value">${res.bestGold.toLocaleString()} G</span></div>
        <div class="section"><span class="label">📦 제작 물품 :</span> <span class="value">영생의 아쿠티스 ${res.bestA}, 크라켄의 광란체 ${res.bestK}, 리바이던의 깃털 ${res.bestL}</span></div>
        <div class="section"><span class="label">🧪 사용된 정수 :</span> <span class="value">수호 ${res.make_eG}, 파동 ${res.make_eW}, 혼란 ${res.make_eC}, 생명 ${res.make_eL}, 부식 ${res.make_eCo}</span></div>
        <div class="section"><span class="label">💎 사용된 핵 :</span> <span class="value">물결 수호 ${res.needMake_WG}, 파동 오염 ${res.needMake_WP}, 질서 파괴 ${res.needMake_OD}, 활력 붕괴 ${res.needMake_VD}, 침식 방어 ${res.needMake_ED}</span></div>
        <div class="section"><span class="label">🧱 필요 블록 :</span> <span class="value">점토 ${res.need_clay}, 모래 ${res.need_sand}, 흙 ${res.need_dirt}, 자갈 ${res.need_gravel}, 화강암 ${res.need_granite}</span></div>
        <div class="section"><span class="label">🐟 필요 생선 :</span> <span class="value">새우 ${res.need_shrimp}, 도미 ${res.need_domi}, 청어 ${res.need_herring}, 금붕어 ${res.need_goldfish}, 농어 ${res.need_bass}</span></div>
    `;

    // 결과창 열기
    resultDiv.classList.add("show");
});
