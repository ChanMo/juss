/**
 * Slide
 * base on jquery, jquery-swipe
 * @date 28/12/16 16:31:11
 * @author chen
 * @email chen.orange@aliyun.com
 */

/** set width **/
var slide_width = parseInt($(".slide").css("width"));
var slide_count = $(".slide__main li").length;
var slide_timer;
var slide_auto_enable = $(".slide").data("auto"); // auto enabled
var slide_time = $(".slide").data("time");
slide_time = (slide_time) ? slide_time : 3000;

$(".slide__main").css({
  "width":slide_count*slide_width,"margin-left":-1*slide_width
});
$(".slide__main li").css({"width":slide_width});

/** set circle **/
/** set init **/
if(slide_count > 1){
  $(".slide__main").prepend($(".slide__main li:last-child"));
}

slide_auto();

function slide_auto(){
  if(slide_auto_enable){
    slide_timer = setInterval(function(){
      slide_to_left();
    }, slide_time);
  }
}

/** swipe event **/
$(".slide__main").swipe({
  fallbackToMouseEvents: false,
  allowPageScroll: "vertical",
  swipe:function(event, direction){
    if(direction == 'left'){
      clearInterval(slide_timer);
      slide_to_left();
      slide_auto();
    }else if(direction == 'right'){
      clearInterval(slide_timer);
      slide_to_right();
      slide_auto();
    }else{
      return false;
    }
  }
});

/** click event **/
$(".slide__action_left").bind("click", function(e){
  e.preventDefault();
  clearInterval(slide_timer);
  slide_to_right();
  slide_auto();
});
$(".slide__action_right").bind("click", function(e){
  e.preventDefault();
  clearInterval(slide_timer);
  slide_to_left();
  slide_auto();
});

function slide_to_left() {
  var slide = $(".slide__main");
  var nav = $(".slide__nav");
  var width = slide.find("li").width();
  var item = slide.find("li:first-child");
  slide.animate({left:-width}, 1000, function(){
    slide.append(item);
    slide.css({left:''});
    nav.prepend(nav.find("li:last-child"));
  });
}

function slide_to_right(){
  var slide = $(".slide__main");
  var nav = $(".slide__nav");
  var width = slide.find("li").width();
  var item = slide.find("li:last-child");
  slide.animate({left:+width}, 1000, function(){
    slide.prepend(item);
    slide.css({left:''});
    nav.append(nav.find("li:first-child"));
  });
}
