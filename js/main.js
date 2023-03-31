// Copyright 2023 zhouxinliang
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

let leftScore = 0;
let rightScore = 0;

let round = 0;

const rollDelay = 1500;

function calcResult(){
    if(leftScore > rightScore){
        $('#result').attr('src', './imgs/tom_win.png');
    }else if (leftScore == rightScore){
        $('#result').attr('src', './imgs/draw.png');
    }else{
        $('#result').attr('src', './imgs/jerry_win.png');
    }
    $('#result').css('display', "flex");
    $('.block').css("display", "none");
    $('#roll').attr("disabled", true);
    $('#rules').css("display", "none");
}

function reset(){
    round = 0;
    leftScore = 0;
    rightScore = 0;
    $('#leftScore').html(`${leftScore}`);
    $('#rightScore').html(`${rightScore}`);
    $('#roll').attr("disabled", false);
    $('#result').css('display', "none");
    $('.block').css("display", "flex");
    $('#rules').css("display", "flex");
    $('#add_score_left').css('display', 'none');
    $('#add_score_right').css('display', 'none');
}

function updateDices(left1, left2, right1, right2){

    $('#leftDice1').attr('src', `./imgs/dice_gif/${left1}.gif`);
    $('#leftDice2').attr('src', `./imgs/dice_gif/${left2}.gif`);
    $('#rightDice1').attr('src', `./imgs/dice_gif/${right1}.gif`);
    $('#rightDice2').attr('src', `./imgs/dice_gif/${right2}.gif`);

}

function oneTimeScore(dice1, dice2){
    if(dice1 == 1 || dice2 == 1){
        return 0;
    }else if(dice1 == dice2){
        return 4 * dice1;
    }else {
        return dice1 + dice2
    }
}

$('#roll').click(function (e) { 
    $('#add_score_left').css('display', 'none');
    $('#add_score_right').css('display', 'none');
    //remove color of #add_score_left
    $('#add_score_left').css('color', '');
    $('#add_score_right').css('color', '');
    $('#roll').attr('disabled', true);
    round += 1;
    console.log(`round=${round}`);
    let leftDice1  = Math.floor(Math.random() * 6) + 1;;
    let leftDice2  = Math.floor(Math.random() * 6) + 1;;
    let rightDice1 = Math.floor(Math.random() * 6) + 1;;
    let rightDice2 = Math.floor(Math.random() * 6) + 1;;
    leftScoreAdd = oneTimeScore(leftDice1,leftDice2);
    rightScoreAdd = oneTimeScore(rightDice1,rightDice2);
    $('#add_score_left').html(`+${leftScoreAdd}`);
    $('#add_score_right').html(`+${rightScoreAdd}`);
    leftScore += leftScoreAdd;
    rightScore += rightScoreAdd;
    updateDices(leftDice1, leftDice2, rightDice1, rightDice2);
    setTimeout(function(){
        $('#leftScore').html(`${leftScore}`);
        $('#rightScore').html(`${rightScore}`);
        $('#roll').attr('disabled', false);
        if(leftScoreAdd == 0){
            $('#add_score_left').css('color', 'red');
            $('#add_score_left').stop().fadeIn(500);
        }else if(leftDice1 == leftDice2){
            $('#add_score_left').css('color', 'green');
            $('#add_score_left').stop().fadeIn(100).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(1);
        }else{
            $('#add_score_left').stop().fadeIn(500);
        }
        if(rightScoreAdd == 0){
            $('#add_score_right').css('color', 'red');
            $('#add_score_right').stop().fadeIn(500);
        }else if(rightDice1 == rightDice2){
            $('#add_score_right').css('color', 'green');
            $('#add_score_right').stop().fadeIn(100).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(1);
        }else{
            $('#add_score_right').stop().fadeIn(500);
        }
        
        $('#add_score_right').stop().fadeIn(500);
        if(round == 3){
            setTimeout(function(){
                calcResult();
            },1000);
            console.log('show result');
        }
    }, rollDelay);
});

$('#reset').click(function (e) { 
    reset();
});

$('#rules').mouseenter(function () { 
    $('#rules_text').stop().fadeIn(500);
});

$('#rules').mouseleave(function () {     
    $('#rules_text').stop().fadeOut(500);
});