/*global window, STCD, chrome*/
$(function() {

window.STCD = window.STCD || {};

(function(App){
    App.localeUrlMap = {
        US: "https://www.amazon.com",
        UK: "https://www.amazon.co.uk",
        DE: "https://www.amazon.de",
        FR: "https://www.amazon.fr",
        IT: "https://www.amazon.it",
        ES: "https://www.amazon.es",
        CN: "https://www.amazon.cn",
        JP: "https://www.amazon.co.jp",
        BR: "https://www.amazon.com.br",
        CA: "https://www.amazon.ca",
        AU: "https://www.amazon.com.au"
    };

    var serviceRegionMap = {
        USAmazon: {
            CDS : "https://cdws.us-east-1.amazonaws.com/drive/v1/",
            CDP : "https://content-na.drive.amazonaws.com/cdproxy/drive/v1/"
        },

        EUAmazon: {
            CDS : "https://cdws.eu-west-1.amazonaws.com/drive/v1/",
            CDP : "https://content-eu.drive.amazonaws.com/cdproxy/drive/v1/"
        },

        JPAmazon: {
            CDS : "https://cdws.us-west-2.amazonaws.com/drive/v1/",
            CDP : "https://content-jp.drive.amazonaws.com/cdproxy/drive/v1/"
        },

        CNAmazon: {
            CDS : "https://cdws-cn.us-west-2.amazonaws.com/drive/v1/",
            CDP : "https://content-cn.drive.amazonaws.com/cdproxy/drive/v1/"
        }
    };

    App.endpointMap = {
        US : serviceRegionMap.USAmazon,
        UK : serviceRegionMap.EUAmazon,
        DE : serviceRegionMap.EUAmazon,
        FR : serviceRegionMap.EUAmazon,
        IT : serviceRegionMap.EUAmazon,
        ES : serviceRegionMap.EUAmazon,
        CN : serviceRegionMap.CNAmazon,
        JP : serviceRegionMap.JPAmazon,
        BR : serviceRegionMap.USAmazon,
        CA : serviceRegionMap.USAmazon,
        AU : serviceRegionMap.JPAmazon
    };

    App.Config = function(){
        this.sessionId = "";
        this.amazonCookie = "";

        this.DEFAULT_LOCALE = "US";

        this.refreshCookies();

        this.forester = {   
            "API_VERSION": "1",
            "CHANNEL_ID": "clouddrive-photos",
            "CHANNEL_VERSION": "1",
            "EMPTY_ACTION": "OE",
            "FORESTER_VIP": "https://fls-na.amazon.com",
            "IMAGE_ACTION": "OP",
            "TEXT_ACTION": "TOP"
        };

    };

    App.Config.prototype = {
        getEndpoints: function(){
            var self = this;

            return App.storage.getLocale()
            .then(function(locale){
                locale = locale || self.DEFAULT_LOCALE;
                return App.endpointMap[locale];
            });
        },

        getLocaleURL: function(){
            var self = this;

            return App.storage.getLocale()
            .then(function(locale){
                locale = locale || self.DEFAULT_LOCALE;
                return App.localeUrlMap[locale];
            });
        },

        getCDPEndpoint: function(){
            var self = this;

            return self.getEndpoints()
            .then(function(endpoints){
                endpoints = endpoints || {};
                return endpoints.CDP;
            });
        },

        getCDSEndpoint: function(){
            var self = this;

            return self.getEndpoints()
            .then(function(endpoints){
                endpoints = endpoints || {};
                return endpoints.CDS;
            });
        },

        // Instead of reading it from domain, refresh cookies will now read from storage
        refreshCookies: function(){
            var self = this,
                def = $.Deferred();

            App.storage.getCookie()
            .then(function(bakedCookie){
                self.parseCookie(bakedCookie);
                def.resolve();

            });

            return def;

        },

        parseCookie: function(bakedCookie){
            this.amazonCookie = bakedCookie || "";
            this.sessionId = "";

            var cookies = bakedCookie.split(';') || [];
            for(var i=0;i<cookies.length;i++){
                var cookie = cookies[i].replace(/\s+/g, '');
                if(cookie.indexOf("session-id=") === 0){
                    this.sessionId = cookie.split("=")[1] || "";
                }
            }
        }

    };

    App.strings = {
        'title'                   : "Save to Cloud Drive",
        'filename-prefix'         : "SaveToCD",
        'confirmation-messege'    : "Image has been saved to Cloud Drive. Click here to see it.",
        'signin-message'          : "Please sign in to Cloud Drive to continue.",
        'failed-to-upload'        : "Failed to upload.",
        'popup-view-files'        : "View Files",
        'popup-sign-in'           : "Sign In",
        'popup-sign-out'          : "Sign Out"
    };


    App.config = new App.Config();

}) (STCD);
});