document.addEventListener("DOMContentLoaded", function () {
    const words = ["Browser", "Firewall", "Database", "Monitor", "Encoder", "Compiler", "Debugger", 
    "Console", "Router", "Server", "Cluster", "Adapter", "Desktop", "Virtual", "Storage", "Android", "Program", 
    "Kernel", "Gateway", "Memory"];
    let selectedWord;
    let remainingAttempts = 5;
    let displayedWord = "";
    let guessedLetters;

    const wordDisplay = document.getElementById("word-display");
    const guessInput = document.getElementById("guessInput");
    const submitGuessButton = document.getElementById("submitGuess");
    const remainingAttemptsDiv = document.getElementById("remainingAttempts");
    const resultPopup = document.getElementById("result-popup");
    const resultMessage = document.getElementById("result-message");
    const playAgainButton = document.getElementById("playAgain");

    function startNewGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        displayedWord = selectedWord.split('').map(() => '_').join('');
        guessedLetters = [];

        document.getElementById("totalLetters").textContent = `The word has ${selectedWord.length} letters. Good luck!`;
        
        const randomIndexes = getRandomIndexesForWord(selectedWord.length);
        for (let i = 0; i < selectedWord.length; i++) {
            if (randomIndexes.includes(i)) {
                displayedWord = displayedWord.substr(0, i) + selectedWord[i] + displayedWord.substr(i + 1);
            }
        }

        wordDisplay.textContent = displayedWord;
        remainingAttempts = 5;
        updateRemainingAttempts();
        guessInput.value = "";
        resultPopup.style.display = "none";
        submitGuessButton.disabled = false;
    }

    function getRandomIndexesForWord(wordLength){
        var indexes = [];
        var i = 0;
        while(i < 3){
            var randomIndex = Math.floor(Math.random() * wordLength);
            if(!indexes.includes(randomIndex)){
                indexes.push(randomIndex);
                i++;
            }
        }
        return indexes;
    }

    function checkGuess() {
        if(guessInput.value.length !== 0){
            const guess = guessInput.value.toLowerCase();

            if (guess === selectedWord) {
               submitGuessButton.disabled = true;
              showResultPopup(true);
            } else {
                guessedLetters = [];
                guessedLetters = guess.split('');

                let updatedWord = displayedWord;
                for (let i = 0; i < selectedWord.length; i++) {
                    if (guessedLetters[i] == selectedWord[i]) {
                        updatedWord = updatedWord.substr(0, i) + selectedWord[i] + updatedWord.substr(i + 1);
                    }
                }

                if (updatedWord !== displayedWord) {
                    displayedWord = updatedWord;
                }
                remainingAttempts--;
                updateRemainingAttempts();

                if (displayedWord === selectedWord) {
                    guessInput.focus();
                }
            }

            if (remainingAttempts === 0) {
                showResultPopup(false);
            }

            wordDisplay.textContent = displayedWord;
        }
    }

    function showResultPopup(isWinner) {
        resultMessage.textContent = isWinner ? "Congratulations! You guessed the word!" : "Sorry! You ran out of attempts.";
        resultPopup.style.display = "flex";
    }

    function updateRemainingAttempts() {
        remainingAttemptsDiv.textContent = `${remainingAttempts}`;
    }

    function playAgain() {
        resultPopup.style.display = "none";
        startNewGame();
    }

    startNewGame();

    submitGuessButton.addEventListener("click", checkGuess);
    guessInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            checkGuess();
        }
    });
    playAgainButton.addEventListener("click", playAgain);
});
