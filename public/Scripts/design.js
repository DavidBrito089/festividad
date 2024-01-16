function enlargeImage(element) {
    const imgSrc = element.querySelector('img').src;
    document.getElementById('enlarged-img').src = imgSrc;
    document.getElementById('overlay').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
});