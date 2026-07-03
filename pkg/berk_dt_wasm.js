/* @ts-self-types="./berk_dt_wasm.d.ts" */

/**
 * Deterministik **kumaş (XPBD)** — JS sarmalayıcısı. `cols×rows` ızgara, üst kenar sabit;
 * `positions()` parçacık konumlarını render için verir.
 */
export class WasmCloth {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmClothFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmcloth_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get cols() {
        const ret = wasm.__wbg_get_wasmcloth_cols(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get rows() {
        const ret = wasm.__wbg_get_wasmcloth_rows(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set cols(arg0) {
        wasm.__wbg_set_wasmcloth_cols(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set rows(arg0) {
        wasm.__wbg_set_wasmcloth_rows(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} cx
     * @param {number} cy
     * @param {number} cz
     * @param {number} hx
     * @param {number} hy
     * @param {number} hz
     */
    add_box_collider(cx, cy, cz, hx, hy, hz) {
        wasm.wasmcloth_add_box_collider(this.__wbg_ptr, cx, cy, cz, hx, hy, hz);
    }
    /**
     * @param {number} y
     */
    add_ground(y) {
        wasm.wasmcloth_add_ground(this.__wbg_ptr, y);
    }
    /**
     * @returns {number}
     */
    count() {
        const ret = wasm.wasmcloth_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} cols
     * @param {number} rows
     * @param {number} spacing
     * @param {number} ox
     * @param {number} oy
     * @param {number} oz
     * @param {number} mass
     * @param {number} compliance
     * @param {number} gx
     * @param {number} gy
     * @param {number} gz
     */
    constructor(cols, rows, spacing, ox, oy, oz, mass, compliance, gx, gy, gz) {
        const ret = wasm.wasmcloth_new(cols, rows, spacing, ox, oy, oz, mass, compliance, gx, gy, gz);
        this.__wbg_ptr = ret;
        WasmClothFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Parçacık konumları (render): `count*3` f32 → `Float32Array`.
     * @returns {Float32Array}
     */
    positions() {
        const ret = wasm.wasmcloth_positions(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {number} dt
     */
    step(dt) {
        wasm.wasmcloth_step(this.__wbg_ptr, dt);
    }
}
if (Symbol.dispose) WasmCloth.prototype[Symbol.dispose] = WasmCloth.prototype.free;

/**
 * Deterministik **3B PBF akışkanı** — JS sarmalayıcısı (demo galerisi için). Kutu konteynerde
 * parçacık suyu; tüm matematik `Fx64` → tarayıcıda da bit-aynı.
 */
export class WasmFluid3 {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmFluid3Finalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmfluid3_free(ptr, 0);
    }
    /**
     * Parçacık ekle (dünya). Dönüş: indeks.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */
    add_particle(x, y, z) {
        const ret = wasm.wasmfluid3_add_particle(this.__wbg_ptr, x, y, z);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    count() {
        const ret = wasm.wasmfluid3_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Yeni akışkan: smoothing radius `h`, yerçekimi, kutu konteyner `[bmin,bmax]`.
     * @param {number} h
     * @param {number} gx
     * @param {number} gy
     * @param {number} gz
     * @param {number} bminx
     * @param {number} bminy
     * @param {number} bminz
     * @param {number} bmaxx
     * @param {number} bmaxy
     * @param {number} bmaxz
     */
    constructor(h, gx, gy, gz, bminx, bminy, bminz, bmaxx, bmaxy, bmaxz) {
        const ret = wasm.wasmfluid3_new(h, gx, gy, gz, bminx, bminy, bminz, bmaxx, bmaxy, bmaxz);
        this.__wbg_ptr = ret;
        WasmFluid3Finalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Parçacık konumları (render): `count*3` adet `f32` (x,y,z) → JS `Float32Array`.
     * @returns {Float32Array}
     */
    positions() {
        const ret = wasm.wasmfluid3_positions(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Tunable çözücü/malzeme parametreleri (tek çağrı). Varsayılanlar golden davranışı korur.
     * @param {number} rest_density
     * @param {number} pressure_stiffness
     * @param {number} cfm_eps
     * @param {number} sub_relaxation
     * @param {number} boundary_friction
     * @param {number} boundary_restitution
     * @param {number} max_velocity_factor
     * @param {number} particle_radius
     * @param {number} solver_iterations
     */
    set_params(rest_density, pressure_stiffness, cfm_eps, sub_relaxation, boundary_friction, boundary_restitution, max_velocity_factor, particle_radius, solver_iterations) {
        wasm.wasmfluid3_set_params(this.__wbg_ptr, rest_density, pressure_stiffness, cfm_eps, sub_relaxation, boundary_friction, boundary_restitution, max_velocity_factor, particle_radius, solver_iterations);
    }
    /**
     * İnce ayar: XSPH viskozite + kohezyon (0 = kapalı).
     * @param {number} viscosity
     * @param {number} cohesion
     */
    set_viscosity(viscosity, cohesion) {
        wasm.wasmfluid3_set_viscosity(this.__wbg_ptr, viscosity, cohesion);
    }
    /**
     * Çapraz-platform bit-aynı durum özeti (parçacık konum+hız bitlerinden).
     * @returns {string}
     */
    state_hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmfluid3_state_hash(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Sabit adım ilerlet (SABİT dt → determinizm).
     * @param {number} dt
     */
    step(dt) {
        wasm.wasmfluid3_step(this.__wbg_ptr, dt);
    }
}
if (Symbol.dispose) WasmFluid3.prototype[Symbol.dispose] = WasmFluid3.prototype.free;

/**
 * **"Üç Beyin" GPU determinizm demosu** — tarayıcıda (WASM), GPU kernel'lerinin birebir aynı
 * CPU yolunu (`gpu::pbf`) koşturur: deterministik sahne → grid → yoğunluk → λ. `fingerprint()`,
 * native CPU/GPU golden'ıyla **bit-aynı** çapraz-platform hash'tir (saf tamsayı; render dışında
 * f64 yok). Yani tarayıcı, GPU'nun ürettiği sonucu yeniden üretip eşleştirir.
 */
export class WasmGpuDemo {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmGpuDemoFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmgpudemo_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    count() {
        const ret = wasm.wasmgpudemo_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Parçacık yoğunlukları (renklendirme için; GPU kernel'iyle bit-aynı hesaplandı).
     * @returns {Float32Array}
     */
    densities() {
        const ret = wasm.wasmgpudemo_densities(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * **Çapraz-platform parmak-izi** (hex). Native CPU/GPU golden'ıyla bit-aynı olmalı.
     * @returns {string}
     */
    fingerprint() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmgpudemo_fingerprint(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} n
     */
    constructor(n) {
        const ret = wasm.wasmgpudemo_new(n);
        this.__wbg_ptr = ret;
        WasmGpuDemoFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Parçacık konumları (render): `count*3` f32 (x,y,z). Yalnız görsel — hash'e girmez.
     * @returns {Float32Array}
     */
    positions() {
        const ret = wasm.wasmgpudemo_positions(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
}
if (Symbol.dispose) WasmGpuDemo.prototype[Symbol.dispose] = WasmGpuDemo.prototype.free;

/**
 * **Deterministik granüler dünya (DEM)** — JS sarmalayıcısı. Toz/granül: kutuya dökülen taneler,
 * tane-tane temas (yay-sönüm + Coulomb sürtünme + kohezyon) + duvar. Tümü `Fx64` → tarayıcıda da
 * bit-aynı (`state_hash`). İlaç-tableti/madencilik tatlı-noktası demosu.
 */
export class WasmGrainWorld {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmGrainWorldFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmgrainworld_free(ptr, 0);
    }
    /**
     * Tane ekle (başlangıç hızı sıfır).
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    add_grain(x, y, z) {
        wasm.wasmgrainworld_add_grain(this.__wbg_ptr, x, y, z);
    }
    /**
     * Tane ekle, başlangıç hızıyla (kaptan/oluktan dökülen akış için).
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} vx
     * @param {number} vy
     * @param {number} vz
     */
    add_grain_v(x, y, z, vx, vy, vz) {
        wasm.wasmgrainworld_add_grain_v(this.__wbg_ptr, x, y, z, vx, vy, vz);
    }
    /**
     * @returns {number}
     */
    count() {
        const ret = wasm.wasmgrainworld_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} box_x
     * @param {number} box_y
     * @param {number} box_z
     * @param {number} radius
     * @param {number} gravity
     * @param {number} k_n
     * @param {number} c_n
     * @param {number} mu
     * @param {number} cohesion
     * @param {number} mass
     * @param {number} wall_c
     */
    constructor(box_x, box_y, box_z, radius, gravity, k_n, c_n, mu, cohesion, mass, wall_c) {
        const ret = wasm.wasmgrainworld_new(box_x, box_y, box_z, radius, gravity, k_n, c_n, mu, cohesion, mass, wall_c);
        this.__wbg_ptr = ret;
        WasmGrainWorldFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Tane konumları: `count*3` f32 (x,y,z).
     * @returns {Float32Array}
     */
    positions() {
        const ret = wasm.wasmgrainworld_positions(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    radius() {
        const ret = wasm.wasmgrainworld_radius(this.__wbg_ptr);
        return ret;
    }
    /**
     * Tane hız büyüklükleri (renklendirme için): `count` f32.
     * @returns {Float32Array}
     */
    speeds() {
        const ret = wasm.wasmgrainworld_speeds(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {string}
     */
    state_hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmgrainworld_state_hash(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} dt
     */
    step(dt) {
        wasm.wasmgrainworld_step(this.__wbg_ptr, dt);
    }
}
if (Symbol.dispose) WasmGrainWorld.prototype[Symbol.dispose] = WasmGrainWorld.prototype.free;

/**
 * **Robot labirent navigasyonu** — menzil sensörleriyle algıla→karar→hareket; yol deterministik.
 */
export class WasmNavBot {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmNavBotFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmnavbot_free(ptr, 0);
    }
    /**
     * Statik duvar ekle (xz merkez + yarı-genişlik; ışın yüksekliğini örter).
     * @param {number} cx
     * @param {number} cz
     * @param {number} hx
     * @param {number} hz
     */
    add_wall(cx, cz, hx, hz) {
        wasm.wasmnavbot_add_wall(this.__wbg_ptr, cx, cz, hx, hz);
    }
    /**
     * **LiDAR taraması (yatay yelpaze)** — robotun pozundan `rays` ışın, `fov` (radyan)
     * genişlikte; **BVH-hızlandırılmış** `Lidar3::scan` kullanır (üretimdeki sensör yolu).
     * Dönüş: her ışın için `[ex, ez, hit]` — uç-nokta (xz dünya) + isabet bayrağı (1=isabet,
     * 0=ıska). JS bunu robottan uç-noktaya çizgi olarak çizer (isabet/ıska renkli). Tarama
     * deterministiktir (sabit-nokta + bit-aynı raycast) → "deterministik algı" gösterimi.
     * @param {number} rays
     * @param {number} fov
     * @param {number} max_range
     * @returns {Float32Array}
     */
    lidar_scan(rays, fov, max_range) {
        const ret = wasm.wasmnavbot_lidar_scan(this.__wbg_ptr, rays, fov, max_range);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    constructor() {
        const ret = wasm.wasmnavbot_new();
        this.__wbg_ptr = ret;
        WasmNavBotFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * `[x, z, heading]`.
     * @returns {Float32Array}
     */
    pose() {
        const ret = wasm.wasmnavbot_pose(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {boolean}
     */
    reached() {
        const ret = wasm.wasmnavbot_reached(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Sensör isabet noktaları (xz): her sensör için `[hx, hz]`.
     * @returns {Float32Array}
     */
    sensor_hits() {
        const ret = wasm.wasmnavbot_sensor_hits(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {number} x
     * @param {number} z
     * @param {number} r
     */
    set_goal(x, z, r) {
        wasm.wasmnavbot_set_goal(this.__wbg_ptr, x, z, r);
    }
    /**
     * @param {number} x
     * @param {number} z
     * @param {number} heading
     */
    set_start(x, z, heading) {
        wasm.wasmnavbot_set_start(this.__wbg_ptr, x, z, heading);
    }
    /**
     * @returns {string}
     */
    state_hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmnavbot_state_hash(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} dt
     */
    step(dt) {
        wasm.wasmnavbot_step(this.__wbg_ptr, dt);
    }
}
if (Symbol.dispose) WasmNavBot.prototype[Symbol.dispose] = WasmNavBot.prototype.free;

/**
 * **Kaotik sarkaç** (Featherstone reduced-coordinate O(n) ABA) — determinizm vitrini.
 * Kaotik ama sabit-noktada (Fx64) bit-aynı/tekrar-üretilebilir.
 */
export class WasmPendulum {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmPendulumFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmpendulum_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    count() {
        const ret = wasm.wasmpendulum_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} n
     */
    constructor(n) {
        const ret = wasm.wasmpendulum_new(n);
        this.__wbg_ptr = ret;
        WasmPendulumFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Dünya (x,y) konumları: taban + her eklem (n+1 nokta), düz `[x0,y0,x1,y1,…]`.
     * @returns {Float32Array}
     */
    positions() {
        const ret = wasm.wasmpendulum_positions(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {number} i
     * @param {number} a
     */
    set_angle(i, a) {
        wasm.wasmpendulum_set_angle(this.__wbg_ptr, i, a);
    }
    /**
     * @returns {string}
     */
    state_hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmpendulum_state_hash(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} dt
     */
    step(dt) {
        wasm.wasmpendulum_step(this.__wbg_ptr, dt);
    }
}
if (Symbol.dispose) WasmPendulum.prototype[Symbol.dispose] = WasmPendulum.prototype.free;

/**
 * **Demo-senaryo runner** — paylaşılan deterministik manifest → 3B dünya. Üç motorun
 * (Unity/Unreal/WASM) referans WASM istemcisi bunu sürer; aynı çekirdek + aynı manifest →
 * bit-aynı `state_hash`. Bkz. `docs/DEMO_SHOWCASE_DESIGN.md`.
 */
export class WasmScenario {
    static __wrap(ptr) {
        const obj = Object.create(WasmScenario.prototype);
        obj.__wbg_ptr = ptr;
        WasmScenarioFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmScenarioFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmscenario_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    body_count() {
        const ret = wasm.wasmscenario_body_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    frame() {
        const ret = wasm.wasmscenario_frame(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * JSON manifestini yükle ve dünyayı sırayla kur. Hata → JS exception.
     * @param {string} json
     * @returns {WasmScenario}
     */
    static fromJson(json) {
        const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmscenario_fromJson(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return WasmScenario.__wrap(ret[0]);
    }
    /**
     * Manifestteki altın hash (yoksa boş string).
     * @returns {string}
     */
    golden_hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmscenario_golden_hash(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {boolean}
     */
    is_done() {
        const ret = wasm.wasmscenario_is_done(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {string}
     */
    name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmscenario_name(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Render dönüşümleri: gövde başına `[px,py,pz, qx,qy,qz,qw]` (7 f32), interpolasyonlu.
     * `alpha` ∈ [0,1] = (birikmiş süre / dt). Dizi, cisimler spawn oldukça büyür.
     * @param {number} alpha
     * @returns {Float32Array}
     */
    render_transforms(alpha) {
        const ret = wasm.wasmscenario_render_transforms(this.__wbg_ptr, alpha);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * `state_hash` (16 haneli onaltılık) — çapraz-motor karşılaştırma anahtarı.
     * @returns {string}
     */
    state_hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmscenario_state_hash(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Bir sabit adım ilerlet (güncel kareye ait olayları uygula + adımla).
     */
    step() {
        wasm.wasmscenario_step(this.__wbg_ptr);
    }
    /**
     * @returns {number}
     */
    total_frames() {
        const ret = wasm.wasmscenario_total_frames(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) WasmScenario.prototype[Symbol.dispose] = WasmScenario.prototype.free;

/**
 * Deterministik 2B fizik dünyası — JS sarmalayıcısı.
 */
export class WasmWorld {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmWorldFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmworld_free(ptr, 0);
    }
    /**
     * Kutu ekle (kind: 0=Static,1=Dynamic). Dönüş: cisim id.
     * @param {number} kind
     * @param {number} x
     * @param {number} y
     * @param {number} hx
     * @param {number} hy
     * @param {number} density
     * @returns {number}
     */
    add_box(kind, x, y, hx, hy, density) {
        const ret = wasm.wasmworld_add_box(this.__wbg_ptr, kind, x, y, hx, hy, density);
        return ret;
    }
    /**
     * Daire ekle. Dönüş: cisim id.
     * @param {number} kind
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {number} density
     * @returns {number}
     */
    add_circle(kind, x, y, radius, density) {
        const ret = wasm.wasmworld_add_circle(this.__wbg_ptr, kind, x, y, radius, density);
        return ret;
    }
    /**
     * @param {number} id
     * @returns {number}
     */
    body_angle(id) {
        const ret = wasm.wasmworld_body_angle(this.__wbg_ptr, id);
        return ret;
    }
    /**
     * @returns {number}
     */
    body_count() {
        const ret = wasm.wasmworld_body_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} id
     * @returns {number}
     */
    body_x(id) {
        const ret = wasm.wasmworld_body_x(this.__wbg_ptr, id);
        return ret;
    }
    /**
     * @param {number} id
     * @returns {number}
     */
    body_y(id) {
        const ret = wasm.wasmworld_body_y(this.__wbg_ptr, id);
        return ret;
    }
    /**
     * Yeni dünya (yerçekimi m/s²).
     * @param {number} grav_x
     * @param {number} grav_y
     */
    constructor(grav_x, grav_y) {
        const ret = wasm.wasmworld_new(grav_x, grav_y);
        this.__wbg_ptr = ret;
        WasmWorldFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Çapraz-platform bit-aynı durum özeti (onaltılık; JS u64 taşıyamadığı için String).
     * @returns {string}
     */
    state_hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmworld_state_hash(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Sabit adım ilerlet (SABİT dt kullanın → determinizm).
     * @param {number} dt
     */
    step(dt) {
        wasm.wasmworld_step(this.__wbg_ptr, dt);
    }
}
if (Symbol.dispose) WasmWorld.prototype[Symbol.dispose] = WasmWorld.prototype.free;

/**
 * Deterministik **3B rijit dünya** — JS sarmalayıcısı (demo galerisi). Kutu/küre/kapsül/
 * dışbükey/bileşik/heightfield + batmazlık + CCD. `transforms()` her cismin konum+quaternion'ını
 * render için verir.
 */
export class WasmWorld3 {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmWorld3Finalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmworld3_free(ptr, 0);
    }
    /**
     * Kutu ekle (kind 0=statik, 1=dinamik). Dönüş: cisim id.
     * @param {number} kind
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} hx
     * @param {number} hy
     * @param {number} hz
     * @param {number} density
     * @returns {number}
     */
    add_box(kind, x, y, z, hx, hy, hz, density) {
        const ret = wasm.wasmworld3_add_box(this.__wbg_ptr, kind, x, y, z, hx, hy, hz, density);
        return ret;
    }
    /**
     * @param {number} kind
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} r
     * @param {number} half_h
     * @param {number} density
     * @returns {number}
     */
    add_capsule(kind, x, y, z, r, half_h, density) {
        const ret = wasm.wasmworld3_add_capsule(this.__wbg_ptr, kind, x, y, z, r, half_h, density);
        return ret;
    }
    /**
     * Bileşik (compound) gövde, yalnız kutu parçalardan. `parts` = parça başına 6 f32:
     * (yerel x,y,z, yarı hx,hy,hz). Kimlik rotasyon. Dönüş: cisim id.
     * @param {Float32Array} parts
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} density
     * @returns {number}
     */
    add_compound_boxes(parts, x, y, z, density) {
        const ptr0 = passArrayF32ToWasm0(parts, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmworld3_add_compound_boxes(this.__wbg_ptr, ptr0, len0, x, y, z, density);
        return ret;
    }
    /**
     * Dışbükey gövde (köşe bulutu, `verts` = n*3 f32). kind 0=statik,1=dinamik.
     * @param {number} kind
     * @param {Float32Array} verts
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} density
     * @returns {number}
     */
    add_convex(kind, verts, x, y, z, density) {
        const ptr0 = passArrayF32ToWasm0(verts, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmworld3_add_convex(this.__wbg_ptr, kind, ptr0, len0, x, y, z, density);
        return ret;
    }
    /**
     * Heightfield (terrain) collider. `heights` = rows*cols f32 (satır-major).
     * @param {number} rows
     * @param {number} cols
     * @param {number} cell
     * @param {number} ox
     * @param {number} oy
     * @param {number} oz
     * @param {Float32Array} heights
     * @returns {number}
     */
    add_heightfield(rows, cols, cell, ox, oy, oz, heights) {
        const ptr0 = passArrayF32ToWasm0(heights, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmworld3_add_heightfield(this.__wbg_ptr, rows, cols, cell, ox, oy, oz, ptr0, len0);
        return ret;
    }
    /**
     * @param {number} kind
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} r
     * @param {number} density
     * @returns {number}
     */
    add_sphere(kind, x, y, z, r, density) {
        const ret = wasm.wasmworld3_add_sphere(this.__wbg_ptr, kind, x, y, z, r, density);
        return ret;
    }
    /**
     * @returns {number}
     */
    body_count() {
        const ret = wasm.wasmworld3_body_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Deterministik LiDAR taraması: poz (origin + forward/up), azimut×elevasyon ızgarası,
     * menzil. İsabet noktalarını düz `[x,y,z, …]` döndürür (nokta bulutu render'ı).
     * @param {number} ox
     * @param {number} oy
     * @param {number} oz
     * @param {number} fwx
     * @param {number} fwy
     * @param {number} fwz
     * @param {number} upx
     * @param {number} upy
     * @param {number} upz
     * @param {number} az_count
     * @param {number} el_count
     * @param {number} az_fov
     * @param {number} el_fov
     * @param {number} max_range
     * @returns {Float32Array}
     */
    lidar_points(ox, oy, oz, fwx, fwy, fwz, upx, upy, upz, az_count, el_count, az_fov, el_fov, max_range) {
        const ret = wasm.wasmworld3_lidar_points(this.__wbg_ptr, ox, oy, oz, fwx, fwy, fwz, upx, upy, upz, az_count, el_count, az_fov, el_fov, max_range);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {number} gx
     * @param {number} gy
     * @param {number} gz
     */
    constructor(gx, gy, gz) {
        const ret = wasm.wasmworld3_new(gx, gy, gz);
        this.__wbg_ptr = ret;
        WasmWorld3Finalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} id
     * @param {boolean} on
     */
    set_ccd(id, on) {
        wasm.wasmworld3_set_ccd(this.__wbg_ptr, id, on);
    }
    /**
     * @param {number} id
     * @param {number} vx
     * @param {number} vy
     * @param {number} vz
     */
    set_linvel(id, vx, vy, vz) {
        wasm.wasmworld3_set_linvel(this.__wbg_ptr, id, vx, vy, vz);
    }
    /**
     * Batmazlık (buoyancy): `level` altındaki dinamik gövdeler yüzer (yoğunluk < `density`).
     * @param {boolean} enabled
     * @param {number} level
     * @param {number} density
     * @param {number} lin_drag
     * @param {number} ang_drag
     */
    set_water(enabled, level, density, lin_drag, ang_drag) {
        wasm.wasmworld3_set_water(this.__wbg_ptr, enabled, level, density, lin_drag, ang_drag);
    }
    /**
     * @returns {string}
     */
    state_hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmworld3_state_hash(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} dt
     */
    step(dt) {
        wasm.wasmworld3_step(this.__wbg_ptr, dt);
    }
    /**
     * Tüm cisimlerin konum+quaternion'ı (render): cisim başına 7 f32 (px,py,pz, qx,qy,qz,qw).
     * @returns {Float32Array}
     */
    transforms() {
        const ret = wasm.wasmworld3_transforms(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
}
if (Symbol.dispose) WasmWorld3.prototype[Symbol.dispose] = WasmWorld3.prototype.free;

/**
 * Determinizm epoğu (SIM_VERSION) — golden/replay uyumluluk sürümü. İstemci, sunucuyla
 * aynı epokta olduğunu bununla doğrular (bkz. `docs/CONFORMANCE.md`).
 * @returns {number}
 */
export function sim_version() {
    const ret = wasm.sim_version();
    return ret >>> 0;
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_throw_ea4887a5f8f9a9db: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./berk_dt_wasm_bg.js": import0,
    };
}

const WasmClothFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmcloth_free(ptr, 1));
const WasmFluid3Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmfluid3_free(ptr, 1));
const WasmGpuDemoFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmgpudemo_free(ptr, 1));
const WasmGrainWorldFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmgrainworld_free(ptr, 1));
const WasmNavBotFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmnavbot_free(ptr, 1));
const WasmPendulumFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmpendulum_free(ptr, 1));
const WasmScenarioFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmscenario_free(ptr, 1));
const WasmWorldFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmworld_free(ptr, 1));
const WasmWorld3Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmworld3_free(ptr, 1));

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedFloat32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('berk_dt_wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
