function openTab(tabName) {
    // 모든 section 숨김
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => tab.style.display = "none");

    // 클릭한 탭만 표시
    document.getElementById(tabName).style.display = "block";

    // 모든 탭 버튼에서 active 제거
    const links = document.querySelectorAll("nav a");
    links.forEach(link => link.classList.remove("active"));

    // 현재 클릭된 탭 버튼에 active 추가
    document.getElementById("tab-" + tabName).classList.add("active");
}

// 처음 로드시 홈 탭 선택
openTab("home");
