document.querySelector('.busca').addEventListener('submit', async (event)=>{

    /* Previne o comportamento padrão do formulário */
    event.preventDefault();

    // Recupera informação do formulário
    let input = document.querySelector('#searchInput').value

    // Consumindo a API
    if(input !== ''){
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=74338945ad57a5a376b589a7f0d3f116&units=metric&lang=pt_br`

        // Faz a requisição, espera a resposta...
        let results = await fetch(url);

        // Salva os resultados
        let json = await results.json();

        if (json.cod === 200){

            // Constrói o objeto se tudo ocorrer bem...
            showInfo({

                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });

        } else {

            clearInfo();
            showWarning('Não encontramos esta localização.');
        }

    }

});

function showInfo(json){

    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    // Altera o valor de 'none' para 'block'
    document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}