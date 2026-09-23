const form = document.querySelector('#feedbackForm');
const message = document.querySelector('#feedbackMessage');
const sendButton = document.querySelector('#sendFeedback');
const status = document.querySelector('#feedbackStatus');

message.addEventListener('input', () => message.setCustomValidity(''));
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (sendButton.disabled) return;
  message.setCustomValidity(message.value.trim() ? '' : 'Tell Jake a little more first.');
  if (!form.reportValidity()) return;

  sendButton.disabled = true;
  sendButton.textContent = 'Sending…';
  status.textContent = 'Contacting Management…';
  try {
    const response = await fetch('https://gj-kiss.jaknils.workers.dev/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: form.elements.type.value,
        message: message.value.trim(),
        website: form.elements.website.value
      }),
      signal: AbortSignal.timeout(20000)
    });
    if (response.status === 429) {
      status.textContent = 'Management needs a moment. Please try again in a minute.';
      return;
    }
    const result = await response.json();
    if (!response.ok || result.ok !== true) throw new Error('Delivery not confirmed');
    form.reset();
    status.textContent = 'Sent to Jake. Management has been informed.';
  } catch {
    status.textContent = 'Delivery could not be confirmed. Your message is still here. Check Telegram before trying again.';
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = 'Send to Jake';
  }
});
