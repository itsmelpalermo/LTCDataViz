var mapimg;
var quoteData;
var counter = 1;
var clat = 55.1304;
var clon = -100.3468;

var lat = 51.2538;
var lon = -85.3232;

var zoom = 2.35;
var ltcFatalities;

var bcAllProvNum = [];
var abAllProvNum = [];
var mbAllProvNum = [];
var onAllProvNum = [];
var qcAllProvNum = [];
var nsAllProvNum = [];
var skAllProvNum = [];

function preload() {
	mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/-100.3468,55.1304,2.35,0,0/1024x512?access_token=pk.eyJ1IjoiaXRzbWVscGFsZXJtbyIsImEiOiJjazlyc2gzamUweHhsM2RwamkzdHQ2cnQyIn0.Fr7rQ8k0a0AFbe45viY2aA');
	backgroundImage = loadImage('MapOfCanada.png');
	ltcFatalities = loadStrings('Deaths_in_Canadian_LTC_by_facility.csv');
	quoteData = loadJSON('Quotes-LTCFatalities.json');
	headerFont = loadFont('fonts/Oswald-Regular.ttf');
	subheaderFont = loadFont('fonts/Oswald-Light.ttf');
	bodyFont = loadFont('fonts/EBGaramond-Regular.ttf');
	bodyFontItalic = loadFont('fonts/EBGaramond-Italic.ttf');
}

function mercX(lon) {
	lon = radians(lon);
	var a = (256 / PI) * pow(2, zoom);
	var b = lon + PI;
	return a * b;
}

function mercY(lat) {
	lat = radians(lat);
	var a = (256 / PI) * pow(2, zoom);
	var b = tan(PI / 4 + lat / 2);
	var c = PI - log(b);
	return a * c;
}

function setup() {
	createCanvas(1024, 512);
	frameRate(200);

	translate(width / 2, height / 2);
	imageMode(CENTER);
	image(backgroundImage, 0, 0);

	dateLine = 'Updated: May 10, 2020';
	textAlign(RIGHT);
	noStroke();
	fill(241, 239, 227);
	textFont(subheaderFont, 10);
	text(dateLine, 180, -240, 300, 300);

	attribution = 'Source: Nora Loreto | Design: Melissa Palermo';
	textAlign(RIGHT);
	noStroke();
	fill(241, 239, 227);
	textFont(subheaderFont, 10);
	text(attribution, 180, -227, 300, 300);

	title = 'COVID-19 Deaths in Canadian Long Term Care Facilities';
	textAlign(LEFT);
	noStroke();
	fill(241, 239, 227);
	textFont(headerFont, 27);
	text(title, -450, 115, 300, 300);

	fill(254, 197, 128);
	ellipse(-440, 210, 20, 20);
	fill(244, 112, 101);
	ellipse(-360, 210, 20, 20);
	fill(167, 198, 253);
	ellipse(-275, 210, 20, 20);

	fill(241, 239, 227);
	textFont(subheaderFont, 16);
	text('Public', -420, 217);
	text('Private', -340, 217);
	text('Not Identified', -255, 217);

	var cx = mercX(clon);
	var cy = mercY(clat);

	for (var i = 0; i < ltcFatalities.length; i++) {
		var data = ltcFatalities[i].split(/,/);
		var lat = data[5];
		var lon = data[6];
		var ownership = data[9];

		var fatalities = ((sqrt(data[7])) * zoom);

		var x = mercX(lon) - cx;
		var y = mercY(lat) - cy;

		if (data[0] == 'Facilities in Quebec (minus what is on this list)') {
			noStroke();
			noFill();
			ellipse(x, y, fatalities, fatalities);
		} else if (ownership == 'Public') {
			noStroke();
			fill(254, 197, 128, 200);
			ellipse(x, y, fatalities, fatalities);
		} else if (ownership == 'Private') {
			noStroke();
			fill(244, 112, 101, 200);
			ellipse(x, y, fatalities, fatalities);
		} else {
			noStroke();
			fill(167, 198, 253, 200);
			ellipse(x, y, fatalities, fatalities);
		}

		var quebecFacilities;
		if (data[0] ==  'Facilities in Quebec (minus what is on this list)') {
			var quebecFacilities = data[7]
			textFont(bodyFont, 12);
			textAlign(LEFT);
			noStroke();
			fill(241, 239, 227);
			text('*Note: There have been ' + quebecFacilities + ' deaths in long term care facilities in Quebec where the long term care facility is unidentifiable.', -450, -225, 100, 500);
		}

		var totalFatalities = (((sqrt(data[7])) * zoom) /2);
		var numberFatalities = data[7];

		if (data[2] == 'TotalCAN') {
			noStroke();
			fill(48, 48, 48, 150);
			ellipse(425, -150, totalFatalities, totalFatalities);
			fill(241, 239, 227);
			textSize(9);
			textAlign(CENTER);
			text('Total Deaths in Canada: ' + numberFatalities, 400, -165, 50, 125);
		} else if (data[2] == 'TotalLTC') {
			noStroke();
			fill(241, 239, 227, 150);
			ellipse (425, -50, totalFatalities, totalFatalities);
			fill(48, 48, 48);
			textSize(9);
			textAlign(CENTER);
			text('Total Deaths in Long Term Care: ' + numberFatalities, 388, -65, 75, 125);
		}

		if (data[2] == 'BC') {
				var bcSum = 0;

				bcProvNum = (int(data[7]));
				bcAllProvNum.push(bcProvNum);

				for (var j = 0; j < bcAllProvNum.length; j++) {
					bcSum += bcAllProvNum[j];
				}
		}

		if (data[2] == 'AB') {
				var abSum = 0;

				abProvNum = (int(data[7]));
				abAllProvNum.push(abProvNum);

				for (var k = 0; k < abAllProvNum.length; k++) {
					abSum += abAllProvNum[k];
				}
		}

		if (data[2] == 'MB') {
				var mbSum = 0;

				mbProvNum = (int(data[7]));
				mbAllProvNum.push(mbProvNum);

				for (var l = 0; l < mbAllProvNum.length; l++) {
					mbSum += mbAllProvNum[l];
				}
		}

		if (data[2] == 'ON') {
				var onSum = 0;

				onProvNum = (int(data[7]));
				onAllProvNum.push(onProvNum);

				for (var m = 0; m < onAllProvNum.length; m++) {
					onSum += onAllProvNum[m];
				}
		}

		if (data[2] == 'QC') {
				var qcSum = 0;

				qcProvNum = (int(data[7]));
				qcAllProvNum.push(qcProvNum);

				for (var n = 0; n < qcAllProvNum.length; n++) {
					qcSum += qcAllProvNum[n];
				}
		}

		if (data[2] == 'NS') {
				var nsSum = 0;

				nsProvNum = (int(data[7]));
				nsAllProvNum.push(nsProvNum);

				for (var o = 0; o < nsAllProvNum.length; o++) {
					nsSum += nsAllProvNum[o];
				}
		}
		if (data[2] == 'SK') {
				var skSum = 0;

				skProvNum = (int(data[7]));
				skAllProvNum.push(skProvNum);

				for (var p = 0; p < skAllProvNum.length; p++) {
					skSum += skAllProvNum[p];
				}
		}
	}

		textAlign(CENTER);
		textFont(bodyFont, 10);
		fill(48, 48, 48);
		textFont(headerFont, 12);
		text(bcSum, -180, 5);
		text(abSum, -105, 5);
		text(skSum, -40, 5);
		text(mbSum, 20, 5);3
		text(onSum, 103, 60);
		text(qcSum, 190, 75);
		text(nsSum, 265, 107);

		let sourceTxt = createDiv("<a href='https://t.co/rtxyvfFyff?amp=1' target='_blank'>View Spreadsheet </a>");

		sourceTxt.position(1024, 512);

}

function draw() {
	var quotes = quoteData.quotes;

	if (counter > 5) {
		counter = 1;
	}

	for (var i = 0; i < counter; i++) {
		textFont(bodyFont);
		noStroke();
		fill(149, 150, 146);
		rect(525, 425, 510, 200);
		fill(48, 48, 48);
		textSize(12);
		textAlign(RIGHT);
		var words = quotes[i].txt;
		text(' "' + words + '"', 525, 425, 450, 200);

		textFont(bodyFontItalic);
		textSize(9);
		var wordsTitle = quotes[i].article;
		text(wordsTitle, 525, 475, 450, 200);
	}

	if(frameCount % 500 === 0) {
		counter++;
	}
}
