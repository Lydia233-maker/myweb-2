(function(){
  var burger=document.querySelector('.burger');
  var drawer=document.getElementById('drawer');
  var nomiLayer=document.getElementById('nomiLayer');
  var nomiFab=document.getElementById('nomiFab');
  if(!nomiFab||!nomiLayer) return;
  var nomiClose=document.getElementById('nomiClose');
  var nomiLog=document.getElementById('nomiLog');
  var nomiForm=document.getElementById('nomiForm');
  var nomiInput=document.getElementById('nomiInput');
  function setDrawer(open){
    if(!burger||!drawer) return;
    burger.setAttribute('aria-expanded', open?'true':'false');
    burger.setAttribute('aria-label', open?'关闭菜单':'打开菜单');
    drawer.classList.toggle('is-open', !!open);
  }
  if(burger&&drawer){
    burger.addEventListener('click', function(){
      setDrawer(burger.getAttribute('aria-expanded')!=='true');
    });
    drawer.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ setDrawer(false); });
    });
  }
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
})();
