// ==UserScript==
// @name        theylive
// @namespace   n/a
// @description Either put on these glasses...
// @include     http*://*
// @version     1
// @resource    a1  ads/1.png
// @resource    a2  ads/2.png
// @resource    a3  ads/3.png
// @resource    a4  ads/4.png
// @resource    a5  ads/5.png
// @resource    a6  ads/6.png
// @resource    a7  ads/7.png
// @resource    a8  ads/8.png
// @resource    a9  ads/9.png
// @resource    a10 ads/10.png
// @resource    a11 ads/11.png
// @resource    gA  img/theylive-arrow.png
// @resource    gG  img/theylive-glasses.png
// @grant       GM_getResourceURL
// ==/UserScript==
  
    function randNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    function refreshGlasses() {
        glasses.style.visibility = 'visible';
        arrow.onclick = removeGlasses;
        this.style.transform = 'rotate(180deg)';

        var images = document.getElementsByTagName('img');
        for (var i = 0; i < images.length; i++) {
            if (images[i] !== glasses && images[i] !== arrow && !images[i].hasAttribute('data-oldsrc')) {
                var src = GM_getResourceURL('a' + randNum(1, 11).toString());
                var width = images[i].width;
                var height = images[i].height;
                images[i].setAttribute('data-oldsrc', images[i].src);
                images[i].src = src;
                images[i].width = width;
                images[i].height = height;
            };
        };
    };
    
    function removeGlasses() {
        arrow.onclick = refreshGlasses;
        glasses.style.visibility = 'hidden';
        this.style.transform = '';

        var images = document.getElementsByTagName('img');
        for (var i = 0; i < images.length; i++) {
            if (images[i].hasAttribute('data-oldsrc')) {
                var width = images[i].width;
                var height = images[i].height;
                images[i].src = images[i].attributes['data-oldsrc'].value;
                images[i].removeAttribute('data-oldsrc')
                images[i].width = width;
                images[i].height = height;
            };
        };
    };
    
    function loadGlasses() {
        console.log('glasses loaded');
        var tlwrapper = document.createElement('div');
        tlwrapper.id = 'theylive-wrapper';
        tlwrapper.style.position = 'fixed';
        tlwrapper.style.bottom = '0px';
        tlwrapper.style.left = '0px';
        tlwrapper.style.width = '90px';
        var glasses = document.createElement('img');
        glasses.id = 'theylive-glasses';
        glasses.src = GM_getResourceURL('gG');
        glasses.style.visibility = 'hidden';
        tlwrapper.appendChild(glasses);
        var arrow = document.createElement('img');
        arrow.id = 'theylive-arrow';
        arrow.src = GM_getResourceURL('gA');
        tlwrapper.appendChild(arrow);
        return tlwrapper;
    };

    var glasses_wrapper = loadGlasses();
    document.body.appendChild(glasses_wrapper);
    var glasses = document.getElementById('theylive-glasses');
    glasses.onclick = refreshGlasses;
    glasses.onmouseover = glasses.mouse = 'pointer';
    var arrow = document.getElementById('theylive-arrow');
    arrow.onclick = refreshGlasses;
    arrow.onmouseover = arrow.mouse = 'pointer';
