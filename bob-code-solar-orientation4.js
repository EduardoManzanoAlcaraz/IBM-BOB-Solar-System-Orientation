const canvas = document.getElementById('solarSystem');
const ctx = canvas.getContext('2d');
const panoCanvas = document.getElementById('panoView');
const panoCtx = panoCanvas.getContext('2d');
const eqCanvas = document.getElementById('equirectangularCopy');
const eqCtx = eqCanvas.getContext('2d');
const angleTableBody = document.getElementById('angleTableBody');
const estInfo = document.getElementById('estInfo');

const epochRange = document.getElementById('epochRange');
const speedRange = document.getElementById('speedRange');
const epochVal = document.getElementById('epochVal');
const speedVal = document.getElementById('speedVal');

const scaleFactor = 25;

const planets = [
    { name: 'Mercurio', a: 0.39, e: 0.205, size: 2.5, period: 88.0, initialAngle: 1.25, color: '#aaaaaa' },
    { name: 'Venus', a: 0.72, e: 0.007, size: 3.5, period: 224.7, initialAngle: 3.42, color: '#e3bb76' },
    { name: 'Tierra', a: 1.00, e: 0.0167, size: 4, period: 365.25, initialAngle: 5.15, color: '#2277ff' },
    { name: 'Marte', a: 1.52, e: 0.0934, size: 3, period: 687.0, initialAngle: 0.88, color: '#cc4400' },
    { name: 'Júpiter', a: 5.20, e: 0.0489, size: 6, period: 4332.6, initialAngle: 2.10, color: '#d4a373' },
    { name: 'Saturno', a: 9.58, e: 0.0565, size: 5, period: 10759.2, initialAngle: 4.65, color: '#f4e2bb' }
];

planets.sort((a, b) => a.a - b.a);

const startDate = new Date(2026, 0, 1);
let simulationDays = 0;
let isDraggingEpoch = false;
let clickedPointA = { x: 350, y: 200 };

function getDateFromDays(daysOffset) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + parseInt(daysOffset));
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

epochRange.addEventListener('mousedown', () => isDraggingEpoch = true);
window.addEventListener('mouseup', () => isDraggingEpoch = false);
epochRange.addEventListener('input', () => {
    simulationDays = parseInt(epochRange.value);
    epochVal.innerText = getDateFromDays(simulationDays);
});
speedRange.addEventListener('input', () => {
    speedVal.innerText = speedRange.value;
});

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    clickedPointA = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#ffcc00';
    ctx.fill();

    const speedMultiplier = parseFloat(speedRange.value);
    if (!isDraggingEpoch) {
        simulationDays += speedMultiplier;
        if (simulationDays > 11322) simulationDays = 0;
        epochRange.value = simulationDays;
        epochVal.innerText = getDateFromDays(simulationDays);
    } else {
        simulationDays = parseInt(epochRange.value);
    }

    const planetPositions = [];

    planets.forEach(planet => {
        const aPx = planet.a * scaleFactor;
        const cPx = aPx * planet.e;
        const bPx = aPx * Math.sqrt(1 - planet.e * planet.e);

        ctx.beginPath();
        ctx.ellipse(centerX - cPx, centerY, aPx, bPx, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.stroke();

        const meanAnomaly = planet.initialAngle + (2 * Math.PI * simulationDays) / planet.period;
        const x = centerX - cPx + aPx * Math.cos(meanAnomaly);
        const y = centerY + bPx * Math.sin(meanAnomaly);

        const xUA = (x - centerX) / scaleFactor;
        const yUA = (centerY - y) / scaleFactor;

        planetPositions.push({ 
            name: planet.name, 
            a: planet.a, 
            x, y, 
            xUA: xUA.toFixed(2), 
            yUA: yUA.toFixed(2), 
            color: planet.color, 
            size: planet.size 
        });

        ctx.beginPath();
        ctx.arc(x, y, planet.size, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();

        // Añadir nombre del planeta en la vista superior
        ctx.fillStyle = '#fff';
        ctx.font = '9px Arial';
        ctx.fillText(planet.name, x + planet.size + 4, y + 3);
    });

    // Dibujar punto A real (círculo / mira)
    ctx.strokeStyle = '#00ffcc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(clickedPointA.x, clickedPointA.y, 6, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#00ffcc';
    ctx.font = '10px Arial';
    ctx.fillText('Real A', clickedPointA.x + 10, clickedPointA.y - 5);

    panoCtx.clearRect(0, 0, panoCanvas.width, panoCanvas.height);
    eqCtx.clearRect(0, 0, eqCanvas.width, eqCanvas.height);

    const sunWorldX = centerX;
    const sunWorldY = centerY;
    const vecAS_x = sunWorldX - clickedPointA.x;
    const vecAS_y = sunWorldY - clickedPointA.y;
    const angleAS = Math.atan2(vecAS_y, vecAS_x);

    [panoCtx, eqCtx].forEach((targetCtx, index) => {
        const targetCanvas = index === 0 ? panoCanvas : eqCanvas;
        
        targetCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        targetCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        targetCtx.font = '10px Arial';
        
        for (let deg = -180; deg <= 180; deg += 45) {
            const xPos = targetCanvas.width / 2 + (deg / 180) * (targetCanvas.width / 2);
            targetCtx.beginPath();
            targetCtx.moveTo(xPos, 0);
            targetCtx.lineTo(xPos, targetCanvas.height);
            targetCtx.stroke();
            targetCtx.fillText(`${deg}°`, xPos - 12, targetCanvas.height - 10);
        }

        targetCtx.strokeStyle = 'rgba(255, 204, 0, 0.5)';
        targetCtx.beginPath();
        targetCtx.moveTo(targetCanvas.width / 2, 0);
        targetCtx.lineTo(targetCanvas.width / 2, targetCanvas.height);
        targetCtx.stroke();
        targetCtx.fillText('SOL (0°)', targetCanvas.width / 2 - 20, 15);
    });

    let calculatedPlanets = planetPositions.map(p => {
        const vecAP_x = p.x - clickedPointA.x;
        const vecAP_y = p.y - clickedPointA.y;
        const angleAP = Math.atan2(vecAP_y, vecAP_x);

        let diffAngle = angleAP - angleAS;
        while (diffAngle > Math.PI) diffAngle -= 2 * Math.PI;
        while (diffAngle < -Math.PI) diffAngle += 2 * Math.PI;

        const degRel = diffAngle * (180 / Math.PI);
        return { ...p, degRel };
    });

    const avgDeg = calculatedPlanets.reduce((acc, p) => acc + p.degRel, 0) / calculatedPlanets.length;
    const estDistPx = 100 + Math.abs(avgDeg) * 0.5;
    const estAngleRad = angleAS + Math.PI;
    const estX = centerX + estDistPx * Math.cos(estAngleRad);
    const estY = centerY + estDistPx * Math.sin(estAngleRad);
    
    const estXUA = (estX - centerX) / scaleFactor;
    const estYUA = (centerY - estY) / scaleFactor;
    const estDistUA = Math.sqrt(estXUA * estXUA + estYUA * estYUA).toFixed(2);

    estInfo.innerHTML = `<strong>Punto A Estimado:</strong><br>
        Pos: (${estXUA.toFixed(2)}, ${estYUA.toFixed(2)}) UA<br>
        Distancia al Sol: ${estDistUA} UA`;

    // Dibujar 'X' de estimación en el canvas superior con su etiqueta
    ctx.strokeStyle = '#ff0055';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(estX - 8, estY - 8);
    ctx.lineTo(estX + 8, estY + 8);
    ctx.moveTo(estX + 8, estY - 8);
    ctx.lineTo(estX - 8, estY + 8);
    ctx.stroke();

    ctx.fillStyle = '#ff0055';
    ctx.font = '10px Arial';
    ctx.fillText('Estimada A', estX + 10, estY + 15);

    let tableHTML = '';
    calculatedPlanets.forEach(p => {
        tableHTML += `<tr>
            <td style="color:${p.color}">${p.name}</td>
            <td>${p.degRel > 0 ? '+' : ''}${p.degRel.toFixed(1)}°</td>
            <td>(${p.xUA}, ${p.yUA})</td>
        </tr>`;
    });
    angleTableBody.innerHTML = tableHTML;

    let sortedForRender = [...calculatedPlanets].sort((a, b) => a.degRel - b.degRel);

    [ {ctx: panoCtx, canvas: panoCanvas}, {ctx: eqCtx, canvas: eqCanvas} ].forEach(item => {
        const targetCanvas = item.canvas;
        const targetCtx = item.ctx;
        const centerYPos = targetCanvas.height / 2;

        let assignedHeights = [];
        sortedForRender.forEach((p, idx) => {
            const targetX = targetCanvas.width / 2 + (p.degRel / 180) * (targetCanvas.width / 2);
            
            let heightLevel = 0;
            if (idx > 0) {
                const prev = assignedHeights[idx - 1];
                const prevX = targetCanvas.width / 2 + (prev.degRel / 180) * (targetCanvas.width / 2);
                if (Math.abs(targetX - prevX) < 40) {
                    heightLevel = (prev.heightLevel === 1) ? -1 : 1;
                    if (Math.abs(targetX - prevX) < 15) {
                        p.isCrowded = true;
                    }
                }
            }
            assignedHeights.push({ degRel: p.degRel, heightLevel });

            const circleRadius = p.isCrowded ? 1.5 : 3;

            targetCtx.beginPath();
            targetCtx.arc(targetX, centerYPos, circleRadius, 0, Math.PI * 2);
            targetCtx.fillStyle = p.color;
            targetCtx.fill();

            const textOffsetY = heightLevel === 1 ? -28 : (heightLevel === -1 ? 28 : -20);
            const textX = targetX;
            const textY = centerYPos + textOffsetY;

            const lineStartOffset = heightLevel > 0 ? -4 : 4;
            const lineEndOffset = heightLevel > 0 ? 6 : -6;

            targetCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            targetCtx.lineWidth = 1;
            targetCtx.beginPath();
            targetCtx.moveTo(textX, textY + lineStartOffset);
            targetCtx.lineTo(textX, centerYPos + lineEndOffset);
            targetCtx.stroke();

            targetCtx.fillStyle = '#fff';
            targetCtx.font = '10px Arial';
            targetCtx.textAlign = 'center';
            targetCtx.fillText(`${p.name} (${p.degRel.toFixed(1)}°)`, textX, textY);
        });
    });

    requestAnimationFrame(animate);
}

animate();