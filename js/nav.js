let CurPage = 'playback';

const Navto = () => {
    const MenuItems = document.getElementsByClassName('MenuItem');
    Array.from(MenuItems).forEach((item) => {
        item.classList.toggle('active');
    });

    const Pages = document.getElementsByClassName('Page');
    Array.from(Pages).forEach((Page) => {
        Page.classList.toggle('active');
    });
}