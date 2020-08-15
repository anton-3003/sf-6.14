const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let points = 0;
let lostPoints = 0;

let divSelector;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  $(".target").removeClass('target');
  
  setTimeout(removeMiss, 100);


  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером
  $(".target").text(hits+1);

  // FIXME: тут надо определять при первом клике firstHitTime
  // таймер запускается при клике на "начать игру"
  
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $("#wrapper").addClass('hidden');

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#points").text(points);
  $("#lostP").text(lostPoints);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  $(".target").text('');
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    points++;
    console.log($(event.target));
    round();

  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  else {
    $(event.target).addClass('miss');
    hits++;
    lostPoints++;
    console.log($(event.target));
    round();
  }

}      

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start-play").click(function(){
    round();
    $("#button-start-play").prop("disabled", true);
    firstHitTime = getTimestamp();
  });
  

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);

// время

function getTimestamp() {
  let d = new Date();
  return d.getTime();
}

// случайный квадрат

function randomDivId() {
  let d = Math.floor(Math.random() * 6) + 1;
  let n = Math.floor(Math.random() * 6) + 1;
  return `#slot-${d}${n}`;
}

function removeMiss() {
  $(".miss").removeClass('miss');
} 