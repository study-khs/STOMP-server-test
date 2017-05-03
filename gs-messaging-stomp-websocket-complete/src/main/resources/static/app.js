var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
	var channel = $("#channel").val();
    var socket = new SockJS('/hello');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings/' + $("#channel").val(), function(greeting){
            showGreeting(JSON.parse(greeting.body).content);
        });
        stompClient.subscribe('/user/queue/' + $("#channel").val(), function(message) {
        	treat(JSON.parse(message.body).msg);
        });
    });
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/" + $("#channel").val() + "/hello", {}, JSON.stringify({'name': $("#name").val()}));
}

function send() {
    var name = document.getElementById('name').value;
    stompClient.send("/app/" + $("#channel").val() + "/message", {}, JSON.stringify({'hobby': $("#hobby").val()}));
}

function sendHobby() {
    stompClient.send("/topic/" + $("#channel").val() + "/hobby", {}, JSON.stringify({'hobby': $("#hobby").val()}));
}

function showGreeting(message) {
    $("#greetings").append('<tr><td style="color:green">' + message + "</td></tr>");
}

function treat(message) {
    $("#greetings").append('<tr><td style="color:red">' + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
    $( "#send2" ).click(function() { send(); });
});

