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
        })
        .catch(err => {
            console.log(err);
        })
    
    return false;
});