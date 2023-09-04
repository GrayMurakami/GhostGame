document.addEventListener("DOMContentLoaded", function() {
    const ghost = document.getElementById("ghost");
    const circle = document.getElementById("circle");
    const hand = document.getElementById("hand");
    const coffin = document.getElementById("coffin");
    const gameContainer = document.querySelector(".game");

    let isJumping = false;
    
    document.addEventListener("keydown", function(event) {
        if ((event.keyCode === 32 || event.key === " ") && !isJumping) {
            jump();
        }
    });

    function jump() {
        isJumping = true;
            ghost.classList.add("jump");
        
        const jumpHeight = 95; // new jump height

        function checkCollisionAndContinue() {
            if (checkCollision(circle) || checkCollision(hand) || checkCollision(coffin)) {
                stopGame();
            } else {
                if(parseInt(getComputedStyle(ghost).top) > jumpHeight) {
                    // if it's a max height, going down
                    ghost.style.transition = "top 0.4s"; // new speed of going down
                    ghost.style.top = "236px";
                }
                requestAnimationFrame(checkCollisionAndContinue);
            }
        }

        setTimeout( function() {
            ghost.style.transition = "top 0.8s"; // return the default animation speed
            ghost.classList.remove("jump"); 
            requestAnimationFrame(checkCollisionAndContinue);
            isJumping = false; // allow a new jump after the end of the current jump
        }, 800);
    
        //  checkCollision - checks for a collision between a ghost and element
        function checkCollision(element) {
            const ghostRect = ghost.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            const collision = 
                ghostRect.bottom > elementRect.top &&
                ghostRect.top < elementRect.bottom &&
                ghostRect.right > elementRect.left &&
                ghostRect.left < elementRect.right;

            return collision;
        }

        function stopGame() {
            alert("Game Over Bitch!"); 
        }

    };
});
