export function detectIfIsMobile(windowContext):boolean {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(windowContext.navigator.userAgent))
        return true
    else
        return false
}

export function convertColorToRGBA(color, opacity) {
    let result = color;
    // console.log('convertColorToRGBA' , color, opacity);
    if ( color && color.indexOf('#') > -1 ) {
        color = color.replace('#', '');
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);
        result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    } else if ( color && color.indexOf('rgba') > -1 ) {
        const rgb = color.split(',');
        const r = rgb[0].substring(5);
        const g = rgb[1];
        const b = rgb[2];
        // const b = rgb[2].substring(1, rgb[2].length - 1);
        result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    } else if ( color && color.indexOf('rgb(') > -1 ) {
        const rgb = color.split(',');
        // console.log(rgb);
        const r = rgb[0].substring(4);
        const g = rgb[1];
        const b = rgb[2].substring(0, rgb[2].length - 1);
        // console.log(b);
        // console.log(rgb[2].length);
        result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    }
    // console.log('convertColorToRGBA' + color + result);
    return result;
}


export function getParameterByName(windowContext: any, name: String) {
    const url = windowContext.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    // const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url); //BUG-FIXED: when HEX color was passed throw url
    const regex = new RegExp('[?&]' + name + '(=([^&]*)|&|$)'), results = regex.exec(url);
    // console.log('results----> ', results);
    if (!results) { return null; }
    if (!results[2]) {
        return 'true';
    } else if (results[2] === 'false' || results[2] === '0') {
        return 'false';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


/** ********* CONVERSATION UTILS: START ********* */
export function setColorFromString(str: string) {
    const arrayBckColor = ['#fba76f', '#80d066', '#73cdd0', '#ecd074', '#6fb1e4', '#f98bae'];
    let num = 0;
    if (str) {
      const code = str.charCodeAt((str.length - 1));
      num = Math.round(code % arrayBckColor.length);
    }
    return arrayBckColor[num];
}


export function avatarPlaceholder(name: string) {
    let initials = '';
    if (name) {
      const arrayName = name.split(' ');
      arrayName.forEach(member => {
        if (member.trim().length > 1 && initials.length < 3) {
          initials += member.substring(0, 1).toUpperCase();
        }
      });
    }
    return initials;
}

/** ********* CONVERSATION UTILS: START ********* */