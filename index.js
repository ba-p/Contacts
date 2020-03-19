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
    var name = readlineSync.question('Name: ');
    var phone = readlineSync.question('Phone: ');
    var contact = {
        name: name,
        phone: phone
    };
    var phoneC = {
        name : name,
        times: 0
    };
    var message = {
        name : name,
        content : ''
    };
    phones.push(phoneC);
    users.push(contact);
    mess.push(message);
    console.log("created");
    
}


function callLogs(){
    console.log(phones.name + ' ' + phones.times);
    showMenu();
}

function call(name){
    for(var i = 0; i < phones.length; ++i)
    {
        if(phones[i].name == name)
        {
            phones[i].times++;
            break;
        }
    }
}

function message(name){
    var content = readlineSync.question('Content: ');
    for(var i = 0;i < mess.length; ++i)
    {
        if(mess[i].name == name)
        {
            mess[i].content = content;
        }
    }
}

function deleteCon(name){
    for(var i = 0; i < users.length; ++i)
    {
        users.splice(i,1);
    }
    for(var i = 0; i < phones.length; ++i)
    {
        phones.splice(i,1);
    }
    for(var i = 0; i < mess.length; ++i)
    {
        mess.splice(i,1);
    }
}

function showAction(name){
    console.log('Options:');
    console.log('1.Call');
    console.log('2.Message');
    console.log('3.Delete');
    var option = readlineSync.question('> ');
    switch(option){
        case '1':
            call(name);
            break;
        case '2':
            message(name);
            break;
        case '3':
            deleteCon(name);
            break;
        default:
            console.log('Wrong option!');
            break;
    }
}

function searchN(){  
    var name = readlineSync.question('Name: ');
    for(var i = 0; i < users.length; ++i)
    {
        if(users[i].name.toLowerCase() === name.toLowerCase())
        {
            console.log(users[i].name);
            console.log(users[i].phone);
            showAction(users[i].name);
            break;
        }
    }
    
}

function searchP(){
    var phone = readlineSync.question('Phone: ');
    var tmp = 0;
    for(var i = 0; i < users.length; ++i)
    {
        if(users[i].phone == phone)
        {
            console.log(users[i].name);
            console.log(users[i].phone);
            tmp = 1;
            showAction(users[i].name);
            break;
        }
    }
    
}

function search(){
    console.log('Search by: ');
    console.log('1.Name ');
    console.log('2.Phone ');
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

function save(){
    var content = JSON.stringify(users);
    fs.writeFileSync('./database/users.json',content);
    var content = JSON.stringify(phones);
    fs.writeFileSync('./database/phone.json',content);
    var content = JSON.stringify(mess);
    fs.writeFileSync('./database/messjson',content);
}


function showMenu(){

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
            showMenu();
            break;
        case '2':
            create();
            showMenu();
            break;
        case '3':
            search();
            showMenu();
            break;
        case '4':
            save();
            showMenu();
            break;
        default:
            console.log('Wrong option!');
            showMenu();
            break;
    }
}
function main(){
    loadData();
    showMenu();
}
main();




