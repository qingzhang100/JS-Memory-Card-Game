var logs = [
    '2022-08-21 add Log page\n2022-08-20 add countdown page\n2022-08-20 add shutdown sound effect\n',
    'end'
]

var i = 0;
var log = document.getElementById('log')

log.innerText = logs[i];

function up() {
    if (i != 0) {
        i--;
    }
    log.innerText = logs[i];
}

function next() {
    if (i != logs.length - 1) {
        i++;
    }

    log.innerText = logs[i];
}