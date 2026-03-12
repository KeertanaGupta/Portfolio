/* ============================================= */
/* Keertana Gupta — Portfolio                     */
/* Letter-by-letter Loader                        */
/* Auto-transitioning Hero                        */
/* Cinematic Scroll-driven Projects Gallery       */
/* ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  runLoaderSequence();

  // ── LOADER ─────────────────────────────────────
  function runLoaderSequence() {
    const loader      = document.getElementById('loader');
    const loaderSVG   = document.querySelector('.loader__svg');
    const mainContent = document.getElementById('main-content');

    const hLines    = document.querySelectorAll('.construct-line.h-line');
    const vLines    = document.querySelectorAll('.construct-line.v-guide');
    const diagLines = document.querySelectorAll('.construct-line.diag');
    const circles   = document.querySelectorAll('.construct-circle');
    const dots      = document.querySelectorAll('.construct-dot');
    const letters   = document.querySelectorAll('.loader__letter');

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loader, {
          opacity: 0, duration: 0.6, ease: 'power2.inOut',
          onComplete: () => {
            loader.style.display = 'none';
            gsap.set(mainContent, { opacity: 1 });
            runHeroCinematic();
            setupProjectsGallery();
            setupEducationTimeline();
            setupScrollAnimations();
          }
        });
      }
    });

    tl.to(loaderSVG, { opacity: 1, duration: 0.15 });
    tl.to(hLines, { strokeDashoffset: 0, duration: 0.5, stagger: 0.06, ease: 'power2.inOut' });
    tl.to(vLines, { strokeDashoffset: 0, duration: 0.35, stagger: 0.03, ease: 'power2.inOut' }, '-=0.25');
    tl.to(circles, { strokeDashoffset: 0, duration: 0.5, stagger: 0.08, ease: 'power2.inOut' }, '-=0.2');
    tl.to(diagLines, { strokeDashoffset: 0, duration: 0.35, stagger: 0.04, ease: 'power2.inOut' }, '-=0.25');
    tl.to(dots, { opacity: 1, duration: 0.1, stagger: 0.03, ease: 'power2.out' }, '-=0.15');
    tl.to(letters, { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.08, ease: 'back.out(1.5)' }, '-=0.1');
    tl.to({}, { duration: 0.5 });
    tl.to(loaderSVG, { opacity: 0.15, duration: 0.3, ease: 'power2.inOut' });
    tl.to(letters, { scale: 1.04, duration: 0.25, ease: 'power2.inOut' }, '-=0.3');
    tl.to(letters, { scale: 1, duration: 0.2, ease: 'power2.out' });
  }

  // ── HERO CINEMATIC ─────────────────────────────
  function runHeroCinematic() {
    const persistentName = document.getElementById('persistent-name');
    const sub1 = document.getElementById('sub-1');
    const sub2 = document.getElementById('sub-2');
    const sub3 = document.getElementById('sub-3');
    const sideLeft  = document.getElementById('hero-side-left');
    const sideRight = document.getElementById('hero-side-right');
    const bottom    = document.querySelector('.hero__bottom');
    const scrollCue = document.getElementById('scroll-cue');

    const tl = gsap.timeline();

    tl.from(persistentName, { y: '120%', duration: 0.9, ease: 'power3.out' });
    tl.from(sub1.querySelector('.hero__giant-text'), { y: '120%', duration: 0.8, ease: 'power3.out' }, '-=0.5');
    tl.to(sideLeft, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3');
    tl.to(sideRight, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.4');
    tl.to(bottom, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3');
    tl.to({}, { duration: 1.8 });
    tl.to(sub1, { x: '-100vw', opacity: 0, duration: 0.9, ease: 'power3.inOut' });
    tl.to(persistentName, { x: -20, duration: 0.4, ease: 'power2.inOut' }, '-=0.7');
    tl.to(persistentName, { x: 0, duration: 0.4, ease: 'power2.out' });
    tl.to(sub2, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.7');
    tl.to({}, { duration: 1.8 });
    tl.to(sub2, { y: '-100vh', opacity: 0, duration: 0.9, ease: 'power3.inOut' });
    tl.to(persistentName, { y: -15, duration: 0.3, ease: 'power2.inOut' }, '-=0.7');
    tl.to(persistentName, { y: 0, duration: 0.3, ease: 'power2.out' });
    tl.to(sub3, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.6');
    tl.to({}, { duration: 0.5 });
    tl.to(scrollCue, { opacity: 1, duration: 0.5, ease: 'power2.out' });

    gsap.to(['.hero__persistent', '.hero__subtitle-stage', '.hero__side', '.hero__bottom'], {
      scrollTrigger: { trigger: '.hero', start: '10% top', end: '60% top', scrub: 1 },
      y: -80, opacity: 0, ease: 'none'
    });
    gsap.to('#scroll-cue', {
      scrollTrigger: { trigger: '.hero', start: '5% top', end: '20% top', scrub: true },
      opacity: 0, y: 15
    });
  }

  // ── PROJECTS GALLERY — Single master timeline ──
  function setupProjectsGallery() {
    const gallery = document.querySelector('.projects-gallery');
    const inner   = document.getElementById('projects-inner');
    const scenes  = gsap.utils.toArray('.pscene');
    const total   = scenes.length;

    if (!gallery || total === 0) return;

    // Set initial state: first scene visible, rest hidden
    gsap.set(scenes[0], { opacity: 1, zIndex: 10 });
    scenes.forEach((scene, i) => {
      if (i > 0) {
        gsap.set(scene, { opacity: 0, zIndex: 1 });
      }
      // Set initial card position
      const cardWrap = scene.querySelector('.pscene__card-wrap');
      const details  = scene.querySelector('.pscene__details');
      const bgText   = scene.querySelector('.pscene__bg-text');

      if (i === 0) {
        // First scene starts already visible
        gsap.set(bgText, { opacity: 1 });
      }
    });

    // Master timeline — scrubbed by scroll
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: gallery,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: inner,
        anticipatePin: 1
      }
    });

    // === FIRST SCENE ENTRANCE ===
    const firstCard    = scenes[0].querySelector('.pscene__card-wrap');
    const firstBg      = scenes[0].querySelector('.pscene__bg-text');
    const firstDetails = scenes[0].querySelector('.pscene__details');

    // Entrance of first scene (card slides in)
    master.fromTo(firstCard,
      { x: 400, rotateY: -30, opacity: 0 },
      { x: 0, rotateY: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      0
    );
    master.fromTo(firstBg,
      { x: 200 },
      { x: 0, duration: 1, ease: 'power2.out' },
      0
    );
    if (firstDetails) {
      const firstDetailEls = firstDetails.children;
      master.fromTo(firstDetailEls,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.6 },
        0.3
      );
    }

    // Hold first scene
    master.to({}, { duration: 0.5 });

    // === TRANSITIONS BETWEEN SCENES ===
    for (let i = 0; i < total - 1; i++) {
      const current     = scenes[i];
      const next        = scenes[i + 1];
      const curCard     = current.querySelector('.pscene__card-wrap');
      const curBg       = current.querySelector('.pscene__bg-text');
      const curDetails  = current.querySelector('.pscene__details');
      const nextCard    = next.querySelector('.pscene__card-wrap');
      const nextBg      = next.querySelector('.pscene__bg-text');
      const nextDetails = next.querySelector('.pscene__details');

      const transitionLabel = `trans${i}`;
      master.addLabel(transitionLabel);

      // --- EXIT current scene ---
      // Card flies out to the left + rotates
      master.to(curCard, {
        x: -400, rotateY: 25, opacity: 0, duration: 1, ease: 'power2.in'
      }, transitionLabel);

      // Background text drifts left
      master.to(curBg, {
        x: -300, opacity: 0, duration: 0.8, ease: 'power2.in'
      }, transitionLabel);

      // Details fade out
      if (curDetails) {
        master.to(curDetails.children, {
          y: -30, opacity: 0, stagger: 0.03, duration: 0.5
        }, transitionLabel);
      }

      // Current scene fades out
      master.to(current, {
        opacity: 0, duration: 0.8, ease: 'power1.inOut'
      }, `${transitionLabel}+=0.2`);

      // --- ENTER next scene ---
      // Next scene fades in
      master.set(next, { zIndex: 10 }, `${transitionLabel}+=0.4`);
      master.to(next, {
        opacity: 1, duration: 0.6, ease: 'power1.inOut'
      }, `${transitionLabel}+=0.4`);

      // Next card slides in from right
      master.fromTo(nextCard,
        { x: 500, rotateY: -30, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
        `${transitionLabel}+=0.5`
      );

      // Next background text slides in
      master.fromTo(nextBg,
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        `${transitionLabel}+=0.4`
      );

      // Next details stagger in
      if (nextDetails) {
        master.fromTo(nextDetails.children,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: 'power2.out' },
          `${transitionLabel}+=0.7`
        );
      }

      // Hold this scene
      master.to({}, { duration: 0.4 });
    }

    // === SUBTLE PARALLAX on each scene's bg text ===
    scenes.forEach((scene) => {
      const bgText = scene.querySelector('.pscene__bg-text');
      if (bgText) {
        gsap.to(bgText, {
          scrollTrigger: {
            trigger: gallery,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 3
          },
          y: -120,
          ease: 'none'
        });
      }
    });
  }

  // ── EDUCATION TIMELINE ────────────────────────
  function setupEducationTimeline() {
    const timeline = document.querySelector('.edu-timeline-new');
    const track = document.getElementById('edu-track');
    const progress = document.getElementById('edu-progress');
    const glowingNode = document.getElementById('edu-moving-node');
    const rows = document.querySelectorAll('.edu-row');
    if (!timeline || rows.length === 0) return;

    // Timeline progress & moving glowing node scrub
    if (track && progress && glowingNode) {
      ScrollTrigger.create({
        trigger: timeline,
        start: 'top 60%',    
        end: 'bottom 60%',   
        scrub: 1,            // smooth scrubbing
        onUpdate: (self) => {
          // Fill progress bar 
          progress.style.height = (self.progress * 100) + '%';
          // Move the glowing node down along the track
          glowingNode.style.top = (self.progress * 100) + '%';
          
          // Fade node in when scrolling starts, fade out at very end
          if (self.progress > 0.02 && self.progress < 0.98) {
            glowingNode.style.opacity = 1;
          } else {
            glowingNode.style.opacity = 0;
          }
        }
      });
    }

    // Animate each row 
    rows.forEach((row) => {
      ScrollTrigger.create({
        trigger: row,
        start: 'top 60%', // Trigger right when the glowing node passing matches viewport
        toggleActions: 'play none none reverse',
        onEnter: () => row.classList.add('is-active'),
        onLeaveBack: () => row.classList.remove('is-active')
      });
    });

    // Heading entrance
    const heading = document.querySelector('.education-journey__heading');
    if (heading) {
      gsap.from(heading, {
        scrollTrigger: { trigger: heading, start: 'top 85%', toggleActions: 'play none none reverse' },
        y: 50, opacity: 0, scale: 0.96, duration: 0.9, ease: 'power3.out'
      });
    }

    // ── CERTIFICATIONS VELOCITY SCROLL ─────────────
    const row1Inner = document.querySelector('.certs-row--1 .certs-marquee__inner');
    const row2Inner = document.querySelector('.certs-row--2 .certs-marquee__inner');
    const textInner = document.querySelector('.cert-velocity__inner');
    
    if (row1Inner && row2Inner && textInner) {
      const group1 = row1Inner.querySelector('.certs-marquee__group');
      const group2 = row2Inner.querySelector('.certs-marquee__group');
      const groupText = textInner.querySelector('.cert-velocity__group');

      let x1 = 0;
      let x2 = 0;
      let xText = 0;
      let scrollVelocity = 0;
      let smoothVelocity = 0;

      // Track scroll velocity 
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          scrollVelocity = self.getVelocity();
        }
      });

      const wrap = (val, max) => {
        while (val > 0) val -= max;
        while (val < -max) val += max;
        return val;
      };

      const GAP = 32;

      // Directions: (1 = right, -1 = left)
      let dir1 = 1;   // Row 1: moves right
      let dir2 = -1;  // Row 2: moves left
      let dirText = 1; // Text: moves right

      let max1 = 0, max2 = 0, maxText = 0;
      
      const updateWidths = () => {
        max1 = group1.offsetWidth + GAP;
        max2 = group2.offsetWidth + GAP;
        maxText = groupText.offsetWidth + GAP;
        
        if (dir1 > 0 && x1 === 0) x1 = -max1;
        if (dirText > 0 && xText === 0) xText = -maxText;
      };

      updateWidths();
      window.addEventListener('resize', updateWidths);

      gsap.ticker.add((time, deltaTime, frame) => {
        // Smooth out the velocity reading
        smoothVelocity += (scrollVelocity - smoothVelocity) * 0.1;
        scrollVelocity *= 0.9; // decay native velocity rapidly

        let baseSpeed = 1.0; 
        
        let scrollFactor = smoothVelocity / 1500; 
        
        // Add scroll delta to the base speed
        let currentFactor = 1 + Math.abs(scrollFactor) * 5; 

        let move1 = dir1 * baseSpeed * currentFactor * (deltaTime / 16.6);
        let move2 = dir2 * baseSpeed * currentFactor * (deltaTime / 16.6);
        let moveText = dirText * (baseSpeed * 1.5) * currentFactor * (deltaTime / 16.6);

        x1 += move1;
        x2 += move2;
        xText += moveText;

        if (max1 > 0) x1 = wrap(x1, max1);
        if (max2 > 0) x2 = wrap(x2, max2);
        if (maxText > 0) xText = wrap(xText, maxText);

        gsap.set(row1Inner, { x: x1 });
        gsap.set(row2Inner, { x: x2 });
        gsap.set(textInner, { x: xText });
      });
    }
  }

  // ── SCROLL ANIMATIONS ─────────────────────────
  function setupScrollAnimations() {
    document.querySelectorAll('[data-scroll-reveal]').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el, start: 'top 88%', end: 'top 60%',
          toggleActions: 'play none none reverse'
        },
        y: 50, opacity: 0, duration: 0.8, ease: 'power3.out'
      });
    });

    document.querySelectorAll('.section__number').forEach((num) => {
      gsap.from(num, {
        scrollTrigger: { trigger: num, start: 'top 92%', toggleActions: 'play none none reverse' },
        x: -20, opacity: 0, duration: 0.5, ease: 'power3.out'
      });
    });

    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length) {
      gsap.from(skillCards, {
        scrollTrigger: { trigger: '.skills__grid', start: 'top 85%', toggleActions: 'play none none reverse' },
        y: 60, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
      });
    }

    const contactH = document.querySelector('.contact__heading');
    if (contactH) {
      gsap.from(contactH, {
        scrollTrigger: { trigger: contactH, start: 'top 85%', toggleActions: 'play none none reverse' },
        y: 60, opacity: 0, scale: 0.95, duration: 0.9, ease: 'power3.out'
      });
    }
  }

  // ── Cursor glow ───────────────────────────────
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position:fixed; width:500px; height:500px; border-radius:50%;
      background:radial-gradient(circle,rgba(255,255,255,.035) 0%,transparent 70%);
      pointer-events:none; z-index:2; transform:translate(-50%,-50%);
      will-change:left,top; transition:left .25s ease,top .25s ease;
    `;
    document.body.appendChild(glow);
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  }
});
