// Zeros Peer main module

const WebSocket = require('ws')
const SHA256 = require('crypto-js/sha256')
const fs = require('fs')

var boxID = 'NULL'
var randomString = randomString()
var dir = __dirname + '/../model/';
var filename = randomString

function randomString() {
    let length = 80
    let result = ''
    let all = 'zerosZEROS01'
    var allLength = all.length
    for ( var i = 0; i < length; i++ ) {
       result += all.charAt(Math.floor(Math.random() * allLength))
    }
    return result
 }

function createFile(filename) {
    let input = JSON.parse('{}')
    json = JSON.stringify(input)
    fs.appendFile(dir + filename, json, function (err) {
        if (err) throw err
        console.log('Created box\n')
    })
}

function createBox () {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir)
        createFile(filename)
    }
    fs.readdir(dir, function (err, files) {
        if (err) throw err
        let filenames = [];
        for (let index in files) {
          filenames.push(files[index]);
        }
        filename = filenames[0]
    })
    fs.readFile(dir + filename, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err)
        } else {
            obj = JSON.parse(data)
            if (Object.keys(obj).length === 0) {
                boxID = SHA256(filename).toString()
                console.log('Box ID: ' + boxID + '\n')
                let input = JSON.parse('{"_id":"'+ boxID +'"}')
                json = JSON.stringify(input)
                fs.writeFile(dir + filename, json, (err) => {
                    if (err) throw err
                    console.log('Saved Box id\n')
                })
            }
        }
    })
}

function connectPeer(address, req) {
    let ws_scheme = ''
    if (req.protocol == "https:") {
        ws_scheme = "wss://";
    } else {
        ws_scheme = "ws://"
    }
    let wsp = new WebSocket(ws_scheme + address);
    fs.readdir(dir, function (err, files) {
        if (err) throw err
        let filenames = [];
        for (let index in files) {
          filenames.push(files[index]);
        }
        filename = filenames[0]
    })
    wsp.on('open', function open() {
        fs.readFile(dir + filename, 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err)
            } else {
                obj = JSON.parse(data)
                json = JSON.stringify(obj)
                wsp.send(json)
                console.log('Peer sent: ' + json)
            }
        })
    })

    wsp.on('error', (error) => {
        console.log('client error', error)
    })
}

module.exports = { createBox, connectPeer }