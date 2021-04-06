//Execute JS immediately once page has been loaded
window.onload = function() {
    let sign = true;
    let gameObject = {};
    let count = 0;
    let cube = document.querySelector('#page ul');
    let winProbability = [
        [1, 2, 3],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [4, 5, 6],
        [7, 8, 9],
        [3, 5, 7],
        [1, 5, 9]
    ];

    let playGame = function(e) {

        // BASIC REQUIREMENT
        let cube = e.target;
        if (!cube.innerHTML && cube.tagName === 'LI') {
            let childs = cube.parentNode.children;
            let cubeIndex;

            // GET CHILDREN

            for (let i = 0; i < childs.length; i++) {
                if (cube == childs[i]) {
                    cubeIndex = i;
                    count++;
                }
            }

            // CHANGE DOM and UPDATE GAMEOBJECT

            if (sign) {
                cube.innerHTML = 'X';
                gameObject[cubeIndex + 1] = 'X';
                sign = false;
            } else {
                cube.innerHTML = 'O';
                gameObject[cubeIndex + 1] = 'O';
                sign = true;
            }

            if (count > 4) {

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
                        console.log("xsignal won");
                        pos.forEach(function(element) {
                            document.querySelector('#page ul').children[element - 1].style.background = "green";
                        })
                        document.querySelector('#message').innerHTML = "X Won! Play Again?";
                        document.querySelector('#message').style.background = "green";
                        document.querySelector('#message').style.opacity = "1";
                        gameObject = {};
                    } else if (osignal === true) {
                        console.log("osignal won");
                        pos.forEach(function(element) {
                            document.querySelector('#page ul').children[element - 1].style.background = "red";
                        })
                        document.querySelector('#message').innerHTML = "O Won! Play Again?";
                        document.querySelector('#message').style.background = "red";
                        document.querySelector('#message').style.opacity = "1";
                        gameObject = {};
                    }

                })

            }
        }
    }
    cube.addEventListener('click', playGame);

    let message = document.querySelector('#message');
    let playAgain = function() {
        this.style.opacity = "0";
        var a = document.querySelectorAll('li');
        for (var i = 0; i < a.length; i++) {
            a[i].innerHTML = "";
            a[i].style.background = "none";
        }
    }
    message.addEventListener('click', playAgain)
}
