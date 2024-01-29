"use strict";

window.addEventListener("DOMContentLoaded", start)

const images = ["Bretta_Circle.jpg", "Cloth_Circle-2.jpg", "Cornifer_Circle.jpg", "Divine_Circle.jpg", "Dung_Defender_Circle.jpg", "Godseeker_Cirle.jpg", "Grimm_Circle.jpg", "Hornet_Icon.jpg", "Iselda_Circle.jpg", "Jiji_Circle.jpg", "Nailsmith_Circle.jpg", "Quirrel_Circle-2.jpg", "Salubra_Circle.jpg", "Seer_Circle.jpg", "Snail_Shaman_Circle.jpg", "Stag_Circle.jpg", "Unnamed_Moth_Circle.jpg", "Zote_Circle-2.jpg"];
const CARDS_ON_BOARD = 18;
const elements = document.querySelectorAll(".card");
let selectedCard = null;
let tries = 0;
let matches = 0;


function start() {
    console.log("Javascript kører");
    initializeCards();
    makeCardsClickable();
    displayTries();
    displayMatches();
}

function initializeCards() {
    const numbers = [];

    for(let i = 0; i < CARDS_ON_BOARD / 2; i++){
        numbers[i] = i;
        numbers[i + CARDS_ON_BOARD / 2] = i;
    }
    console.log("Numbers: " + numbers);

    const cards = [];

    while (numbers.length > 0) {
        const random = Math.floor(Math.random() * numbers.length)
        cards.push(numbers[random]);
        numbers.splice(random, 1);
    }

    console.log("Cards: " + cards)

    displayCards(cards)
}


function displayCards(cards) {
    elements.forEach((element, index) => {
        element.dataset.image = cards[index];
        const image = element.querySelector("img");
        image.src = "images/" + images[cards[index]];
    });
}

function makeCardsClickable() {
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", (event) => clickCard(card))
    });
}

function clickCard(card) {


    
    if (card == selectedCard){
        return;
    }
    

    if (card.dataset.match) {
        return
    }

    if (selectedCard){

        tries++;

        card.classList.add("selected");
        const firstCard = selectedCard;
        const secondCard = card;

        console.log("Two cards selected");
        console.log(firstCard);
        console.log(secondCard);

        if (firstCard.dataset.image == secondCard.dataset.image) {
            console.log("It's a match!")

            matches++;

            firstCard.dataset.match = true;
            secondCard.dataset.match = true;
        } else {
            console.log("Sorry, no match... :(")
            setTimeout(() => {
                firstCard.classList.remove("selected");
                secondCard.classList.remove("selected");
            }, 500);
        }

        selectedCard = null;
    } else {
        card.classList.add("selected")
        selectedCard = card;
    }

    displayTries();
    displayMatches();

    if (matches == CARDS_ON_BOARD / 2){
        gameOver();
    }
}

function displayTries() {
    document.querySelector("#scores #tries span").textContent = tries;
}

function displayMatches() {
    document.querySelector("#scores #matches span").textContent = matches;
}

function gameOver(){
    console.log("Game Over");
    document.querySelector("#gameover").classList.remove("hide");
}