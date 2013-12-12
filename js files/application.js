// JavaScript Document

//This section is to make the sound work
//Make sure it is requiring SoundManager before file on page
soundManager.url = '/swfs/';
soundManager.flashVersion = 9;
soundManager.useFlashBlock = false;
soundManager.useHighPerformance = true;
soundManager.wmode = 'transparent';
soundManager.useFastPolling = true;

//Wait for jQuery to load properly
$(function(){
	soundManager.onready(function() {
		var consumer_key = "ePT3qXXTOjw4ZoZcN7ALQ",
				url = "http://soundcloud.com/foofighters/sets/wasting-light";		
		
		$.getJSON('http://api.soundcloud.com/resolve?url=' + url + '&format=json&consumer_key=' + consumer_key + '&callback=?', function(playlist){
			$('.title').text(playlist.tracks[0].title);
			
//Loop through each of the tracks			
			$.each(playlist.tracks, function(index, track) {
				
//create a list item for each track and associate the track data with it				
				$('<li>' + track.title + '</li>').data('track', track).appendTo('.tracks');
				
				$('<li>' + track.title + '</li>').data('track', track).appendTo('.tracks');
				
//create sound!				
				soundManager.createSound({
					
					id: 'track_' + track.id,
					url: url,
					
					onplay: function() {
						
						$('.player').addClass('playing');
						
						$('.title').text(track.title);
						
					},
					onresume: function() {
						
						$('.player').addClass('playing');
						
					},
					
//on pause, remove the playing class from the main player					
					onpause: function() {
						$('.player').removeClass('playing');
					},
					
//when a track finishes, call the next track function, located further down					
					onfinish: function() {
						nextTrack();
					}
					
				});
				
			});
			
		});
		
		$('.tracks li').live('click', function(){
			
			var $track = $(this),
					data = $track.data('track'),
					playing = $track.is('.active');
					
			if (playing) {
				
				soundManager.pause('track_' + data.id);				
				
			} else {
				
				if ($track.siblings('li').hasClass('active')) { soundManager.stopAll(); }
				
				soundManager.play('track_' + data.id);
				
			}
			
			$track.toggleClass('active').siblings('li').removeClass('active');
			
		});
		
		$('.play, .pause').live('click', function(){
			
			if ( $('li').hasClass('active') == true ) {
				
				soundManager.togglePause( 'track_' + $('li.active').data('track').id );	
							
			} else {
				
				$('li:first').click();
				
			}
			
		});
		
		$('.next').live('click', function(){
			nextTrack();
		});
		
		$('.prev').live('click', function(){
			prevTrack();
		});
		

//the next track		
		var nextTrack = function(){
			
//stop all sounds			
			soundManager.stopAll();
			
			if ( $('li.active').next().click().length == 0 ) {
				$('.tracks li:first').click();
			}
			
		}
		
//previous track		
		var prevTrack = function(){
			
//stop all sounds			
			soundManager.stopAll();
			
			if ( $('li.active').prev().click().length == 0 ) {
				$('.tracks li:last').click();
			}
			
		}

	});
	
});