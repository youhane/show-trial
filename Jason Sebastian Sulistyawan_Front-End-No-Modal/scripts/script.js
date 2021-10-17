const firebaseConfig = {
    apiKey: "AIzaSyBDhLoqwUMNeEvzNKIHwMCQIJ4cOF1KhE4",
    authDomain: "lnt-frontend-project.firebaseapp.com",
    projectId: "lnt-frontend-project",
    storageBucket: "lnt-frontend-project.appspot.com",
    messagingSenderId: "893747888192",
    appId: "1:893747888192:web:d5fc5c8a05b960bbfc9fa5",
    measurementId: "G-C603Q87CT7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var messages = [];

let messageCollection = db.collection("messages");

let phone = document.getElementById('telpon');
let message = document.getElementById('pesan');
let nama = document.getElementById('nama');
let email = document.getElementById('email');

let errPhone = document.getElementById('phone-err');
let errMsg = document.getElementById('msg-err');

let submitBtn = document.getElementById('submit');
let contactForm = document.getElementById('contactForm');

checkPhone = () => {
    if (phone.value.startsWith("08") && phone.value.length <= 14) {
        errPhone.classList.add('d-none');
        return true;
    } else {
        errPhone.classList.remove('d-none');
        return false;
    }
}

var wordCount = 0;

checkMessage = () => {
    wordCount = message.value.match(/(\w+)/g).length;
    if (wordCount >= 5 && wordCount <= 100) {
        errMsg.classList.add('d-none');
        return wordCount;
    } else {
        errMsg.classList.remove('d-none');
        return false;
    }
}

validateForm = () => {
    checkMessage();
    checkPhone();
    if (checkPhone && wordCount >= 5 && wordCount <= 100 && nama.value && email.value && checkMessage) {
        submitBtn.disabled = false;
    }
};

$(document).ready(() => {
    $(window).scroll(() => {
        if ($(this).scrollTop()) {
            $('#backToTop').fadeIn("fast");
        } else {
            $('#backToTop').fadeOut("fast");
        }
    });

    $("#backToTop").click(() => {
        $("html, body").animate({ scrollTop: 0 }, 300);
    });

    $('#thePic').click(() => {
        $('#itsme').slideToggle(400, () => {
            $('#itsme').addClass('peek');
        });
    });

    $('#contactForm').submit((event) => {
        event.preventDefault();
        const nama = $('#nama').val();
        const email = $('#email').val();
        const telpon = $('#telpon').val();
        const pesan = $('#pesan').val();
        let newMessage = {
            name: nama,
            email: email,
            phone: telpon,
            message: pesan,
        };

        $('#submit').addClass('d-none');
        $('#loading').removeClass('d-none');

        if (nama && email && pesan && telpon) {
            messageCollection.
                add(newMessage).
                then((response) => response.get())
                .then((response) => {
                    messages.push(response);
                    $('#successAlert').removeClass('d-none');

                    $('#nama').val('');
                    $('#email').val('');
                    $('#telpon').val('');
                    $('#pesan').val('');

                    setTimeout(() => {
                        $('#successAlert').addClass('d-none');
                    }, 5000);

                    $('#submit').removeClass('d-none');
                    $('#loading').addClass('d-none');
                    $("#submit").prop('disabled', true);
                })
        }
    });
});