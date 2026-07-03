# Berk Digital Twin — WebAssembly

> 🇹🇷 Türkçe sürüm: `README_tr.md`

Runs the deterministic fixed-point physics core **in the browser**. Same sim, same
result — bit-identical even in a single browser tab (proven via `state_hash`).

## Why it matters

Since the core is `Fx64` (Q32.32) integer math, determinism is independent of the
compiler/hardware/JS engine. The WASM target enables: in-browser deterministic
lockstep (web multiplayer), live interactive demos, and embeddable digital-twin viewers.

## Building

Prerequisites: Rust + the `wasm32-unknown-unknown` target + [`wasm-pack`](https://rustwasm.github.io/wasm-pack/).
```bash
rustup target add wasm32-unknown-unknown
cargo install wasm-pack   # once
cd wasm
wasm-pack build --target web   # -> wasm/pkg/ (berk_dt_wasm.js + .wasm)
```
The core is pulled in with an OS-independent feature set (`berk-dt`, `default-features=false,
features=["std"]`) → `getrandom`/`ed25519`/`rayon` are not pulled in (WASM is single-thread;
determinism is the goal anyway). Note: WASM is **single-thread** (the `parallel` feature is
not used on WASM).

## Demo

```bash
# after pkg/ is generated, a static server from inside wasm/:
python -m http.server 8080
# in the browser: http://localhost:8080/www/
```
**`www/index.html` — animated landing:** a "Berk Platform Teknolojileri A.Ş. ·
Berk — Digital Twin" title, a live particle background, capability chips, and a smooth
transition to the gallery via **Demolara Gir →** (Enter the Demos →).
**`www/demos.html` — interactive demo gallery (Three.js 3D):** a demo list in the left
bar (clickable), ← → arrows on both sides (keyboard arrows too), and a 3D scene in the
center (OrbitControls). The demos: **Time Ruler (Rollback)** and **Rollback Netcode**
(determinism showcase — below), **PBF fluid** (`WasmFluid3`), **rigid stack**, **CCD**
(bullet-wall), **compound shapes** (dumbbell+table), **buoyancy** (animated rippling water),
**heightfield terrain**, **cloth** (`WasmCloth`) — all of which run the real engine in the
browser (`WasmWorld3`/`WasmFluid3`/`WasmCloth`). Three.js comes from a CDN (importmap) →
internet is required. The `state_hash` badge demonstrates determinism live.

**Determinism showcase (interactive):** _Deterministic LiDAR_ — a raycast-based sensor
"sees" the scene as a 3D point-cloud (`WasmWorld3.lidar_points`); it scans the falling
spheres. Perception is bit-identical in fixed-point (sim-to-real/replay). _Chaotic Pendulum
(Featherstone)_ — a 4-link chaotic pendulum (`WasmPendulum`) with reduced-coordinate O(n)
ABA; chaotic yet bit-identical in fixed-point, with a reproducible trajectory (tip-trace).
_Time Ruler_ — snapshot-FREE rollback: going to a frame = re-simulating from scratch to that
frame; because it is deterministic, the state is always re-derived exactly (drag the ruler),
and "Poke here" forks the timeline into a separate universe. _Rollback Netcode_ — GGPO-style:
two worlds, left "local (prediction)" / right "authority"; when input arrives late due to
network latency the local one diverges, and once it arrives it rolls back from scratch and
corrects → the two worlds become bit-identical again (`state_hash` equal). Both run with only
the existing WASM API (no new binding/build needed).
**`www/box2d.html`** is the old simple 2D falling-boxes demo.
`www/replay.html` is the **determinism inspector** (3D, split screen): on the left, in a
Three.js scene, a **4×4 cube block** is dropped from a height, hits the ground, and scatters
(real `WasmWorld3`); on the right there are **two side-by-side frames**. The 1st run writes
each frame's `state_hash` live into the left frame (the golden trace); "Re-run + verify" sets
up the same scenario from scratch, fills the right frame, and compares the rows frame by frame
— matches are **green**, divergences are red. If the same dynamic trajectory repeats
bit-identically, determinism is proven visually (the basis for lockstep/rollback).

## API (JS)

```js
import init, { WasmWorld } from "./pkg/berk_dt_wasm.js";
await init();
const w = new WasmWorld(0, -10);
const ground = w.add_box(0, 0, -3, 8, 0.5, 1);   // kind 0 = static
const box    = w.add_box(1, 0,  4, 0.5, 0.5, 1); // kind 1 = dynamic
w.add_circle(1, 1, 5, 0.5, 1);
for (let i=0;i<120;i++) w.step(1/60);             // FIXED step
const x = w.body_x(box), y = w.body_y(box);
const hash = w.state_hash();                      // "...." (hex, cross-platform bit-identical)
```

## Status / verification note

The WASM build is **verified by CI**: the `wasm32` job in the `cross-platform-determinism`
workflow compiles the `wasm/` crate to the `wasm32-unknown-unknown` target on every push; if
a dependency breaks on wasm32, the job goes red. The core `Fx64` physics/decision path is pure
computation and portable — all dependencies (including rkyv/rstar/bincode) compile to wasm32
without issues.
