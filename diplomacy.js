var jq = document.createElement('script');
jq.src = "http://code.jquery.com/jquery-latest.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

var drawLib = document.createElement('script');
drawLib.src = "https://cdnjs.cloudflare.com/ajax/libs/phaser/2.4.2/phaser.min.js";
document.getElementsByTagName('head')[0].appendChild(drawLib);

setTimeout(function() {
  var $,
      $areas,
      areasObj = {},
      game,
      filter,
      unitImages = {},
      terColors = {
        AUSTRIA : '#DA938F',
        ENGLAND : '#C57D39',
        FRANCE  : '#5D70B1',
        GERMANY : '#D6BC6B',
        ITALY   : '#9CC672',
        RUSSIA  : '#7E6BD2',
        TURKEY  : '#7BB5E9'
      },
      territoryData = {
        'Adriatic Sea': {
          isWater: true,
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Aegean Sea': {
          isWater: true,
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Albania': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Ankara': {
          supplyCenter: [],
          label: [],
          army: [-40, 0],
          fleet: []
        },
        'Apulia': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Armenia': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Baltic Sea': {
          isWater: true,
          supplyCenter: [],
          label: [25, 10],
          army: [],
          fleet: []
        },
        'Barents Sea': {
          isWater: true,
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Belgium': {
          supplyCenter: [],
          label: [3, 0],
          army: [-5, -15],
          fleet: [-5, -15]
        },
        'Berlin': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Black Sea': {
          isWater: true,
          supplyCenter: [],
          label: [-10, 20],
          army: [],
          fleet: []
        },
        'Bohemia': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Brest': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Budapest': {
          supplyCenter: [],
          label: [0, -5],
          army: [-20, 15],
          fleet: []
        },
        'Bulgaria': {
          supplyCenter: [-20, -20],
          label: [-10, -25],
          army: [-13, 10],
          fleet: []
        },
        'Burgundy': {
          supplyCenter: [],
          label: [13, 0],
          army: [0, 10],
          fleet: []
        },
        'Clyde': {
          supplyCenter: [],
          label: [-10, 0],
          army: [],
          fleet: []
        },
        'Constantinople': {
          supplyCenter: [],
          label: [5, 0],
          army: [0, 20],
          fleet: []
        },
        'Denmark': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Eastern Mediterranean': {
          isWater: true,
          supplyCenter: [],
          label: [],
          army: [],
          fleet: [0, 15]
        },
        'Edinburgh': {
          supplyCenter: [-12, 0],
          label: [15, 0],
          army: [],
          fleet: [5, 10]
        },
        'English Channel': {
          isWater: true,
          supplyCenter: [],
          label: [8, 3],
          army: [],
          fleet: [-10, 5]
        },
        'Finland': {
          supplyCenter: [],
          label: [10, 0],
          army: [],
          fleet: []
        },
        'Galicia': {
          supplyCenter: [],
          label: [8, -13],
          army: [18, 0],
          fleet: []
        },
        'Gascony': {
          supplyCenter: [],
          label: [],
          army: [-5, 15],
          fleet: []
        },
        'Greece': {
          supplyCenter: [],
          label: [-10, 0],
          army: [],
          fleet: []
        },
        'Gulf of Bothnia': {
          isWater: true,
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Gulf of Lyons': {
          isWater: true,
          supplyCenter: [],
          label: [10, 0],
          army: [],
          fleet: []
        },
        'Helgoland Bight': {
          isWater: true,
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Holland': {
          supplyCenter: [],
          label: [],
          army: [0, -15],
          fleet: [0, -15]
        },
        'Ionian Sea': {
          isWater: true,
          supplyCenter: [],
          label: [],
          army: [],
          fleet: [0, 10]
        },
        'Irish Sea': {
          isWater: true,
          supplyCenter: [],
          label: [0, 15],
          army: [],
          fleet: []
        },
        'Kiel': {
          supplyCenter: [],
          label: [],
          army: [5, -20],
          fleet: []
        },
        'Liverpool': {
          supplyCenter: [-5, 0],
          label: [],
          army: [],
          fleet: []
        },
        'Livonia': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'London': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: [-5, 12]
        },
        'Marseilles': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: [10, 20]
        },
        'Mid-Atlantic Ocean': {
          isWater: true,
          supplyCenter: [],
          label: [-20, -70],
          army: [],
          fleet: []
        },
        'Moscow': {
          supplyCenter: [],
          label: [],
          army: [-30, 20],
          fleet: []
        },
        'Munich': {
          supplyCenter: [],
          label: [13, 0],
          army: [0, 20],
          fleet: []
        },
        'Naples': {
          supplyCenter: [0, -20],
          label: [0, -20],
          army: [],
          fleet: []
        },
        'North Africa': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'North Atlantic Ocean': {
          isWater: true,
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'North Sea': {
          isWater: true,
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Norway': {
          supplyCenter: [-100, 80],
          label: [-80, 70],
          army: [],
          fleet: []
        },
        'Norwegian Sea': {
          isWater: true,
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Paris': {
          supplyCenter: [-10, -16],
          label: [-10, -18],
          army: [-7, 3],
          fleet: []
        },
        'Picardy': {
          supplyCenter: [],
          label: [0, 11],
          army: [],
          fleet: []
        },
        'Piedmont': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Portugal': {
          supplyCenter: [-10, 0],
          label: [-10, 0],
          army: [],
          fleet: []
        },
        'Prussia': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Rome': {
          supplyCenter: [-10, -10],
          label: [-10, -10],
          army: [3, 8],
          fleet: [3, 8]
        },
        'Ruhr': {
          supplyCenter: [],
          label: [],
          army: [0, 10],
          fleet: []
        },
        'Rumania': {
          supplyCenter: [],
          label: [0, 20],
          army: [],
          fleet: []
        },
        'Serbia': {
          supplyCenter: [],
          label: [5, 0],
          army: [0, -25],
          fleet: []
        },
        'Sevastopol': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Silesia': {
          supplyCenter: [],
          label: [5, -3],
          army: [],
          fleet: []
        },
        'Skagerrack': {
          isWater: true,
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Smyrna': {
          supplyCenter: [],
          label: [0, 20],
          army: [],
          fleet: [0, 40]
        },
        'Spain': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'St. Petersburg': {
          supplyCenter: [],
          label: [0, -5],
          army: [-30, 15],
          fleet: []
        },
        'Sweden': {
          supplyCenter: [-30, 70],
          label: [-25, 60],
          army: [],
          fleet: []
        },
        'Syria': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Trieste': {
          supplyCenter: [],
          label: [0, -5],
          army: [-10, -22],
          fleet: []
        },
        'Tunisia': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Tuscany': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Tyrolia': {
          supplyCenter: [],
          label: [0, 7],
          army: [],
          fleet: []
        },
        'Tyrrhenian Sea': {
          isWater: true,
          supplyCenter: [],
          label: [5, 5],
          army: [],
          fleet: [0, 20]
        },
        'Ukraine': {
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Venice': {
          supplyCenter: [-10, -25],
          label: [-10, -25],
          army: [],
          fleet: []
        },
        'Vienna': {
          supplyCenter: [-10, -10],
          label: [-10, -10],
          army: [-8, 10],
          fleet: []
        },
        'Wales': {
          supplyCenter: [],
          label: [8, 0],
          army: [],
          fleet: []
        },
        'Warsaw': {
          supplyCenter: [0, -5],
          label: [0, -7],
          army: [0, 17],
          fleet: []
        },
        'Western Mediterranean': {
          isWater: true,
          supplyCenter: [],
          label: [],
          army: [],
          fleet: []
        },
        'Yorkshire': {
          supplyCenter: [],
          label: [15, 0],
          army: [],
          fleet: []
        }
      };

  territoryData.Tunis = territoryData.Tunisia;
  jQuery.noConflict();
  $ = jQuery;
  $('#diplomacy-phaser').remove();
  $('<div id="diplomacy-phaser" />').appendTo('body');
  $areas = $('map area'),

  $areas.each(function() {
    var $a = $(this),
        titleRaw = $a.attr('title'),
        titleArr,
        title,
        ter,
        unitArr,
        unit,
        isSC,
        coords = $a.attr('coords').split(','),
        i;

    titleArr = titleRaw.split('\n');
    title = titleArr[0];
    titleArr[1] = titleArr[1] ? $.trim(titleArr[1]).split(' ') : null;

    titleArr[0] = titleArr[0].split('(');
    titleArr[0][0] = $.trim(titleArr[0][0]);

    if (titleArr[0][0].indexOf('*') !== -1 ) {
      isSC = true;
      titleArr[0][0] = titleArr[0][0].replace('*', '');
    }

    if (titleArr[0][1]) {
      titleArr[0][1] = $.trim(titleArr[0][1].replace(')', ''));
    }

    if (titleArr[1]) {
      titleArr[1][1] = titleArr[1][1].replace(')', '').replace('(', '');
    }

    ter = titleArr[0][0];
    areasObj[ter] = {};
    areasObj[ter].coords = [];
    areasObj[ter].type = $a.attr('data-type') || 'land';
    areasObj[ter].min = [coords[0], coords[1]];
    areasObj[ter].max = [coords[0], coords[1]];
    areasObj[ter].isSupplyCenter = isSC;
    areasObj[ter].owner = titleArr[0][1] ? titleArr[0][1] : null;
    areasObj[ter].unit = titleArr[1] ? titleArr[1] : null;

    for (i = 0; i < coords.length; i += 2) {
      areasObj[ter].coords.push([coords[i], coords[i+1]]);
      areasObj[ter].min[0] = Math.min(areasObj[ter].min[0], coords[i]);
      areasObj[ter].min[1] = Math.min(areasObj[ter].min[1], coords[i+1]);
      areasObj[ter].max[0] = Math.max(areasObj[ter].max[0], coords[i]);
      areasObj[ter].max[1] = Math.max(areasObj[ter].max[1], coords[i+1]);
    }

    areasObj[ter].width = areasObj[ter].max[0] - areasObj[ter].min[0];
    areasObj[ter].height = areasObj[ter].max[1] - areasObj[ter].min[1];
  });

  var drawArrowForGraphics = function(graphics, fromX, fromY, toX, toY) {
    //variables to be used when creating the arrow
    var headlen = 7,
        angle = Math.atan2(toY - fromY, toX - fromX);

    //starting path of the arrow from the start square to the end square and drawing the stroke
    graphics.moveTo(fromX, fromY);
    graphics.lineTo(toX, toY);

    //starting a new path from the head of the arrow to one of the sides of the point
    graphics.moveTo(toX, toY);
    graphics.lineTo(toX - headlen * Math.cos(angle - Math.PI / 7), toY - headlen * Math.sin(angle - Math.PI / 7));

    //path from the side point of the arrow, to the other side point
    graphics.lineTo(toX - headlen * Math.cos(angle + Math.PI / 7), toY - headlen * Math.sin(angle + Math.PI / 7));

    //path from the side point back to the tip of the arrow, and then again to the opposite side point
    graphics.lineTo(toX, toY);
    graphics.lineTo(toX - headlen * Math.cos(angle - Math.PI / 7), toY - headlen * Math.sin(angle - Math.PI / 7));
  };

  var getCenterPointInSprite = function(sprite) {
    var point = [];
    point[0] = sprite.width/2;
    point[1] = sprite.height/2;
    return point;
  };

  var drawStarInBitmap = function(bmd) {
    var cx = 6,
        cy = 6,
        spikes = 5,
        outerRadius = 6,
        innerRadius = 2,
        rot = Math.PI/2 * 3,
        x = cx,
        y = cy,
        step = Math.PI / spikes;

    bmd.ctx.strokeStyle = "#000";
    bmd.ctx.fillStyle = '#eee';
    bmd.ctx.beginPath();
    bmd.ctx.moveTo(cx, cy - outerRadius);

    for (i = 0; i < spikes; i++) {
      x= cx + Math.cos(rot) * outerRadius;
      y= cy + Math.sin(rot) * outerRadius;
      bmd.ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      bmd.ctx.lineTo(x, y);
      rot += step;
    }

    bmd.ctx.lineTo(x, y);
    bmd.ctx.stroke();
    bmd.ctx.fill();
    bmd.ctx.closePath();
  };

  var handleTerritoryLabel = function(terName, sprite) {
    var point = getCenterPointInSprite(sprite),
        txt;

    if (territoryData[terName].label && territoryData[terName].label.length > 0) {
      point[0] = point[0] + territoryData[terName].label[0];
      point[1] = point[1] + territoryData[terName].label[1];
    }

    txt = game.add.text(point[0], point[1], terName, { font: "11px Helvetica Neue", fill: "#000000", align: "center" });
    txt.anchor.set(0.5);
    txt.setShadow(0, 0, '#FFFFFF', 5);

    sprite.addChild(txt);
  };

  var handleSupplyCenter = function(terName, sprite) {
    var point = getCenterPointInSprite(sprite),
        newBmd,
        newSpr;

    if (territoryData[terName].supplyCenter && territoryData[terName].supplyCenter.length > 0) {
      point[0] = point[0] + territoryData[terName].supplyCenter[0];
      point[1] = point[1] + territoryData[terName].supplyCenter[1];
    }

    newBmd = game.add.bitmapData(30, 30),
    newSpr = game.add.sprite(point[0], point[1], newBmd);
    drawStarInBitmap(newBmd);
    sprite.addChild(newSpr);
  };

  var handleFleetUnit = function(terName, sprite, color) {
    var draw = function(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(56.25,0);
      ctx.lineTo(56.25,22.5);
      ctx.lineTo(0,22.5);
      ctx.closePath();
      ctx.clip();
      ctx.translate(0,0);
      ctx.translate(0,0);
      ctx.scale(1.25,1.25);
      ctx.translate(0,0);
      ctx.strokeStyle = 'rgba(0,0,0,0)';
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';
      ctx.miterLimit = 4;
      ctx.save();
      ctx.restore();
      ctx.save();
      ctx.strokeStyle = "rgba(0, 0, 0, 0)";
      ctx.fillStyle = color;
      ctx.translate(0,18);
      ctx.scale(0.1,-0.1);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(212,160);
      ctx.bezierCurveTo(205,149,193,140,184,140);
      ctx.bezierCurveTo(165,140,130,103,130,83);
      ctx.bezierCurveTo(130,75,117,70,93,70);
      ctx.bezierCurveTo(65,70,59,67,70,60);
      ctx.bezierCurveTo(81,53,73,50,42,50);
      ctx.bezierCurveTo(3,50,-1,48,2,28);
      ctx.bezierCurveTo(5,5,6,5,211,2);
      ctx.lineTo(417,0);
      ctx.lineTo(430,27);
      ctx.bezierCurveTo(438,43,446,58,448,62);
      ctx.bezierCurveTo(450,65,425,68,393,67);
      ctx.bezierCurveTo(326,66,290,76,290,95);
      ctx.bezierCurveTo(290,102,281,110,270,113);
      ctx.bezierCurveTo(255,117,250,127,250,149);
      ctx.bezierCurveTo(250,185,231,190,212,160);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.moveTo(256,103);
      ctx.bezierCurveTo(264,100,270,92,270,84);
      ctx.bezierCurveTo(270,76,277,70,285,70);
      ctx.bezierCurveTo(293,70,300,62,300,53);
      ctx.bezierCurveTo(300,38,302,37,310,50);
      ctx.bezierCurveTo(318,63,321,63,329,51);
      ctx.bezierCurveTo(337,38,355,39,413,56);
      ctx.bezierCurveTo(428,61,429,58,418,36);
      ctx.lineTo(407,10);
      ctx.lineTo(212,12);
      ctx.bezierCurveTo(67,14,16,18,12,28);
      ctx.bezierCurveTo(10,36,21,40,48,40);
      ctx.bezierCurveTo(71,40,91,46,94,53);
      ctx.bezierCurveTo(99,62,101,62,106,53);
      ctx.bezierCurveTo(113,36,134,56,145,90);
      ctx.bezierCurveTo(153,114,153,114,161,95);
      ctx.bezierCurveTo(168,78,169,79,169,103);
      ctx.bezierCurveTo(170,138,183,138,197,103);
      ctx.lineTo(208,75);
      ctx.lineTo(209,103);
      ctx.bezierCurveTo(210,118,216,139,223,151);
      ctx.bezierCurveTo(234,170,235,169,238,140);
      ctx.bezierCurveTo(240,123,248,106,256,103);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.restore();
      ctx.restore();
    };

    var point = getCenterPointInSprite(sprite),
        newSpr,
        bmd;

    if (territoryData[terName].army && territoryData[terName].fleet.length > 0) {
      point[0] = point[0] + territoryData[terName].fleet[0];
      point[1] = point[1] + territoryData[terName].fleet[1];
    }

    bmd = game.add.bitmapData(55, 23);
    newSpr = game.add.sprite(point[0], point[1], bmd);
    newSpr.anchor.set(0.5);
    newSpr.scale.setTo(0.8, 0.8);

    draw(bmd.ctx);

    sprite.addChild(newSpr);
    newSpr.tint = 0xCCCCCC;
  };

  var handleArmyUnit = function(terName, sprite, color) {
    var draw = function(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(50,0);
      ctx.lineTo(50,22.5);
      ctx.lineTo(0,22.5);
      ctx.closePath();
      ctx.clip();
      ctx.translate(0,0);
      ctx.translate(0,0);
      ctx.scale(1.25,1.25);
      ctx.translate(0,0);
      ctx.strokeStyle = 'rgba(0,0,0,0)';
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';
      ctx.miterLimit = 4;
      ctx.save();
      ctx.restore();
      ctx.save();
      ctx.fillStyle = color;
      ctx.strokeStyle = "rgba(0, 0, 0, 0)";
      ctx.translate(0,18);
      ctx.scale(0.1,-0.1);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(170,165);
      ctx.bezierCurveTo(140,158,89,151,58,151);
      ctx.bezierCurveTo(-24,150,-15,130,68,130);
      ctx.lineTo(135,129);
      ctx.lineTo(80,106);
      ctx.bezierCurveTo(18,79,8,59,41,24);
      ctx.bezierCurveTo(63,1,68,0,211,0);
      ctx.bezierCurveTo(358,0,359,0,379,26);
      ctx.bezierCurveTo(421,79,397,120,327,115);
      ctx.bezierCurveTo(301,114,280,116,280,121);
      ctx.bezierCurveTo(280,126,289,130,299,130);
      ctx.bezierCurveTo(322,130,336,148,323,161);
      ctx.bezierCurveTo(308,176,227,179,170,165);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#000000";
      ctx.moveTo(315,149);
      ctx.bezierCurveTo(320,144,316,140,303,140);
      ctx.bezierCurveTo(292,140,270,134,255,126);
      ctx.lineTo(228,112);
      ctx.lineTo(271,106);
      ctx.bezierCurveTo(295,103,328,99,344,98);
      ctx.bezierCurveTo(360,96,378,87,384,78);
      ctx.bezierCurveTo(393,64,389,55,367,33);
      ctx.bezierCurveTo(349,15,341,11,346,23);
      ctx.bezierCurveTo(351,36,347,40,331,40);
      ctx.bezierCurveTo(308,40,302,25,323,17);
      ctx.bezierCurveTo(329,14,323,11,308,11);
      ctx.bezierCurveTo(288,10,282,14,286,25);
      ctx.bezierCurveTo(290,36,286,40,270,40);
      ctx.bezierCurveTo(254,40,250,36,254,25);
      ctx.bezierCurveTo(258,15,253,10,240,10);
      ctx.bezierCurveTo(227,10,222,15,226,25);
      ctx.bezierCurveTo(230,36,226,40,210,40);
      ctx.bezierCurveTo(194,40,190,36,194,25);
      ctx.bezierCurveTo(198,15,193,10,180,10);
      ctx.bezierCurveTo(167,10,162,15,166,25);
      ctx.bezierCurveTo(170,36,166,40,150,40);
      ctx.bezierCurveTo(134,40,130,36,134,25);
      ctx.bezierCurveTo(138,15,133,10,120,10);
      ctx.bezierCurveTo(107,10,102,15,106,25);
      ctx.bezierCurveTo(110,36,106,40,90,40);
      ctx.bezierCurveTo(73,40,69,36,74,23);
      ctx.bezierCurveTo(79,10,74,12,56,29);
      ctx.bezierCurveTo(41,43,30,57,30,61);
      ctx.bezierCurveTo(30,74,120,110,154,111);
      ctx.bezierCurveTo(182,111,183,112,163,120);
      ctx.bezierCurveTo(128,134,136,146,188,157);
      ctx.bezierCurveTo(238,168,299,165,315,149);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.restore();
      ctx.restore();
    };

    var point = getCenterPointInSprite(sprite),
        newSpr,
        bmd;

    if (territoryData[terName].army && territoryData[terName].army.length > 0) {
      point[0] = point[0] + territoryData[terName].army[0];
      point[1] = point[1] + territoryData[terName].army[1];
    }

    bmd = game.add.bitmapData(50, 23);
    newSpr = game.add.sprite(point[0], point[1], bmd);
    newSpr.anchor.set(0.5);
    newSpr.scale.setTo(0.8, 0.8);

    draw(bmd.ctx);

    sprite.addChild(newSpr);
    newSpr.tint = 0xCCCCCC;
  };

  var preload = function() {
    //game.load.shader('bacteria', 'assets/bacteria.frag');
  };

  var create = function() {
    var territoryPoints,
        x,
        y,
        t,
        i,
        bmd, spr;

    //filter = new Phaser.Filter(game, null, game.cache.getShader('bacteria'));
    //filter.setResolution(800, 600);

    for (t in areasObj) {
      if (areasObj.hasOwnProperty(t)) {
        bmd = game.add.bitmapData(areasObj[t].width, areasObj[t].height);
        spr = game.add.sprite(areasObj[t].min[0], areasObj[t].min[1], bmd);
        territoryData[t].sprite = spr;

        bmd.ctx.strokeStyle = '#000';
        bmd.ctx.lineWidth = 1;

        territoryPoints = areasObj[t].coords;

        x = territoryPoints[0][0] - areasObj[t].min[0];
        y = territoryPoints[0][1] - areasObj[t].min[1];

        bmd.ctx.beginPath();
        bmd.ctx.moveTo(x, y);
        bmd.ctx.fillStyle = '#DBCDA4';

        if (territoryData[t].isWater) {
          //spr.filters = [ filter ];
          bmd.ctx.fillStyle = '#C2D3E2';
          spr.sendToBack();
        }

        if (areasObj[t].owner) {
          bmd.ctx.fillStyle = terColors[areasObj[t].owner];
        }

        for (i = 1; i < territoryPoints.length; i++) {
          x = territoryPoints[i][0] - areasObj[t].min[0];
          y = territoryPoints[i][1] - areasObj[t].min[1];
          bmd.ctx.lineTo(x, y);
        }

        bmd.ctx.textAlign = 'center';
        bmd.ctx.closePath();
        bmd.ctx.stroke();
        bmd.ctx.fill();

        handleTerritoryLabel(t, spr);

        if (areasObj[t].isSupplyCenter) {
          handleSupplyCenter(t, spr);
        }

        if (areasObj[t].unit) {
          if (areasObj[t].unit[0] === 'Army') {
            handleArmyUnit(t, spr, terColors[areasObj[t].unit[1]]);
          } else if (areasObj[t].unit[0] === 'Fleet') {
            handleFleetUnit(t, spr, terColors[areasObj[t].unit[1]]);
          }
        }
      }
    }

    processMoves();
  };

  var update = function() {
    //filter.update();
  };

  var processMoves = function() {
    var $orders = $('#orders_list_overlay_div_text > span:not(#ordersleft)');

    $orders.each(function() {
      var $o = $(this),
          ord = $o.text(),
          type = 'HOLD',
          orderArr,
          ter,
          dest1,
          dest2,
          destSplit;

      if (ord.indexOf('HOLD') !== -1) {
        ord = ord.replace('HOLD', '%%%');
        type = 'HOLD';
      } else if (ord.indexOf('MOVE') !== -1) {
        ord = ord.replace('MOVE', '%%%');
        type = 'MOVE';
      } else if (ord.indexOf('SUPPORT') !== -1) {
        ord = ord.replace('SUPPORT', '%%%');
        type = 'SUPPORT';
      } else if (ord.indexOf('CONVOY') !== -1) {
        ord = ord.replace('CONVOY', '%%%');
        type = 'CONVOY';
      }

      orderArr = ord.split('%%%');
      ter = $.trim(orderArr[0]);
      orderArr[1] = $.trim(orderArr[1].replace('(X)', ''));
      destSplit = orderArr[1].split(' to ');
      dest1 = destSplit[0];
      dest2 = destSplit.length > 0 ? destSplit[1] : null;

      if (territoryData[ter]) {
        ter = territoryData[ter];
      }

      if (type === 'MOVE' && territoryData[dest1]) {
        dest1 = territoryData[dest1];

        var center = getCenterPointInSprite(ter.sprite),
            destCenter = getCenterPointInSprite(dest1.sprite),
            graphics = game.add.graphics(0, 0);

        graphics.lineStyle(2, 0x000000, 0.6);
        drawArrowForGraphics(graphics, center[0] + ter.sprite.x, center[1] + ter.sprite.y, destCenter[0] + dest1.sprite.x, destCenter[1] + dest1.sprite.y);
      } else if (type === 'SUPPORT' && territoryData[dest1]) {
        if (dest2 === 'hold') {
          // SUPPORT HOLD
          dest1 = territoryData[dest1];

          var center = getCenterPointInSprite(ter.sprite),
              destCenter = getCenterPointInSprite(dest1.sprite),
              graphics = game.add.graphics(0, 0);

          graphics.lineStyle(2, 0x00FF00, 0.6);
          drawArrowForGraphics(graphics, center[0] + ter.sprite.x, center[1] + ter.sprite.y, destCenter[0] + dest1.sprite.x, destCenter[1] + dest1.sprite.y);
        } else if (territoryData[dest2]) {
          // SUPPORT MOVE
          dest2 = territoryData[dest2];

          var center = getCenterPointInSprite(ter.sprite),
              destCenter = getCenterPointInSprite(dest2.sprite),
              graphics = game.add.graphics(0, 0);

          graphics.lineStyle(2, 0x00FF00, 0.6);
          drawArrowForGraphics(graphics, center[0] + ter.sprite.x, center[1] + ter.sprite.y, destCenter[0] + dest2.sprite.x, destCenter[1] + dest2.sprite.y);
        }
      } else {
        // HOLD
        ter.sprite.tint = 0xFF0000;
      }
    });
  };

  game = new Phaser.Game(980, 770, Phaser.AUTO, 'diplomacy-phaser', { preload: preload, create: create, update: update });

}, 1000);
