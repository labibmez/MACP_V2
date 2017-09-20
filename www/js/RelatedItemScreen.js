function relatedItemSaveButtonClick(msg,msgTitle,mainItemId,screenName) {
    SuccessMsg = msg;
    SuccesMsgTitle = msgTitle;
    var isValidForm = requiredFormComponent();
    if(isValidForm){                          
        var formData = myApp.formToData('#my-relatedItemPopup-form');
        Parameters = JSON.stringify(formData);           
        UpdateRelatedItemEvent(mainItemId,screenName);          
    }
}

function UpdateRelatedItemEvent(mainItemId,screenName) {
                var updateId = gRelatedItemId;
            if (isDuplicate === "isDuplicate")
                updateId = 0;
            var data = "{" +
               "\"mainItemId\":\"" + mainItemId + "\"," +
               "\"relatedItemId\":\"" + updateId + "\"," +
               "\"screenName\":\"" + screenName + "\"," +
               "\"ipAddress\":\"" + sessionStorage.getItem("Ip_config") + "\"," +
               "\"userData\":"+sessionStorage.getItem("userData")+"," +
               "\"parameters\":" + Parameters + "}";
            myApp.showPreloader();
            var url = 'http://' + sessionStorage.getItem('Ip_config') + ':' + sessionStorage.getItem('Ip_port') + '/MobileAPI.svc/SaveRelatedItemEvent';

            $.ajax({
                type: 'POST',
                url: url,
                contentType: "text/plain",
                dataType: "json",
                data: data,
                success: function (data) {

                    if (data.status === "ok") {
                        myApp.hidePreloader();
                        manageSaveRelatedItemResponse(data,screenName);
                    }
                    else {
                        myApp.hidePreloader();
                        myApp.alert("error saving", "Error");
                    }
                },
                error: function (e) {
 
                    
                    verifconnexion = false;
                    myApp.hidePreloader();
            errorMessage(e.message); 


                }
            });

        }

function UpdateRelatedItem(screenName) {
            var updateId = gRelatedItemId;
            if (isDuplicate === "isDuplicate")
                updateId = 0;
            var data = "{" +
               "\"mainItemId\":\"" + mainItemIdForRelatedScreen + "\"," +
               "\"relatedItemId\":\"" + updateId + "\"," +
               "\"screenName\":\"" + screenName + "\"," +
               "\"userData\":"+sessionStorage.getItem("userData")+"," +
               "\"ipAddress\":\"" + sessionStorage.getItem("Ip_config") + "\"," +
               "\"parameters\":" + Parameters + "}";
            myApp.showPreloader();
            var url = 'http://' + sessionStorage.getItem('Ip_config') + ':' + sessionStorage.getItem('Ip_port') + '/MobileAPI.svc/SaveRelatedItem';

            $.ajax({
                type: 'POST',
                url: url,
                contentType: "text/plain",
                dataType: "json",
                data: data,
                success: function (data) {

                    if (data.status === "ok") {

                        myApp.hidePreloader();
                        myApp.alert(SuccessMsg,"MACP", function () {
                            loadScreen(screenName,gMainItemId,gSubItem,"classicre");
                             mainView.router.back({reloadPrevious:true});
                        });

                    }
                    else {
                        myApp.hidePreloader();
                        myApp.alert(data.message, data.messageTitle);
                    }
                },
                error: function (e) {

                    
                    verifconnexion = false;
                    myApp.hidePreloader();
            errorMessage(e.message);


                }
            });
        }

function manageSaveRelatedItemResponse(data,screenName) {
            if (data.behavior != null) {

                switch (data.behavior) {
                    case "blockingAlert":
                        {
                            myApp.alert(data.message, "Exception");
                            break;
                        }
                    case "optionalAlert":
                        {
                            myApp.confirm(data.message, "Exception", function () {
                                UpdateRelatedItem(screenName);
                            });
                            break;
                        }
                    case "deviationAlert":
                        {
                            errorMsg = data.message;

                            myApp.popup('<div class="popup" style="width: 50% !important; height: 50% !important; top: 25% !important;left: 25% !important; margin-left: 0px !important; margin-top: 0px !important; position:absoloute !important; background : #f1f1f1 !important;" ><div class="content-block-title" style="word-wrap: break-word !important;white-space : inherit !important;">' + data.message + '</br></br></div><div class="list-block" ><ul><li class="align-top"><div class="item-content"><div class="item-media"></div><div class="item-inner"><div class="item-input"><textarea id="deviationComment" onkeyup="saveProcessEngineComment_enabledButton(this)"></textarea></div></div></div></li></ul></<div><br><br><div class="row"><div class="col-50"><a href="#" class="button button-fill disabled" onclick="saveBeforeUpdateRelatedItem_DeviationComment()" id="saveProcessEngineCommentButton">Yes</a></div><div class="col-50"><a href="#" class="button button-fill active" onclick="myApp.closeModal()">No</a></div></div></div>', true);
                            break;
                        }
                }
            } 
            else {

                myApp.hidePreloader();
                myApp.alert(SuccessMsg, SuccesMsgTitle, function () {
                            loadScreen(gScreenName,gMainItemId,gSubItem,"classicre");
                    mainView.router.back({reloadPrevious:true});
                });
                myApp.closeModal(".popup", true);
            }
        }

function saveProcessEngineComment_enabledButton(textarea) {

            var saveProcessEngineCommentButton = document.getElementById("saveProcessEngineCommentButton");
            if (textarea.value.length != 0) {
                saveProcessEngineCommentButton.className = "button button-fill active";
            }
            else {
                saveProcessEngineCommentButton.className = "button button-fill disabled";
            }


        };

function saveBeforeUpdateRelatedItem_DeviationComment(item) {
            var comment = document.getElementById("deviationComment").value;
            var updateId = relatedItemId;
            if (isDuplicate === "isDuplicate")
                updateId = 0;
            var data = "{" +
                "\"screenName\":\"" + item + "\"," +
                "\"userData\":"+sessionStorage.getItem("userData")+"," +
                "\"mainItemId\":\"" + mainItemIdForRelatedScreen + "\"," +
                "\"relatedItemId\":\"0\"," +
                "\"comment\":\"" + comment + "\"," +
                "\"errorMsg\":\"" + errorMsg + "\"," +
                "\"parameters\":" + Parameters + "}";
            myApp.showPreloader();
            var url = 'http://' + sessionStorage.getItem('Ip_config') + ':' + sessionStorage.getItem('Ip_port') + '/MobileAPI.svc/SaveBeforeUpdateRelatedItem_LogDeviation';

            $.ajax({
                type: 'POST',
                url: url,
                contentType: "text/plain",
                dataType: "json",
                data: data,
                success: function (data) {

                    if (data.status === "ok") {
                        myApp.hidePreloader();
                        myApp.closeModal();
                        myApp.alert(SuccessMsg, SuccesMsgTitle, function () {
                           loadScreen(gScreenName,gMainItemId,gSubItem,"classicre");
                             mainView.router.back({reloadPrevious:true});
                        });
                    }
                    else {
                        myApp.hidePreloader();
                        myApp.alert(data.message, messageTitle);
                    }
                },
                error: function (e) {

                    
                    verifconnexion = false;
                    myApp.hidePreloader();
            errorMessage(e.message);


                }
            });
        }