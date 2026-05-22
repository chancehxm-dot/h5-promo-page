function trackPageShow(Pstr="a_page_show") {
    let str = Pstr;
    console.log("trackPageShow: " + str);
    let aStr = "facebook";
    let img = document.createElement("img");
    img.style.display = 'none';
    const url = location.href;
    const domain = new URL(url).hostname.replace('www.', '').split('.')[0];
    if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        img.src = "https://" + location.hostname + "/" + domain.substring(0, 1) + ".gif?s=" + domain + "m&a=" + aStr + "m&t=" + str + "&_=" + Date.now();
    } else {
        img.src = "https://" + location.hostname + "/" + domain.substring(0, 1) + ".gif?s=" + domain + "&a=" + aStr + "&t=" + str + "&_=" + Date.now();
    }
}

if (window.addEventListener) {
    window.addEventListener("load", trackPageShow("a_page_show"), false);
} else if (window.attachEvent) {
    window.attachEvent("onload", trackPageShow("a_page_show"));
} else {
    window.onload = trackPageShow("a_page_show");
}

const btn = document.querySelector(".download-btn");
btn.addEventListener("click", function () {
   trackPageShow("a_install_click");
});
