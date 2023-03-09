//Get initial date time
function startTimer() {
    var initialDateTime = new Date().getTime();
    
    setInterval(function () {
        //Get current date time
        var currentDateTime = new Date().getTime();

        //Find the amount of time elapsed
        var elapsedTime = currentDateTime - initialDateTime;

        //Convert to time and minutes
        var mins = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        var secs = Math.floor((elapsedTime % (1000 * 60)) / 1000);

        document.getElementById('timer').innerHTML = mins + "m " + secs + "s ";

        //If the timer reaches 100 mins, stop the timer from updating
        if (mins > 99) {
            clearInterval(timer);
            document.getElementById('timer').innerHTML = "STOPPED";
        }
    }, 1000);
}