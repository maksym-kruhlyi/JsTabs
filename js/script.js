var tabModule = (function (win) {
    "use strict";
    var doc = win.document,
        nav = win.navigator;
    function createEventListeners(module) {
        module.listControls.onclick = function (e) {
            // get event and target
            var event = e || win.event,
                target = event.target || event.srcElement,
                deleteLink,
                deleteTab;
            // check if delite link clikced
            if (target.tagName === "SPAN" || ((' ' + target.className + ' ').indexOf(' tabs-controls-deletelink ') !== -1)) {
                deleteLink = target.parentNode;
                deleteTab = doc.getElementById(target.parentNode.hash.slice(1));
                deleteLink.parentNode.parentNode.removeChild(deleteLink.parentNode);
                deleteTab.parentNode.removeChild(deleteTab);
            }
            // check if link isn't active 
            if (target.tagName !== "A" || ((' ' + target.className + ' ').indexOf(' active ') !== -1)) {
                return false;
            }
            // hide active tab
            module.activeTab.style.display = "none";
            // remove 'active' class from current link
            module.activeLink.className = module.activeLink.className.replace(/(\s?active)\b/, '');
            // add 'active' class to new link
            module.activeLink = target;
            module.activeLink.className += module.activeLink.className.length ? " active" : "active";
            // show new tab
            module.activeTab = doc.getElementById(module.activeLink.hash.slice(1));
            module.activeTab.style.display = "block";
            // check mobile state
            if (module.isMobileState) {
                module.tabActiveName.innerText = module.activeLink.firstChild.data;
            }
            return false;
        };
        if (module.isMobileState) {
            module.tabNavbarTogg.onclick = function () {
                module.listControls.style.display = (module.listControls.style.display !== "none" ? "none" : "");
            };
        }
    }
    function isMobile() {
        // check for iPad mini
        if (nav.userAgent.match(/iPad/i) && win.screen.availWidth === 748 && win.screen.availHeight === 1024) {
            return true;
        }
        // check for iPad, Samsung Galaxy Tab and Nexus tablets
        if (nav.userAgent.match(/iPad|iPad.*Mobile/i)
                || nav.userAgent.match(/Android.*Nexus[\\s]+(7|9|10)|^.*Android.*Nexus(?:(?!Mobile).)*$/i)
                || nav.userAgent.match(/SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-I9205|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T707A|SM-T807A|SM-T237P|SM-T807P|SM-P607T|SM-T217T|SM-T337T/i)) {
            return false;
        }
        // check for mobile devices
        if (nav.userAgent.match(/Android/i)
                || nav.userAgent.match(/webOS/i)
                || nav.userAgent.match(/iPhone/i)
                || nav.userAgent.match(/iPod/i)
                || nav.userAgent.match(/BlackBerry/i)
                || nav.userAgent.match(/Windows Phone/i)) {
            return true;
        }
        return false;
    }
    return ({
        listControls    : doc.getElementById("tabs-controls"),
        listItems       : doc.getElementById("tabs-items"),
        activeTab       : null,
        activeLink      : null,
        tabNavbarTogg   : null,
        tabActiveName   : null,
        isMobileState   : false,
        init : function () {
            // get first link
            this.activeLink = this.listControls.getElementsByTagName("A")[0];
            // add 'active' class
            this.activeLink.className += this.activeLink.className.length ? " active" : "active";
            // get first tab
            this.activeTab = doc.getElementById(this.activeLink.hash.slice(1));
            // hide other tabs
            var length = this.listItems.childNodes.length,
                i = 0;
            for (i; i < length; i += 1) {
                if (this.listItems.childNodes[i].nodeName === "LI") {
                    this.listItems.childNodes[i].style.display = "none";
                }
            }
            // show active tab
            this.activeTab.style.display = "block";

            // set mobile state
            this.isMobileState = isMobile();
            if (this.isMobileState) {
                doc.body.className += this.activeLink.className.length ? " mobile" : "mobile";
                var tabNavbar = doc.getElementById("tab-navbar");
                this.tabNavbarTogg = tabNavbar.getElementsByTagName("BUTTON")[0];
                this.tabActiveName = tabNavbar.getElementsByTagName("SPAN")[0];
                this.tabActiveName.innerText = this.activeLink.firstChild.data;
                this.listControls.style.display = "none";
                tabNavbar.style.display = "block";
            }
            // create event listener
            createEventListeners(this);
            return this;
        }
    }).init();
}(this));