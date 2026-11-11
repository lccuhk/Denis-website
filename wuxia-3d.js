/* ============================================================
   侠客江湖 · 沉浸式水墨 3D 场景  wuxia-3d.js
   Three.js (module / CDN importmap)
   元素：远山层峦 · 明月 · 流云雾霭 · 金色游尘 · 悬浮飞剑
   交互：鼠标视差 + 滚动运镜；离开首屏/切换标签页自动暂停
   ============================================================ */
import * as THREE from 'three';

(function () {
    'use strict';

    const container = document.getElementById('scene-container');
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- WebGL 能力检测 ----------
    function webglAvailable() {
        try {
            const c = document.createElement('canvas');
            return !!(window.WebGLRenderingContext &&
                (c.getContext('webgl') || c.getContext('experimental-webgl')));
        } catch (e) { return false; }
    }
    if (!webglAvailable()) {
        document.body.classList.add('no-webgl');
        container.classList.add('scene-fallback');
        return;
    }

    // ---------- 基础 ----------
    const INK = 0x0d0805;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(INK, 14, 58);

    const viewW = () => Math.max(1, window.innerWidth || 1);
    const viewH = () => Math.max(1, window.innerHeight || 1);

    const camera = new THREE.PerspectiveCamera(55, viewW() / viewH(), 0.1, 200);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(viewW(), viewH());
    renderer.setClearColor(INK, 1);
    container.appendChild(renderer.domElement);

    // 灯光（仅作用于飞剑）
    scene.add(new THREE.AmbientLight(0x8a7a60, 0.7));
    const moonLight = new THREE.DirectionalLight(0xbfd0ff, 0.9);
    moonLight.position.set(-6, 10, -6);
    scene.add(moonLight);
    const warm = new THREE.PointLight(0xd9a94e, 1.1, 30);
    warm.position.set(4, 1, 4);
    scene.add(warm);

    // ---------- 远山层峦 ----------
    function makeRidge(opts) {
        const { color, z, baseY, amp, peaks, opacity, seed } = opts;
        const shape = new THREE.Shape();
        const W = 70, step = 1.2;
        shape.moveTo(-W, -12);
        for (let x = -W; x <= W; x += step) {
            const t = (x + W) / (W * 2);
            let y = baseY;
            for (let p = 0; p < peaks.length; p++) {
                const pk = peaks[p];
                const dx = (t - pk.c) * pk.w;
                y += pk.h * Math.exp(-dx * dx);
            }
            y += Math.sin(x * 0.6 + seed) * amp * 0.4 + Math.sin(x * 1.7 + seed * 2) * amp * 0.18;
            shape.lineTo(x, y);
        }
        shape.lineTo(W, -12);
        shape.lineTo(-W, -12);
        const geo = new THREE.ShapeGeometry(shape);
        const mat = new THREE.MeshBasicMaterial({
            color, transparent: true, opacity, fog: true, depthWrite: false
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.z = z;
        mesh.userData.parallax = opts.parallax || 0;
        return mesh;
    }

    const ridges = [
        makeRidge({ color: 0x2a2030, z: -46, baseY: -7.5, amp: 1.6, opacity: 0.55, seed: 1.1, parallax: 0.10,
            peaks: [{ c: .2, w: 3, h: 9 }, { c: .72, w: 4, h: 7 }, { c: .5, w: 6, h: 5 }] }),
        makeRidge({ color: 0x241a24, z: -36, baseY: -8.5, amp: 1.4, opacity: 0.72, seed: 4.3, parallax: 0.18,
            peaks: [{ c: .32, w: 4, h: 8 }, { c: .85, w: 3, h: 9.5 }, { c: .6, w: 5, h: 4.5 }] }),
        makeRidge({ color: 0x1c1318, z: -27, baseY: -9.5, amp: 1.2, opacity: 0.88, seed: 7.7, parallax: 0.28,
            peaks: [{ c: .12, w: 3, h: 7 }, { c: .55, w: 3.5, h: 10 }, { c: .9, w: 4, h: 6 }] }),
        makeRidge({ color: 0x150d10, z: -19, baseY: -10.5, amp: 1.0, opacity: 1, seed: 2.9, parallax: 0.4,
            peaks: [{ c: .4, w: 3, h: 8.5 }, { c: .74, w: 3, h: 7 }, { c: .05, w: 4, h: 5.5 }] })
    ];
    ridges.forEach(r => scene.add(r));

    // ---------- 明月 ----------
    function glowTexture() {
        const cv = document.createElement('canvas');
        cv.width = cv.height = 256;
        const ctx = cv.getContext('2d');
        const g = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
        g.addColorStop(0, 'rgba(245,238,214,1)');
        g.addColorStop(0.25, 'rgba(238,225,190,0.9)');
        g.addColorStop(0.5, 'rgba(214,196,150,0.28)');
        g.addColorStop(1, 'rgba(214,196,150,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 256, 256);
        return new THREE.CanvasTexture(cv);
    }
    const moon = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTexture(), transparent: true, depthWrite: false, fog: false
    }));
    moon.scale.set(20, 20, 1);
    moon.position.set(-9, 7.5, -42);
    moon.userData.baseX = -9;
    scene.add(moon);

    // ---------- 流云雾霭 ----------
    function mistTexture() {
        const cv = document.createElement('canvas');
        cv.width = 512; cv.height = 128;
        const ctx = cv.getContext('2d');
        for (let i = 0; i < 26; i++) {
            const x = Math.random() * 512, y = 40 + Math.random() * 48, r = 40 + Math.random() * 90;
            const g = ctx.createRadialGradient(x, y, 0, x, y, r);
            g.addColorStop(0, 'rgba(214,202,178,0.16)');
            g.addColorStop(1, 'rgba(214,202,178,0)');
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
        }
        return new THREE.CanvasTexture(cv);
    }
    const mists = [];
    for (let i = 0; i < 5; i++) {
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({
            map: mistTexture(), transparent: true, depthWrite: false, opacity: 0.9, fog: false
        }));
        sp.scale.set(26 + Math.random() * 18, 6 + Math.random() * 3, 1);
        sp.position.set(-30 + i * 14 + Math.random() * 6, -3.4 - i * 0.9, -20 - i * 5);
        sp.userData.speed = 0.12 + Math.random() * 0.18;
        scene.add(sp);
        mists.push(sp);
    }

    // ---------- 金色游尘 ----------
    const DUST_N = reduceMotion ? 140 : 460;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(DUST_N * 3);
    const dustBase = new Float32Array(DUST_N * 3);
    const dustPhase = new Float32Array(DUST_N);
    for (let i = 0; i < DUST_N; i++) {
        const x = (Math.random() - 0.5) * 34;
        const y = (Math.random() - 0.5) * 18;
        const z = -12 + Math.random() * 20;
        dustPos[i * 3] = dustBase[i * 3] = x;
        dustPos[i * 3 + 1] = dustBase[i * 3 + 1] = y;
        dustPos[i * 3 + 2] = dustBase[i * 3 + 2] = z;
        dustPhase[i] = Math.random() * Math.PI * 2;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
        color: 0xd9b76a, size: 0.075, transparent: true, opacity: 0.8,
        blending: THREE.AdditiveBlending, depthWrite: false, fog: true, sizeAttenuation: true
    }));
    scene.add(dust);

    // ---------- 悬浮飞剑 ----------
    function buildSword() {
        const g = new THREE.Group();
        const steel = new THREE.MeshStandardMaterial({ color: 0xcfd6e0, metalness: 0.92, roughness: 0.28 });
        const gold = new THREE.MeshStandardMaterial({ color: 0xc4a35a, metalness: 0.85, roughness: 0.35 });
        const red = new THREE.MeshStandardMaterial({ color: 0x7c1d18, metalness: 0.3, roughness: 0.6 });

        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.085, 3.1, 0.02), steel);
        blade.position.y = 1.75;
        g.add(blade);
        const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.02, 3.0, 0.024), new THREE.MeshStandardMaterial({ color: 0xeef2f7, metalness: .9, roughness: .2 }));
        ridge.position.y = 1.78;
        g.add(ridge);
        const tip = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.34, 4), steel);
        tip.position.y = 3.45; tip.rotation.y = Math.PI / 4;
        g.add(tip);
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.1, 0.12), gold);
        guard.position.y = 0.12;
        g.add(guard);
        const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.62, 12), red);
        grip.position.y = -0.24;
        g.add(grip);
        const pommel = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 14), gold);
        pommel.position.y = -0.6;
        g.add(pommel);
        // 剑穗
        for (let i = 0; i < 3; i++) {
            const tassel = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.7, 6), red);
            tassel.position.set((i - 1) * 0.03, -1.0, 0);
            tassel.rotation.z = (i - 1) * 0.12;
            g.add(tassel);
        }
        return g;
    }
    const sword = buildSword();
    const swordBase = { x: 4.4, y: -0.3, z: -3, rz: -0.62, ry: 0.3 };
    sword.position.set(swordBase.x, swordBase.y, swordBase.z);
    sword.rotation.set(0.2, swordBase.ry, swordBase.rz);
    scene.add(sword);

    // ---------- 交互状态 ----------
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    window.addEventListener('pointermove', (e) => {
        mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    let scrollProg = 0;
    function onScroll() {
        const h = Math.max(1, window.innerHeight || 1);
        scrollProg = Math.min(1, Math.max(0, window.scrollY / h));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function onResize() {
        camera.aspect = viewW() / viewH();
        camera.updateProjectionMatrix();
        renderer.setSize(viewW(), viewH());
    }
    window.addEventListener('resize', onResize);

    // ---------- 可见性：离开首屏或切标签时暂停，省 GPU ----------
    const clock = new THREE.Clock();
    let active = true;
    // 容器为 fixed 常驻视口，故以首屏 #hero 作为可见性依据：离开首屏即暂停省 GPU
    const viewportProbe = document.getElementById('hero') || container;
    const io = new IntersectionObserver((entries) => {
        active = entries[0].isIntersecting;
        if (active) clock.start();
    }, { threshold: 0.02 });
    io.observe(viewportProbe);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) active = false;
        else { active = true; clock.start(); }
    });

    // 页面卸载时释放上下文
    window.addEventListener('pagehide', () => {
        renderer.dispose();
        scene.traverse(o => {
            if (o.geometry) o.geometry.dispose();
            if (o.material) { (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => m.dispose()); }
        });
    });

    // ---------- 主循环 ----------
    function animate() {
        requestAnimationFrame(animate);
        if (!active) return;
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;

        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;

        // 滚动运镜：推远 + 抬升
        camera.position.z = 10 + scrollProg * 5.5;
        camera.position.y = scrollProg * 2.6;
        camera.position.x += (mouse.x * 1.1 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 0.6 - (camera.position.y - scrollProg * 2.6)) * 0.05;
        camera.lookAt(mouse.x * 0.6, 1.2 - scrollProg, -16);

        // 远山视差
        ridges.forEach(r => {
            r.position.x = mouse.x * r.userData.parallax * -3;
        });
        moon.position.x = moon.userData.baseX + mouse.x * 0.5;

        // 雾霭漂移
        mists.forEach(m => {
            m.position.x += m.userData.speed * dt;
            if (m.position.x > 36) m.position.x = -36;
        });

        // 游尘上浮 + 摆动
        const arr = dustGeo.attributes.position.array;
        for (let i = 0; i < DUST_N; i++) {
            const ph = dustPhase[i];
            arr[i * 3] = dustBase[i * 3] + Math.sin(t * 0.4 + ph) * 0.35;
            arr[i * 3 + 1] = dustBase[i * 3 + 1] + ((t * 0.25 + ph * 0.3) % 2.2);
            if (arr[i * 3 + 1] - dustBase[i * 3 + 1] > 2.2) arr[i * 3 + 1] -= 2.2;
        }
        dustGeo.attributes.position.needsUpdate = true;
        dust.rotation.y = mouse.x * 0.04;

        // 飞剑：缓慢自转、悬浮、鼠标牵引
        sword.rotation.y = swordBase.ry + t * 0.35 + mouse.x * 0.25;
        sword.rotation.x = 0.2 + Math.sin(t * 0.5) * 0.05 - mouse.ty * 0.12;
        sword.position.y = swordBase.y + Math.sin(t * 0.8) * 0.22 - scrollProg * 1.2;
        sword.position.x = swordBase.x + mouse.x * 0.6 - scrollProg * 1.5;

        renderer.render(scene, camera);
    }
    animate();
})();
