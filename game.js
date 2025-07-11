document.addEventListener('DOMContentLoaded', () => {
    const ghost         = document.getElementById('ghost');
    const obsContainer  = document.getElementById('obstacles');
    const scoreElem     = document.getElementById('score');
    const gameContainer = document.querySelector('.game');

    let isJumping       = false;
    let gameOver        = false;
    let score           = 0;
    let obstacleInterval;
    let scoreInterval;

    // Функция прыжка
    function jump() {
        isJumping = true;
        ghost.classList.add('jump');
        ghost.addEventListener('animationend', () => {
            ghost.classList.remove('jump');
            isJumping = false;
        }, { once: true });
    }

    // 1) Прыжок по пробелу
    document.addEventListener('keydown', (e) => {
        if ((e.code === 'Space' || e.key === ' ') && !isJumping && !gameOver) {
            jump();
        }
    });

    // 2) Прыжок по клику мышью
    gameContainer.addEventListener('click', () => {
        if (!isJumping && !gameOver) jump();
    });

    // 3) Прыжок по тачу
    gameContainer.addEventListener('touchstart', (e) => {
        e.preventDefault();  // чтобы не скроллило страницу
        if (!isJumping && !gameOver) jump();
    });

    // Создаём случайное препятствие
    function spawnObstacle() {
        const types = [
            { img: 'circle.png', dur: 3 },
            { img: 'hand.png',   dur: 2.5 },
            { img: 'rip.png',    dur: 4 }
        ];
        const t = types[Math.floor(Math.random() * types.length)];
        const obs = document.createElement('div');
        obs.className = 'obstacle';
        obs.style.backgroundImage   = `url('${t.img}')`;
        obs.style.animationDuration = `${t.dur}s`;  // время движения
        obsContainer.appendChild(obs);
        obs.addEventListener('animationend', () => obs.remove());
    }

    // Проверяем столкновения в цикле
    function gameLoop() {
        if (gameOver) return;
        const gR = ghost.getBoundingClientRect();
        document.querySelectorAll('.obstacle').forEach(obs => {
            const oR = obs.getBoundingClientRect();
            if (
                gR.right  > oR.left  + 10 &&
                gR.left   < oR.right - 10 &&
                gR.bottom > oR.top   + 10
            ) {
                endGame();
            }
        });
        requestAnimationFrame(gameLoop);
    }

    // Старт игры: спавн и счёт
    function startGame() {
        obstacleInterval = setInterval(spawnObstacle, 1500); // интервал спавна (мс)
        scoreInterval    = setInterval(() => {
            score++;
            scoreElem.textContent = score;
        }, 100); // скорость роста счёта (мс)
        requestAnimationFrame(gameLoop);
    }

    // Конец игры
    function endGame() {
        gameOver = true;
        clearInterval(obstacleInterval);
        clearInterval(scoreInterval);
        alert(`Game Over! Score: ${score}`);
        // здесь можно сбросить всё и вызвать startGame() заново
    }

    startGame();
});
