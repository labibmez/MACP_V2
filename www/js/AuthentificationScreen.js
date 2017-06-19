
function onClickLoginButton(){
      try {
          var login = document.getElementById('userName').value;
          var password = document.getElementById('password').value;
          if(login==="")
              login='""';
          if(password==="")
              password='""';
          myApp.showPreloader();
           var url ='http://'+ sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/Authentication/' + login + '/' + password;
          parseDataGet(url);   
          }
          catch(e){}
}
   
function manageAuthentifaction(result)
{
       
    switch (result["status"]) {   
              case "error":
                 myApp.alert(result["message"],'MACP');
                 myApp.hidePreloader(); 
                  break;
              case "ok":
                 {  
                   sessionStorage.setItem("userData",JSON.stringify(result.userData));  
                    if(!checkInternetConnection())                                                   
                        myApp.alert("please check your internet connection");
                    else 
                        mainView.router.load({url: 'homePage.html',ignoreCache: true,reload: true});
                   sessionStorage.setItem("dateFormat",result.dateFormat);
                     break;
                 }
                   
          }
}  
  
                     

$$('.Auth-confirm-ok-cancel').on('click', function () {
    myApp.confirm('Are you sure want to exit from App?', 'MACP',
      function () {
       navigator.app.exitApp();
      },
      function () {
      }
    );
});

function parseDataGet(url) {
    var dataToReturn = 'null';
    $.ajax({
        type: 'GET',
        url: url, 
        contentType: "text/plain",
        dataType: 'json',
        success: function(data) {
                         myApp.hidePreloader();    

             manageAuthentifaction(data);
        },
        error: function(e) {
           // if(e.status===0)
             myApp.hidePreloader();    
             errorMessage();    
        }
    });

}
