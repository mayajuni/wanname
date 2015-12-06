function Logger() {
    this.user_agent = navigator.userAgent;
    //this.user_agent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13A452 NAVER(inapp; search; 450; 6.4.5; 5S)';
    //this.user_agent = 'Mozilla/5.0 (Linux; Android 4.4.2; SHV-E250K Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.63 Mobile Safari/537.36 NAVER(higgs; search; 400; 6.5.2; 1.0.6.5)';
    this.user_os = this.user_agent.replace(/ /g,'');
    this.app_name = navigator.appName;
    this.app_version = navigator.appVersion;

    this.os = "";
    this.os_vers = "";
    this.osAnalytics();
        
    this.browser = "";
    this.browserAnalytics();
    
    this.is_mobile = "N";
    this.mobileAnalytics();
    
    this.exec();
}

Logger.prototype.exec = function() {
    var parameters = '';
    parameters += 'os='+this.os;
    parameters += '&os_vers='+this.os_vers;
    
    parameters += '&user_agent='+this.user_agent;
    parameters += '&browser='+this.browser;
    
    parameters += '&is_mobile='+this.is_mobile;
    
    parameters += '&screen_width='+screen.width;
    parameters += '&screen_height='+screen.height;

    /*$.post("/logger/script",
        parameters,
        function(data) {
            //console.log(data);
        });*/
}

Logger.prototype.mobileAnalytics = function() {
    var ua = this.user_agent;
    var M = ua.match(/(iphone|ipad|ipod|android)/i) || false;
    var device = M ? M[0] : '';
    
    if(device != '') this.is_mobile = "Y";
}

Logger.prototype.browserAnalytics = function() {
    this.browser = this.browserAnalyticsExec();
}

Logger.prototype.browserAnalyticsExec = function() {
    var ua= this.user_agent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    
    M= M[2]? [M[1], M[2]]: [this.app_name, this.app_version, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
   
    if(M[0] === 'MSIE'){
      return M.join('');
    } else if(M[0] === 'Safari') {
      return M.join('');
    } else {
      return M[0];
    }
}

Logger.prototype.osAnalytics = function() {
    var os_info = this.user_agent.toLowerCase(); 
    var os_divison = {
        Linux: /linux/.test(os_info),
        Unix: /x11/.test(os_info),
        Mac: /mac/.test(os_info),
        Windows: /win/.test(os_info)
    }
    
    this.os = 'Unknown';
    this.os_vers = '0';
    
    if(os_divison.Windows) {
        if(this.user_os.indexOf("WindowsCE") != -1) this.os="Windows CE";
        else if(this.user_os.indexOf("Windows95") != -1) this.os="Windows 95";
        else if(this.user_os.indexOf("Windows98") != -1) {
            if (this.user_os.indexOf("Win9x4.90") != -1) this.os="Windows Millennium Edition (Windows Me)" 
                else this.os="Windows 98"; 
        }
        else if(this.user_os.indexOf("WindowsNT4.0") != -1) this.os="Microsoft Windows NT 4.0";
        else if(this.user_os.indexOf("WindowsNT5.0") != -1) this.os="Windows 2000";
        else if(this.user_os.indexOf("WindowsNT5.01") != -1) this.os="Windows 2000, Service Pack 1 (SP1)";
        else if(this.user_os.indexOf("WindowsNT5.1") != -1) this.os="Windows XP";
        else if(this.user_os.indexOf("WindowsNT5.2") != -1) this.os="Windows 2003";
        else if(this.user_os.indexOf("WindowsNT6.0") != -1) this.os="Windows Vista/Server 2008";
        else if(this.user_os.indexOf("WindowsNT6.1") != -1) this.os="Windows 7";
        else if(this.user_os.indexOf("WindowsNT6.2") != -1) this.os="Windows 8";
        else if(this.user_os.indexOf("WindowsNT6.3") != -1) this.os="Windows 8.1";
        else if(this.user_os.indexOf("WindowsNT6.4") != -1) this.os="Windows 10";
        else if(this.user_os.indexOf("WindowsNT10.0") != -1) this.os="Windows 10";
        else if(this.user_os.indexOf("WindowsPhone8.0") != -1) this.os="Windows Phone 8.0";
        else if(this.user_os.indexOf("WindowsPhoneOS7.5") != -1) this.os="Windows Phone OS 7.5";
        else if(this.user_os.indexOf("Xbox") != -1) this.os="Xbox 360";
        else if(this.user_os.indexOf("XboxOne") != -1) this.os="Xbox One";
        else if(this.user_os.indexOf("Win16") != -1) this.os="Windows 3.x";
        else if(this.user_os.indexOf("ARM") != -1) this.os="Windows RT";
        else this.os="Windows (Unknown)";
    
        if(this.user_os.indexOf("WOW64") != -1) this.os_vers="WOW64";
        else if(this.user_os.indexOf("Win64;x64;") != -1) this.os_vers="Win64 on x64";
        else if(this.user_os.indexOf("Win16") != -1) this.os_vers="16-bit";
        else this.os_vers="on x86";
    } else if (os_divison.Linux) {
        if(this.user_os.indexOf("Android") != -1) { this.os = this.getAndroidDevName(); }
        else if(this.user_os.indexOf("BlackBerry9000") != -1) this.os="BlackBerry9000";
        else if(this.user_os.indexOf("BlackBerry9300") != -1) this.os="BlackBerry9300";
        else if(this.user_os.indexOf("BlackBerry9700") != -1) this.os="BlackBerry9700";
        else if(this.user_os.indexOf("BlackBerry9780") != -1) this.os="BlackBerry9780";
        else if(this.user_os.indexOf("BlackBerry9900") != -1) this.os="BlackBerry9900";
        else if(this.user_os.indexOf("BlackBerry;Opera Mini") != -1) this.os="Opera/9.80";
        else if(this.user_os.indexOf("Symbian/3") != -1) this.os="Symbian OS3";
        else if(this.user_os.indexOf("SymbianOS/6") != -1) this.os="Symbian OS6";
        else if(this.user_os.indexOf("SymbianOS/9") != -1) this.os="Symbian OS9";
        else if(this.user_os.indexOf("Ubuntu") != -1) this.os="Ubuntu";
        else if(this.user_os.indexOf("PDA") != -1) this.os="PDA";
        else if(this.user_os.indexOf("NintendoWii") != -1) this.os="Nintendo Wii";    
        else if(this.user_os.indexOf("PSP") != -1) this.os="PlayStation Portable";
        else if(this.user_os.indexOf("PS2;") != -1) this.os="PlayStation 2";
        else if(this.user_os.indexOf("PLAYSTATION3") != -1) this.os="PlayStation 3";  
        else this.os="Linux (Unknown)";
    
        if(this.user_os.indexOf("x86_64") != -1) this.os_vers="x86_64";
        else if(this.user_os.indexOf("i686") != -1) this.os_vers="i686";
        else if(this.user_os.indexOf("i686 on x86_64") != -1) this.os_vers="i686 running on x86_64";     
        else if(this.user_os.indexOf("armv7l") != -1) this.os_vers="Nokia N900 Linux mobile, on the Fennec browser";      
        else if(this.user_os.indexOf("IA-32") != -1) this.os_vers="32-bit";
        else this.os_vers="";
    
    } else if (os_divison.Unix) {
        this.os="UNIX";
    } else if (os_divison.Mac) {
        if(this.user_os.indexOf("iPhoneOS3") != -1) this.os="iPhone OS 3";
        else if(this.user_os.indexOf("iPhoneOS4") != -1) this.os="iPhone OS 4";
        else if(this.user_os.indexOf("iPhoneOS5") != -1) this.os="iPhone OS 5";
        else if(this.user_os.indexOf("iPhoneOS6") != -1) this.os="iPhone OS 6";
        else if(this.user_os.indexOf("iPhoneOS7") != -1) this.os="iPhone OS 7";
        else if(this.user_os.indexOf("iPhoneOS8") != -1) this.os="iPhone OS 8";
        else if(this.user_os.indexOf("iPhoneOS9") != -1) this.os="iPhone OS 9";
        else if(this.user_os.indexOf("iPad") != -1) this.os="iPad";
        else if((this.user_os.indexOf("MacOSX10_1")||this.user_os.indexOf("MacOSX10.1")) != -1) this.os="Mac OS X Puma";
        else if((this.user_os.indexOf("MacOSX10_2")||this.user_os.indexOf("MacOSX10.2")) != -1) this.os="Mac OS X Jaguar";
        else if((this.user_os.indexOf("MacOSX10_3")||this.user_os.indexOf("MacOSX10.3")) != -1) this.os="Mac OS X Panther";
        else if((this.user_os.indexOf("MacOSX10_4")||this.user_os.indexOf("MacOSX10.4")) != -1) this.os="Mac OS X Tiger";
        else if((this.user_os.indexOf("MacOSX10_5")||this.user_os.indexOf("MacOSX10.5")) != -1) this.os="Mac OS X Leopard";
        else if((this.user_os.indexOf("MacOSX10_6")||this.user_os.indexOf("MacOSX10.6")) != -1) this.os="Mac OS X Snow Leopard";
        else if((this.user_os.indexOf("MacOSX10_7")||this.user_os.indexOf("MacOSX10.7")) != -1) this.os="Mac OS X Lion";
        else if((this.user_os.indexOf("MacOSX10_8")||this.user_os.indexOf("MacOSX10.8")) != -1) this.os="Mac OS X Mountain Lion";
        else if((this.user_os.indexOf("MacOSX10_9")||this.user_os.indexOf("MacOSX10.9")) != -1) this.os="Mac OS X Mavericks";
        else if((this.user_os.indexOf("MacOSX10_10")||this.user_os.indexOf("MacOSX10.10")) != -1) this.os="Mac OS X Yosemite";     
        else this.os="MacOS (Unknown)";
        
        if(this.user_os.indexOf("Intel") != -1) this.os_vers=" on Intel x86 or x86_64";
        else if(this.user_os.indexOf("PPC") != -1) this.os_vers=" on PowerPC";
        else this.os_vers="";
        
    } else {
        this.os="Unknown OS";
    }
};

Logger.prototype.getAndroidDevName = function() {
    //ua = (ua || this.user_agent).toLowerCase(); 
    //var match = ua.match(/android\s([0-9\.]*)/);
    //if(match) { alert("Android "+match[1]); }
    
    //var regex = /;\s*([^;]+)\s+Build\//g;
    //var match = regex.exec(this.user_agent)[1];
    //alert("#" + match + "#");
    
    var ua = this.user_agent;
    var regex = /Android\s([0-9\.]*);\s*([^;]+)\s+Build\//g;
    var match= regex.exec(ua);
    
    if (match) {
        var ver = match[1];
        var dev_name = match[2];
        
        //return "Android "+ver +" "+ dev_name;
        return "Android "+ver;
    }
    
    return "Android OS";
};

new Logger();
