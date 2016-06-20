

        var i=1;
        var total =1;
        var responseData = null;
        document.getElementById("prevLink").disabled = "disbaled";
        document.getElementById("p1").style.visibility = "hidden";
        document.getElementById("links").style.visibility = "hidden";


// The callback jsonP Response
       function jsonPResponse(response) {
 
         responseData = response;      
         document.getElementById("p1").innerHTML = "Total : "+responseData._total;
          var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
          var stream = responseData.streams;
          total = Math.ceil(responseData._total /10 );
          setPageCount();
          for (var i = 0; i < stream.length; i++) {

          var newRow   = tableRef.insertRow(tableRef.rows.length);

          var newCell  = newRow.insertCell(0);
              newCell.innerHTML= ("<img src=\"" + stream[i].preview.large + "\"height='300' width='300'>");

          var newCell1  = newRow.insertCell(1);
          newCell1.innerHTML= "<h2><a href=\""+stream[i].channel.url+"\">"+stream[i].channel.display_name+"</a></h2>" + "<br>" + "<p>" + stream[i].channel.game +" - "+stream[i].viewers+ " viewers" + "</p>" + "<br>" +"<p>" + stream[i].channel.status + "</p>";
            }

        };

       function setPageCount(){
          var pageref = document.getElementById('pagenum');
          pageref.innerHTML = i+"/"+total;
          document.getElementById("links").style.visibility = "visible";

        };


       // Click on Search Button
       function onSearch(){
            var searchQuery = document.getElementById("searchfield").value;
            if(searchQuery == null || searchQuery == "" )
            {
             alert("Please enter a search key");     
            }
            else
            {
             i=1;
             clearPresentPageCells();
             document.getElementById("prevLink").disabled = "disbaled";
             var tag = document.createElement("script");
             tag.src = "https://api.twitch.tv/kraken/search/streams?q="+searchQuery+"&callback=jsonPResponse"
             document.getElementsByTagName("head")[0].appendChild(tag);  
             var pageref = document.getElementById('pagenum');
             pageref.innerHTML = i+"/"+total;
             document.getElementById("p1").style.visibility = "visible";

            }

        }; 

       // Click on Previous Button
        function onPrevious(){
            if(i>1){
                clearPresentPageCells();
            var prevPage = responseData._links.prev;
            var tag = document.createElement("script");
            tag.src = prevPage+"&callback=jsonPResponse";
            document.getElementsByTagName("head")[0].appendChild(tag);
            var pageref = document.getElementById('pagenum');
             --i;
            if(i==1)
            {

                //disable prev
                document.getElementById("prevLink").disabled = true;
            }
             pageref.innerHTML = i+"/"+total; 
            }else{
                document.getElementById("prevLink").disabled = "disabled";
            }



        };
      // Click on Next Button
        function onNext(){
            if(i<total){
                document.getElementById("prevLink").disabled = false;
            clearPresentPageCells();
            var nextPage = responseData._links.next;
            var tag = document.createElement("script");
            tag.src =nextPage+"&callback=jsonPResponse";
            document.getElementsByTagName("head")[0].appendChild(tag);
            var pageref = document.getElementById('pagenum');
            ++i;
            if(i==total)
            {

                //disable next
                document.getElementById("nextLink").disabled = true;
            }
              pageref.innerHTML = i+"/"+total;
            }else{
                document.getElementById("nextLink").disabled = "disabled";
            }

        };


       //Clear and replace  the present cells with the new cells in the next page or previous page in the table 
        function clearPresentPageCells(){
          var new_tbody = document.createElement('tbody');
          var old_tbody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
          old_tbody.parentNode.replaceChild(new_tbody, old_tbody)

        };