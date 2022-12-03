const body = $("body");
const preload = $(".preload");
const page = $(".page");
const retour = $(".retour");
const retourBtn = $(".retour span");

window.onload = () => {
    stopLoading();
};


// MODAL
const modal = $("#modal");
const openModal = $("#openModal");
const closeModal = $(".close");
openModal.click(() => {
    modal.css("display", "block");
});
closeModal.click(() => {
    modal.css("display", "none");
});
body.click((ev) => {
    if ($(this) == modal) {
        modal.css("display", "none");
    }

})
// PSEUDO



// SCROLL REVEAL 
// const sr = ScrollReveal({
//     distance: '60px',
//     interval: 50,
//     opacity: 0.9,
//     duration: 2000,
//     reset: true
// });
// window.sr = sr;
// sr.reveal(`.page`, { origin: 'left' });

// GAME
const online = $("#online");
online.click(async ev => {
    notiferror("Le mode online arrive bientôt !")
    // await loading();
    // window.location.href = "/online";
});

// const getPseudo = getCookie("pseudo");
// function verifId() {
//     const id = generateString(10);
//     if (!getCookie("id")) {
//         setCookie("id", id, 99999999999);
//     }
//     return getCookie("id") || id;
// }
// const id = verifId();
// let ps;
// if (getPseudo) ps = getPseudo;
// else ps = "Anonyme";

// if (body.hasClass("online")) {
//     //  PAS FINIT !!!!
//     retour.css("display", "block");
//     retourBtn.click(async ev => {
//         await loading();
//         window.location.href = "/"
//     });
//     const inputPseudo = $("#pseudo");
//     if (getPseudo) {
//         inputPseudo.val(getPseudo);
//     } else {
//         // inputPseudo.val(`Anonyme`);
//     };
//     const goPseudo = $("#goPseudo");
//     goPseudo.click(ev => {
//         const value = inputPseudo[0].value.trim();
//         if (!value || value == "") {
//             modal.css("display", "none");
//             return notiferror("Merci de taper un pseudo valide !");
//         };
//         setCookie("pseudo", value, 999999);
//         modal.css("display", "none");
//         notif("Pseudo enregistrer avec succès !");
//     });

//     const create = $("#create");
//     const goJoin = $("#goJoin");
//     goJoin.submit(ev => {
//         ev.preventDefault();

//         const input = $(`#room`)[0];
//         const value = input.value.trim();

//         $.ajax({
//             url: `/room/exist/${value}`,
//             method: "GET",
//             dataType: "json",
//         }).done(function (data) {
//             if (data.msg == "non") {
//                 notiferror("Room introuvable")
//             } else if (data.msg == "yes") {
//                 loading();
//                 window.location.href = `/room/play/${value}`
//             } else {
//                 notiferror("Une erreur est survenue.")
//             }
//         }).fail(function (error) {
//             console.log(JSON.stringify(error));
//             notiferror("Une erreur est survenue.")
//         })
//     });
//     create.click(async ev => {
//         await loading();
//         window.location.href = `/room/create`
//     })

// } else if (body.hasClass("room")) {
//     // OFF PAS FINIT !!!!!
//     retourBtn.click(async ev => {
//         await loading();
//         window.location.href = "/online"
//     });
//     //  BASE
//     retour.css("display", "block");
//     const roomId = window.location.href.split("play/")[1];
//     let move;

//     let obj = roomObj();
//     obj.then(roomObject => {
//         let gameObj, canvas, context, lowKeyPressed2, upKeyPressed2;

//         const rid = $("#roomid");
//         const listJoueur = $("#listjoueur");
//         const pss = $("#ps");
//         const dateu = $("#dateu");
//         const dated = $("#dated");
//         const countjoueur = $("#countjoueur");

//         rid.text(roomId);
//         dateu.text(roomObject.date.u)
//         dated.text(roomObject.date.d);

//         const players = roomObject.players;
//         const player1 = players[0];
//         const player2 = players[1];
//         if (!player1) {
//             window.location.href = "/online";
//         };
//         if (player1 && player2 && player1 != id && player2 != id) {
//             alert("Room complete");
//             window.location.href = "/online";
//         };
//         countjoueur.text(players.length)
//         let lequel;
//         if (id == player1.id) lequel = { p: `${player1.pseudo} [${player1.id}]`, n: 1 };
//         else if (player2 && player2.id == id) lequel = { p: `${player2.pseudo} [${player2.id}]`, n: 2 };
//         else if (!player2) lequel = { p: `${ps} [${id}]`, n: 2 };

//         let allPlayer;
//         if (player2 && player2.pseudo == player1.pseudo) allPlayer = `${player1.pseudo} 1 [CREATEUR], ${player2.pseudo} 2`;
//         else allPlayer = `${player1.pseudo} [CREATEUR]${!player2 ? "" : `, ${player2.pseudo}`} `;
//         // if (players.length <= 1 && player2) allPlayer += `<br><br> <center><strong>IL MANQUE UN JOUEUR POUR LANCER !</strong></center>`;
//         if (!lequel) {
//             window.location.href = "/online";
//         } else {
//             pss.text(lequel.p);
//             listJoueur.html(allPlayer);
//         }
//         // WEBSOCKET
//         const connection = new WebSocket('ws://localhost');
//         connection.onopen = function (e) {
//             console.log('Joining');

//             if (!move) {
//                 const obj = {
//                     roomId: roomId,
//                     type: "JOIN",
//                     p: ps,
//                     n: lequel.n,
//                     pId: id
//                 }
//                 connection.send(JSON.stringify(obj));
//                 move = true;

//             }
//         };
//         connection.onclose = function (message) {
//             alert("Disconnected, essayez de relancer la page");
//             window.location.href = "/online";
//             // console.log(message);
//             // connection.send(`${roomObject.id} | DISCONECT | ${ps} | ${lequel.n} | ${id}`);
//             // window.location.href = "/online";
//         };
//         connection.onerror = function (error) {
//             alert(`ERREUR: ${error}`);
//             window.location.href = "/online";
//         };
//         connection.onmessage = async function (message) {

//             function getData() { return new Promise((resolve, reject) => { resolve(JSON.parse(message.data)) }) };
//             const data = await getData();
//             const roomId = data.roomId;
//             const type = data.type;

//             if (type == "JOIN") {
//                 const pseudo = data.p;
//                 allPlayer = allPlayer + `, ${pseudo}`;
//                 listJoueur.html(allPlayer);
//             } else if (type == "DISCONECT") {
//                 const pseud = data.p;
//                 const number = data.n;

//                 if (number == 1) {
//                     connection.send(`${roomId} | DISCONECT | ${ps} | ${lequel.n} | ${id}`);
//                     window.location.href = "/online";
//                 } else if (number == 2) {
//                     allPlayer = allPlayer.replace(`, ${pseud}`, "");
//                     listJoueur.html(allPlayer);
//                 }
//             } else if (type == "NOTIFSUCCES") {
//                 const c = data.c;
//                 notif(c)
//             } else if (type == "NOTIFERROR") {
//                 const c = data.c;
//                 notiferror(c)
//             }

//             if (type == "EDITGAMEOBJ") {
//                 const g0 = data.gO;
//                 gameObj = g0
//             };

//             if (type == "MOVE") {
//                 const moveType = data.moveType;
//                 const falseTrue = data.falseTrue;
//                 if (moveType == "UP") {
//                     upKeyPressed2 = falseTrue == "TRUE" ? true : false;
//                 } else if (moveType == "DOWN") {
//                     lowKeyPressed2 = falseTrue == "TRUE" ? true : false;
//                 }
//             }
//             if (type == "GO") {
//                 const game = $("#game");
//                 gameObj = roomObject.gameObj;
//                 console.log(gameObj);
//                 go();

//                 async function go() {
//                     canvas = document.getElementById("game");
//                     context = canvas.getContext("2d");

//                     gameObj.player2X = canvas.width - gameObj.barWidth;
//                     gameObj.player2Y = (canvas.height - gameObj.barHeight) / 2;
//                     gameObj.playerY = (canvas.height - gameObj.barHeight) / 2;

//                     gameObj.baleX = canvas.width / 2;
//                     gameObj.baleY = canvas.height / 2;

//                     await setGameObj();
//                     game.css("display", "block");

//                     document.addEventListener('keyup', keyUp, false);
//                     document.addEventListener('keydown', keyDown, false);
//                     setInterval(gameLoop, 30);
//                 }




//                 function gameLoop() {
//                     if (gameObj.upKeyPressed != gameObj.lowKeyPressed) {
//                         if (gameObj.upKeyPressed) {
//                             if (gameObj.playerY > 0) {
//                                 gameObj.playerY -= gameObj.speedPlayer;
//                             }
//                         } else {
//                             if (gameObj.playerY < (canvas.height - gameObj.barHeight)) {
//                                 gameObj.playerY += gameObj.speedPlayer;
//                             }
//                         }
//                     };
//                     if (upKeyPressed2 != lowKeyPressed2) {
//                         if (upKeyPressed2) {
//                             if (gameObj.player2Y > 0) {
//                                 console.log(1);
//                                 gameObj.player2Y -= gameObj.speedPlayer;
//                             }
//                         } else {
//                             if (gameObj.player2Y < (canvas.height - gameObj.barHeight)) {
//                                 gameObj.player2Y += gameObj.speedPlayer;
//                             }
//                         }
//                     };

//                     if (gameObj.balTime <= 0) {
//                         if ((gameObj.baleX - gameObj.baleSpeed) <= (gameObj.playerX + gameObj.barWidth)) {
//                             if ((gameObj.baleY + gameObj.baleSpeed > gameObj.playerY) && (gameObj.baleY - gameObj.baleSpeed < gameObj.playerY + gameObj.barHeight)) {
//                                 gameObj.baleDir = true;
//                                 if (gameObj.upKeyPressed) {
//                                     gameObj.baleAngulo = Math.floor(Math.random() * 10) - 9;
//                                 } else {
//                                     gameObj.baleAngulo = Math.floor((Math.random() * 10));
//                                 }
//                             }
//                         } else if ((gameObj.baleX + gameObj.baleSpeed) >= gameObj.player2X) {
//                             if ((gameObj.baleY + gameObj.baleSpeed > gameObj.player2Y) && (gameObj.baleY - gameObj.baleSpeed < gameObj.player2Y + gameObj.barHeight)) {
//                                 gameObj.baleDir = false;
//                                 if (gameObj.player2Cima) {
//                                     gameObj.baleAngulo = Math.floor(Math.random() * 10) - 9;
//                                 } else {
//                                     gameObj.baleAngulo = Math.floor((Math.random() * 10));
//                                 }
//                             }
//                         };

//                         if ((gameObj.baleY - gameObj.baleSpeed <= 0) || (gameObj.baleY + gameObj.baleSpeed > canvas.height)) {
//                             gameObj.baleAngulo = gameObj.baleAngulo * -1;
//                         };

//                         gameObj.baleY += gameObj.baleAngulo;

//                         if (gameObj.baleDir) {
//                             gameObj.baleX += gameObj.balespeed;
//                         } else {
//                             gameObj.baleX -= gameObj.balespeed;
//                         }
//                     }

//                     if ((gameObj.baleX <= -gameObj.baleSpeed) || (gameObj.baleX > canvas.width)) {
//                         if (gameObj.balTime >= 50) {
//                             let win;
//                             if (gameObj.baleX <= -gameObj.baleSpeed) {
//                                 gameObj.scoreOrdi++;
//                                 win = false;
//                             } else {
//                                 gameObj.scorePlayer++;
//                                 win = true;
//                             }

//                             gameObj.baleX = canvas.width / 2;
//                             gameObj.baleY = canvas.height / 2;
//                             gameObj.baleDir = win;
//                             gameObj.baleAngulo = Math.floor(Math.random() * 21) - 10;
//                             gameObj.balTime = 0;
//                         } else {
//                             gameObj.balTime++;
//                         }
//                     };

//                     context.clearRect(0, 0, canvas.width, canvas.height);

//                     context.fillRect(gameObj.playerX, gameObj.playerY, gameObj.barWidth, gameObj.barHeight);
//                     context.fillRect(gameObj.player2X, gameObj.player2Y, gameObj.barWidth, gameObj.barHeight);

//                     context.beginPath();
//                     context.arc(gameObj.baleX, gameObj.baleY, gameObj.baleSpeed, 0, Math.PI * 2, true);
//                     context.closePath();
//                     context.fill();

//                     const scoreA = String(gameObj.scorePlayer).padStart(2, '0');
//                     const scoreB = String(gameObj.scoreOrdi).padStart(2, '0');


//                     // if (scoreA < 10) {
//                     //     scoreA = "0" + scoreA;
//                     // }
//                     // if (scoreB < 10) {
//                     //     scoreB = "0" + scoreB;
//                     // }

//                     context.font = "42pt Helvetica";
//                     context.fillStyle = "#fff";
//                     context.fillText(scoreA + " " + scoreB, (canvas.width / 2) - 70, 50);

//                     context.beginPath();
//                     context.moveTo(canvas.width / 2, 0);
//                     context.lineTo(canvas.width / 2, canvas.height);
//                     context.strokeStyle = "#fff";
//                     context.stroke();
//                     context.closePath();
//                     setGameObj()
//                 }
//                 async function keyDown(e) {
//                     const obj = {
//                         roomId: roomId,
//                         type: "MOVE",
//                         moveType: "DOWN",
//                         n: lequel.n
//                     };
//                     if (e.keyCode == 38) { // up
//                         gameObj.upKeyPressed = true;
//                         await setGameObj()
//                         obj.falseTrue = "TRUE";
//                         connection.send(JSON.stringify(obj));
//                     }
//                     else if (e.keyCode == 40) { // down
//                         gameObj.lowKeyPressed = true;
//                         await setGameObj()
//                         obj.falseTrue = "FALSE";
//                         connection.send(JSON.stringify(obj));
//                     }
//                 }

//                 async function keyUp(e) {
//                     const obj = {
//                         roomId: roomId,
//                         type: "MOVE",
//                         moveType: "UP",
//                         n: lequel.n
//                     };
//                     if (e.keyCode == 38) { // up
//                         gameObj.upKeyPressed = false;
//                         await setGameObj();
//                         obj.falseTrue = "TRUE";
//                         connection.send(JSON.stringify(obj));
//                         connection.send(`${roomObject.id} | MOVE | UP | TRUE | ${lequel.n}`);
//                     }
//                     else if (e.keyCode == 40) { // down
//                         gameObj.lowKeyPressed = false;
//                         await setGameObj();
//                         obj.falseTrue = "FALSE";
//                         connection.send(JSON.stringify(obj));
//                         connection.send(`${roomObject.id} | MOVE | UP | FALSE | ${lequel.n}`);
//                     }
//                 }

//                 async function setGameObj() {
//                     console.log(1, gameObj);
//                     const objR = {
//                         roomId: roomId,
//                         type: "SETGAMEOBJ",
//                         new: gameObj
//                     };
//                     connection.send(JSON.stringify(objR));
//                     const newObj = await roomObj();
//                     gameObj = newObj.gameObj;
//                     console.log(2, gameObj);
//                 }
//             }

//         };


//         //   
//     })

//     // --
//     function roomObj() {
//         const promise = new Promise((resolve, reject) => {
//             $.ajax({
//                 url: `/room/exist/${roomId}`,
//                 method: "GET",
//                 dataType: "json",
//             }).done(function (data) {
//                 if (data.msg == "non") {
//                     reject({ err: "Aucune room" })
//                     notiferror("Room introuvable");
//                 } else if (data.msg == "yes") {
//                     resolve(data.r)
//                 } else {
//                     reject({ err: "Une erreur inconue" })
//                     notiferror("Une erreur est survenue.")
//                 }

//             }).fail(function (error) {
//                 const err = JSON.stringify(error);
//                 console.log(err);
//                 reject({ err: err })
//                 notiferror("Une erreur est survenue.")
//             });
//         });
//         return promise;
//     }


// } else {

    const pc = $("#pc");
    const v2 = $("#v2");
    const game = $("#game");

    const all = [pc, v2, online, game];
    pc.click(async ev => {
        await loading();
        all.forEach(e => e.css("display", "none"));
        game.css("display", "block");
        retour.css("display", "block");
        retourBtn.click(async ev => {
            await loading();
            location.reload();
        });
        await goOrdinateur();
        stopLoading()
    });
    v2.click(async ev => {
        await loading();
        all.forEach(e => e.css("display", "none"));
        game.css("display", "block");
        retour.css("display", "block");
        retourBtn.click(async ev => {
            await loading();
            location.reload();
        });
        await go2v2();
        stopLoading()
    });
// }


// FUNCTION

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function loading() {
    preload.css("display", "block");
    page.css("display", "none");
}
function stopLoading() {
    preload.css("display", "none");
    page.css("display", "block");
}

function notif(content) {
    const toast = document.querySelector(".toast"),
        progress = document.querySelector(".toast .progress");

    $(".text-2").text(content);
    toast.style.display = "block";

    setTimeout(() => {

        let timer1, timer2;

        toast.classList.add("active");
        progress.classList.add("active");

        timer1 = setTimeout(() => {
            toast.classList.remove("active");
        }, 5000); //1s = 1000 milliseconds

        timer2 = setTimeout(() => {
            progress.classList.remove("active");
            toast.style.display = "none";
        }, 5300);

        $("#closetoastsucces").click(() => {
            toast.classList.remove("active");

            setTimeout(() => {
                progress.classList.remove("active");
                toast.style.display = "none";
            }, 300);

            clearTimeout(timer1);
            clearTimeout(timer2);
        });
    }, 15)
};
function notiferror(content) {
    const toast = document.querySelector(".toasterror"),
        progress = document.querySelector(".toasterror .progress");
    toast.style.display = "block";
    $(".text-4").text(content);
    setTimeout(() => {
        let timer1, timer2;

        toast.classList.add("active");
        progress.classList.add("active");

        timer1 = setTimeout(() => {
            toast.classList.remove("active");
        }, 5000); //1s = 1000 milliseconds

        timer2 = setTimeout(() => {
            progress.classList.remove("active");
            toast.style.display = "none";
        }, 5300);

        $("#closetoasterror").click(() => {
            toast.classList.remove("active");

            setTimeout(() => {
                progress.classList.remove("active");
                toast.style.display = "none";
            }, 300);

            clearTimeout(timer1);
            clearTimeout(timer2);
        });
    }, 15)
};
function goOrdinateur() {
    let canvas, context, barWidth, barHeight, playerX, playerY, upKeyPressed, lowKeyPressed, ordiX,
        ordiY, ordiCima, baleSpeed, baleX, baleY, baleDir, baleAngulo, balTime,
        speedPlayer, ordiSpeed, balespeed, scorePlayer, scoreOrdi;

    canvas = document.getElementById("game");
    context = canvas.getContext("2d");

    barWidth = 30;
    barHeight = 90;
    playerX = 0;
    playerY = (canvas.height - barHeight) / 2;
    upKeyPressed = false;
    lowKeyPressed = false;
    ordiX = canvas.width - barWidth;
    ordiY = 0;
    ordiCima = false;
    baleSpeed = 10;
    baleX = canvas.width / 2;
    baleY = canvas.height / 2;
    baleDir = false;
    baleAngulo = Math.floor(Math.random() * 21) - 10;
    balTime = 0;
    speedPlayer = 15;
    ordiSpeed = 20;
    balespeed = 12;
    scorePlayer = 0;
    scoreOrdi = 0;

    document.addEventListener('keyup', keyUp, false);
    document.addEventListener('keydown', keyDown, false);
    setInterval(gameLoop, 30);

    function keyDown(e) {


        if (e.keyCode == 38) { // up
            upKeyPressed = true;
        }
        else if (e.keyCode == 40) { // down
            lowKeyPressed = true;
        }
    }

    function keyUp(e) {
        if (e.keyCode == 38) { // up
            upKeyPressed = false;
        }
        else if (e.keyCode == 40) { // down
            lowKeyPressed = false;
        }
    }

    function gameLoop() {
        if (upKeyPressed != lowKeyPressed) {
            if (upKeyPressed) {
                if (playerY > 0) {
                    playerY -= speedPlayer;
                }
            } else {
                if (playerY < (canvas.height - barHeight)) {
                    playerY += speedPlayer;
                }
            }
        };

        if (ordiCima) {
            ordiY -= ordiSpeed;
            if (ordiY <= 0) {
                ordiCima = false;
            }
        } else {
            ordiY += ordiSpeed;
            if (ordiY >= canvas.height - barHeight) {
                ordiCima = true;
            }
        };

        if (balTime <= 0) {
            if ((baleX - baleSpeed) <= (playerX + barWidth)) {
                if ((baleY + baleSpeed > playerY) && (baleY - baleSpeed < playerY + barHeight)) {
                    baleDir = true;
                    if (upKeyPressed) {
                        baleAngulo = Math.floor(Math.random() * 10) - 9;
                    } else {
                        baleAngulo = Math.floor((Math.random() * 10));
                    }
                }
            } else if ((baleX + baleSpeed) >= ordiX) {
                if ((baleY + baleSpeed > ordiY) && (baleY - baleSpeed < ordiY + barHeight)) {
                    baleDir = false;
                    if (ordiCima) {
                        baleAngulo = Math.floor(Math.random() * 10) - 9;
                    } else {
                        baleAngulo = Math.floor((Math.random() * 10));
                    }
                }
            };

            if ((baleY - baleSpeed <= 0) || (baleY + baleSpeed > canvas.height)) {
                baleAngulo = baleAngulo * -1;
            };

            baleY += baleAngulo;

            if (baleDir) {
                baleX += balespeed;
            } else {
                baleX -= balespeed;
            }
        }

        if ((baleX <= -baleSpeed) || (baleX > canvas.width)) {
            if (balTime >= 50) {
                if (baleX <= -baleSpeed) {
                    scoreOrdi++;
                } else {
                    scorePlayer++;
                }

                baleX = canvas.width / 2;
                baleY = canvas.height / 2;
                baleDir = false;
                baleAngulo = Math.floor(Math.random() * 21) - 10;
                balTime = 0;
            } else {
                balTime++;
            }
        };

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillRect(playerX, playerY, barWidth, barHeight);
        context.fillRect(ordiX, ordiY, barWidth, barHeight);

        context.beginPath();
        context.arc(baleX, baleY, baleSpeed, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        const scoreA = String(scorePlayer).padStart(2, '0');
        const scoreB = String(scoreOrdi).padStart(2, '0');


        // if (scoreA < 10) {
        //     scoreA = "0" + scoreA;
        // }
        // if (scoreB < 10) {
        //     scoreB = "0" + scoreB;
        // }

        context.font = "42pt Helvetica";
        context.fillStyle = "#fff";
        context.fillText(scoreA + " " + scoreB, (canvas.width / 2) - 70, 50);

        context.beginPath();
        context.moveTo(canvas.width / 2, 0);
        context.lineTo(canvas.width / 2, canvas.height);
        context.strokeStyle = "#fff";
        context.stroke();
        context.closePath();
    }

}
function go2v2() {
    let canvas, context, barWidth, barHeight, playerX, playerY, upKeyPressed, lowKeyPressed, upKeyPressed2, lowKeyPressed2, player2X,
        player2Y, player2Cima, baleSpeed, baleX, baleY, baleDir, baleAngulo, balTime,
        speedPlayer, player2Speed, balespeed, scorePlayer, scoreOrdi;

    canvas = document.getElementById("game");
    context = canvas.getContext("2d");

    barWidth = 30;
    barHeight = 90;
    playerX = 0;
    playerY = (canvas.height - barHeight) / 2;
    upKeyPressed = false;
    lowKeyPressed = false;

    baleSpeed = 10;
    baleX = canvas.width / 2;
    baleY = canvas.height / 2;
    baleDir = false;
    baleAngulo = Math.floor(Math.random() * 21) - 10;
    balTime = 0;
    speedPlayer = 15;

    player2X = canvas.width - barWidth;
    player2Y = (canvas.height - barHeight) / 2;

    player2Cima = false;
    balespeed = 12;
    scorePlayer = 0;
    scoreOrdi = 0;

    document.addEventListener('keyup', keyUp, false);
    document.addEventListener('keydown', keyDown, false);
    setInterval(gameLoop, 30);

    function keyDown(e) {
        if (e.keyCode == 90) { // z
            upKeyPressed2 = true;
        }
        else if (e.keyCode == 83) { // s
            lowKeyPressed2 = true;
        }

        if (e.keyCode == 38) { // up
            upKeyPressed = true;
        }
        else if (e.keyCode == 40) { // down
            lowKeyPressed = true;
        }
    }

    function keyUp(e) {
        if (e.keyCode == 90) { // z
            upKeyPressed2 = false;
        }
        else if (e.keyCode == 83) { // s
            lowKeyPressed2 = false;
        }

        if (e.keyCode == 38) { // up
            upKeyPressed = false;
        }
        else if (e.keyCode == 40) { // down
            lowKeyPressed = false;
        }
    }

    function gameLoop() {
        if (upKeyPressed != lowKeyPressed) {
            if (upKeyPressed) {
                if (playerY > 0) {
                    playerY -= speedPlayer;
                }
            } else {
                if (playerY < (canvas.height - barHeight)) {
                    playerY += speedPlayer;
                }
            }
        };
        if (upKeyPressed2 != lowKeyPressed2) {
            if (upKeyPressed2) {
                if (player2Y > 0) {
                    player2Y -= speedPlayer;
                }
            } else {
                if (player2Y < (canvas.height - barHeight)) {
                    player2Y += speedPlayer;
                }
            }
        };


        if (balTime <= 0) {
            if ((baleX - baleSpeed) <= (playerX + barWidth)) {
                if ((baleY + baleSpeed > playerY) && (baleY - baleSpeed < playerY + barHeight)) {
                    baleDir = true;
                    if (upKeyPressed) {
                        baleAngulo = Math.floor(Math.random() * 10) - 9;
                    } else {
                        baleAngulo = Math.floor((Math.random() * 10));
                    }
                }
            } else if ((baleX + baleSpeed) >= player2X) {
                if ((baleY + baleSpeed > player2Y) && (baleY - baleSpeed < player2Y + barHeight)) {
                    baleDir = false;
                    if (player2Cima) {
                        baleAngulo = Math.floor(Math.random() * 10) - 9;
                    } else {
                        baleAngulo = Math.floor((Math.random() * 10));
                    }
                }
            };

            if ((baleY - baleSpeed <= 0) || (baleY + baleSpeed > canvas.height)) {
                baleAngulo = baleAngulo * -1;
            };

            baleY += baleAngulo;

            if (baleDir) {
                baleX += balespeed;
            } else {
                baleX -= balespeed;
            }
        }

        if ((baleX <= -baleSpeed) || (baleX > canvas.width)) {
            if (balTime >= 50) {
                let win;
                if (baleX <= -baleSpeed) {
                    scoreOrdi++;
                    win = false;
                } else {
                    scorePlayer++;
                    win = true;
                }

                baleX = canvas.width / 2;
                baleY = canvas.height / 2;
                baleDir = win;
                baleAngulo = Math.floor(Math.random() * 21) - 10;
                balTime = 0;
            } else {
                balTime++;
            }
        };

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillRect(playerX, playerY, barWidth, barHeight);
        context.fillRect(player2X, player2Y, barWidth, barHeight);

        context.beginPath();
        context.arc(baleX, baleY, baleSpeed, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        const scoreA = String(scorePlayer).padStart(2, '0');
        const scoreB = String(scoreOrdi).padStart(2, '0');


        // if (scoreA < 10) {
        //     scoreA = "0" + scoreA;
        // }
        // if (scoreB < 10) {
        //     scoreB = "0" + scoreB;
        // }

        context.font = "42pt Helvetica";
        context.fillStyle = "#fff";
        context.fillText(scoreA + " " + scoreB, (canvas.width / 2) - 70, 50);

        context.beginPath();
        context.moveTo(canvas.width / 2, 0);
        context.lineTo(canvas.width / 2, canvas.height);
        context.strokeStyle = "#fff";
        context.stroke();
        context.closePath();
    }

}
function generateString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    };
    return result.trim();
}
