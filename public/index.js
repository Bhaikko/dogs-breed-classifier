console.log("Hello World");

let fileInput = $('#file');

fileInput.on('change', function(e){
    e.preventDefault();
    
    var fd = new FormData(); 
    var files = $('#file')[0].files[0]; 
    fd.append('dogPhoto', files); 
    
    axios.post('http://127.0.0.1:4000/predict', fd)
        .then(response => {
            console.log(response.data);
            changeMainData(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    
    return false;
});

let mainDogData = $('body');

const fillStars = number => {
    let fillString = "";

    let i = 1;
    for (i = 1; i <= number; i++) {
        fillString += `<img class="star" src="images/star.png">`;
    }

    for (i; i <= 5; i++) {
        fillString += `<img class="star" src="images/grayed-star.png">`;
    }

    return fillString;
}

const fillRows = characteristic => {
    let htmlString = "";
    
    for (let key in characteristic) {
        htmlString += `
            <div class="breed-characteristics-row">
                <span class="breed-characteristics-row-key">
                    ${key}
                </span>
                <span class="breed-characteristics-row-value">
                    ${fillStars(characteristic[key])}
                </span>
            </div>
        `;
    }

    return htmlString;

}

const changeMainData = (data) => {

    mainDogData.html(`
        <h1>Dogs Breed Classifier</h1> 

        <img id="dog-image-empty" src="${data.path}"/>
        
        <input type = "file" id="file" name="dogPhoto"/>
        
        <div id="dog-name" class="header width">
            ${data.dogName}
        </div>

        <div class="header width">
            Details:
        </div>
        <div id="dog-details" class="width">
            ${data.details.details}
        </div>

        <div class="header width">
            Breed Characteristics:
        </div>

        <div class="breed-characteristics-table width">
            <div class="breed-characteristics-block">
                <div class="breed-characteristics-block-header">
                    Adaptability
                </div>
                ${fillRows(data.details[' Adaptability'])}
            </div>
            <div class="breed-characteristics-block">
                <div class="breed-characteristics-block-header">
                    All Around Friendliness
                </div>
                ${fillRows(data.details[' All Around Friendliness'])}
            </div>
            <div class="breed-characteristics-block">
                <div class="breed-characteristics-block-header">
                    Health And Grooming Needs
                </div>
                ${fillRows(data.details[' Health And Grooming Needs'])}
            </div>
            <div class="breed-characteristics-block">
                <div class="breed-characteristics-block-header">
                    Physical Needs
                </div>
                ${fillRows(data.details[' Physical Needs'])}
            </div>
            <div class="breed-characteristics-block">
                <div class="breed-characteristics-block-header">
                    Trainability
                </div>
                ${fillRows(data.details[' Trainability'])}
            </div>
        </div>

        <div class="header width">
            Vital Stats:
        </div>

        <div class="vital-stats width">
            <div class="vital-stat-block">
                <img class="vital-stat-image" src="images/BreedGroup.png" />
                <div class="vital-stat-header">
                    Dog Breed Group:
                </div>

                <div class="vital-stat-detail">
                    ${data.details.vitalStats['Dog Breed Group']}
                </div>
            </div>

            <div class="vital-stat-block">
                <img class="vital-stat-image" src="images/Height.png" />
                <div class="vital-stat-header">
                    Height:
                </div>

                <div class="vital-stat-detail">
                    ${data.details.vitalStats['Height']}
                </div>
            </div>

            <div class="vital-stat-block">
                <img class="vital-stat-image" src="images/Weight.png" />
                <div class="vital-stat-header">
                    Weight:
                </div>

                <div class="vital-stat-detail">
                    ${data.details.vitalStats['Weight']}
                </div>
            </div>

            <div class="vital-stat-block">
                <img class="vital-stat-image" src="images/LifeSpan.png" />
                <div class="vital-stat-header">
                    Life Span:
                </div>

                <div class="vital-stat-detail">
                    ${data.details.vitalStats['Life Span']}
                </div>
            </div>
        </div>

        <div class="temp"></div>            
    `);
}
