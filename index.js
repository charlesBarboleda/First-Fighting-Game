const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height)

class Sprite {
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
    }

    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, 50, 150);
    }
}

const player = new Sprite({ 
    x: 0, 
    y: 0 
});

const enemy = new Sprite({ 
    x: 900, 
    y: 400 
});

enemy.draw();

player.draw();

console.log(player)

function animate() {
    window.requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    enemy.draw();

}

animate();