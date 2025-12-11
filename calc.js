// calc.js (수정판)
// 어패류 입력 -> 정수(1:1) -> 핵(정수+생선) -> 최종 아이템(A/K/L)
// 세트/낱개 모드(세트: 64개) 지원, 기존 보유 정수/핵 반영
// 최적화: 총 골드 최대화. 동률이면 남는 정수 합 최소화.

function getValue(id) {
    const el = document.getElementById(id);
    if (!el) return 0;
    const v = el.value;
    return v === "" ? 0 : Number(v);
}

// 읽기: '세트/낱개' 모드를 지원하는 함수
function getFishValue(name) {
    // inputMode는 index.html 쪽에서 전역으로 관리됨 (setMode 함수)
    // 안전하게 window.inputMode로 접근
    const mode = (typeof window.inputMode !== "undefined") ? window.inputMode : "normal";

    if (mode === "normal") {
        // 일반 입력: id = name
        return getValue(name);
    } else {
        // 세트/낱개 입력: HTML에서 세트 id = `${name}_set`, 낱개 id = `${name}_single`
        const setId = `${name}_set`;
        const singleId = `${name}_single`;

        const set = getValue(setId);
        const single = getValue(singleId);
        return (set * 64) + single;
    }
}

// 블럭 필요량 per 정수
const BLOCK_PER_ESSENCE = {
    G: { clay: 2 },    // 수호 <- 점토 2
    W: { sand: 3 },    // 파동 <- 모래 3
    C: { dirt: 4 },    // 혼란 <- 흙 4
    L: { gravel: 3 },  // 생명 <- 자갈 3
    Co: { granite: 1 } // 부식 <- 화강암 1
};

// 핵 레시피: [정수1, 정수2, 생선]
const CORE_RECIPES = {
    WG: ["G", "W", "새우"],    // 물결 수호
    WP: ["W", "C", "도미"],    // 파동 오염
    OD: ["C", "L", "청어"],    // 질서 파괴
    VD: ["L", "Co", "금붕어"], // 활력 붕괴
    ED: ["Co", "G", "농어"]    // 침식 방어
};

// 최종 아이템 레시피 + 가격
const FINAL_RECIPES = {
    AQT: { cores: ["WG","OD","VD"], price: 2403 }, // 영생의 아쿠티스
    KRK: { cores: ["OD","VD","WP"], price: 2438 }, // 크라켄
    LVB: { cores: ["ED","WP","WG"], price: 2512 }  // 리바이던
};

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('calcBtn');
    if (!btn) {
        console.warn("calc.js: calculateBtn not found.");
        return;
    }

    btn.addEventListener('click', () => {
        // --- 어패류 입력 (세트/일반 모드 자동 처리) ---
        const shells = {
            G: getFishValue('굴'),    // 수호 from 굴
            W: getFishValue('소라'),  // 파동 from 소라
            C: getFishValue('문어'),  // 혼란 from 문어
            L: getFishValue('미역'),  // 생명 from 미역
            Co: getFishValue('성게')  // 부식 from 성게
        };

        // 기존 보유 정수 추가 (사용자 입력 가능)
        const existingEssences = {
            G: getValue('eG_exist') || 0,
            W: getValue('eW_exist') || 0,
            C: getValue('eC_exist') || 0,
            L: getValue('eL_exist') || 0,
            Co: getValue('eCo_exist') || 0
        };

        // 기존 보유 핵
        const existingCores = {
            WG: getValue('cWG_exist') || 0,
            WP: getValue('cWP_exist') || 0,
            OD: getValue('cOD_exist') || 0,
            VD: getValue('cVD_exist') || 0,
            ED: getValue('cED_exist') || 0
        };

        // 총 정수 보유(어패류에서 자동 생성 + 기존 보유)
        const totalEssences = {
            G: shells.G + existingEssences.G,
            W: shells.W + existingEssences.W,
            C: shells.C + existingEssences.C,
            L: shells.L + existingEssences.L,
            Co: shells.Co + existingEssences.Co
        };

        // 상한 계산: 정수 총합 -> 만들 수 있는 핵 상한 (정수 2개당 핵 1개)
        const sumEss = totalEssences.G + totalEssences.W + totalEssences.C + totalEssences.L + totalEssences.Co;
        const potentialNewCores = Math.floor(sumEss / 2);
        const coreUpper = existingCores.WG + existingCores.WP + existingCores.OD + existingCores.VD + existingCores.ED + potentialNewCores;
        const maxFinalsTotal = Math.floor(coreUpper / 3);
        const maxFinals = Math.min(Math.max(maxFinalsTotal, 0), 200); // 안전 상한

        // brute-force A,K,L
        let best = null;

        for (let A = 0; A <= maxFinals; A++) {
            for (let K = 0; K <= maxFinals - A; K++) {
                for (let L = 0; L <= maxFinals - A - K; L++) {

                    // 필요 핵 수
                    const need_WG = A + L;
                    const need_WP = K + L;
                    const need_OD = A + K;
                    const need_VD = A + K;
                    const need_ED = L;

                    // 추가 제작 필요한 핵 수(기존핵 차감)
                    const make_WG = Math.max(0, need_WG - existingCores.WG);
                    const make_WP = Math.max(0, need_WP - existingCores.WP);
                    const make_OD = Math.max(0, need_OD - existingCores.OD);
                    const make_VD = Math.max(0, need_VD - existingCores.VD);
                    const make_ED = Math.max(0, need_ED - existingCores.ED);

                    // 요구되는 정수 수량(만들어야 하는 핵만큼 소비)
                    const req_eG = make_WG + make_ED;
                    const req_eW = make_WG + make_WP;
                    const req_eC = make_WP + make_OD;
                    const req_eL = make_OD + make_VD;
                    const req_eCo = make_VD + make_ED;

                    // 보유 정수로 가능한지 검사
                    if (req_eG <= totalEssences.G && req_eW <= totalEssences.W &&
                        req_eC <= totalEssences.C && req_eL <= totalEssences.L &&
                        req_eCo <= totalEssences.Co) {

                        // 필요한 생선 (핵 제작 시 필요)
                        const fishNeeded = {
                            "새우": make_WG,
                            "도미": make_WP,
                            "청어": make_OD,
                            "금붕어": make_VD,
                            "농어": make_ED
                        };

                        // 필요한 블럭
                        const blockNeeded = {
                            clay: req_eG * (BLOCK_PER_ESSENCE.G.clay || 0),
                            sand: req_eW * (BLOCK_PER_ESSENCE.W.sand || 0),
                            dirt: req_eC * (BLOCK_PER_ESSENCE.C.dirt || 0),
                            gravel: req_eL * (BLOCK_PER_ESSENCE.L.gravel || 0),
                            granite: req_eCo * (BLOCK_PER_ESSENCE.Co.granite || 0)
                        };

                        // 총 골드
                        const gold = A * FINAL_RECIPES.AQT.price + K * FINAL_RECIPES.KRK.price + L * FINAL_RECIPES.LVB.price;

                        // 잔여 정수
                        const remain_eG = totalEssences.G - req_eG;
                        const remain_eW = totalEssences.W - req_eW;
                        const remain_eC = totalEssences.C - req_eC;
                        const remain_eL = totalEssences.L - req_eL;
                        const remain_eCo = totalEssences.Co - req_eCo;
                        const remainEssenceSum = remain_eG + remain_eW + remain_eC + remain_eL + remain_eCo;

                        // 잔여 핵
                        const remain_WG = existingCores.WG + make_WG - need_WG;
                        const remain_WP = existingCores.WP + make_WP - need_WP;
                        const remain_OD = existingCores.OD + make_OD - need_OD;
                        const remain_VD = existingCores.VD + make_VD - need_VD;
                        const remain_ED = existingCores.ED + make_ED - need_ED;
                        const remainCoreSum = remain_WG + remain_WP + remain_OD + remain_VD + remain_ED;

                        const candidate = {
                            A, K, L,
                            gold,
                            req_e: { G: req_eG, W: req_eW, C: req_eC, L: req_eL, Co: req_eCo },
                            make_core: { WG: make_WG, WP: make_WP, OD: make_OD, VD: make_VD, ED: make_ED },
                            fishNeeded,
                            blockNeeded,
                            remain_e: { G: remain_eG, W: remain_eW, C: remain_eC, L: remain_eL, Co: remain_eCo },
                            remain_core: { WG: remain_WG, WP: remain_WP, OD: remain_OD, VD: remain_VD, ED: remain_ED },
                            remainEssenceSum,
                            remainCoreSum
                        };

                        if (best === null
                            || candidate.gold > best.gold
                            || (candidate.gold === best.gold && candidate.remainEssenceSum < best.remainEssenceSum)
                            || (candidate.gold === best.gold && candidate.remainEssenceSum === best.remainEssenceSum && candidate.remainCoreSum < best.remainCoreSum)
                        ) {
                            best = candidate;
                        }
                    }
                }
            }
        } // end brute-force

        // 출력
        const out = document.getElementById('result');
        if (!out) return;

        if (!best) {
            out.innerHTML = "<b>현재 자원으로 만들 수 있는 조합이 없습니다.</b>";
            return;
        }

        // 보기 좋게 출력
        const lines = [];
        lines.push(`<h3>📦 최적 결과 (총 골드 최대)</h3>`);
        lines.push(`<p>🟪 리바이던의 깃털: <b>${best.L}</b></p>`);
        lines.push(`<p>🟧 크라켄의 광란체: <b>${best.K}</b></p>`);
        lines.push(`<p>🟦 영생의 아쿠티스: <b>${best.A}</b></p>`);
        lines.push(`<p>💰 총 획득 골드: <b>${best.gold.toLocaleString()} G</b></p>`);

        lines.push(`<h4>🎣 필요 생선 (핵 제작 시 소비)</h4>`);
        lines.push(`<p>새우: ${best.fishNeeded["새우"]}, 도미: ${best.fishNeeded["도미"]}, 청어: ${best.fishNeeded["청어"]}, 금붕어: ${best.fishNeeded["금붕어"]}, 농어: ${best.fishNeeded["농어"]}</p>`);

        lines.push(`<h4>🧱 필요 블럭 (정수 제작을 위해)</h4>`);
        lines.push(`<p>점토: ${best.blockNeeded.clay}, 모래: ${best.blockNeeded.sand}, 흙: ${best.blockNeeded.dirt}, 자갈: ${best.blockNeeded.gravel}, 화강암: ${best.blockNeeded.granite}</p>`);

        lines.push(`<h4>🔁 사용된 정수 (필요 / 보유 총합 / 잔여)</h4>`);
        lines.push(`<p>수호: 필요 ${best.req_e.G} / 보유 ${totalEssences.G} / 잔여 ${best.remain_e.G}</p>`);
        lines.push(`<p>파동: 필요 ${best.req_e.W} / 보유 ${totalEssences.W} / 잔여 ${best.remain_e.W}</p>`);
        lines.push(`<p>혼란: 필요 ${best.req_e.C} / 보유 ${totalEssences.C} / 잔여 ${best.remain_e.C}</p>`);
        lines.push(`<p>생명: 필요 ${best.req_e.L} / 보유 ${totalEssences.L} / 잔여 ${best.remain_e.L}</p>`);
        lines.push(`<p>부식: 필요 ${best.req_e.Co} / 보유 ${totalEssences.Co} / 잔여 ${best.remain_e.Co}</p>`);

        lines.push(`<h4>🔧 핵 (사용 / 기존 보유 / 추가 제작)</h4>`);
        // 사용량 계산: 사용 = 필요핵(need) = (existing + make) - remain
        function usedStr(coreKey) {
            const used = (existingCores[coreKey] + best.make_core[coreKey]) - best.remain_core[coreKey];
            return `${used} / 보유 ${existingCores[coreKey]} / 추가 ${best.make_core[coreKey]}`;
        }
        lines.push(`<p>물결 수호 (WG): ${usedStr('WG')}</p>`);
        lines.push(`<p>파동 오염 (WP): ${usedStr('WP')}</p>`);
        lines.push(`<p>질서 파괴 (OD): ${usedStr('OD')}</p>`);
        lines.push(`<p>활력 붕괴 (VD): ${usedStr('VD')}</p>`);
        lines.push(`<p>침식 방어 (ED): ${usedStr('ED')}</p>`);

        lines.push(`<h4>♻️ 남는 정수 합계: ${best.remainEssenceSum} / 남는 핵 합계: ${best.remainCoreSum}</h4>`);

        lines.push(`<h4>📥 입력 요약</h4>`);
        lines.push(`<p>어패류 입력 — 굴:${shells.G}, 소라:${shells.W}, 문어:${shells.C}, 미역:${shells.L}, 성게:${shells.Co}</p>`);
        lines.push(`<p>기존 정수 입력 — 수호:${existingEssences.G}, 파동:${existingEssences.W}, 혼란:${existingEssences.C}, 생명:${existingEssences.L}, 부식:${existingEssences.Co}</p>`);
        lines.push(`<p>기존 핵 입력 — WG:${existingCores.WG}, WP:${existingCores.WP}, OD:${existingCores.OD}, VD:${existingCores.VD}, ED:${existingCores.ED}</p>`);

        out.innerHTML = lines.join("\n");
    });

    // 기존 보유량 토글 (이미 index.html에도 있음, 중복 안전)
    const toggleBtn = document.getElementById("toggleExisting");
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const box = document.getElementById('existingInputs');
            if (!box) return;
            box.style.display = (box.style.display === 'none' || box.style.display === '') ? 'block' : 'none';
        });
    }
});
