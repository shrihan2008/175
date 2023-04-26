var A=["car"]
var B=["car"]
var C=["car"]
var elementsArray = [];

AFRAME.registerComponent("markerhandler", {
  init: async function () {
    var compounds = await this.getCompounds();

    this.el.addEventListener("markerFound", () => {
        
    });

    this.el.addEventListener("markerLost", () => {
      
    });
  },


  tick: function () {
    if(elementsArray.length>1){
      var messageText=document.querySelector("#message-text")
      var length=elementsArray.length
      var distance=null
      var compound=this.getCompound()
      if(length==2){
        var marker1=document.querySelector(`#marker-${elementsArray[0].barcode_value}`)
        var marker2=document.querySelector(`#marker-${elementsArray[1].barcode_value}`)

        distance=this.getDistance(marker1,marker2)
        if(distance<1.25){
          if(compound!==undefined){
            this.showCompound(compound)
          }
          else{
            messageText.setAttribute("visible",true)

          }

        }

        else{
          marker2.setAttribute("visible",false)
        }
      }




      if(length==3){
        var marker1=document.querySelector(`#marker-${elementsArray[0].barcode_value}`)
        var marker2=document.querySelector(`#marker-${elementsArray[1].barcode_value}`)
        var marker3=document.querySelector(`#marker-${elementsArray[2].barcode_value}`)
        distance2=this.getDistance(marker1,marker2)
        distance1=this.getDistance(marker2,marker3)
        if(distance2<1.25 & distance1<1.24){
          if(compound!==undefined){
            this.showCompound(compound)
          }
          else{
            messageText.setAttribute("visible",true)

          }

        }

        else{
          marker2.setAttribute("visible",false)
        }
      }
    }
  },
  //Calculate distance between two position markers
  getDistance: function (elA, elB) {
    return elA.object3D.position.distanceTo(elB.object3D.position)

  },  

  countOccurence:function(arr,val){
    return arr.reduce((a,v)=>(v.element_name===val ?a+1 :a),0)

  },
  getCompound: function () {
    for(var el of elementsArray){
      if(A.includes(el.element_name)){
        var compound=el.element_name

        for(var i of elementsArray){
          if(B.includes(i.element_name)){
            compound+=i.element_name
            return {name:compound,value:el.barcode_value}
          }

          if(C.includes(i.element_name)){
            var count=this.countOccurence(elementsArray,el.element_name)
            if(count>1){
              compound+=count+i.element_name
              return {name:compound,value:i.barcode_value}
            }
          }


        }


      }

    }


  },
  showCompound: function (compound) {
    //Hide elements
    elementsArray.map(item => {
      var el = document.querySelector(`#${item.element_name}-${item.barcode_value}`);
      el.setAttribute("visible", false);
    });
    //Show Compound
    var compound = document.querySelector(`#${compound.name}-${compound.value}`);
    compound.setAttribute("visible", true);
  },
  getCompounds: function () {
    // NOTE: Use ngrok server to get json values
    return fetch("js/compoundList.json")
      .then(res => res.json())
      .then(data => data);
  },
});
