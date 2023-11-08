const btn: HTMLElement | null = document.querySelector(
    'button.mobile-menu-button'
);
const menu: HTMLElement | null = document.querySelector('.mobile-menu');

btn?.addEventListener('click', () => {
    menu?.classList.toggle('hidden');
});