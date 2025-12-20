/*************************************************
 * 2️⃣ 2성 계산기 (ocean2nd.js) - 고급 입력 모드 추가
 *************************************************/

document.addEventListener('DOMContentLoaded', () => {

    const GOLD_2STAR = { CORE: 7413, POTION: 7487, WING: 7592 };
    const CRYSTAL_TO_ESSENCE = {
        vital: { guard: 1, life: 1 },
        erosion: { wave: 1, decay: 1 },
        defense: { guard: 1, chaos: 1 },
        regen: { wave: 1, life: 1 },
        poison: { chaos: 1, decay: 1 }
    };
    const SET_COUNT = 64;
    const setSwitcher = document.getElementById('switcher-set');
    const advancedSwitcher = document.getElementById('switcher-advanced');

    const inputs = [
        document.getElementById("input-guard-2"),
        document.getElementById("input-wave-2"),
        document.getElementById("input-chaos-2"),
        document.getElementById("input-life-2"),
        document.getElementById("input-decay-2")
    ];

    // ===== 고급 입력 모드 토글 =====
    advancedSwitcher?.addEventListener('change', function() {
        const advancedInputs = document.getElementById('advanced-inputs-2');
        if (advancedInputs) {
            if (this.checked) {
                advancedInputs.classList.add('active');
            } else {
                advancedInputs.classList.remove('active');
            }
        }
    });

    function formatSet(num) {
        const sets = Math.floor(num / SET_COUNT);
        const remainder = num % SET_COUNT;
        if (sets > 0 && remainder > 0) return `${sets} / ${remainder}`;
        if (sets > 0) return `${sets} / 0`;
        return `0 / ${remainder}`;
    }

    // ===== 계산 함수 =====
    window.calculate2Star = function(input) {
        const isAdvanced = Number.isFinite(input.crystalVital) && input.crystalVital >= 0;

        let best = { gold: -1, CORE: 0, POTION: 0, WING: 0 };

        // 보유 결정을 에센스로 환산
        let essFromCrystal = { guard: 0, wave: 0, chaos: 0, life: 0, decay: 0 };
        if (isAdvanced) {
            essFromCrystal.guard = input.crystalVital * CRYSTAL_TO_ESSENCE.vital.guard + 
                                    input.crystalDefense * CRYSTAL_TO_ESSENCE.defense.guard;
            essFromCrystal.wave = input.crystalErosion * CRYSTAL_TO_ESSENCE.erosion.wave + 
                                   input.crystalRegen * CRYSTAL_TO_ESSENCE.regen.wave;
            essFromCrystal.chaos = input.crystalDefense * CRYSTAL_TO_ESSENCE.defense.chaos + 
                                    input.crystalPoison * CRYSTAL_TO_ESSENCE.poison.chaos;
            essFromCrystal.life = input.crystalVital * CRYSTAL_TO_ESSENCE.vital.life + 
                                   input.crystalRegen * CRYSTAL_TO_ESSENCE.regen.life;
            essFromCrystal.decay = input.crystalErosion * CRYSTAL_TO_ESSENCE.erosion.decay + 
                                    input.crystalPoison * CRYSTAL_TO_ESSENCE.poison.decay;
        }

        // 총 보유 에센스
        const totalEss = {
            guard: input.guard + (input.essGuard || 0) + essFromCrystal.guard,
            wave: input.wave + (input.essWave || 0) + essFromCrystal.wave,
            chaos: input.chaos + (input.essChaos || 0) + essFromCrystal.chaos,
            life: input.life + (input.essLife || 0) + essFromCrystal.life,
            decay: input.decay + (input.essDecay || 0) + essFromCrystal.decay
        };

        // 최적화: limit 설정
        let limit = Math.ceil(Math.max(
            totalEss.guard / 2,
            totalEss.wave / 2,
            totalEss.chaos / 2,
            totalEss.life / 2,
            totalEss.decay / 2
        )) + 5;

        for (let CORE = 0; CORE <= limit; CORE++) {
            for (let POTION = 0; POTION <= limit; POTION++) {
                for (let WING = 0; WING <= limit; WING++) {
                    let crystal = {
                        vital: CORE + WING,
                        erosion: CORE + POTION,
                        defense: WING,
                        regen: CORE + POTION,
                        poison: POTION + WING
                    };
                    let ess = {
                        guard: crystal.vital + crystal.defense,
                        wave: crystal.erosion + crystal.regen,
                        chaos: crystal.defense + crystal.poison,
                        life: crystal.vital + crystal.regen,
                        decay: crystal.erosion + crystal.poison
                    };

                    if (ess.guard > totalEss.guard || ess.wave > totalEss.wave || ess.chaos > totalEss.chaos ||
                        ess.life > totalEss.life || ess.decay > totalEss.decay)
                        continue;

                    let gold = CORE * GOLD_2STAR.CORE + POTION * GOLD_2STAR.POTION + WING * GOLD_2STAR.WING;
                    if (gold > best.gold) best = { gold, CORE, POTION, WING };
                }
            }
        }

        if (best.gold < 0) return null;

        let crystalNeed = {
            vital: best.CORE + best.WING,
            erosion: best.CORE + best.POTION,
            defense: best.WING,
            regen: best.CORE + best.POTION,
            poison: best.POTION + best.WING
        };

        let essNeed = {
            guard: crystalNeed.vital + crystalNeed.defense,
            wave: crystalNeed.erosion + crystalNeed.regen,
            chaos: crystalNeed.defense + crystalNeed.poison,
            life: crystalNeed.vital + crystalNeed.regen,
            decay: crystalNeed.erosion + crystalNeed.poison
        };

        let coralBlockNeed = {
            guard: essNeed.guard,
            wave: essNeed.wave,
            chaos: essNeed.chaos,
            life: essNeed.life,
            decay: essNeed.decay
        };

        let materialNeed = {
            seaweed: 2 * (essNeed.guard + essNeed.wave + essNeed.chaos + essNeed.life + essNeed.decay),
            ink: crystalNeed.vital + crystalNeed.erosion + crystalNeed.defense + crystalNeed.regen + crystalNeed.poison,
            coralBlock: coralBlockNeed.guard + coralBlockNeed.wave + coralBlockNeed.chaos + coralBlockNeed.life + coralBlockNeed.decay
        };

        let mineralNeed = {
            lapis: crystalNeed.vital,
            redstone: crystalNeed.erosion,
            iron: crystalNeed.defense,
            gold: crystalNeed.regen,
            diamond: crystalNeed.poison
        };

        // 고급 모드일 경우 보유량 차감
        let crystalToMake = { vital: 0, erosion: 0, defense: 0, regen: 0, poison: 0 };
        let essToMake = { guard: 0, wave: 0, chaos: 0, life: 0, decay: 0 };
        let finalEssNeed = { guard: 0, wave: 0, chaos: 0, life: 0, decay: 0 };

        if (isAdvanced) {
            crystalToMake = {
                vital: Math.max(0, crystalNeed.vital - input.crystalVital),
                erosion: Math.max(0, crystalNeed.erosion - input.crystalErosion),
                defense: Math.max(0, crystalNeed.defense - input.crystalDefense),
                regen: Math.max(0, crystalNeed.regen - input.crystalRegen),
                poison: Math.max(0, crystalNeed.poison - input.crystalPoison)
            };

            // 제작할 결정에 필요한 에센스
            essToMake.guard = crystalToMake.vital * CRYSTAL_TO_ESSENCE.vital.guard + 
                              crystalToMake.defense * CRYSTAL_TO_ESSENCE.defense.guard;
            essToMake.wave = crystalToMake.erosion * CRYSTAL_TO_ESSENCE.erosion.wave + 
                             crystalToMake.regen * CRYSTAL_TO_ESSENCE.regen.wave;
            essToMake.chaos = crystalToMake.defense * CRYSTAL_TO_ESSENCE.defense.chaos + 
                              crystalToMake.poison * CRYSTAL_TO_ESSENCE.poison.chaos;
            essToMake.life = crystalToMake.vital * CRYSTAL_TO_ESSENCE.vital.life + 
                             crystalToMake.regen * CRYSTAL_TO_ESSENCE.regen.life;
            essToMake.decay = crystalToMake.erosion * CRYSTAL_TO_ESSENCE.erosion.decay + 
                              crystalToMake.poison * CRYSTAL_TO_ESSENCE.poison.decay;

            // 제작해야 할 에센스
            finalEssNeed = {
                guard: Math.max(0, essToMake.guard - input.essGuard),
                wave: Math.max(0, essToMake.wave - input.essWave),
                chaos: Math.max(0, essToMake.chaos - input.essChaos),
                life: Math.max(0, essToMake.life - input.essLife),
                decay: Math.max(0, essToMake.decay - input.essDecay)
            };
        }

        return { best, essNeed, crystalNeed, crystalToMake, essToMake, finalEssNeed, materialNeed, mineralNeed, coralBlockNeed };
    };

    // ===== 결과 업데이트 =====
    function update2StarResult(r) {
        const premiumLV = +document.getElementById("info-expert-premium-price").value || 0;
        const PREMIUM_PRICE_RATE = {1:0.05,2:0.07,3:0.10,4:0.15,5:0.20,6:0.30,7:0.40,8:0.50};
        const rate = PREMIUM_PRICE_RATE[premiumLV] || 0;

        document.getElementById("result-gold-2").textContent = Math.floor(r.best.gold * (1 + rate)).toLocaleString();
        document.getElementById("result-premium-bonus-2").textContent = premiumLV ? `+${Math.floor(rate*100)}%` : '+0%';

        document.getElementById("result-acutis-2").textContent = setSwitcher.checked ? formatSet(r.best.CORE) : r.best.CORE;
        document.getElementById("result-frenzy-2").textContent = setSwitcher.checked ? formatSet(r.best.POTION) : r.best.POTION;
        document.getElementById("result-feather-2").textContent = setSwitcher.checked ? formatSet(r.best.WING) : r.best.WING;

        const isAdvanced = advancedSwitcher && advancedSwitcher.checked;
        const essData = isAdvanced ? r.finalEssNeed : r.essNeed;
        const crystalData = isAdvanced ? r.crystalToMake : r.crystalNeed;

        document.getElementById("result-essence-2").textContent =
            `수호 ${setSwitcher.checked ? formatSet(essData.guard || 0) : (essData.guard || 0)}, ` +
            `파동 ${setSwitcher.checked ? formatSet(essData.wave || 0) : (essData.wave || 0)}, ` +
            `혼란 ${setSwitcher.checked ? formatSet(essData.chaos || 0) : (essData.chaos || 0)}, ` +
            `생명 ${setSwitcher.checked ? formatSet(essData.life || 0) : (essData.life || 0)}, ` +
            `부식 ${setSwitcher.checked ? formatSet(essData.decay || 0) : (essData.decay || 0)}`;

        document.getElementById("result-core-2").textContent =
            `활기 보존 ${setSwitcher.checked ? formatSet(crystalData.vital || 0) : (crystalData.vital || 0)}, ` +
            `파도 침식 ${setSwitcher.checked ? formatSet(crystalData.erosion || 0) : (crystalData.erosion || 0)}, ` +
            `방어 오염 ${setSwitcher.checked ? formatSet(crystalData.defense || 0) : (crystalData.defense || 0)}, ` +
            `격류 재생 ${setSwitcher.checked ? formatSet(crystalData.regen || 0) : (crystalData.regen || 0)}, ` +
            `맹독 혼란 ${setSwitcher.checked ? formatSet(crystalData.poison || 0) : (crystalData.poison || 0)}`;

        document.getElementById("result-material-2").textContent =
            `해초 ${setSwitcher.checked ? formatSet(r.materialNeed.seaweed) : r.materialNeed.seaweed}, ` +
            `먹물 ${setSwitcher.checked ? formatSet(r.materialNeed.ink) : r.materialNeed.ink}`;

        document.getElementById("result-coral-2").textContent =
            `관 ${setSwitcher.checked ? formatSet(r.coralBlockNeed.guard) : r.coralBlockNeed.guard}, ` +
            `사방 ${setSwitcher.checked ? formatSet(r.coralBlockNeed.wave) : r.coralBlockNeed.wave}, ` +
            `거품 ${setSwitcher.checked ? formatSet(r.coralBlockNeed.chaos) : r.coralBlockNeed.chaos}, ` +
            `불 ${setSwitcher.checked ? formatSet(r.coralBlockNeed.life) : r.coralBlockNeed.life}, ` +
            `뇌 ${setSwitcher.checked ? formatSet(r.coralBlockNeed.decay) : r.coralBlockNeed.decay}`;

        document.getElementById("result-extra-2").textContent =
            `청금석 블록 ${setSwitcher.checked ? formatSet(r.mineralNeed.lapis) : r.mineralNeed.lapis}, ` +
            `레드스톤 블록 ${setSwitcher.checked ? formatSet(r.mineralNeed.redstone) : r.mineralNeed.redstone}, ` +
            `철 ${setSwitcher.checked ? formatSet(r.mineralNeed.iron) : r.mineralNeed.iron}, ` +
            `금 ${setSwitcher.checked ? formatSet(r.mineralNeed.gold) : r.mineralNeed.gold}, ` +
            `다이아 ${setSwitcher.checked ? formatSet(r.mineralNeed.diamond) : r.mineralNeed.diamond}`;

        window.last2StarResult = r;
    }

    // ===== 버튼 클릭 함수 =====
    window.run2StarOptimization = function() {
        const isAdvanced = advancedSwitcher && advancedSwitcher.checked;

        const input = {
            guard: +document.getElementById("input-guard-2").value || 0,
            wave: +document.getElementById("input-wave-2").value || 0,
            chaos: +document.getElementById("input-chaos-2").value || 0,
            life: +document.getElementById("input-life-2").value || 0,
            decay: +document.getElementById("input-decay-2").value || 0
        };

        if (isAdvanced) {
            input.essGuard = +document.getElementById("input-essence-guard-2")?.value || 0;
            input.essWave = +document.getElementById("input-essence-wave-2")?.value || 0;
            input.essChaos = +document.getElementById("input-essence-chaos-2")?.value || 0;
            input.essLife = +document.getElementById("input-essence-life-2")?.value || 0;
            input.essDecay = +document.getElementById("input-essence-decay-2")?.value || 0;

            input.crystalVital = +document.getElementById("input-crystal-vital-2")?.value || 0;
            input.crystalErosion = +document.getElementById("input-crystal-erosion-2")?.value || 0;
            input.crystalDefense = +document.getElementById("input-crystal-defense-2")?.value || 0;
            input.crystalRegen = +document.getElementById("input-crystal-regen-2")?.value || 0;
            input.crystalPoison = +document.getElementById("input-crystal-poison-2")?.value || 0;
        } else {
            input.essGuard = input.essWave = input.essChaos = input.essLife = input.essDecay = 0;
            input.crystalVital = input.crystalErosion = input.crystalDefense = input.crystalRegen = input.crystalPoison = 0;
        }

        const r = calculate2Star(input);
        if (!r) return alert("재료 부족");

        update2StarResult(r);
    };

    // ===== 스위치 토글 시 기존 결과 재포맷 =====
    if (setSwitcher) {
        setSwitcher.addEventListener('change', () => {
            if (window.last2StarResult) update2StarResult(window.last2StarResult);
        });
    }

    if (advancedSwitcher) {
        advancedSwitcher.addEventListener('change', () => {
            if (window.last2StarResult) update2StarResult(window.last2StarResult);
        });
    }

    // ===== 입력칸 세트 표시 =====
    inputs.forEach(input => {
        if (!input) return;
        const span = document.createElement('span');
        span.className = 'set-display';
        input.parentNode.appendChild(span);

        input.addEventListener('input', () => {
            const value = parseInt(input.value) || 0;
            if (setSwitcher && setSwitcher.checked) {
                const sets = Math.floor(value / SET_COUNT);
                const remainder = value % SET_COUNT;
                span.textContent = ` ${sets} / ${remainder}`;
            } else {
                span.textContent = '';
            }
        });
    });
});