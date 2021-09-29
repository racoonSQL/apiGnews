// fetch request api top headline
fetch('https://gnews.io/api/v4/top-headlines?&token=bd80f27d1050a5571689ba6ea01f7163&lang=en')
.then(function (response) {
    return response.json();
})
.then(function (data) {

    console.log(data);
    var article = document.getElementById('article');
    var template = ``

    const spinner = document.getElementById("spinner");
    spinner.setAttribute('hidden', '');

    data.articles.forEach((element) => {
        template += `
            <div class="box">
                <div class="left">
                    <div class="left__image">
                        <img src="${element.image}">
                    </div>
                </div>
                <div class="right">
                    <h2 class="right__link">
                        <a href="${element.url}" target="_blank">${element.title}</a>
                    </h2>
                    <div class="right__time">
                        <p>${element.publishedAt}</p>
                    </div>
                    <div class="right__desc">
                        <p>${element.description}</p>
                    </div>
                </div>
            </div>
        `
    });
    article.innerHTML = template;
});


// show and hide search modal
var search = document.getElementById('search');
var overlay = document.getElementById('modal');
var close = document.querySelector('.close');
var searchOl = document.querySelector('#searchOl');

search.addEventListener("click", function() {

    overlay.classList.add('overlay')
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('.input').focus();

});

window.addEventListener('click', function(e) {
    if (!document.getElementById('modal').getElementsByClassName('wrap')[0].contains(e.target) && !document.getElementById('search').contains(e.target)) {
        if(overlay.classList.contains('overlay')) {
        overlay.classList.remove('overlay');
        document.querySelector('body').style.overflow = 'visible';
        document.querySelector('.input').value = "";
        document.querySelector('.input').placeholder = "";
        }
    }
});

close.addEventListener('click', function() {
    overlay.classList.remove('overlay');
    document.querySelector('body').style.overflow = 'visible';
    document.querySelector('.input').value = "";
    document.querySelector('.input').placeholder = "";
});

// show Search Results
searchOl.addEventListener("click", function() {

    var inputCheck = document.querySelector('.input').value;

    if(inputCheck.replace(/\s/g, "").length == 0 || inputCheck.length == 0) {
        document.querySelector('.input').placeholder = "Vui lòng nhập vào đây";
    } else {

        const spinner = document.getElementById("spinner");
        spinner.removeAttribute('hidden'); 

        const apiKey = 'bd80f27d1050a5571689ba6ea01f7163'
        let topic = document.querySelector('.input').value;
        let url = `https://gnews.io/api/v4/search?q=${topic}&token=${apiKey}&lang=en`

        fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var article = document.getElementById('article');
            var template = ``

            const spinner = document.getElementById("spinner");
            spinner.setAttribute('hidden', '');

            data.articles.forEach((element) => {
                template += `
                    <div class="box">
                        <div class="left">
                            <div class="left__image">
                                <img src="${element.image}">
                            </div>
                        </div>
                        <div class="right">
                            <h2 class="right__link">
                                <a href="${element.url}" target="_blank">${element.title}</a>
                            </h2>
                            <div class="right__time">
                                <p>${element.publishedAt}</p>
                            </div>
                            <div class="right__desc">
                                <p>${element.description}</p>
                            </div>
                        </div>
                    </div>
                `
            });

            article.innerHTML = template;

        });

        overlay.classList.remove('overlay');
        document.querySelector('body').style.overflow = 'visible';
        document.querySelector('.input').value = "";

    }
});