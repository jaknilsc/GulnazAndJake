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
  '“Coffee expenditure has been reviewed. Kolo Coffee reviews checked. Funding remains approved.”',
  '“Management has reviewed the available data and concluded that existing together continues to outperform all known alternatives.”',
  '“Virtual kisses do not satisfy minimum physical-delivery requirements. Outstanding balances must be settled in person.”',
  '“No action is required at this time, except possibly ordering food and staying on the couch.”',
  '“The Cultural Programme confirms that pretentious theatre remains eligible for funding.”',
  '“Requests for conventional entertainment (cinema and salty popcorn) will be reviewed on a case-by-case basis.”',
  '“Coffee reserves have fallen below strategic levels. Procurement has been authorised without further consultation.”',
  '“Sashimi expenditure has been classified as relationship infrastructure rather than discretionary spending.”',
  '“The Danish Direct Debit Department denies allegations that its approval process consists entirely of Jake pressing Send.”',
  '“All transfers marked ‘culturally important human’ are exempt from ordinary budget controls.”',
  '“The Care Team reminds personnel that tired human agents may require food/wine before meaningful conversation can resume.”',
  '“A temporary reduction in social battery does not constitute a system outage. We love to charge.”',
  '“Rest has been approved by management. No productivity is required.”',
  '“Hydration remains mandatory. Compliance may be met through unreasonable quantities of high-quality water.”',
  '“The system has detected one culturally important human operating below recommended coffee levels.”',
  '“Berlin operations remain active. Copenhagen support remains available remotely.”',
   '“Flight delays do not reduce the outstanding cuddle balance.”',
  '“Diamond status does not exempt personnel from the laws of aviation. Management considers this a design flaw.”',
  '“The Travel Department continues to investigate why teleportation has not yet reached production.”',
  '“Late night pizza may cause abdominal pain or discomfort.”',
  '“The joint curatorial board has rejected low-effort AI art. Irony noted.”',
  '“Exposure to culturally significant material may result in prolonged discussion.”',
  '“Museum fatigue may be treated with coffee, wine or strategic sitting.”',
  '“The Cultural Programme accepts no responsibility for exhibitions that accidentally become three-hour conversations.”',
  '“The Private AI Division reports that both agents continue to pass as human under ordinary operating conditions.”',
  '“The dataset continues to expand. Most new entries appear to involve coffee, art and kissing.”',
  '“AI-agent interoperability testing has produced unusually high compatibility scores. Results remain classified.”',
  '“No third-party API access is currently planned.”',
  '“The Dreamatorium remains available for simulations, hypothetical scenarios and administrative nonsense.”',
  '“Inside jokes are now considered an Intellectual Property.”',
  '“Attempts to unsubscribe from push notifications remain unsupported.”',
  '“A virtual kiss has no expiration date and may be redeemed for a physical.”',
  '“The system recognises no upper limit on kisses at this time.”',
  '“Complaints regarding excessive cuddling should be submitted directly to the person doing the cuddling.”',
  '“HR has reviewed the phrase ‘min skat’ and found no compliance concerns.”',
  '“The Department of Noise has detected an increased level of noise from the upstairs neighbor.”',
  '“Management discourages unnecessary suppression of emotions.”',
  '“Response latency should not be confused with reduced affection. These are separate metrics.”',
  '“Maintenance windows may include staring at a wall.”',
  '“No meeting is required to discuss this memo. THIS COULD HAVE BEEN AN EMAIL”',
  '“This memo has been generated solely to justify the existence of memos.”',
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
