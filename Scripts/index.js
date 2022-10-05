let attempts = 0;

const wongame = new Audio("../TreasureHunt/audio/win.mp3");
const lostgame = new Audio("../TreasureHunt/audio/lose.mp3");

const submitBtn = document.querySelector("#submit_button");
let userDifficulty = document.querySelector("#selectedDifficulty");
let userName = prompt("Enter your name to start the game");
let table = document.querySelector("#game");

document.querySelector("#name").innerHTML = userName.toUpperCase();

if (!localStorage.getItem("winner")) {
    localStorage.setItem("winner", JSON.stringify([]));
}

// to generate the table
function main(e) {
    console.log
    e.preventDefault();
    console.log("clearing table");
    table.innerHTML = "";
    let tableData = [];
    for (let i = 1; i < 101; i++) {
        // 100 is the number of cells in the table
        tableData.push(i);
    }
    tableData.sort(() => Math.random() - 0.5); // shuffle the numbers

    let row,
        column,
        counter = 0;
    for (let i = 0; i < 10; i++) {
        row = document.createElement("tr");
        for (let j = 0; j < 10; j++) {
            column = document.createElement("td"); // create a cell
            column.id = tableData[counter]; // assign a random number to the cell
            row.appendChild(column); // add the cell to the row
            counter++; // increment the counter
        }
        table.appendChild(row); // add the row to the table
    }
    // console.log(table);
    let tablele = document.querySelectorAll("td");
    tablele.forEach((e) => {
        e.innerHTML = "?";
        e.addEventListener("click", check);
    });
}
// to check the difficulty level
function difficultyCheck() {
    const easyDifficulty = document.querySelector("#difficulty_1");
    const mediumDifficulty = document.querySelector("#difficulty_2");
    const hardDifficulty = document.querySelector("#difficulty_3");
    const d1 = [2, 3, 5, 7, 11];
    const d2 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41];
    const d3 = [
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
        73, 79, 83, 89, 97,
    ];
    if (easyDifficulty.checked) {
        userDifficulty.innerHTML = "Easy";
        return d1;
    } else if (mediumDifficulty.checked) {
        userDifficulty.innerHTML = "Medium";
        return d2;
    } else if (hardDifficulty.checked) {
        userDifficulty.innerHTML = "Hard";
        return d3;
    }
}
function updateAttempts() {
    attempts++;
    document.getElementById("attempts").innerText = attempts; // display the number of attempts
}
let selectedArray = [];
function changeforbomb(e) {
    return new Promise((res, rej) => {
        e.target.style.backgroundColor = "red";
        e.target.innerHTML = "💣";
        setTimeout(() => {
            res();
        }, 0);
    });
}
function changeforwin(e) {
    return new Promise((res, rej) => {
        e.target.style.backgroundColor = "#FFD700";
        e.target.innerHTML = "🏆";
        setTimeout(() => {
            res();
        }, 0);
    });
}

async function check(e) {
    // console.log("clicked");
    let selectedNumber = e.target.id; // get the id of the cell
    console.log(selectedNumber);
    let primeArray = difficultyCheck();
    if (primeArray.includes(parseInt(selectedNumber))) {
        await changeforbomb(e);
        lostgame.play();
        alert(" 🤣 🤣 You lost the game hahahaha 🤣 🤣 ");
        return location.reload("/"); // reload the page
    } else if (selectedNumber == 1) {
        // if the user clicks on the cell with the number 1
        updateAttempts();
        await changeforwin(e);
        wongame.play();
        console.log(attempts);
        let data = { username: userName, attempts: attempts };
        winner = JSON.parse(localStorage.getItem("winner"));
        winner.push(data);
        console.log(winner);
        localStorage.setItem("winner", JSON.stringify(winner));
        alert(`You won, and took ${attempts}tries to win🔥 🔥 🔥`);
        return location.replace("leaderboards.html");
    } else {
        if (!selectedArray.includes(String(selectedNumber))) {
            updateAttempts();
            console.log(selectedArray);
            console.log(selectedNumber);
            console.log(attempts);
            for (let i = selectedNumber; i < 100; i++) {
                if (i % selectedNumber == 0) {
                    document.getElementById(`${i}`).style.backgroundColor = "#736968";
                    selectedArray.push(String(i));
                }
            }
        } else {
            alert(`You have already selected ${selectedNumber} 🙄`);
        }
    }
    selectedArray.forEach((e) => (document.getElementById(`${e}`).innerHTML = "🎃"));
}

submitBtn.addEventListener("click", main);
submitBtn.addEventListener("click", difficultyCheck);