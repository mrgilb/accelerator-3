if (document.querySelector('.preview__play') && document.querySelector('.preview__video') && document.querySelector('.preview__image-container')) {
  const playButton = document.querySelector('.preview__play');
  const video = document.querySelector('.preview__video');
  const srcVideo = video.getAttribute('src');
  const imagePreview = document.querySelector('.preview__image-container');

  playButton.classList.remove('preview__play--no-js');
  video.classList.remove('preview__video--no-js');
  imagePreview.classList.remove('preview__image-container--no-js');

  playButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    video.classList.add('preview__video--visible');
    playButton.classList.add('preview__play--none-display');
    video.setAttribute('src', srcVideo + '&autoplay=1');
  });
}
