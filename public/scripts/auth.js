require('dotenv').config();

function toggleInput(){
    if(process.env.isloggedin == 'true'){
        console.log('ISLOGGEDIN == TRUEE')
    } else {
        console.log('HAHAHA!');
    }
};

toggleInput();