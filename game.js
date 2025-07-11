document.addEventListener('DOMContentLoaded', () => {
    const ghost        = document.getElementById('ghost');
    const obsContainer = document.getElementById('obstacles');
    const scoreElem    = document.getElementById('score');

    let isJumping = false;
    let gameOver  = false;
    let score     = 0;
    let obstacleInterval;
    let scoreInterval;

    // Обработка прыжка по пробелу
    document.addEventListener('keydown', (e) => {
        if ((e.code === 'Space' || e.key === ' ') && !isJumping && !gameOver) {
            isJumping = true;
            ghost.classList.add('jump');
            ghost.addEventListener('animationend', () => {
                ghost.classList.remove('jump');
                isJumping = false;
            }, { once: true });
        }
    });

    // Запуск игры
    function startGame() {
        obstacleInterval = setInterval(spawnObstacle, 1500);  /* <-- интервал спавна (мс) */
        scoreInterval    = setInterval(() => {
            score++;
            scoreElem.textContent = score;
        }, 100);                                             /* <-- скорость роста счёта (мс) */
        requestAnimationFrame(gameLoop);
    }

    // Создание одного препятствия
    function spawnObstacle() {
        const types = [
            { img: 'circle.png', dur: 3 },   // <-- путь + длительность движения (сек)
            { img: 'hand.png',   dur: 2.5 },
            { img: 'rip.png',    dur: 4   }
        ];
        const t = types[Math.floor(Math.random() * types.length)];
        const d = document.createElement('div');
        d.className = 'obstacle';
        d.style.backgroundImage    = `url('${t.img}')`;
        d.style.animationDuration  = `${t.dur}s`;             /* <-- скорость движения (сек) */
        obsContainer.append(d);
        d.addEventListener('animationend', () => d.remove());
    }

    // Главный цикл — проверяем коллизии
    function gameLoop() {
        if (gameOver) return;
        const gR = ghost.getBoundingClientRect();
        document.querySelectorAll('.obstacle').forEach((o) => {
            const r = o.getBoundingClientRect();
            if (
                gR.right  > r.left + 10 &&
                gR.left   < r.right - 10 &&
                gR.bottom > r.top + 10
            ) {
                endGame();
            }
        });
        requestAnimationFrame(gameLoop);
    }

    // Окончание игры
    function endGame() {
        gameOver = true;
        clearInterval(obstacleInterval);
        clearInterval(scoreInterval);
        alert(`Game Over! Score: ${score}`);
        // здесь можно добавить логику перезапуска
    }

    startGame();
});
