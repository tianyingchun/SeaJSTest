define(function(require, exports, module) {

  // Get dependency, only need jquery libaray.
  var $ = require('jquery');
  // The default configurations.
  var defaults={ activeClass: "tn-active", timeout: 60,direction:"right" };
  var DropdownButton=function($elem,options){
  	var cfg=$.extend({},defaults,options);
  	this.activeClass=cfg.activeClass;
  	this.timeout=cfg.timeout;
    // Top Nav Selector
  	this.$topNav=cfg.topNav;
  	this.$ddButton=$elem;
    // Pop List Selector
  	this.$ddList=cfg.list;
  	// indicate the ddList container left justify of ddButton. 
  	this.direction=cfg.direction;
  	return this;
  };
  DropdownButton.prototype={
  	init:function(){
  		// init timer of current Dropdownbutton instance.
  		this.timer=0;
  		// active
  		this.active();
  	},
  	active:function(){
  		var self=this;
  		self.$ddButton.bind("mouseenter",function(){ 

        var $this=$(this),thisWidth=$this.width();

  			if(self.timer)self.timer=clearTimeout(self.timer);
  			// Add mouseenter active class on ddbutton.
        $this.addClass(seft.activeClass);

  			self.$ddList.css({ display: 'block', top:self.$topNav.height()}); 

        // Diff with of ddButtom and ddList
        var  ddListWidth=self.$ddList.width(),diffWidth=(ddListWidth>thisWidth)?(ddListWidth-thisWidth):0;
        // Make sure that the with of $ddList > with of $ddbutton 
        self.$ddList.css({width: (thisWidth>ddListWidth)?thisWidth:ddListWidth});
       
  			if(seft.direction=="right"){
  				self.$ddList.css({left: $this.offset().left - self.$topNav.offset().left});
  			}
  			else{
				  self.$ddList.css({left: $this.offset().left - self.$topNav.offset().left-diffWidth});
  			} 
  		}).bind("mouseleave",function(){
           self.timer = setTimeout(function () {
              self.$ddButton.removeClass(self.activeClass);
              self.$ddList.css({ display: 'none' });
           }, self.timeout)
      });
      // bind mouseenter,mouseleave event with $ddlist.
      self.$ddList.bind("mouseenter",function(){
          if (self.timer)self.timer = clearTimeout(self.timer);
      }).bind("mouseleave",function(){
          self.timer = setTimeout(function () {
             self.$ddButton.removeClass(self.activeClass);
             self.$ddList.css({ display: 'none' });
          }, self.timeout);
      });
  	}
  };

  /**
   * Export an interface method
   * @param  {jquery object} $elems all jq object that  you want to trigger dropdown menu list.
   * @param  {object} options An object that can hold configuration
   *                           eg.{listSelector:['#ddbuttonList1','#ddbuttoList2'],topNav:'#topNav'}
   * @return {void} 
   */
  exports.dropdownButton=function($elems,options){
      $elems.each(function(index){
           var $thisBtn = $(this), $thisList = $(options.listSelector[index]), $topNav = $(options.topNav);
           if ($thisList.length) {
              new DropdownButton($thisBtn, { list: $thisList, topNav: $topNav }).init();
           }
      });
  };
  // module.exports=DropdownButton.
});