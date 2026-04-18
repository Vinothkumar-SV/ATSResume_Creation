// Script to generate simple icons for the extension
// This would be run separately to create actual icon files

const fs = require('fs');
const { createCanvas } = require('canvas');

function generateIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#3B82F6');
    gradient.addColorStop(1, '#8B5CF6');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Round corners
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, size * 0.2);
    ctx.fill();

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // Document icon
    const iconSize = size * 0.5;
    const x = (size - iconSize) / 2;
    const y = (size - iconSize) / 2;

    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, iconSize, iconSize * 0.8);
    
    // Document lines
    ctx.fillStyle = '#3B82F6';
    const lineHeight = iconSize * 0.08;
    const lineSpacing = iconSize * 0.12;
    
    for (let i = 0; i < 4; i++) {
        const lineY = y + iconSize * 0.2 + (i * lineSpacing);
        const lineWidth = i === 3 ? iconSize * 0.6 : iconSize * 0.8;
        ctx.fillRect(x + iconSize * 0.1, lineY, lineWidth, lineHeight);
    }

    return canvas.toBuffer('image/png');
}

// Generate icons in different sizes
[16, 48, 128].forEach(size => {
    const iconBuffer = generateIcon(size);
    fs.writeFileSync(`icon${size}.png`, iconBuffer);
    console.log(`Generated icon${size}.png`);
});