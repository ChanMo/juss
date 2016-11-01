$("[data-modal-toggle]").bind("click", function(e){
  e.preventDefault();
  $(".modal-bg").toggle();
  if($(".modal").hasClass("modal-active")){
    $(".modal").toggleClass("modal-active");
    window.setTimeout(function(){
      $(".modal").hide();
    },400);
  }else{
    console.log('show');
    $(".modal").show();
    window.setTimeout(function(){
    $(".modal").toggleClass("modal-active");
    }, 0);
  };
});
