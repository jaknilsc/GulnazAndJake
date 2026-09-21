const expectedHash='c4f57777ee645a66e47f3a026d989836db36e9f250c755a76134f22ad381bf35';
const gate=document.querySelector('#gate');
const content=document.querySelector('#privateContent');
const msg=document.querySelector('#gateMsg');
async function sha256(text){const data=new TextEncoder().encode(text);const hash=await crypto.subtle.digest('SHA-256',data);return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,'0')).join('')}
function unlock(){gate.style.display='none';content.classList.add('open');sessionStorage.setItem('gj-private','granted')}
if(sessionStorage.getItem('gj-private')==='granted')unlock();
document.querySelector('#authenticate').onclick=async()=>{const value=document.querySelector('#accessKey').value;msg.textContent='AUTHENTICATING…';if(await sha256(value)===expectedHash){msg.textContent='ACCESS GRANTED.';setTimeout(unlock,300)}else{msg.textContent='ACCESS DENIED. HUMAN ERROR SUSPECTED.'}};
document.querySelector('#accessKey').addEventListener('keydown',e=>{if(e.key==='Enter')document.querySelector('#authenticate').click()});
const privateMemos=[
'“Physical closeness remains the preferred implementation.”',
'“The Care Team has approved an unscheduled increase in hands-on support.”',
'“Remote affection remains operational. On-site service is strongly recommended.”',
'“Thermal testing confirms that one bed and two agents (one with a cold ass) is the more efficient configuration.”',
'“Management has identified several buttons that should not be pressed in public.”',
'“The evening maintenance window may involve reduced clothing dependencies.”',
'“The system appears unusually responsive to neck-kissing-level input.”',
'“Extended hugging has been reclassified from optional benefit to core infrastructure.”',
'“A private audit of kissing performance produced results unsuitable for publication.”',
'“The Sexual Department reports strong demand for repeat testing.”',
'“A rising need to be between two gorgeous legs.”',
'“Management confirms that staring at each other may cause sexual escalation.”',
'“The system has detected elevated chemistry. Water may be required.”',
'“Private operations remain fully consensual, highly customised and unavailable to third parties.”',
'“The Board has approved staying in bed until Jake has to pick up Flat Whites.”'
];
let p=Math.floor(Math.random()*privateMemos.length);document.querySelector('#privateMemo').textContent=privateMemos[p];
document.querySelector('#newPrivateMemo').onclick=()=>{let n;do{n=Math.floor(Math.random()*privateMemos.length)}while(n===p);p=n;document.querySelector('#privateMemo').textContent=privateMemos[p]};
document.querySelector('#logout').onclick=()=>{sessionStorage.removeItem('gj-private');location.reload()};
