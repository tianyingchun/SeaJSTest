define(function(require){
	var dropdownButton=require("./dropdownbutton");
	var $=require("jquery");
	var $elems= $("#tnCommunity,#tnHelp");
	var options={ 
		listSelector:  ['#tnCommunityList', '#tnHelpList'],
		topNav: '#topNav',
		activeClass: 'tn-active',
		directions:[{offset:0,direction:'right'},{offset:20,direction:'left'}]
	};
	dropdownButton.dropdownButton($elems,options); 
})