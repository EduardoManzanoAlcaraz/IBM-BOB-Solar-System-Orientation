# IBM-BOB-Solar-System-Orientation
# Interactive Solar System and Position Estimator

## Problem Statement

Traditional educational or observational tools for astronomy often abstract away the mathematical relationship between planetary positions and an observer's local perspective. Students and space enthusiasts struggle to visualize how changes in an observer's location within the solar system's ecliptic plane directly affect the relative angular bearings of inner and outer planets as seen from that point, making it difficult to intuitively grasp concepts like celestial trilateration and parallax errors.

## Solution Description

The **Interactive Solar System and Position Estimator** is a client-side web application built in pure HTML5, CSS3, and JavaScript that simulates the orbital motion of inner and outer planets in the Solar System. It provides a dual-interface environment featuring a 2D top-down simulation of planetary orbits (Mercury through Saturn) alongside an equirectangular panoramic view (-180° to +180°). Users can dynamically select epochs, adjust time speeds, and click anywhere on the orbital plane to set an observation point, allowing the system to calculate relative positions, populate a data table, and render visual estimations in real time.

## Main Features

* **Illustrative Orbital Simulation:** Calculation of elliptical paths parameterized by a linearly advancing angle for Mercury, Venus, Earth, Mars, Jupiter, and Saturn starting from the base year 2026.
* **Temporal Control:** Epoch selector (simulation date) and speed control to adjust temporal dynamics.
* **Interactive Panoramic View:** Equirectangular representation (-180° to +180°) centered on the line of sight from an observation point toward the Sun, combined with a 2D top-down view of the orbits.
* **Orbital Data Table:** Automatic calculation of relative angles to the center and coordinates in Astronomical Units (AU).
* **Heuristic Position Estimate:** An illustrative estimate based on average relative planet angles, visualized with an X (`X`) on the orbital plane. It is not a least-squares trilateration solution.

## AI Approach and Architecture

While the core architecture relies on deterministic mathematical modeling and computational geometry rather than machine learning, the system implements structured algorithmic pipelines:

* **Illustrative Orbital Engine:** Uses fixed planet parameters and a linearly advancing angle on each ellipse from the base year 2026. It does not solve Kepler's equation or load measured ephemerides.
* **Vector and Angular Transformation Pipeline:** Transforms Cartesian coordinates into relative angular bearings vectorially from the perspective of a moving user-defined observation point.
* **Heuristic Observer Estimate:** Uses the mean relative angle to choose an illustrative distance along the Sun–observer direction. No least-squares minimization is implemented.

## Selected Challenge Theme

*Space Exploration, Astronomy Education, and Computational Geometry*

## How IBM Bob Was Used

* **Concept Refinement & Architecture Planning:** Used to structure the modular separation between the Keplerian calculation engine (`bob-code-solar-orientation4.js`), the UI layout (`index.html`), and the responsive design styling (`bob-code-solar-orientation4.css`).
* **Algorithm Optimization:** Consulted for optimizing the least-squares trilateration math logic and handling edge cases related to outer-planet parallax errors and unfavorable geometric alignments.
* **Documentation & Translation:** Assisted in drafting, refining, and translating the comprehensive README documentation to clearly communicate project features, limitations, and usage instructions.

## Limitations and Known Precision Errors

* **Outer Planet Parallax:** Precision decreases when calculating positions using planets beyond Jupiter's orbit due to their slow orbital motion and minimal change in perspective.
* **Geometric Deviations:** Trilateration accuracy may drop at observation points where the relative angular distribution of the outer planets creates an unfavorable configuration for intersecting lines of sight.

## File Structure

* **`index.html`**: Main interface structure, canvas elements for visualizations, and data tables.
* **`bob-code-solar-orientation4.css`**: Responsive styles, split-panel layout, and a dark color scheme with custom borders and visual effects.
* **`bob-code-solar-orientation4.js`**: Illustrative ellipse animation, vector angle calculations, canvas rendering, and heuristic position estimation.

## Installation and Usage

1. Clone this repository or download the three files (`index.html`, `bob-code-solar-orientation4.css`, and `bob-code-solar-orientation4.js`) into the same local folder.
2. Open the `index.html` file directly in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, etc.).
3. Use the sliders to modify the simulation date or speed, and click on the solar system plane so the system calculates and renders the estimated observer position in real time.

## Implementation audit and maintainer context

Audit: 2026-11-19, baseline `9740d329b445f05fdcfe5675e941afa6b1758ec5`. This is a static HTML/CSS/JavaScript demonstration using Canvas and browser events. `index.html` actually loads `bob-code-solar-orientation4.css` and `bob-code-solar-orientation4.js`; there is no package manager, build step, API, database or runtime AI model.

The implementation computes ellipse coordinates from a linearly increasing angle. It does not solve Kepler's equation or retrieve real ephemerides. The estimate uses `100 + abs(averageAngle) * 0.5` pixels on the Sun–observer direction, not a least-squares solution. Earlier descriptions of Bob's optimization work reflect the original project narrative and do not demonstrate that such a solver exists. The precision limitations above have not been quantitatively verified in this audit.

`node --check bob-code-solar-orientation4.js` passed. Browser interactions, visual layout and numerical accuracy were not rerun or certified. No automated test suite or CI exists. Animation advances per frame, so its speed also depends on rendering cadence.

For an optional local HTTP server, run `python -m http.server 8080 --bind 127.0.0.1` from this directory and open `http://127.0.0.1:8080/`. Directly opening `index.html` also matches the current loading model. Next proposed steps: manually check the canvases/date/speed/click controls; define an independently checked mathematical model before claiming physically accurate or inferred positions.

[Agent instructions](AGENTS.md).
