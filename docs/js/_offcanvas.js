$("[data-off-canvas-toggle]").bind("click", function(e){
  e.preventDefault();
  var ele = $(".off-canvas");
  ele.toggleClass("off-canvas_active");
  ele.find(".off-canvas__bg").toggle();
});
