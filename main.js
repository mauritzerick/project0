//Execute JS immediately once page has been loaded
window.onload = function() {

    let x = document.getElementById("token1").value; //token1
    let y = document.getElementById("token2").value; //token2
    let sign = true; //variable to add tokens in box
    let gameObject = {}; //object declaration
    let count = 0; // moves count starts from 0
    let winCounterX = 0; // count how many times X wins consolelog
    let winCounterO = 0; // count how many times O wins consolelog
    let cube = document.querySelector('.page ul'); //select UL from html
    let winProbability = [ //win probability for 3x3 box
        [1, 2, 3],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [4, 5, 6],
        [7, 8, 9],
        [3, 5, 7],
        [1, 5, 9]
    ];
    
    const playGame = function(e) { //play game function starts here

        // target check
        let cube = e.target; //get inner elements as target
        if (!cube.innerHTML && cube.tagName === 'LI') {
            let childs = cube.parentNode.children;
            let cubeIndex;

            // GET children of LI and count how many turns 
            for (let i = 0; i < childs.length; i++) {
                if (cube == childs[i]) {
                    cubeIndex = i;
                    count++;
                }
            }
            
            // DOM change and UPDATE HTML Elements
            if (sign) {
                cube.innerHTML = x;
                gameObject[cubeIndex + 1] =x;
                sign = false;
            } else {
                cube.innerHTML = y;
                gameObject[cubeIndex + 1] = y;
                sign = true;
            }

            // if (count > 4 && count < 9) { count only needed if box is full

                // CHECK OPERATION
                winProbability.forEach(function(element) {
                    let arr = [];
                    let pos = [];
                    element.forEach(function(element) {
                        if (gameObject[element]) {
                            arr.push(gameObject[element]);
                            pos.push(element);
                        }
                    });

                    let xsignal; //signal to check if token 1 wins
                    let osignal; // signal to check if token 2 wins

                    if (arr.length === 3) { //check array 0 - 2
                        // console.log(arr);
                        // console.log(pos);
                        if (arr[0] === x && arr[1] === x && arr[2] === x) {
                            xsignal = true;
                        }
                        if (arr[0] === y && arr[1] === y && arr[2] === y) {
                            osignal = true;
                        }
                    }

                    if (xsignal === true) { //player 1 wins
                        console.log("X won");
                        pos.forEach(function(element) {
                        document.querySelector('.page ul').children[element - 1].style.background = "#17CD6A";
                        })
                        let audio = new Audio('victory.mp3');
                        audio.play()
                        document.querySelector('.message').innerHTML = x + " Won! Click to play again!";
                        document.querySelector('.message').style.background = "#17CD6A";
                        document.querySelector('.message').style.opacity = "1";
                        winCounterX++;
                        console.log(winCounterX);

                        document.querySelector('.xCounter').innerHTML++;

                        gameObject = {};
                    } else if (osignal === true) { //player 2 wins
                        console.log("O won");
                        pos.forEach(function(element) {
                        document.querySelector('.page ul').children[element - 1].style.background = "#E8306B";
                        })
                        let audio = new Audio('victory.mp3');
                        audio.play()
                        document.querySelector('.message').innerHTML = y + " Won! Click to play again!";
                        document.querySelector('.message').style.background = "#E8306B";
                        document.querySelector('.message').style.opacity = "1";
                        winCounterO++;
                        console.log(winCounterO);

                        document.querySelector('.oCounter').innerHTML++;

                        gameObject = {};
                    } else if (count > 8){ //if count is more than 8 which is when box is full, draw 
                        document.querySelector('.message').innerHTML = "Draw! click to play again!"
                        document.querySelector('.message').style.background = "red";
                        document.querySelector('.message').style.opacity = "1";
                        gameObject = {};
                        
                    }
                })
        }
    } 
    
    cube.addEventListener('click', playGame); //trigger play game when one of the cube box clicked

    let message = document.querySelector('.message'); //shows message win/draw

    //Reset the game when play again clicked
    let playAgain = function() {
        this.style.opacity = "0";
        let a = document.querySelectorAll('li');
        for (let i = 0; i < a.length; i++) {
            a[i].innerHTML = "";
            a[i].style.background = "none";
        }
        count = 0;
    }
    message.addEventListener('click', playAgain)
}




