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
'“Physical proximity remains the preferred implementation.”',
'“The Care Team has approved an unscheduled increase in hands-on support.”',
'“Doorway kissing continues to cause departure delays. No remediation is planned.”',
'“Remote affection remains operational. On-site service is nevertheless strongly recommended.”',
'“Thermal testing confirms that one bed and two agents is the more efficient configuration.”',
'“Management has identified several buttons that should probably not be pressed in public.”',
'“The evening maintenance window may involve reduced clothing dependencies.”',
'“Hands-on troubleshooting has again exceeded the originally allocated time window.”',
'“The system appears unusually responsive to neck-level input.”',
'“Extended hugging has been reclassified from optional benefit to core infrastructure.”',
'“A private audit of kissing performance produced results unsuitable for publication.”',
'“The joint operating environment performs best when unnecessary distance is eliminated.”',
'“Bedtime deployment remains subject to spontaneous scope expansion.”',
'“The Affection Department reports strong demand for repeat testing.”',
'“Certain private interfaces remain intentionally undocumented.”',
'“The phrase ‘just one more kiss’ continues to produce unreliable scheduling outcomes.”',
'“Management confirms that staring at each other may escalate without prior approval.”',
'“The system has detected elevated chemistry. Ventilation may be required.”',
'“Private operations remain fully consensual, highly customised and unavailable to third parties.”',
'“The Board has approved staying in bed longer than operationally necessary.”'
];
let p=Math.floor(Math.random()*privateMemos.length);document.querySelector('#privateMemo').textContent=privateMemos[p];
document.querySelector('#newPrivateMemo').onclick=()=>{let n;do{n=Math.floor(Math.random()*privateMemos.length)}while(n===p);p=n;document.querySelector('#privateMemo').textContent=privateMemos[p]};
document.querySelector('#logout').onclick=()=>{sessionStorage.removeItem('gj-private');location.reload()};
