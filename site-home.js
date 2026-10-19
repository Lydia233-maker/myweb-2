(function(){
  var burger=document.querySelector('.burger');
  var drawer=document.getElementById('drawer');
  var nomiLayer=document.getElementById('nomiLayer');
  var nomiFab=document.getElementById('nomiFab');
  var nomiClose=document.getElementById('nomiClose');
  var nomiLog=document.getElementById('nomiLog');
  var nomiForm=document.getElementById('nomiForm');
  var nomiInput=document.getElementById('nomiInput');

  function setDrawer(open){
    burger.setAttribute('aria-expanded', open?'true':'false');
    burger.setAttribute('aria-label', open?'关闭菜单':'打开菜单');
    drawer.classList.toggle('is-open', !!open);
  }
  burger.addEventListener('click', function(){
    setDrawer(burger.getAttribute('aria-expanded')!=='true');
  });
  drawer.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ setDrawer(false); });
  });

  function flash(el){
    if(!el) return;
    el.classList.add('is-flash');
    setTimeout(function(){ el.classList.remove('is-flash'); }, 1200);
  }
  function goHash(hash){
    if(!hash || hash==='#' || hash==='#home'){
      document.getElementById('home').scrollIntoView({behavior:'smooth', block:'start'});
      return;
    }
    var id=hash.replace(/^#/,'');
    if(id.indexOf('note-')===0){
      openNomi();
      pushBot('这篇「'+(document.querySelector('a[href="#'+id+'"]')||{}).textContent+'」还在本子里趴着。先跟我聊两句？喵。');
      return;
    }
    var el=document.getElementById(id);
    if(!el) return;
    el.scrollIntoView({behavior:'smooth', block:'center'});
    flash(el.closest('.folio-main, .folio-side, .folio') || el);
  }
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var href=a.getAttribute('href')||'';
      e.preventDefault();
      if(href && href!=='#') history.pushState(null,'',href);
      goHash(href||'#home');
    });
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      window.location.href=a.getAttribute('href');
    });
  });

  var greeted=false;
  function push(role, text){
    var div=document.createElement('div');
    div.className='nomi-bubble '+role;
    div.textContent=text;
    nomiLog.appendChild(div);
    nomiLog.scrollTop=nomiLog.scrollHeight;
    return div;
  }
  function pushBot(text){ return push('bot', text); }
  function pushMe(text){ return push('me', text); }
  function openNomi(){
    setDrawer(false);
    nomiLayer.hidden=false;
    nomiLayer.classList.add('is-open');
    nomiFab.setAttribute('aria-expanded','true');
    if(!greeted){
      greeted=true;
      pushBot('喵。我是 Nomi，住在黎婷网页角落里。想摸、想聊、想问她在干嘛，都可以。');
    }
    setTimeout(function(){ nomiInput.focus(); }, 60);
  }
  function closeNomi(){
    nomiLayer.classList.remove('is-open');
    nomiFab.setAttribute('aria-expanded','false');
    setTimeout(function(){ nomiLayer.hidden=true; }, 220);
  }
  function reply(q){
    var s=(q||'').trim().toLowerCase();
    if(!s) return '……你是想无声装猫吗？我也行。';
    if(/摸|rua|撸|抱抱|贴贴/.test(s)) return '呼噜呼噜——再摸一下耳朵。算你有品。';
    if(/你是谁|名字|nomi/.test(s)) return 'Nomi。黎婷角落里的猫。不吃罐头，吃闲聊和偶尔的夸夸。';
    if(/黎婷|主人|她|lidy|婷/.test(s)) return '她最近在想「评估集怎么才不骗人」。人话版：别让 AI 只会表演，要会认栽。';
    if(/评估|胡说|幻觉|胡话|demo/.test(s)) return 'Demo 会笑，坏案例才会哭。她要是又熬夜攒案例，记得喊她喝水。';
    if(/上海|天气|在哪/.test(s)) return '在上海。有时候晒太阳，有时候下雨——我待在屏幕里比较稳。';
    if(/画画|画/.test(s)) return '她画画的时候我负责趴着。你要是夸她两句，我替你转发。';
    if(/猫|喵|可爱/.test(s)) return '喵。这个回答我打一百分。';
    if(/你好|嗨|哈喽|hello|hi/.test(s)) return '嗨。今天是想摸我，还是想八卦黎婷？';
    if(/谢谢|感谢/.test(s)) return '不客气。再来一句也行，我闲着也是闲着。';
    if(/再见|拜拜|走了/.test(s)) return '去吧。右下角再点我，我还在。';
    if(/github|邮箱|联系|写信/.test(s)) return '写信点右上角「写信给我」。GitHub 在「这阵子」那栏。我就不代发邮件了，爪打字太慢。';
    if(/帮助|能做什么|你会什么/.test(s)) return '我会闲聊、卖萌、偶尔转述黎婷在琢磨的事。正经产品问题……她更专业，我负责气氛。';
    var pool=[
      '我听懂了大概三成，剩下七成用尾巴回答：晃两下。',
      '有意思。你要是写进评估集，记得标成「人类真实发言」。',
      '喵。再具体一点？我虽然是猫，但不只会「嗯嗯」。',
      '这个问题适合晒在阳台上想。我先帮你占个椅子。',
      '行，记下了。等黎婷回来我拿小鱼干贿赂她看一眼。'
    ];
    return pool[Math.floor(Math.random()*pool.length)];
  }
  function ask(text){
    var q=String(text||'').trim();
    if(!q) return;
    pushMe(q);
    var tip=push('bot typing','Nomi 在舔爪子…');
    setTimeout(function(){ tip.remove(); pushBot(reply(q)); }, 420+Math.random()*380);
  }
  nomiFab.addEventListener('click', function(){
    if(nomiLayer.classList.contains('is-open')) closeNomi(); else openNomi();
  });
  nomiClose.addEventListener('click', closeNomi);
  ['footerNomi','aboutNomi'].forEach(function(id){
    var el=document.getElementById(id);
    if(el) el.addEventListener('click', openNomi);
  });
  nomiLayer.addEventListener('click', function(e){ if(e.target===nomiLayer) closeNomi(); });
  document.addEventListener('keydown', function(e){
    if(e.key!=='Escape') return;
    if(nomiLayer.classList.contains('is-open')){ closeNomi(); return; }
    setDrawer(false);
  });
  nomiForm.addEventListener('submit', function(e){
    e.preventDefault();
    var v=nomiInput.value; nomiInput.value=''; ask(v);
  });
  document.getElementById('nomiQuick').addEventListener('click', function(e){
    var b=e.target.closest('button[data-q]');
    if(b) ask(b.getAttribute('data-q'));
  });

  if(!document.documentElement.classList.contains('js-anim')) return;
  var soft='cubic-bezier(.22,.61,.24,1)', expo='cubic-bezier(.16,1,.3,1)';
  var lift=getComputedStyle(document.documentElement).getPropertyValue('--lift').trim()||'10px';
  var rise=getComputedStyle(document.documentElement).getPropertyValue('--rise').trim()||'22px';
  var running=[];
  function anim(el,kf,opts){ if(!el) return; running.push(el.animate(kf, Object.assign({fill:'forwards'}, opts))); }
  function start(){
    anim(document.querySelector('.brand'),[{opacity:0,transform:'scale(.92)'},{opacity:1,transform:'scale(1)'}],{delay:80,duration:560,easing:soft});
    document.querySelectorAll('.nav a').forEach(function(a,i){ anim(a,[{opacity:0,transform:'translateY('+lift+')'},{opacity:1,transform:'translateY(0)'}],{delay:160+i*40,duration:500,easing:expo}); });
    document.querySelectorAll('.actions > *').forEach(function(a,i){ anim(a,[{opacity:0,transform:'translateY('+lift+')'},{opacity:1,transform:'translateY(0)'}],{delay:300+i*60,duration:500,easing:expo}); });
    anim(document.querySelector('.eyebrow'),[{opacity:0},{opacity:1}],{delay:380,duration:420,easing:soft});
    document.querySelectorAll('h1 .ln-i').forEach(function(el,i){ anim(el,[{transform:'translateY(130%)'},{transform:'translateY(0)'}],{delay:420+i*120,duration:950,easing:expo}); });
    anim(document.querySelector('.sub'),[{opacity:0,transform:'translateY('+lift+')'},{opacity:1,transform:'translateY(0)'}],{delay:780,duration:620,easing:expo});
    document.querySelectorAll('.ctas .btn').forEach(function(a,i){ anim(a,[{opacity:0,transform:'translateY('+lift+')'},{opacity:1,transform:'translateY(0)'}],{delay:920+i*70,duration:560,easing:expo}); });
    anim(document.querySelector('.folio'),[{opacity:0,transform:'translateY('+rise+')'},{opacity:1,transform:'translateY(0)'}],{delay:1000,duration:660,easing:expo});
    anim(document.querySelector('.footer'),[{opacity:0},{opacity:1}],{delay:1180,duration:420,easing:soft});
    anim(nomiFab,[{opacity:0,transform:'scale(.9)'},{opacity:1,transform:'scale(1)'}],{delay:1300,duration:480,easing:soft});
    var last=0; running.forEach(function(a){ last=Math.max(last,(a.effect.getTiming().delay||0)+(a.effect.getTiming().duration||0)); });
    setTimeout(finish, last+80);
  }
  function finish(){
    running.forEach(function(a){ try{a.cancel();}catch(e){} });
    document.documentElement.classList.remove('js-anim');
    var nodes=[].slice.call(document.querySelectorAll('.brand,.nav a,.actions > *,.eyebrow,.sub,.ctas .btn,.folio,.footer,h1 .ln-i,#nomiFab'));
    nodes.forEach(function(el){ if(el){ el.style.opacity='1'; el.style.transform='none'; }});
    requestAnimationFrame(function(){ nodes.forEach(function(el){ if(el){ el.style.opacity=''; el.style.transform=''; }}); });
  }
  var started=false;
  function kick(){ if(started) return; started=true; requestAnimationFrame(function(){ requestAnimationFrame(start); }); }
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(kick).catch(kick);
  setTimeout(kick, 400);
  setTimeout(function(){ if(document.documentElement.classList.contains('js-anim')) finish(); }, 2800);
})();