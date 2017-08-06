function colourToHex(colour) {
  var hex = "#";
  for(var i = 0; i < colour.length; ++i) {
    var c = Math.max(0, Math.min(colour[i], 1));
    if(c === 1) {
      c = 255;
    } else {
      c = Math.floor(c*256);
    }
    if(c < 16) {
      hex += "0";
    }
    hex += c.toString(16);
  }
  return hex;
}

function rgbToLinear(colour) {
  var linear = [0, 0, 0];
  for(var i = 0; i < 3; ++i) {
    if(colour[i] > 0.04045) {
      linear[i] = Math.pow((colour[i] + 0.055)/1.055, 2.4);
    } else {
      linear[i] = colour[i]/12.92;
    }
  }
  return linear;
}

function linearToXyz(linear) {
  return [
    0.4124*linear[0] + 0.3576*linear[1] + 0.1805*linear[2],
    0.2126*linear[0] + 0.7152*linear[1] + 0.0722*linear[2],
    0.0193*linear[0] + 0.1192*linear[1] + 0.9505*linear[2]
  ];
}

function labF(t) {
  if(t > 216/24389) {
    return Math.pow(t, 1/3);
  } else {
    return 4/29 + (841*t)/108;
  }
}

function xyzToLab(xyz) {
  return [
    116*labF(xyz[1]/100) - 16,
    500*(labF(xyz[0]/95.047) - labF(xyz[1]/100)),
    200*(labF(xyz[1]/100) - labF(xyz[2]/108.883))
  ];
}

function labToLch(lab) {
  var lch = [
    lab[0],
    Math.sqrt(lab[1]*lab[1] + lab[2]*lab[2]),
    Math.atan2(lab[2], lab[1])*180/Math.PI
  ];
  if(lch[2] < 0) {
    lch[2] += 360;
  }
  return lch;
}

function lchToLab(lch) {
  return [
    lch[0],
    lch[1]*Math.cos(lch[2]*Math.PI/180),
    lch[1]*Math.sin(lch[2]*Math.PI/180)
  ];
}

function labFInverse(t) {
  if(t > 6/29) {
    return Math.pow(t, 3);
  } else {
    return 108*((-4/29) + t)/841;
  }
}

function labToXyz(lab) {
  return [
    95.047*labFInverse((lab[0] + 16)/116 + lab[1]/500),
    100*labFInverse((lab[0] + 16)/116),
    108.883*labFInverse((lab[0] + 16)/116 - lab[2]/200)
  ];
}

function xyzToLinear(xyz) {
  return [
    3.2406*xyz[0] - 1.5372*xyz[1] - 0.4986*xyz[2],
    -0.9689*xyz[0] + 1.8758*xyz[1] + 0.0415*xyz[2],
    0.0557*xyz[0] - 0.2040*xyz[1] + 1.0570*xyz[2]
  ];
}

function linearToRgb(linear) {
  var colour = [0, 0, 0];
  for(var i = 0; i < 3; ++i) {
    if(linear[i] > 0.0031308) {
      colour[i] = 1.055*Math.pow(linear[i], 1/2.4) - 0.055;
    } else {
      colour[i] = 12.92*linear[i];
    }
  }
  return colour;
}

function fullnessToColour(fullness) {
  let emptyColourFg = labToLch(xyzToLab(linearToXyz(rgbToLinear([
    0.54509803921568627450980392156863, 0.76470588235294117647058823529412, 0.29019607843137254901960784313725
  ]))));
  let midColourFg = labToLch(xyzToLab(linearToXyz(rgbToLinear([
    1, 0.75686274509803921568627450980392, 0.02745098039215686274509803921569
  ]))));
  let fullColourFg = labToLch(xyzToLab(linearToXyz(rgbToLinear([
    0.83529411764705882352941176470588, 0, 0
  ]))));
  let finalColourFg = linearToRgb(xyzToLinear(labToXyz(lchToLab([
    emptyColourFg[0] + fullness*(fullColourFg[0] - emptyColourFg[0]),
    emptyColourFg[1] + fullness*(fullColourFg[1] - emptyColourFg[1]),
    emptyColourFg[2] + fullness*(fullColourFg[2] - emptyColourFg[2])
  ]))));
  return colourToHex(finalColourFg);
}
export { fullnessToColour };
export default fullnessToColour;