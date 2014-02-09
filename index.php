<!doctype html>
<html lang="en">
<head>

	<meta charset="UTF-8">
	<title>tv2 Yayın Akışı</title>
	<link rel="stylesheet" href="css/global.css">
	<link rel="stylesheet" href="css/style.css">

	<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">

	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<!-- data-main attribute tells require.js to load js/boot.js after require.js loads. -->
	<!--This sets the baseUrl to the "js" directory, and
	loads a script that will have a module ID of 'boot'-->
	<script data-main="js/boot" src="js/lib/require.js"></script>

	<script src="//use.typekit.net/yvr5yxs.js"></script> 
	<script>try { Typekit.load(); } catch (e) {}</script>

	<!--[if IE]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>
<body>
<div class="wrap">
	<header class="main">
		<h1><a href="#prime_time" class="tv2-logo hide-text">TV2</a> <span>Yayın Akışı</span></h1>
		<div class="share">
			<h3 class="hide-text">Paylas</h3>
			<ul>
				<li><a href="https://twitter.com/tv2tv" class="hide-text">Twitter</a></li>
				<li><a href="https://www.facebook.com/tv2tv" class="hide-text">Facebook</a></li>
				<li><a href="https://plus.google.com/+tv2tv/posts" class="hide-text">Google+</a></li>
				<li><a href="http://instagram.com/tv2tv" class="hide-text">Instagram</a></li>
				<li><a href="http://www.pinterest.com/tv2tv/" class="hide-text">Pinterest</a></li>
				<li><a href="http://www.youtube.com/user/tv2comtr" class="hide-text">YouTube</a></li>
			</ul>
		</div>
	</header>
	
	<main>
		<section class="selected" id="all-day">
			<nav>
				<h2>
					<span class="day-nr"> </span> 
					<span class="month-name"> </span>
				</h2>
				<ul class="week">
					<li>
						<a href="#">Pzt</a>
					</li><li>
						<a href="#">Sa</a>
					</li><li>
						<a href="#">Çr</a>
					</li><li>
						<a href="#">Pr</a>
					</li><li>
						<a href="#">Cu</a>
					</li><li>
						<a href="#">Cmt</a>
					</li><li class="selected ">
						<a href="#">Pz</a>
					</li>
				</ul>
				<div class="hours-wrap">
					<ul class="hours"></ul>
				</div>
			</nav>
			<script type='text/template' id='articleContent'>
				<article style="background-image: url('{{img}}')">
					<header>
						<div class="headings indented">
							<h1 class="top-row">{{title}}</h1>
							<h2 class="bottom-row">Program</h2>
						</div>
						<div class="when">
							<span class="day top-row">{{dayName}}</span>
							<span class="time bottom-row">{{formattedTime}}</span>
						</div>
					</header>
					<menu>
						<ul>
							<li class="ribbon"><a href="https://www.facebook.com/sharer.php?u={{url}}" class="shareBtn hide-text" data-role="fb">"Facebook'ta Paylaş"</a></li>
							<li class="ribbon"><a href="https://twitter.com/intent/tweet?url={{url}}&text=TV2'de {{title}} başlamak üzere!" class="shareBtn hide-text" data-role="tw">"Twitter'da Paylaş"</a></li>
							<li class="ribbon"><a href="https://plus.google.com/share?url={{url}}" class="shareBtn hide-text" data-role="gp">"Google+'da Paylaş"</a></li>
							<li class="ribbon"><a href="#" class="reminder hide-text {{expired}}" data-role="rm" data-date="{{date}}" data-title="{{title}}">Hatırlat</a></li>
							<li><a href="http://www.imdb.com/title/{{imdb}}" class="hide-text" target="_blank" data-role="imdb">IMDb</a></li>
						</ul>
					</menu>
					<div class="detailed-info indented">
						{{text}}
					</div>
				</article>
			</script>
			<article>
				<header>
					<div class="headings indented">
						<h1 class="top-row"></h1>
						<h2 class="bottom-row"></h2>
					</div>
					<div class="when">
						<span class="day top-row"></span>
						<span class="time bottom-row"></span>
					</div>
				</header>
				<menu>
					<ul>
						<li class="ribbon"><a href="#" class="shareBtn hide-text" data-role="fb">Facebook'ta Paylaş</a></li>
						<li class="ribbon"><a href="#" class="shareBtn hide-text" data-role="tw">Twitter'da Paylaş</a></li>
						<li class="ribbon"><a href="#" class="shareBtn hide-text" data-role="gp">Google+'da Paylaş</a></li>
						<li class="ribbon"><a href="#" class="reminder hide-text" data-role="rm">Hatırlat</a></li>
						<li><a href="#" class="hide-text" data-role="imdb">IMDb</a></li>
					</ul>
				</menu>
				<div class="detailed-info indented"></div>
			</article>
		</section> <!-- all-day -->
		<section id="prime-time">
			<h2>14 Ağustos Pazar</h2>
			<script type='text/template' id='prime-time-prog'>
				<li>
					<a href="#" style="background-image: url('{{img}}');">
						<header>
							<h3>{{title}}</h3>
							<h4>Yeni Bölüm</h4>
						</header>
						<span class="time">{{timeFormatted}}</span>
					</a>
					<menu>
						<ul>
							<li><a href="http://www.imdb.com/title/{{imdb}}" style="{{imdbStyle}}" class="hide-text" target="_blank" data-role="imdb">IMDb</a></li>
							<li><a href="https://www.facebook.com/sharer.php?u={{url}}" class="hide-text" data-role="fb">"Facebook'ta Paylaş"</a></li>
							<li><a href="https://twitter.com/intent/tweet?url={{url}}&text=TV2'de {{title}} başlamak üzere!" class="hide-text" data-role="tw">"Twitter'da Paylaş"</a></li>
							<li><a href="https://plus.google.com/share?url={{url}}" class="hide-text" data-role="gp">"Google+'da Paylaş"</a></li>
						</ul>
					</menu>
					<a href="#" class="reminder hide-text {{expired}}" data-role="rm" data-date="{{date}}" data-title="{{title}}">Hatırlat</a>
				</li>
			</script>
			<ul class="programs">
				<li>
					<a href="#" style="background-image: url('img/programs/1.jpg');">
						<header>
							<h3>Gossip Girl</h3>
							<h4>Yeni Bölüm</h4>
						</header>
						<span class="time">18:30</span>
					</a>
					<a href="#" class="reminder">Hatırlat</a>
					<menu>
						<ul>
							<li><a href="#" class="hide-text" data-role="imdb">IMDb</a></li>
							<li><a href="#" class="hide-text" data-role="fb">Facebook'ta Paylaş</a></li>
							<li><a href="#" class="hide-text" data-role="tw">Twitter'da Paylaş</a></li>
							<li><a href="#" class="hide-text" data-role="gp">Google+'da Paylaş</a></li>
						</ul>
					</menu>
				</li>
				<li>
					<a href="#" style="background-image: url('img/programs/2.jpg');">
						<header>
							<h3>Ölüm Odası</h3>
							<h4>Sinema</h4>
						</header>
						<span class="time">19:30</span>
					</a>
					<a href="#" class="reminder">Hatırlat</a>
					<menu>
						<ul>
							<li><a href="#" class="hide-text" data-role="imdb">IMDb</a></li>
							<li><a href="#" class="hide-text" data-role="fb">Facebook'ta Paylaş</a></li>
							<li><a href="#" class="hide-text" data-role="tw">Twitter'da Paylaş</a></li>
							<li><a href="#" class="hide-text" data-role="gp">Google+'da Paylaş</a></li>
						</ul>
					</menu>
				</li>
				<li>
					<a href="#" class="selected" style="background-image: url('img/programs/3.jpg');">
						<header>
							<h3>Barselona Barselona</h3>
						<h4>TV2 Sinema Klübü</h4>
						</header>
						<span class="time">21:30</span>
					</a>
					<a href="#" class="reminder">Hatırlat</a>
					<menu>
						<ul>
							<li><a href="#" class="hide-text" data-role="imdb">IMDb</a></li>
							<li><a href="#" class="hide-text" data-role="fb">Facebook'ta Paylaş</a></li>
							<li><a href="#" class="hide-text" data-role="tw">Twitter'da Paylaş</a></li>
							<li><a href="#" class="hide-text" data-role="gp">Google+'da Paylaş</a></li>
						</ul>
					</menu>
				</li>
				<li>
					<a href="#" style="background-image: url('img/programs/4.jpg');">
						<header>
							<h3>Entourage</h3>
						<h4>Yeni Bölüm</h4>
						</header>
						<span class="time">23:30</span>
					</a>
					<a href="#" class="reminder">Hatırlat</a>
					<menu>
						<ul>
							<li><a href="#" class="hide-text" data-role="imdb">IMDb</a></li>
							<li><a href="#" class="hide-text" data-role="fb">Facebook'ta Paylaş</a></li>
							<li><a href="#" class="hide-text" data-role="tw">Twitter'da Paylaş</a></li>
							<li><a href="#" class="hide-text" data-role="gp">Google+'da Paylaş</a></li>
						</ul>
					</menu>
				</li>
				<li>
					<a href="#" style="background-image: url('img/programs/5.jpg');">
						<header>
							<h3>American Horror Story</h3>
							<h4>Yeni Bölüm</h4>
						</header>
						<span class="time">00:15</span>
					</a>
					<a href="#" class="reminder">Hatırlat</a>
					<menu>
						<ul>
							<li><a href="#" class="hide-text" data-role="imdb">IMDb</a></li>
							<li><a href="#" class="hide-text" data-role="fb">Facebook'ta Paylaş</a></li>
							<li><a href="#" class="hide-text" data-role="tw">Twitter'da Paylaş</a></li>
							<li><a href="#" class="hide-text" data-role="gp">Google+'da Paylaş</a></li>
						</ul>
					</menu>
				</li>
			</ul>
		</section> <!-- prime-time -->
	</main>
	
	<nav class="modes">
		<a href="#" data-mode="all-day" class="ad show selected"><span>Tüm Gün</span></a>
		<a href="#" data-mode="prime-time" class="pt"><span>Prime-Time</span></a>
	</nav>
	
	<div id="fb-root"></div>
</div><!-- #wrap -->
</body>
</html>