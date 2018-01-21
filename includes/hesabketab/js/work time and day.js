$("#slider-range-1").slider({
range: true,
min: 0,
max: 1440,
step: 15,
values: [510, 1020],
slide: function (e, ui) {
var hours1 = Math.floor(ui.values[0] / 60);
var minutes1 = ui.values[0] - (hours1 * 60);

if (hours1.length == 1) hours1 = '0' + hours1;
if (minutes1.length == 1) minutes1 = '0' + minutes1;
if (minutes1 == 0) minutes1 = '00';
if (hours1 >= 12) {
    if (hours1 == 12) {
        hours1 = hours1;
        minutes1 = minutes1 + " عصر";
    } else {
        hours1 = hours1 - 12;
        minutes1 = minutes1 + " عصر";
    }
} else {
    hours1 = hours1;
    minutes1 = minutes1 + " صبح";
}
if (hours1 == 0) {
    hours1 = 12;
    minutes1 = minutes1;
}



$('#slider-time-1').html(hours1 + ':' + minutes1);

var hours2 = Math.floor(ui.values[1] / 60);
var minutes2 = ui.values[1] - (hours2 * 60);

if (hours2.length == 1) hours2 = '0' + hours2;
if (minutes2.length == 1) minutes2 = '0' + minutes2;
if (minutes2 == 0) minutes2 = '00';
if (hours2 >= 12) {
    if (hours2 == 12) {
        hours2 = hours2;
        minutes2 = minutes2 + " عصر";
    } else if (hours2 == 24) {
        hours2 = 11;
        minutes2 = "59 عصر";
    } else {
        hours2 = hours2 - 12;
        minutes2 = minutes2 + " عصر";
    }
} else {
    hours2 = hours2;
    minutes2 = minutes2 + " صبح";
}

$('#slider-time2-1').html(hours2 + ':' + minutes2);
}
});

$("#slider-range-2").slider({
range: true,
min: 0,
max: 1440,
step: 15,
values: [510, 1020],
slide: function (e, ui) {
var hours1 = Math.floor(ui.values[0] / 60);
var minutes1 = ui.values[0] - (hours1 * 60);

if (hours1.length == 1) hours1 = '0' + hours1;
if (minutes1.length == 1) minutes1 = '0' + minutes1;
if (minutes1 == 0) minutes1 = '00';
if (hours1 >= 12) {
    if (hours1 == 12) {
        hours1 = hours1;
        minutes1 = minutes1 + " عصر";
    } else {
        hours1 = hours1 - 12;
        minutes1 = minutes1 + " عصر";
    }
} else {
    hours1 = hours1;
    minutes1 = minutes1 + " صبح";
}
if (hours1 == 0) {
    hours1 = 12;
    minutes1 = minutes1;
}



$('#slider-time-2').html(hours1 + ':' + minutes1);

var hours2 = Math.floor(ui.values[1] / 60);
var minutes2 = ui.values[1] - (hours2 * 60);

if (hours2.length == 1) hours2 = '0' + hours2;
if (minutes2.length == 1) minutes2 = '0' + minutes2;
if (minutes2 == 0) minutes2 = '00';
if (hours2 >= 12) {
    if (hours2 == 12) {
        hours2 = hours2;
        minutes2 = minutes2 + " عصر";
    } else if (hours2 == 24) {
        hours2 = 11;
        minutes2 = "59 عصر";
    } else {
        hours2 = hours2 - 12;
        minutes2 = minutes2 + " عصر";
    }
} else {
    hours2 = hours2;
    minutes2 = minutes2 + " صبح";
}

$('#slider-time2-2').html(hours2 + ':' + minutes2);
}
});

$("#slider-range-3").slider({
range: true,
min: 0,
max: 1440,
step: 15,
values: [510, 1020],
slide: function (e, ui) {
var hours1 = Math.floor(ui.values[0] / 60);
var minutes1 = ui.values[0] - (hours1 * 60);

if (hours1.length == 1) hours1 = '0' + hours1;
if (minutes1.length == 1) minutes1 = '0' + minutes1;
if (minutes1 == 0) minutes1 = '00';
if (hours1 >= 12) {
    if (hours1 == 12) {
        hours1 = hours1;
        minutes1 = minutes1 + " عصر";
    } else {
        hours1 = hours1 - 12;
        minutes1 = minutes1 + " عصر";
    }
} else {
    hours1 = hours1;
    minutes1 = minutes1 + " صبح";
}
if (hours1 == 0) {
    hours1 = 12;
    minutes1 = minutes1;
}



$('#slider-time-3').html(hours1 + ':' + minutes1);

var hours2 = Math.floor(ui.values[1] / 60);
var minutes2 = ui.values[1] - (hours2 * 60);

if (hours2.length == 1) hours2 = '0' + hours2;
if (minutes2.length == 1) minutes2 = '0' + minutes2;
if (minutes2 == 0) minutes2 = '00';
if (hours2 >= 12) {
    if (hours2 == 12) {
        hours2 = hours2;
        minutes2 = minutes2 + " عصر";
    } else if (hours2 == 24) {
        hours2 = 11;
        minutes2 = "59 عصر";
    } else {
        hours2 = hours2 - 12;
        minutes2 = minutes2 + " عصر";
    }
} else {
    hours2 = hours2;
    minutes2 = minutes2 + " صبح";
}

$('#slider-time2-3').html(hours2 + ':' + minutes2);
}
});

$("#slider-range-4").slider({
range: true,
min: 0,
max: 1440,
step: 15,
values: [510, 1020],
slide: function (e, ui) {
var hours1 = Math.floor(ui.values[0] / 60);
var minutes1 = ui.values[0] - (hours1 * 60);

if (hours1.length == 1) hours1 = '0' + hours1;
if (minutes1.length == 1) minutes1 = '0' + minutes1;
if (minutes1 == 0) minutes1 = '00';
if (hours1 >= 12) {
    if (hours1 == 12) {
        hours1 = hours1;
        minutes1 = minutes1 + " عصر";
    } else {
        hours1 = hours1 - 12;
        minutes1 = minutes1 + " عصر";
    }
} else {
    hours1 = hours1;
    minutes1 = minutes1 + " صبح";
}
if (hours1 == 0) {
    hours1 = 12;
    minutes1 = minutes1;
}



$('#slider-time-4').html(hours1 + ':' + minutes1);

var hours2 = Math.floor(ui.values[1] / 60);
var minutes2 = ui.values[1] - (hours2 * 60);

if (hours2.length == 1) hours2 = '0' + hours2;
if (minutes2.length == 1) minutes2 = '0' + minutes2;
if (minutes2 == 0) minutes2 = '00';
if (hours2 >= 12) {
    if (hours2 == 12) {
        hours2 = hours2;
        minutes2 = minutes2 + " عصر";
    } else if (hours2 == 24) {
        hours2 = 11;
        minutes2 = "59 عصر";
    } else {
        hours2 = hours2 - 12;
        minutes2 = minutes2 + " عصر";
    }
} else {
    hours2 = hours2;
    minutes2 = minutes2 + " صبح";
}

$('#slider-time2-4').html(hours2 + ':' + minutes2);
}
});

$("#slider-range-5").slider({
range: true,
min: 0,
max: 1440,
step: 15,
values: [510, 1020],
slide: function (e, ui) {
var hours1 = Math.floor(ui.values[0] / 60);
var minutes1 = ui.values[0] - (hours1 * 60);

if (hours1.length == 1) hours1 = '0' + hours1;
if (minutes1.length == 1) minutes1 = '0' + minutes1;
if (minutes1 == 0) minutes1 = '00';
if (hours1 >= 12) {
    if (hours1 == 12) {
        hours1 = hours1;
        minutes1 = minutes1 + " عصر";
    } else {
        hours1 = hours1 - 12;
        minutes1 = minutes1 + " عصر";
    }
} else {
    hours1 = hours1;
    minutes1 = minutes1 + " صبح";
}
if (hours1 == 0) {
    hours1 = 12;
    minutes1 = minutes1;
}



$('#slider-time-5').html(hours1 + ':' + minutes1);

var hours2 = Math.floor(ui.values[1] / 60);
var minutes2 = ui.values[1] - (hours2 * 60);

if (hours2.length == 1) hours2 = '0' + hours2;
if (minutes2.length == 1) minutes2 = '0' + minutes2;
if (minutes2 == 0) minutes2 = '00';
if (hours2 >= 12) {
    if (hours2 == 12) {
        hours2 = hours2;
        minutes2 = minutes2 + " عصر";
    } else if (hours2 == 24) {
        hours2 = 11;
        minutes2 = "59 عصر";
    } else {
        hours2 = hours2 - 12;
        minutes2 = minutes2 + " عصر";
    }
} else {
    hours2 = hours2;
    minutes2 = minutes2 + " صبح";
}

$('#slider-time2-5').html(hours2 + ':' + minutes2);
}
});

$("#slider-range-6").slider({
range: true,
min: 0,
max: 1440,
step: 15,
values: [510, 1020],
slide: function (e, ui) {
var hours1 = Math.floor(ui.values[0] / 60);
var minutes1 = ui.values[0] - (hours1 * 60);

if (hours1.length == 1) hours1 = '0' + hours1;
if (minutes1.length == 1) minutes1 = '0' + minutes1;
if (minutes1 == 0) minutes1 = '00';
if (hours1 >= 12) {
    if (hours1 == 12) {
        hours1 = hours1;
        minutes1 = minutes1 + " عصر";
    } else {
        hours1 = hours1 - 12;
        minutes1 = minutes1 + " عصر";
    }
} else {
    hours1 = hours1;
    minutes1 = minutes1 + " صبح";
}
if (hours1 == 0) {
    hours1 = 12;
    minutes1 = minutes1;
}



$('#slider-time-6').html(hours1 + ':' + minutes1);

var hours2 = Math.floor(ui.values[1] / 60);
var minutes2 = ui.values[1] - (hours2 * 60);

if (hours2.length == 1) hours2 = '0' + hours2;
if (minutes2.length == 1) minutes2 = '0' + minutes2;
if (minutes2 == 0) minutes2 = '00';
if (hours2 >= 12) {
    if (hours2 == 12) {
        hours2 = hours2;
        minutes2 = minutes2 + " عصر";
    } else if (hours2 == 24) {
        hours2 = 11;
        minutes2 = "59 عصر";
    } else {
        hours2 = hours2 - 12;
        minutes2 = minutes2 + " عصر";
    }
} else {
    hours2 = hours2;
    minutes2 = minutes2 + " صبح";
}

$('#slider-time2-6').html(hours2 + ':' + minutes2);
}
});

$("#slider-range-7").slider({
range: true,
min: 0,
max: 1440,
step: 15,
values: [510, 1020],
slide: function (e, ui) {
var hours1 = Math.floor(ui.values[0] / 60);
var minutes1 = ui.values[0] - (hours1 * 60);

if (hours1.length == 1) hours1 = '0' + hours1;
if (minutes1.length == 1) minutes1 = '0' + minutes1;
if (minutes1 == 0) minutes1 = '00';
if (hours1 >= 12) {
    if (hours1 == 12) {
        hours1 = hours1;
        minutes1 = minutes1 + " عصر";
    } else {
        hours1 = hours1 - 12;
        minutes1 = minutes1 + " عصر";
    }
} else {
    hours1 = hours1;
    minutes1 = minutes1 + " صبح";
}
if (hours1 == 0) {
    hours1 = 12;
    minutes1 = minutes1;
}



$('#slider-time-7').html(hours1 + ':' + minutes1);

var hours2 = Math.floor(ui.values[1] / 60);
var minutes2 = ui.values[1] - (hours2 * 60);

if (hours2.length == 1) hours2 = '0' + hours2;
if (minutes2.length == 1) minutes2 = '0' + minutes2;
if (minutes2 == 0) minutes2 = '00';
if (hours2 >= 12) {
    if (hours2 == 12) {
        hours2 = hours2;
        minutes2 = minutes2 + " عصر";
    } else if (hours2 == 24) {
        hours2 = 11;
        minutes2 = "59 عصر";
    } else {
        hours2 = hours2 - 12;
        minutes2 = minutes2 + " عصر";
    }
} else {
    hours2 = hours2;
    minutes2 = minutes2 + " صبح";
}

$('#slider-time2-7').html(hours2 + ':' + minutes2);
}
});