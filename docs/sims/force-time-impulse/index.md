---
quality_score: 65
title: Force vs Time Impact Comparison
description: Chart comparing how extending impact time reduces peak force while maintaining the same impulse
---

# Force vs Time Impact Comparison

<iframe src="main.html" height="580px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This Chart

This visualization demonstrates a fundamental principle of the impulse-momentum theorem: the same change in momentum (impulse) can be achieved with either a large force acting briefly, or a smaller force acting over a longer time.

## Key Equations

**Impulse-Momentum Theorem:**
$$J = F \cdot \Delta t = \Delta p$$

**For the same change in momentum:**
$$F_1 \cdot \Delta t_1 = F_2 \cdot \Delta t_2$$

## Scenarios Compared

| Scenario | Duration | Peak Force | Impulse |
|----------|----------|------------|---------|
| Concrete Wall | 0.1 s | 60,000 N | 6,000 N·s |
| Crumple Zone + Airbag | 0.5 s | 12,000 N | 6,000 N·s |

## Visual Elements

- **Solid curves**: Force vs time (left y-axis)
- **Dashed curves**: Cumulative impulse (right y-axis)
- **Red**: Hard collision scenario
- **Green**: Soft collision with safety features

## Key Insight

Both curves reach the SAME final impulse (6,000 N·s) because both scenarios produce the same change in momentum. However:

- **5× longer time** → **5× lower peak force**

This is exactly why car safety features work:

- **Airbags**: Increase the time your head decelerates
- **Crumple zones**: Extend the time the car takes to stop
- **Seat belts**: Distribute force over a larger area AND time
