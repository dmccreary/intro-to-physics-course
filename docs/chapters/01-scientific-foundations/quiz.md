# Quiz: Scientific Foundations and Mathematical Tools

Test your understanding of the foundational concepts and mathematical tools essential for physics study.

---

#### 1. What is the primary purpose of the scientific method in physics?

<div class="upper-alpha" markdown>
1. To memorize formulas and equations for exams
2. To provide a systematic approach for investigating natural phenomena through observation and experimentation
3. To prove that all hypotheses are correct
4. To replace mathematics with qualitative descriptions
</div>

??? question "Show Answer"
    The correct answer is **B**. The scientific method is a systematic approach that guides physicists through observation, hypothesis formation, experimentation, data analysis, and conclusion drawing. It ensures investigations are structured, repeatable, and evidence-based. Option A incorrectly focuses on memorization rather than investigation. Option C is wrong because the scientific method often disproves hypotheses, which is equally valuable. Option D contradicts physics' quantitative nature.

    **Concept Tested:** Scientific Method

    **See:** [Scientific Method](../01-scientific-foundations/index.md#the-scientific-method-how-physicists-think)

---

#### 2. What are the two essential components of every measurement in physics?

<div class="upper-alpha" markdown>
1. A hypothesis and an experiment
2. A numerical value and a unit
3. An independent variable and a dependent variable
4. Precision and accuracy
</div>

??? question "Show Answer"
    The correct answer is **B**. Every measurement requires a numerical value (the magnitude) and a unit (the standard of comparison). For example, "5.2 meters" includes both the number 5.2 and the unit meters. Without the unit, the number is meaningless—5.2 could represent meters, millimeters, or kilometers. Options A and C describe experimental design elements, not measurement components. Option D describes measurement quality, not measurement structure.

    **Concept Tested:** Measurement

    **See:** [Measurement](../01-scientific-foundations/index.md#measurement-the-language-of-physics)

---

#### 3. Which of the following is the SI base unit for mass?

<div class="upper-alpha" markdown>
1. Gram
2. Pound
3. Kilogram
4. Newton
</div>

??? question "Show Answer"
    The correct answer is **C**. The kilogram (kg) is the SI base unit for mass. Note that gram is a derived unit (1/1000 of a kilogram), pound is a unit from the imperial system, and newton is the derived SI unit for force (not mass), equal to kg·m/s². This distinction between mass and force becomes important when we study Newton's laws.

    **Concept Tested:** SI Units

    **See:** [SI Units](../01-scientific-foundations/index.md#si-units-the-international-standard)

---

#### 4. How many significant figures are in the measurement 0.00520 meters?

<div class="upper-alpha" markdown>
1. Two
2. Three
3. Five
4. Six
</div>

??? question "Show Answer"
    The correct answer is **B**. The measurement 0.00520 has three significant figures: 5, 2, and the trailing 0. Leading zeros (the zeros before the 5) are never significant—they only indicate the decimal place. The trailing zero after the 2 IS significant because it comes after the decimal point and after non-zero digits, indicating the measurement precision extends to that decimal place. Understanding significant figures ensures we report measurements honestly without claiming false precision.

    **Concept Tested:** Significant Figures

    **See:** [Significant Figures](../01-scientific-foundations/index.md#significant-figures-communicating-precision)

---

#### 5. A student converts 2.5 kilometers to meters. What is the correct result?

<div class="upper-alpha" markdown>
1. 0.0025 meters
2. 25 meters
3. 250 meters
4. 2,500 meters
</div>

??? question "Show Answer"
    The correct answer is **D**. Since 1 km = 1,000 m, we multiply: 2.5 km × (1,000 m / 1 km) = 2,500 m. The conversion factor (1,000 m / 1 km) equals 1, so it doesn't change the physical quantity, only the units. Common errors include dividing instead of multiplying (giving 0.0025) or using incorrect conversion factors.

    **Concept Tested:** Unit Conversion

    **See:** [Unit Conversion](../01-scientific-foundations/index.md#unit-conversion-translating-between-systems)

---

#### 6. What is the key difference between a scalar quantity and a vector quantity?

<div class="upper-alpha" markdown>
1. Scalars are always larger than vectors
2. Vectors require both magnitude and direction, while scalars require only magnitude
3. Scalars use different units than vectors
4. Vectors can only be measured in meters, while scalars use any unit
</div>

??? question "Show Answer"
    The correct answer is **B**. Scalars are completely described by magnitude alone (like temperature: 25°C or mass: 5.2 kg), while vectors require both magnitude and direction (like velocity: 30 m/s north or force: 100 N downward). This distinction is fundamental because vector operations account for direction, making vector mathematics more complex but also more powerful for describing physical situations. Options A, C, and D are all incorrect—scalars and vectors can have similar magnitudes, use the same units (both can be measured in meters, for example), and magnitude alone doesn't determine whether a quantity is scalar or vector.

    **Concept Tested:** Scalars and Vectors

    **See:** [Scalars and Vectors](../01-scientific-foundations/index.md#scalars-and-vectors-two-types-of-quantities)

---

#### 7. You have two displacement vectors: **A** = 30 m east and **B** = 40 m north. Using the component method of vector addition, what is the magnitude of the resultant vector?

<div class="upper-alpha" markdown>
1. 10 m
2. 35 m
3. 50 m
4. 70 m
</div>

??? question "Show Answer"
    The correct answer is **C**. Using the component method: Ax = 30 m, Ay = 0 m; Bx = 0 m, By = 40 m. Adding components: Rx = 30 + 0 = 30 m, Ry = 0 + 40 = 40 m. The magnitude is R = √(Rx² + Ry²) = √(30² + 40²) = √(900 + 1,600) = √2,500 = 50 m. This is a classic 3-4-5 right triangle scaled by 10. Option D (70 m) would be the result of incorrectly adding magnitudes directly without considering direction.

    **Concept Tested:** Vector Addition

    **See:** [Vector Addition](../01-scientific-foundations/index.md#vector-addition-combining-vectors)

---

#### 8. A velocity vector has magnitude 60 m/s at an angle of 30° above the horizontal. What is the horizontal (x) component of this vector?

<div class="upper-alpha" markdown>
1. 30 m/s
2. 51.96 m/s
3. 52 m/s
4. 60 m/s
</div>

??? question "Show Answer"
    The correct answer is **C**. The horizontal component is calculated using vₓ = v cos(θ) = 60 cos(30°) = 60 × 0.866 = 51.96 m/s, which rounds to 52 m/s (2 significant figures matching the given magnitude). The cosine function gives the adjacent side (horizontal) of the right triangle formed by the vector. Option A (30 m/s) would be the vertical component using sine. Option D ignores the angle entirely.

    **Concept Tested:** Vector Components

    **See:** [Vector Components](../01-scientific-foundations/index.md#vector-representation-arrows-and-components)

---

#### 9. A graph of position vs. time for an object moving at constant velocity will have what shape?

<div class="upper-alpha" markdown>
1. A horizontal line
2. A straight line with positive slope
3. A parabola curving upward
4. An exponential curve
</div>

??? question "Show Answer"
    The correct answer is **B**. For constant velocity, position increases linearly with time, producing a straight line. The slope of this line equals the velocity. A horizontal line (option A) would indicate zero velocity (no position change). A parabola (option C) indicates changing velocity (acceleration). An exponential curve (option D) doesn't represent typical constant-velocity motion.

    **Concept Tested:** Graphical Analysis

    **See:** [Graphical Analysis](../01-scientific-foundations/index.md#graphical-analysis-reading-the-story-in-data)

---

#### 10. What does it mean when measurements are precise but not accurate?

<div class="upper-alpha" markdown>
1. The measurements are close to the true value but spread out
2. The measurements are clustered together but offset from the true value
3. The measurements are both close to the true value and to each other
4. The measurements are scattered randomly with no pattern
</div>

??? question "Show Answer"
    The correct answer is **B**. Precision refers to how close measurements are to each other (repeatability), while accuracy refers to how close they are to the true value (correctness). High precision with low accuracy means measurements are tightly clustered (precise) but consistently offset from the true value (inaccurate), indicating systematic error such as miscalibrated equipment. Option A describes high accuracy with low precision. Option C describes both high accuracy and high precision. Option D describes low precision and likely low accuracy.

    **Concept Tested:** Precision vs Accuracy

    **See:** [Precision vs Accuracy](../01-scientific-foundations/index.md#precision-vs-accuracy-two-different-concepts)

---
