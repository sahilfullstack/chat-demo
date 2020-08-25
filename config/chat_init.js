
module.exports = function (chat_FF,close_chat = false) {
    
    var initESW = function (gslbBaseURL) {
        if (close_chat) {
            if (embedded_svc && embedded_svc.liveAgentAPI) {
                embedded_svc.liveAgentAPI.endChat();
                embedded_svc.liveAgentAPI.clearSession();
            }
        }
        var userData = {
            first_name: '',
            last_name: '',
            email: ''
        };
        var logingData = null

        if (logingData) {
            userData.first_name = logingData.first_name;
            userData.last_name = logingData.last_name;
            userData.email = logingData.user_email;
        }

        console.log('display chat 1 ', chat_FF,close_chat, embedded_svc);
        
        embedded_svc.settings.displayHelpButton = true; //Or false
        embedded_svc.settings.language = ''; //For example, enter 'en' or 'en-US'

      
        embedded_svc.settings.avatarImgURL = '';
        embedded_svc.settings.prechatBackgroundImgURL = '';
        embedded_svc.settings.waitingStateBackgroundImgURL = '';
        embedded_svc.settings.smallCompanyLogoImgURL = '';

        embedded_svc.settings.enabledFeatures = ['LiveAgent'];
        embedded_svc.settings.entryFeature = 'LiveAgent';
        embedded_svc.settings.prepopulatedPrechatFields = {
            FirstName: userData.first_name,
            LastName: userData.last_name,
            Email: userData.email,
            Subject: userData.subject
        };


        embedded_svc.settings.widgetWidth = '300px';
        embedded_svc.settings.widgetHeight = '350px';
        //embedded_svc.settings.loadingText = "chat loading....";
        if (chat_FF) {
            embedded_svc.showHelpButton();
        } else {
            embedded_svc.hideHelpButton();
        }
       
        embedded_svc.addEventHandler("onSettingsCallCompleted", function (data) {
         

            if (chat_FF && data.isAgentAvailable) {
                embedded_svc.showHelpButton();
            } else {
                embedded_svc.hideHelpButton();
            }
            console.log("onSettingsCallCompleted event was fired. Agent availability status is", data.isAgentAvailable ? "online" : "offline");
        });
        embedded_svc.addEventHandler("onAgentMessage", function (data) {
           // console.log('onAgentMessage', data);
            let chatbtn = document.querySelector('.sidebarHeader.minimizedContainer.embeddedServiceSidebarMinimizedDefaultUI');
            if (chatbtn) {
                chatbtn.click();
            }
        });

         embedded_svc.init(
             'https://ap16.salesforce.com',
             'https://amangrovertest.force.com/liveAgentSetupFlow',
             gslbBaseURL,
             '00D2w000007Q6fH',
             'test123',
             {
                 baseLiveAgentContentURL: 'https://c.la2-c2-ukb.salesforceliveagent.com/content',
                 deploymentId: '5722w000000YMNb',
                 buttonId: '5732w000000YNOz',
                 baseLiveAgentURL: 'https://d.la2-c2-ukb.salesforceliveagent.com/chat',
                 eswLiveAgentDevName: 'EmbeddedServiceLiveAgent_Parent04I2w000000XqR6EAK_1735804be37',
                 isOfflineSupportEnabled: false
             }
        );

    };

    if (!window.embedded_svc) {
        var s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
         s.setAttribute('src', 'https://ap16.salesforce.com/embeddedservice/5.0/esw.min.js');
        s.onload = function () {
            initESW(null);
        };
        document.body.appendChild(s);
    } else {
        initESW('https://service.force.com');
    }
};