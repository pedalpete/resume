var Resume = {
	Models: {},
    Views: {},
    Routers: {},
    Collections: {},
    init: function() {
  		this.render();
  	},
  	
	render: function(){

	var router = new Resume.Routers.Start;
        Backbone.history.start();
		
	}
  }


Resume.Routers.Start = Backbone.Router.extend({
	routes: {
		"resume": "resume",
		"recommendations/:name":"recommendations",
		"recommendations": "recommendations",
		"contact":"contact",
		"intro":"intro",
		"education":"education",
		"": "resume"
	},

	resume: function(){
		new Resume.Views.Resume();
		new Resume.Views.RelevantSkills();
		new Resume.Views.RecommendQuotes();
		this.location_hash();
	},
	recommendations: function(name){
		new Resume.Views.RecommendationsList();
		if(name==undefined){
			var letter = Resume.letters.first();
			
		} else {
			var letter = Resume.letters.get(name);
		}
		new Resume.Views.Recommendation_Letter({model: letter});
		new Resume.Views.InTheNews();

		this.location_hash();
	},

	contact: function(){
		new Resume.Views.Contact();
		new Resume.Views.InTheNews();
		this.location_hash();
	},

	intro: function(){
		new Resume.Views.Intro();
		new Resume.Views.InTheNews();
		this.location_hash();
	},

	education: function(){
		new Resume.Views.Education();
		this.location_hash();
	},
	location_hash: function(){
            $('.active').removeClass('active');
            if(location.hash==''){
            	location.hash='#resume';
            }

           $('a[href="'+location.hash.split('/')[0]+'"]').parent().addClass('active');
      }
	
});

Resume.Models.Job = Backbone.Model.extend({

});

Resume.Collections.Jobs = Backbone.Collection.extend({
	model: Resume.Models.Job

});

Resume.jobs = new Resume.Collections.Jobs([{"title":"Data Management Architect &amp; Developer", "company":"Bravo Busines Media", "dates":"6 Months - May 2011 to Oct 2011","description":"Gathered business requirements, and envisioned a solution to painstaking highly labour intensive data management system for online retailer. Delivered a web-based solution resulting in 75% reduction in processing time and considerable accuracy improvement. Very well received by employees and management."},
											{"title": "Founder & Developer", "company": "HearWhere & ZiFiMusic", "dates" : "3 Years, 7 Months - June 2007 to Dec 2010", "description": "Taught myself to code resulting in development of the world's largest concert database and search engine with more than 8 million concerts. Developed artists popularity alghorithm for recommending best touring artists by region. Developed high-availability API serving and licensed capabilities to Maxim magazines Blender.com, was considered by Playlist.com, Kazaa.com, MetroLyrics and more. Read what <a style='font-size:10pt;' target='new' href='http://techcrunch.com/hearwhere'>TechCrunch had to say</a>."},
											{"title":"Mobile Strategy Consultant, Product Manager", "company": "MusicIp", "dates":"7 Months - Oct 2005 to May 2006", "description":"Developed technology strategy and recommendations for placing acoustic matching technology on phones. Product Managed web-properties for licensee self-service, support, as well as critically acclaimed 'playground' music discovery web-app."},
											{"title": "Product Manager / Project Manager / Knowledge Architect", "company": "Intrawest", "dates": "1 Year, 9 Months - Oct 2001 to June 2003", "description":"Developed vision and managed development of cutting-edge company wide knowledge management system for company of 24,000. Vision and management of successful proof-of-concept development for company-wide HR review system."}]);


Resume.Views.Resume = Backbone.View.extend({
 el: 'div#main',
 initialize: function(){
 	$(this.el).empty();
 	this.render();
 },
 render: function(){
  	Resume.jobs.each(this.add);
 },

 add: function(job){
 
 	var template = _.template( $("#jobs_template").html(), job.attributes);
 	$('div#main').append(template);
 }
});


Resume.Models.Recommendation = Backbone.Model.extend({});
Resume.Collections.Recommendations = Backbone.Collection.extend({
	models: Resume.Models.Recommendation
});
Resume.Views.RecommendationsList = Backbone.View.extend({
	el: 'ul.nav-list',
	initialize: function(){
		$('hr',this.el).nextAll().remove();
		this.render();
	},
	render: function(){
		Resume.letters.each(this.add);
	
	},
	add: function(letter){

		$('ul.nav-list').append('<li><a href=#recommendations/'+letter.attributes.id+'>'+letter.attributes.from+'<br/>'+letter.attributes.position+'</li>');
	}
});
Resume.Views.Recommendation_Letter = Backbone.View.extend({
	el: 'div#main',
	initialize: function(){
		this.render();
	},
	render: function(){

		$(this.el).html(this.model.attributes.letter);
		// update the sidenav to show active letter
		$('a[href="#recommendations/'+this.model.attributes.id+'"]').parent().addClass('shown');
		
	}
});

Resume.letters = new Resume.Collections.Recommendations([{"id":"matthew_dunn","from":"Matthew Dunn", "position":"CIO - Intrawest Corp.",
		"letter":"<p>Several years ago an unsolicited proposal arrived at the office of the CIO for Intrawest Corporation. The proposal described an opportunity to improve the company’s already best-of-breed customer service in its resort operations business by making information assets already in existence accessible to employees.  I recall being struck in particular by two things.  One was the maturity of architectural vision in the proposal; the writer recognized that the product information in point-of-sale systems embodied critical definitions about the resort business at any point of time, and consequently that this information could and should provide a coherent basis for service information. The second thing was the approach: the writer, an employee at Copper Mountain resort in Colorado, had the vision to outline a problem and a solution that would benefit the company broadly.<p></p>As a result of that, Pete Field was brought to Intrawest’s corporate headquarter and asked to spearhead an enterprise knowledge platform project.  The purpose of this letter is to provide my positive perspective on Pete’s abilities and accomplishments on that project, and to offer to provide further reference for him should it prove helpful to him.</p><p>Pete took charge of the ‘IWeb’ project, as it was called, and in the nearly two years he managed the project, combined the vision that his proposal had promised with attention to detail, persistence, and an outstanding work ethic to produce an innovative solution to the company’s needs.  In the course of the project, he also encountered most of the pitfalls that can make enterprise solution development so frustrating. He’s to be especially complimented for grinding through all those frustrations unflappably. As CIO, I was more closely involved with the iWeb project than most projects, but never doubted that Pete was the right person to head it up.</p><p>I would characterize Pete’s thinking on the iWeb project as being commercial software caliber work.  He spent considerable time on the difficult early work of analyzing the real challenges of knowledge and information management in the unique environment of that company and business, and envisioned an elegant, usable solution to those challenges. He evaluated commercial technologies and identified an appropriate, cost-effective solution, negotiating an extremely favorable price for Intrawest in the process. And he project-managed the undertaking through a very long gestation to a successful internal launch.</p><p>As a result, he’s got a skillset that I’ve only seen in Microsoft program managers; able to see the business, user, and technical sides of a solution simultaneously, and doggedly pursue it to completion.</p><p>Pete has vision and, probably more vitally, the grit to pursue it.  I’m sure he would say he learned a host of lessons on the iWeb project that would make him even more effective today.  I think Pete has the makings of a successful entrepreneur, especially in the areas of innovation which interest him so keenly.  He also has an unusual degree of patience and a perspective on his own work that is refreshing.  He expects himself to do big things. So do I.</p><p>If I can provide any further perspective on Pete, please do not hesitate to contact me.</p><p>Matthew Dunn<br/><br/>President, Socratech, Inc.  (Former CIO, Intrawest Corporation)</p>"},
		{"id":"greg_whelan","from":"Greg Whelan","position":"GM - Bravo Business Media","letter":"<p> I have known and worked with Pete Field on various projects since 1999.  These projects have been diverse, from developing an outdoor attraction at a summer resort to the most recent, developing an online data normalization tool.  The reason for this ongoing business relationship is due singularly to Pete’s broad skill set and how he applies it to the project at hand, ingeniously employing creative thinking with intelligent perspective.  Simply put, Pete does not think like most people.</p><p> My current business, MyLightingShowroom.com, provides turnkey website technology for brick and mortar distributors in the US and Canada.  The platform includes a database of 200 plus Lighting Manufacturer’s products.  Normalizing and ingesting these product files is a labour intensive task due to a lack of common structures and formats.  I wanted an web based tool that would greatly improve the efficiency of the normalization process and to produce a consistent output file that matched our database structure.  This type of tool does not currently exist in our industry and after some preliminary conversations with Pete he explained the process was programmatically possible and he was eager to take on the challenge.<p></p> When first hearing of Pete’s plan for building such a system, our Director of Development, Don Ferruggia, said “This is a very interesting idea.  In concept, it allows you to load data files directly from manufacturers without prior reformatting.  Subsequent files, after the first use for any particular manufacturer, will process much quicker.”  Since this is a never ending process, Pete identified an opportunity I and my Development Team had not even considered, and developed a “smart” tool that greatly improves our business processes.</p><p>In conclusion, I would highly recommend Pete Field for Start Up Chile – he demonstrates the qualities any incubator would want: intelligence, creativity, non-conformity, boot strap experience, and an unflagging entrepreneurial spirit.</p>Sincerely,</p><p>Greg Whelan</br/>General Manager, MyLightingShowroom.com</p>"}]);


Resume.Views.RelevantSkills = Backbone.View.extend({
	el: 'ul.nav-list',
	initialize: function(){
		$('hr',this.el).nextAll().remove();
		this.render();
	},
	render: function(){
		$('hr',this.el).after('<li class="nav-header"><h3>Relevant Skills<br/>&amp; Characteristics</h3></li><li>Product Management</li><li>Business Planning</li><li>Vision & Strategy</li><li>Usability & Design</li><li>People Person</li><li>Follow Through</li><li>Developer</li>');
	}    
	
});

Resume.Views.Contact = Backbone.View.extend({
	el: 'div#main',
	initialize: function(){
		this.render();
	},


	render: function(){

		$(this.el).html('<p style="font-size: 20pt;">Can\'t wait to hear from you...</p><div id="contact"><div id="email">e-mail: <a id="mailto">pete[at_addr]kitchon[d]com</a></div><div id="phone">phone: +[g]61 [g] 478 71[g]5 8[g]07</div><img src="images/photos/office.png"/>');
		//fix email
		$('a#mailto',this.el).each(function(){
			 var email = $(this).text().split('[at_addr]').join('@').split('[d]').join('.');
 			$(this).attr('href', 'mailto:' + email.toLowerCase()).text(email);
		});	
		$('div#phone',this.el).each(function(){
			$(this).text($(this).text().split('[g]').join(''));

		});

	}
});

Resume.Views.Intro = Backbone.View.extend({
	el: 'div#main',
	initialize: function(){
		this.render();
	},
	render: function(){
		$(this.el).html('<p>An Innovator and Engineer with a dash of Artist, able to envision the future and use technology to make that future a reality. <p><p>With a diverse background in everything from Marketing to Engineering, including founding two companies and developing industry leading technologies, the opportunity to take on the scale of challenges which Google engages is a huge motivator.  Working with and leading a team focused on creating the future is exactly the kind of environment I’ll thrive in.</p><p>What you don’t see in my resume is that I’m always finding opportunities and taking the initiative, I’m a natural innovator. During my seven years at Intrawest,  I had a reputation throughout the company for creating new products and streamlining internal systems. From retail to Public Relations, I was active in almost all facets of this large international organization.</p><p> At 21 years old, I redesigned the sales process for a multi-million dollar ski show sales promotion. What had previously been a multi-hour wait for customers came down to less than 20 minutes, and within 45 minutes customers could come back and pick-up their purchases, where previously they would have to be mailed out. This not only exceeded the customer’s expectations, but also saved the company a bunch of time and money<p>While part of Start-up Chile, I founded the Santiago chapter of OpenCoffee with the help of the creators of OpenCoffee Bangalore, as well as helping local Chileans identify opportunities and refine their market and pitches. </p><p><a href=”#contact”>Contact me</a> to discuss the opportunity to join the Google Team.</p>Pete Field');
	}
});

Resume.Models.RecommendQuote = Backbone.Model.extend();
Resume.Collections.RecommendQuotes = Backbone.Collection.extend({
	model: Resume.Models.RecommendQuote
});
Resume.Views.RecommendQuotes = Backbone.View.extend({
	el: 'div#snippits',
	initialize: function(){
		$(this.el).html('<a href="#recommendations">Recommendations</a>');

		Resume.recommendquotes.each(this.add);

	},
	add: function(quote){
			var template = _.template( $("#recommendation_quotes").html(), quote.attributes);
			$('div#snippits').append(template);
	}
});

Resume.recommendquotes = new Resume.Collections.RecommendQuotes([{"from":"Matthew Dunn, CIO Intrawest","quote":"he’s got a skillset that I’ve only seen in Microsoft program managers; able to see the business, user, and technical sides of a solution simultaneously, and doggedly pursue it to completion."},
																{"from":"Greg Whelan, General Manager Bravo Business Media","quote":"Pete identified an opportunity I and my Development Team had not even considered, and developed a “smart” tool that greatly improves our business processes."},
																{"from":"Chris Strome, Senior Public Relations Officer Whistler/Blackbomb","quote":"[Pete's] forte is continuous process improvement, his strength: the implementation of positive change that increase the productivity and effectiveness of the department."},
																{"from":"Greg Whelan, Senior Manager Guest Service at Mountain Creek Resort","quote":"I have always considered Pete as a 'go to' guy when you need to get something done right the first time.  Pete is a quick study, has a strong operational understanding of our business, and most importantly possesses a huge level of individual creativity. All these things make Pete a great choice for a myriad of roles and I would highly recommend him accordingly."},
																{"from":"Chris Strome, Senior Public Relations Officer Whistler/Blackbomb","quote":"Pete is an excellent team member who is reliable and adapts quickly to changing situations. Pete is able to keep a calm professional manner even during periods of high stress. His helpful nature makes it easy for Pete to assist others and to cooperate fully on any group endeavours."}]);

Resume.Models.News = Backbone.Model.extend();
Resume.Collections.InTheNews = Backbone.Collection.extend({
	model: Resume.Models.News
});
Resume.Views.InTheNews = Backbone.View.extend({
	el: 'div#snippits',
	initialize: function(){
		$(this.el).html('<p>In The News</p>');
		Resume.inthenews.each(this.add);
	},
	add: function(news){
		if(news.attributes.type=='text'){
		var template = _.template( $("#in_the_news").html(), news.attributes);
			$('div#snippits').append(template);	
		}
	}
});

Resume.inthenews = new Resume.Collections.InTheNews([{"source":"TechCrunch","type":"text","link":"http://techcrunch.com/hearwhere","title":"HearWhere Lets You Discover Live Music In Your Neighborhood"},
													{"source":"Cnet","type":"youtube","link":'<object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/1rVHf2hWQi0&start=76&end=102"></param><param name="allowFullScreen" value="true"></param><embed src="http://www.youtube.com/v/1rVHf2hWQi0&start=76&end=102" type="application/x-shockwave-flash" allowfullscreen="true" width="425" height="344"></embed></object>',"title":"Just Like You Pictured It"},
													{"source":"CBC","type":"text","link":"http://www.cbc.ca/news/business/smallbusiness/story/2012/01/12/f-vp-buckner-chile.html","title":"Chile luring Canadian firms with $40K of free cash"},
													{"source":"TechRadar","type":"text","link":"http://www.techradar.com/news/internet/web/20-websites-you-never-realised-you-needed-478989","title":"20 websites you never realised you needed (#4)"}]);


Resume.Models.Education = Backbone.Model.extend();
Resume.Collections.Schools = Backbone.Collection.extend({
	model: Resume.Models.Education
});
Resume.Views.Education = Backbone.View.extend({
	el:'div#main',

	initialize: function(){
		$(this.el).empty();
	  Resume.education.each(this.add);
	  	
		
	},
	
	add: function(education){
		var template = _.template( $("#jobs_template").html(), education.attributes);
 		$('div#main').append(template);
	}
});

Resume.education = new Resume.Collections.Schools([{"title":"2 Years towards BA Computer Science / Psychology", "company":"Carlton University - Ottawa, Ontario, Canada", "dates":"2 Years - Sept 1992 to June 1994","description":"University isn't for everybody, like the founders of Google, and most other REALLY successful people in technology, so why not me! In all seriousness, I have continued to education myself since leaving school."},
													{"title":"15+ Years of Learning &amp; Doing ","company":"Intrawest, Whistler/Blackbonb, iPix, MusicIp...","dates":"15+ Years - Sept 1995 to Today","description":"My education has been continuous since leaving university. I've been exceptionally fortunate to have been approached with opportunities to work in many fields of business. Additionally, I am a very curious person, participating in all kinds of research and study in a diverse area of interests. Though, my formal education may be limited, I hope you'll agree that my work experience and character have prepared me well for the position of Product Manager with Google."}]);