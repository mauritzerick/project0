          
//Execute JS immediately once page has been loaded

 
    // //initial choose screen
    // $(document).on('click', '.players', function(){
    // if ($(this).hasClass('x')){
    // //   xplayer = true;
    //   $('.players').addClass('hide');
    // } else {
    // //   oplayer = true;
    //   $('.players').addClass('hide');
    // }
    // console.log("clicked");
    //  });
window.onload = function() {

    let sign = true;
    let gameObject = {}; //object declaration
    let count = 0; // moves count starts from 0
    let winCounterX = 0; // count how many times X wins consolelog
    let winCounterO = 0; // count how many times O wins consolelog
    let cube = document.querySelector('.page ul'); //select UL from html

    let test = document.querySelector('.players');

    let winProbability = [ //win probability boxes
        [1, 2, 3],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [4, 5, 6],
        [7, 8, 9],
        [3, 5, 7],
        [1, 5, 9]

    ];


   
let choose = function(j){
    let test = j.target;
    if(test.innerHTML == 'chooseplayer x'){
        console.log("x clicked");
    }else if(test.innerHTML == 'chooseplayer o'){
        console.log("o clicked");
    // }else {
    //     console.log("clicked");
    }
}
test.addEventListener('click', choose); 



    let playGame = function(e) {

        // target check
        let cube = e.target; //get inner elements as target
        if (!cube.innerHTML && cube.tagName === 'LI') {
            let childs = cube.parentNode.children;
            let cubeIndex;

            // GET Children

            for (let i = 0; i < childs.length; i++) {
                if (cube == childs[i]) {
                    cubeIndex = i;
                    count++;
                }
            }

            
            // DOM change and UPDATE HTML Elements

            if (sign) {
                cube.innerHTML = 'X';
                gameObject[cubeIndex + 1] = 'X';
                sign = false;
            } else {
                cube.innerHTML = 'O';
                gameObject[cubeIndex + 1] = 'O';
                sign = true;
            }

            if (count > 4 && count < 9) {

                // console.log(gameObject);

                // console.log(winProbability);
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
                    let xsignal = false,
                        osignal = false;
                    if (arr.length === 3) {
                        // console.log(arr);
                        // console.log(pos);
                        if (arr[0] === 'X' && arr[1] === 'X' && arr[2] === 'X') {
                            xsignal = true;
                        }
                        if (arr[0] === 'O' && arr[1] === 'O' && arr[2] === 'O') {
                            osignal = true;
                        }
                    }
                    if (xsignal === true) {
                        console.log("X won");
                        pos.forEach(function(element) {
                        document.querySelector('.page ul').children[element - 1].style.background = "#17CD6A";
                        })
                        let audio = new Audio('victory.mp3');
                        audio.play()
                        document.querySelector('.message').innerHTML = "X Won! Click to play again!";
                        document.querySelector('.message').style.background = "#17CD6A";
                        document.querySelector('.message').style.opacity = "1";
                        winCounterX++;
                        console.log(winCounterX);

                        document.querySelector('.xCounter').innerHTML++;
 
                        gameObject = {};
                    } else if (osignal === true) {
                        console.log("O won");
                        pos.forEach(function(element) {
                            document.querySelector('.page ul').children[element - 1].style.background = "#E8306B";
                        })
                        let audio = new Audio('victory.mp3');
                        audio.play()
                        document.querySelector('.message').innerHTML = "O Won! Click to play again!";
                        document.querySelector('.message').style.background = "#E8306B";
                        document.querySelector('.message').style.opacity = "1";
                        winCounterO++;
                        console.log(winCounterO);

                        document.querySelector('.oCounter').innerHTML++;

                        gameObject = {};
                    }
                })

            } else if (count > 8){ //if count is more than 8 which is box is full, trigger play again function
                document.querySelector('.message').innerHTML = "Draw! click to play again!"
                document.querySelector('.message').style.background = "red";
                document.querySelector('.message').style.opacity = "1";

                
                gameObject = {};
                
            }
        }
    }
    cube.addEventListener('click', playGame); //trigger play game when one of the box clicked

    let message = document.querySelector('.message');

    //Reset 
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


