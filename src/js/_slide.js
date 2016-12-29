/**
 * Slide
 * http://github.com/ChanMo/juss.git
 *
 * @version 2.0.0
 * @date 28/12/16 16:31:11
 * @author chen
 * @email chen.orange@aliyun.com
 *
 * Example useage:
 * $("#slide").slide({
 *   auto: true,
 *   time: 2000
 * });
 *
 */

// plugin constructor
var Slide = function(elements, subjects, options){
  this.elements = elements;
  this.subjects = subjects;
  this.width;
  this.timer;
  this.options = jQuery.extend({}, this.defaults, options);
  this.attach();
};

// plugin prototype
Slide.prototype = {
  defaults: {
    auto: 'true',
    time: 3000
  },

  // main
  attach:function(){
    var self = this;
    var width = parseInt($(self.elements).css("width"));
    this.width = width;
    var count = $(self.elements).find("li").length;
    var list = $(self.elements).find(".slide__main");
    var nav = $(self.elements).find(".slide__nav");

    /** set css **/
    list.css({"width":count*width,"margin-left":-1*width});
    list.find("li").css({"width":width});
    list.prepend(list.find("li:last-child"));

    self.bindAction();
    self.bindSwipe();
    self.slideAuto();
  },

  // bind swipe
  bindSwipe: function(){
    var self = this;
    var list = $(self.elements).find(".slide__main");
		var lastX;

		list.on("touchstart", function(e){
      lastX = e.changedTouches[0].pageX;
		});
		list.on("touchend", function(e){
      currentX = e.changedTouches[0].pageX;
      distX = currentX - lastX;
      if(Math.abs(distX) >= 150){
        clearInterval(self.timer);
        if(distX < 0){
          self.slideToLeft();
        }else{
          self.slideToRight();
        }
        self.slideAuto();
      }
		});
  },

  // bind action
  bindAction: function(){
    var self = this;
    $(self.elements).find(".slide__action_left").on("click", function(e){
      e.preventDefault();
      clearInterval(self.timer);
      self.slideToRight();
      self.slideAuto();
    });

    $(self.elements).find(".slide__action_right").on("click", function(e){
      e.preventDefault();
      clearInterval(self.timer);
      self.slideToLeft();
      self.slideAuto();
    });
  },


  // slide auto
  slideAuto: function(){
    var self = this;
    if(self.options['auto']){
      self.timer = setInterval(function(){
        self.slideToLeft();
      }, self.options['time']);
    }
  },

  // slide to left
  slideToLeft: function(){
    var self = this;
    var list = $(self.elements).find(".slide__main");
    var nav = $(self.elements).find(".slide__nav");
    list.animate({left:-self.width}, 1000, function(){
      list.append(list.find("li:first-child"));
      list.css({left:''});
      nav.prepend(nav.find("li:last-child"));
    });
  },

  // slide to right
  slideToRight: function(){
    var self = this;
    var list = $(self.elements).find(".slide__main");
    var nav = $(self.elements).find(".slide__nav");
    list.animate({left:+self.width}, 1000, function(){
      list.prepend(list.find("li:last-child"));
      list.css({left:''});
      nav.append(nav.find("li:first-child"));
    });
  }

}

jQuery.fn.slide = function(subjects, options){
  new Slide(this, jQuery(subjects), options);
  return this;
};
