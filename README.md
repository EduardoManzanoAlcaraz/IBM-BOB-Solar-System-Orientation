# IBM-BOB-Solar-System-Orientation
# Interactive Solar System and Position Estimator

## Problem Statement

Traditional educational or observational tools for astronomy often abstract away the mathematical relationship between planetary positions and an observer's local perspective. Students and space enthusiasts struggle to visualize how changes in an observer's location within the solar system's ecliptic plane directly affect the relative angular bearings of inner and outer planets as seen from that point, making it difficult to intuitively grasp concepts like celestial trilateration and parallax errors.

## Solution Description

The **Interactive Solar System and Position Estimator** is a client-side web application built in pure HTML5, CSS3, and JavaScript that simulates the orbital motion of inner and outer planets in the Solar System. It provides a dual-interface environment featuring a 2D top-down simulation of planetary orbits (Mercury through Saturn) alongside an equirectangular panoramic view (-180° to +180°). Users can dynamically select epochs, adjust time speeds, and click anywhere on the orbital plane to set an observation point, allowing the system to calculate relative positions, populate a data table, and render visual estimations in real time.

## Main Features

* **Realistic Orbital Simulation:** Calculation of elliptical orbits and mean anomalies for Mercury, Venus, Earth, Mars, Jupiter, and Saturn starting from the base year 2026.
* **Temporal Control:** Epoch selector (simulation date) and speed control to adjust temporal dynamics.
* **Interactive Panoramic View:** Equirectangular representation (-180° to +180°) centered on the line of sight from an observation point toward the Sun, combined with a 2D top-down view of the orbits.
* **Orbital Data Table:** Automatic calculation of relative angles to the center and coordinates in Astronomical Units (AU).
* **Geometric Trilateration:** Real-time estimation of the observation point using least-squares algorithms, visualized with an X (`X`) on the orbital plane.

## AI Approach and Architecture

While the core architecture relies on deterministic mathematical modeling and computational geometry rather than machine learning, the system implements structured algorithmic pipelines:

* **Keplerian Orbital Engine:** Computes elliptical orbits and mean anomalies to dynamically project planetary coordinates based on time progression from the base year 2026.
* **Vector and Angular Transformation Pipeline:** Transforms Cartesian coordinates into relative angular bearings vectorially from the perspective of a moving user-defined observation point.
* **Least-Squares Trilateration Solver:** Employs mathematical minimization algorithms to process multiple intersecting lines of sight from planetary angles, approximating the most accurate coordinate match for the observer's position.

## Selected Challenge Theme

*Space Exploration, Astronomy Education, and Computational Geometry*

## How IBM Bob Was Used

* **Concept Refinement & Architecture Planning:** Used to structure the modular separation between the Keplerian calculation engine (`script.js`), the UI layout (`index.html`), and the responsive design styling (`style.css`).
* **Algorithm Optimization:** Consulted for optimizing the least-squares trilateration math logic and handling edge cases related to outer-planet parallax errors and unfavorable geometric alignments.
* **Documentation & Translation:** Assisted in drafting, refining, and translating the comprehensive README documentation to clearly communicate project features, limitations, and usage instructions.

## Limitations and Known Precision Errors

* **Outer Planet Parallax:** Precision decreases when calculating positions using planets beyond Jupiter's orbit due to their slow orbital motion and minimal change in perspective.
* **Geometric Deviations:** Trilateration accuracy may drop at observation points where the relative angular distribution of the outer planets creates an unfavorable configuration for intersecting lines of sight.

## File Structure

* **`index.html`**: Main interface structure, canvas elements for visualizations, and data tables.
* **`style.css`**: Responsive styles, split-panel layout, and a dark color scheme with custom borders and visual effects.
* **`script.js`**: Keplerian simulation logic, vector angle calculations, graphic rendering, and trilateration position estimation.

## Installation and Usage

1. Clone this repository or download the three files (`index.html`, `style.css`, and `script.js`) into the same local folder.
2. Open the `index.html` file directly in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, etc.).
3. Use the sliders to modify the simulation date or speed, and click on the solar system plane so the system calculates and renders the estimated observer position in real time.
