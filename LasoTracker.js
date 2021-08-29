let myLeads=[]
let oldLeads=[]
const inputEl=document.getElementById("input-el")
const ulEl=document.getElementById("ul-el")
const inputBtn=document.getElementById("input-btn")
const deleteBtn=document.getElementById("delete-btn")
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
const tabBtn=document.getElementById("tab-btn")

if (leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
}



tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify( myLeads))
        render(myLeads)
    })
})

    

function render(leads){
    let listItems=""
    for(let i=0; i < leads.length;i++){
        //listItems += "<li><a target='_blank' href='"+ myLeads[i] + "'>"+ myLeads[i]  +"</a></li>"
        //the above code works fine but its very long. So we can replace it with the code below since we can break it into multiple lines using backtick
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]} 
            </a>
        </li>`
        //target='_blank' href='"+ myLeads[i] + "'....will open the link in a new tab
        //the long way of creating the  code-> UlEl.innerHtml+="<li>" + myLeads[i]+"</li>"
        //const li=document.createElement("li")
        //li.textContent=myLeads[i]
        //ulEl.append(li)
    }
    ulEl.innerHTML=listItems
}


deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})

inputBtn.addEventListener("click", function(){
    //alert("Button Clicked from addEventListener")
    myLeads.push(inputEl.value)
    //alert(myLeads)
    inputEl.value=""//clear the value of input field
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)

})


// javascript