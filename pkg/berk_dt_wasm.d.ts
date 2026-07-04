/* tslint:disable */
/* eslint-disable */

/**
 * Deterministik **kumaş (XPBD)** — JS sarmalayıcısı. `cols×rows` ızgara, üst kenar sabit;
 * `positions()` parçacık konumlarını render için verir.
 */
export class WasmCloth {
    free(): void;
    [Symbol.dispose](): void;
    add_box_collider(cx: number, cy: number, cz: number, hx: number, hy: number, hz: number): void;
    add_ground(y: number): void;
    count(): number;
    constructor(cols: number, rows: number, spacing: number, ox: number, oy: number, oz: number, mass: number, compliance: number, gx: number, gy: number, gz: number);
    /**
     * Parçacık konumları (render): `count*3` f32 → `Float32Array`.
     */
    positions(): Float32Array;
    step(dt: number): void;
    cols: number;
    rows: number;
}

/**
 * Deterministik **3B PBF akışkanı** — JS sarmalayıcısı (demo galerisi için). Kutu konteynerde
 * parçacık suyu; tüm matematik `Fx64` → tarayıcıda da bit-aynı.
 */
export class WasmFluid3 {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Parçacık ekle (dünya). Dönüş: indeks.
     */
    add_particle(x: number, y: number, z: number): number;
    count(): number;
    /**
     * Yeni akışkan: smoothing radius `h`, yerçekimi, kutu konteyner `[bmin,bmax]`.
     */
    constructor(h: number, gx: number, gy: number, gz: number, bminx: number, bminy: number, bminz: number, bmaxx: number, bmaxy: number, bmaxz: number);
    /**
     * Parçacık konumları (render): `count*3` adet `f32` (x,y,z) → JS `Float32Array`.
     */
    positions(): Float32Array;
    /**
     * Tunable çözücü/malzeme parametreleri (tek çağrı). Varsayılanlar golden davranışı korur.
     */
    set_params(rest_density: number, pressure_stiffness: number, cfm_eps: number, sub_relaxation: number, boundary_friction: number, boundary_restitution: number, max_velocity_factor: number, particle_radius: number, solver_iterations: number): void;
    /**
     * İnce ayar: XSPH viskozite + kohezyon (0 = kapalı).
     */
    set_viscosity(viscosity: number, cohesion: number): void;
    /**
     * Çapraz-platform bit-aynı durum özeti (parçacık konum+hız bitlerinden).
     */
    state_hash(): string;
    /**
     * Sabit adım ilerlet (SABİT dt → determinizm).
     */
    step(dt: number): void;
}

/**
 * **"Üç Beyin" GPU determinizm demosu** — tarayıcıda (WASM), GPU kernel'lerinin birebir aynı
 * CPU yolunu (`gpu::pbf`) koşturur: deterministik sahne → grid → yoğunluk → λ. `fingerprint()`,
 * native CPU/GPU golden'ıyla **bit-aynı** çapraz-platform hash'tir (saf tamsayı; render dışında
 * f64 yok). Yani tarayıcı, GPU'nun ürettiği sonucu yeniden üretip eşleştirir.
 */
export class WasmGpuDemo {
    free(): void;
    [Symbol.dispose](): void;
    count(): number;
    /**
     * Parçacık yoğunlukları (renklendirme için; GPU kernel'iyle bit-aynı hesaplandı).
     */
    densities(): Float32Array;
    /**
     * **Çapraz-platform parmak-izi** (hex). Native CPU/GPU golden'ıyla bit-aynı olmalı.
     */
    fingerprint(): string;
    constructor(n: number);
    /**
     * Parçacık konumları (render): `count*3` f32 (x,y,z). Yalnız görsel — hash'e girmez.
     */
    positions(): Float32Array;
}

/**
 * **Deterministik granüler dünya (DEM)** — JS sarmalayıcısı. Toz/granül: kutuya dökülen taneler,
 * tane-tane temas (yay-sönüm + Coulomb sürtünme + kohezyon) + duvar. Tümü `Fx64` → tarayıcıda da
 * bit-aynı (`state_hash`). İlaç-tableti/madencilik tatlı-noktası demosu.
 */
export class WasmGrainWorld {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Tane ekle (başlangıç hızı sıfır).
     */
    add_grain(x: number, y: number, z: number): void;
    /**
     * Tane ekle, başlangıç hızıyla (kaptan/oluktan dökülen akış için).
     */
    add_grain_v(x: number, y: number, z: number, vx: number, vy: number, vz: number): void;
    count(): number;
    constructor(box_x: number, box_y: number, box_z: number, radius: number, gravity: number, k_n: number, c_n: number, mu: number, cohesion: number, mass: number, wall_c: number);
    /**
     * Tane konumları: `count*3` f32 (x,y,z).
     */
    positions(): Float32Array;
    radius(): number;
    /**
     * Tane hız büyüklükleri (renklendirme için): `count` f32.
     */
    speeds(): Float32Array;
    state_hash(): string;
    step(dt: number): void;
}

/**
 * **Robot labirent navigasyonu** — menzil sensörleriyle algıla→karar→hareket; yol deterministik.
 */
export class WasmNavBot {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Statik duvar ekle (xz merkez + yarı-genişlik; ışın yüksekliğini örter).
     */
    add_wall(cx: number, cz: number, hx: number, hz: number): void;
    /**
     * **LiDAR taraması (yatay yelpaze)** — robotun pozundan `rays` ışın, `fov` (radyan)
     * genişlikte; **BVH-hızlandırılmış** `Lidar3::scan` kullanır (üretimdeki sensör yolu).
     * Dönüş: her ışın için `[ex, ez, hit]` — uç-nokta (xz dünya) + isabet bayrağı (1=isabet,
     * 0=ıska). JS bunu robottan uç-noktaya çizgi olarak çizer (isabet/ıska renkli). Tarama
     * deterministiktir (sabit-nokta + bit-aynı raycast) → "deterministik algı" gösterimi.
     */
    lidar_scan(rays: number, fov: number, max_range: number): Float32Array;
    constructor();
    /**
     * `[x, z, heading]`.
     */
    pose(): Float32Array;
    reached(): boolean;
    /**
     * Sensör isabet noktaları (xz): her sensör için `[hx, hz]`.
     */
    sensor_hits(): Float32Array;
    set_goal(x: number, z: number, r: number): void;
    set_start(x: number, z: number, heading: number): void;
    state_hash(): string;
    step(dt: number): void;
}

/**
 * **Kaotik sarkaç** (Featherstone reduced-coordinate O(n) ABA) — determinizm vitrini.
 * Kaotik ama sabit-noktada (Fx64) bit-aynı/tekrar-üretilebilir.
 */
export class WasmPendulum {
    free(): void;
    [Symbol.dispose](): void;
    count(): number;
    constructor(n: number);
    /**
     * Dünya (x,y) konumları: taban + her eklem (n+1 nokta), düz `[x0,y0,x1,y1,…]`.
     */
    positions(): Float32Array;
    set_angle(i: number, a: number): void;
    state_hash(): string;
    step(dt: number): void;
}

/**
 * **Demo-senaryo runner** — paylaşılan deterministik manifest → 3B dünya. Üç motorun
 * (Unity/Unreal/WASM) referans WASM istemcisi bunu sürer; aynı çekirdek + aynı manifest →
 * bit-aynı `state_hash`. Bkz. `docs/DEMO_SHOWCASE_DESIGN.md`.
 */
export class WasmScenario {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    body_count(): number;
    frame(): number;
    /**
     * JSON manifestini yükle ve dünyayı sırayla kur. Hata → JS exception.
     */
    static fromJson(json: string): WasmScenario;
    /**
     * Manifestteki altın hash (yoksa boş string).
     */
    golden_hash(): string;
    is_done(): boolean;
    name(): string;
    /**
     * Render dönüşümleri: gövde başına `[px,py,pz, qx,qy,qz,qw]` (7 f32), interpolasyonlu.
     * `alpha` ∈ [0,1] = (birikmiş süre / dt). Dizi, cisimler spawn oldukça büyür.
     */
    render_transforms(alpha: number): Float32Array;
    /**
     * `state_hash` (16 haneli onaltılık) — çapraz-motor karşılaştırma anahtarı.
     */
    state_hash(): string;
    /**
     * Bir sabit adım ilerlet (güncel kareye ait olayları uygula + adımla).
     */
    step(): void;
    total_frames(): number;
}

/**
 * Deterministik 2B fizik dünyası — JS sarmalayıcısı.
 */
export class WasmWorld {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Kutu ekle (kind: 0=Static,1=Dynamic). Dönüş: cisim id.
     */
    add_box(kind: number, x: number, y: number, hx: number, hy: number, density: number): number;
    /**
     * Daire ekle. Dönüş: cisim id.
     */
    add_circle(kind: number, x: number, y: number, radius: number, density: number): number;
    body_angle(id: number): number;
    body_count(): number;
    body_x(id: number): number;
    body_y(id: number): number;
    /**
     * Yeni dünya (yerçekimi m/s²).
     */
    constructor(grav_x: number, grav_y: number);
    /**
     * Çapraz-platform bit-aynı durum özeti (onaltılık; JS u64 taşıyamadığı için String).
     */
    state_hash(): string;
    /**
     * Sabit adım ilerlet (SABİT dt kullanın → determinizm).
     */
    step(dt: number): void;
}

/**
 * Deterministik **3B rijit dünya** — JS sarmalayıcısı (demo galerisi). Kutu/küre/kapsül/
 * dışbükey/bileşik/heightfield + batmazlık + CCD. `transforms()` her cismin konum+quaternion'ını
 * render için verir.
 */
export class WasmWorld3 {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Kutu ekle (kind 0=statik, 1=dinamik). Dönüş: cisim id.
     */
    add_box(kind: number, x: number, y: number, z: number, hx: number, hy: number, hz: number, density: number): number;
    add_capsule(kind: number, x: number, y: number, z: number, r: number, half_h: number, density: number): number;
    /**
     * Bileşik (compound) gövde, yalnız kutu parçalardan. `parts` = parça başına 6 f32:
     * (yerel x,y,z, yarı hx,hy,hz). Kimlik rotasyon. Dönüş: cisim id.
     */
    add_compound_boxes(parts: Float32Array, x: number, y: number, z: number, density: number): number;
    /**
     * Dışbükey gövde (köşe bulutu, `verts` = n*3 f32). kind 0=statik,1=dinamik.
     */
    add_convex(kind: number, verts: Float32Array, x: number, y: number, z: number, density: number): number;
    /**
     * Heightfield (terrain) collider. `heights` = rows*cols f32 (satır-major).
     */
    add_heightfield(rows: number, cols: number, cell: number, ox: number, oy: number, oz: number, heights: Float32Array): number;
    add_sphere(kind: number, x: number, y: number, z: number, r: number, density: number): number;
    body_count(): number;
    /**
     * Deterministik LiDAR taraması: poz (origin + forward/up), azimut×elevasyon ızgarası,
     * menzil. İsabet noktalarını düz `[x,y,z, …]` döndürür (nokta bulutu render'ı).
     */
    lidar_points(ox: number, oy: number, oz: number, fwx: number, fwy: number, fwz: number, upx: number, upy: number, upz: number, az_count: number, el_count: number, az_fov: number, el_fov: number, max_range: number): Float32Array;
    constructor(gx: number, gy: number, gz: number);
    set_ccd(id: number, on: boolean): void;
    set_linvel(id: number, vx: number, vy: number, vz: number): void;
    /**
     * Batmazlık (buoyancy): `level` altındaki dinamik gövdeler yüzer (yoğunluk < `density`).
     */
    set_water(enabled: boolean, level: number, density: number, lin_drag: number, ang_drag: number): void;
    state_hash(): string;
    step(dt: number): void;
    /**
     * Tüm cisimlerin konum+quaternion'ı (render): cisim başına 7 f32 (px,py,pz, qx,qy,qz,qw).
     */
    transforms(): Float32Array;
}

/**
 * Determinizm epoğu (SIM_VERSION) — golden/replay uyumluluk sürümü. İstemci, sunucuyla
 * aynı epokta olduğunu bununla doğrular (bkz. `docs/CONFORMANCE.md`).
 */
export function sim_version(): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_get_wasmcloth_cols: (a: number) => number;
    readonly __wbg_get_wasmcloth_rows: (a: number) => number;
    readonly __wbg_set_wasmcloth_cols: (a: number, b: number) => void;
    readonly __wbg_set_wasmcloth_rows: (a: number, b: number) => void;
    readonly __wbg_wasmcloth_free: (a: number, b: number) => void;
    readonly __wbg_wasmfluid3_free: (a: number, b: number) => void;
    readonly __wbg_wasmgpudemo_free: (a: number, b: number) => void;
    readonly __wbg_wasmgrainworld_free: (a: number, b: number) => void;
    readonly __wbg_wasmnavbot_free: (a: number, b: number) => void;
    readonly __wbg_wasmpendulum_free: (a: number, b: number) => void;
    readonly __wbg_wasmscenario_free: (a: number, b: number) => void;
    readonly __wbg_wasmworld3_free: (a: number, b: number) => void;
    readonly __wbg_wasmworld_free: (a: number, b: number) => void;
    readonly wasmcloth_add_box_collider: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
    readonly wasmcloth_add_ground: (a: number, b: number) => void;
    readonly wasmcloth_count: (a: number) => number;
    readonly wasmcloth_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
    readonly wasmcloth_positions: (a: number) => [number, number];
    readonly wasmcloth_step: (a: number, b: number) => void;
    readonly wasmfluid3_add_particle: (a: number, b: number, c: number, d: number) => number;
    readonly wasmfluid3_count: (a: number) => number;
    readonly wasmfluid3_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly wasmfluid3_positions: (a: number) => [number, number];
    readonly wasmfluid3_set_params: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
    readonly wasmfluid3_set_viscosity: (a: number, b: number, c: number) => void;
    readonly wasmfluid3_state_hash: (a: number) => [number, number];
    readonly wasmfluid3_step: (a: number, b: number) => void;
    readonly wasmgpudemo_count: (a: number) => number;
    readonly wasmgpudemo_densities: (a: number) => [number, number];
    readonly wasmgpudemo_fingerprint: (a: number) => [number, number];
    readonly wasmgpudemo_new: (a: number) => number;
    readonly wasmgpudemo_positions: (a: number) => [number, number];
    readonly wasmgrainworld_add_grain: (a: number, b: number, c: number, d: number) => void;
    readonly wasmgrainworld_add_grain_v: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
    readonly wasmgrainworld_count: (a: number) => number;
    readonly wasmgrainworld_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
    readonly wasmgrainworld_positions: (a: number) => [number, number];
    readonly wasmgrainworld_radius: (a: number) => number;
    readonly wasmgrainworld_speeds: (a: number) => [number, number];
    readonly wasmgrainworld_state_hash: (a: number) => [number, number];
    readonly wasmgrainworld_step: (a: number, b: number) => void;
    readonly wasmnavbot_add_wall: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly wasmnavbot_lidar_scan: (a: number, b: number, c: number, d: number) => [number, number];
    readonly wasmnavbot_new: () => number;
    readonly wasmnavbot_pose: (a: number) => [number, number];
    readonly wasmnavbot_reached: (a: number) => number;
    readonly wasmnavbot_sensor_hits: (a: number) => [number, number];
    readonly wasmnavbot_set_goal: (a: number, b: number, c: number, d: number) => void;
    readonly wasmnavbot_set_start: (a: number, b: number, c: number, d: number) => void;
    readonly wasmnavbot_state_hash: (a: number) => [number, number];
    readonly wasmnavbot_step: (a: number, b: number) => void;
    readonly wasmpendulum_count: (a: number) => number;
    readonly wasmpendulum_new: (a: number) => number;
    readonly wasmpendulum_positions: (a: number) => [number, number];
    readonly wasmpendulum_set_angle: (a: number, b: number, c: number) => void;
    readonly wasmpendulum_state_hash: (a: number) => [number, number];
    readonly wasmpendulum_step: (a: number, b: number) => void;
    readonly wasmscenario_body_count: (a: number) => number;
    readonly wasmscenario_frame: (a: number) => number;
    readonly wasmscenario_fromJson: (a: number, b: number) => [number, number, number];
    readonly wasmscenario_golden_hash: (a: number) => [number, number];
    readonly wasmscenario_is_done: (a: number) => number;
    readonly wasmscenario_name: (a: number) => [number, number];
    readonly wasmscenario_render_transforms: (a: number, b: number) => [number, number];
    readonly wasmscenario_state_hash: (a: number) => [number, number];
    readonly wasmscenario_step: (a: number) => void;
    readonly wasmscenario_total_frames: (a: number) => number;
    readonly wasmworld3_add_box: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly wasmworld3_add_capsule: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
    readonly wasmworld3_add_compound_boxes: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
    readonly wasmworld3_add_convex: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
    readonly wasmworld3_add_heightfield: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly wasmworld3_add_sphere: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
    readonly wasmworld3_body_count: (a: number) => number;
    readonly wasmworld3_lidar_points: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number) => [number, number];
    readonly wasmworld3_new: (a: number, b: number, c: number) => number;
    readonly wasmworld3_set_ccd: (a: number, b: number, c: number) => void;
    readonly wasmworld3_set_linvel: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly wasmworld3_set_water: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly wasmworld3_state_hash: (a: number) => [number, number];
    readonly wasmworld3_step: (a: number, b: number) => void;
    readonly wasmworld3_transforms: (a: number) => [number, number];
    readonly wasmworld_add_box: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
    readonly wasmworld_add_circle: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly wasmworld_body_angle: (a: number, b: number) => number;
    readonly wasmworld_body_count: (a: number) => number;
    readonly wasmworld_body_x: (a: number, b: number) => number;
    readonly wasmworld_body_y: (a: number, b: number) => number;
    readonly wasmworld_new: (a: number, b: number) => number;
    readonly wasmworld_state_hash: (a: number) => [number, number];
    readonly wasmworld_step: (a: number, b: number) => void;
    readonly bp3_add_box: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
    readonly bp3_add_compound: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly bp3_add_convex: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
    readonly bp3_add_distance_joint: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly bp3_add_heightfield: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
    readonly bp3_add_hinge_joint: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly bp3_add_material: (a: number, b: number, c: number) => number;
    readonly bp3_add_sphere: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly bp3_add_spherical_joint: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly bp3_add_trimesh: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly bp3_add_weld_joint: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly bp3_advisor_add_branch: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly bp3_advisor_best: (a: number) => number;
    readonly bp3_advisor_branch_count: (a: number) => number;
    readonly bp3_advisor_create: (a: number, b: number, c: bigint) => number;
    readonly bp3_advisor_destroy: (a: number) => void;
    readonly bp3_advisor_evaluate: (a: number) => number;
    readonly bp3_advisor_ranked_id: (a: number, b: number) => number;
    readonly bp3_advisor_result_hash: (a: number, b: number) => bigint;
    readonly bp3_advisor_score: (a: number, b: number) => number;
    readonly bp3_advisor_set_goal: (a: number, b: number, c: number, d: number) => void;
    readonly bp3_advisor_world: (a: number) => number;
    readonly bp3_auto_rebase: (a: number, b: number, c: number) => void;
    readonly bp3_body_count: (a: number) => number;
    readonly bp3_body_render_transform: (a: number, b: number, c: number, d: number) => number;
    readonly bp3_body_set_ccd: (a: number, b: number, c: number) => number;
    readonly bp3_body_set_collision: (a: number, b: number, c: number, d: number) => number;
    readonly bp3_body_set_material: (a: number, b: number, c: number) => number;
    readonly bp3_body_set_sensor: (a: number, b: number, c: number) => number;
    readonly bp3_body_set_user_data: (a: number, b: number, c: bigint) => number;
    readonly bp3_body_transform: (a: number, b: number, c: number) => number;
    readonly bp3_body_transform_raw: (a: number, b: number, c: number) => number;
    readonly bp3_body_user_data: (a: number, b: number) => bigint;
    readonly bp3_box_cast: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
    readonly bp3_box_cast_masked: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number) => number;
    readonly bp3_capsule_cast: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly bp3_capsule_cast_masked: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
    readonly bp3_capture_render_state: (a: number) => number;
    readonly bp3_character_create: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly bp3_character_destroy: (a: number) => void;
    readonly bp3_character_move: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly bp3_character_set_max_iterations: (a: number, b: number) => void;
    readonly bp3_character_set_skin_width: (a: number, b: number) => void;
    readonly bp3_character_set_slope_limit: (a: number, b: number) => void;
    readonly bp3_character_set_step_offset: (a: number, b: number) => void;
    readonly bp3_character_set_substeps: (a: number, b: number) => void;
    readonly bp3_character_state: (a: number, b: number) => number;
    readonly bp3_compound_add_box: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
    readonly bp3_compound_add_capsule: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly bp3_compound_add_sphere: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly bp3_compound_create: () => number;
    readonly bp3_compound_destroy: (a: number) => void;
    readonly bp3_contact_event_count: (a: number) => number;
    readonly bp3_debug_draw_aabbs: (a: number, b: number, c: number, d: number) => number;
    readonly bp3_debug_draw_bodies: (a: number, b: number, c: number, d: number) => number;
    readonly bp3_femsolid_add_box_collider: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => void;
    readonly bp3_femsolid_add_ground_plane: (a: number, b: number) => void;
    readonly bp3_femsolid_add_sphere_collider: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly bp3_femsolid_cube_block: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number) => number;
    readonly bp3_femsolid_destroy: (a: number) => void;
    readonly bp3_femsolid_node_count: (a: number) => number;
    readonly bp3_femsolid_pin: (a: number, b: number) => void;
    readonly bp3_femsolid_positions: (a: number, b: number, c: number) => number;
    readonly bp3_femsolid_set_damping: (a: number, b: number) => void;
    readonly bp3_femsolid_set_friction: (a: number, b: number) => void;
    readonly bp3_femsolid_set_substeps: (a: number, b: number) => void;
    readonly bp3_femsolid_state_hash: (a: number) => bigint;
    readonly bp3_femsolid_step: (a: number, b: bigint) => number;
    readonly bp3_fluid_add_particle: (a: number, b: number, c: number, d: number) => number;
    readonly bp3_fluid_count: (a: number) => number;
    readonly bp3_fluid_create: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly bp3_fluid_destroy: (a: number) => void;
    readonly bp3_fluid_positions: (a: number, b: number, c: number) => number;
    readonly bp3_fluid_restore: (a: number, b: number, c: number) => number;
    readonly bp3_fluid_set_params: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly bp3_fluid_set_viscosity: (a: number, b: number, c: number) => number;
    readonly bp3_fluid_snapshot: (a: number, b: number, c: number) => number;
    readonly bp3_fluid_step: (a: number, b: bigint) => number;
    readonly bp3_fluid_step_world: (a: number, b: number, c: bigint) => number;
    readonly bp3_get_contact_event: (a: number, b: number, c: number) => number;
    readonly bp3_granular_add_grain: (a: number, b: number, c: number, d: number) => number;
    readonly bp3_granular_count: (a: number) => number;
    readonly bp3_granular_create: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
    readonly bp3_granular_destroy: (a: number) => void;
    readonly bp3_granular_positions: (a: number, b: number, c: number) => number;
    readonly bp3_granular_set_params: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly bp3_granular_set_walls: (a: number, b: number, c: number) => void;
    readonly bp3_granular_state_hash: (a: number) => bigint;
    readonly bp3_granular_step: (a: number, b: bigint) => number;
    readonly bp3_joint_count: (a: number) => number;
    readonly bp3_joint_set_limit: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly bp3_joint_set_motor: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly bp3_joint_set_torsion_spring: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly bp3_lidar_points: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number) => number;
    readonly bp3_lidar_scan: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number) => number;
    readonly bp3_overlap_aabb: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly bp3_overlap_aabb_masked: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly bp3_overlap_sphere: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
    readonly bp3_overlap_sphere_masked: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
    readonly bp3_raycast: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
    readonly bp3_raycast_all: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly bp3_raycast_masked: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly bp3_rebase: (a: number, b: number, c: number, d: number) => void;
    readonly bp3_restore: (a: number, b: number, c: number) => number;
    readonly bp3_rollback_advance: (a: number) => void;
    readonly bp3_rollback_create: (a: number, b: number, c: number, d: bigint, e: number) => number;
    readonly bp3_rollback_destroy: (a: number) => void;
    readonly bp3_rollback_frame: (a: number) => number;
    readonly bp3_rollback_local_input: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly bp3_rollback_remote_input: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly bp3_rollback_resync: (a: number) => void;
    readonly bp3_rollback_state_hash: (a: number) => bigint;
    readonly bp3_rollback_stats: (a: number, b: number, c: number) => void;
    readonly bp3_rollback_world: (a: number) => number;
    readonly bp3_scenario_body_count: (a: number) => number;
    readonly bp3_scenario_body_render_transform: (a: number, b: number, c: number, d: number) => number;
    readonly bp3_scenario_create: (a: number, b: number) => number;
    readonly bp3_scenario_destroy: (a: number) => void;
    readonly bp3_scenario_frame: (a: number) => number;
    readonly bp3_scenario_golden_hash: (a: number) => bigint;
    readonly bp3_scenario_is_done: (a: number) => number;
    readonly bp3_scenario_state_hash: (a: number) => bigint;
    readonly bp3_scenario_step: (a: number) => number;
    readonly bp3_scenario_total_frames: (a: number) => number;
    readonly bp3_sensor_bumper: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
    readonly bp3_sensor_cone: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number) => number;
    readonly bp3_sensor_ray: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
    readonly bp3_sentinel_acknowledge: (a: number) => void;
    readonly bp3_sentinel_alarm: (a: number) => number;
    readonly bp3_sentinel_breaches: (a: number) => number;
    readonly bp3_sentinel_create: (a: number, b: number, c: number, d: bigint, e: number, f: number) => number;
    readonly bp3_sentinel_destroy: (a: number) => void;
    readonly bp3_sentinel_first_divergence: (a: number) => bigint;
    readonly bp3_sentinel_input: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly bp3_sentinel_max_residual: (a: number) => number;
    readonly bp3_sentinel_observe: (a: number, b: number, c: number) => void;
    readonly bp3_sentinel_residual: (a: number) => number;
    readonly bp3_sentinel_step: (a: number) => number;
    readonly bp3_sentinel_world: (a: number) => number;
    readonly bp3_set_angular_velocity: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly bp3_set_bvh_broadphase: (a: number, b: number) => number;
    readonly bp3_set_contact_events_enabled: (a: number, b: number) => number;
    readonly bp3_set_linear_velocity: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly bp3_set_substeps: (a: number, b: number) => number;
    readonly bp3_set_water: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly bp3_snapshot: (a: number, b: number, c: number) => number;
    readonly bp3_snapshot_size: (a: number) => number;
    readonly bp3_softbody_add_box_collider: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => void;
    readonly bp3_softbody_add_distance: (a: number, b: number, c: number, d: number) => void;
    readonly bp3_softbody_add_ground_plane: (a: number, b: number) => void;
    readonly bp3_softbody_add_particle: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly bp3_softbody_add_sphere_collider: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly bp3_softbody_add_volume: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly bp3_softbody_cloth: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
    readonly bp3_softbody_create: (a: number, b: number, c: number) => number;
    readonly bp3_softbody_destroy: (a: number) => void;
    readonly bp3_softbody_particle_count: (a: number) => number;
    readonly bp3_softbody_pin: (a: number, b: number) => void;
    readonly bp3_softbody_positions: (a: number, b: number, c: number) => number;
    readonly bp3_softbody_set_damping: (a: number, b: number) => void;
    readonly bp3_softbody_set_friction: (a: number, b: number) => void;
    readonly bp3_softbody_set_substeps: (a: number, b: number) => void;
    readonly bp3_softbody_step: (a: number, b: bigint) => number;
    readonly bp3_softbody_tet_block: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number) => number;
    readonly bp3_sphere_cast: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly bp3_sphere_cast_masked: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly bp3_state_hash: (a: number) => bigint;
    readonly bp3_step: (a: number, b: bigint) => number;
    readonly bp3_trimesh_count: (a: number) => number;
    readonly bp3_vehicle_add_wheel: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly bp3_vehicle_angular_suspension: (a: number) => number;
    readonly bp3_vehicle_create: (a: number) => number;
    readonly bp3_vehicle_destroy: (a: number) => void;
    readonly bp3_vehicle_set_angular_suspension: (a: number, b: number) => void;
    readonly bp3_vehicle_set_brake: (a: number, b: number) => void;
    readonly bp3_vehicle_set_drive: (a: number, b: number) => void;
    readonly bp3_vehicle_set_steer: (a: number, b: number, c: number) => void;
    readonly bp3_vehicle_set_wheel_grip: (a: number, b: number, c: number) => void;
    readonly bp3_vehicle_update: (a: number, b: number, c: bigint) => number;
    readonly bp3_vehicle_wheel_state: (a: number, b: number, c: number) => number;
    readonly bp3_world_create: (a: number, b: number, c: number) => number;
    readonly bp3_world_destroy: (a: number) => void;
    readonly bp3_world_diverged: (a: number) => number;
    readonly bp3_world_set_parallel: (a: number, b: number) => number;
    readonly bp3_world_set_solver_params: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly bp3_world_stats: (a: number, b: number) => number;
    readonly bp_add_box: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly bp_add_circle: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
    readonly bp_add_distance: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
    readonly bp_add_material: (a: number, b: number, c: number) => number;
    readonly bp_add_prismatic: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
    readonly bp_add_revolute: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly bp_add_weld: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly bp_artic3_angle: (a: number, b: number) => number;
    readonly bp_artic3_count: (a: number) => number;
    readonly bp_artic3_create_point: (a: number) => number;
    readonly bp_artic3_create_rod: (a: number) => number;
    readonly bp_artic3_destroy: (a: number) => void;
    readonly bp_artic3_set_angle: (a: number, b: number, c: number) => void;
    readonly bp_artic3_set_armature: (a: number, b: number, c: number) => void;
    readonly bp_artic3_set_axis: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly bp_artic3_set_torque: (a: number, b: number, c: number) => void;
    readonly bp_artic3_set_velocity: (a: number, b: number, c: number) => void;
    readonly bp_artic3_state_hash: (a: number) => bigint;
    readonly bp_artic3_step: (a: number, b: number) => void;
    readonly bp_artic_angle: (a: number, b: number) => number;
    readonly bp_artic_apply_pd: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly bp_artic_count: (a: number) => number;
    readonly bp_artic_create: (a: number) => number;
    readonly bp_artic_create_rod: (a: number) => number;
    readonly bp_artic_destroy: (a: number) => void;
    readonly bp_artic_positions: (a: number, b: number, c: number) => number;
    readonly bp_artic_set_angle: (a: number, b: number, c: number) => void;
    readonly bp_artic_set_armature: (a: number, b: number, c: number) => void;
    readonly bp_artic_set_limit: (a: number, b: number, c: number, d: number) => void;
    readonly bp_artic_set_torque: (a: number, b: number, c: number) => void;
    readonly bp_artic_set_velocity: (a: number, b: number, c: number) => void;
    readonly bp_artic_state_hash: (a: number) => bigint;
    readonly bp_artic_step: (a: number, b: number) => void;
    readonly bp_body_count: (a: number) => number;
    readonly bp_body_render_transform: (a: number, b: number, c: number, d: number) => number;
    readonly bp_body_set_collision: (a: number, b: number, c: number, d: number) => number;
    readonly bp_body_set_material: (a: number, b: number, c: number) => number;
    readonly bp_body_set_sensor: (a: number, b: number, c: number) => number;
    readonly bp_body_set_user_data: (a: number, b: number, c: bigint) => number;
    readonly bp_body_transform: (a: number, b: number, c: number) => number;
    readonly bp_body_transform_raw: (a: number, b: number, c: number) => number;
    readonly bp_body_user_data: (a: number, b: number) => bigint;
    readonly bp_capture_render_state: (a: number) => number;
    readonly bp_contact_event_count: (a: number) => number;
    readonly bp_get_contact_event: (a: number, b: number, c: number) => number;
    readonly bp_joint_set_limit: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly bp_joint_set_motor: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly bp_kin_create_planar3r: (a: number, b: number, c: number) => number;
    readonly bp_kin_create_puma560: () => number;
    readonly bp_kin_create_scara: (a: number, b: number, c: number) => number;
    readonly bp_kin_destroy: (a: number) => void;
    readonly bp_kin_dof: (a: number) => number;
    readonly bp_kin_end_effector: (a: number, b: number) => number;
    readonly bp_kin_get_joint: (a: number, b: number) => number;
    readonly bp_kin_ik_planar_2r: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly bp_kin_ik_position: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly bp_kin_set_joint: (a: number, b: number, c: number) => void;
    readonly bp_navbot_add_wall: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly bp_navbot_create: () => number;
    readonly bp_navbot_destroy: (a: number) => void;
    readonly bp_navbot_pose: (a: number, b: number) => number;
    readonly bp_navbot_reached: (a: number) => number;
    readonly bp_navbot_sensor_hits: (a: number, b: number, c: number) => number;
    readonly bp_navbot_set_goal: (a: number, b: number, c: number, d: number) => void;
    readonly bp_navbot_set_start: (a: number, b: number, c: number, d: number) => void;
    readonly bp_navbot_state_hash: (a: number) => bigint;
    readonly bp_navbot_step: (a: number, b: number) => void;
    readonly bp_raycast: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly bp_raycast_masked: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
    readonly bp_restore: (a: number, b: number, c: number) => number;
    readonly bp_set_bvh_broadphase: (a: number, b: number) => number;
    readonly bp_set_contact_events_enabled: (a: number, b: number) => number;
    readonly bp_set_linear_velocity: (a: number, b: number, c: number, d: number) => number;
    readonly bp_set_substeps: (a: number, b: number) => number;
    readonly bp_sim_version: () => number;
    readonly bp_snapshot: (a: number, b: number, c: number) => number;
    readonly bp_snapshot_size: (a: number) => number;
    readonly bp_state_hash: (a: number) => bigint;
    readonly bp_step: (a: number, b: bigint) => number;
    readonly bp_vehicle_add_wheel: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
    readonly bp_vehicle_create: (a: number) => number;
    readonly bp_vehicle_destroy: (a: number) => void;
    readonly bp_vehicle_set_drive: (a: number, b: number) => number;
    readonly bp_vehicle_update: (a: number, b: number, c: bigint) => number;
    readonly bp_vehicle_wheel_state: (a: number, b: number, c: number) => number;
    readonly bp_version: () => number;
    readonly bp_world_create: (a: number, b: number) => number;
    readonly bp_world_destroy: (a: number) => void;
    readonly bp_world_diverged: (a: number) => number;
    readonly bp_world_set_parallel: (a: number, b: number, c: number) => number;
    readonly bp_world_set_solver_params: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly bp_world_stats: (a: number, b: number) => number;
    readonly twin_advance: (a: number, b: bigint) => number;
    readonly twin_create: (a: bigint) => number;
    readonly twin_decide_oneshot: (a: number, b: number) => number;
    readonly twin_decision_count: (a: number) => bigint;
    readonly twin_destroy: (a: number) => void;
    readonly twin_entity_decision: (a: number, b: bigint, c: number) => number;
    readonly twin_now_ns: (a: number) => bigint;
    readonly twin_observe: (a: number, b: bigint, c: number, d: number, e: number, f: number, g: number) => number;
    readonly twin_state_hash: (a: number) => bigint;
    readonly twin_version: () => number;
    readonly sim_version: () => number;
    readonly bp_snapshot_format_version: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
