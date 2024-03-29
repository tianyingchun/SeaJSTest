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
      // give offset value used to adjust the positon of ddList when direction='left'. eg. 10 | -10
      this.offset=cfg.offset;
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
              $this.addClass(self.activeClass);

        			self.$ddList.css({ display: 'block', top:self.$topNav.height()}); 

              // Diff with of ddButtom and ddList
              var  ddListWidth=self.$ddList.width(),diffWidth=(ddListWidth>thisWidth)?(ddListWidth-thisWidth):0;
              // Make sure that the with of $ddList > with of $ddbutton 
              self.$ddList.css({width: (thisWidth>ddListWidth)?thisWidth:ddListWidth});
             
        			if(self.direction=="right"){
                  self.$ddList.addClass("d-right");
          				self.$ddList.css({left: $this.offset().left - self.$topNav.offset().left + self.offset});
        			}
        			else{
                  self.$ddList.addClass("d-left"); 
      				    self.$ddList.css({left: $this.offset().left - self.$topNav.offset().left-diffWidth + self.offset});
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
   * @param  {jquery object} $elems all jq object that  you want to trigger dropdown menu list.eg. $("#tnCommunity,#tnHelp");
   * @param  {object} options An object that can hold configuration
   *         eg.{ 
    	            listSelector:  ['#tnCommunityList', '#tnHelpList'],
  		            topNav: '#topNav',
  	            	activeClass: 'tn-active',
  	            	directions:[{offset:0,direction:'right'},{offset:20,direction:'left'}]
              	};
   * @return {void} 
   */
  exports.dropdownButton=function($elems,options){
      $elems.each(function(index){
           var $thisBtn = $(this), $thisList = $(options.listSelector[index]), $topNav = $(options.topNav);
           var directions=options.directions?options.directions:[];
           var _direction='right',_offset=0; 
           if(directions[index] && directions[index].direction){
               _direction=directions[index].direction;
               _offset=directions[index].offset;
           } 
           if ($thisList.length) {
              var newOpts=$.extend({},options,{ list: $thisList, topNav: $topNav,direction:_direction,offset:_offset});
              new DropdownButton($thisBtn,newOpts).init();
           }
      });
  };
  // module.exports=DropdownButton.
});
