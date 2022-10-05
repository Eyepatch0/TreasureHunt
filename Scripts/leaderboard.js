let rawData = JSON.parse(localStorage.getItem("winner"));
rawData = rawData.flat();
console.log(rawData);

let sortedData = rawData.sort((a, b) => a.attempts - b.attempts);
console.log(sortedData);

let displayData = sortedData.slice(0, 5);
console.log(displayData);

let table = document.getElementById("leaderbody");
for (let i = 0; i < displayData.length; i++) {
    let row = table.insertRow();
    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let cell3 = row.insertCell();
    cell1.innerHTML = i + 1;
    cell2.innerHTML = displayData[i].username;
    cell3.innerHTML = displayData[i].attempts;
};

let play = document.getElementById("play");
play.addEventListener("click", () => {
    window.location.href = "index.html";
}); 