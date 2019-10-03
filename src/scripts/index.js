import '../styles/index.scss';
import Axios from 'axios';

let base64image;

const getCurrentSong = () => {
    Axios.get('https://pl-cache.weareone.world/minimal/nowplaying')
    .then(function (response) {
        // handle success
        getBase64Image(response.data.imageRef,response.data);
    });
}

const getBase64Image = (imageRef,data) => {
    Axios.get(`https://pl-cache.weareone.world/minimal/image/${imageRef}`)
    .then(function (response) {
        // handle success
        base64image =  response.data.base64image;
        renderInfo(data)
    });
}

getCurrentSong();
setInterval(getCurrentSong, 3000);

const renderInfo = (data) => {
     
    const infoDiv = document.querySelector('.info');
    console.log(base64image);
    infoDiv.innerHTML = `<p>Artist: ${data.artist}</p>
                         <p>Title: ${data.title}</p>
                         <img alt="${data.artist}  ${data.title} " class="base64" src="data:image/jpeg;base64,${base64image}" >
                         `;
}
