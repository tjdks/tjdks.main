/*************************************************
 * 3️⃣ 3성 계산기
 *************************************************/
const GOLD_3STAR = { AQUA: 10699, NAUTILUS: 10824, SPINE: 10892 }; // 가격 업데이트
const ELIXER_MATERIALS = {
    "불멸 재생의 영약 ★★★": ["수호의 엘릭서 ★★★", "생명의 엘릭서 ★★★", "발광 먹물 주머니", "발광 열매", "수레국화"],
    "파동 장벽의 영약 ★★★": ["파동의 엘릭서 ★★★", "수호의 엘릭서 ★★★", "발광 먹물 주머니", "발광 열매", "민들레"],
    "타락 침식의 영약 ★★★": ["혼란의 엘릭서 ★★★", "부식의 엘릭서 ★★★", "발광 먹물 주머니", "발광 열매", "데이지"],
    "생명 광란의 영약 ★★★": ["생명의 엘릭서 ★★★", "혼란의 엘릭서 ★★★", "발광 먹물 주머니", "발광 열매", "양귀비"],
    "맹독 파동의 영약 ★★★": ["부식의 엘릭서 ★★★", "파동의 엘릭서 ★★★", "발광 먹물 주머니", "발광 열매", "선애기별꽃"]
};

function calculate3Star(input) {
    let best = { gold: -1, AQUA: 0, NAUTILUS: 0, SPINE: 0 };
    let limit = Math.max(10, input.guard + input.wave + input.chaos + input.life + input.decay);

    for (let AQUA = 0; AQUA <= limit; AQUA++) {
        for (let NAUTILUS = 0; NAUTILUS <= limit; NAUTILUS++) {
            for (let SPINE = 0; SPINE <= limit; SPINE++) {
                // 영약 수량 계산 (각각의 영약별로 조합을 고려)
                let potion = {
                    immortal: AQUA + NAUTILUS,  // 불멸 재생의 영약
                    barrier: AQUA + NAUTILUS,   // 파동 장벽의 영약
                    poison: AQUA + SPINE,      // 타락 침식의 영약
                    frenzy: NAUTILUS + SPINE,   // 생명 광란의 영약
                    corrupt: SPINE             // 맹독 파동의 영약
                };

                let elixir = {
                    guard: potion.immortal + potion.barrier,   // 수호 엘릭서
                    wave: potion.barrier + potion.poison,     // 파동 엘릭서
                    chaos: potion.corrupt + potion.frenzy,    // 혼란 엘릭서
                    life: potion.immortal + potion.frenzy,    // 생명 엘릭서
                    decay: potion.corrupt + potion.poison     // 부식 엘릭서
                };

                // 에센스 요구량을 초과하면 건너뜀
                if (
                    elixir.guard > input.guard ||
                    elixir.wave > input.wave ||
                    elixir.chaos > input.chaos ||
                    elixir.life > input.life ||
                    elixir.decay > input.decay
                ) continue;

                // 최적화된 gold 계산
                let gold = AQUA * GOLD_3STAR.AQUA + NAUTILUS * GOLD_3STAR.NAUTILUS + SPINE * GOLD_3STAR.SPINE;
                if (gold > best.gold) best = { gold, AQUA, NAUTILUS, SPINE };
            }
        }
    }

    if (best.gold < 0) return null;

    // 최적의 영약 수량 계산
    let potionNeed = {
        immortal: best.AQUA + best.NAUTILUS,    // 불멸 재생의 영약
        barrier: best.AQUA + best.NAUTILUS,     // 파동 장벽의 영약
        poison: best.AQUA + best.SPINE,         // 타락 침식의 영약
        frenzy: best.NAUTILUS + best.SPINE,     // 생명 광란의 영약
        corrupt: best.SPINE                     // 맹독 파동의 영약
    };

    let elixirNeed = {
        guard: potionNeed.immortal + potionNeed.barrier, // 수호 엘릭서
        wave: potionNeed.barrier + potionNeed.poison,   // 파동 엘릭서
        chaos: potionNeed.corrupt + potionNeed.frenzy,  // 혼란 엘릭서
        life: potionNeed.immortal + potionNeed.frenzy,  // 생명 엘릭서
        decay: potionNeed.corrupt + potionNeed.poison   // 부식 엘릭서
    };

    // 각 재료 계산
    let materialNeed = {
        seaSquirt: potionNeed.immortal + potionNeed.barrier + potionNeed.poison + potionNeed.frenzy + potionNeed.corrupt, // 불우렁쉥이
        bottle: 3 * (potionNeed.immortal + potionNeed.barrier + potionNeed.poison + potionNeed.frenzy + potionNeed.corrupt), // 유리병
        glowInk: potionNeed.immortal + potionNeed.barrier + potionNeed.poison + potionNeed.frenzy + potionNeed.corrupt, // 발광 먹물
        glowBerry: 2 * (potionNeed.immortal + potionNeed.barrier + potionNeed.poison + potionNeed.frenzy + potionNeed.corrupt) // 발광 열매
    };

    let blockNeed = {
        netherrack: elixirNeed.guard * 16,
        magma: elixirNeed.wave * 8,
        soulSand: elixirNeed.chaos * 8,
        crimson: elixirNeed.life * 4,
        warped: elixirNeed.decay * 4
    };

    let flowerNeed = {
        cornflower: potionNeed.immortal * 1,
        dandelion: potionNeed.barrier * 1,
        daisy: potionNeed.corrupt * 1,
        poppy: potionNeed.frenzy * 1,
        azure: potionNeed.poison * 1
    };

    let elixirCombos = {
        "불멸 재생의 영약 ★★★": ELIXER_MATERIALS["불멸 재생의 영약 ★★★"],
        "파동 장벽의 영약 ★★★": ELIXER_MATERIALS["파동 장벽의 영약 ★★★"],
        "타락 침식의 영약 ★★★": ELIXER_MATERIALS["타락 침식의 영약 ★★★"],
        "생명 광란의 영약 ★★★": ELIXER_MATERIALS["생명 광란의 영약 ★★★"],
        "맹독 파동의 영약 ★★★": ELIXER_MATERIALS["맹독 파동의 영약 ★★★"]
    };

    return { best, elixirNeed, potionNeed, materialNeed, blockNeed, flowerNeed, elixirCombos };
}

function run3StarOptimization() {
    const r = calculate3Star({
        guard: +document.getElementById("input-oyster-3").value,
        wave: +document.getElementById("input-conch-3").value,
        chaos: +document.getElementById("input-octopus-3").value,
        life: +document.getElementById("input-seaweed-3").value,
        decay: +document.getElementById("input-urchin-3").value
    });
    if (!r) return alert("재료 부족");

    const premiumLV = +document.getElementById("info-expert-premium-price").value;
    const PREMIUM_PRICE_RATE = { 1: 0.05, 2: 0.07, 3: 0.10, 4: 0.15, 5: 0.20, 6: 0.30, 7: 0.40, 8: 0.50 };
    const rate = PREMIUM_PRICE_RATE[premiumLV] || 0;

    const finalGold = Math.floor(r.best.gold * (1 + rate));

    // 골드와 프리미엄 보너스 출력
    document.getElementById("result-gold-3").textContent = finalGold;
    const bonusText = premiumLV ? `+${Math.floor(rate * 100)}%` : '+0%';
    document.getElementById("result-premium-bonus-3").textContent = bonusText;

    // 아쿠아 펄스, 나우틸러스의 손, 무저의 척추 출력
    document.getElementById("result-aqua-3").textContent = r.best.AQUA;
    document.getElementById("result-nautilus-3").textContent = r.best.NAUTILUS;
    document.getElementById("result-spine-3").textContent = r.best.SPINE;

    // 필요 엘릭서 출력
    document.getElementById("result-essence-3").textContent =
        `수호 ${r.elixirNeed.guard}, 파동 ${r.elixirNeed.wave}, 혼란 ${r.elixirNeed.chaos}, 생명 ${r.elixirNeed.life}, 부식 ${r.elixirNeed.decay}`;

    // 필요 영약 출력
    document.getElementById("result-core-3").textContent =
        `불멸 재생 ${r.potionNeed.immortal}, 파동 장벽 ${r.potionNeed.barrier}, 타락 침식 ${r.potionNeed.poison}, 생명 광란 ${r.potionNeed.frenzy}, 맹독 파동 ${r.potionNeed.corrupt}`;

    // 필요 재료 출력
    document.getElementById("result-material-3").textContent =
        `불우렁쉥이 ${r.materialNeed.seaSquirt}, 유리병 ${r.materialNeed.bottle}, 발광 먹물 ${r.materialNeed.glowInk}, 발광 열매 ${r.materialNeed.glowBerry}`;

    // 필요 블록 출력
    document.getElementById("result-block-3").textContent =
        `네더렉 ${r.blockNeed.netherrack}, 마그마 ${r.blockNeed.magma}, 영혼흙 ${r.blockNeed.soulSand}, 진흥빛자루 ${r.blockNeed.crimson}, 뒤틀린자루 ${r.blockNeed.warped}`;

    // 필요 꽃 출력
    document.getElementById("result-flower-3").textContent =
        `수레국화 ${r.flowerNeed.cornflower}, 민들레 ${r.flowerNeed.dandelion}, 데이지 ${r.flowerNeed.daisy}, 양귀비 ${r.flowerNeed.poppy}, 선애기별꽃 ${r.flowerNeed.azure}`;

    // 결과 카드 보이기
    document.getElementById("result-card-3").style.display = "block";
}