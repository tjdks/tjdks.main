// 어패류 → 정수
const fishToInteger = {
    '굴': '수호',
    '소라': '파동',
    '문어': '혼란',
    '미역': '생명',
    '성게': '부식'
};

// 정수 → 핵 필요량 (생선 포함)
const nucleusNeed = {
    '물결 수호': {'수호':1,'파동':1,'새우':1},
    '파동 오염': {'파동':1,'혼란':1,'도미':1},
    '질서 파괴': {'혼란':1,'생명':1,'청어':1},
    '활력 붕괴': {'생명':1,'부식':1,'금붕어':1},
    '침식 방어': {'부식':1,'수호':1,'농어':1}
};

// 최종 결과물 → 필요한 핵 + 가격
const finalProduct = {
    '영생의 아쿠티스': {'핵':['물결 수호','질서 파괴','활력 붕괴'], '가격':2403},
    '크라켄의 광란체': {'핵':['질서 파괴','활력 붕괴','파동 오염'], '가격':2438},
    '리바이던의 깃털': {'핵':['침식 방어','파동 오염','물결 수호'], '가격':2512}
};

// 사용 가능한 생선/블록 (충분히 있다고 가정)
const fishForNucleus = ['새우','도미','청어','금붕어','농어'];
const blocks = ['점토','모래','흙','자갈','화강암'];

// 계산 버튼 클릭
document.getElementById('calcBtn').addEventListener('click',()=>{
    // 1️⃣ 입력 어패류
    const fishQty = {};
    ['굴','소라','문어','미역','성게'].forEach(f=>{
        fishQty[f] = parseInt(document.getElementById(f).value||0);
    });

    // 정수 계산
    const integers = {};
    for (let f in fishQty) integers[fishToInteger[f]] = fishQty[f];

    // 2️⃣ 브루트포스로 최대 골드 조합 계산
    let maxGold = 0;
    let bestCombo = {'영생의 아쿠티스':0,'크라켄의 광란체':0,'리바이던의 깃털':0};
    let usedIntegers = {};
    let usedNucleus = {};

    // 최종 결과물 최대 생성 가능 수
    const maxCount = {};
    for(let key in finalProduct){
        const need = {'수호':0,'파동':0,'혼란':0,'생명':0,'부식':0};
        finalProduct[key]['핵'].forEach(nuc=>{
            for(let intg in nucleusNeed[nuc]){
                if(['수호','파동','혼란','생명','부식'].includes(intg)){
                    need[intg] += nucleusNeed[nuc][intg];
                }
            }
        });
        maxCount[key] = Math.min(...Object.keys(need).map(k=>need[k]?Math.floor(integers[k]/need[k]):Infinity));
    }

    // 브루트포스
    for(let a=0;a<=maxCount['영생의 아쿠티스'];a++){
        for(let b=0;b<=maxCount['크라켄의 광란체'];b++){
            for(let c=0;c<=maxCount['리바이던의 깃털'];c++){
                // 필요한 정수 합계
                const needInt = {'수호':0,'파동':0,'혼란':0,'생명':0,'부식':0};
                const needNuc = {'물결 수호':0,'파동 오염':0,'질서 파괴':0,'활력 붕괴':0,'침식 방어':0};
                const addReq = (count,key)=>{
                    finalProduct[key]['핵'].forEach(nuc=>{
                        needNuc[nuc] += count;
                        for(let intg in nucleusNeed[nuc]){
                            if(['수호','파동','혼란','생명','부식'].includes(intg)){
                                needInt[intg] += nucleusNeed[nuc][intg]*count;
                            }
                        }
                    });
                };
                addReq(a,'영생의 아쿠티스');
                addReq(b,'크라켄의 광란체');
                addReq(c,'리바이던의 깃털');

                let ok = true;
                for(let k in needInt) if(needInt[k]>integers[k]) ok=false;
                if(!ok) continue;

                const total = a*finalProduct['영생의 아쿠티스']['가격'] + b*finalProduct['크라켄의 광란체']['가격'] + c*finalProduct['리바이던의 깃털']['가격'];
                if(total>maxGold){
                    maxGold = total;
                    bestCombo = {'영생의 아쿠티스':a,'크라켄의 광란체':b,'리바이던의 깃털':c};
                    usedIntegers = {};
                    for(let k in integers) usedIntegers[k] = needInt[k];
                    usedNucleus = {...needNuc};
                }
            }
        }
    }

    // 출력
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
💰 총 획득 골드 : ${maxGold}<br>
리바이던의 깃털 : ${bestCombo['리바이던의 깃털']}<br>
크라켄의 광란체 : ${bestCombo['크라켄의 광란체']}<br>
영생의 아쿠티스 : ${bestCombo['영생의 아쿠티스']}<br>

<hr style="border:0;border-top:1px solid #ccc;margin:6px 0;">

<strong>정수 ( 필요 / 잔여 )</strong><br>
수호 : ${usedIntegers['수호']} / ${integers['수호']-usedIntegers['수호']}<br>
파동 : ${usedIntegers['파동']} / ${integers['파동']-usedIntegers['파동']}<br>
혼란 : ${usedIntegers['혼란']} / ${integers['혼란']-usedIntegers['혼란']}<br>
생명 : ${usedIntegers['생명']} / ${integers['생명']-usedIntegers['생명']}<br>
부식 : ${usedIntegers['부식']} / ${integers['부식']-usedIntegers['부식']}<br>

<hr style="border:0;border-top:1px solid #ccc;margin:6px 0;">

<strong>핵 ( 필요 / 잔여 )</strong><br>
물결 수호 : ${usedNucleus['물결 수호']} / -<br>
파동 오염 : ${usedNucleus['파동 오염']} / -<br>
질서 파괴 : ${usedNucleus['질서 파괴']} / -<br>
활력 붕괴 : ${usedNucleus['활력 붕괴']} / -<br>
침식 방어 : ${usedNucleus['침식 방어']} / -<br>

<hr style="border:0;border-top:1px solid #ccc;margin:6px 0;">

<strong>제작에 필요한 생선</strong><br>
새우 : ${usedNucleus['물결 수호']} , 도미 : ${usedNucleus['파동 오염']} , 청어 : ${usedNucleus['질서 파괴']} , 금붕어 : ${usedNucleus['활력 붕괴']} , 농어 : ${usedNucleus['침식 방어']}<br>

<strong>제작에 필요한 블록</strong><br>
점토 : ${fishQty['굴']} , 모래 : ${fishQty['소라']} , 흙 : ${fishQty['문어']} , 자갈 : ${fishQty['미역']} , 화강암 : ${fishQty['성게']}
    `;
});
