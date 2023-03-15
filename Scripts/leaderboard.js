function addToLeaderboard() {
    arrayOfScores = GLOBAL_roundScores; //For some reason passing an array as a parameter was not working
    $.ajax({
        url: '../Elements/update-leaderboard.php',
        type: 'POST',
        async: false, //Might be able to let this be true
        data: { data: arrayOfScores },
        success: function (data) {
            ret = data;
        }
    })
    console.log(ret);
    console.log("added new score to the leaderboard.");
}

/**
 * @return {Array} An array of the leaderboard contents where indexes are: Array[round number - 1][leaderboard position - 1][score, username, avatarFileName.png]
 */
function getLeaderboardAsArr(){
    $.ajax({
        url: '../Elements/get-leaderboard.php',
        type: 'POST',
        async: false, //Might be able to let this be true
        data: { data: '' },
        success: function (data) {
            leaderboardArray = data;
        }
    })
    
    //convert string representation of array to type array
    leaderboardArray = JSON.parse(leaderboardArray);

    //Split the arr into elements at each comma
    for (var i = 0; i < leaderboardArray.length; i++){
        for (var k = 0; k < leaderboardArray[i].length; k++){
            leaderboardArray[i][k] = leaderboardArray[i][k].split(',');
        }
    }
    console.log(leaderboardArray);
    return leaderboardArray;
}

function outputLeaderboard(roundToOutput, leaderboardArray) {
    //DELETE all of tbody
    const tbody = document.querySelector('tbody');

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    //Output new leaderboard
    const tableBody = document.querySelector('#leaderboard-table tbody');

    for (var i = 0; i < leaderboardArray[roundToOutput - 1].length; i++) {
        const newRow = document.createElement('tr');

        const avatarCell = document.createElement('td');
        const avatarImage = document.createElement('img');
        avatarImage.src = "../generated-images/" + leaderboardArray[roundToOutput - 1][i][2];
        avatarImage.style.width = "25px";
        avatarImage.style.height = "25px";
        avatarCell.appendChild(avatarImage);
        newRow.appendChild(avatarCell);

        const usernameCell = document.createElement('td');
        usernameCell.textContent = leaderboardArray[roundToOutput - 1][i][1];
        newRow.appendChild(usernameCell);

        const scoreCell = document.createElement('td');
        scoreCell.textContent = leaderboardArray[roundToOutput - 1][i][0]
        newRow.appendChild(scoreCell);

        tableBody.appendChild(newRow);
    }
}

// function outputLeaderboardTotal(leaderboardArray) {
//     const tableBody = document.querySelector('#leaderboard-table tbody');
//     for (var k = 0; k < leaderboardArray.length; k++) {
//         roundToOutput = k;
//         for (var i = 0; i < leaderboardArray[roundToOutput].length; i++) {
//             const newRow = document.createElement('tr');

//             const avatarCell = document.createElement('td');
//             const avatarImage = document.createElement('img');
//             avatarImage.src = "../generated-images/" + leaderboardArray[roundToOutput][i][2];
//             avatarImage.style.width = "25px";
//             avatarImage.style.height = "25px";
//             avatarCell.appendChild(avatarImage);
//             newRow.appendChild(avatarCell);

//             const usernameCell = document.createElement('td');
//             usernameCell.textContent = leaderboardArray[roundToOutput][i][1];
//             newRow.appendChild(usernameCell);

//             const scoreCell = document.createElement('td');
//             scoreCell.textContent = leaderboardArray[roundToOutput][i][0]
//             newRow.appendChild(scoreCell);

//             tableBody.appendChild(newRow);
//         }
//     }
// }