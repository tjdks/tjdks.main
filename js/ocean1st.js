/*************************************************
 * 1️⃣ 1성 계산기
 *************************************************/
const GOLD_1STAR = { A: 3436, K: 3486, L: 3592 };
const CORE_TO_ESSENCE = {
    WG: { guard: 1, wave: 1 },
    WP: { wave: 1, chaos: 1 },
    OD: { chaos: 1, life: 1 },
    VD: { life: 1, decay: 1 },
    ED: { decay: 1, guard: 1 }
};
const ESSENCE_TO_BLOCK = {
    guard: { clay: 1 },
    wave: { sand: 3 },
    chaos: { dirt: 4 },
    life: { gravel: 2 },
    decay: { granite: 1 }
};
const CORE_TO_FISH = {
    WG: { shrimp: 1 },
    WP: { domi: 1 },
    OD: { herring: 1 },
    VD: { goldfish: 1 },
    ED: { bass: 1 }
};


window.calculate1Star = function(input) {
    let best = { gold: -1, A: 0, K: 0, L: 0 };
    const maxA = input.guard + input.decay;
    const maxK = input.wave + input.chaos;
    const maxL = input.decay;

    for (let A = 0; A <= maxA; A++) {
        for (let K = 0; K <= maxK; K++) {
            for (let L = 0; L <= maxL; L++) {
                const ess = {
                    guard: CORE_TO_ESSENCE.WG.guard * (A + L) + CORE_TO_ESSENCE.ED.guard * L,
                    wave: CORE_TO_ESSENCE.WG.wave * (A + L) + CORE_TO_ESSENCE.WP.wave * (K + L),
                    chaos: CORE_TO_ESSENCE.WP.chaos * (K + L) + CORE_TO_ESSENCE.OD.chaos * (A + K),
                    life: CORE_TO_ESSENCE.OD.life * (A + K) + CORE_TO_ESSENCE.VD.life * (A + K),
                    decay: CORE_TO_ESSENCE.VD.decay * (A + K) + CORE_TO_ESSENCE.ED.decay * L
                };

                if (
                    ess.guard > input.guard ||
                    ess.wave > input.wave ||
                    ess.chaos > input.chaos ||
                    ess.life > input.life ||
                    ess.decay > input.decay
                ) continue;

                const gold = A * GOLD_1STAR.A + K * GOLD_1STAR.K + L * GOLD_1STAR.L;
                if (gold > best.gold) best = { gold, A, K, L };
            }
        }
    }

    if (best.gold < 0) return null;

    const coreNeed = {
        WG: best.A + best.L,
        WP: best.K + best.L,
        OD: best.A + best.K,
        VD: best.A + best.K,
        ED: best.L
    };
    const essNeed = {}, blockNeed = {}, fishNeed = {};
    for (let c in coreNeed) {
        add(essNeed, CORE_TO_ESSENCE[c], coreNeed[c]);
        add(fishNeed, CORE_TO_FISH[c], coreNeed[c]);
    }
    for (let e in essNeed) add(blockNeed, ESSENCE_TO_BLOCK[e], essNeed[e]);

    return { best, coreNeed, essNeed, blockNeed, fishNeed };
}

window.run1StarOptimization = function() {
    const r = calculate1Star({
        guard: +document.getElementById("input-oyster-1").value,
        wave: +document.getElementById("input-shell-1").value,
        chaos: +document.getElementById("input-octopus-1").value,
        life: +document.getElementById("input-seaweed-1").value,
        decay: +document.getElementById("input-urchin-1").value
    });
    if (!r) return alert("재료 부족");

    const premiumLV = +document.getElementById("info-expert-premium-price").value;
    const PREMIUM_PRICE_RATE = { 1: 0.05, 2: 0.07, 3: 0.10, 4: 0.15, 5: 0.20, 6: 0.30, 7: 0.40, 8: 0.50 };
    const rate = PREMIUM_PRICE_RATE[premiumLV] || 0;

    // 최종 골드 계산
    const finalGold = Math.floor(r.best.gold * (1 + rate));
    document.getElementById("result-gold-1").textContent = finalGold;

    // 프리미엄 보너스 퍼센트 표시
    const bonusText = premiumLV ? `+${Math.floor(rate * 100)}%` : '+0%';
    document.getElementById("result-premium-bonus-1").textContent = bonusText;

    // 재료 결과 표시
    document.getElementById("result-acutis-1").textContent = r.best.A;
    document.getElementById("result-frenzy-1").textContent = r.best.K;
    document.getElementById("result-feather-1").textContent = r.best.L;

    document.getElementById("result-essence-1").textContent =
        `수호 ${r.essNeed.guard}, 파동 ${r.essNeed.wave}, 혼란 ${r.essNeed.chaos}, 생명 ${r.essNeed.life}, 부식 ${r.essNeed.decay}`;
    document.getElementById("result-core-1").textContent =
        `물결 수호 ${r.coreNeed.WG}, 파동 오염 ${r.coreNeed.WP}, 질서 파괴 ${r.coreNeed.OD}, 활력 붕괴 ${r.coreNeed.VD}, 침식 방어 ${r.coreNeed.ED}`;
    document.getElementById("result-block-1").textContent =
        `점토 ${r.blockNeed.clay || 0}, 모래 ${r.blockNeed.sand || 0}, 흙 ${r.blockNeed.dirt || 0}, 자갈 ${r.blockNeed.gravel || 0}, 화강암 ${r.blockNeed.granite || 0}`;
    document.getElementById("result-fish-1").textContent =
        `새우 ${r.fishNeed.shrimp || 0}, 도미 ${r.fishNeed.domi || 0}, 청어 ${r.fishNeed.herring || 0}, 금붕어 ${r.fishNeed.goldfish || 0}, 농어 ${r.fishNeed.bass || 0}`;
}

