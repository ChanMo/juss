var slide_startX;
var slide_startY;
var slide_dist;

/** set width **/
var slide_width = parseInt($(".slide").css("width"));
console.log(slide_width);
var slide_count = $(".slide__main li").length;
$(".slide__main").css({"width":slide_count*slide_width,"margin-left":-1*slide_width});
$(".slide__main li").css({"width":slide_width});

/** set init **/
$(".slide__main").prepend($(".slide__main li:last-child"));

/** start **/
$(".slide__main").bind("touchstart", function(e){
  var obj = e.changedTouches[0];
  slide_startX = obj.pageX;
  //slide_startY = obj.pageY;
  e.preventDefault();
}).bind("touchmove", function(e){
  e.preventDefault();
}).bind("touchend", function(e){
  var obj = e.changedTouches[0];
  slide_dist = obj.pageX - slide_startX;
  //slide_distY = obj.pageY - slide_startY;
  if(slide_dist > 50){
    slide_to_right();
  }else if(slide_dist < -50){
    slide_to_left();
  }
  e.preventDefault();
});

$(".slide__action_left").bind("click", function(e){
  e.preventDefault();
  slide_to_right();
});
$(".slide__action_right").bind("click", function(e){
  e.preventDefault();
  slide_to_left();
});

function slide_to_left() {
  console.log('to_left');
  var slide = $(".slide__main");
  var nav = $(".slide__nav");
  var width = slide.find("li").width();
  console.log(width);
  var item = slide.find("li:first-child");
  slide.animate({left:-width}, 1000, function(){
    slide.append(item);
    slide.css({left:''});
    nav.prepend(nav.find("li:last-child"));
  });
}

function slide_to_right(){
  console.log('to_right');
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
