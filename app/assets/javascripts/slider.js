var colWidth = 220;
var colHeight = 124;
var colPadding = 20;
var animationActive = false;
(function($, window, undefined) {   
	$(function() {
        setSliderCSS();
        var colCount = getColNumber(colCount);
        handleArrows();
        
        $(".arrow-right").click(function(e) {
            animateSlider(slideRight(), e);
        });
        $(".arrow-left").click(function(e) {
            animateSlider(slideLeft(), e);
        });
        
        $(window).resize(function() {
            colCount = getColNumber(colCount);
            handleArrows();
        });
        
        $(".item").mouseenter(function() {
            $(this).children(".item-hover").hide().stop().fadeIn(600);
        }).mouseleave(function(){
            $(this).children(".item-hover").stop().fadeOut(600);
        });
    });
})(jQuery, window);

function getColNumber(prevColCount) {
    colCount = 6;
    if($(window).width() < 1520) {
        colCount = 5;
    }
    if($(window).width() < 1280) {
        colCount = 4;
    }
    if(colCount != prevColCount)
        drawCols(colCount - prevColCount);
    return colCount;
}

function setSliderCSS() {
    $(".slider-content").css("width", $(".slider-col").length * (colWidth + colPadding) + colWidth + "px");
    $(".slider-arrow").css("bottom", colHeight + colPadding * 0.5 - 20);
}

function drawCols(colCountDiff) {
    if(colCountDiff > 0) {
        if($(".slider-content").width() + parseInt($(".slider-content").css("left")) - $(".slider-inner").width() <= 0) {
            $(".slider-content").css("left", parseInt($(".slider-content").css("left")) + colCountDiff*(colWidth + colPadding) + "px");
        }
    }
}

function slideRight() {
    return parseInt($(".slider-content").css("left")) - Math.min($(".slider-inner").width() + colPadding, $(".slider-content").width() + parseInt($(".slider-content").css("left")) - $(".slider-inner").width()) + "px";
}
function slideLeft() {
    var slideVal = parseInt($(".slider-content").css("left")) + Math.min($(".slider-inner").width() + colPadding, -parseInt($(".slider-content").css("left")));
    if(-slideVal <= colWidth + colPadding) {
        slideVal = 0;
    }
    return slideVal + "px";
}

function animateSlider(leftVal, e) {
    e.preventDefault();
    if(animationActive) {
        return;
    }
    animationActive = true;
    $(".slider-content").animate({
        left: leftVal
    }, 1500, function(){ 
        animationActive = false; 
        handleArrows();
    });
}

function handleArrows() {
    if(parseInt($(".slider-content").css("left")) == 0) {
        $(".arrow-left").hide();
    }
    else {
        $(".arrow-left").show();
    }
    if(-parseInt($(".slider-content").css("left")) == $(".slider-content").width() - $(".slider-inner").width()) {
        $(".arrow-right").hide();
    }
    else {
        $(".arrow-right").show();
    }
}