// document elements
const output = document.getElementById('output');
const refresh = document.getElementById('refresh');
const form = document.getElementById('form');
const list = document.getElementById('list');
const text = document.getElementById('text');
const add = document.getElementById('add');



// prevent form submission
form.addEventListener('submit', event => event.preventDefault());

// add item function call
text.addEventListener('keyup', event => {
        if(event.key === "Enter")
            addItem();
    }) // end of event listener key up

add.onclick = addItem;
refresh.onclick = selectFood;



// select food
function selectFood() {
    const food = Array.from(list.children).map(x => x.innerText)
    
    if(food.length)
        output.innerText = 'null';
    
    output.innerText = food[Math.floor(Math.random() * food.length)];
} // end of select food

// add item to list
function addItem() {
    if(text.value === '') return;

    const item = document.createElement('li');

    item.innerHTML = '<p class="inline">' + text.value + '</p>' +
        '<input type="button" value="⬆️" onclick="moveItemUp(this)" class="up">' +
        '<input type="button" value="⬇️" onclick="moveItemDown(this)" class="down">' +
        '<input type="button" value="🗑️" onclick="removeItem(this)" class="trash">';

    list.appendChild(item);

    text.value = '';
    setParam();
} // end of add

// move item up list
function moveItemUp(button) {
    const item = button.parentNode;
    const prevItem = item.previousElementSibling;

    if(prevItem) {
        list.insertBefore(item, prevItem);
        setParam();
    } // end of if
} // end of move item up

// move item down list
function moveItemDown(button) {
    const item = button.parentNode;
    const nextItem = item.nextElementSibling;

    if(nextItem) {
        list.insertBefore(nextItem, item);
        setParam();
    } // end of if
} // end of move item down

// remove item from list
function removeItem(button) {
    const item = button.parentNode;
    list.removeChild(item);
    setParam();
} // end of remove item



// set param
function setParam() {
    window.history.replaceState(null, '', '?food=' + Array.from(list.children).map(x => x.innerText));
} // end of set search



// init
function init() {
    const search = location.search
        .slice(1)
        .split('#')[0]
        .split('&')
        .map(x => x
            .split('='))
        .reduce((t,s) => {
            t.set(s[0], s[1]);
            return t;
        }, new Map())
    
    if(search.has('food'))
        decodeURIComponent(search.get('food'))
            .split(',')
            .forEach(x => {
                text.value = x;
                addItem();
            }) // end of for each

    selectFood();
} // end of init

init();