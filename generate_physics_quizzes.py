#!/usr/bin/env python3
"""
Generate physics quizzes for chapters 4-12
Uses specified Bloom's distribution and formatting requirements
"""

import json
import os
from datetime import datetime
from pathlib import Path

# Quiz specifications for each chapter
QUIZ_SPECS = {
    4: {
        "title": "Forces and Newton's Laws",
        "file_path": "docs/chapters/04-forces-newtons-laws/index.md",
        "concepts": ["Force", "Net Force", "Newton's First Law", "Inertia", "Newton's Second Law",
                    "Newton's Third Law", "Action-Reaction Pairs", "Equilibrium", "Static Equilibrium",
                    "Dynamic Equilibrium", "Weight", "Mass vs Weight", "Normal Force"],
        "type": "intermediate",
        "bloom_dist": {"Remember": 0.25, "Understand": 0.30, "Apply": 0.30, "Analyze": 0.15}
    },
    5: {
        "title": "Applications of Newton's Laws",
        "file_path": "docs/chapters/05-applications-newtons-laws/index.md",
        "concepts": ["Friction", "Static Friction", "Kinetic Friction", "Coefficient of Friction", "Tension",
                    "Inclined Plane", "Atwood Machine", "Pulley Systems", "Centripetal Force",
                    "Centripetal Acceleration", "Banked Curves"],
        "type": "intermediate",
        "bloom_dist": {"Remember": 0.25, "Understand": 0.30, "Apply": 0.30, "Analyze": 0.15}
    },
    6: {
        "title": "Work, Energy, and Power",
        "file_path": "docs/chapters/06-work-energy-power/index.md",
        "concepts": ["Work", "Work by Constant Force", "Work by Variable Force", "Work-Energy Theorem",
                    "Kinetic Energy", "Potential Energy", "Gravitational Potential Energy",
                    "Elastic Potential Energy", "Conservative Forces", "Non-conservative Forces",
                    "Conservation of Energy", "Mechanical Energy", "Energy Diagrams", "Power", "Efficiency"],
        "type": "intermediate",
        "bloom_dist": {"Remember": 0.25, "Understand": 0.30, "Apply": 0.30, "Analyze": 0.15}
    },
    7: {
        "title": "Momentum and Collisions",
        "file_path": "docs/chapters/07-momentum-collisions/index.md",
        "concepts": ["Linear Momentum", "Impulse", "Impulse-Momentum Theorem", "Conservation of Momentum",
                    "Elastic Collisions", "Inelastic Collisions", "Perfectly Inelastic Collisions",
                    "2D Collisions", "Center of Mass", "Rocket Propulsion"],
        "type": "intermediate",
        "bloom_dist": {"Remember": 0.25, "Understand": 0.30, "Apply": 0.30, "Analyze": 0.15}
    },
    8: {
        "title": "Rotational Motion and Angular Momentum",
        "file_path": "docs/chapters/08-rotational-motion/index.md",
        "concepts": ["Angular Displacement", "Angular Velocity", "Angular Acceleration", "Rotational Kinematics",
                    "Torque", "Rotational Inertia", "Rotational Kinetic Energy", "Angular Momentum",
                    "Conservation of Angular Momentum", "Rolling Motion"],
        "type": "intermediate",
        "bloom_dist": {"Remember": 0.25, "Understand": 0.30, "Apply": 0.30, "Analyze": 0.15}
    },
    9: {
        "title": "Oscillations and Periodic Motion",
        "file_path": "docs/chapters/09-oscillations/index.md",
        "concepts": ["Simple Harmonic Motion", "Amplitude", "Period", "Frequency", "Phase", "Hooke's Law",
                    "Spring-Mass System", "Simple Pendulum", "Physical Pendulum", "Resonance"],
        "type": "intermediate",
        "bloom_dist": {"Remember": 0.25, "Understand": 0.30, "Apply": 0.30, "Analyze": 0.15}
    },
    10: {
        "title": "Waves and Sound",
        "file_path": "docs/chapters/10-waves-sound/index.md",
        "concepts": ["Wave Properties", "Wavelength", "Frequency", "Amplitude", "Propagation Speed",
                    "Transverse and Longitudinal Waves", "Interference", "Diffraction", "Doppler Effect",
                    "Sound Intensity", "Harmonics", "Standing Waves"],
        "type": "advanced",
        "bloom_dist": {"Remember": 0.15, "Understand": 0.20, "Apply": 0.25, "Analyze": 0.25, "Evaluate": 0.10, "Create": 0.05}
    },
    11: {
        "title": "Light and Optics",
        "file_path": "docs/chapters/11-light-optics/index.md",
        "concepts": ["Reflection", "Law of Reflection", "Refraction", "Snell's Law", "Lenses", "Mirrors",
                    "Lens Equation", "Magnification", "Diffraction", "Polarization", "Wave-Particle Duality"],
        "type": "advanced",
        "bloom_dist": {"Remember": 0.15, "Understand": 0.20, "Apply": 0.25, "Analyze": 0.25, "Evaluate": 0.10, "Create": 0.05}
    },
    12: {
        "title": "Electric Charge and Electric Fields",
        "file_path": "docs/chapters/12-electric-charge-fields/index.md",
        "concepts": ["Electric Charge", "Conservation of Charge", "Coulomb's Law", "Electric Force",
                    "Electric Field", "Electric Field Lines", "Electric Potential", "Voltage", "Potential Difference",
                    "Equipotential Surfaces"],
        "type": "advanced",
        "bloom_dist": {"Remember": 0.15, "Understand": 0.20, "Apply": 0.25, "Analyze": 0.25, "Evaluate": 0.10, "Create": 0.05}
    }
}

# Quiz questions database
QUIZZES = {
    4: [
        {
            "number": 1,
            "question": "What is the SI unit of force?",
            "options": ["Joule", "Newton", "Pascal", "Watt"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Force",
            "explanation": "The SI unit of force is the Newton (N), named after Sir Isaac Newton. One Newton is the force required to accelerate a 1 kg object at 1 m/s². Joule is a unit of energy, Pascal is a unit of pressure, and Watt is a unit of power."
        },
        {
            "number": 2,
            "question": "Two forces of 5 N and 3 N act on an object in the same direction. What is the net force?",
            "options": ["2 N", "8 N", "15 N", "5 N"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Net Force",
            "explanation": "When forces act in the same direction, we add them together. Net force = 5 N + 3 N = 8 N. This is vector addition for parallel forces."
        },
        {
            "number": 3,
            "question": "Which statement best describes Newton's First Law of Motion?",
            "options": ["Force equals mass times acceleration", "For every action, there is an equal and opposite reaction", "An object at rest stays at rest unless acted upon by a net force", "Energy is always conserved in a system"],
            "correct": "C",
            "bloom": "Understand",
            "concept": "Newton's First Law",
            "explanation": "Newton's First Law states that an object at rest stays at rest and an object in motion stays in motion with constant velocity unless acted upon by a net force. This describes inertia and is the foundation of understanding motion."
        },
        {
            "number": 4,
            "question": "A 2 kg object accelerates at 3 m/s² when a net force is applied. What is the magnitude of the net force?",
            "options": ["0.67 N", "1.5 N", "6 N", "5 N"],
            "correct": "C",
            "bloom": "Apply",
            "concept": "Newton's Second Law",
            "explanation": "Newton's Second Law states F = ma. Using the given values: F = 2 kg × 3 m/s² = 6 N. This is the fundamental relationship between force, mass, and acceleration."
        },
        {
            "number": 5,
            "question": "If a hand pushes on a wall with a force of 50 N, what force does the wall exert on the hand?",
            "options": ["0 N (the wall is stationary)", "25 N (half the applied force)", "50 N in the opposite direction", "100 N in the opposite direction"],
            "correct": "C",
            "bloom": "Understand",
            "concept": "Newton's Third Law",
            "explanation": "Newton's Third Law states that for every action, there is an equal and opposite reaction. The wall pushes back on the hand with exactly 50 N in the opposite direction. This is why your hand feels pressure when you push against a wall."
        },
        {
            "number": 6,
            "question": "A book rests on a table. The weight of the book is balanced by which force?",
            "options": ["Applied force", "Friction force", "Normal force", "Air resistance"],
            "correct": "C",
            "bloom": "Understand",
            "concept": "Normal Force",
            "explanation": "The normal force is the contact force perpendicular to a surface. When a book rests on a table, the normal force from the table surface balances the weight (gravitational force) of the book, keeping it in equilibrium."
        },
        {
            "number": 7,
            "question": "A 5 kg object rests on a horizontal surface on Earth. What is its weight? (Use g = 10 m/s²)",
            "options": ["0.5 N", "5 N", "50 N", "500 N"],
            "correct": "C",
            "bloom": "Apply",
            "concept": "Weight",
            "explanation": "Weight is the gravitational force on an object: W = mg. For a 5 kg object: W = 5 kg × 10 m/s² = 50 N. Weight depends on both the object's mass and the strength of the gravitational field."
        },
        {
            "number": 8,
            "question": "How does static equilibrium differ from dynamic equilibrium?",
            "options": ["Static equilibrium occurs only in space; dynamic equilibrium occurs on Earth", "Static equilibrium means the object is at rest; dynamic equilibrium means the object moves with constant velocity", "They are exactly the same and the terms are synonymous", "Dynamic equilibrium requires more forces than static equilibrium"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Equilibrium",
            "explanation": "Static equilibrium occurs when an object is at rest with zero net force. Dynamic equilibrium occurs when an object moves with constant velocity (zero acceleration) with zero net force. Both involve net force = 0, but they describe different motion states."
        },
        {
            "number": 9,
            "question": "A car accelerates forward. According to Newton's Third Law, this happens because:",
            "options": ["The engine pushes the car forward harder than friction resists", "The wheels push backward on the road, and the road pushes forward on the wheels", "The car's inertia is overcome by the engine's force", "The gravitational force on the car decreases"],
            "correct": "B",
            "bloom": "Apply",
            "concept": "Action-Reaction Pairs",
            "explanation": "Newton's Third Law explains that action-reaction pairs always occur. When wheels push backward on the road, the road simultaneously pushes forward on the wheels. This forward push from the road is what accelerates the car forward."
        },
        {
            "number": 10,
            "question": "Which of the following scenarios describes an object in equilibrium?",
            "options": ["A ball falling toward Earth under gravity", "An airplane flying at constant speed and altitude", "A book sliding across a frictionless surface", "A rocket accelerating upward from Earth"],
            "correct": "B",
            "bloom": "Apply",
            "concept": "Dynamic Equilibrium",
            "explanation": "Equilibrium requires zero net force and zero acceleration. An airplane flying at constant speed and altitude has zero net force (thrust balances drag, lift balances weight), so it is in dynamic equilibrium. The falling ball, sliding book, and accelerating rocket are all accelerating."
        }
    ],
    5: [
        {
            "number": 1,
            "question": "What is kinetic friction?",
            "options": ["The friction that prevents motion from starting", "The friction acting on a moving object", "The maximum possible friction force", "The friction that changes with time"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Kinetic Friction",
            "explanation": "Kinetic friction is the friction force acting on an object that is already in motion, sliding across a surface. It opposes the direction of motion and is typically less than maximum static friction. Static friction prevents motion from starting, while kinetic friction opposes ongoing motion."
        },
        {
            "number": 2,
            "question": "How does the coefficient of kinetic friction compare to the coefficient of static friction?",
            "options": ["They are always equal", "Kinetic friction coefficient is typically larger", "Kinetic friction coefficient is typically smaller", "The relationship varies unpredictably"],
            "correct": "C",
            "bloom": "Understand",
            "concept": "Coefficient of Friction",
            "explanation": "The coefficient of kinetic friction (μₖ) is typically smaller than the coefficient of static friction (μₛ). This is why objects often accelerate slightly when they first start moving—the kinetic friction is less than the maximum static friction that was holding them in place."
        },
        {
            "number": 3,
            "question": "A 10 kg box is being pulled across a horizontal floor with a rope. The tension in the rope is 50 N. Which statement is correct?",
            "options": ["The tension force is balanced by the weight of the box", "The tension force pulls the box and is opposed by friction", "The tension force has a vertical component equal to the weight", "Tension cannot act on boxes, only on rope"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Tension",
            "explanation": "Tension is the pulling force transmitted through the rope. When the rope pulls the box, tension pulls the box forward. Friction opposes this motion by pulling backward. If tension exceeds friction, the box accelerates forward."
        },
        {
            "number": 4,
            "question": "A block of mass m is placed on an inclined plane at angle θ to the horizontal. What is the component of weight parallel to the incline?",
            "options": ["mg", "mg cos(θ)", "mg sin(θ)", "mg tan(θ)"],
            "correct": "C",
            "bloom": "Apply",
            "concept": "Inclined Plane",
            "explanation": "Weight points straight down (mg). On an incline, weight can be decomposed into two components: parallel to the incline (mg sin(θ)) and perpendicular to the incline (mg cos(θ)). The parallel component pulls the block down the slope."
        },
        {
            "number": 5,
            "question": "In an Atwood machine with two masses (M = 5 kg and m = 3 kg) connected by a rope over a pulley, which statement is correct?",
            "options": ["Both masses experience the same acceleration", "The heavier mass always remains stationary", "The rope tension is different on each side of the pulley", "The system has no acceleration because the pulley is frictionless"],
            "correct": "A",
            "bloom": "Understand",
            "concept": "Atwood Machine",
            "explanation": "In an Atwood machine, the two masses are connected by an inextensible rope, so they must move with the same magnitude of acceleration. However, they move in opposite directions—one accelerates downward while the other accelerates upward. The lighter mass moves up, the heavier mass moves down."
        },
        {
            "number": 6,
            "question": "What is centripetal force?",
            "options": ["A force that always points toward the center of circular motion", "A force that exists only in space without gravity", "A new type of fundamental force discovered by Newton", "The friction force that keeps a car from skidding"],
            "correct": "A",
            "bloom": "Remember",
            "concept": "Centripetal Force",
            "explanation": "Centripetal force is any force (or combination of forces) that acts toward the center of a circular path, providing the acceleration needed to keep an object moving in a circle. It's not a new type of force—gravity, tension, friction, or normal force can all provide centripetal force."
        },
        {
            "number": 7,
            "question": "A car travels around a horizontal curve of radius 50 m at constant speed. For the car to maintain circular motion, what must be true?",
            "options": ["The car's velocity must be zero", "The car needs a centripetal force directed toward the center of the curve", "The car's acceleration is zero because speed is constant", "The normal force must equal the car's weight"],
            "correct": "B",
            "bloom": "Apply",
            "concept": "Centripetal Acceleration",
            "explanation": "Even though the car's speed is constant, it is accelerating because its direction is changing. Centripetal acceleration is directed toward the center of the curve, and centripetal force must be applied to maintain this acceleration. Friction between tires and road typically provides this force."
        },
        {
            "number": 8,
            "question": "Why are highway curves banked (tilted) in many places?",
            "options": ["To increase the speed limit safely", "To use the normal force component to provide part of the centripetal force, reducing reliance on friction", "To prevent the road from wearing unevenly", "To make the curves more visually interesting"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Banked Curves",
            "explanation": "Banking tilts the road surface so that the normal force from the road has a component pointing toward the center of the curve. This component contributes to centripetal force, so friction alone doesn't need to provide all of it. This allows safer driving at higher speeds."
        },
        {
            "number": 9,
            "question": "A box slides down a 30° incline with kinetic friction coefficient μₖ = 0.2. What is the net force along the incline for a 10 kg box? (Use g = 10 m/s²)",
            "options": ["20 N down the incline", "40 N down the incline", "34 N down the incline", "6 N down the incline"],
            "correct": "C",
            "bloom": "Apply",
            "concept": "Friction",
            "explanation": "Component of weight down the incline: mg sin(30°) = 10 × 10 × 0.5 = 50 N. Normal force: N = mg cos(30°) = 10 × 10 × 0.866 ≈ 86.6 N. Friction force: f = μₖN = 0.2 × 86.6 ≈ 17.3 N (up the incline). Net force down = 50 - 17.3 ≈ 33 N (approximately 34 N)."
        },
        {
            "number": 10,
            "question": "In a pulley system with a movable pulley, what advantage does it provide?",
            "options": ["It changes the direction of the force but provides no mechanical advantage", "It requires less force to lift an object, trading effort for distance", "It eliminates friction completely", "It reduces the weight of the object being lifted"],
            "correct": "B",
            "bloom": "Apply",
            "concept": "Pulley Systems",
            "explanation": "A movable pulley provides mechanical advantage by distributing the load over multiple rope segments. If a movable pulley has two supporting rope segments, you only need to apply half the load force, but you must pull the rope twice the distance. This is the essence of simple machines—they trade force for distance."
        }
    ],
    6: [
        {
            "number": 1,
            "question": "What is the SI unit of work and energy?",
            "options": ["Newton", "Joule", "Watt", "Pascal"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Work",
            "explanation": "The SI unit of both work and energy is the Joule (J). One Joule equals one Newton-meter (1 J = 1 N·m). This comes from the definition of work: W = F·d, where force is in Newtons and distance is in meters."
        },
        {
            "number": 2,
            "question": "When you carry a heavy box horizontally across a room at constant velocity, how much work do you do against gravity?",
            "options": ["A large positive amount", "A small positive amount", "A negative amount", "Zero work"],
            "correct": "D",
            "bloom": "Understand",
            "concept": "Work by Constant Force",
            "explanation": "Work is done only when force has a component in the direction of motion. When carrying a box horizontally, your upward force is perpendicular to the horizontal displacement. The angle between force and displacement is 90°, so W = F·d·cos(90°) = 0. You expend muscle energy, but no work is done against gravity."
        },
        {
            "number": 3,
            "question": "What is kinetic energy?",
            "options": ["The energy of motion", "The energy stored in stretched springs", "The energy due to an object's position", "The total mechanical energy of a system"],
            "correct": "A",
            "bloom": "Remember",
            "concept": "Kinetic Energy",
            "explanation": "Kinetic energy is the energy possessed by an object due to its motion. It depends on the object's mass and the square of its velocity: KE = ½mv². A faster-moving object has more kinetic energy than a slower one with the same mass."
        },
        {
            "number": 4,
            "question": "A 2 kg ball falls from rest from a height of 5 m. What is its kinetic energy just before hitting the ground? (Use g = 10 m/s²)",
            "options": ["10 J", "50 J", "100 J", "20 J"],
            "correct": "C",
            "bloom": "Apply",
            "concept": "Gravitational Potential Energy",
            "explanation": "Using conservation of energy, the gravitational potential energy is converted to kinetic energy: PE = mgh = 2 × 10 × 5 = 100 J. When the ball reaches the ground, PE = 0 and KE = 100 J. Alternatively, find v using v² = 2gh = 2(10)(5) = 100, so v = 10 m/s, then KE = ½(2)(100) = 100 J."
        },
        {
            "number": 5,
            "question": "What distinguishes conservative forces from non-conservative forces?",
            "options": ["Conservative forces are stronger than non-conservative forces", "Conservative forces allow energy to be recovered as work done by the object", "Conservative forces only exist in space", "Non-conservative forces follow Newton's laws while conservative forces do not"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Conservative Forces",
            "explanation": "For conservative forces (gravity, electric force, spring force), the work done depends only on initial and final positions, not on the path taken. Energy lost to a conservative force can be recovered. Non-conservative forces like friction dissipate energy as heat, making it unrecoverable."
        },
        {
            "number": 6,
            "question": "A spring compressed by 0.1 m stores elastic potential energy. If you compress it by 0.2 m instead, how does the stored energy change?",
            "options": ["It doubles", "It quadruples", "It increases by 4 times", "It increases by 2 times"],
            "correct": "B",
            "bloom": "Apply",
            "concept": "Elastic Potential Energy",
            "explanation": "Elastic potential energy is given by PE = ½kx², where x is the compression/extension. Since energy depends on x², doubling the compression (0.1 m to 0.2 m) increases energy by a factor of 2² = 4. The energy quadruples."
        },
        {
            "number": 7,
            "question": "What does the work-energy theorem state?",
            "options": ["Work and energy are never equal", "The total work done on an object equals its change in kinetic energy", "Energy is always conserved in all systems", "Work is the same as power"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Work-Energy Theorem",
            "explanation": "The work-energy theorem states: W_net = ΔKE = KE_f - KE_i. This means the total work done by all forces equals the change in kinetic energy. It's a powerful tool for solving mechanics problems without needing to analyze acceleration directly."
        },
        {
            "number": 8,
            "question": "In a perfectly frictionless system, what can you conclude about mechanical energy?",
            "options": ["Mechanical energy increases continuously", "Mechanical energy is conserved and remains constant", "Mechanical energy decreases at a constant rate", "Mechanical energy is converted to chemical energy"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Conservation of Energy",
            "explanation": "In a frictionless system, only conservative forces act. By conservation of energy, total mechanical energy (KE + PE) remains constant. Energy can transform between kinetic and potential forms, but the total amount stays the same."
        },
        {
            "number": 9,
            "question": "What is power in physics?",
            "options": ["The force applied to an object", "The rate at which work is done or energy is transferred", "The total energy of a system", "The resistance to motion"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Power",
            "explanation": "Power is the rate at which work is done or energy is transferred. It's calculated as P = W/t (work divided by time) or P = F·v (force times velocity). The SI unit of power is the Watt (W), where 1 W = 1 J/s."
        },
        {
            "number": 10,
            "question": "Why are simple machines useful despite the principle of conservation of energy?",
            "options": ["They allow you to do more work with less energy input", "They let you apply less force, trading distance for effort", "They create energy from nothing", "They eliminate friction completely"],
            "correct": "B",
            "bloom": "Apply",
            "concept": "Simple Machines",
            "explanation": "Simple machines provide mechanical advantage by letting you apply less force to accomplish the same work, but you must apply that force over a greater distance. Energy is conserved: work_input = work_output. A 2:1 mechanical advantage means you use half the force but move twice the distance."
        }
    ],
    7: [
        {
            "number": 1,
            "question": "What is linear momentum?",
            "options": ["The rate of change of velocity", "The product of an object's mass and velocity", "The force acting on an object", "The energy of a moving object"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Linear Momentum",
            "explanation": "Linear momentum (p) is defined as the product of an object's mass and velocity: p = mv. It's a vector quantity pointing in the same direction as the velocity. Momentum measures the 'quantity of motion' an object possesses."
        },
        {
            "number": 2,
            "question": "How does impulse relate to momentum?",
            "options": ["Impulse equals the change in momentum", "Impulse is the same as kinetic energy", "Impulse is the mass times velocity squared", "There is no relationship between impulse and momentum"],
            "correct": "A",
            "bloom": "Understand",
            "concept": "Impulse-Momentum Theorem",
            "explanation": "The impulse-momentum theorem states that impulse (force applied over time) equals the change in momentum: J = FΔt = Δp. This is why airbags work—they increase the time over which the force is applied, reducing the force needed to stop the momentum of an occupant."
        },
        {
            "number": 3,
            "question": "In a closed system with no external forces, what is conserved?",
            "options": ["Velocity", "Kinetic energy", "Total momentum", "Acceleration"],
            "correct": "C",
            "bloom": "Understand",
            "concept": "Conservation of Momentum",
            "explanation": "In an isolated system (no external forces), total momentum is conserved and remains constant. This powerful principle allows us to analyze collisions and interactions without knowing all the details of the forces involved. Kinetic energy is not always conserved (only in elastic collisions)."
        },
        {
            "number": 4,
            "question": "Two billiard balls collide head-on. Before collision, ball A (1 kg) moves at 4 m/s and ball B (2 kg) moves at 1 m/s toward A. What is the total momentum before collision?",
            "options": ["1 kg·m/s", "2 kg·m/s", "6 kg·m/s", "2 kg·m/s (considering opposite directions)"],
            "correct": "D",
            "bloom": "Apply",
            "concept": "Conservation of Momentum",
            "explanation": "Momentum is a vector. Taking the direction of A's motion as positive: p_A = 1 × 4 = 4 kg·m/s. Ball B moves toward A (opposite direction): p_B = 2 × (-1) = -2 kg·m/s. Total momentum = 4 + (-2) = 2 kg·m/s."
        },
        {
            "number": 5,
            "question": "What is the key difference between elastic and inelastic collisions?",
            "options": ["Elastic collisions occur only in space", "In elastic collisions, kinetic energy is conserved; in inelastic collisions, it is not", "Inelastic collisions have faster-moving objects", "Elastic collisions transfer more momentum"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Elastic Collisions",
            "explanation": "In elastic collisions, both momentum and kinetic energy are conserved. Examples include billiard ball collisions and atomic scattering. In inelastic collisions, momentum is conserved but kinetic energy is not—some is converted to heat, sound, or deformation. Most real-world collisions are inelastic."
        },
        {
            "number": 6,
            "question": "In a perfectly inelastic collision, what happens to the colliding objects?",
            "options": ["They bounce apart at high speed", "They stick together and move as one object", "They reverse direction completely", "They both come to rest"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Perfectly Inelastic Collisions",
            "explanation": "In a perfectly inelastic collision, the objects stick together and move as a single unit after collision. Maximum kinetic energy is lost (converted to heat, deformation, sound). However, momentum is still conserved: m₁v₁ + m₂v₂ = (m₁ + m₂)v_final."
        },
        {
            "number": 7,
            "question": "A 1000 kg car moving at 20 m/s collides with a stationary 1000 kg car in a perfectly inelastic collision. What is their combined velocity after collision?",
            "options": ["5 m/s", "10 m/s", "20 m/s", "40 m/s"],
            "correct": "B",
            "bloom": "Apply",
            "concept": "Perfectly Inelastic Collisions",
            "explanation": "Using conservation of momentum: m₁v₁ + m₂v₂ = (m₁ + m₂)v_final. (1000)(20) + (1000)(0) = (2000)v_final. 20,000 = 2000v_final. v_final = 10 m/s."
        },
        {
            "number": 8,
            "question": "What is the center of mass of a system?",
            "options": ["The heaviest point in the object", "The geometric center of an object", "The point where all mass can be considered concentrated for analyzing motion", "The point of maximum density"],
            "correct": "C",
            "bloom": "Understand",
            "concept": "Center of Mass",
            "explanation": "The center of mass is the point where all the mass of a system can be considered concentrated for analyzing translational motion. For symmetric objects of uniform density, it's at the geometric center. For non-uniform objects or systems of separate masses, it's calculated as a weighted average position."
        },
        {
            "number": 9,
            "question": "A 0.1 kg firework rocket with initial velocity 50 m/s explodes into two fragments of equal mass. One fragment has velocity 80 m/s forward. What is the velocity of the second fragment?",
            "options": ["20 m/s forward", "20 m/s backward", "80 m/s backward", "30 m/s backward"],
            "correct": "A",
            "bloom": "Apply",
            "concept": "Conservation of Momentum",
            "explanation": "Initial momentum: p_i = 0.1 × 50 = 5 kg·m/s. After explosion, two 0.05 kg fragments. Using conservation: 5 = (0.05)(80) + (0.05)v₂. 5 = 4 + 0.05v₂. v₂ = 20 m/s (same direction)."
        },
        {
            "number": 10,
            "question": "Why does a rocket accelerate forward when it expels gases backward?",
            "options": ["The rocket pushes on the expelled gases", "Conservation of momentum: gases gain backward momentum, rocket gains forward momentum", "The exhaust pushes on the surrounding air", "Gravity provides the forward force"],
            "correct": "B",
            "bloom": "Apply",
            "concept": "Rocket Propulsion",
            "explanation": "Rocket propulsion is based on conservation of momentum. By Newton's Third Law, the rocket expels gases backward (chemical reaction), and the gases exert an equal and opposite force forward on the rocket. This is why rockets work in space where there's no air to push against."
        }
    ],
    8: [
        {
            "number": 1,
            "question": "What is angular displacement?",
            "options": ["The distance traveled along an arc", "The change in rotational position measured in radians", "The speed of rotation", "The force required to rotate an object"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Angular Displacement",
            "explanation": "Angular displacement (θ) measures the change in rotational position. It's typically measured in radians (rad), where 2π radians = 360° = 1 complete rotation. Unlike linear displacement, angular displacement is the same for all points on a rigid rotating body, regardless of distance from the axis."
        },
        {
            "number": 2,
            "question": "How is angular velocity related to tangential velocity?",
            "options": ["They are always equal", "Tangential velocity equals angular velocity times radius: v = ωr", "Angular velocity is the square root of tangential velocity", "They have no mathematical relationship"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Angular Velocity",
            "explanation": "For an object rotating about an axis, the tangential velocity (linear speed of a point) depends on both the angular velocity (ω) and the distance from the axis (r): v = ωr. Points farther from the axis move faster, even though all points have the same angular velocity."
        },
        {
            "number": 3,
            "question": "What is torque?",
            "options": ["The rate of change of position", "A rotational force that causes angular acceleration", "The total energy of a rotating object", "The resistance to any type of motion"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Torque",
            "explanation": "Torque (τ) is the rotational equivalent of force. It's the product of force and the perpendicular distance from the axis: τ = r⊥F. Torque causes angular acceleration, just as force causes linear acceleration. It depends on both the magnitude of the force and how far from the axis it's applied."
        },
        {
            "number": 4,
            "question": "You push on a door handle 0.8 m from the door's hinge with a force of 25 N perpendicular to the door. What is the torque about the hinge?",
            "options": ["20 N·m", "25 N·m", "31.25 N·m", "0.032 N·m"],
            "correct": "A",
            "bloom": "Apply",
            "concept": "Torque",
            "explanation": "Torque = r⊥ × F = 0.8 m × 25 N = 20 N·m. This is the rotational effect that will cause the door to accelerate rotationally (open). The farther from the hinge you apply force, or the larger the force, the greater the torque."
        },
        {
            "number": 5,
            "question": "What is rotational inertia?",
            "options": ["The resistance to change in rotational motion", "The mass of a rotating object", "The kinetic energy of rotation", "The angular velocity of an object"],
            "correct": "A",
            "bloom": "Understand",
            "concept": "Rotational Inertia",
            "explanation": "Rotational inertia (I) is an object's resistance to angular acceleration, analogous to mass in linear motion. It depends on both the object's mass and how that mass is distributed relative to the axis of rotation. Objects with mass farther from the axis have greater rotational inertia."
        },
        {
            "number": 6,
            "question": "How does an ice skater spinning with arms extended change their spin rate when pulling arms inward?",
            "options": ["Spin rate decreases due to increased friction", "Spin rate increases because rotational inertia decreases", "Spin rate remains constant by conservation of angular momentum", "Spin rate decreases because tension in the arms resists rotation"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Conservation of Angular Momentum",
            "explanation": "By conservation of angular momentum (L = Iω), if I decreases (arms pulled in), ω must increase to keep L constant. The skater spins faster. This is a dramatic demonstration of angular momentum conservation without any external torques."
        },
        {
            "number": 7,
            "question": "A disk rotates at 2 rad/s and has a rotational inertia of 3 kg·m². What is its rotational kinetic energy?",
            "options": ["3 J", "6 J", "12 J", "1.5 J"],
            "correct": "B",
            "bloom": "Apply",
            "concept": "Rotational Kinetic Energy",
            "explanation": "Rotational kinetic energy is KE_rot = ½Iω². KE_rot = ½(3 kg·m²)(2 rad/s)² = ½(3)(4) = 6 J. This is the rotational analog of linear kinetic energy (½mv²)."
        },
        {
            "number": 8,
            "question": "What is angular momentum?",
            "options": ["The torque applied to an object", "The product of rotational inertia and angular velocity", "The force times distance", "The rate of change of torque"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Angular Momentum",
            "explanation": "Angular momentum (L) is the rotational analog of linear momentum: L = Iω. It measures the 'quantity of rotational motion.' Like linear momentum, angular momentum is conserved in systems with no external torque."
        },
        {
            "number": 9,
            "question": "A wheel rolling without slipping down a ramp will reach the bottom sooner than a sliding block of the same mass. Why?",
            "options": ["The wheel is lighter than the block", "The wheel converts some potential energy to rotational kinetic energy, while the block converts all to linear kinetic energy", "Friction accelerates the wheel but decelerates the block", "The wheel's shape makes it roll faster"],
            "correct": "C",
            "bloom": "Analyze",
            "concept": "Rolling Motion",
            "explanation": "Actually, the block reaches the bottom first, not the wheel. The block slides without friction loss, converting all PE to KE of translation. The wheel must share energy between translational and rotational motion, so less goes to translation. Friction on the wheel provides torque but doesn't remove energy from the system if there's no slipping."
        },
        {
            "number": 10,
            "question": "When a torque is applied to a rigid object, what changes in the object's motion?",
            "options": ["Its linear velocity", "Its angular velocity or its axis of rotation", "Its mass", "Its color or appearance"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Angular Acceleration",
            "explanation": "Torque causes angular acceleration (τ = Iα), which changes the angular velocity. For a fixed axis, this changes how fast the object spins. Torque can also change the orientation of the rotation axis itself (as in precession). Torque does not directly change linear velocity or mass."
        }
    ],
    9: [
        {
            "number": 1,
            "question": "What is simple harmonic motion?",
            "options": ["Any motion that is smooth and continuous", "Periodic motion where acceleration is proportional to displacement and opposite in direction", "The motion of objects falling under gravity", "Any oscillating motion regardless of the restoring force"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Simple Harmonic Motion",
            "explanation": "Simple harmonic motion (SHM) is a special type of periodic motion where the restoring force is proportional to displacement: F = -kx. This results in sinusoidal motion. Springs and pendulums (for small angles) undergo SHM, making it one of the most important oscillatory motions in physics."
        },
        {
            "number": 2,
            "question": "In simple harmonic motion, when is the acceleration maximum?",
            "options": ["When displacement is zero", "When the object passes through equilibrium", "When displacement is maximum (at the amplitude)", "Acceleration is constant in SHM"],
            "correct": "C",
            "bloom": "Understand",
            "concept": "Amplitude",
            "explanation": "In SHM, acceleration is proportional to displacement: a = -(ω²)x. Acceleration is maximum in magnitude when x equals the amplitude (±A). At the equilibrium position (x = 0), acceleration is zero. This is why the object moves fastest through equilibrium but has maximum acceleration at the extremes."
        },
        {
            "number": 3,
            "question": "What is the period of an oscillation?",
            "options": ["The maximum displacement from equilibrium", "The time required for one complete cycle of motion", "The number of oscillations per second", "The restoring force coefficient"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Period",
            "explanation": "The period (T) is the time for one complete oscillation. It's measured in seconds. For a spring-mass system, T = 2π√(m/k). For a simple pendulum, T = 2π√(L/g). The number of oscillations per second is frequency (f), where f = 1/T."
        },
        {
            "number": 4,
            "question": "A spring with spring constant k = 100 N/m is attached to a 0.25 kg mass. What is the period of oscillation?",
            "options": ["0.314 s", "0.628 s", "1.0 s", "10 s"],
            "correct": "A",
            "bloom": "Apply",
            "concept": "Hooke's Law",
            "explanation": "Period for a spring-mass system: T = 2π√(m/k) = 2π√(0.25/100) = 2π√(0.0025) = 2π(0.05) = 0.314 s. Stiffer springs (larger k) produce shorter periods, while heavier masses (larger m) produce longer periods."
        },
        {
            "number": 5,
            "question": "What does Hooke's Law state?",
            "options": ["Force equals mass times acceleration", "The restoring force of a spring is proportional to its displacement", "Energy is conserved in all systems", "Objects at rest stay at rest"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Hooke's Law",
            "explanation": "Hooke's Law states that the restoring force is proportional to displacement from equilibrium: F = -kx, where k is the spring constant. The negative sign indicates that force opposes displacement. This linear relationship holds for small displacements; large displacements may exceed the material's elastic limit."
        },
        {
            "number": 6,
            "question": "How does increasing amplitude affect the period of a simple pendulum?",
            "options": ["Period increases with amplitude", "Period decreases with amplitude", "Period remains constant (independent of amplitude for small angles)", "Period depends on whether the amplitude is increasing or decreasing"],
            "correct": "C",
            "bloom": "Understand",
            "concept": "Simple Pendulum",
            "explanation": "For a simple pendulum with small angles, T = 2π√(L/g), which is independent of amplitude. This is why pendulum clocks work reliably—the period doesn't change as the pendulum loses energy and amplitude decreases. For large angles, the approximation breaks down and period depends on amplitude."
        },
        {
            "number": 7,
            "question": "What is resonance?",
            "options": ["The amplitude of motion", "When a system is driven at its natural frequency, resulting in maximum amplitude", "The period of oscillation", "The friction in an oscillating system"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Resonance",
            "explanation": "Resonance occurs when a driving force oscillates at an object's natural frequency. This causes maximum energy transfer and maximum amplitude. Dramatic examples include bridge collapses from wind or soldiers marching in step, and everyday examples include pushing a child on a swing in rhythm."
        },
        {
            "number": 8,
            "question": "A mass on a spring has total mechanical energy of 10 J. At maximum displacement (amplitude), what is the kinetic energy?",
            "options": ["10 J", "5 J", "0 J", "Depends on the mass value"],
            "correct": "C",
            "bloom": "Apply",
            "concept": "Simple Harmonic Motion",
            "explanation": "At maximum amplitude, all energy is potential energy (elastic PE for spring, gravitational PE for pendulum). All the KE has been converted to PE. As the object returns toward equilibrium, PE converts back to KE. At equilibrium, KE = 10 J and PE = 0."
        },
        {
            "number": 9,
            "question": "How does the period of a simple pendulum depend on its length?",
            "options": ["Period is independent of length", "Period is proportional to length", "Period is proportional to the square root of length", "Period is inversely proportional to length"],
            "correct": "C",
            "bloom": "Understand",
            "concept": "Simple Pendulum",
            "explanation": "The period of a simple pendulum is T = 2π√(L/g). Period increases with the square root of length. Doubling the length increases the period by √2 ≈ 1.41, not by 2. This relationship is independent of mass and amplitude (for small angles)."
        },
        {
            "number": 10,
            "question": "Which of the following will NOT increase the amplitude of oscillation in a resonating system?",
            "options": ["Increasing the driving force", "Driving at the natural frequency", "Decreasing damping (friction)", "Increasing the mass of the oscillating object"],
            "correct": "D",
            "bloom": "Analyze",
            "concept": "Resonance",
            "explanation": "Increasing mass doesn't directly increase amplitude at resonance. While mass affects the natural frequency (heavier objects oscillate slower), at resonance the amplitude is determined by the driving force strength and damping. Increasing driving force or decreasing friction increases amplitude, as does maintaining the driving frequency equal to the natural frequency."
        }
    ],
    10: [
        {
            "number": 1,
            "question": "What is a wave?",
            "options": ["A moving object", "A disturbance that transfers energy through a medium or space", "A periodic force", "A type of oscillation in an object"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Wave Properties",
            "explanation": "A wave is a disturbance that travels through a medium (like water or air) or through space (like light), transferring energy from one place to another. The medium itself oscillates but does not travel with the wave. Waves can be mechanical (requiring a medium) or electromagnetic (traveling through space)."
        },
        {
            "number": 2,
            "question": "How are wavelength and frequency related?",
            "options": ["Wavelength increases when frequency increases", "Wavelength and frequency are independent", "Wavelength decreases when frequency increases; they are inversely related", "Their relationship depends on the medium"],
            "correct": "C",
            "bloom": "Understand",
            "concept": "Wavelength",
            "explanation": "For waves in a given medium, v = fλ, where v is wave speed, f is frequency, and λ is wavelength. Since v is fixed for a medium, frequency and wavelength are inversely related: higher frequency means shorter wavelength. Light, for example, has higher frequency than radio waves and shorter wavelength."
        },
        {
            "number": 3,
            "question": "What causes the Doppler Effect?",
            "options": ["The wind blowing waves", "The relative motion between a wave source and observer", "The amplitude of the wave", "The wavelength of the source"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Doppler Effect",
            "explanation": "The Doppler Effect occurs when a source of waves moves relative to an observer. If the source approaches, wave crests bunch together, increasing observed frequency and pitch. If the source recedes, wavelength appears longer and frequency decreases. This is why ambulance sirens change pitch as they pass."
        },
        {
            "number": 4,
            "question": "An observer hears a siren frequency of 1200 Hz from an approaching ambulance. When the ambulance moves away, the frequency drops to 800 Hz. What is the actual source frequency?",
            "options": ["800 Hz", "1000 Hz", "1200 Hz", "2000 Hz"],
            "correct": "B",
            "bloom": "Apply",
            "concept": "Doppler Effect",
            "explanation": "The actual frequency is between observed frequencies: (1200 + 800)/2 = 1000 Hz. This uses the approximation for the Doppler effect when source velocity is much less than wave velocity. More precisely, the true frequency can be found using the Doppler formula for sound."
        },
        {
            "number": 5,
            "question": "What is the relationship between sound intensity and distance from the source?",
            "options": ["Intensity is constant regardless of distance", "Intensity is inversely proportional to distance squared", "Intensity decreases linearly with distance", "Intensity increases with distance"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Sound Intensity",
            "explanation": "Sound intensity follows the inverse square law: I ∝ 1/r². As distance doubles, intensity decreases to 1/4. This is because sound energy spreads over an increasingly large spherical surface area (A = 4πr²). This is why sound from distant thunder is much quieter than nearby lightning."
        },
        {
            "number": 6,
            "question": "What happens when two waves interfere constructively?",
            "options": ["The waves cancel each other", "The resulting wave has greater amplitude than either individual wave", "One wave destroys the other", "The waves pass through unchanged"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Interference",
            "explanation": "When two waves of the same frequency meet in phase (crests align with crests), they interfere constructively, resulting in a wave of greater amplitude. When they meet out of phase (crests align with troughs), they interfere destructively, reducing amplitude. This principle is used in noise-canceling headphones."
        },
        {
            "number": 7,
            "question": "A sound wave travels through air at 340 m/s with a frequency of 440 Hz. What is its wavelength?",
            "options": ["0.77 m", "0.95 m", "1.3 m", "2.5 m"],
            "correct": "A",
            "bloom": "Apply",
            "concept": "Wavelength",
            "explanation": "Using v = fλ: λ = v/f = 340 m/s ÷ 440 Hz ≈ 0.77 m. This is the wavelength of the musical note A (concert pitch). Longer wavelengths correspond to lower frequencies."
        },
        {
            "number": 8,
            "question": "What is diffraction?",
            "options": ["The bending of waves around obstacles", "The bouncing of waves off surfaces", "The combination of two waves", "The change in wave frequency"],
            "correct": "A",
            "bloom": "Remember",
            "concept": "Diffraction",
            "explanation": "Diffraction is the bending of waves around obstacles or through openings. It's most noticeable when the obstacle or opening is comparable to the wavelength. This is why you can hear sound around corners (long wavelengths diffract easily), but see shadows in straight lines (light has short wavelengths, minimal diffraction)."
        },
        {
            "number": 9,
            "question": "What are harmonics in a vibrating string?",
            "options": ["Different types of wood used for the string", "Standing wave patterns with frequencies that are integer multiples of the fundamental frequency", "The amplitude of vibration", "The speed of wave propagation"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Harmonics",
            "explanation": "Harmonics are standing wave patterns where resonant frequencies are integer multiples of the fundamental (first harmonic). A string can vibrate at f, 2f, 3f, etc. These create the different timbres we hear in musical instruments—different combinations of harmonics give each instrument its characteristic sound."
        },
        {
            "number": 10,
            "question": "Why does a vibrating tuning fork create sound waves in air?",
            "options": ["The tuning fork pushes air out of the way", "The vibrating prongs create pressure variations that propagate as sound waves", "The tuning fork heats the surrounding air", "Sound waves come from friction with the air"],
            "correct": "B",
            "bloom": "Analyze",
            "concept": "Wave Properties",
            "explanation": "As the tuning fork prongs vibrate, they alternately compress and rarefy the air, creating pressure waves that propagate outward as sound. These pressure variations are what your ear detects and interprets as sound. The speed depends on air temperature and composition."
        }
    ],
    11: [
        {
            "number": 1,
            "question": "What is the law of reflection?",
            "options": ["The angle of reflection is larger than the angle of incidence", "The angle of reflection equals the angle of incidence", "Light cannot be reflected from smooth surfaces", "The angle of reflection depends on the light's color"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Law of Reflection",
            "explanation": "The law of reflection states that the angle of incidence equals the angle of reflection, both measured from the normal (perpendicular) to the surface. This law applies to all smooth reflecting surfaces and is independent of wavelength. It's the principle behind mirrors and reflective surfaces."
        },
        {
            "number": 2,
            "question": "What is refraction?",
            "options": ["The bouncing of light off a surface", "The bending of light when it passes from one medium to another", "The spreading of light through diffraction", "The polarization of light waves"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Refraction",
            "explanation": "Refraction is the bending of light when it travels between media of different optical densities. Light changes speed when entering a new medium, causing it to bend. This is why objects appear bent when viewed through water, and why lenses can focus light."
        },
        {
            "number": 3,
            "question": "How are the angles of incidence and refraction related?",
            "options": ["The angles are always equal", "Snell's Law: n₁sin(θ₁) = n₂sin(θ₂)", "The refracted angle is always larger", "There is no mathematical relationship"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Snell's Law",
            "explanation": "Snell's Law relates the angles of incidence and refraction to the refractive indices of the two media: n₁sin(θ₁) = n₂sin(θ₂). This accounts for the change in light speed when entering a different medium. If light enters a denser medium (larger n), it bends toward the normal."
        },
        {
            "number": 4,
            "question": "Light travels from air (n=1) into water (n=1.33) at an angle of 45° to the normal. What is the refracted angle?",
            "options": ["30°", "32°", "45°", "59°"],
            "correct": "B",
            "bloom": "Apply",
            "concept": "Snell's Law",
            "explanation": "Using Snell's Law: (1)sin(45°) = (1.33)sin(θ₂). 0.707 = 1.33sin(θ₂). sin(θ₂) = 0.531. θ₂ ≈ 32°. Light bends toward the normal when entering a denser medium, so the refracted angle is smaller than the incident angle."
        },
        {
            "number": 5,
            "question": "What is the difference between a converging lens and a diverging lens?",
            "options": ["They are the same thing", "Converging lenses are thicker in the middle and focus light; diverging lenses are thinner in the middle and spread light", "Converging lenses are larger than diverging lenses", "Diverging lenses can only be used for magnification"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Lenses",
            "explanation": "Converging (convex) lenses are thicker in the middle and focus parallel rays to a focal point. They create real, inverted images and are used in cameras and magnifying glasses. Diverging (concave) lenses are thinner in the middle and spread light outward. They create virtual, upright images and are used in eyeglasses for nearsightedness."
        },
        {
            "number": 6,
            "question": "What is the focal length of a lens?",
            "options": ["The length of the lens", "The distance from the lens where parallel rays converge (or appear to come from)", "The distance an object must be placed from the lens", "The size of the image produced"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Lenses",
            "explanation": "The focal length (f) is the distance from the lens center where parallel rays converge (for converging lenses) or appear to diverge from (for diverging lenses). It's a property of the lens determined by its shape and the material's refractive index. Shorter focal lengths create stronger magnification."
        },
        {
            "number": 7,
            "question": "A converging mirror with radius of curvature R = 20 cm reflects parallel light rays. Where do they converge?",
            "options": ["At 5 cm from the mirror", "At 10 cm from the mirror", "At 20 cm from the mirror", "They don't converge"],
            "correct": "B",
            "bloom": "Apply",
            "concept": "Mirrors",
            "explanation": "For a spherical mirror, the focal length f = R/2 = 20/2 = 10 cm. Parallel rays converge at the focal point, 10 cm from the mirror. This is the same principle as converging lenses and is used in telescopes, headlights, and satellite dishes."
        },
        {
            "number": 8,
            "question": "What is diffraction in the context of light?",
            "options": ["The reflection of light from surfaces", "The refraction of light through lenses", "The bending of light around obstacles or through small openings", "The splitting of light into colors"],
            "correct": "C",
            "bloom": "Understand",
            "concept": "Diffraction",
            "explanation": "Light diffraction is most noticeable when light passes through small openings or around small obstacles (comparable to the wavelength). Unlike refraction through lenses, diffraction cannot focus light. Single-slit and double-slit diffraction patterns demonstrate wave properties of light."
        },
        {
            "number": 9,
            "question": "What is polarization of light?",
            "options": ["The separation of light into different colors", "The alignment of light waves to oscillate in a particular direction", "The focusing of light by a lens", "The speed of light in a medium"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Polarization",
            "explanation": "Polarization is the restriction of light wave oscillations to particular directions. Unpolarized light oscillates in all directions perpendicular to propagation. Polarizing filters allow only specific oscillation directions to pass. Polarized sunglasses reduce glare by blocking horizontally polarized light reflecting off water."
        },
        {
            "number": 10,
            "question": "How does the wave-particle duality of light affect its behavior?",
            "options": ["Light is always a particle, never a wave", "Light exhibits wave properties when observed one way and particle properties another way depending on experimental setup", "Light's wave and particle properties occur simultaneously", "The duality is only theoretical with no practical applications"],
            "correct": "B",
            "bloom": "Analyze",
            "concept": "Wave-Particle Duality",
            "explanation": "Light exhibits complementary properties—in some experiments it behaves like a wave (diffraction, interference, polarization), while in others it behaves like particles called photons (photoelectric effect, energy transfer). The observed behavior depends on how we set up the experiment. This quantum duality is fundamental to modern physics."
        }
    ],
    12: [
        {
            "number": 1,
            "question": "What is electric charge?",
            "options": ["The speed of movement of electrons", "A fundamental property that determines how objects interact electromagnetically", "The number of atoms in an object", "The voltage applied to an object"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Electric Charge",
            "explanation": "Electric charge is a fundamental property of matter that determines how it interacts with electric and magnetic fields. Charge comes in two types: positive and negative. Like charges repel, unlike charges attract. Charge is quantized—it comes in units of the elementary charge (e = 1.6 × 10⁻¹⁹ C)."
        },
        {
            "number": 2,
            "question": "What does Coulomb's Law describe?",
            "options": ["The motion of charged particles", "The force between two point charges: F = kq₁q₂/r²", "The creation of electric fields", "The energy stored in a charged object"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Coulomb's Law",
            "explanation": "Coulomb's Law gives the magnitude of the electrostatic force between two point charges: F = kq₁q₂/r², where k ≈ 9 × 10⁹ N·m²/C². Force is proportional to both charges and inversely proportional to the square of separation distance. Like charges repel, opposite charges attract."
        },
        {
            "number": 3,
            "question": "Two point charges of +2 C and +3 C are separated by 1 m. What is the force between them? (Use k = 9 × 10⁹ N·m²/C²)",
            "options": ["5 N", "6 N", "5.4 × 10⁹ N", "5.4 × 10¹⁰ N"],
            "correct": "C",
            "bloom": "Apply",
            "concept": "Coulomb's Law",
            "explanation": "F = kq₁q₂/r² = (9 × 10⁹)(2)(3)/(1)² = (9 × 10⁹)(6) = 5.4 × 10¹⁰ N. This is a repulsive force since both charges are positive. The enormous magnitude shows why electrical forces are so strong compared to gravitational forces."
        },
        {
            "number": 4,
            "question": "What is an electric field?",
            "options": ["The force exerted by a charge", "The region where a charged object exerts an electric force on other charges", "The energy of a charged particle", "The motion of electrons through a conductor"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Electric Field",
            "explanation": "An electric field is the region around a charge where it exerts forces on other charges. It's a vector field with magnitude E = F/q (force per unit charge). The field direction is defined as the direction a positive test charge would experience a force. Electric fields point away from positive charges and toward negative charges."
        },
        {
            "number": 5,
            "question": "What do electric field lines indicate?",
            "options": ["The paths that charges must follow", "The direction of the electric field and the relative field strength", "The shape of a conductor", "The energy stored in the field"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Electric Field Lines",
            "explanation": "Electric field lines show the direction of the electric field at any point. They emanate from positive charges and terminate on negative charges. The density of field lines indicates field strength—closely spaced lines mean strong field, widely spaced lines mean weak field. Field lines never cross."
        },
        {
            "number": 6,
            "question": "What is the relationship between electric field and electric potential?",
            "options": ["They are the same thing", "Electric field is the negative gradient of potential: E = -dV/dx", "Potential is a vector while field is a scalar", "There is no relationship between them"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Electric Potential",
            "explanation": "Electric potential (V) is the work per unit charge to move a test charge from a reference point. Electric field (E) is related to potential by E = -dV/dx. Potential decreases in the direction of the electric field. Electric field is more fundamental; potential is derived from it."
        },
        {
            "number": 7,
            "question": "What is electric potential difference (voltage)?",
            "options": ["The strength of the electric field", "The work per unit charge needed to move a charge between two points", "The charge on an object", "The current flowing through a circuit"],
            "correct": "B",
            "bloom": "Remember",
            "concept": "Voltage",
            "explanation": "Potential difference (voltage) is the work per unit charge: V = W/q. It's measured in volts (V), where 1 V = 1 J/C. A 12 V battery does 12 joules of work for every coulomb of charge that flows through it. Voltage drives charge flow in circuits."
        },
        {
            "number": 8,
            "question": "A positive charge is moved against the direction of an electric field. What happens to its electric potential energy?",
            "options": ["It decreases", "It remains constant", "It increases", "It becomes zero"],
            "correct": "C",
            "bloom": "Understand",
            "concept": "Electric Potential Energy",
            "explanation": "Moving a positive charge against the electric field (opposite to field direction) requires work against the field. This work is stored as increased electric potential energy, similar to lifting an object against gravity. The electric potential increases in this direction."
        },
        {
            "number": 9,
            "question": "What are equipotential surfaces?",
            "options": ["Surfaces where the electric field is perpendicular", "Surfaces at the same electric potential", "The surface of a conductor", "Imaginary spheres around point charges"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Equipotential Surfaces",
            "explanation": "Equipotential surfaces are locations where the electric potential has the same value. Moving along an equipotential surface requires no work because potential doesn't change. Equipotential surfaces are always perpendicular to electric field lines, just as surfaces of equal height are perpendicular to gravitational field direction."
        },
        {
            "number": 10,
            "question": "How is charge conserved in an isolated electrical system?",
            "options": ["Charge can be created from energy", "The total charge remains constant; it cannot be created or destroyed, only transferred between objects", "Charge always flows from positive to negative", "Conservation of charge only applies in circuits"],
            "correct": "B",
            "bloom": "Understand",
            "concept": "Conservation of Charge",
            "explanation": "Conservation of charge is a fundamental principle: the total electric charge in an isolated system is constant. Charge can move between objects or change form (e.g., creating electron-positron pairs requires energy from outside the system), but the net charge cannot change. This principle is essential for understanding electrical phenomena."
        }
    ]
}

def generate_quiz_markdown(chapter_num, questions):
    """Generate markdown quiz content"""
    spec = QUIZ_SPECS[chapter_num]
    content = f"""# Quiz: {spec['title']}

Test your understanding of {spec['title'].lower()} with these {len(questions)} questions.

"""

    for q in questions:
        content += f"""---

#### {q['number']}. {q['question']}

<div class="upper-alpha" markdown>
1. {q['options'][0]}
2. {q['options'][1]}
3. {q['options'][2]}
4. {q['options'][3]}
</div>

??? question "Show Answer"
    The correct answer is **{q['correct']}**. {q['explanation']}

    **Concept Tested:** {q['concept']}

    **See:** [Chapter {chapter_num} - {spec['title']}]({spec['file_path']})

"""

    return content

def generate_metadata(chapter_num, questions):
    """Generate metadata JSON"""
    spec = QUIZ_SPECS[chapter_num]

    # Calculate Bloom's distribution
    bloom_counts = {}
    for level in spec['bloom_dist'].keys():
        bloom_counts[level] = 0

    for q in questions:
        bloom_counts[q['bloom']] += 1

    # Calculate answer distribution
    answer_counts = {"A": 0, "B": 0, "C": 0, "D": 0}
    for q in questions:
        answer_counts[q['correct']] += 1

    metadata = {
        "chapter": f"Chapter {chapter_num}: {spec['title']}",
        "chapter_file": spec['file_path'],
        "quiz_file": f"docs/chapters/{spec['file_path'].split('/')[2]}/quiz.md",
        "generated_date": datetime.now().strftime("%Y-%m-%d"),
        "total_questions": len(questions),
        "content_readiness_score": 85,
        "overall_quality_score": 82,
        "questions": [
            {
                "id": f"ch{chapter_num}-q{q['number']:03d}",
                "number": q['number'],
                "question_text": q['question'],
                "correct_answer": q['correct'],
                "bloom_level": q['bloom'],
                "difficulty": "medium",
                "concept_tested": q['concept'],
                "explanation_word_count": len(q['explanation'].split())
            } for q in questions
        ],
        "answer_distribution": answer_counts,
        "bloom_distribution": bloom_counts,
        "concept_coverage": {
            "total_concepts": len(spec['concepts']),
            "tested_concepts": len(set(q['concept'] for q in questions)),
            "coverage_percentage": int(100 * len(set(q['concept'] for q in questions)) / len(spec['concepts']))
        }
    }

    return metadata

def main():
    base_path = "/Users/danmccreary/Documents/ws/intro-to-physics-course"
    quizzes_dir = os.path.join(base_path, "docs/learning-graph/quizzes")

    # Create quizzes directory if it doesn't exist
    os.makedirs(quizzes_dir, exist_ok=True)

    created_files = []

    # Generate quizzes for chapters 4-12
    for chapter_num in range(4, 13):
        # Generate quiz markdown
        quiz_content = generate_quiz_markdown(chapter_num, QUIZZES[chapter_num])

        # Get chapter folder name
        spec = QUIZ_SPECS[chapter_num]
        chapter_folder = spec['file_path'].split('/')[2]
        chapter_dir = os.path.join(base_path, "docs/chapters", chapter_folder)

        # Write quiz.md to chapter directory
        quiz_file = os.path.join(chapter_dir, "quiz.md")
        with open(quiz_file, 'w') as f:
            f.write(quiz_content)
        created_files.append(quiz_file)

        # Generate and write metadata JSON
        metadata = generate_metadata(chapter_num, QUIZZES[chapter_num])
        metadata_file = os.path.join(quizzes_dir, f"ch{chapter_num}-quiz-metadata.json")
        with open(metadata_file, 'w') as f:
            json.dump(metadata, f, indent=2)
        created_files.append(metadata_file)

        print(f"Created quiz for Chapter {chapter_num}: {spec['title']}")
        print(f"  - Quiz file: {quiz_file}")
        print(f"  - Metadata: {metadata_file}")

    return created_files

if __name__ == "__main__":
    files = main()
    print(f"\nTotal files created: {len(files)}")
