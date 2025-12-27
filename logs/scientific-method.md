# Scientific Method MicroSim - Development Log

## Overview

Interactive Mermaid flowchart diagram showing the scientific method workflow with hover/click infobox displaying step descriptions and physics examples.

## Date: 2024-12-27

## Files Modified

- `docs/sims/scientific-method/main.html`
- `docs/sims/scientific-method/style.css`
- `docs/sims/scientific-method/script.js`

---

## Key Features Implemented

### 1. Two-Column Flexbox Layout

Created a responsive two-column layout with the Mermaid diagram on the left and an interactive infobox on the right.

**CSS Structure:**
```css
.main-content {
    display: flex;
    flex-direction: row;
    gap: 15px;
    margin-bottom: 10px;
}

.diagram-container {
    flex: 1;
    min-width: 350px;
    background: aliceblue;
    padding-bottom: 40px;
    overflow: visible;
}

.infobox {
    flex: 0 0 250px;
    width: 250px;
    background: aliceblue;
    border-radius: 8px;
    padding: 15px;
    border: 2px solid #e1e8ed;
    height: fit-content;
    font-size: 0.9em;
    position: relative;
    top: 0;
    transition: top 0.3s ease;
}
```

### 2. Diagram Positioning Adjustments

Moved the Mermaid diagram left and up to maximize space:

```css
.mermaid {
    display: block;
    min-height: 650px;
    margin-left: -70px;
    margin-top: -60px;
    overflow: visible;
}

.mermaid svg {
    overflow: visible;
}
```

### 3. Comprehensive Node Information

Created `nodeInfo` object with 12 scientific method steps, each containing:
- `title`: Display name for the step
- `description`: Educational explanation
- `example`: Physics-based example using a ball rolling experiment

**Steps covered:**
1. Start (Observe Phenomenon or Ask Question)
2. Research (Background Research)
3. Hypothesis (Formulate Hypothesis)
4. Design (Design Experiment)
5. Conduct (Conduct Experiment & Collect Data)
6. Analyze (Analyze Data)
7. Decision1 (Does Data Support Hypothesis?)
8. Accept (Accept Hypothesis)
9. Revise (Revise or Reject Hypothesis)
10. Communicate (Communicate Results)
11. Decision2 (New Questions Raised?)
12. End (End - Temporary)

### 4. Interactive Hover and Click Behavior

**Hover:** Shows step information when mouse enters a node
**Click:** Locks the infobox to display that node's information
**Click Again:** Unlocks and returns to default state
**Click Outside:** Also unlocks

### 5. Dynamic Infobox Positioning

The infobox dynamically repositions to align with:
- The currently hovered/selected node
- The cursor position when no node is selected

**Key function:**
```javascript
function moveInfoboxToNode(node) {
    const infobox = document.getElementById('infobox');
    const container = document.querySelector('.main-content');
    const containerRect = container.getBoundingClientRect();
    const infoboxHeight = infobox.offsetHeight;

    // Maximum allowed top position to keep infobox visible
    const maxAllowedTop = Math.max(0, containerRect.height - infoboxHeight - 20);

    let offset;

    if (!node) {
        // Use last mouse position when no node is selected
        offset = lastMouseY - 20;
    } else {
        const nodeRect = node.getBoundingClientRect();
        offset = nodeRect.top - containerRect.top;

        // Special case for End node - move infobox up 100px
        const nodeText = node.textContent.trim();
        if (nodeText.includes('End')) {
            offset = offset - 100;
        }
    }

    let finalOffset = Math.max(0, offset - 20);
    finalOffset = Math.min(finalOffset, maxAllowedTop);
    infobox.style.top = finalOffset + 'px';
}
```

### 6. Continuous Mouse Position Tracking

Added mouse position tracking so the default infobox follows the cursor:

```javascript
let lastMouseY = 0;

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.main-content');
    container.addEventListener('mousemove', (e) => {
        const containerRect = container.getBoundingClientRect();
        lastMouseY = e.clientY - containerRect.top;

        // If no node is locked and mouse is not over a node, update infobox position
        if (!lockedNode) {
            const hoveredNode = e.target.closest('.mermaid .node');
            if (!hoveredNode) {
                moveInfoboxToNode(null);
            }
        }
    });
});
```

### 7. Node Key Matching

Function to match Mermaid node text content to info keys:

```javascript
function getNodeKey(node) {
    const text = node.textContent.trim();

    if (text.includes('Observe') || text.includes('Ask Question')) return 'Start';
    if (text.includes('Background Research')) return 'Research';
    if (text.includes('Formulate Hypothesis')) return 'Hypothesis';
    // ... etc for all 12 nodes
}
```

### 8. Visual Highlighting

Selected nodes get a visual highlight effect:

```css
.mermaid .node.highlighted {
    filter: brightness(1.2) drop-shadow(0 0 8px rgba(0,0,0,0.3));
}
```

---

## Issues Resolved

| Issue | Solution |
|-------|----------|
| Infobox appearing below diagram | Changed to flexbox row layout with proper flex properties |
| Infobox covering diagram | Reduced infobox width to 250px |
| "End" node cutoff at bottom | Added `overflow: visible` to diagram-container, .mermaid, and .mermaid svg; added padding-bottom |
| End node infobox drops below visible area | Special case in `moveInfoboxToNode()` subtracts 100px for End node |
| Default infobox always at top | Added mouse position tracking with `lastMouseY` and continuous updates via mousemove |

---

## TODO: Update Mermaid Generator Skill

The following enhancements should be incorporated into the `microsim-generator` skill for Mermaid diagrams:

### Features to Add to Skill

1. **Two-column layout template** with diagram + infobox
2. **Node information object structure** with title, description, example
3. **Dynamic infobox positioning** that follows nodes and cursor
4. **Click-to-lock behavior** for node selection
5. **Mouse position tracking** for smooth infobox following
6. **Overflow handling** for diagrams that extend beyond container bounds
7. **Node key matching function** template for different diagram types
8. **Visual highlighting** CSS for selected nodes

### Skill Update Checklist

- [ ] Add Mermaid infobox template option to skill
- [ ] Include flexbox two-column layout CSS
- [ ] Add nodeInfo object generation based on diagram nodes
- [ ] Include dynamic positioning JavaScript
- [ ] Add mouse tracking for smooth UX
- [ ] Document overflow: visible requirements for Mermaid SVGs
- [ ] Add special handling for bottom-positioned nodes

---

## Physics Example Used Throughout

**Experiment:** Ball rolling on different surfaces to demonstrate friction

- **Observation:** Ball rolls farther on smooth floor than carpet
- **Research:** Studied friction and kinetic energy
- **Hypothesis:** "If surface is smoother, ball rolls farther due to less friction"
- **Design:** Roll steel ball from 30cm ramp onto 5 surfaces, 3 trials each
- **Conduct:** Recorded: Glass (2.4m), Tile (1.8m), Wood (1.2m), Carpet (0.5m), Sandpaper (0.3m)
- **Analyze:** Glass allows 8x more distance than sandpaper
- **Accept:** Hypothesis supported - smoother surfaces reduce friction
- **Communicate:** Lab report with graphs and analysis
- **New Questions:** Does ball mass affect results? What about inclined surfaces?
