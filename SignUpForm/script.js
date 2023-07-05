var dayOption = document.getElementById('birthday-select-day');

for(var i = 1; i <= 31; i++){
    var optionD = document.createElement('option');
    optionD.text = i;
    dayOption.add(optionD);
}

var yearOption = document.getElementById('birthday-select-year');

for(var i = 1960; i <= 2010; i++){
    var optionY = document.createElement('option');
    optionY.text = i;
    yearOption.add(optionY);
}

