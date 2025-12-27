---
title: Atwood Machine Free-Body Diagram
description: Interactive visualization of free-body diagrams for the Atwood machine showing how to set up and solve the equations.
---

# Atwood Machine Free-Body Diagram

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This simulation shows how to analyze an Atwood machine by drawing separate free-body diagrams for each mass and applying Newton's second law. The key insight is that both masses have the same magnitude of acceleration because they're connected by an inextensible string.

## Key Equations

- **For m₁ (lighter)**: $T - m_1g = m_1a$
- **For m₂ (heavier)**: $m_2g - T = m_2a$
- **Acceleration**: $a = \frac{(m_2 - m_1)g}{m_1 + m_2}$
- **Tension**: $T = \frac{2m_1m_2g}{m_1 + m_2}$

## Key Insights

- Same magnitude of acceleration for both masses (string constraint)
- Tension is the same on both sides (massless string, frictionless pulley)
- When m₁ = m₂, the system is in equilibrium (a = 0)
- Tension is always between m₁g and m₂g

## Controls

- **m₁**: Mass of the lighter block
- **m₂**: Mass of the heavier block
- **Show equations**: Display the step-by-step solution
- **Animate motion**: Watch the system move based on calculated acceleration
