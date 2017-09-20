var NewInputScreen_JSFlag;
var errorMsg;
/*
$$('.newInput-form-to-data').on('click', function(){
    var formId = "form"; 
    var isValidForm = requiredFormComponent(formId); 
    if(isValidForm)
    {
        var formData = myApp.formToData('#my-newInput-form');
        parameters=JSON.stringify(formData);
        saveNewInputEvent(parameters);
    }
});
*/
function saveNewInputEvent(screenName){
     var formId = "form"; 
    var isValidForm = requiredFormComponent(formId); 
    if(isValidForm)
    {
      var formData = myApp.formToData('#my-newInput-form');
      var  parameters=JSON.stringify(formData);  
      var data="{"+    
        "\"screenName\":\""+screenName+"\","+
        "\"userData\":"+sessionStorage.getItem("userData")+","+
        "\"ipAddress\":\""+sessionStorage.getItem("Ip_config")+"\"," +  
        "\"parameters\":"+parameters+"}";  
     myApp.showPreloader();
     var url="http://"+sessionStorage.getItem('Ip_config')+":"+sessionStorage.getItem('Ip_port')+"/MobileAPI.svc/SaveNewInputEvent";
     $.ajax({             
        type: 'POST',           
        url: url,                  
        contentType: "text/plain",                          
        dataType: "json",                            
        data: data,             
        success: function(data) {     
            myApp.hidePreloader();
            if(data.status==="ok")
            {
                   manageSaveInputResponse(data,screenName);
            }
            else  
            {
                   myApp.alert(data.message,data.message);
            }
        },
        error: function(e) { 
            
            verifconnexion = false;        
             myApp.hidePreloader();
            errorMessage(e.message);
     }                           
    });
  }
}


function saveNewInput(parameters,screenName){
    
      var data="{"+    
        "\"screenName\":\""+screenName+"\","+
        "\"userData\":"+sessionStorage.getItem("userData")+","+
        "\"ipAddress\":\""+sessionStorage.getItem("Ip_config")+"\"," + 
        "\"parameters\":"+parameters+"}";  
     myApp.showPreloader();
     var url="http://"+sessionStorage.getItem('Ip_config')+":"+sessionStorage.getItem('Ip_port')+"/MobileAPI.svc/SaveNewInput";
     $.ajax({             
        type: 'POST',           
        url: url,                  
        contentType: "text/plain",                          
        dataType: "json",                            
        data: data,             
        success: function(data) {  
        if(data.status==="ok")
        {
            myApp.hidePreloader();
            gMainItemId=data.itemId;     
            gPageTitleContent=data.itemRef; 
            gTargetTab=data.targetTab;  
            if(!checkInternetConnection())                                                   
                myApp.alert("please check your internet connection");
            else
                {
                gScreenName=screenName;     
                loadEditScreen(false);
                }
        }
        else
        {
            myApp.hidePreloader();
            errorMessage(data.messageTitle,data.message);
        }
        },
        error: function(e) { 
            
            verifconnexion = false;        
             myApp.hidePreloader();
            errorMessage(e.message);

                                 
        }                           
    });    
}


function manageSaveInputResponse(data,screenName)
{
   
    if(data.behavior!=null)
    {
       
            switch(data.behavior)
                {
                    case "blockingAlert" :
                        {
                            myApp.alert(data.message,"Exception");
                            break;
                        }
                    case "optionalAlert" :
                        {
                              myApp.confirm(data.message, "Exception", function () {
                                        var formData = myApp.formToData('#my-newInput-form');
                                        parameters=JSON.stringify(formData);
                                        saveNewInput(parameters,screenName);
                                         });
                            break;
                        }
                    case "deviationAlert" :
                        {
                             errorMsg=data.message;
                             myApp.popup('<div class="popup" style="width: 50% !important; height: 50% !important; top: 25% !important;left: 25% !important; margin-left: 0px !important; margin-top: 0px !important; position:absoloute !important; background : #f1f1f1 !important;" ><div class="content-block-title" style="word-wrap: break-word !important;white-space : inherit !important;">'+data.message+'</br></br></div><div class="list-block" ><ul><li class="align-top"><div class="item-content"><div class="item-media"></div><div class="item-inner"><div class="item-input"><textarea id="deviationComment" onkeyup="saveProcessEngineComment_enabledButton(this)"></textarea></div></div></div></li></ul></<div><br><br><div class="row"><div class="col-50"><a href="#" class="button button-fill disabled" onclick="saveBeforeInsert_DeviationComment("'+screenName+'")" id="saveProcessEngineCommentButton">Yes</a></div><div class="col-50"><a href="#" class="button button-fill active" onclick="myApp.closeModal()">No</a></div></div></div>', true);
                            break;
                        }
                }
    }
    else
        { 
            gMainItemId=data.itemId;
            gPageTitleContent=data.itemRef;
            gTargetTab=data.targetTab;
            if(!checkInternetConnection())                                                   
                myApp.alert("please check your internet connection");
            else
                {
                gScreenName=screenName; 
                loadEditScreen(false);
                }
        }
}

function saveProcessEngineComment_enabledButton(textarea){
   
    var saveProcessEngineCommentButton=document.getElementById("saveProcessEngineCommentButton");
    if(textarea.value.length!=0)
        {
            saveProcessEngineCommentButton.className ="button button-fill active";
        }
    else
    {
        saveProcessEngineCommentButton.className ="button button-fill disabled";
    }
    
      
}; 

function saveBeforeInsert_DeviationComment(screenName)
{
     var comment=document.getElementById("deviationComment").value; 
     var formData = myApp.formToData('#my-newInput-form');
      var  parameters=JSON.stringify(formData);
       myApp.closeModal(); 
      var data="{"+    
        "\"screenName\":\""+screenName+"\","+
        "\"userData\":"+sessionStorage.getItem("userData")+","+
        "\"mainItemId\":\"0\"," +
        "\"relatedItemId\":\"0\"," +
        "\"comment\":\""+comment+"\"," +
        "\"errorMsg\":\""+errorMsg+"\"," +  
        "\"parameters\":"+parameters+"}";  
     myApp.showPreloader();
     var url="http://"+sessionStorage.getItem('Ip_config')+":"+sessionStorage.getItem('Ip_port')+"/MobileAPI.svc/SaveBeforeInsert_LogDeviation";
     $.ajax({             
        type: 'POST',           
        url: url,                  
        contentType: "text/plain",                          
        dataType: "json",                            
        data: data,             
        success: function(data) {   
       if(data.status==="ok")
         {
            myApp.hidePreloader();
            itemId=data.itemId; 
            gPageTitleContent=data.itemRef;              
            gTargetTab=data.targetTab; 
            if(!checkInternetConnection())                                                   
                myApp.alert("please check your internet connection");
            else 
                mainView.router.load({url: "editScreen.html",reload:true});
        }
      else
        {  
            myApp.hidePreloader();
                    myApp.alert(data.message,data.messageTitle);    
        }
        },
        error: function(e) { 
              
            verifconnexion = false;        
             myApp.hidePreloader();
            errorMessage(e.message);

                                 
        }                           
    }); 
}

