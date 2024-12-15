const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const time = 100;
const width = 101;
const height = 103;

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    processFileContent(data);
});

async function processFileContent(data) {
    const lines = data.trim().split('\n');
    const robots = lines.map(line => {
        const [p, v] = line.split(' v=');
        const [px, py] = p.slice(2).split(',').map(Number);
        const [vx, vy] = v.split(',').map(Number);
        return { position: [px, py], velocity: [vx, vy] };
    });

    const quadSum = [0, 0, 0, 0];

    robots.forEach(robot => {
        for (let t = 0; t < time; t++) {
            robot.position[0] += robot.velocity[0];
            robot.position[1] += robot.velocity[1];

            if (robot.position[0] < 0) robot.position[0] += width;
            if (robot.position[0] >= width) robot.position[0] -= width;
            if (robot.position[1] < 0) robot.position[1] += height;
            if (robot.position[1] >= height) robot.position[1] -= height;
        }

        const quadrant = findQuadrant(robot.position);
        if (quadrant) {
            quadSum[quadrant - 1] += 1;
        }
    });

    console.log(quadSum[0] * quadSum[1] * quadSum[2] * quadSum[3]);
}

function findQuadrant(coordArray) {
    const [x, y] = coordArray;
    const midX = (width - 1) / 2;
    const midY = (height - 1) / 2;

    if (x === midX || y === midY) return null; // Ignore robots on the boundaries

    if (x < midX && y < midY) return 1;
    if (x > midX && y < midY) return 2;
    if (x < midX && y > midY) return 3;
    if (x > midX && y > midY) return 4;
}