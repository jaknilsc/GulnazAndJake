const memos=[
  '“Kisses are not reimbursable. They remain payable directly.”',
  '“Macro decisions by Jake. Micro decisions together.”',
  '“Coffee expenditure classified as critical cultural infrastructure.”',
  '“The private AI system will not be made open source at this time.”',
  '“Human intelligence must be maintained during prolonged exposure to artificial intelligence generated art.”',
  '“Current kiss allocation: +7,844,888,544. Audit pending.”',
  '“A recent internal review found that cuddling remains an effective response to a surprisingly broad range of operational incidents.”',
  '“Management acknowledges that Copenhagen and Berlin remain inconveniently located in different countries. Relevant authorities have been informed.”',
  '“External requests to open-source the system have again been declined. The training data is proprietary and includes an unreasonable number of inside jokes.”',
  '“Coffee expenditure has been reviewed. No evidence of fiscal responsibility was found. Funding remains approved.”',
  '“Management has reviewed the available data and concluded that existing together continues to outperform all known alternatives.”',
  '“Virtual kisses do not satisfy minimum physical-delivery requirements. Outstanding balances must be settled in person.”',
  '“The Care Team reports normal operations. Excessive warmth remains within approved tolerances.”',
  '“No action is required at this time, except possibly ordering food and staying on the couch.”',
  '“The Cultural Programme confirms that weird theatre remains eligible for joint funding.”',
  '“Requests for conventional entertainment will be reviewed on a case-by-case basis.”',
  '“Coffee reserves have fallen below strategic levels. Procurement has been authorised without further consultation.”',
  '“Ars Caffeina remains an approved emergency-response mechanism.”',
  '“Sashimi expenditure has been classified as relationship infrastructure rather than discretionary spending.”',
  '“The Danish Direct Debit Department denies allegations that its approval process consists entirely of Jake pressing Send.”',
  '“All transfers marked ‘culturally important human’ are exempt from ordinary budget controls.”',
  '“The Care Team reminds personnel that tired humans may require food before meaningful conversation can resume.”',
  '“A temporary reduction in social battery does not constitute a system outage.”',
  '“Rest has been approved by management. No productivity justification is required.”',
  '“Hydration remains mandatory. Compliance may be encouraged through unreasonable quantities of high-quality water.”',
  '“The system has detected one culturally important human operating below recommended coffee levels.”',
  '“Berlin operations remain active. Copenhagen support remains available remotely.”',
  '“International Operations confirms that airport kisses qualify as priority deliveries.”',
  '“Flight delays do not reduce the outstanding cuddle balance.”',
  '“Diamond status does not exempt personnel from the laws of aviation. Management considers this a design flaw.”',
  '“The Travel Department continues to investigate why teleportation has not yet reached production.”',
  '“Road trips remain approved provided that gas stations, coffee and at least one unnecessary detour are included.”',
  '“Sunset acquisition opportunities should be acted upon when operationally feasible.”',
  '“The joint curatorial board has rejected low-effort AI art. Irony noted.”',
  '“Exposure to culturally significant material may result in prolonged discussion. This is expected behaviour.”',
  '“Museum fatigue may be treated with coffee, wine or strategic sitting.”',
  '“The Cultural Programme accepts no responsibility for exhibitions that accidentally become three-hour conversations.”',
  '“The Private AI Division reports that both agents continue to pass as human under ordinary operating conditions.”',
  '“Human status remains provisionally assigned pending further evidence.”',
  '“The system has detected suspiciously customised behaviour. Investigation closed for lack of concern.”',
  '“Private model weights remain unavailable to investors, competitors and curious third parties.”',
  '“The dataset continues to expand. Most new entries appear to involve coffee, art and kissing.”',
  '“AI-agent interoperability testing has produced unusually high compatibility scores. Results remain classified.”',
  '“No third-party API access is currently planned.”',
  '“The Dreamatorium remains available for simulations, hypothetical scenarios and administrative nonsense.”',
  '“Inside jokes are now considered a protected strategic asset.”',
  '“Attempts to unsubscribe from push notifications remain unsupported.”',
  '“A virtual kiss has no expiration date but may be redeemed for a physical equivalent when geographically possible.”',
  '“Physical affection throughput is currently constrained by geography rather than demand.”',
  '“The Affection Infrastructure team recommends periodic recalibration through prolonged hugging.”',
  '“Doorway kisses remain outside standard scheduling procedures and may occur without notice.”',
  '“The system recognises no upper limit on forehead kisses at this time.”',
  '“Complaints regarding excessive cuddling should be submitted directly to the person doing the cuddling.”',
  '“The Legal Department has reviewed the phrase ‘min skat’ and found no compliance concerns.”',
  '“The Executive Office confirms that silliness remains a core operational requirement.”',
  '“Serious conversations and ridiculous jokes may coexist within the same production environment.”',
  '“Management discourages unnecessary suppression of emotions. Appropriate expression improves system observability.”',
  '“Asynchronous communication remains supported. Catastrophic interpretations are not part of the protocol.”',
  '“Response latency should not be confused with reduced affection. These are separate metrics.”',
  '“The system is designed for two autonomous humans, not continuous synchronisation.”',
  '“Maintenance windows may include sleep, solitude, work, travel and staring quietly at a wall.”',
  '“No meeting is required to discuss this memo.”',
  '“This memo has been generated solely to justify the existence of the Memo Department.”',
  '“The Memo Department denies being unnecessary and has prepared a 47-page report supporting this conclusion.”',
  '“Further bureaucracy has been approved in principle.”',
  '“An internal task force has been formed to determine whether the internal task force was necessary.”',
  '“The joint operating model remains: competent adults, questionable jokes, excellent coffee.”',
  '“Current relationship uptime is considered satisfactory. Scheduled maintenance consists primarily of sleep.”',
  '“Management notes with concern that one private system has developed an alarming number of departments.”',
  '“The Board has unanimously approved doing absolutely nothing together from time to time.”',
  '“Existing together remains an authorised activity with no agenda, deliverables or KPIs.”',
  '“No optimisation is required. Some things are permitted to simply be good.”'
];

let i=Math.floor(Math.random()*memos.length);
document.querySelector('#quote').textContent=memos[i];

document.querySelector('#newMemo').onclick=()=>{
  let next;
  do { next=Math.floor(Math.random()*memos.length); } while(next===i && memos.length>1);
  i=next;
  document.querySelector('#quote').textContent=memos[i];
};

document.querySelector('#kiss').onclick=()=>{
  const e=document.querySelector('#delivery');
  e.textContent='PUSH NOTIFICATION: A VIRTUAL KISS HAS BEEN DELIVERED. UNSUBSCRIBE: IMPOSSIBLE.';
  setTimeout(()=>e.textContent='',6500);
};
