// Scientific Method Diagram Interactivity

// Initialize Mermaid
mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
    }
});

// Zoom functionality
let zoomLevel = 1;
const zoomStep = 0.1;
const minZoom = 0.5;
const maxZoom = 2.0;

const diagramContainer = document.getElementById('diagramContainer');
const mermaidDiv = document.querySelector('.mermaid');

function updateZoom() {
    mermaidDiv.style.transform = `scale(${zoomLevel})`;
    mermaidDiv.style.transformOrigin = 'top center';
}

document.getElementById('zoomIn').addEventListener('click', () => {
    if (zoomLevel < maxZoom) {
        zoomLevel += zoomStep;
        updateZoom();
    }
});

document.getElementById('zoomOut').addEventListener('click', () => {
    if (zoomLevel > minZoom) {
        zoomLevel -= zoomStep;
        updateZoom();
    }
});

document.getElementById('resetZoom').addEventListener('click', () => {
    zoomLevel = 1;
    updateZoom();
});

// Export to SVG
document.getElementById('exportSVG').addEventListener('click', () => {
    const svg = document.querySelector('.mermaid svg');
    if (svg) {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'scientific-method-flowchart.svg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
});

// Node interaction tracking (for analytics/educational purposes)
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const nodes = document.querySelectorAll('.mermaid .node');
        nodes.forEach((node, index) => {
            node.style.cursor = 'pointer';
            node.addEventListener('click', () => {
                console.log(`Node clicked: ${node.textContent.trim()}`);
                // Could be extended to show detailed information in a modal
            });
        });
    }, 1000); // Wait for Mermaid to render
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === '+' || e.key === '=') {
        document.getElementById('zoomIn').click();
    } else if (e.key === '-' || e.key === '_') {
        document.getElementById('zoomOut').click();
    } else if (e.key === '0') {
        document.getElementById('resetZoom').click();
    }
});

// Accessibility: Announce zoom level changes
function announceZoom() {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.textContent = `Zoom level: ${Math.round(zoomLevel * 100)}%`;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
}

// Update zoom functions to include announcements
const originalUpdateZoom = updateZoom;
updateZoom = function() {
    originalUpdateZoom();
    announceZoom();
};
