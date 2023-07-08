var carsArray =[
    {
    img: 'https://s5.pik.ba/galerija/2019-05/13/03/slika-310517-5cd96e21bf984-velika.jpg',
    model: 'Citroen C3 1.4 HDI Business Class',
    price: 12990.00,
    pricePDV: 14320.00,
    year: 2014,
    km: 175735
    },
    {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5UDSSebAm8aqn5E2hsCqaSG36MsSIMhpFWxJEqb3Y_nINbKIVsK6LBhx2wspETliRDcs&usqp=CAU',
    model: 'Citroen C3 1.5 BlueHDI Feel 102 KS -Novi model-',
    price: 22990.00,
    pricePDV: 32650.00,
    year: 2019,
    km: 129886
    },
    {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUNX5jgpOu9Vqg6YkBFvXMDedI9Wh71j3x3h-DyT5veXlaf-kn41No9sY1qB_5_aciQw0&usqp=CAU',
    model: 'Citroen C4 1.6 BlueHDI Exclusive Millenium -FACELIFT-',
    price: 20990.00,
    pricePDV: 23990.00,
    year: 2018,
    km: 134637
    },
    {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-5LQgMZs_GgCwolaGVGyUjBCEz3XshsQigb59S_TBONZydMjSpQUF29kplbPP8067xaM&usqp=CAU',
    model: 'Citroen C5 Aircross 2.0 BlueHDI Automatik SHINE Exclusive 177 KS VIRTUAL COCKPIT -Full LED-',
    price: 47500.00,
    pricePDV: 54990.00,
    year: 2019,
    km: 118914
    }
]
function drawElement(tag){
    var element = document.createElement(tag);
    return element;
}

function drawCarCard(cars){

    for (var car of cars){
        var divCard = drawElement('div');
        divCard.setAttribute('id','car-card');
        var divRedLine = drawElement('div');
        divRedLine.setAttribute('id','red-line')
        divCard.appendChild(divRedLine)
           
        var image = drawElement('img');
        image.src = car.img;

        var heading1 = drawElement('h1');
        heading1.innerText = car.model;

        var mainDiv = drawElement('div');
        mainDiv.setAttribute('class','main-div');
        var priceP = drawElement(`p`);
        priceP.innerText = 'CIJENA KM: ' + car.price;
        var priceWithPDV = drawElement('p');
        priceWithPDV.innerText ='CIJENA KM+PDV: '+ car.pricePDV;
        mainDiv.appendChild(priceP);
        mainDiv.appendChild(priceWithPDV)

        var footerDiv = drawElement('div');
        var year = drawElement('p');
        year.setAttribute('class', 'year');
        year.innerText ='GODINA: '+ car.year;
        var kmP = drawElement('p');
        kmP.setAttribute('class', 'km');
        kmP.innerText ='KILOMETRI: '+ car.km;
        footerDiv.appendChild(year);
        footerDiv.appendChild(kmP)

        divCard.appendChild(image);
        divCard.appendChild(heading1);
        divCard.appendChild(mainDiv);
        divCard.appendChild(footerDiv);

        document.body.appendChild(divCard);
    }
}

drawCarCard(carsArray);