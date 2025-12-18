/*************************************************
 * 2️⃣ 2성 계산기
 *************************************************/
const GOLD_2STAR = { CORE: 7413, POTION: 7487, WING: 7592 };


window.calculate2Star = function calculate2Star(input) {
    let best = { gold: -1, CORE: 0, POTION: 0, WING: 0 };
    let limit = Math.max(10, input.guard + input.wave + input.chaos + input.life + input.decay);

    for (let CORE = 0; CORE <= limit; CORE++) {
        for (let POTION = 0; POTION <= limit; POTION++) {
            for (let WING = 0; WING <= limit; WING++) {
                let crystal = {
                    vital: CORE + WING,       // 해구의 파동 코어 + 청해룡의 날개
                    erosion: CORE + POTION,   // 해구의 파동 코어 + 침묵의 심해 비약
                    defense: WING,            // 청해룡의 날개
                    regen: CORE + POTION,     // 해구의 파동 코어 + 침묵의 심해 비약
                    poison: POTION + WING     // 침묵의 심해 비약 + 청해룡의 날개
                };

                let ess = {
                    guard: crystal.vital + crystal.defense,       // 수호 에센스
                    wave: crystal.erosion + crystal.regen,       // 파동 에센스
                    chaos: crystal.defense + crystal.poison,     // 혼란 에센스
                    life: crystal.vital + crystal.regen,         // 생명 에센스
                    decay: crystal.erosion + crystal.poison      // 부식 에센스
                };

                // 에센스 요구량을 초과하면 건너뜀
                if (ess.guard > input.guard || ess.wave > input.wave || ess.chaos > input.chaos || ess.life > input.life || ess.decay > input.decay)
                    continue;

                let gold = CORE * GOLD_2STAR.CORE + POTION * GOLD_2STAR.POTION + WING * GOLD_2STAR.WING;
                if (gold > best.gold) best = { gold, CORE, POTION, WING };
            }
        }
    }
    if (best.gold < 0) return null;

    // 크리스탈 및 에센스 계산
    let crystalNeed = {
        vital: best.CORE + best.WING,        // 해구의 파동 코어 + 청해룡의 날개
        erosion: best.CORE + best.POTION,    // 해구의 파동 코어 + 침묵의 심해 비약
        defense: best.WING,                  // 청해룡의 날개
        regen: best.CORE + best.POTION,      // 해구의 파동 코어 + 침묵의 심해 비약
        poison: best.POTION + best.WING      // 침묵의 심해 비약 + 청해룡의 날개
    };

    let essNeed = {
        guard: crystalNeed.vital + crystalNeed.defense,  // 수호 에센스
        wave: crystalNeed.erosion + crystalNeed.regen,   // 파동 에센스
        chaos: crystalNeed.defense + crystalNeed.poison, // 혼란 에센스
        life: crystalNeed.vital + crystalNeed.regen,     // 생명 에센스
        decay: crystalNeed.erosion + crystalNeed.poison   // 부식 에센스
    };

    // 각 에센스에 필요한 산호 블럭 계산
    let coralBlockNeed = {
        guard: essNeed.guard,  // 수호 에센스: 관 산호 블럭
        wave: essNeed.wave,    // 파동 에센스: 사방 산호 블럭
        chaos: essNeed.chaos,  // 혼란 에센스: 거품 산호 블럭
        life: essNeed.life,    // 생명 에센스: 불 산호 블럭
        decay: essNeed.decay   // 부식 에센스: 뇌 산호 블럭
    };

    // 필요한 재료 계산 (각 에센스마다 1개씩 산호 블럭 사용)
    let materialNeed = {
        seaweed: 2 * (essNeed.guard + essNeed.wave + essNeed.chaos + essNeed.life + essNeed.decay), // 해초의 수량 (각 영약마다 2개씩)
        ink: crystalNeed.vital + crystalNeed.erosion + crystalNeed.defense + crystalNeed.regen + crystalNeed.poison, // 먹물 수량
        coralBlock: coralBlockNeed.guard + coralBlockNeed.wave + coralBlockNeed.chaos + coralBlockNeed.life + coralBlockNeed.decay // 산호 블럭 수량 (각 에센스마다 1개씩)
    };

    // 필요한 광물 계산 (각 영약에 필요한 광물 수량)
    let mineralNeed = {
        lapis: crystalNeed.vital * 1,    // 청금석 블록 (활기 보존의 결정)
        redstone: crystalNeed.erosion * 1, // 레드스톤 블록 (파도 침식의 결정)
        iron: crystalNeed.defense * 1,    // 철 (방어 오염의 결정)
        gold: crystalNeed.regen * 1,      // 금 (격류 재생의 결정)
        diamond: crystalNeed.poison * 1   // 다이아몬드 (맹독 혼란의 결정)
    };

    return { best, essNeed, crystalNeed, materialNeed, mineralNeed };
}

window.run2StarOptimization = function run2StarOptimization() {
    const r = calculate2Star({
        guard: +document.getElementById("input-guard-2").value,
        wave: +document.getElementById("input-wave-2").value,
        chaos: +document.getElementById("input-chaos-2").value,
        life: +document.getElementById("input-life-2").value,
        decay: +document.getElementById("input-decay-2").value
    });
    if (!r) return alert("재료 부족");

    const premiumLV = +document.getElementById("info-expert-premium-price").value;
    const PREMIUM_PRICE_RATE = { 1: 0.05, 2: 0.07, 3: 0.10, 4: 0.15, 5: 0.20, 6: 0.30, 7: 0.40, 8: 0.50 };
    const rate = PREMIUM_PRICE_RATE[premiumLV] || 0;

    const finalGold = Math.floor(r.best.gold * (1 + rate));

    document.getElementById("result-gold-2").textContent = finalGold;
    
    // 프리미엄 보너스 퍼센트 표시
    const bonusText = premiumLV ? `+${Math.floor(rate * 100)}%` : '+0%';
    document.getElementById("result-premium-bonus-2").textContent = bonusText;

    document.getElementById("result-acutis-2").textContent = r.best.CORE;
    document.getElementById("result-frenzy-2").textContent = r.best.POTION;
    document.getElementById("result-feather-2").textContent = r.best.WING;

    // 에센스 수량 표시
    document.getElementById("result-essence-2").textContent =
        `수호 ${r.essNeed.guard}, 파동 ${r.essNeed.wave}, 혼란 ${r.essNeed.chaos}, 생명 ${r.essNeed.life}, 부식 ${r.essNeed.decay}`;
    
    // 결정 수량 표시
    document.getElementById("result-core-2").textContent =
        `활기 보존 ${r.crystalNeed.vital}, 파도 침식 ${r.crystalNeed.erosion}, 방어 오염 ${r.crystalNeed.defense}, 격류 재생 ${r.crystalNeed.regen}, 맹독 혼란 ${r.crystalNeed.poison}`;

    // 해초 및 먹물 수량 표시
    document.getElementById("result-material-2").textContent =
        `해초 ${r.materialNeed.seaweed}, 먹물 ${r.materialNeed.ink}`;

    // 산호 블럭 수량 수정: 각 에센스별로 1개씩 산호 블럭 사용
    // 각 에센스별로 산호 블럭 수를 따로 반영
    let coralNeed = {
        관: r.essNeed.guard,
        사방: r.essNeed.wave,
        거품: r.essNeed.chaos,
        불: r.essNeed.life,
        뇌: r.essNeed.decay
    };
    document.getElementById("result-coral-2").textContent =
        `관 ${coralNeed.관}, 사방 ${coralNeed.사방}, 거품 ${coralNeed.거품}, 불 ${coralNeed.불}, 뇌 ${coralNeed.뇌}`;

    // 광물 수량 표시
    document.getElementById("result-extra-2").textContent =
        `청금석 블록 ${r.mineralNeed.lapis}, 레드스톤 블록 ${r.mineralNeed.redstone}, 철 ${r.mineralNeed.iron}, 금 ${r.mineralNeed.gold}, 다이아 ${r.mineralNeed.diamond}`;
}


