(() => {
  const buttons = [...document.querySelectorAll('.photo-open')];
  if (!buttons.length) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'photo-viewer';
  dialog.setAttribute('aria-label', '프로젝트 사진 확대 보기');
  dialog.innerHTML = '<button class="viewer-close" aria-label="닫기">Close ×</button><button class="viewer-prev" aria-label="이전 사진">←</button><figure><img alt=""><figcaption aria-live="polite"></figcaption></figure><button class="viewer-next" aria-label="다음 사진">→</button>';
  document.body.append(dialog);
  let index = 0;
  const show = next => {
    index = (next + buttons.length) % buttons.length;
    const source = buttons[index].querySelector('img');
    const image = dialog.querySelector('img');
    image.src = source.src; image.alt = source.alt;
    dialog.querySelector('figcaption').textContent = `${index + 1} / ${buttons.length}`;
  };
  const close = () => dialog.close();
  buttons.forEach((button, i) => button.addEventListener('click', () => { show(i); dialog.showModal(); }));
  dialog.querySelector('.viewer-close').addEventListener('click', close);
  dialog.querySelector('.viewer-prev').addEventListener('click', () => show(index - 1));
  dialog.querySelector('.viewer-next').addEventListener('click', () => show(index + 1));
  dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
  });
})();
