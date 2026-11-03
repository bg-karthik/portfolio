'use strict';

const codeSamples = {
  java: 'static int square(int n) {\n    return n * n;\n}\n\n// square(7) → 49',
  cpp: 'int square(int n) {\n    return n * n;\n}\n\n// square(7) → 49',
  csharp: 'static int Square(int n) {\n    return n * n;\n}\n\n// Square(7) → 49'
};
const languageSelect = document.querySelector('#code-language');
function updateSample() {
  document.querySelector('#target-code').textContent = codeSamples[languageSelect.value];
}
languageSelect.addEventListener('change', updateSample);
updateSample();

const chatSamples = {
  knowledge: { question: 'What can EduReach help with?', answer: 'Ask about admissions, courses, placements, or counseling. EduReach uses a college knowledge base to support its answers.' },
  voice: { question: 'Can I talk instead of typing?', answer: 'EduReach integrates Vapi AI voice assistance alongside its text chatbot, giving students another way to ask college-related questions.' }
};
document.querySelectorAll('[data-question]').forEach(button => {
  button.addEventListener('click', () => {
    const sample = chatSamples[button.dataset.question];
    document.querySelector('#chat-question').textContent = sample.question;
    document.querySelector('#chat-answer').textContent = sample.answer;
    document.querySelectorAll('[data-question]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
});
document.querySelector('#chat-answer').setAttribute('aria-live', 'polite');

const projectContent = {
  translator: `<h2 id="dialog-title">Smart Code Translator.</h2><p class="dialog-lead">An LLM-powered code assistant for translating, explaining, analyzing, and optimizing code.</p><h3>The idea</h3><p>Bring several code assistance tasks into one web application, so developers can move between languages and better understand the code they are working with.</p><h3>What I built</h3><ul><li>Express.js REST APIs integrated with Google Gemini for code translation, plain-language explanations, complexity analysis, and optimization suggestions.</li><li>A React.js interface using Monaco Editor for working with code.</li><li>Implemented JWT login with email and password and Google OAuth. Verified sign-in with five test accounts.</li><li>Added a history page so users can revisit requests and results stored in MongoDB.</li><li>A frontend deployed on Vercel and backend API deployed on Render.</li></ul><div class="tags"><span>React.js</span><span>Monaco Editor</span><span>Node.js</span><span>Express.js</span><span>Gemini API</span><span>MongoDB</span></div><p class="dialog-note">The portfolio’s interactive code sample uses predefined examples. Open the project to explore the AI application.</p><div class="dialog-links"><a class="text-link" href="https://smartcodetranslator.vercel.app/" target="_blank" rel="noopener noreferrer">Open live project ↗</a><a class="text-link" href="https://github.com/bg-karthik/Smart-Code-Translator" target="_blank" rel="noopener noreferrer">View source ↗</a></div>`,
  edureach: `<h2 id="dialog-title">EduReach.</h2><p class="dialog-lead">An AI college chatbot and voice agent built around retrieval-augmented generation.</p><h3>The idea</h3><p>Help students navigate college information through natural-language questions about admissions, courses, placements, and counseling.</p><h3>What I built</h3><ul><li>Built the college chatbot with LangChain, Google Gemini API, and MongoDB Atlas Vector Search.</li><li>Connected a college knowledge base and tested responses using 18 sample questions.</li><li>Added JWT-based student login and Vapi voice integration, with call history in MongoDB and checks to prevent duplicate call requests.</li></ul><div class="tags"><span>React.js</span><span>TypeScript</span><span>Express.js</span><span>LangChain</span><span>Gemini API</span><span>Vapi AI</span></div><p class="dialog-note">The conversation on this portfolio uses predefined examples. Open the live project to try the chatbot.</p><div class="dialog-links"><a class="text-link" href="https://edureach-ai-chatbot-bgk.vercel.app/" target="_blank" rel="noopener noreferrer">Open live project ↗</a><a class="text-link" href="https://github.com/bg-karthik/edureach-ai-chatbot" target="_blank" rel="noopener noreferrer">View source ↗</a></div>`
};
const dialog = document.querySelector('#project-dialog');
let dialogTrigger;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  dialogTrigger = button;
  document.querySelector('#dialog-content').innerHTML = projectContent[button.dataset.project];
  dialog.showModal();
  document.body.classList.add('dialog-open');
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (dialogTrigger) dialogTrigger.focus();
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('span').textContent = '+';
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span').textContent = open ? '−' : '+';
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const email = 'balinagangakarthik2006@gmail.com';
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(email);
    status.textContent = 'Email copied. Let’s connect!';
  } catch {
    status.textContent = email;
  }
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) navigation.querySelectorAll('a').forEach(link => {
        const active = link.hash === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('#work, #about, #toolkit').forEach(section => observer.observe(section));
}
