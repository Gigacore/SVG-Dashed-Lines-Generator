$(function() {
	//$("svg").draggable({ containment: "#container", scroll: false });
	//$("#container").resizable();
	$("#svg-width").slider({
		min: 1,
		max: 600,
		value: 350,
		range: "min",
		slide: function(event, ui) {
			$('#markup svg').attr('width', ui.value);
		}
	});

	$("#svg-height").slider({
		min: 1,
		max: 500,
		value: 30,
		range: "min",
		slide: function(event, ui) {
			$('#markup svg').attr('height', ui.value);
		}
	});

	$("#stroke-width").slider({
		min: 1,
		max: 10,
		value: 2,
		range: "min",
		slide: function(event, ui) {
			$('#markup line').css('stroke-width', ui.value);
		}
	});

	$("#hor-pos").slider({
		min: 0,
		max: 600,
		value: 0,
		range: "min",
		slide: function(event, ui) {
			$('#markup line').attr('x1', ui.value);
		}
	});

	$("#line-width").slider({
		min: 1,
		max: 600,
		value: 350,
		range: "min",
		slide: function(event, ui) {
			$('#markup line').attr('x2', ui.value);
		}
	});

	var verticalPos = 10;

	$("#vert-pos").slider({
		min: 1,
		max: 600,
		value: 10,
		range: "min",
		slide: function(event, ui) {
			$('#markup line').attr('y1', ui.value);
			$('#markup line').attr('y2', ui.value);
			verticalPos = ui.value;

			$("#vert-left, #vert-right").slider({
				value: verticalPos
			});
		}
	});

	$("#vert-left").slider({
		min: 1,
		max: 600,
		value: verticalPos,
		range: "min",
		slide: function(event, ui) {
			$('#markup line').attr('y1', ui.value);
		}
	});

	$("#vert-right").slider({
		min: 1,
		max: 600,
		value: verticalPos,
		range: "min",
		slide: function(event, ui) {
			$('#markup line').attr('y2', ui.value);
		}
	});

	$('#generate-cta').click(function() {
		$('textarea[name="markup-textarea"]').val(document.getElementById('markup').innerHTML);

		var css = "line {stroke:" + $('#markup line').css('stroke') + "; stroke-width: 2}"
		$('textarea[name="css-textarea"]').val(css);

		$('.tab').removeClass('active');
		$('.tab[data-tab="code"]').addClass('active');
		$('#control-tabs').hide();
	});

	$('textarea').click(function() {
		$(this).select();
	});

	$('#control-tabs li').click(function() {
		$('#control-tabs li').removeClass('active')
		$(this).addClass('active');

		$('.tab').removeClass('active');
		$('.tab[data-tab="' + $(this).data('tab') + '"]').addClass('active');
	});

	$('.style').click(function() {
		$('.style').removeClass('active');
		$(this).addClass('active');

		$('#markup line').attr('stroke-dasharray', $(this).find('line').attr('stroke-dasharray'));
	});
});

$('#picker').colpick({
	layout: 'hex',
	submit: 0,
	onChange: function(hsb, hex, rgb, el, bySetColor) {
		$('#markup line').css('stroke', '#' + hex);
		$('#picker').css('border-right', '30px solid #' + hex);
		if (!bySetColor) $(el).val(hex);
	}
}).keyup(function() {
	$(this).colpickSetColor(this.value);
});

$('#continue').click(function() {
	$('.tab[data-tab="code"]').removeClass('active');
	$('.tab[data-tab="controls"]').addClass('active');
	$('#control-tabs').show();
});