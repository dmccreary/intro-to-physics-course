---
title: Energy Efficiency Comparison
description: Interactive infographic comparing energy efficiency across common devices and processes
image: /sims/energy-efficiency/energy-efficiency.png
og:image: /sims/energy-efficiency/energy-efficiency.png
quality_score: 95
---

# Energy Efficiency Comparison

<iframe src="main.html" height="1120px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

Copy this iframe to embed in your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/energy-efficiency/main.html" width="100%" height="1120px"></iframe>
```

## About This Infographic

This interactive visualization compares energy efficiency across 16 common devices and processes. Efficiency measures what fraction of input energy becomes useful output energy.

## Key Equation

$$\text{Efficiency} = \frac{E_{output}}{E_{input}} \times 100\%$$

## Device Categories

- **Lighting**: LED, CFL, and incandescent bulbs
- **Engines**: Gasoline, diesel, and steam engines
- **Power Generation**: Coal, natural gas, solar, wind, and hydroelectric
- **Other**: Electric motors, muscles, bicycles, heaters, and heat pumps

## Interactive Features

- **Click any card** to expand and see detailed explanation
- **Filter buttons** to view specific categories
- **Summary stats** showing average, most efficient, and least efficient devices

## Special Cases

**Electric Heater (100%)**: When heat IS the desired output, all electrical energy becomes useful heat.

**Heat Pump (300%+)**: Not violating thermodynamics! Heat pumps MOVE heat rather than create it. The coefficient of performance (COP) measures heat moved per energy input, which can exceed 1.

## Learning Points

- Efficiency is always ≤100% for devices that convert energy (Second Law of Thermodynamics)
- Higher efficiency = less wasted energy = lower costs and environmental impact
- Even "inefficient" devices aren't destroying energy - they're converting it to unusable forms (usually heat)

## Lesson Plan

**Learning Objectives:**

- Calculate energy efficiency using the efficiency formula
- Compare and rank devices by their energy efficiency
- Explain why some devices have higher efficiency than others
- Understand the special case of heat pumps and coefficient of performance

**Target Audience:** High school physics students (grades 10-12)

**Prerequisites:**

- Understanding of energy and energy transfer
- Basic knowledge of the First Law of Thermodynamics (conservation of energy)
- Familiarity with percentages and ratios

**Activities:**

1. **Exploration (10 min):** Have students explore all device categories and identify patterns. Which category has the highest average efficiency? Why might that be?

2. **Calculation Practice (15 min):** Given that a car engine receives 40,000 J of chemical energy from fuel and produces 10,000 J of mechanical work, calculate its efficiency. Compare to the infographic values.

3. **Analysis Discussion (10 min):** Why are heat engines (gasoline, diesel, steam) limited to relatively low efficiencies? Introduce the concept of the Carnot limit.

4. **Heat Pump Investigation (10 min):** Research why heat pumps can have COP > 1 without violating thermodynamics. How does moving heat differ from creating heat?

**Assessment:**

- Can students correctly calculate efficiency given input and output energy?
- Can students explain where "lost" energy goes in inefficient devices?
- Do students understand why heat pumps are a special case?

## Quiz

Test your understanding of energy efficiency with these questions.

---

#### 1. A motor receives 500 J of electrical energy and produces 400 J of mechanical work. What is its efficiency?

<div class="upper-alpha" markdown>
1. 125%
2. 80%
3. 20%
4. 100 J
</div>

??? question "Show Answer"
    The correct answer is **B**. Efficiency = (Output Energy / Input Energy) × 100% = (400 J / 500 J) × 100% = 80%. The remaining 20% (100 J) is lost as heat due to friction and electrical resistance in the motor windings.

    **Concept Tested:** Energy Efficiency Calculation

---

#### 2. An incandescent light bulb has only 5% efficiency. What happens to the other 95% of the electrical energy?

<div class="upper-alpha" markdown>
1. It is destroyed according to the Second Law of Thermodynamics
2. It is converted to heat instead of light
3. It is stored in the bulb for later use
4. It returns to the electrical grid
</div>

??? question "Show Answer"
    The correct answer is **B**. Energy is never destroyed (First Law of Thermodynamics). In an incandescent bulb, the filament must be heated to ~2700°C to glow. Most of the electrical energy heats the filament and surrounding air rather than producing visible light. This is why incandescent bulbs feel hot, while LED bulbs (85% efficient) stay cool.

    **Concept Tested:** Energy Conversion and Waste Heat

---

#### 3. A heat pump has a coefficient of performance (COP) of 3.0. If it uses 1000 J of electrical energy, how much heat does it move into the building?

<div class="upper-alpha" markdown>
1. 333 J
2. 1000 J
3. 3000 J
4. This is impossible - it would violate conservation of energy
</div>

??? question "Show Answer"
    The correct answer is **C**. A heat pump with COP = 3.0 moves 3 J of heat for every 1 J of electrical energy input. So 1000 J × 3.0 = 3000 J of heat moved. This doesn't violate thermodynamics because the heat pump is *moving* existing heat from outside to inside, not *creating* new energy. The electrical energy powers the compressor that does this work.

    **Concept Tested:** Coefficient of Performance

---

## References

1. [Energy Efficiency - Department of Energy](https://www.energy.gov/eere/energy-efficiency) - Official resources on energy efficiency standards and technologies

2. [Heat Engines and Efficiency - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/thermo/heaeng.html) - Detailed physics explanations of heat engine efficiency limits

3. [Coefficient of Performance - Engineering Toolbox](https://www.engineeringtoolbox.com/cop-heat-pump-d_1023.html) - Technical explanation of heat pump COP calculations

4. [Second Law of Thermodynamics - Khan Academy](https://www.khanacademy.org/science/physics/thermodynamics/laws-of-thermodynamics/v/second-law-of-thermodynamics) - Video introduction to entropy and efficiency limits
