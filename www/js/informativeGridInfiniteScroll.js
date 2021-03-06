var loading = false;
var infiniteScroll_JSFlag; 
var itemsPerLoad = 10;
myApp.attachInfiniteScroll($$('.informativeGrid-infinite-scroll'))
$$('.informativeGrid-infinite-scroll').on('infinite', function () {
   
    gridId=$$(this).attr("id");
    var spName= gridId.split("__")[1];
    var lastIndex = $("#"+gridId+" ul tr").length;
    if (loading) return;  
    loading = true;
    setTimeout(function () {  
 
        loading = false;
        var url='http://'+ sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/GetNextInformativeGridRows';
        if (lastIndex >= gTotalRowNumber) {
            myApp.detachInfiniteScroll($$("#"+gridId));
            $$('.infinite-scroll-preloader '+gridId).remove();
            return;
        }      
      
        var data="{"+    
          "\"screenName\":\""+gScreenName+"\","+
          "\"spName\":\""+spName+"\","+  
          "\"mainItemId\":\""+gMainItemId+"\","+  
          "\"relatedItemId\":\""+gRelatedItemId+"\","+  
          "\"userData\":"+sessionStorage.getItem("userData")+","+
          "\"start\":\""+lastIndex+"\","+
          "\"limit\":\"10\","+      
          "\"windowWidth\":\""+window.innerWidth+"\"}"; 
        $.ajax({             
            type: 'POST',             
            url: url,                                     
            contentType: "text/plain",                             
            dataType: "json",                               
            async: false,                                
            data: data,         
            success: function(data) {              
                if(data.content==="")  
                { 
                    $$('.infinite-scroll-preloader '+gridId).remove();
                    return;  
                }
                $$("#"+gridId+" ul").append(data.content);
                gTotalRowNumber=data.totalRow;
                lastIndex=lastIndex+itemsPerLoad; 
            
            }, 
            error: function(e) { 
                 
                verifconnexion = false;        
                myApp.hidePreloader();
                errorMessage(e.message);
                 
            }           
        }); 
    }, 1000);
});
