$("[data-modal-toggle]").bind("click", function(e){
  e.preventDefault();
  $(".modal-bg").toggle();
  $(".modal").toggleClass("modal-active");
});
