const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const time = 999999999999999999999999999999999;
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

    for (let t = 1; t <= time; t++) {
        robots.forEach(robot => {
            robot.position[0] += robot.velocity[0];
            robot.position[1] += robot.velocity[1];

            if (robot.position[0] < 0) robot.position[0] += width;
            if (robot.position[0] >= width) robot.position[0] -= width;
            if (robot.position[1] < 0) robot.position[1] += height;
            if (robot.position[1] >= height) robot.position[1] -= height;
        });

        grid = Array.from({ length: height }, () => Array(width).fill(0));

        robots.forEach(robot => {
            const [x, y] = robot.position;
            grid[y][x]++;
        });
        if(((t-2) % 103 === 0) && ((t-23) % 101 === 0)) {
            console.log(t);
            for (let y = 0; y < grid.length; y++) {
                console.log(JSON.stringify(grid[y]).replaceAll("0"," ").replaceAll(",",""));
            }
            await delay(500);
        }
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}   