// Global Interactions for Aranya Nature Stay
(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  // IntersectionObserver reveal
  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  $$('.reveal, .fade-up, .scale-in, .blur-in, .section-title h2').forEach(el=>revealObserver.observe(el));

  // Back to top
  const back = document.createElement('button');
  back.id = 'backToTop';
  back.setAttribute('aria-label','Back to top');
  back.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(back);
  back.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (y > 400) back.classList.add('is-visible'); else back.classList.remove('is-visible');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Parallax hero (lightweight)
  const hero = $('.hero');
  if (hero) {
    window.addEventListener('scroll', ()=>{
      const offset = (window.scrollY || 0) * 0.25;
      hero.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    }, { passive: true });
  }

  // Button pointer-based shimmer
  document.addEventListener('pointermove', (e)=>{
    $$('.btn').forEach(btn=>{
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      btn.style.setProperty('--x', x+'px');
      btn.style.setProperty('--y', y+'px');
    });
  }, { passive: true });

  // Mobile nav refinements (if present)
  const mobileToggle = $('.mobile-toggle');
  const navMenu = $('.nav-menu');
  if (mobileToggle && navMenu) {
    navMenu.addEventListener('click', (e)=>{
      if (e.target.matches('a')) navMenu.classList.remove('active');
    });
  }
})(); 