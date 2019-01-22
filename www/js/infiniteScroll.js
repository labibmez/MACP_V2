var loading = false;
var infiniteScroll_JSFlag; 
// Last loaded index
var lastIndex = 30;
 
 
// Append items per load
var itemsPerLoad = 10;
myApp.attachInfiniteScroll($$('.infinite-scroll'))
// Attach 'infinite' event handler
$$('.infinite-scroll').on('infinite', function () {
   
    if (loading) return;  
    loading = true;
    setTimeout(function () {  

        // Emulate 1s loading     
        // Reset loading flag  
        loading = false;
        var url='http://'+ sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/GetNextSearchResult';
        if (lastIndex >= totalRowNumber) {
            myApp.detachInfiniteScroll($$('.infinite-scroll'));
            $$('.infinite-scroll-preloader').remove();
            return;
        }      
      
        var data="{"+    
          "\"item\":\""+currentSearchItem+"\","+
          "\"userData\":"+sessionStorage.getItem("userData")+","+
          "\"searchParams\":"+currentSearchParams+","+
          "\"start\":\""+lastIndex+"\","+
          "\"limit\":\"10\","+      
          "\"windowWidth\":\""+window.innerWidth+"\","+
          "\"windowHeight\":\""+(window.innerHeight-70)+"\"}"; 
        console.log("SearchParams",data);        
        $.ajax({             
            type: 'POST',             
            url: url,                                     
            contentType: "text/plain",                            
            dataType: "json",                               
            async: false,                                
            data: data,         
            success: function(data) {              
                if(data.data==="")  
                { 
                    $$('.infinite-scroll-preloader').remove();
                    return;  
                }
                $$('.tasksTableElement ul').append(data.data);
                lastIndex=lastIndex+itemsPerLoad; 
            
            },
            error: function(e) { 
                console.log(e.message);  
                verifconnexion = false;        
                myApp.hidePreloader();
                errorMessage();
                 
            }           
        }); 
    }, 1000);
});
