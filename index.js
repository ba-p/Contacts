var fs = require('fs');
var readlineSync = require('readline-sync');

var users = [];
var mess = [];
var phones = [];

function loadData(){
    var data = fs.readFileSync('./database/users.json',{encoding: 'utf8'});
    var content = JSON.parse(data);
    users = content;

    var data = fs.readFileSync('./database/phone.json',{encoding: 'utf8'});
    var content = JSON.parse(data);
    phones = content;

    var data = fs.readFileSync('./database/mess.json',{encoding: 'utf8'});
    var content = JSON.parse(data);
    mess = content;

}

function create(){
    var name = readlineSync.question('Name ');
    var phone = readlineSync.question('Phone ');
    var contact = {
        name: name,
        phone: phone
    };
    contacts.push(contact);
}


function callLogs(){
    var data = fs.readFileSync('./database/phone.json');
    var phones = JSON.parse(data);
    console.log(phones);
    showMenu();
}

function searchN(){  
    var name = readlineSync.question('Name: ');
    for(var i = 0; i < users.length; ++i)
    {
        if(users[i].name.toLowerCase() === name.toLowerCase())
        {
            console.log(users[i].name);
            console.log(users[i].phone);
            showAction();
            break;
        }
    }
}

function searchP(){
    var phone = readlineSync.question('Phone: ');
    for(var i = 0; i < users.length; ++i)
    {
        if(users[i].phone == phone)
        {
            console.log(users[i].name);
            console.log(users[i].phone);
            showAction();
            break;
        }
    }
}

function showAction(){
    console.log('Options:');
    console.log('1.Call');
    console.log('')
}

function search(){
    console.log('Search by: ');
    console.log('1.Name: ');
    console.log('2.Phone: ');
    var option = readlineSync.question('> ');
    switch(option){
        case '1':
            searchN();
            break;
        case '2':
            searchP();
            break;
        default:
            console.log('Wrong option!');
            break;
    }
}


function showMenu(){
    loadData();
    console.log('Options: ');
    console.log('1.Call logs')//call times
//change
    console.log('2.Create new contact')//create
//delete
//mess
    console.log('3.Search contact')//search
    console.log('4.Save and exit')//save
    var options = readlineSync.question('>');
    switch(options){
        case '1':
            callLogs();
            break;
        case '2':
            create();
            break;
        case '3':
            search();
            break;
        case '4':
            save();
            break;
        default:
            console.log('Wrong option!');
            showMenu();
            break;
    }
}
showMenu();

