var Word = Backbone.Model.extend({
	move: function() {
		this.set({y:this.get('y') + this.get('speed')});
	}
});

var Words = Backbone.Collection.extend({
	model:Word
});

var WordView = Backbone.View.extend({
	initialize: function() {
		$(this.el).css({position:'absolute'});
		var string = this.model.get('string');
		var letter_width = 25;
		var word_width = string.length * letter_width;
		if(this.model.get('x') + word_width > $(window).width()) {
			this.model.set({x:$(window).width() - word_width});
		}
		for(var i = 0;i < string.length;i++) {
			$(this.el)
				.append($('<div>')
					.css({
						width:letter_width + 'px',
						padding:'5px 2px',
						'border-radius':'4px',
						'background-color':'#fff',
						border:'1px solid #ccc',
						'text-align':'center',
						float:'left'
					})
					.text(string.charAt(i).toUpperCase()));
		}

		this.listenTo(this.model, 'remove', this.remove);

		this.render();
	},

	render:function() {
		$(this.el).css({
			top:this.model.get('y') + 'px',
			left:this.model.get('x') + 'px'
		});
		var highlight = this.model.get('highlight');
		$(this.el).find('div').each(function(index,element) {
			if(index < highlight) {
				$(element).css({'font-weight':'bolder','background-color':'#aaa',color:'#fff'});
			} else {
				$(element).css({'font-weight':'normal','background-color':'#fff',color:'#000'});
			}
		});
	}
});

var TyperView = Backbone.View.extend({
	initialize: function() {
		var wrapper = $('<div>')
			.css({
				position:'fixed',
				top:'0',
				left:'0',
				width:'100%',
				height:'100%'
			});
		this.wrapper = wrapper;

		var self = this;
		var text_input = $('<input>')
			.addClass('form-control')
			.css({
				'border-radius':'4px',
				position:'absolute',
				bottom:'0',
				'min-width':'60%',
				width:'60%',
				'margin-bottom':'10px',
				'z-index':'1000'
			}).keyup(function(e) {
				var words = self.model.get('words');
				for(var i = 0;i < words.length;i++) {
					var word = words.at(i);
					var typed_string = $(this).val();
					var string = word.get('string');
					if(string.toLowerCase().indexOf(typed_string.toLowerCase()) == 0) {
						word.set({highlight:typed_string.length});
						if(typed_string.length == string.length) {
							$(this).val('');
							self.model.defaults.score += 5;
						}
					} else {
						word.set({highlight:0});
					}
				}

				/*---- win score & scoring -----*/
				if (self.model.defaults.score >=100) {
					self.model.winner()
				}

				if (typed_string !== undefined) {
					if (typed_string.length > 0) {
						var check = 0;
						for (var i = 0; i < words.length; i++) {
							var word_pos = words.at(i);
							if (word_pos.get('highlight') !== 0) {
								check++;
							}
						}
						/*--------Punishment---------*/
						if (e.keyCode >= 65 && e.keyCode <= 90) {
							if (check === 0) {
								self.model.defaults.score -= 1;
							}
						}
						/*-------------------------------*/
					}
				}
				/*-------------------------------*/
			});

		/*------ Button ---------*/

		var btn_wrapper = $('<div>').css({
													position: 'absolute',
													bottom: '10px',
													left: '10px',
													'z-index': '9999'
											});

		var start_btn = $('<button>')
										.addClass('btn btn-success')
										.text('Start')
										.css({'left': '10px'})
										.click(function(){
												self.model.start();
												$(this).css({display: 'none'});
												stop_btn.css({display: 'inline'});
												pause_btn.css({display: 'inline'});
										});
		var stop_btn = $('<button>')
										.addClass('btn btn-danger')
										.text('Stop')
										.css({display: 'none'})
										.click(function(){
												self.model.checkScore();
												self.model.stop();
												$(this).css({display: 'none'});
												start_btn.css({display: 'inline'});
												$('.word').remove();
												self.model.defaults.score = 0;
										});
		var pause_btn = $('<button>')
										.addClass('btn btn-default')
										.text('Pause')
										.css({'margin-left': '5px', 'display': 'none'})
										.click(function(){
												self.model.pause();
												resume_btn.css({display: 'inline'});
												$(this).css({display: 'none'});
										});
		var resume_btn = $('<button>')
										.addClass('btn btn-default')
										.text('Resume')
										.css({'margin-left': '5px', 'display': 'none'})
										.click(function(){
												self.model.start();
												pause_btn.css({display: 'inline'});
												$(this).css({display: 'none'});
										});
		var score_wrapper = $('<div>').css({
													position: 'absolute',
													right: '40px',
													top: '5px',
													'z-index': 999
												});
		/*-------------------------------*/

		var score = $('<h1>').html('Score : <span id="scores">' + self.model.defaults.score + '</span>');

		$(this.el)
			.append(wrapper
				.append($('<form>')
					.attr({
						role:'form'
					})
					.submit(function() {
						return false;
					})
					.append(text_input))
					.append(btn_wrapper
							.append(start_btn)
							.append(stop_btn)
							.append(pause_btn)
							.append(resume_btn))
	.append(score_wrapper
		.append(score))
				);

		text_input.css({left:((wrapper.width() - text_input.width()) / 2) + 'px'});
		text_input.focus();

		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		var model = this.model;
		var words = model.get('words');

		$('#scores').text(model.defaults.score);

		for(var i = 0;i < words.length;i++) {
			var word = words.at(i);
			if(!word.get('view')) {
				var word_view_wrapper = $('<div>');
				this.wrapper.append(word_view_wrapper);
				word.set({
					view:new WordView({
						model: word,
						el: word_view_wrapper
					})
				});
			} else {
				word.get('view').render();
			}
		}
	}
});

var Typer = Backbone.Model.extend({
	defaults:{
		max_num_words:10,
		min_distance_between_words:50,
		words:new Words(),
		min_speed:1,
		/*- Trailing comma error in IE <9 -*/
		max_speed:5, //<--
		score: 0,
		temp_typed_string: ''
	},

	initialize: function() {
		new TyperView({
			model: this,
			el: $(document.body)
		});
	},

	virtualStart: function() {

	},

	start: function() {

		/*-optimize for animation and runs as fast as we display allow (~60 fps)-*/
		var animation_delay = 2000/60;
		var self = this;

		/*-tell browser to use animation frame-*/
		self.startAnimate = window.requestAnimationFrame(function(){
			setInterval(function() {
				self.iterate();
			},animation_delay);
		})

	},

	stop: function () {
		var self = this;
		location.reload()
	},

	pause: function() {
		var self = this;
		clearInterval(self.startAnimate);
	},

	checkScore: function() {
		alert('Score anda adalah: ' + this.defaults.score)
	},

	winner: function() {
		alert('Anda menang dengan score!\n'+this.defaults.score+'\nPermainan akan diulang dari awal')
		location.reload();
	},

	iterate: function() {

		var words = this.get('words');

		/*- Arrangement of letters -*/
		$(window).on('resize', function(){
			for(var i = 0;i < words.length;i++) {
				var word_width = word.get('string').length * 25;
				if (words.at(i).get('x') + word_width > $(window).width()){
					words.at(i).set({x: $(window).width() - word_width});
				}
			}
		});
		/*---------------------------*/

		if(words.length < this.get('max_num_words')) {
			var top_most_word = undefined;
			for(var i = 0;i < words.length;i++) {
				var word = words.at(i);
				if(!top_most_word) {
					top_most_word = word;
				} else if(word.get('y') < top_most_word.get('y')) {
					top_most_word = word;
				}
			}

			if(!top_most_word || top_most_word.get('y') > this.get('min_distance_between_words')) {
				var random_company_name_index = this.random_number_from_interval(0,company_names.length - 1);
				var string = company_names[random_company_name_index];
				var filtered_string = '';
				for(var j = 0;j < string.length;j++) {
					if(/^[a-zA-Z()]+$/.test(string.charAt(j))) {
						filtered_string += string.charAt(j);
					}
				}

				var word = new Word({
					x:this.random_number_from_interval(0,$(window).width()),
					y:0,
					string:filtered_string,
					speed:this.random_number_from_interval(this.get('min_speed'),this.get('max_speed'))
				});
				words.add(word);
			}
		}

		var words_to_be_removed = [];
		for(var i = 0;i < words.length;i++) {
			var word = words.at(i);
			word.move();

			if(word.get('y') > $(window).height() || word.get('move_next_iteration')) {
				words_to_be_removed.push(word);
			}

			if(word.get('highlight') && word.get('string').length == word.get('highlight')) {
				word.set({move_next_iteration:true});
			}
		}

		for(var i = 0;i < words_to_be_removed.length;i++) {
			words.remove(words_to_be_removed[i]);
		}

		this.trigger('change');
	},

	random_number_from_interval: function(min,max) {
	    return Math.floor(Math.random()*(max-min+1)+min);
	}
});
